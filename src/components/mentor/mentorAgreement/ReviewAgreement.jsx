import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  cleanDollarFormat,
  formatDollar,
  formatPhone,
} from "../../../helpers/formatter/format";
import OptionField from "../../commonComponents/forms/OptionField";
import FileUploadComponent from "../../multifileUpload/FileUploadComponent";
import Attachments from "../../reviewer/ApplicationStatus/Attachments";
import InformationRow from "../../commonComponents/InformationRow";
import InputCheckbox from "../../commonComponents/forms/InputCheckbox";
import InputDatePicker from "../../commonComponents/forms/InputDatePickert";

function ReviewAgreement({
  mentorAgreement,
  developmentalAssistanceFile,
  handleDevAssistFiles,
  agreementId,
  agreement_type,
  allMentorAppInfo,
  mentorAgreementData,
  isMentor = false,
  isReviewer = false,
  mentorProtegeAgreement,
  allMentorProtegeAgreementData,
  latestMentorAgreementData,
  protegeAgreementData,
  isDualSummaryPage = false,
}) {
  const companyInfo = useSelector(
    (state) =>
      state.currentUserInfo &&
      state.currentUserInfo.company &&
      state.currentUserInfo.company[0]
  );

  useEffect(() => {
    sortData("contract-table1");
    sortData("contract-table2");
  }, []);

  const isProvided = (value) => {
    return value ? value : <div className="not-provided"> Not Provided</div>;
  };

  const mentorApp =
    mentorAgreement &&
    mentorAgreement.mentor_app &&
    mentorAgreement.mentor_app[0];

  return (
    <div className="col-md-12" data-test-id="Review Agreement">
      <div className="row mt-2">
        <div className="col-md-12">
          <div>
            <AgreementDetails
              mentorAgreement={mentorAgreement}
              isProvided={isProvided}
            />
            <PeriodOfPerformance
              mentorAgreement={mentorAgreement}
              isProvided={isProvided}
            />
            <EstimatedCost
              mentorAgreement={mentorAgreement}
              isProvided={isProvided}
            />
            <MentorFirm companyInfo={companyInfo} isProvided={isProvided} />
            <HistoricalBackground
              mentorAgreement={mentorAgreement}
              isProvided={isProvided}
              allMentorAppInfo={allMentorAppInfo}
              isMentor={isMentor}
              isReviewer={isReviewer}
              isDualSummaryPage={isDualSummaryPage}
              latestMentorAgreementData={latestMentorAgreementData}
              mentorApp={mentorApp}
              mentorAgreementData={mentorAgreementData}
            />
            <MentorProtegeContracts
              mentorAgreement={mentorAgreement}
              isProvided={isProvided}
            />
            <ContactInformation
              companyInfo={companyInfo}
              mentorAgreement={mentorAgreement}
              isProvided={isProvided}
            />
            <DevelopmentAssistance
              protegeAgreementData={protegeAgreementData}
              mentorAgreement={mentorAgreement}
              developmentalAssistanceFile={developmentalAssistanceFile}
              handleDevAssistFiles={handleDevAssistFiles}
              agreementId={agreementId}
              agreement_type={agreement_type}
              isMentor={isMentor}
              isProvided={isProvided}
              allMentorAppInfo={allMentorAppInfo}
              isReviewer={isReviewer}
              latestMentorAgreementData={latestMentorAgreementData}
              isDualSummaryPage={isDualSummaryPage}
              mentorAgreementFileData={mentorAgreementData}
            />
            {isMentor &&
            allMentorProtegeAgreementData &&
            (allMentorProtegeAgreementData["mentor_protege_agr_status"] ===
              "approved" ||
              allMentorProtegeAgreementData["mentor_protege_agr_status"] ===
                "declined") ? (
              <ReviewerStatus agreementData={allMentorProtegeAgreementData} />
            ) : isReviewer &&
              mentorProtegeAgreement &&
              (mentorProtegeAgreement["mentor_protege_agr_status"] ===
                "approved" ||
                mentorProtegeAgreement["mentor_protege_agr_status"] ===
                  "declined") ? (
              <ReviewerStatus agreementData={mentorProtegeAgreement} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

const AgreementDetails = ({ mentorAgreement, isProvided }) => {
  return (
    <div className="mt-3">
      <h2 className="agreement-sub-header">Agreement Details</h2>
      <div className="row">
        <div className="col-md-3 bold-label">Agreement Type</div>
        <div className="col-md-1">:</div>
        <div className="col-md-3">
          {isProvided(mentorAgreement && mentorAgreement["agreement_type"])}
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-md-3 bold-label">Contact (If Known)</div>
        <div className="col-md-1">:</div>
        <div className="col-md-3">
          {isProvided(mentorAgreement && mentorAgreement["agreement_contact"])}
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-md-3 bold-label">Solociation Title</div>
        <div className="col-md-1">:</div>
        <div className="col-md-3">
          {isProvided(mentorAgreement && mentorAgreement["solicitation_title"])}
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-md-3 bold-label">Technology Area</div>
        <div className="col-md-1">:</div>
        <div className="col-md-3">
          {isProvided(
            mentorAgreement &&
              mentorAgreement["tech_focus"] &&
              mentorAgreement["tech_focus"] === "Other"
              ? mentorAgreement["tech_focus_other_text"]
              : mentorAgreement["tech_focus"]
          )}
        </div>
      </div>
    </div>
  );
};

const PeriodOfPerformance = ({ mentorAgreement, isProvided }) => {
  const date1 = new Date(mentorAgreement && mentorAgreement["start_date"]);

  return (
    <div className="mt-5">
      <h2 className="agreement-sub-header">Period of Performance</h2>
      <div className="row mt-1">
        <div className="col-md-3 bold-label">Period Of Performance</div>
        <div className="col-md-1">:</div>
        <div className="col-md-3">
          {isProvided(mentorAgreement["number_of_months"])}
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-md-3 bold-label">Start Date</div>
        <div className="col-md-1">:</div>
        <div className="col-md-3">
          {isProvided(
            mentorAgreement &&
              mentorAgreement["start_date"] &&
              `${
                date1.getMonth() + 1
              }/${date1.getDate()}/ ${date1.getFullYear()}`
          )}
        </div>
      </div>
    </div>
  );
};

const EstimatedCost = ({ mentorAgreement }) => {
  const subTotal1 =
    mentorAgreement &&
    parseInt(
      cleanDollarFormat(
        mentorAgreement["employee_labor_year_1"]
          ? mentorAgreement["employee_labor_year_1"]
          : 0
      )
    ) +
      parseInt(
        cleanDollarFormat(
          mentorAgreement["hbcu_year_1"] ? mentorAgreement["hbcu_year_1"] : 0
        )
      ) +
      parseInt(
        cleanDollarFormat(
          mentorAgreement["direct_cost_year_1"]
            ? mentorAgreement["direct_cost_year_1"]
            : 0
        )
      );

  const subTotal2 =
    mentorAgreement &&
    parseInt(
      cleanDollarFormat(
        mentorAgreement["employee_labor_year_2"]
          ? mentorAgreement["employee_labor_year_2"]
          : 0
      )
    ) +
      parseInt(
        cleanDollarFormat(
          mentorAgreement["hbcu_year_2"] ? mentorAgreement["hbcu_year_2"] : 0
        )
      ) +
      parseInt(
        cleanDollarFormat(
          mentorAgreement["direct_cost_year_2"]
            ? mentorAgreement["direct_cost_year_2"]
            : 0
        )
      );

  const subTotal3 =
    mentorAgreement &&
    parseInt(
      cleanDollarFormat(
        mentorAgreement["employee_labor_year_3"]
          ? mentorAgreement["employee_labor_year_3"]
          : 0
      )
    ) +
      parseInt(
        cleanDollarFormat(
          mentorAgreement["hbcu_year_3"] ? mentorAgreement["hbcu_year_3"] : 0
        )
      ) +
      parseInt(
        cleanDollarFormat(
          mentorAgreement["direct_cost_year_3"]
            ? mentorAgreement["direct_cost_year_3"]
            : 0
        )
      );

  return (
    <div className="mt-5">
      <h2 className="agreement-sub-header">Estimated Costs</h2>

      <div className="row mt-2">
        <h3 className="col-md-12  agreement-mini-sub-header">Year 1</h3>
        <div className="col-md-2">
          <span className="bold-label">Employee labor</span>
          <br />
          {mentorAgreement &&
            formatDollar(mentorAgreement["employee_labor_year_1"])}
        </div>

        <div className="col-md-2">
          <span className="bold-label">HBCU/MI/PRAC/SDBC</span>
          <br />
          {mentorAgreement && formatDollar(mentorAgreement["hbcu_year_1"])}
        </div>
        <div className="col-md-2">
          <span className="bold-label">Other Direct Costs</span>
          <br />
          {mentorAgreement &&
            formatDollar(mentorAgreement["direct_cost_year_1"])}
        </div>
        <div className="col-md-2">
          <span className="bold-label">Subtotal</span>
          <br />
          {formatDollar(subTotal1)}
        </div>
        <div className="col-md-2"></div>
      </div>

      {(mentorAgreement["employee_labor_year_2"] ||
        mentorAgreement["hbcu_year_2"] ||
        mentorAgreement["direct_cost_year_2"]) && (
        <div className="row mt-2">
          <h3 className="col-md-12  agreement-mini-sub-header">Year 2</h3>
          <div className="col-md-2">
            <span className="bold-label">Employee labor</span>
            <br />
            {(mentorAgreement &&
              formatDollar(mentorAgreement["employee_labor_year_2"])) ||
              "$0"}
          </div>
          <div className="col-md-2">
            <span className="bold-label">HBCU/MI/PRAC/SDBC</span>
            <br />
            {(mentorAgreement &&
              formatDollar(mentorAgreement["hbcu_year_2"])) ||
              "$0"}
          </div>
          <div className="col-md-2">
            <span className="bold-label">Other Direct Costs</span>
            <br />
            {(mentorAgreement &&
              formatDollar(mentorAgreement["direct_cost_year_2"])) ||
              "$0"}
          </div>
          <div className="col-md-2">
            <span className="bold-label">Subtotal</span>
            <br />
            {formatDollar(subTotal2)}
          </div>
        </div>
      )}
      {(mentorAgreement["employee_labor_year_3"] ||
        mentorAgreement["hbcu_year_3"] ||
        mentorAgreement["direct_cost_year_3"]) && (
        <div className="row mt-2">
          <h3 className="col-md-12 agreement-mini-sub-header">Year 3</h3>
          <div className="col-md-2">
            <span className="bold-label">Employee labor</span>
            <br />
            {(mentorAgreement &&
              formatDollar(mentorAgreement["employee_labor_year_3"])) ||
              "$0"}
          </div>
          <div className="col-md-2">
            <span className="bold-label">HBCU/MI/PRAC/SDBC</span>
            <br />
            {(mentorAgreement &&
              formatDollar(mentorAgreement["hbcu_year_3"])) ||
              "$0"}
          </div>
          <div className="col-md-2">
            <span className="bold-label">Other Direct Costs</span>
            <br />
            {(mentorAgreement &&
              formatDollar(mentorAgreement["direct_cost_year_3"])) ||
              "$0"}
          </div>
          <br />
          <div className="col-md-2">
            <span className="bold-label">Subtotal</span>
            <br />
            {formatDollar(subTotal3)}
          </div>
        </div>
      )}
      <div className="row mt-4">
        <div className="col-md-2 bold-label">
          Total Estimated Cost
          <p className="table-data-detail">(All Budget Years)</p>
        </div>
        <div className="col-md-2 font-weight-bold">
          {mentorAgreement && formatDollar(subTotal1 + subTotal2 + subTotal3)}
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

const MentorFirm = ({ companyInfo, isProvided }) => {
  return (
    <div className="mt-5">
      <h2 className="agreement-sub-header">Mentor Company</h2>
      <div className="mt-4">
        <InformationRow
          label="Company Name"
          detail={isProvided(companyInfo && companyInfo["legal_business_name"])}
        />
        <InformationRow
          label="Address"
          detail={`${companyInfo && companyInfo["company_address"]} 
              ${companyInfo && companyInfo["company_city"]}
              ${companyInfo && companyInfo["company_state"]},
              ${companyInfo && companyInfo["company_zip"]}
              `}
        />
        <InformationRow
          label="Phone"
          detail={isProvided(
            companyInfo &&
              companyInfo["company_phone"] &&
              formatPhone(companyInfo["company_phone"])
          )}
        />
        <InformationRow
          label="Fax"
          detail={isProvided(
            companyInfo &&
              companyInfo["company_fax"] &&
              formatPhone(companyInfo["company_fax"])
          )}
        />
        <InformationRow
          label="DUNS"
          detail={isProvided(companyInfo && companyInfo["duns_number"])}
        />
        <InformationRow
          label="Cage Code"
          detail={isProvided(companyInfo && companyInfo["cage_code"])}
        />
      </div>
    </div>
  );
};

const HistoricalBackground = ({
  mentorAgreement,
  isMentor,
  isReviewer,
  latestMentorAgreementData,
  isDualSummaryPage,
  mentorApp,
  mentorAgreementData,
}) => {
  return (
    <div className="left-align col-md-12 mt-5 ml-n3">
      <div>
        <div
          className="col-md-12 ml-n3"
          data-test-id="Certified Small Business"
        >
          <h2 className="agreement-sub-header">Historical Background</h2>
          <fieldset>
            <legend>
              <div className="left-align mt-2 mb-n2">
                <span aria-hidden="true">*</span>Is your Company Certified as an
                SBA small Disadvantaged Business? <br />
                <p className="sub-detail">
                  (Women-Owned, HUBZone, Veteran Owned)
                </p>{" "}
                <span className="sr-only">This is a required question.</span>
              </div>
            </legend>
            <OptionField
              name="app_certified_small_business"
              placeholder="Certified Small Business"
              options={certificationOptions}
              value={mentorApp && mentorApp["app_certified_small_business"]}
              submitted={""}
              required={true}
              disabled={true}
            />
          </fieldset>
        </div>

        {((mentorApp &&
          mentorApp["app_certified_small_business"] &&
          mentorApp["app_certified_small_business"].toString() === "true") ||
          (mentorAgreementData &&
            mentorAgreementData["app_certified_small_business"] &&
            mentorAgreementData["app_certified_small_business"].toString() ===
              "true")) && (
          <div
            className="row"
            data-test-id="Small Disadvantaged Business Details"
          >
            <div className="col-md-12 mt-2">
              <fieldset>
                <legend>
                  <p className="left-align mb-n1">
                    <span aria-hidden="true">*</span>Check all that apply to
                    your company:{" "}
                    <span className="sr-only">
                      You must select at least one option.
                    </span>
                  </p>
                </legend>

                <InputCheckbox
                  name="app_sba_sdb"
                  placeholder="Small Disadvantaged Business (SDB)"
                  value={mentorApp && mentorApp["sba_sdb"]}
                  label={`Small Disadvantaged Business (SDB)`}
                  id={`Small Disadvantaged Business (SDB)`}
                  view={mentorAgreementData}
                  disabled={true}
                  checked={
                    mentorAgreementData &&
                    mentorAgreementData["app_sba_sdb"] &&
                    mentorAgreementData["app_sba_sdb"].toString() === "sba_sdb"
                      ? true
                      : mentorApp &&
                        mentorApp["app_sba_sdb"] &&
                        mentorApp["app_sba_sdb"].toString() === "true"
                      ? true
                      : false
                  }
                />

                <InputCheckbox
                  name="app_sba_sde"
                  placeholder="A business employing the severely disabled "
                  value={mentorApp && mentorApp["sba_sde"]}
                  label={`A business employing the severely disabled`}
                  id={`A business employing the severely disabled`}
                  view={mentorAgreementData}
                  disabled={true}
                  checked={
                    mentorAgreementData &&
                    mentorAgreementData["app_sba_sde"] &&
                    mentorAgreementData["app_sba_sde"].toString() === "true"
                      ? true
                      : mentorApp &&
                        mentorApp["app_sba_sde"] &&
                        mentorApp["app_sba_sde"].toString() === "true"
                      ? true
                      : false
                  }
                />

                <InputCheckbox
                  name="app_sba_wosb"
                  placeholder="Reporting Requirements"
                  value={mentorApp && mentorApp["app_sba_wosb"]}
                  label={`Women-Owned Small Business (WOSB)`}
                  id={`Women-Owned Small Business (WOSB)`}
                  view={mentorAgreementData}
                  checked={
                    mentorAgreementData &&
                    mentorAgreementData["app_sba_wosb"] &&
                    mentorAgreementData["app_sba_wosb"].toString() === "true"
                      ? true
                      : mentorApp &&
                        mentorApp["app_sba_wosb"] &&
                        mentorApp["app_sba_wosb"].toString() === "true"
                      ? true
                      : false
                  }
                  disabled={true}
                />

                <InputCheckbox
                  name="app_sba_hz"
                  placeholder="HUBZone Small Business(HUBZone)`"
                  value={mentorApp && mentorApp["app_sba_hz"]}
                  label={`HUBZone small business(HUBZone)`}
                  id={`HUBZone small business(HUBZone)`}
                  view={mentorAgreementData}
                  checked={
                    mentorAgreementData &&
                    mentorAgreementData["app_sba_hz"] &&
                    mentorAgreementData["app_sba_hz"].toString() === "true"
                      ? true
                      : mentorApp &&
                        mentorApp["app_sba_hz"] &&
                        mentorApp["app_sba_hz"].toString() === "true"
                      ? true
                      : false
                  }
                  disabled={true}
                />

                <InputCheckbox
                  name="app_sba_nog"
                  placeholder="A business owned and controlled by a Native Organization"
                  value={mentorApp && mentorApp["app_sba_nog"]}
                  label={`A business owned and controlled by a Native Organization`}
                  id={`A business owned and controlled by a Native Organization`}
                  view={mentorAgreementData}
                  checked={
                    mentorAgreementData &&
                    mentorAgreementData["app_sba_nog"] &&
                    mentorAgreementData["app_sba_nog"].toString() === "true"
                      ? true
                      : mentorApp &&
                        mentorApp["app_sba_nog"] &&
                        mentorApp["app_sba_nog"].toString() === "true"
                      ? true
                      : false
                  }
                  disabled={true}
                />

                <InputCheckbox
                  name="app_sba_vosb"
                  placeholder="Service-Disabled Veteran-Owned Small Business (SDVOSB)"
                  value={mentorApp && mentorApp["app_sba_vosb"]}
                  label={`Service-Disabled Veteran-Owned Small Business (SDVOSB)`}
                  id={`Service-Disabled Veteran-Owned Small Business (SDVOSB)`}
                  view={mentorAgreementData}
                  checked={
                    mentorAgreementData &&
                    mentorAgreementData["app_sba_vosb"] &&
                    mentorAgreementData["app_sba_vosb"].toString() === "true"
                      ? true
                      : mentorApp &&
                        mentorApp["app_sba_vosb"] &&
                        mentorApp["app_sba_vosb"].toString() === "true"
                      ? true
                      : false
                  }
                  disabled={true}
                />

                <InputCheckbox
                  name="app_sba_8a"
                  placeholder="8(a) program"
                  value={mentorApp && mentorApp["app_sba_8a"]}
                  label={`8(a) program`}
                  id={`8(a) program`}
                  view={mentorAgreementData}
                  checked={
                    mentorAgreementData &&
                    mentorAgreementData["app_sba_8a"] &&
                    mentorAgreementData["app_sba_8a"].toString() === "sba_8a"
                      ? true
                      : mentorApp &&
                        mentorApp["app_sba_8a"] &&
                        mentorApp["app_sba_8a"].toString() === "true"
                      ? true
                      : false
                  }
                  disabled={true}
                />
              </fieldset>

              {mentorApp &&
                mentorApp["app_sba_8a"] &&
                mentorApp["app_sba_8a"].toString() === "true" && (
                  <>
                    <label>8(a) graduated program Date (Optional)</label>
                    <div>
                      <InputDatePicker
                        name="app_sba_8a_graduated_date"
                        value={
                          mentorApp && mentorApp["app_sba_8a_graduated_date"]
                        }
                        disabled={true}
                        clearAriaLabel={"app_8a_graduated_date"}
                        calendarAriaLabel={"app_8a_graduated_date"}
                        maxDate={new Date(4102349083000)}
                      />
                    </div>
                  </>
                )}
            </div>
          </div>
        )}

        <div className="mt-4 mb-3">
          <h3 className="agreement-mini-sub-header mb-1">Summary</h3>
          {mentorAgreement &&
          mentorAgreement["historical_background_explanation"] ? (
            <p>
              {mentorAgreement &&
                mentorAgreement["historical_background_explanation"]}
            </p>
          ) : (
            <p>No summary provided.</p>
          )}
        </div>
        {isMentor &&
        !isDualSummaryPage &&
        latestMentorAgreementData &&
        latestMentorAgreementData["historical_background"] ? (
          <div className="row mt-4">
            <div className="col-12">
              <h3 className="agreement-mini-sub-header mb-0">
                Uploaded Documents
              </h3>
              <FileUploadComponent
                agreement_type="mentor"
                agreement_id={mentorAgreement["mentor_agreement_id"]}
                initialFiles={
                  latestMentorAgreementData &&
                  latestMentorAgreementData["historical_background"]
                }
                reviewMode={true}
                fileUploadComponentAddBtnId={
                  "not-dual-summary-review-historical-background"
                }
              />
            </div>
          </div>
        ) : isMentor &&
          isDualSummaryPage &&
          mentorAgreement &&
          mentorAgreement["historical_background"] ? (
          <div className="row mt-4">
            <div className="col-12">
              <h3 className="agreement-mini-sub-header mb-0">
                Uploaded Documents
              </h3>
              <FileUploadComponent
                agreement_id={mentorAgreement["mentor_agreement_id"]}
                initialFiles={
                  mentorAgreement && mentorAgreement["historical_background"]
                }
                reviewMode={true}
                fileUploadComponentAddBtnId={
                  "dual-summary-review-historical-background"
                }
              />
            </div>
          </div>
        ) : isReviewer &&
          mentorAgreement &&
          mentorAgreement["historical_background"] ? (
          // isReviewer = true
          <div className="row mt-4">
            <div className="col-12">
              <h3 className="agreement-mini-sub-header mb-0">
                Uploaded Documents
              </h3>
              <FileUploadComponent
                agreement_id={mentorAgreement["mentor_agreement_id"]}
                initialFiles={
                  mentorAgreement && mentorAgreement["historical_background"]
                }
                reviewMode={true}
                fileUploadComponentAddBtnId={
                  "mentor-agr-review-historical-background"
                }
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const MentorProtegeContracts = ({ mentorAgreement, mentorAgreementData }) => {
  const certifiedContractsOptions = [
    {
      name: "Certified Small Business",
      label: "Yes",
      value: "true",
      id: "Yes",
    },
    {
      name: "Certified Small Business",
      label: "No",
      value: "false",
      id: "No",
    },
  ];
  return (
    <div className="col-md-12 mt-5 ml-n3">
      <div className="col-md-12 mb-4 mt-5">
        <h2 className="agreement-sub-header ml-n3">Mentor/Protégé Contracts</h2>
      </div>

      {
        <div>
          <div className="row">
            <div className="col-md-12">
              <h3 className="agreement-mini-sub-header">
                Total DoD Subcontract Awards
              </h3>
            </div>
          </div>
          <div className="row mb-5">
            {mentorAgreement["has_awarded_contracts"] &&
            mentorAgreement["is_total_federal_agency_subcontracts"] ? (
              <div
                className="col-md-12 mt-2"
                data-test-id="Sub Contract Awards"
              >
                <SubContactAwardsRows
                  val={mentorAgreementData ? 3 : 3}
                  mentorAgreement={mentorAgreement}
                  mentorAgreementData={mentorAgreementData}
                  awardType="Total DOD Subcontract Awards"
                  fiscalYear="total_fed_fiscal_year_subcontract_"
                  dollarAmount="total_fed_dollar_amount_received_"
                  contractValue="total_federal_number_"
                  tableId="contract-table1"
                />
              </div>
            ) : (
              <div className="not-provided ml-3">Not Provided</div>
            )}
          </div>
          <div className="row">
            <div className="col-md-12">
              <h3 className="agreement-mini-sub-header">
                Federal Agency Subcontracts Awarded to Protégé by Mentor
              </h3>
            </div>
          </div>
          <div className="row mb-5">
            {mentorAgreement["has_awarded_contracts"] &&
            mentorAgreement["is_federal_agency_subcontracts"] ? (
              <div
                className="col-md-12 mt-2"
                data-test-id="Sub Contract Prime Awards"
              >
                <SubContactAwardsRows
                  val={mentorAgreementData ? 3 : 3}
                  mentorAgreement={mentorAgreement}
                  mentorAgreementData={mentorAgreementData}
                  awardType="Total DOD Subcontract Awards"
                  fiscalYear="fed_fiscal_year_subcontract_"
                  dollarAmount="fed_dollar_amount_received_"
                  contractValue="federal_number_"
                  tableId="contract-table2"
                />
              </div>
            ) : (
              <div className="not-provided ml-3">Not Provided</div>
            )}
          </div>
        </div>
      }
    </div>
  );
};
const sortData = (table) => {
  const selectTable = document.getElementById(table);
  if (!selectTable) {
    return;
  }
  let tableData =
    selectTable && selectTable.getElementsByTagName("tbody").item(0);
  let rowData = tableData.getElementsByTagName("tr");
  for (let i = 0; i < rowData.length - 1; i++) {
    for (let j = 0; j < rowData.length - (i + 1); j++) {
      if (
        parseInt(rowData.item(j).getElementsByTagName("td").item(0).innerHTML) >
        parseInt(
          rowData
            .item(j + 1)
            .getElementsByTagName("td")
            .item(0).innerHTML
        )
      ) {
        tableData.insertBefore(rowData.item(j + 1), rowData.item(j));
      }
    }
  }
};

const SubContactAwardsRows = ({
  mentorAgreement,
  fiscalYear,
  dollarAmount,
  contractValue,
  isProvided,
  tableId,
}) => {
  const awards =
    mentorAgreement &&
    (mentorAgreement[`${fiscalYear}1`] ||
      mentorAgreement[`${fiscalYear}2`] ||
      mentorAgreement[`${fiscalYear}3`]);
  if (!awards) {
    return <div className="not-provided">Not Provided</div>;
  }

  return (
    <table id={tableId} className="col-md-8 border-box">
      <thead className="px-2">
        <th>Fiscal Year</th>
        <th>Funded Contract value</th>
        <th>Dollar Amount Received</th>
      </thead>
      <tbody className="px-2">
        <tr>
          <td>{mentorAgreement[`${fiscalYear}1`]}</td>
          <td>
            {mentorAgreement[`${contractValue}1`] &&
              formatDollar(mentorAgreement[`${contractValue}1`])}
          </td>
          <td>
            {mentorAgreement[`${dollarAmount}1`] &&
              formatDollar(mentorAgreement[`${dollarAmount}1`])}
          </td>
        </tr>
        <tr>
          <td>{mentorAgreement[`${fiscalYear}2`]}</td>
          <td>
            {mentorAgreement[`${contractValue}2`] &&
              formatDollar(mentorAgreement[`${contractValue}2`])}
          </td>
          <td>
            {mentorAgreement[`${dollarAmount}2`] &&
              formatDollar(mentorAgreement[`${fiscalYear}2`])}
          </td>
        </tr>
        <tr>
          <td>{mentorAgreement[`${fiscalYear}3`]}</td>
          <td>
            {mentorAgreement[`${contractValue}3`] &&
              formatDollar(mentorAgreement[`${contractValue}3`])}
          </td>
          <td>
            {mentorAgreement[`${dollarAmount}3`] &&
              formatDollar(mentorAgreement[`${dollarAmount}3`])}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
const certificationOptions = [
  {
    name: "Certified Small Business",
    label: "Yes",
    value: "true",
    id: "Yes",
  },
  {
    name: "Certified Small Business",
    label: "No",
    value: "false",
    id: "No",
  },
];

const ContactInformation = ({ companyInfo, mentorAgreement, isProvided }) => {
  const hasAdditionalPointOfContact =
    mentorAgreement &&
    mentorAgreement["has_additional_point_of_contact"] &&
    mentorAgreement["has_additional_point_of_contact"].toString() === "true";
  return (
    <div className="mt-5">
      <h2 className="agreement-sub-header">Points of Contact</h2>

      <div className="row mb-4">
        <div className="col-md-12" data-test-id="Point of Contact">
          <fieldset>
            <OptionField
              name="has_additional_point_of_contact"
              placeholder=""
              required={true}
              options={certificationOptions}
              value={
                mentorAgreement &&
                mentorAgreement["has_additional_point_of_contact"] !== null &&
                mentorAgreement["has_additional_point_of_contact"].toString()
              }
              disabled={true}
            />
          </fieldset>
        </div>
      </div>

      <h3 className="agreement-mini-sub-header mt-4 mb-3">
        Protege Firm Point of Contact(PoC)
      </h3>

      <div className="row mt-1">
        <div className="col-md-3 bold-label">Primary Contact (Full Name)</div>
        <div className="col-md-1">:</div>
        <div className="col-md-3">
          {isProvided(
            mentorAgreement && mentorAgreement["mpp_contact_first_name"]
          )}
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-md-3 bold-label">Title</div>
        <div className="col-md-1">:</div>
        <div className="col-md-3">
          {isProvided(mentorAgreement && mentorAgreement["mpp_contact_title"])}
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-md-3 bold-label">Address</div>
        <div className="col-md-1">:</div>
        <div className="col-md-3">
          {`${mentorAgreement && mentorAgreement["mpp_contact_title"]}
          ${companyInfo && companyInfo["mpp_contact_city"]}
          ${companyInfo && companyInfo["mpp_contact_state"]},
          ${companyInfo && companyInfo["mpp_contact_zip"]}
          `}
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-md-3 bold-label">Email</div>
        <div className="col-md-1">:</div>
        <div className="col-md-3">
          {isProvided(mentorAgreement && mentorAgreement["mpp_contact_email"])}
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-md-3 bold-label">Phone</div>
        <div className="col-md-1">:</div>
        <div className="col-md-3">
          {isProvided(
            formatPhone(mentorAgreement && mentorAgreement["mpp_contact_phone"])
          )}
        </div>
      </div>

      {mentorAgreement &&
        mentorAgreement["pco_selected"] &&
        mentorAgreement["pco_selected"].toString() === "true" &&
        hasAdditionalPointOfContact && (
          <div>
            <h3 className="agreement-mini-sub-header mt-4 mb-3">
              Procurring Contracting Officer (PCO)
            </h3>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">
                Primary Contact (Full Name)
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(mentorAgreement && mentorAgreement["pco_name"])}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Title</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(mentorAgreement && mentorAgreement["pco_title"])}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Address</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {`${mentorAgreement && mentorAgreement["pco_address"]}
                ${mentorAgreement && mentorAgreement["pco_city"]}
                ${mentorAgreement && mentorAgreement["pco_state"]},
                ${mentorAgreement && mentorAgreement["pco_zip"]}
                `}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Email</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(mentorAgreement && mentorAgreement["pco_email"])}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Phone</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(
                  formatPhone(mentorAgreement && mentorAgreement["pco_tel"])
                )}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Phone</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(
                  formatPhone(mentorAgreement && mentorAgreement["pco_fax"])
                )}
              </div>
            </div>
          </div>
        )}

      {mentorAgreement &&
        mentorAgreement["aco_selected"] &&
        mentorAgreement["aco_selected"].toString() === "true" &&
        hasAdditionalPointOfContact && (
          <div>
            <h3 className="agreement-mini-sub-header mt-4 mb-3">
              Cognizant Administrative contracting officer (ACO)
            </h3>

            <div className="row">
              <div className="col-md-3 bold-label">
                Primary Contact (Full Name)
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(mentorAgreement && mentorAgreement["aco_name"])}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Title</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(mentorAgreement && mentorAgreement["aco_title"])}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Address</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {`${mentorAgreement && mentorAgreement["aco_address"]}
                ${mentorAgreement && mentorAgreement["aco_city"]}
                ${mentorAgreement && mentorAgreement["aco_state"]},
                ${mentorAgreement && mentorAgreement["aco_zip"]}
                `}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Email</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(mentorAgreement && mentorAgreement["aco_email"])}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Phone</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(
                  formatPhone(mentorAgreement && mentorAgreement["aco_tel"])
                )}
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-md-3 bold-label">Fax</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(
                  formatPhone(mentorAgreement && mentorAgreement["aco_fax"])
                )}
              </div>
            </div>
          </div>
        )}

      {mentorAgreement &&
        mentorAgreement["dcma_selected"] &&
        mentorAgreement["dcma_selected"].toString() === "true" &&
        hasAdditionalPointOfContact && (
          <div>
            <h3 className="agreement-mini-sub-header mt-4 mb-3">
              Cognizant Defence Management Agency (DCMA)
            </h3>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">
                Primary Contact (Full Name)
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(mentorAgreement && mentorAgreement["dcma_name"])}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Title</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(mentorAgreement && mentorAgreement["dcma_title"])}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Address</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {`${mentorAgreement && mentorAgreement["dcma_address"]}
                ${mentorAgreement && mentorAgreement["dcma_city"]}
                ${mentorAgreement && mentorAgreement["dcma_state"]},
                ${mentorAgreement && mentorAgreement["dcma_zip"]}
               `}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Email</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(mentorAgreement && mentorAgreement["dcma_email"])}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Phone</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(
                  formatPhone(mentorAgreement && mentorAgreement["dcma_tel"])
                )}
              </div>
            </div>
          </div>
        )}

      {mentorAgreement &&
        mentorAgreement["cao_selected"] &&
        mentorAgreement["cao_selected"].toString() === "true" &&
        hasAdditionalPointOfContact && (
          <div>
            <h3 className="agreement-mini-sub-header mt-4 mb-3">
              contract Adminstration office (CAO)
            </h3>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">
                Primary Contact (Full Name)
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(mentorAgreement && mentorAgreement["cao_name"])}
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 bold-label">
                Primary Contact (Full Name)
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(mentorAgreement && mentorAgreement["cao_name"])}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Title</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(mentorAgreement && mentorAgreement["cao_title"])}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Address</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {`${mentorAgreement && mentorAgreement["cao_address"]}
                ${mentorAgreement && mentorAgreement["cao_city"]}
                ${mentorAgreement && mentorAgreement["cao_state"]},
                ${mentorAgreement && mentorAgreement["cao_zip"]}
              `}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Email</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(mentorAgreement && mentorAgreement["cao_email"])}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Phone</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(
                  formatPhone(mentorAgreement && mentorAgreement["cao_tel"])
                )}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Fax</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(
                  formatPhone(mentorAgreement && mentorAgreement["cao_fax"])
                )}
              </div>
            </div>
          </div>
        )}

      {mentorAgreement &&
        mentorAgreement["mentor_signee_poc"] === "new_mentor_signee_poc" && (
          <div>
            <h3 className="agreement-mini-sub-header mt-4 mb-3">
              Mentor Company Authorized Signee
            </h3>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">
                Primary Contact (Full Name)
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(mentorAgreement && mentorAgreement["signee_name"])}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Title</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(mentorAgreement && mentorAgreement["signee_title"])}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Address</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {`${mentorAgreement && mentorAgreement["signee_address"]}
          ${mentorAgreement && mentorAgreement["signee_city"]}
          ${mentorAgreement && mentorAgreement["signee_state"]},
          ${mentorAgreement && mentorAgreement["signee_zip"]}
          `}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Email</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(mentorAgreement && mentorAgreement["signee_email"])}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Phone</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(
                  formatPhone(mentorAgreement && mentorAgreement["signee_tel"])
                )}
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-3 bold-label">Fax</div>
              <div className="col-md-1">:</div>
              <div className="col-md-3">
                {isProvided(
                  formatPhone(mentorAgreement && mentorAgreement["signee_fax"])
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

const DevelopmentAssistance = ({
  protegeAgreementData,
  mentorAgreement,
  isMentor = false,
  isReviewer,
  latestMentorAgreementData,
  isDualSummaryPage,
  mentorAgreementFileData,
  developmentalAssistanceFile,
}) => {
  return (
    <div className="col-md-12 ml-n3 mt-5">
      <h2 className="agreement-sub-header">Developmental Assistance</h2>
      <div className="row mb-2"></div>

      <p className="mb-0">Documents uploaded by Mentor :</p>
      {isMentor &&
      !isDualSummaryPage &&
      latestMentorAgreementData &&
      latestMentorAgreementData["developmental_assistance_file"] ? (
        <FileUploadComponent
          agreement_type="mentor"
          agreement_id={mentorAgreement["mentor_agreement_id"]}
          initialFiles={
            latestMentorAgreementData &&
            latestMentorAgreementData["developmental_assistance_file"]
          }
          reviewMode={true}
          fileUploadComponentAddBtnId={
            "not-dual-summary-review-developmental-assistance"
          }
        />
      ) : isMentor &&
        isDualSummaryPage &&
        ((mentorAgreement &&
          mentorAgreement["developmental_assistance_file"]) ||
          (mentorAgreementFileData &&
            mentorAgreementFileData["developmental_assistance_file"]) ||
          (developmentalAssistanceFile &&
            developmentalAssistanceFile.length > 0)) ? (
        <FileUploadComponent
          agreement_type="reviewer"
          agreement_id={mentorAgreement["mentor_agreement_id"]}
          initialFiles={
            mentorAgreementFileData &&
            mentorAgreementFileData["developmental_assistance_file"]
              ? mentorAgreementFileData["developmental_assistance_file"]
              : mentorAgreement &&
                mentorAgreement["developmental_assistance_file"]
              ? mentorAgreement["developmental_assistance_file"]
              : developmentalAssistanceFile
          }
          reviewMode={true}
          fileUploadComponentAddBtnId={
            "dual-summary-review-developmental-assistance"
          }
        />
      ) : isReviewer &&
        mentorAgreement &&
        mentorAgreement["developmental_assistance_file"] ? (
        // isReviewer = true
        <FileUploadComponent
          agreement_type="reviewer"
          agreement_id={mentorAgreement["mentor_agreement_id"]}
          initialFiles={
            mentorAgreement && mentorAgreement["developmental_assistance_file"]
          }
          reviewMode={true}
          fileUploadComponentAddBtnId={
            "mentor-agr-review-developmental-assistance"
          }
        />
      ) : null}
      <p className="mb-0">Documents uploaded by Protege :</p>

      <FileUploadComponent
        agreement_type={"protege"}
        agreement_id={protegeAgreementData && protegeAgreementData.uuid}
        initialFiles={
          protegeAgreementData &&
          protegeAgreementData["developmental_assistance_protege_file"]
        }
        reviewMode={true}
        fileUploadComponentAddBtnId={"developmental_assistance_protege_file"}
      />
    </div>
  );
};

const ReviewerStatus = ({ agreementData }) => {
  const files = agreementData && agreementData["reviewer_uploaded_file"];

  const comments = agreementData && agreementData["status_reason"];

  const decision = agreementData && agreementData["mentor_protege_agr_status"];

  return (
    <div className="mt-5">
      <h2 className="reviewer-section-title">Reviewer Status</h2>
      <div className="agreement-sub-header">
        Reviewer&apos;s Decision for Agreement
      </div>
      <span>
        <p>{decision ? decision : "None"}</p>
      </span>

      <div className="agreement-sub-header">Comments</div>
      <span>
        <p>{comments ? comments : "None"}</p>
      </span>

      <Attachments
        reasonFiles={files}
        attachmentStyle={"agreement-sub-header"}
      />
    </div>
  );
};

export default ReviewAgreement;
