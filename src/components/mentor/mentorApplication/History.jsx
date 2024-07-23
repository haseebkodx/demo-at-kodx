/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import FileSaver from "file-saver";
import InputField from "../../commonComponents/forms/InputField";
import InputFileField from "../../commonComponents/forms/InputFile";
import InputCheckbox from "../../commonComponents/forms/InputCheckbox";
import validUploadFile from "../../commonComponents/forms/validations/validUploadFile";
import ExplanationStatementModal from "./ExplanationStatementModal";
import getFileData from "./getFileData.action";
import FileUploadComponent from "../../multifileUpload/FileUploadComponent";
import { keydownHandler } from "../../commonComponents/utility";
import { deleteMentorAppFile } from "../../multifileUpload/fileUploadService";

function History({
  mentorApp,
  isHistoryStatement,
  mentorApplicationInfo,
  summary,
  handleUploadedFiles,
  mentor_app_id,
  agreement_type,
  isHistoryBackgroundExplanationOrFileUploadProvided,
  getUuid,
  userUuid,
  field_name,
  allMentorAppMentorUser,
  historyUploadFile,
  getMentorApp,
  hook,
  isMentor = false,
  isReviewer = false,
}) {
  const [historicalBackgroundFiles, setHistoricalBackground] = useState(null);
  const [isStatement, setIsStatement] = useState(
    mentorApp && mentorApp["historical_background_explanation"] ? true : false
  );
  const [isDocument, setIsDocument] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [modalMessage, setModalMessage] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [areAllDeletedDocumentsDisplayed, setAreAllDeletedDocumentsDisplayed] =
    useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    setIsStatement(isHistoryStatement);
  }, [isHistoryStatement]);

  useEffect(() => {
    if (
      allMentorAppMentorUser &&
      allMentorAppMentorUser["historical_background_upload_file"] &&
      allMentorAppMentorUser["historical_background_upload_file"].length > 0
    ) {
      setIsDocument(true);
    }
  }, [allMentorAppMentorUser]);

  useEffect(() => {
    if (historyUploadFile && historyUploadFile.length === 0) {
      setIsDocument(false);
    }
  }, [historyUploadFile]);

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
      !allMentorAppMentorUser["historical_background_upload_file"]
    ) {
      hook && hook([]);
    } else {
      setShowModal(false);
    }
  }, [showSpinner]);

  const showStatement = (event) => {
    if (mentorApp && mentorApp["historical_background_explanation"]) {
      setModalType("History Statement");
      setModalMessage(
        "Unchecking this checkbox will clear out the historical background explanation text. Do you want to continue?"
      );
      event.preventDefault();
    } else {
      setIsStatement(!isStatement);
    }
  };

  const showDocumentUpload = (event) => {
    if (historyUploadFile && historyUploadFile.length > 0) {
      setModalType("History File(s) Upload");
      setModalMessage(
        "Unchecking this checkbox will delete all the history uploaded files. Do you want to continue?"
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
    if (isStatement && modalType === "History Statement") {
      mentorApp["historical_background_explanation"] = "";
      setIsStatement(false);
    } else if (isDocument && modalType === "History File(s) Upload") {
      setAreAllDeletedDocumentsDisplayed(false);
      setShowSpinner(true);
      const historyDeleteFilePromises = historyUploadFile.map((fileToDelete) =>
        deleteMentorAppFile({ fileToDelete })
      );
      Promise.all(historyDeleteFilePromises)
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
      id="history-content"
      className={`row left-align ${summary ? "mt-3" : "mb-5"}`}
    >
      <div className="col-12 col-sm-12 col-md-8">
        {/* {summary && <h3 className="mt-3 my-3 mentor-summary-section-heading">Historical Background </h3>} */}
        {summary && (
          <p style={{ fontStyle: summary && "italic" }} className="my-1">
            2. Provide a capability statement and a brief about your company,
            including the company profile and historical and recent activities
            and accomplishments.
          </p>
        )}
        {summary && (
          <div className="row mt-3 px-3">
            {mentorApp && mentorApp["historical_background_explanation"] && (
              <>
                <div className="col-md-12 p-0 my-2">
                  <h3 className="m-0 heading-text mentor-summary-section-heading">
                    Explanation
                  </h3>
                </div>
                <div className="col-md-12 p-0">
                  {mentorApp["historical_background_explanation"]}
                </div>
              </>
            )}
            {isMentor &&
            allMentorAppMentorUser &&
            allMentorAppMentorUser["historical_background_upload_file"] ? (
              <div className="col-md-12 pl-0 summary-files-table">
                <h3 className="mx-0 mb-3 heading-text mentor-summary-section-heading">
                  Document Upload For Historical Background:
                </h3>
                <p className="my-2">
                  Acceptable formats are: PDF, Word, or Excel. Maximum file size
                  is 5MB.
                </p>
                <FileUploadComponent
                  agreement_type={agreement_type}
                  field_name={field_name}
                  agreement_id={mentor_app_id}
                  initialFiles={
                    allMentorAppMentorUser &&
                    allMentorAppMentorUser["historical_background_upload_file"]
                  }
                  isMentorApplication={true}
                  reviewMode={true}
                  getUuid={getUuid}
                  userUuid={userUuid}
                  fileUploadComponentAddBtnId={"mentor-app-history"}
                />
              </div>
            ) : isReviewer &&
              mentorApp &&
              mentorApp["historical_background_upload_file"] ? (
              <div className="col-md-12 pl-0 summary-files-table">
                <h3 className="mx-0 mb-3 heading-text mentor-summary-section-heading">
                  Document Upload For Historical Background:
                </h3>
                <p className="my-2">
                  Acceptable formats are: PDF, Word, or Excel. Maximum file size
                  is 5MB.
                </p>
                <FileUploadComponent
                  agreement_type={agreement_type}
                  field_name={field_name}
                  agreement_id={mentor_app_id}
                  initialFiles={
                    mentorApp && mentorApp["historical_background_upload_file"]
                  }
                  isMentorApplication={true}
                  reviewMode={true}
                  getUuid={getUuid}
                  userUuid={userUuid}
                  fileUploadComponentAddBtnId={"mentor-app-review-history"}
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
                  2. Provide a capability statement and a brief about your
                  company, including the company profile and historical and
                  recent activities and accomplishments.
                </p>
                <p className="my-3">
                  <strong>
                    IMPORTANT: You must select at least one option.
                  </strong>
                </p>
                <p className="mb-2">
                  <span aria-hidden="true">*</span>Select whether you will be
                  writing an explanation and/or uploading documents:
                  <i className="sr-only">required</i>
                </p>
              </legend>
              <div className="row mb-3">
                <div className="col-md-10">
                  <div className="row">
                    <div className="col-md-12">
                      <InputCheckbox
                        label={"Write an explanation on this page"}
                        name="historical_background_explanation_check"
                        id="historical_background_explanation"
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
                          name="historical_background_explanation"
                          type="textarea"
                          placeholder="Explanation"
                          id="historical-bg-textarea"
                          value={
                            mentorApp &&
                            mentorApp["historical_background_explanation"]
                          }
                          rows="4"
                          dependent={historicalBackgroundFiles}
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
                        name="historical_background_upload_file"
                        id="historical_background_upload_file"
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
                            field_name={field_name}
                            agreement_id={mentor_app_id}
                            handleUploadedFiles={handleUploadedFiles}
                            getMentorApp={getMentorApp}
                            initialFiles={
                              allMentorAppMentorUser &&
                              allMentorAppMentorUser[
                                "historical_background_upload_file"
                              ]
                            }
                            isMentorApplication={true}
                            getUuid={getUuid}
                            userUuid={userUuid}
                            fileUploadComponentAddBtnId={
                              "non-summary-mentor-app-history"
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
                      {isHistoryBackgroundExplanationOrFileUploadProvided && (
                        <p className="erorr-red my-2">
                          No information was provided. You must either write an
                          explanation and/or upload document(s).
                        </p>
                      )}
                      {areAllDeletedDocumentsDisplayed && (
                        <p className="erorr-red my-2">
                          Uploaded files for history are not deleted completely.
                          Please try to delete them again.
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

export default History;
