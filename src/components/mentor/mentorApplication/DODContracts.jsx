import React, { useEffect, useState } from "react";
import InputField from "../../commonComponents/forms/InputField";
//import { dollarMask } from '../../../helpers/formatter/masks'
import Ic_Warning from "../../../assets/images/ic_warning.svg";
import cleanFormatDollar from "../../../helpers/formatter/cleanDollarFormat";
import formatDollar from "../../../helpers/formatter/formatDollar";
import DoDFiscalYearModal from "../../commonComponents/DoDFiscalYearModal";
import validateMoney from "../../commonComponents/forms/validations/validateMoney";
import FileUploadComponent from "../../multifileUpload/FileUploadComponent";

FileUploadComponent;
function DODContracts({
  mentorApp,
  mentorApplicationInfo,
  isAllDodAndFederalAgenciesContractsProvided,
  agreement_type,
  field_name,
  mentor_app_id,
  allMentorAppMentorUser,
  getUuid,
  userUuid,
  handleUploadedFiles,
  getMentorApp,
}) {
  const currentYear = new Date().getFullYear();
  const prevYear = `Fiscal Year ${currentYear - 2}`;
  const twoPrevYear = `Fiscal Year ${currentYear - 1}`;

  const [showDoDFiscalYearModal, setShowDoDFiscalYearModal] = useState(false);
  const [isLessThan25Million, setIsLessThan25Million] = useState(false);

  const getPercentage = (value1, value2, value3) => {
    const total =
      parseInt(cleanFormatDollar(value1)) + parseInt(cleanFormatDollar(value2));
    const percent = (parseInt(cleanFormatDollar(value3)) / total) * 100;
    const val = !isNaN(percent) ? `${percent}` : "0";
    return `${parseFloat(val).toFixed(2)}%`;
  };

  // useEffect(() => {
  //   if (mentorApp) {
  //     let val1 = mentorApp["two_prev_year_revenue_total_dod_prime"];
  //     let val2 = mentorApp["two_prev_year_revenue_dod_awarded_sub"];
  //     if (val1 && val2) {
  //       val1 = +val1.replaceAll("$", "").replaceAll(",", "");
  //       val2 = +val2.replaceAll("$", "").replaceAll(",", "");
  //       setIsLessThan25Million(val1 + val2 < 25000000);
  //       console.log({ val1, val2 });
  //       // setShowDoDFiscalYearModal(val1 + val2 < 25000000);
  //     }
  //   }
  // }, [mentorApp]);

  const checkIsLessThan25Million = () => {
    if (mentorApp) {
      let val1 = mentorApp["two_prev_year_revenue_total_dod_prime"];
      let val2 = mentorApp["two_prev_year_revenue_dod_awarded_sub"];
      if (val1 && val2) {
        val1 = +val1.replaceAll("$", "").replaceAll(",", "");
        val2 = +val2.replaceAll("$", "").replaceAll(",", "");
        return val1 + val2 < 25000000;
      }
    }
  }

  const normalizeFirstVal = (value) => {
    setIsLessThan25Million(checkIsLessThan25Million())
    return value;
  };

  const normalizeSecondVal = (value) => {
    setShowDoDFiscalYearModal(checkIsLessThan25Million())
    return value;
  };

  const onBlurSecond = () => {
    setShowDoDFiscalYearModal(checkIsLessThan25Million())
  }

  const popupStyle = {
    width: "300px",
    display: "none",
    position: "absolute",
    bottom: "50px",
    left: "calc(85% - 75px)",
    zIndex: "1000",
    background: "white",
  };

  return (
    <div id="dod-federal-agency-contracts" className="dod-contracts left-align">
      <div className="row mb-3">
        <div className="col-md-10">
          <h2 className="reviewer-section-title mentor-application-header col-md-12 p-3">
            Prime Contracts and Sub-Contracts Awarded
          </h2>
        </div>
      </div>

      {isAllDodAndFederalAgenciesContractsProvided && (
        <div className="row my-3">
          <div className="col-md-12">
            <p className="erorr-red my-2">
              Some of the DoD Awards Contracts are not provided. You must
              provide all DoD Award Contracts.
            </p>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-10">
          <h3>
            <strong>Total DoD Contracts</strong>
          </h3>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-5 column-section p-0 p-3 px-4 ml-3">
          <fieldset>
            <legend>
              <div className="row mb-3">
                <div className="col-md-12">
                  <span className="sr-only">Total DoD Contracts</span>
                  <h4 className="m-0">
                    Total dollars of DoD contracts received by the company
                    during the two preceding fiscal years
                  </h4>
                </div>
              </div>
            </legend>
            <div className="row">
              <div className="col-md-6" data-test-id="dod-pc-prev-year">
                <InputField
                  name="prev_year_revenue_total_dod_prime"
                  placeholder={prevYear}
                  inputPlaceholder="$0"
                  id="dod-pc-prev-year"
                  required={true}
                  value={
                    (mentorApp &&
                      mentorApp["prev_year_revenue_total_dod_prime"]) ||
                    ""
                  }
                  maxlength="19"
                  format={formatDollar}
                  view={mentorApplicationInfo}
                  validation={() =>
                    validateMoney(
                      formatDollar(
                        mentorApp &&
                          mentorApp["prev_year_revenue_total_dod_prime"]
                      )
                    )
                  }
                />
              </div>
              <div
                className="col-md-6 relative"
                data-test-id="dod-pc-two-prev-year"
              >
                {isLessThan25Million && (
                  <div
                    style={popupStyle}
                    className="text-dark pt-4 px-2 border rounded-lg d-flex flex-column align-items-center justify-content-center"
                  >
                    <img src={Ic_Warning} width={30} />
                    <p
                      style={{ fontSize: "0.7rem" }}
                      className="mt-2 text-center"
                    >
                      In accordance with DFARS Appendix I, I-102 your selection
                      does not meet DoD requirement of contracts totaling at
                      least $25M in the previous fiscal year. However you can
                      still continue with your application.
                    </p>
                  </div>
                )}
                <InputField
                  name="two_prev_year_revenue_total_dod_prime"
                  placeholder={twoPrevYear}
                  inputPlaceholder="$0"
                  id="dod-pc-two-prev-year"
                  required={true}
                  value={
                    (mentorApp &&
                      mentorApp["two_prev_year_revenue_total_dod_prime"]) ||
                    ""
                  }
                  maxlength="19"
                  format={formatDollar}
                  view={mentorApplicationInfo}
                  validation={() =>
                    validateMoney(
                      formatDollar(
                        mentorApp &&
                          mentorApp["two_prev_year_revenue_total_dod_prime"]
                      )
                    )
                  }
                  normalizeValues={normalizeFirstVal}
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="col-md-5 column-section p-0 p-3 px-4 ml-3">
          <fieldset>
            <legend>
              <div className="row mb-3">
                <div className="col-md-12">
                  <span className="sr-only">Total DoD Contracts</span>
                  <h4 className="m-0">
                    Total dollars of DoD subcontracts received by the company
                    during the two preceding fiscal years
                  </h4>
                </div>
              </div>
            </legend>
            <div className="row">
              <div className="col-md-6" data-test-id="dod-sc-prev-year">
                <InputField
                  name="prev_year_revenue_total_dod_sub"
                  placeholder={prevYear}
                  inputPlaceholder="$0"
                  id="dod-sc-prev-year"
                  required={true}
                  value={
                    (mentorApp &&
                      mentorApp["prev_year_revenue_total_dod_sub"]) ||
                    ""
                  }
                  maxlength="19"
                  format={formatDollar}
                  view={mentorApplicationInfo}
                  validation={() =>
                    validateMoney(
                      formatDollar(
                        mentorApp &&
                          mentorApp["prev_year_revenue_total_dod_sub"]
                      )
                    )
                  }
                />
              </div>
              <div className="col-md-6" data-test-id="dod-sc-two-prev-year">
                <InputField
                  name="two_prev_year_revenue_total_dod_sub"
                  placeholder={twoPrevYear}
                  inputPlaceholder="$0"
                  id="dod-sc-two-prev-year"
                  required={true}
                  value={
                    (mentorApp &&
                      mentorApp["two_prev_year_revenue_total_dod_sub"]) ||
                    ""
                  }
                  format={formatDollar}
                  maxlength="19"
                  view={mentorApplicationInfo}
                  validation={() =>
                    validateMoney(
                      formatDollar(
                        mentorApp &&
                          mentorApp["two_prev_year_revenue_total_dod_sub"]
                      )
                    )
                  }
                />
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="row">
        <div className="col-md-10">
          <h3>
            <strong>Other Federal Agency Contracts</strong>
          </h3>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-5 column-section p-0 p-3 px-4 ml-3">
          <fieldset>
            <legend>
              <div className="row mb-3">
                <div className="col-md-12">
                  <span className="sr-only">Federal Agency Contracts</span>
                  <h4 className="m-0">
                    Total dollars of other Federal Agency contracts received by
                    the company during the two preceding fiscal years
                  </h4>
                </div>
              </div>
            </legend>

            <div className="row">
              <div className="col-md-6" data-test-id="fa-pc-prev-year">
                <InputField
                  name="prev_year_revenue_federal_prime"
                  placeholder={prevYear}
                  inputPlaceholder="$0"
                  id="fa-pc-prev-year"
                  required={true}
                  value={
                    (mentorApp &&
                      mentorApp["prev_year_revenue_federal_prime"]) ||
                    ""
                  }
                  format={formatDollar}
                  maxlength="19"
                  view={mentorApplicationInfo}
                  validation={() =>
                    validateMoney(
                      formatDollar(
                        mentorApp &&
                          mentorApp["prev_year_revenue_federal_prime"]
                      )
                    )
                  }
                />
              </div>
              <div className="col-md-6" data-test-id="fa-pc-two-prev-year">
                <InputField
                  name="two_prev_year_revenue_federal_prime"
                  placeholder={twoPrevYear}
                  inputPlaceholder="$0"
                  id="fa-pc-two-prev-year"
                  required={true}
                  value={
                    (mentorApp &&
                      mentorApp["two_prev_year_revenue_federal_prime"]) ||
                    ""
                  }
                  format={formatDollar}
                  maxlength="19"
                  view={mentorApplicationInfo}
                  validation={() =>
                    validateMoney(
                      formatDollar(
                        mentorApp &&
                          mentorApp["two_prev_year_revenue_federal_prime"]
                      )
                    )
                  }
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="col-md-5 column-section p-0 p-3 px-4 ml-3">
          <fieldset>
            <legend>
              <div className="row mb-3">
                <div className="col-md-12">
                  <span className="sr-only">Federal Agency Contracts</span>
                  <h4 className="m-0">
                    Total dollars of other Federal Agency subcontracts received
                    by the company during the two preceding fiscal years
                  </h4>
                </div>
              </div>
            </legend>

            <div className="row">
              <div className="col-md-6" data-test-id="fa-sc-prev-year">
                <InputField
                  name="prev_year_revenue_federal_sub"
                  placeholder={prevYear}
                  inputPlaceholder="$0"
                  id="fa-sc-prev-year"
                  required={true}
                  value={
                    (mentorApp && mentorApp["prev_year_revenue_federal_sub"]) ||
                    ""
                  }
                  format={formatDollar}
                  maxlength="19"
                  view={mentorApplicationInfo}
                  validation={() =>
                    validateMoney(
                      formatDollar(
                        mentorApp && mentorApp["prev_year_revenue_federal_sub"]
                      )
                    )
                  }
                />
              </div>
              <div className="col-md-6" data-test-id="fa-sc-two-prev-year">
                <InputField
                  name="two_prev_year_revenue_federal_sub"
                  placeholder={twoPrevYear}
                  inputPlaceholder="$0"
                  id="fa-sc-two-prev-year"
                  required={true}
                  value={
                    (mentorApp &&
                      mentorApp["two_prev_year_revenue_federal_sub"]) ||
                    ""
                  }
                  format={formatDollar}
                  maxlength="19"
                  view={mentorApplicationInfo}
                  validation={() =>
                    validateMoney(
                      formatDollar(
                        mentorApp &&
                          mentorApp["two_prev_year_revenue_federal_sub"]
                      )
                    )
                  }
                />
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-5">
          <div className="row">
            <div className="col-md-12">
              <h3>
                <strong>Total Subcontracts Awarded (DoD)</strong>
              </h3>
            </div>
            <div className="col-md-12 column-section p-0 p-3 px-4 ml-3">
              <fieldset>
                <legend>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <span className="sr-only">
                        Total Subcontracts Awarded (DoD)
                      </span>
                      <h4 className="m-0">
                        Total dollars of subcontracts awarded by the company
                        under the DoD contracts during the two preceding fiscal
                        years
                      </h4>
                    </div>
                  </div>
                </legend>

                <div className="row">
                  <div className="col-6" data-test-id="sc-award-prev-year">
                    <InputField
                      name="prev_year_revenue_dod_awarded_sub"
                      placeholder={prevYear}
                      inputPlaceholder="$0"
                      id="sc-award-prev-year"
                      required={true}
                      value={
                        (mentorApp &&
                          mentorApp["prev_year_revenue_dod_awarded_sub"]) ||
                        ""
                      }
                      format={formatDollar}
                      maxlength="19"
                      view={mentorApplicationInfo}
                      validation={() =>
                        validateMoney(
                          formatDollar(
                            mentorApp &&
                              mentorApp["prev_year_revenue_dod_awarded_sub"]
                          )
                        )
                      }
                    />
                  </div>
                  <div className="col-6" data-test-id="sc-award-two-prev-year">
                    <InputField
                      name="two_prev_year_revenue_dod_awarded_sub"
                      placeholder={twoPrevYear}
                      inputPlaceholder="$0"
                      id="sc-award-two-prev-year"
                      required={true}
                      value={
                        (mentorApp &&
                          mentorApp["two_prev_year_revenue_dod_awarded_sub"]) ||
                        ""
                      }
                      format={formatDollar}
                      maxlength="19"
                      view={mentorApplicationInfo}
                      validation={() =>
                        validateMoney(
                          formatDollar(
                            mentorApp &&
                              mentorApp["two_prev_year_revenue_dod_awarded_sub"]
                          )
                        )
                      }
                      // normalizeValues={normalizeSecondVal}
                      onBlur={onBlurSecond}
                    />
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="col-md-5 ml-3">
          <div className="row">
            <div className="col-md-12">
              <h3>
                <strong>
                  Total Subcontracts Awarded (Other Federal Agencies)
                </strong>
              </h3>
            </div>
            <div className="col-md-12 column-section p-0 p-3 px-4 ml-3">
              <fieldset>
                <legend>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <span className="sr-only">
                        Total Subcontracts Awarded (Other Federal Agencies)
                      </span>
                      <h4 className="m-0">
                        Total dollars of subcontracts awarded by the company
                        under Other Federal Agencies during the two preceding
                        fiscal years
                      </h4>
                    </div>
                  </div>
                </legend>

                <div className="row">
                  <div
                    className="col-12 col-md-6"
                    data-test-id="sdb-sc-prev-year"
                  >
                    <InputField
                      name="prev_year_revenue_federal_awarded_sub"
                      placeholder={prevYear}
                      inputPlaceholder="$0"
                      id="sdb-sc-prev-year"
                      required={true}
                      value={
                        (mentorApp &&
                          mentorApp["prev_year_revenue_federal_awarded_sub"]) ||
                        ""
                      }
                      format={formatDollar}
                      maxlength="19"
                      view={mentorApplicationInfo}
                      validation={() =>
                        validateMoney(
                          formatDollar(
                            mentorApp &&
                              mentorApp["prev_year_revenue_federal_awarded_sub"]
                          )
                        )
                      }
                    />
                  </div>
                  <div
                    className="col-12 col-md-6"
                    data-test-id="sdb-sc-two-prev-year"
                  >
                    <InputField
                      name="two_prev_year_revenue_federal_awarded_sub"
                      placeholder={twoPrevYear}
                      inputPlaceholder="$0"
                      id="sdb-sc-two-prev-year"
                      required={true}
                      value={
                        (mentorApp &&
                          mentorApp[
                            "two_prev_year_revenue_federal_awarded_sub"
                          ]) ||
                        ""
                      }
                      format={formatDollar}
                      maxlength="19"
                      view={mentorApplicationInfo}
                      validation={() =>
                        validateMoney(
                          formatDollar(
                            mentorApp &&
                              mentorApp[
                                "two_prev_year_revenue_federal_awarded_sub"
                              ]
                          )
                        )
                      }
                    />
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-5">
          <div className="row">
            <div className="col-md-12">
              <h3>
                <strong>Total Subcontracts Awarded to SDBs (DoD)</strong>
              </h3>
            </div>
            <div className="col-md-12 column-section p-0 p-3 px-4 ml-3">
              <fieldset>
                <legend>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <span className="sr-only">
                        Total Subcontracts Awarded to SDBs (DoD)
                      </span>
                      <h4 className="m-0">
                        Total dollars and percentage of subcontract awards made
                        to all SDB firms under DoD contracts during the two
                        preceding fiscal years. (If presently required to submit
                        SF 295, provide copies of the previous two years end
                        reports
                      </h4>
                    </div>
                  </div>
                </legend>

                <div className="row">
                  <div
                    className="col-12 col-md-6"
                    data-test-id="dod-sc-sdb-prev-year"
                  >
                    <InputField
                      name="prev_year_revenue_dod_sdb_awarded_sub"
                      placeholder={prevYear}
                      inputPlaceholder="$0"
                      id="dod-sc-sdb-prev-year"
                      required={true}
                      value={
                        (mentorApp &&
                          mentorApp["prev_year_revenue_dod_sdb_awarded_sub"]) ||
                        ""
                      }
                      mask={
                        mentorApp &&
                        mentorApp["prev_year_revenue_dod_sdb_awarded_sub"]
                      }
                      format={formatDollar}
                      maxlength="19"
                      view={mentorApplicationInfo}
                      validation={() =>
                        validateMoney(
                          formatDollar(
                            mentorApp &&
                              mentorApp["prev_year_revenue_dod_sdb_awarded_sub"]
                          )
                        )
                      }
                    />
                    <div>
                      {getPercentage(
                        mentorApp &&
                          mentorApp["prev_year_revenue_total_dod_prime"],
                        mentorApp &&
                          mentorApp["prev_year_revenue_total_dod_sub"],
                        mentorApp &&
                          mentorApp["prev_year_revenue_dod_sdb_awarded_sub"]
                      )}
                    </div>
                  </div>
                  <div
                    className="col-12 col-md-6"
                    data-test-id="dod-sc-sdb-two-prev-year"
                  >
                    <InputField
                      name="two_prev_year_revenue_dod_sdb_awarded_sub"
                      placeholder={twoPrevYear}
                      inputPlaceholder="$0"
                      id="dod-sc-sdb-two-prev-year"
                      required={true}
                      value={
                        (mentorApp &&
                          mentorApp[
                            "two_prev_year_revenue_dod_sdb_awarded_sub"
                          ]) ||
                        ""
                      }
                      mask={
                        mentorApp &&
                        mentorApp["two_prev_year_revenue_dod_sdb_awarded_sub"]
                      }
                      format={formatDollar}
                      maxlength="19"
                      view={mentorApplicationInfo}
                      validation={() =>
                        validateMoney(
                          formatDollar(
                            mentorApp &&
                              mentorApp[
                                "two_prev_year_revenue_dod_sdb_awarded_sub"
                              ]
                          )
                        )
                      }
                    />
                    <div>
                      {getPercentage(
                        mentorApp &&
                          mentorApp["two_prev_year_revenue_total_dod_prime"],
                        mentorApp &&
                          mentorApp["two_prev_year_revenue_total_dod_sub"],
                        mentorApp &&
                          mentorApp["two_prev_year_revenue_dod_sdb_awarded_sub"]
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 pl-0 summary-files-table">
                  <p className="my-2">
                    Acceptable formats are: PDF, Word, or Excel. Maximum file
                    size is 5MB.
                  </p>
                  <FileUploadComponent
                    agreement_type={agreement_type}
                    field_name={field_name}
                    agreement_id={mentor_app_id}
                    handleUploadedFiles={handleUploadedFiles}
                    getMentorApp={getMentorApp}
                    initialFiles={
                      allMentorAppMentorUser &&
                      allMentorAppMentorUser["sdb_dod_contract_upload_file"]
                    }
                    isMentorApplication={true}
                    getUuid={getUuid}
                    userUuid={userUuid}
                    fileUploadComponentAddBtnId={"sdb_dod_contract"}
                  />
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="col-md-5 ml-3">
          <div className="row">
            <div className="col-md-12">
              <h3>
                <strong>
                  Total Subcontracts Awarded to SDBs (Other Federal Agencies)
                </strong>
              </h3>
            </div>
            <div className="col-md-12 column-section p-0 p-3 px-4 ml-3">
              <fieldset>
                <legend>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <span className="sr-only">
                        Total Subcontracts Awarded to SDBs (Other Federal
                        Agencies)
                      </span>
                      <h4 className="m-0">
                        Total dollars and percentage of subcontract awards made
                        to all SDB firms in Other Federal Agencies under during
                        the two preceding fiscal years. (If presently required
                        to submit SF 295, provide copies of the previous two
                        years end reports
                      </h4>
                    </div>
                  </div>
                </legend>

                <div className="row">
                  <div
                    className="col-12 col-md-6"
                    data-test-id="dod-sc-sdb-prev-year"
                  >
                    <InputField
                      name="prev_year_revenue_total_sdb_awarded_sub"
                      placeholder={prevYear}
                      inputPlaceholder="$0"
                      id="total-dod-sc-sdb-prev-year"
                      required={true}
                      value={
                        (mentorApp &&
                          mentorApp[
                            "prev_year_revenue_total_sdb_awarded_sub"
                          ]) ||
                        ""
                      }
                      mask={
                        mentorApp &&
                        mentorApp["prev_year_revenue_total_sdb_awarded_sub"]
                      }
                      format={formatDollar}
                      maxlength="19"
                      view={mentorApplicationInfo}
                      validation={() =>
                        validateMoney(
                          formatDollar(
                            mentorApp &&
                              mentorApp[
                                "prev_year_revenue_total_sdb_awarded_sub"
                              ]
                          )
                        )
                      }
                    />
                    <div>
                      {getPercentage(
                        mentorApp &&
                          mentorApp["prev_year_revenue_federal_prime"],
                        mentorApp && mentorApp["prev_year_revenue_federal_sub"],
                        mentorApp &&
                          mentorApp["prev_year_revenue_total_sdb_awarded_sub"]
                      )}
                    </div>
                  </div>
                  <div
                    className="col-12 col-md-6"
                    data-test-id="dod-sc-sdb-two-prev-year"
                  >
                    <InputField
                      name="two_prev_year_revenue_total_sdb_awarded_sub"
                      placeholder={twoPrevYear}
                      inputPlaceholder="$0"
                      id="total-dod-sc-sdb-two-prev-year"
                      required={true}
                      value={
                        (mentorApp &&
                          mentorApp[
                            "two_prev_year_revenue_total_sdb_awarded_sub"
                          ]) ||
                        ""
                      }
                      mask={
                        mentorApp &&
                        mentorApp["two_prev_year_revenue_total_sdb_awarded_sub"]
                      }
                      format={formatDollar}
                      maxlength="19"
                      view={mentorApplicationInfo}
                      validation={() =>
                        validateMoney(
                          formatDollar(
                            mentorApp &&
                              mentorApp[
                                "two_prev_year_revenue_total_sdb_awarded_sub"
                              ]
                          )
                        )
                      }
                    />
                    <div>
                      {getPercentage(
                        mentorApp &&
                          mentorApp["two_prev_year_revenue_federal_prime"],
                        mentorApp &&
                          mentorApp["two_prev_year_revenue_federal_sub"],
                        mentorApp &&
                          mentorApp[
                            "two_prev_year_revenue_total_sdb_awarded_sub"
                          ]
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 pl-0 summary-files-table">
                  <p className="my-2">
                    Acceptable formats are: PDF, Word, or Excel. Maximum file
                    size is 5MB.
                  </p>
                  <FileUploadComponent
                    agreement_type={agreement_type}
                    field_name={field_name}
                    agreement_id={mentor_app_id}
                    handleUploadedFiles={handleUploadedFiles}
                    getMentorApp={getMentorApp}
                    initialFiles={
                      allMentorAppMentorUser &&
                      allMentorAppMentorUser["sdb_ofd_contract_upload_file"]
                    }
                    isMentorApplication={true}
                    getUuid={getUuid}
                    userUuid={userUuid}
                    fileUploadComponentAddBtnId={"sdb_ofd_contract"}
                  />
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      <DoDFiscalYearModal
        showModal={showDoDFiscalYearModal}
        closeModal={() => setShowDoDFiscalYearModal(false)}
      />
    </div>
  );
}

export default DODContracts;
