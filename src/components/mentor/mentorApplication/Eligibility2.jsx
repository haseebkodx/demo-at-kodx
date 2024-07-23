/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import InputField from "../../commonComponents/forms/InputField";
import InputCheckbox from "../../commonComponents/forms/InputCheckbox";
import ExplanationStatementModal from "./ExplanationStatementModal";
import FileUploadComponent from "../../multifileUpload/FileUploadComponent";
import { keydownHandler } from "../../commonComponents/utility";
import { deleteMentorAppFile } from "../../multifileUpload/fileUploadService";

function Eligibility2({
  mentorApp,
  isEligibleStatement,
  mentorApplicationInfo,
  summary,
  handleUploadedFiles,
  mentor_app_id,
  agreement_type,
  isEligibilityExplanationOrFileUploadProvided,
  getUuid,
  userUuid,
  /* File upload field */
  uploadFieldName,
  allMentorAppMentorUser,
  eligibilityUploadFile,
  getMentorApp,
  hook,
  isMentor = false,
  isReviewer = false,
}) {
  /* Doesn't look like this is used */
  const [eligibilityFile, setEligilityFile] = useState(null);
  const [isStatement, setIsStatement] = useState(
    mentorApp && mentorApp["eligibility_explanation"] ? true : false
  );
  const [isDocument, setIsDocument] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [modalMessage, setModalMessage] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [areAllDeletedDocumentsDisplayed, setAreAllDeletedDocumentsDisplayed] =
    useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    setIsStatement(isEligibleStatement);
  }, [isEligibleStatement]);

  const allMentorAppEligibilityUploadFile =
    allMentorAppMentorUser?.[uploadFieldName];

  useEffect(() => {
    if (allMentorAppEligibilityUploadFile?.length > 0) {
      setIsDocument(true);
    }
  }, [allMentorAppEligibilityUploadFile]);

  useEffect(() => {
    if (eligibilityUploadFile && eligibilityUploadFile.length === 0) {
      setIsDocument(false);
    }
  }, [eligibilityUploadFile]);

  useEffect(() => {
    if (modalMessage && modalType) {
      setShowModal(true);
    }
  }, [modalMessage, modalType]);

  useEffect(() => {
    if (!showModal) {
      setModalType(null);
      setModalMessage(null);
    }
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      setShowModal(false);
    }
  }, [isStatement, isDocument]);

  useEffect(() => {
    if (
      !showSpinner &&
      !areAllDeletedDocumentsDisplayed &&
      allMentorAppMentorUser &&
      !allMentorAppMentorUser[uploadFieldName]
    ) {
      hook && hook([]);
    } else {
      setShowModal(false);
    }
  }, [showSpinner]);

  const showStatement = (event) => {
    if (mentorApp && mentorApp["eligibility_explanation"]) {
      setModalType("Eligibility Statement");
      setModalMessage(
        "Unchecking this checkbox will clear out the Eligibility explanation text. Do you want to continue?"
      );
      event.preventDefault();
    } else {
      setIsStatement(!isStatement);
    }
  };

  const showDocumentUpload = (event) => {
    if (eligibilityUploadFile && eligibilityUploadFile.length > 0) {
      setModalType("Eligibility File(s) Upload");
      setModalMessage(
        "Unchecking this checkbox will delete all the Eligibility uploaded files. Do you want to continue?"
      );
      event.preventDefault();
    } else {
      setIsDocument(!isDocument);
    }
  };

  const retainStatementFunctionHandler = () => {
    setShowModal(false);
  };

  const clearStatementFunctionHandler = () => {
    if (isStatement && modalType === "Eligibility Statement") {
      mentorApp["eligibility_explanation"] = "";
      setIsStatement(false);
    } else if (isDocument && modalType === "Eligibility File(s) Upload") {
      setAreAllDeletedDocumentsDisplayed(false);
      setShowSpinner(true);
      const eligibilityDeleteFilePromises = eligibilityUploadFile.map(
        (fileToDelete) => deleteMentorAppFile({ fileToDelete })
      );
      Promise.all(eligibilityDeleteFilePromises)
        .then(() => {
          return getMentorApp();
        })
        .catch(() => {
          setAreAllDeletedDocumentsDisplayed(true);
        })
        .finally(() => {
          setShowSpinner(false);
        });
    }
  };

  return (
    <div
      id="eligibility-content"
      className={`row left-align ${summary ? "mt-3" : "mb-5"}`}
    >
      <div
        className="col-12 col-sm-12 col-md-8"
        data-test-id="eligibility-textarea"
      >
        {/* {summary && <h3 className="mt-3 my-3 mentor-summary-section-heading">Eligibility </h3>} */}
        {summary && (
          <p style={{ fontStyle: summary && "italic" }} className="my-3">
            Provide any supporting documentation regarding your approved
            subcontracting plan negotiated with the DoD or another Federal
            agency pursuant to FAR 19.702, and that the company is currently
            eligible for the award of Federal contracts.
          </p>
        )}
        {summary && (
          <div className="row mt-3 px-3">
            {mentorApp && mentorApp["eligibility_explanation"] && (
              <>
                <div className="col-md-12 p-0 my-2">
                  <h3 className="m-0 heading-text mentor-summary-section-heading">
                    Explanation
                  </h3>
                </div>
                <div className="col-md-12 p-0 mb-3">
                  {mentorApp["eligibility_explanation"]}
                </div>
              </>
            )}
            {isMentor &&
            allMentorAppMentorUser &&
            allMentorAppMentorUser[uploadFieldName] ? (
              <div className="col-md-12 pl-0 summary-files-table">
                <h3 className="mx-0 mb-3 heading-text mentor-summary-section-heading">
                  Document Upload For Eligibility:
                </h3>
                <p className="my-2">
                  Acceptable formats are: PDF, Word, or Excel. Maximum file size
                  is 5MB.
                </p>
                <FileUploadComponent
                  agreement_type={agreement_type}
                  field_name={uploadFieldName}
                  agreement_id={mentor_app_id}
                  initialFiles={
                    allMentorAppMentorUser &&
                    allMentorAppMentorUser[uploadFieldName]
                  }
                  isMentorApplication={true}
                  reviewMode={true}
                  getUuid={getUuid}
                  userUuid={userUuid}
                  fileUploadComponentAddBtnId={"mentor-app-eligibility"}
                />
              </div>
            ) : isReviewer && mentorApp && mentorApp[uploadFieldName] ? (
              <div className="col-md-12 pl-0 summary-files-table">
                <h3 className="mx-0 mb-3 heading-text mentor-summary-section-heading">
                  Document Upload For Eligibility:
                </h3>
                <p className="my-2">
                  Acceptable formats are: PDF, Word, or Excel. Maximum file size
                  is 5MB.
                </p>
                <FileUploadComponent
                  agreement_type={agreement_type}
                  field_name={uploadFieldName}
                  agreement_id={mentor_app_id}
                  initialFiles={mentorApp && mentorApp[uploadFieldName]}
                  isMentorApplication={true}
                  reviewMode={true}
                  getUuid={getUuid}
                  userUuid={userUuid}
                  fileUploadComponentAddBtnId={"mentor-app-review-eligibility"}
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
                <p className="my-3">
                  Provide any supporting documentation regarding your approved
                  subcontracting plan negotiated with the DoD or another Federal
                  agency pursuant to FAR 19.702, and that the company is
                  currently eligible for the award of Federal contracts.
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
              <div className="row mb-3">
                <div className="col-md-10">
                  <div className="row">
                    <div className="col-md-12">
                      <InputCheckbox
                        label={"Write an explanation on this page"}
                        name="eligibility_explanation_check"
                        id="eligibility_explanation"
                        view={mentorApplicationInfo || summary}
                        value={isStatement}
                        checked={isStatement}
                        onClick={showStatement}
                        onKeyDown={(e) => keydownHandler(e, showStatement)}
                      />
                    </div>
                  </div>
                  <div className="row ml-2">
                    <div className="col-md-12">
                      {isStatement && (
                        <InputField
                          name="eligibility_explanation"
                          type="textarea"
                          placeholder="Explanation"
                          id="eligibility-textarea"
                          value={
                            mentorApp && mentorApp["eligibility_explanation"]
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
                        label={"Upload a document"}
                        name={uploadFieldName}
                        id={uploadFieldName}
                        view={mentorApplicationInfo || summary}
                        value={isDocument}
                        checked={isDocument}
                        onClick={showDocumentUpload}
                        onKeyDown={(e) => keydownHandler(e, showDocumentUpload)}
                      />
                    </div>
                  </div>
                  <div className="row ml-2">
                    <div className="col-md-12">
                      {isDocument && (
                        <>
                          <p className="my-2">
                            Acceptable formats are: PDF, Word, or Excel. Maximum
                            file size is 5MB.
                          </p>
                          <FileUploadComponent
                            agreement_type={agreement_type}
                            field_name={uploadFieldName}
                            agreement_id={mentor_app_id}
                            handleUploadedFiles={handleUploadedFiles}
                            getMentorApp={getMentorApp}
                            initialFiles={
                              allMentorAppMentorUser &&
                              allMentorAppMentorUser[uploadFieldName]
                            }
                            isMentorApplication={true}
                            getUuid={getUuid}
                            userUuid={userUuid}
                            fileUploadComponentAddBtnId={
                              "non-summary-mentor-app-eligibility"
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
                      {isEligibilityExplanationOrFileUploadProvided && (
                        <p className="erorr-red my-2">
                          No information was provided. You must either write an
                          explanation and/or upload document(s).
                        </p>
                      )}
                      {areAllDeletedDocumentsDisplayed && (
                        <p className="erorr-red my-2">
                          Uploaded files for eligibility are not deleted
                          completely. Please try to delete them again.
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

export default Eligibility2;
