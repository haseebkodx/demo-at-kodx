import React, { useEffect, useState } from "react";
import OptionField from "../../commonComponents/forms/OptionField";
import { keydownHandler } from "../../commonComponents/utility";
import Eligibility2 from "./Eligibility2";
import DfarsEligibilityModal from "../../commonComponents/DfarsEligibilityModal";

function Eligibility({
  mentorApp,
  mentorApplicationInfo,
  submitted,
  summary,
  isEligibleStatement,
  handleUploadedFiles,
  mentor_app_id,
  agreement_type,
  agreement_id,
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
  onFileChange,
  setEligibilityFile,
  isEligibleFiles,
  mentorApplicationInformation,
  handleEligibilityFiles,
  mentorAppId,
  eligibilityFile,
  isEligibilityExplanationOrFileUploadMissing,
  fieldNames,
  userInfo,
  fileChange,
  initialFiles,
}) {
  const [showDfarsEligibilityModal, setShowDfarsEligibilityModal] =
    useState(false);

  //eligibility question 1
  useEffect(() => {
    if (mentorApp?.active_subcontracting_plan && !summary) {
      if (mentorApp["active_subcontracting_plan"] === "false") {
        setShowDfarsEligibilityModal(true);
      }
    }
  }, [summary, mentorApp?.active_subcontracting_plan]);

  //eligibility question 2
  useEffect(() => {
    if (mentorApp?.current_fiscal_year_dod_contracts && !summary) {
      if (mentorApp["current_fiscal_year_dod_contracts"] === "false") {
        setShowDfarsEligibilityModal(true);
      }
    }
  }, [summary, mentorApp?.current_fiscal_year_dod_contracts]);

  //eligibility question 3
  useEffect(() => {
    if (mentorApp?.eligible_for_federal_contracts && !summary) {
      if (mentorApp["eligible_for_federal_contracts"] === "false") {
        setShowDfarsEligibilityModal(true);
      }
    }
  }, [summary, mentorApp?.eligible_for_federal_contracts]);

  const currentPlanOptions = [
    {
      name: "Current Plan",
      label: "Yes",
      value: "true",
      id: `Yes - Current Plan`,
    },
    {
      name: "Current Plan",
      label: "No",
      value: "false",
      id: `No - Current Plan`,
    },
  ];

  const currentEligibleAwardOptions = [
    {
      name: "Current Eligible Award",
      label: "Yes",
      value: "true",
      id: `Yes - Current Eligible Award`,
    },
    {
      name: "Current Eligible Award",
      label: "No",
      value: "false",
      id: `No - Current Eligible Award`,
    },
  ];

  return (
    <div
      id="eligibility-questions"
      className={`row ${summary ? "mt-5" : "mb-3"}`}
    >
      {!summary && (
        <div className="col-md-10">
          <h2 className="reviewer-section-title mentor-application-header col-md-12 p-3">
            Eligibility
          </h2>
        </div>
      )}
      <div className="col-md-10">
        {summary && (
          <h2 className="mb-1 my-3 mentor-summary-section-heading">
            Eligibility{" "}
          </h2>
        )}
        <div className="row mb-3" data-test-id="Current Plan">
          <fieldset className="col-12">
            <legend>
              <span aria-hidden="true">1. *</span>Are you currently a prime
              contractor to DoD with an active subcontracting plan pursuant to
              FAR 19.702?
              <i className="sr-only">This is a required field.</i>
            </legend>
            <div>
              <OptionField
                name="active_subcontracting_plan"
                placeholder="Current Plan"
                options={currentPlanOptions}
                value={mentorApp && mentorApp["active_subcontracting_plan"]}
                view={mentorApplicationInfo || summary}
                onKeyDown={keydownHandler}
              />
            </div>
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-12 pl-0">
                  {submitted &&
                    mentorApp &&
                    !mentorApp["active_subcontracting_plan"] && (
                      <p className="erorr-red my-2">
                        This is a required field.
                      </p>
                    )}
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        {mentorApp &&
          mentorApp["active_subcontracting_plan"] &&
          (mentorApp["active_subcontracting_plan"] === true ||
            mentorApp["active_subcontracting_plan"] === "true") && (
            <Eligibility2
              mentorApp={mentorApp}
              summary={summary}
              fileChange={fileChange}
              hook={hook}
              isEligibleStatement={isEligibleStatement}
              isEligibleFiles={isEligibleFiles}
              mentorApplicationInfo={mentorApplicationInfo}
              agreement_type={agreement_type}
              agreement_id={agreement_id}
              handleUploadedFiles={handleUploadedFiles}
              mentor_app_id={mentor_app_id}
              initialFiles={initialFiles}
              eligibilityUploadFile={eligibilityUploadFile}
              getMentorApp={getMentorApp}
              isEligibilityExplanationOrFileUploadProvided={
                isEligibilityExplanationOrFileUploadProvided
              }
              uploadFieldName={uploadFieldName}
              getUuid={getUuid}
              userUuid={userUuid}
              allMentorAppMentorUser={allMentorAppMentorUser}
              isMentor={isMentor}
              isReviewer={isReviewer}
            />
          )}
        <div
          className="row mb-3"
          data-test-id="DOD Contract for current fiscal year"
        >
          <fieldset className="col-12">
            <legend>
              <p className="left-align mb-1">
                <span aria-hidden="true">2. *</span>Have you received DoD contracts
                and subcontracts equal to or greater than $25 million during the
                previous fiscal year?
                <i className="sr-only">This is a required field.</i>
              </p>
            </legend>
            <div>
              <OptionField
                name="current_fiscal_year_dod_contracts"
                placeholder="DOD Contract for current fiscal year"
                options={currentEligibleAwardOptions}
                value={
                  mentorApp && mentorApp["current_fiscal_year_dod_contracts"]
                }
                view={mentorApplicationInfo || summary}
                onKeyDown={keydownHandler}
              />
            </div>
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-12 pl-0">
                  {submitted &&
                    mentorApp &&
                    !mentorApp["current_fiscal_year_dod_contracts"] && (
                      <p className="erorr-red my-2">
                        This is a required field.
                      </p>
                    )}
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="row" data-test-id="Current Eligible Award">
          <fieldset className="col-12">
            <legend>
              <p className="left-align mb-1">
                <span aria-hidden="true">3. *</span>Is the company currently
                eligible for the award of Federal contracts and not on a Federal
                list of debarred or suspended contractors?
                <i className="sr-only">This is a required field.</i>
              </p>
            </legend>
            <div>
              <OptionField
                name="eligible_for_federal_contracts"
                placeholder="Current Eligible Award"
                options={currentEligibleAwardOptions}
                value={mentorApp && mentorApp["eligible_for_federal_contracts"]}
                view={mentorApplicationInfo || summary}
                onKeyDown={keydownHandler}
              />
            </div>
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-12 pl-0">
                  {submitted &&
                    mentorApp &&
                    !mentorApp["eligible_for_federal_contracts"] && (
                      <p className="erorr-red my-2">
                        This is a required field.
                      </p>
                    )}
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <DfarsEligibilityModal
        showModal={showDfarsEligibilityModal}
        closeModal={() => setShowDfarsEligibilityModal(false)}
      />
    </div>
  );
}

export default Eligibility;
