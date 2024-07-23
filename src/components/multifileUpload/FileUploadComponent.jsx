import React, { useState, useEffect } from 'react'
import SelectFilesInput from './SelectFilesInput'
import AddFilesBtn from './AddFilesBtn'
import UploadedFilesTable from './UploadedFilesTable'
import SelectFilesModal from './SelectFilesModal'
import SelectFilesTable from './SelectFilesTable'
import { Spinner } from 'react-bootstrap'
import { validFileType, validFileSize } from './fileValidationHelpers'
import _ from 'lodash'
import Message from './Message'
import {
	postFiles,
	deleteFile,
	getSingleFile,
	postMentorAppFiles,
	deleteMentorAppFile,
	getSingleFileFromMentorApp
} from './fileUploadService'
import FileSaver from 'file-saver'
import LoadingModal from '../LoadingModal'

const FileUploadComponent = ({
	agreement_id,
	field_name = '',
	agreement_type = '',
	handleUploadedFiles = () => { },
	initialFiles,
	reviewMode = false,
	isMentorApplication = false,
	getUuid = () => { },
	getMentorApp = () => { },
	forReviewerReasonModal = false,
	fileUploadComponentAddBtnId
}) => {
	// selecting files state
	const [showModal, setShowModal] = useState(false)
	const [validFiles, setValidFiles] = useState([])
	const [invalidFiles, setInvalidFiles] = useState([])
	const [uploadAttemptMessage, setUploadAttemptMessage] = useState('')
	const [showUploadAttemptMessage, setShowUploadAttemptMessage] = useState(
		false
	)
	// uploading and deleting files state
	const [hasUploadedFiles, setHasUploadedFiles] = useState(false)
	const [uploadedFiles, setUploadedFiles] = useState([])
	const [filesDeleted, setFilesDeleted] = useState(false)
	const [showSpinner, setShowSpinner] = useState(false)
	const [showLoadingModal, setShowLoadingModal] = useState(false)

	const [fileCount, setFileCount] = useState(0)

	const [inReviewMode, setInReviewMode] = useState(false)

	const [isMentorApp, setIsMentorApp] = useState(isMentorApplication)

	useEffect(() => {
		if (initialFiles && initialFiles.length > 0) {
			setUploadedFiles(initialFiles)
		}
	}, [initialFiles])

	useEffect(() => {
		let isActive = true

		if (isActive) {
			if (uploadedFiles && uploadedFiles.length > 0) {
				checkUploadedFilesLength()
			}
			setInReviewMode(reviewMode)
			setIsMentorApp(isMentorApplication)
		}
		return () => {
			isActive = false
		}
	}, [reviewMode, isMentorApplication])

	useEffect(() => {
		let isActive = true

		if (isActive) {
			if (uploadedFiles && uploadedFiles.length > 0) {
				checkUploadedFilesLength()
				handleUploadedFiles(uploadedFiles)
			}
		}
		return () => {
			isActive = false
		}
	}, [uploadedFiles, filesDeleted])

	const checkUploadedFilesLength = () => {
		if (Array.isArray(uploadedFiles) && uploadedFiles.length > 0) {
			setFileCount(uploadedFiles.length)
			setHasUploadedFiles(true)
			if (filesDeleted) {
				setFilesDeleted(!filesDeleted)
			}
		} else {
			setHasUploadedFiles(false)
			if (filesDeleted) {
				setFilesDeleted(!filesDeleted)
			}
		}
	}

	const selectFilesList = (e) => {
		const files = e.target.files

		checkFiles(files)

		e.target.value = null

		if (!showModal) {
			toggleModal()
		}
	}

	const checkFiles = (files) => {
		let errorMessage = ''

		const validFilesNum =
			Array.isArray(validFiles) && validFiles.length ? validFiles.length : 0

		const invalidFilesNum =
			Array.isArray(invalidFiles) && invalidFiles.length
				? invalidFiles.length
				: 0

		const filesNum = files && files.length > 0 ? files.length : 0

		const filesSum = fileCount + validFilesNum + invalidFilesNum + filesNum

		if (filesSum > 10) {
			errorMessage = `The file limit is 10.`
			setUploadAttemptMessage(errorMessage)
			setShowUploadAttemptMessage(true)
			setTimeout(() => setShowUploadAttemptMessage(false), 3000)
			setTimeout(() => closeModal(), 3000)
		} else if (files.length > 0) {
			for (const file of files) {
				// check if file already exists in valid or invalidFiles
				if (validFileType(file) && validFileSize(file)) {
					setValidFiles((validFiles) => {
						return [...validFiles, file]
					})
				} else if (!validFileType(file) && validFileSize(file)) {
					errorMessage =
						'File must be a Word document, PDF, or Excel spreadsheet'
					file.errorMessage = errorMessage
					setInvalidFiles((invalidFiles) => {
						return [...invalidFiles, file]
					})
				} else if (!validFileSize(file) && validFileType(file)) {
					errorMessage = 'The maximum file size is 5MB'
					file.errorMessage = errorMessage
					setInvalidFiles((invalidFiles) => {
						return [...invalidFiles, file]
					})
				} else {
					errorMessage =
						'File must be a Word document, PDF, or Excel with a maximum file size of 5MB'
					file.errorMessage = errorMessage
					setInvalidFiles((invalidFiles) => {
						return [...invalidFiles, file]
					})
				}
			}
		}
	}

	const onSubmitForm = async (e) => {
		e.preventDefault()

		setShowSpinner(true)

		let response

		if (isMentorApp) {
			let mentor_app_id

			if (!agreement_id) {
				const data = await getUuid(false)

				const appId = data && data.appUuid

				if (data && data.status === 'Success') {
					mentor_app_id = appId

					response = await postMentorAppFiles({
						mentor_app_id,
						field_name,
						validFiles,
					})
				}
			} else {
				mentor_app_id = agreement_id
				response = await postMentorAppFiles({
					mentor_app_id,
					field_name,
					validFiles,
				})
			}
		} else {
			// for protege and mentor agreements
			response = await postFiles({
				validFiles,
				agreement_id,
				agreement_type,
				field_name,
			})
		}

		if (response && response.status === 'Success') {
			setShowSpinner(false)
			handleMessage('Files uploaded successfully')
			handleDisableInput()
			if (isMentorApp) {
				callbackToHandleMentorAppFiles(response.data)
			} else {
				callbackToUploadFiles(response.data)
			}
			setTimeout(() => setShowModal(false), 100)
			setTimeout(() => setValidFiles([]), 100)
		} else if (response && response.errorMessage) {
			setShowSpinner(false)
			handleMessage(response.errorMessage)
			handleDisableInput()
		}
	}

	const [disableInput, setDisableInput] = useState(true)

	const handleDisableInput = () => {
		setDisableInput(!disableInput)
	}

	const callbackToHandleMentorAppFiles = (data) => {
		setHasUploadedFiles(true)

		const fileId = data.fileId
		const fileName = data.fileName

		for (let i = 0; i < fileId.length; i++) {
			let newFile = {}
			newFile.uuid = fileId[i]
			newFile.fileName = fileName[i]
			newFile.field_name = field_name

			setUploadedFiles((uploadedFiles) => [...(uploadedFiles || []), newFile])
		}
	}

	const callbackToUploadFiles = (data) => {
		setHasUploadedFiles(true)

		const fileId = data.fileId
		const fileName = data.fileName

		for (let i = 0; i < fileId.length; i++) {
			let newFile = {}
			newFile.fileId = fileId[i]
			newFile.fileName = fileName[i]
			newFile.agreement_type = agreement_type
			newFile.agreement_id = agreement_id
			newFile.field_name = field_name

			setUploadedFiles((uploadedFiles) => [...(uploadedFiles || []), newFile])
		}
	}

	const handleDeleteFile = async (fileToDelete, idx) => {
		setShowSpinner(true)

		let response

		// if mentor application
		if (isMentorApp) {
			response = await deleteMentorAppFile({
				fileToDelete,
			})
			getMentorApp()
		} else {
			response = await deleteFile({
				fileToDelete,
			})
		}

		if (response.status === 'Success') {
			setShowSpinner(false)

			setTimeout(() => hideMessage(), 3000)
			let copyArray = uploadedFiles
			copyArray.splice(idx, 1)
			setUploadedFiles([...copyArray])

			setFilesDeleted(true)
			handleMessage('File deleted.')

			if (copyArray.length === 0) {
				handleUploadedFiles([])
			}
		} else {
			setShowSpinner(false)
			setFilesDeleted(false)
			setTimeout(() => handleMessage(response.errorMessage))
		}
	}

	const handleMessage = (message) => {
		setShowUploadAttemptMessage(true)
		setUploadAttemptMessage(message)
		setTimeout(() => {
			setUploadAttemptMessage('')
			setShowUploadAttemptMessage(false)
		}, 3000)
	}

	const hideMessage = () => {
		setUploadAttemptMessage('')
		setShowUploadAttemptMessage(false)
	}

	const removeValidFile = (idx) => {
		let copyArray = validFiles
		copyArray.splice(idx, 1)
		setValidFiles([...copyArray])
		handleSelectFilesTable()
	}

	const removeInvalidFile = (idx) => {
		let copyArray = invalidFiles
		copyArray.splice(idx, 1)
		setInvalidFiles([...copyArray])
		handleSelectFilesTable()
	}

	const handleSelectFilesTable = () => {
		if (!validFiles.length && !invalidFiles.length) {
			closeModal()
		}
	}

	const closeModal = () => {
		setValidFiles([])
		setInvalidFiles([])
		setUploadAttemptMessage('')
		setShowUploadAttemptMessage(false)
		setShowModal(false)
		setShowSpinner(false)
		handleDisableInput()
	}

	const toggleModal = () => setShowModal(!showModal)

	const ViewFile = async (file) => {
		const fileId = Object.prototype.hasOwnProperty.call(file, 'uuid')
			? file.uuid
			: file.fileId

		const fileName = Object.prototype.hasOwnProperty.call(file, 'name')
			? file.name
			: file.fileName

		setShowLoadingModal(true)

		let response

		if (isMentorApp) {
			response = await getSingleFileFromMentorApp(fileId)
		} else {
			response = await getSingleFile(fileId)
		}

		const newBlob = new Blob([response.data], {
			type: response.data && response.data.type,
		})

		const pdfFiles = ['.pdf', 'application/pdf']

		if (_.includes(pdfFiles, response.data.type)) {
			if (window.navigator && window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveOrOpenBlob(newBlob)
				setShowLoadingModal(false)
			} else {
				const url = window.URL.createObjectURL(newBlob)
				const win = window.open(url, '_blank')
				win.onload = function () {
					setShowLoadingModal(false)
					setTimeout(function () {
						window.URL.revokeObjectURL(url)
					}, 100)
				}
			}
		} else {
			const url = window.URL.createObjectURL(newBlob)
			setShowLoadingModal(false)
			FileSaver.saveAs(url, fileName)
		}
	}

	return (
		<div
			className='upload-files-container col-md-12'
			style={
				{
					border: 'none',
					paddingLeft: '0px',
				}
			}
		>
			<SelectFilesInput
				isLoading={() => (showLoadingModal ? <LoadingModal /> : null)}
			>
				{() =>
					!hasUploadedFiles && !inReviewMode ? (
						<>
							<AddFilesBtn
								addFilesBtnId={`new-upload-${fileUploadComponentAddBtnId}-file-button`}
								selectFilesList={selectFilesList}
								disableInput={disableInput}
								setDisableInput={setDisableInput}
							/>
							<SelectFilesModal
								addFilesBtn={
									<AddFilesBtn
										addFilesBtnId={`new-selectable-upload-${fileUploadComponentAddBtnId}-file-button`}
										selectFilesList={selectFilesList}
										disableInput={disableInput}
										setDisableInput={setDisableInput}
									/>
								}
								uploadFilesMessage={
									<Message
										message={uploadAttemptMessage}
										showMessage={showUploadAttemptMessage}
										hideMessage={hideMessage}
									/>
								}
								validFiles={validFiles}
								invalidFiles={invalidFiles}
								selectFilesTable={
									<SelectFilesTable
										validFiles={validFiles}
										invalidFiles={invalidFiles}
										removeValidFile={removeValidFile}
										removeInvalidFile={removeInvalidFile}
										ViewFile={ViewFile}
									>
										{() =>
											showSpinner ? (
												<Spinner
													className='loading-status'
													animation='border'
													role='status'
													variant='info'
												>
													<span className='sr-only'>Loading ...</span>
												</Spinner>
											) : null
										}
									</SelectFilesTable>
								}
								showModal={showModal}
								closeModal={closeModal}
								onSubmitForm={onSubmitForm}
								showSpinner={showSpinner}
							></SelectFilesModal>
						</>
					) : (
						<>
							<UploadedFilesTable
								forReviewerReasonModal={forReviewerReasonModal}
								uploadedFiles={uploadedFiles}
								handleDeleteFile={handleDeleteFile}
								ViewFile={ViewFile}
								inReviewMode={inReviewMode}
								deleteBtnId={fileUploadComponentAddBtnId}
								deletedFileMessage={
									<Message
										message={uploadAttemptMessage}
										showMessage={showUploadAttemptMessage}
										hideMessage={hideMessage}
									/>
								}
								showSpinner={() =>
									showSpinner ? (
										<Spinner
											className='loading-status'
											animation='border'
											role='status'
											variant='info'
										>
											<span className='sr-only'>Loading ...</span>
										</Spinner>
									) : null
								}
							>
								{() =>
									Array.isArray(uploadedFiles) &&
										uploadedFiles.length < 10 &&
										!inReviewMode ? (
										<AddFilesBtn
											addFilesBtnId={`upload-${fileUploadComponentAddBtnId}-file-button`}
											selectFilesList={selectFilesList}
											disableInput={disableInput}
											setDisableInput={setDisableInput}
										/>
									) : null
								}
							</UploadedFilesTable>
							<SelectFilesModal
								addFilesBtn={
									<AddFilesBtn
										addFilesBtnId={`selectable-upload-${fileUploadComponentAddBtnId}-file-button`}
										selectFilesList={selectFilesList}
										disableInput={disableInput}
										setDisableInput={setDisableInput}
									/>
								}
								uploadFilesMessage={
									<Message
										message={uploadAttemptMessage}
										showMessage={showUploadAttemptMessage}
										hideMessage={hideMessage}
									/>
								}
								validFiles={validFiles}
								invalidFiles={invalidFiles}
								selectFilesTable={
									<SelectFilesTable
										validFiles={validFiles}
										invalidFiles={invalidFiles}
										removeValidFile={removeValidFile}
										removeInvalidFile={removeInvalidFile}
										ViewFile={ViewFile}
									>
										{() =>
											showSpinner ? (
												<Spinner
													className='loading-status'
													animation='border'
													role='status'
													variant='info'
												>
													<span className='sr-only'>Loading ...</span>
												</Spinner>
											) : null
										}
									</SelectFilesTable>
								}
								showModal={showModal}
								closeModal={closeModal}
								onSubmitForm={onSubmitForm}
							/>
						</>
					)
				}
			</SelectFilesInput>
		</div>
	)
}

export default FileUploadComponent
