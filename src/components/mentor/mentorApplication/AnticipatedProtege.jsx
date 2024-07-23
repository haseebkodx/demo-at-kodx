import React, { useState, useEffect } from 'react'
import InputCheckbox from '../../commonComponents/forms/InputCheckbox'
import InputField from '../../commonComponents/forms/InputField'
import OptionField from '../../commonComponents/forms/OptionField'
import { keydownHandler } from '../../commonComponents/utility'
import FileUploadComponent from '../../multifileUpload/FileUploadComponent'
import { deleteMentorAppFile } from '../../multifileUpload/fileUploadService'
import ExplanationStatementModal from './ExplanationStatementModal'

function AnticipatedProtege({
  mentorApp,
  allMentorAppMentorUser,
  mentorApplicationInfo,
  summary,
  handleUploadedFiles,
  mentor_app_id,
  agreement_type,
  isExplanationOrFileUploadProvided,
  getUuid,
  userUuid,
  /* File upload field */
  uploadFieldName,
  getMentorApp,
  anticipatedFile,
  isAnticipatedStatement,
  isMentor,
  isReviewer,
  submitted,
}) {

  const [isDocument, setIsDocument] = useState(false)
  const [modalMessage, setModalMessage] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  const [isStatement, setIsStatement] = useState(
    mentorApp && mentorApp['anticipated_protege_details']
      ? true
      : false
  )

  const [eligibilityFile, setEligilityFile] = useState(null)
  const [areAllDeletedDocumentsDisplayed, setAreAllDeletedDocumentsDisplayed] = useState(false)

  const anticipatedProtegeFile = mentorApp?.[uploadFieldName];

  useEffect(() => {
    if (anticipatedProtegeFile?.length > 0 || anticipatedFile?.length > 0) {
      setIsDocument(true);
    }
  }, [anticipatedFile, anticipatedProtegeFile]);

  // useEffect(() => {
  //   if(!anticipatedFile || (anticipatedFile && anticipatedFile.length === 0)) {
  //     setIsDocument(false)
  //   }
    
  // }, [anticipatedFile])


  useEffect(() => {
    setIsStatement(isAnticipatedStatement)
  }, [isAnticipatedStatement])


  useEffect(() => {
    if (showModal) {
      setShowModal(false)
    }
  }, [isStatement, isDocument])

  useEffect(() => {
    if (!showModal) {
      setModalType(null)
      setModalMessage(null)
    }
  }, [showModal])

  useEffect(() => {
    if (modalMessage && modalType) {
      setShowModal(true)
    }
  }, [modalMessage, modalType])

  const currentEligibleAwardOptions = [
    {
      name: 'Anticipated Protege',
      label: 'Yes',
      value: 'true',
      id: `yes-anticipated-protege`
    },
    {
      name: 'Anticipated Protege',
      label: 'No',
      value: 'false',
      id: `no-anticipated-protege`
    }
  ]

  const showDocumentUpload = event => {
    if (mentorApp && mentorApp[uploadFieldName] && mentorApp[uploadFieldName].length > 0) {
      setModalType('Anticipated Protégé File(s) Upload')
      setModalMessage('Unchecking this checkbox will delete all the developmental assistance uploaded files. Do you want to continue?')
      event.preventDefault()
    }
    else {
      setIsDocument(!isDocument)
    }
  }

  // const handleAnticipatedProtegeDetails = () => {
  //   mentorApp['anticipated_protege_details'] = ''
  // }

  const retainStatementFunctionHandler = () => {
    setShowModal(false)
  }

  const clearStatementFunctionHandler = () => {
    if (isStatement && modalType === 'Anticipated Protégé Statement') {
      mentorApp['anticipated_protege_details'] = ''
      setIsStatement(false)
    }
    else if (isDocument && modalType === 'Anticipated Protégé File(s) Upload') {

      setAreAllDeletedDocumentsDisplayed(false)
      setShowSpinner(true)
      const deleteFilePromises = anticipatedFile.map(fileToDelete => deleteMentorAppFile({ fileToDelete }))
      Promise.all(deleteFilePromises)
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

  const showStatement = (event) => {
    if (mentorApp && mentorApp['anticipated_protege_details']) {
      setModalType('Anticipated Protégé Statement')
      setModalMessage('Unchecking this checkbox will clear out the Anticipated Protégé explanation text. Do you want to continue?')
      event.preventDefault()
    } else {
      setIsStatement(!isStatement)
    }
  }

  return (
    <div
      id="anticipated-protege-questions"
      className={`row ${summary ? 'mt-5' : 'mb-3'}`}
    >
      {!summary && (
        <div className="col-md-10">
          <h2 className="reviewer-section-title mentor-application-header col-md-12 p-3">
            Anticipated Protégé
          </h2>
        </div>
      )}
      <div className="col-md-10">
        {summary && (
          <h2 className="mb-1 my-3 mentor-summary-section-heading">
            Anticipated Protégé{' '}
          </h2>
        )}
        <div className="row mb-3" data-test-id="Current Plan">
          <fieldset className="col-12">
            <legend>
              <span aria-hidden="true">*</span>Do you have any Anticipated
              Protégé?
            </legend>
            <div>
              <OptionField
                name="has_anticipated_protege"
                placeholder="Current Plan"
                options={currentEligibleAwardOptions}
                value={mentorApp && mentorApp['has_anticipated_protege']}
                view={mentorApplicationInfo || summary}
                onKeyDown={keydownHandler}
              />
            </div>
            <div className='col-md-10'>
              <div className='row'>
                <div className='col-md-12 pl-0'>
                  {submitted &&
                    mentorApp &&
                    !mentorApp['has_anticipated_protege'] && (
                      <p className='erorr-red my-2'>
                        This is a required field.
                      </p>
                    )}
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div
        className="col-12 col-sm-12 col-md-8"
        data-test-id="eligibility-textarea"
      >
        {/* {summary && <h3 className="mt-3 my-3 mentor-summary-section-heading">Eligibility </h3>} */}
        {summary &&
          summary['has_anticipated_protege'] &&
          summary['has_anticipated_protege'].toString() === 'true' && (
            <div className="row mt-3 px-3">
              {mentorApp && mentorApp['anticipated_protege_details'] && (
                <>
                  <div className="col-md-12 p-0 my-2">
                    <h3 className="m-0 heading-text mentor-summary-section-heading">
                      Explanation
                    </h3>
                  </div>
                  <div className="col-md-12 p-0">
                    {mentorApp['anticipated_protege_details']}
                  </div>
                </>
              )}
              {allMentorAppMentorUser?.[uploadFieldName] && (
                <div className="col-md-12 pl-0 summary-files-table">
                  <h3 className="mx-0 mb-3 heading-text mentor-summary-section-heading">
                    Document Upload For Anticipated Protégé:
                  </h3>
                  <p className="my-2">
                    Acceptable formats are: PDF, Word, or Excel. Maximum file
                    size is 5MB.
                  </p>
                  <FileUploadComponent
                    agreement_type={agreement_type}
                    field_name={uploadFieldName}
                    agreement_id={mentor_app_id}
                    initialFiles={allMentorAppMentorUser?.[uploadFieldName]}
                    isMentorApplication={true}
                    reviewMode={true}
                    getUuid={getUuid}
                    userUuid={userUuid}
                    fileUploadComponentAddBtnId={'mentor-app-eligibility'}
                  />
                </div>
              )}
              
            </div>
          )}
          

        {!summary &&
          mentorApp &&
          mentorApp['has_anticipated_protege'] &&
          mentorApp['has_anticipated_protege'].toString() === 'true' && (
            <>
              <fieldset>
                <legend>
                  <p className="my-3">
                  Provide a statement or upload documentation about who the anticipated protégé is - Company name, Company address, NAICS, POC, Explanation/Justification for the match, etc.
                  </p>
                  <p className="my-3">
                    <strong>
                      IMPORTANT: You must select at least one option.
                    </strong>
                  </p>
                  <p className="mb-2">
                    <span aria-hidden="true">*</span>Select whether you will be
                    writing an explanation and/or uploading documents:
                    <i className="sr-only">This is a required field.</i>
                  </p>
                </legend>
                <ExplanationStatementModal
                  showModal={showModal}
                  showSpinner={showSpinner}
                  message={modalMessage}
                  statementType={modalType}
                  retainStatementHandler={retainStatementFunctionHandler}
                  clearStatementHandler={clearStatementFunctionHandler}
                />
                <div className="row mb-3">
                  <div className="col-md-10">
                    <div className="row">
                      <div className="col-md-12">
                        <InputCheckbox
                          label={'Write an explanation on this page'}
                          name="anticipated_protege_explanation_check"
                          id="anticipated_protege_explanation_checkbox"
                          value={isStatement}
                          checked={isStatement}
                          onClick={showStatement}
                        />
                      </div>
                    </div>
                    <div className="row ml-2">
                      <div className="col-md-12">
                        {isStatement && (
                          <InputField
                            name="anticipated_protege_details"
                            type="textarea"
                            placeholder="Explanation"
                            id="eligibility-textarea"
                            value={
                              mentorApp &&
                              mentorApp['anticipated_protege_details']
                            }
                            rows="4"
                            dependent={eligibilityFile}
                            required={true}
                            view={mentorApplicationInfo || summary}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="row">
                      <div className="col-md-12">
                        <InputCheckbox
                          label={'Upload a document'}
                          name={uploadFieldName}
                          id={uploadFieldName}
                          view={mentorApplicationInfo || summary}
                          value={isDocument}
                          checked={isDocument}
                          onClick={showDocumentUpload}
                          onKeyDown={(e) =>
                            keydownHandler(e, showDocumentUpload)
                          }
                        />
                      </div>
                    </div>
                    <div className="row ml-2">
                      <div className="col-md-12">
                        {(isDocument ||
                          mentorApp?.[uploadFieldName] ||
                          allMentorAppMentorUser?.[uploadFieldName]) && (
                          <>
                            <p className="my-2">
                              *Acceptable formats are: PDF, Word, or Excel. Maximum file size is 5MB.
                            </p>
                            <FileUploadComponent
                              agreement_type={agreement_type}
                              field_name={uploadFieldName}
                              agreement_id={mentor_app_id}
                              handleUploadedFiles={handleUploadedFiles}
                              getMentorApp={getMentorApp}
                              initialFiles={
                                mentorApp?.[uploadFieldName] ||
                                allMentorAppMentorUser?.[uploadFieldName]
                              }
                              isMentorApplication={true}
                              getUuid={getUuid}
                              userUuid={userUuid}
                              fileUploadComponentAddBtnId={
                                'non-summary-mentor-app-anticipated'
                              }
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="row">
                      <div className="col-md-12">
                        {isExplanationOrFileUploadProvided && (
                          <p className="erorr-red my-2">
                            No information was provided. You must either write
                            an explanation and/or upload document(s).
                          </p>
                        )}
                        {areAllDeletedDocumentsDisplayed && (
                          <p className="erorr-red my-2">
                            Uploaded files for Anticipated Protégé are not
                            deleted completely. Please try to delete them again.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </>
          )}
      </div>
    </div>
  );
}

export default AnticipatedProtege
