import React, { useState, useEffect } from 'react'
import FileSaver from 'file-saver'
import LoadingModal from '../../LoadingModal'
import {
  getSingleFile,
  getSingleFileFromMentorApp,
  trimFileName
} from '../../multifileUpload/fileUploadService'
import _ from 'lodash'
import Message from '../../multifileUpload/Message'
import pdf from '../../../assets/images/pdf.png'

const Attachments = ({
  reasonFiles,
  isMentorApp = false,
  isReasonModal = false,
  attachmentStyle
}) => {
  const [showLoadingModal, setShowLoadingModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [hasFiles, setHasFiles] = useState(false)
  const [columnAFiles, setColumnAFiles] = useState(null)
  const [columnBFiles, setColumnBFiles] = useState(null)

  useEffect(() => {
    let isActive = true

    if (isActive) {
      if (reasonFiles && reasonFiles.length > 0) {
        setHasFiles(true)
        mapFiles()
      }
    }

    return () => {
      isActive = false
    }
  }, [reasonFiles])

  const mapFiles = () => {
    const midPoint = Math.ceil(reasonFiles.length / 2)
    const columnA = reasonFiles.slice(0, midPoint)
    setColumnAFiles(columnA)
    const columnB = reasonFiles.slice(midPoint)
    setColumnBFiles(columnB)
  }

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

    if (response.status === 'Error') {
      setShowLoadingModal(false)
      handleMessage(response.errorMessage)
    } else {
      const newBlob = new Blob([response.data], {
        type: response.data && response.data.type
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
  }

  const handleMessage = (message) => {
    setShowErrorMessage(true)
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
      setShowErrorMessage(false)
    }, 3000)
  }

  const hideMessage = () => {
    setErrorMessage('')
    setShowErrorMessage(false)
  }

  return (
    <>
      {showLoadingModal && <LoadingModal />}
      <Message
        message={errorMessage}
        showMessage={showErrorMessage}
        hideMessage={hideMessage}
      />
      {isReasonModal && hasFiles ? (
        <div className='row'>
          <div className='col'>
            {columnAFiles &&
              columnAFiles.length > 0 &&
              columnAFiles.map((file, idx) => {
                const file_name = trimFileName(file)
                return (
                  <div key={`${idx}=${file_name}`} className='py-2'>
                    <button
                      type='button'
                      className='view-single-file focusable-item'
                      onClick={() => ViewFile(file)}
                      style={{ paddingLeft: '0px' }}
                    >
                      <img
                        src={pdf}
                        alt=''
                        style={{ maxWidth: '100%', height: '20px' }}
                      />
                      <span
                        className='span-text-spacing'
                        style={{
                          textDecoration: 'underline',
                          color: '#0275d8'
                        }}
                      >
                        {file_name}
                      </span>
                    </button>
                  </div>
                )
              })}
          </div>
          <div className='col'>
            {columnBFiles &&
              columnBFiles.length > 0 &&
              columnBFiles.map((file, idx) => {
                const file_name = trimFileName(file)
                return (
                  <div key={`${idx}=${file_name}`} className='py-2'>
                    <button
                      type='button'
                      className='view-single-file focusable-item'
                      onClick={() => ViewFile(file)}
                      style={{ paddingLeft: '0px' }}
                    >
                      <img
                        src={pdf}
                        alt=''
                        style={{ maxWidth: '100%', height: '20px' }}
                      />
                      <span
                        className='span-text-spacing'
                        style={{
                          textDecoration: 'underline',
                          color: '#0275d8'
                        }}
                      >
                        {file_name}
                      </span>
                    </button>
                  </div>
                )
              })}
          </div>
        </div>
      ) : hasFiles ? (
        <>
          <div className='col-md-12 p-0 my-2'>
            <h3
              className={`m-0 ${attachmentStyle ? attachmentStyle : 'heading-text'
                } mentor-summary-section-heading`}

            >
              Attachments
            </h3>
          </div>
          <div className='row'>
            <div className='col-2'>
              {columnAFiles &&
                columnAFiles.length > 0 &&
                columnAFiles.map((file, idx) => {
                  const file_name = trimFileName(file)
                  return (
                    <div key={`${idx}=${file_name}`} className='py-2'>
                      <button
                        type='button'
                        className='view-single-file'
                        onClick={() => ViewFile(file)}
                        style={{ paddingLeft: '0px' }}
                      >
                        <img
                          src={pdf}
                          alt=''
                          style={{ maxWidth: '100%', height: '20px' }}
                        />
                        <span
                          className='span-text-spacing'
                          style={{
                            textDecoration: 'underline',
                            color: '#0275d8'
                          }}
                        >
                          {file_name}
                        </span>
                      </button>
                    </div>
                  )
                })}
            </div>
            <div className='col-2'>
              {columnBFiles &&
                columnBFiles.length > 0 &&
                columnBFiles.map((file, idx) => {
                  const file_name = trimFileName(file)
                  return (
                    <div key={`${idx}=${file_name}`} className='py-2'>
                      <button
                        type='button'
                        className='view-single-file'
                        onClick={() => ViewFile(file)}
                        style={{ paddingLeft: '0px' }}
                      >
                        <img
                          src={pdf}
                          alt=''
                          style={{ maxWidth: '100%', height: '20px' }}
                        />
                        <span
                          className='span-text-spacing'
                          style={{
                            textDecoration: 'underline',
                            color: '#0275d8'
                          }}
                        >
                          {file_name}
                        </span>
                      </button>
                    </div>
                  )
                })}
            </div>
          </div>
        </>
      ) : (
        <div className='col-md-12 p-0 my-2'>
          <h3
            className={`m-0 ${attachmentStyle ? attachmentStyle : 'heading-text '
              } mentor-summary-section-heading`}
          >
            Attachments
          </h3>
          <p>No attachments.</p>
        </div>
      )}
    </>
  )
}

export default Attachments
