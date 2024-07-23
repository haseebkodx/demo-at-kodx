/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import InputField from '../../commonComponents/forms/InputField'
import InputCheckbox from '../../commonComponents/forms/InputCheckbox'
import ExplanationStatementModal from './ExplanationStatementModal'
import FileUploadComponent from '../../multifileUpload/FileUploadComponent'
import { keydownHandler } from '../../commonComponents/utility'
import { deleteMentorAppFile } from '../../multifileUpload/fileUploadService'

function DevelopmentAssistance({
  mentorApp,
  isDevelopmentStatement,
  mentorApplicationInfo,
  summary,
  handleUploadedFiles,
  mentor_app_id,
  agreement_type,
  isDevelopmentalAssistanceExplanationOrFileUploadProvided,
  getUuid,
  userUuid,
  field_name,
  allMentorAppMentorUser,
  developmentalAssistanceUploadFile,
  getMentorApp,
  hook,
  isMentor = false,
  isReviewer = false
}) {
  const [developmentAssistFile, setDevelopmentAssistFile] = useState(null)
  const [isStatement, setIsStatement] = useState(
    mentorApp && mentorApp['developmental_assistance_explanation']
      ? true
      : false
  )
  const [isDocument, setIsDocument] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const [modalMessage, setModalMessage] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [areAllDeletedDocumentsDisplayed, setAreAllDeletedDocumentsDisplayed] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    setIsStatement(isDevelopmentStatement)
  }, [isDevelopmentStatement])

  useEffect(() => {
    if (
      allMentorAppMentorUser &&
      allMentorAppMentorUser['developmental_assistance_upload_file'] &&
      allMentorAppMentorUser['developmental_assistance_upload_file'].length > 0
    ) {
      setIsDocument(true)
    }
  }, [allMentorAppMentorUser])

  useEffect(() => {
    if (developmentalAssistanceUploadFile && developmentalAssistanceUploadFile.length === 0) {
      setIsDocument(false)
    }
  }, [developmentalAssistanceUploadFile])

  useEffect(() => {
    if (modalMessage && modalType) {
      setShowModal(true)
    }
  }, [modalMessage, modalType])

  useEffect(() => {
    if (!showModal) {
      setModalType(null)
      setModalMessage(null)
    }
  }, [showModal])

  useEffect(() => {
    if (showModal) {
      setShowModal(false)
    }
  }, [isStatement, isDocument])

  useEffect(() => {
    if (!showSpinner && !areAllDeletedDocumentsDisplayed && (allMentorAppMentorUser && !allMentorAppMentorUser['developmental_assistance_upload_file'])) {
      hook && hook([])
    }
    else {
      setShowModal(false)
    }
  }, [showSpinner])

  const showStatement = (event) => {
    if (mentorApp && mentorApp['developmental_assistance_explanation']) {
      setModalType('Development Assistance Statement')
      setModalMessage('Unchecking this checkbox will clear out the Development Assistance explanation text. Do you want to continue?')
      event.preventDefault()
    } else {
      setIsStatement(!isStatement)
    }
  }

  const showDocumentUpload = event => {
    if (developmentalAssistanceUploadFile && developmentalAssistanceUploadFile.length > 0) {
      setModalType('Developmental Assistance File(s) Upload')
      setModalMessage('Unchecking this checkbox will delete all the Development Assistance uploaded files. Do you want to continue?')
      event.preventDefault()
    }
    else {
      setIsDocument(!isDocument)
    }
  }

  const retainStatementFunctionHandler = () => {
    setShowModal(false)
  }

  const clearStatementFunctionHandler = () => {
    if (isStatement && modalType === 'Development Assistance Statement') {
      mentorApp['developmental_assistance_explanation'] = ''
      setIsStatement(false)
    }
    else if (isDocument && modalType === 'Developmental Assistance File(s) Upload') {
      setAreAllDeletedDocumentsDisplayed(false)
      setShowSpinner(true)
      const developmentalAssistanceDeleteFilePromises = developmentalAssistanceUploadFile.map(fileToDelete => deleteMentorAppFile({ fileToDelete }))
      Promise.all(developmentalAssistanceDeleteFilePromises)
        .then(() => {
          return getMentorApp()
        })
        .catch(() => {
          setAreAllDeletedDocumentsDisplayed(true)
        })
        .finally(() => {
          setShowSpinner(false)
        })
    }
  }

  return (
    <div
      id='developmental-assitance-content'
      className={`row ${summary ? 'mt-5' : 'mb-5'}`}
    >
      {!summary && (
        <div className='col-md-10'>
          <h2 className='reviewer-section-title mentor-application-header col-md-12 p-3'>
            Ability to Provide Developmental Assistance
          </h2>
        </div>
      )}
      <div className='col-12 col-sm-12 col-md-8' data-test-id='Develop Assist'>
        {summary && (
          <h2 className='mt-3 my-3 mentor-summary-section-heading'>
            Developmental Assistance
          </h2>
        )}
        {summary && (
          <div className='col-12 pl-0'>
            <p
              style={{ fontStyle: summary && 'italic' }}
              className='my-3'
              tabIndex='0'
            >
              Describe the company&apos;s ability to provide developmental
              assistance and how that assistance will potentially increase
              subcontracting opportunities in industry categories where SDBs are
              not dominant in the company&apos;s vendor base. Also be sure to
              emphasize your specialty in one or more of the technology areas of
              interest to DoD and how you would share that information with a
              potential protégé.
            </p>
          </div>
        )}
        {summary && (
          <div className='row mt-3 px-3'>
            {mentorApp && mentorApp['developmental_assistance_explanation'] && (
              <>
                <div className='col-md-12 p-0 my-2'>
                  <h3 className='m-0 heading-text mentor-summary-section-heading'>Explanation</h3>
                </div>
                <div className='col-md-12 p-0'>
                  {mentorApp['developmental_assistance_explanation']}
                </div>
              </>
            )}
            {isMentor &&
              allMentorAppMentorUser &&
              allMentorAppMentorUser['developmental_assistance_upload_file'] ? (
              <div className='col-md-12 pl-0 summary-files-table'>
                <h3 className='mx-0 mb-3 heading-text mentor-summary-section-heading'>
                  Document Upload For Developmental Assistance:
                </h3>
                <p className="my-2">
                  Acceptable formats are: PDF, Word, or Excel. Maximum file size is 5MB.
                </p>
                <FileUploadComponent
                  agreement_type={agreement_type}
                  field_name={field_name}
                  agreement_id={mentor_app_id}
                  initialFiles={
                    allMentorAppMentorUser &&
                    allMentorAppMentorUser[
                    'developmental_assistance_upload_file'
                    ]
                  }
                  isMentorApplication={true}
                  reviewMode={true}
                  getUuid={getUuid}
                  userUuid={userUuid}
                  fileUploadComponentAddBtnId={'mentor-app-developmental-assistance'}
                />
              </div>
            ) : isReviewer &&
              mentorApp &&
              mentorApp['developmental_assistance_upload_file'] ? (
              <div className='col-md-12 pl-0 summary-files-table'>
                <h3 className='mx-0 mb-3 heading-text mentor-summary-section-heading'>
                  Document Upload For Development Assistance:
                    </h3>
                <p className="my-2">
                  Acceptable formats are: PDF, Word, or Excel. Maximum file size is 5MB.
                    </p>
                <FileUploadComponent
                  agreement_type={agreement_type}
                  field_name={field_name}
                  agreement_id={mentor_app_id}
                  initialFiles={
                    mentorApp &&
                    mentorApp['developmental_assistance_upload_file']
                  }
                  isMentorApplication={true}
                  reviewMode={true}
                  getUuid={getUuid}
                  userUuid={userUuid}
                  fileUploadComponentAddBtnId={'mentor-app-review-developmental-assistance'}
                />
              </div>
            ) : null}
          </div>
        )}
        {!summary && (
          <>
            <ExplanationStatementModal
              showModal={showModal}
              showSpinner={showSpinner}
              message={modalMessage}
              statementType={modalType}
              retainStatementHandler={retainStatementFunctionHandler}
              clearStatementHandler={clearStatementFunctionHandler}
            />
            <fieldset>
              <legend>
                <p className='my-3'>
                  Describe the company&apos;s ability to provide developmental
                  assistance and how that assistance will potentially increase
                  subcontracting opportunities in industry categories where SDBs
                  are not dominant in the company&apos;s vendor base. Also be
                  sure to emphasize your specialty in one or more of the
                  technology areas of interest to DoD and how you would share
                  that information with a potential protégé.
                </p>
                <p className='my-3'>
                  <strong>
                    IMPORTANT: You must select at least one option.
                  </strong>
                </p>
                <p className='mb-2'>
                  <span aria-hidden='true'>*</span>Select whether you will be
                  writing an explanation and/or uploading documents:
                  <i className='sr-only'>This is a required field.</i>
                </p>
              </legend>
              <div className='row mb-3'>
                <div className='col-md-10'>
                  <div className='row'>
                    <div className='col-md-12'>
                      <InputCheckbox
                        label={'Write an explanation on this page'}
                        name='developmental_assistance_explanation_check'
                        id='developmental_assistance_explanation_checkbox'
                        view={mentorApplicationInfo || summary}
                        value={isStatement}
                        checked={isStatement}
                        onClick={showStatement}
                        onKeyDown={e => keydownHandler(e, showStatement)}
                      />
                    </div>
                  </div>
                  <div className='row ml-2'>
                    <div className='col-md-12'>
                      {isStatement && (
                        <InputField
                          name='developmental_assistance_explanation'
                          type='textarea'
                          placeholder='Explanation'
                          id='developmental_assistance_explanation_textfield'
                          value={
                            mentorApp &&
                            mentorApp['developmental_assistance_explanation']
                          }
                          rows='4'
                          dependent={developmentAssistFile}
                          required={true}
                          view={mentorApplicationInfo || summary}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className='col-md-10'>
                  <div className='row'>
                    <div className='col-md-12'>
                      <InputCheckbox
                        label={'Upload a document'}
                        name='developmental_assistance_upload_file'
                        id='developmental_assistance_upload_file'
                        view={mentorApplicationInfo || summary}
                        value={isDocument}
                        checked={isDocument}
                        onClick={showDocumentUpload}
                        onKeyDown={e => keydownHandler(e, showDocumentUpload)}
                      />
                    </div>
                  </div>
                  <div className='row ml-2'>
                    <div className='col-md-12'>
                      {isDocument && (
                        <>
                          <p className="my-2">
                            Acceptable formats are: PDF, Word, or Excel. Maximum file size is 5MB.
                        </p>
                          <FileUploadComponent
                            agreement_type={agreement_type}
                            field_name={field_name}
                            agreement_id={mentor_app_id}
                            handleUploadedFiles={handleUploadedFiles}
                            getMentorApp={getMentorApp}
                            initialFiles={
                              allMentorAppMentorUser &&
                              allMentorAppMentorUser[
                              'developmental_assistance_upload_file'
                              ]
                            }
                            isMentorApplication={true}
                            getUuid={getUuid}
                            userUuid={userUuid}
                            fileUploadComponentAddBtnId={'non-summary-mentor-app-developmental-assistance'}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-10 pl-0'>
                <div className='row'>
                  <div className='col-md-12'>
                    {isDevelopmentalAssistanceExplanationOrFileUploadProvided && (
                      <p className='erorr-red my-2'>
                        No information was provided. You must either write an
                        explanation and/or upload document(s).
                      </p>
                    )}
                    {areAllDeletedDocumentsDisplayed && (
                      <p className='erorr-red my-2'>
                        Uploaded files for developmental assistance are not deleted completely. Please try to delete them again.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </fieldset>
          </>
        )}
      </div>
    </div>
  )
}

export default DevelopmentAssistance
