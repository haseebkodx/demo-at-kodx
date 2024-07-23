import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Eligibility from "./Eligibility";
import HistoricalBackground from "./HistoricalBackground";
import TermsAndConditions from "./TermsAndConditions";
import Eligibility2 from "./Eligibility2";
import History from "./History";
import DevelopmentalAssistance from "./DevelopmentAssistance";
import AcceptModal from "../../reviewer/AcceptModal";
import DeclineReasonModal from "../../reviewer/DeclineReasonModal";
import setApproveDeclineMentorApp from "../../reviewer/setApproveOrDeclineMentorApplication.action";
import {
  formatDollar,
  formatPhone,
} from "../../../../src/helpers/formatter/format";
import _ from "lodash";
import ApplicationStatus from "../../reviewer/ApplicationStatus/ApplicationStatus";
import { getAllMentorFiles } from "../../reviewer/ApplicationStatus/getFilesCall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Information from "../../commonComponents/InformationRow";
import InputField from "../../commonComponents/forms/InputField";
import phoneFormat from "../../../helpers/formatter/formatPhone";
import cleanFormatDollar from "../../../helpers/formatter/cleanDollarFormat";
import AnticipatedProtege from "./AnticipatedProtege";
import { fieldNames } from "./MentorApplication";

function MentorApplicationSummary({
  mentorApp,
  changeToApplication,
  sendMentorApp,
  applicationStatus,
  mentor_app_id,
  agreement_type,
  userUuid,
  statusReason,
  allMentorAppMentorUser,
  isMentor = false,
  isReviewer = false,
  uuid,
}) {
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [reviewerFiles, setReviewerFiles] = useState(null);
  const [comments, setComments] = useState(null);
  const [appId, setAppId] = useState(null);
  const [companyInformation, setCompanyInformation] = useState({});
  const [contactInformation, setContactInformation] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (mentorApp && mentorApp.uuid) {
      setAppId(mentorApp.uuid);

      const {
        legal_business_name,
        company_address,
        company_phone,
        company_city,
        company_state,
        company_zip,
        company_fax,
        duns_number,
        cage_code,
        mpp_contact_first_name,
        mpp_contact_last_name,
        mpp_contact_title,
        mpp_contact_email,
        mpp_contact_phone,
        mpp_contact_address,
        mpp_contact_city,
        mpp_contact_state,
        mpp_contact_zip,
      } = mentorApp;

      setCompanyInformation({
        legal_business_name,
        company_address,
        company_phone,
        company_city,
        company_state,
        company_zip,
        company_fax,
        duns_number,
        cage_code,
      });

      setContactInformation({
        mpp_contact_first_name,
        mpp_contact_last_name,
        mpp_contact_title,
        mpp_contact_email,
        mpp_contact_phone,
        mpp_contact_address,
        mpp_contact_city,
        mpp_contact_state,
        mpp_contact_zip,
      });
    }
  }, [mentorApp]);

  useEffect(() => {
    if (allMentorAppMentorUser) {
      const {
        legal_business_name,
        company_address,
        company_phone,
        company_city,
        company_state,
        company_zip,
        company_fax,
        duns_number,
        cage_code,
        mpp_contact_first_name,
        mpp_contact_last_name,
        mpp_contact_title,
        mpp_contact_email,
        mpp_contact_phone,
        mpp_contact_address,
        mpp_contact_city,
        mpp_contact_state,
        mpp_contact_zip,
      } = allMentorAppMentorUser;

      setCompanyInformation({
        legal_business_name,
        company_address,
        company_phone,
        company_city,
        company_state,
        company_zip,
        company_fax,
        duns_number,
        cage_code,
      });

      setContactInformation({
        mpp_contact_first_name,
        mpp_contact_last_name,
        mpp_contact_title,
        mpp_contact_email,
        mpp_contact_phone,
        mpp_contact_address,
        mpp_contact_city,
        mpp_contact_state,
        mpp_contact_zip,
      });

      if (allMentorAppMentorUser.status_reason === null) {
        setComments("No comments.");
      }

      const getFiles = async () => {
        const response = await getAllMentorFiles(allMentorAppMentorUser.uuid);
        if (
          response &&
          response.status === "Success" &&
          response.data &&
          response.data.length > 0
        ) {
          parseFiles(response.data);
        }
      };

      getFiles();
    } else if (isReviewer) {
      const getFiles = async () => {
        const response = await getAllMentorFiles(uuid);
        if (
          response &&
          response.status === "Success" &&
          response.data &&
          response.data.length > 0
        ) {
          parseFiles(response.data);
        }
      };

      getFiles();
    }
  }, [allMentorAppMentorUser, isReviewer]);

  const parseFiles = (files) => {
    const reviewerFileUploads = _.filter(files, [
      "field_name",
      "reviewer_file_upload",
    ]);
    if (reviewerFileUploads && reviewerFileUploads.length > 0) {
      setReviewerFiles(reviewerFileUploads);
    }
  };

  const HandleApproveDecline = async (uuid, approved, reason) => {
    await setApproveDeclineMentorApp({ uuid, approved, reason });
    setShowAcceptModal(false);
    setShowDeclineModal(false);
    changeToApplication(uuid);
  };

  const ShowAcceptModal = () => {
    setShowAcceptModal(true);
  };

  const ShowDeclineModal = () => {
    setShowDeclineModal(true);
  };

  const DismissAcceptModal = () => {
    setShowAcceptModal(false);
  };

  const DismissDeclineModal = () => {
    setShowDeclineModal(false);
  };

  const companyInfo = useSelector(
    (state) =>
      state.currentUserInfo &&
      state.currentUserInfo.company &&
      state.currentUserInfo.company[0]
  );

  const currentUserInfo = useSelector((state) => state.currentUserInfo);

  return (
    <div id="mentor-application-summary">
      <div className="px-5">
        <div className="px-0 mb-2 top-back-button">
          <button
            className="btn pl-0 focusable-item"
            onClick={() => changeToApplication()}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> <strong>Back</strong>
          </button>
        </div>
      </div>
      <main id="main">
        <div className="px-5">
          <h1 className="page-title my-4 title-heading">
            Mentor Application Summary
          </h1>
          <SubmittedInformation
            currentUserInfo={currentUserInfo}
            companyInformation={mentorApp}
          />
          <CompanyInformation companyInformation={companyInformation} />
          <Eligibility
            mentorApp={mentorApp}
            summary={mentorApp}
            agreement_type={agreement_type}
            agreement_id={mentor_app_id}
            userUuid={userUuid}
            allMentorAppMentorUser={allMentorAppMentorUser}
            isMentor={isMentor}
            isReviewer={isReviewer}
            uploadFieldName={fieldNames.eligibility}
            fieldNames={fieldNames}
          />
          {/* <Eligibility2
            mentorApp={mentorApp}
            summary={mentorApp}
            agreement_type={agreement_type}
            agreement_id={mentor_app_id}
            userUuid={userUuid}
            allMentorAppMentorUser={allMentorAppMentorUser}
            isMentor={isMentor}
            isReviewer={isReviewer}
            uploadFieldName={fieldNames.eligibility}
          /> */}
          <AnticipatedProtege
            mentorApp={mentorApp}
            summary={mentorApp}
            agreement_type={agreement_type}
            // agreement_id={mentor_app_id}
            userUuid={userUuid}
            allMentorAppMentorUser={allMentorAppMentorUser}
            isMentor={isMentor}
            isReviewer={isReviewer}
            uploadFieldName={fieldNames.anticipated_protege}
          />
          <ContactInformation contactInformation={contactInformation} />
          <HistoricalBackground mentorApp={mentorApp} summary={mentorApp} />
          <History
            mentorApp={mentorApp}
            summary={mentorApp}
            agreement_type={agreement_type}
            agreement_id={mentor_app_id}
            userUuid={userUuid}
            allMentorAppMentorUser={allMentorAppMentorUser}
            isMentor={isMentor}
            isReviewer={isReviewer}
          />
          <DODContacts mentorApp={mentorApp} />
          <DevelopmentalAssistance
            mentorApp={mentorApp}
            summary={mentorApp}
            agreement_id={mentor_app_id}
            userUuid={userUuid}
            allMentorAppMentorUser={allMentorAppMentorUser}
            isMentor={isMentor}
            isReviewer={isReviewer}
          />
          <TermsAndConditions mentorApp={mentorApp} summary={mentorApp} />

          {!isReviewer &&
          allMentorAppMentorUser &&
          (allMentorAppMentorUser.status === "declined" ||
            allMentorAppMentorUser.status === "approved") ? (
            <ApplicationStatus
              applicationStatus={allMentorAppMentorUser.status}
              statusReason={comments}
              reviewerFiles={reviewerFiles}
              isMentorApp={true}
            />
          ) : applicationStatus &&
            (applicationStatus === "approved" ||
              applicationStatus === "declined") ? (
            <ApplicationStatus
              applicationStatus={applicationStatus}
              statusReason={statusReason ? statusReason : "No comments."}
              reviewerFiles={reviewerFiles}
              isMentorApp={true}
            />
          ) : null}
        </div>
        <div className="px-5 mt-5">
          {applicationStatus == "pending" && (
            <>
              <hr />
              <div className="row">
                <div className="col-md-12 py-4 sub-heading">
                  Reviewer Approve/Decline Application
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p>
                    Please make sure you have reviewed this mentor application
                    before approving or declining the application.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mt-3">
                  <button
                    className="btn btn-primary px-5 focusable-item"
                    onClick={ShowAcceptModal}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-primary px-5 ml-4 focusable-item"
                    onClick={ShowDeclineModal}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="row">
            <div className="col-md-12 mt-5">
              <button
                className="btn px-5 bottom-back-button focusable-item"
                onClick={() =>
                  changeToApplication(
                    mentorApp &&
                      (mentorApp.status == "incomplete" ||
                        mentorApp.status == "declined")
                      ? undefined
                      : mentorApp.uuid
                  )
                }
              >
                <FontAwesomeIcon icon={faChevronLeft} color={"#172b4d"} /> Back
              </button>
              {!applicationStatus &&
                mentorApp &&
                (!mentorApp.status ||
                  mentorApp.status == "incomplete" ||
                  mentorApp.status == "declined") && (
                  <button
                    className="btn btn-primary ml-3 focusable-item"
                    onClick={() => sendMentorApp(true)}
                  >
                    Submit Application
                  </button>
                )}
            </div>
          </div>
        </div>
        <AcceptModal
          showModal={showAcceptModal}
          dismissModal={DismissAcceptModal}
          acceptApplicationHandler={HandleApproveDecline}
          reviewerPhase={"applications"}
          companyName={mentorApp && mentorApp.legal_business_name}
          uuid={mentorApp && mentorApp.uuid}
        />
        <DeclineReasonModal
          showModal={showDeclineModal}
          handleModal={DismissDeclineModal}
          handleApproveDecline={HandleApproveDecline}
          reviewerPhase={"applications"}
          companyName={mentorApp && mentorApp.legal_business_name}
          uuid={mentorApp && mentorApp.uuid}
        />
      </main>
    </div>
  );
}

const SubmittedInformation = ({ currentUserInfo, companyInformation }) => {
  return (
    <div>
      <h2 className="my-3 mentor-summary-section-heading">Submitted By</h2>
      <Information
        label="Name"
        detail={
          companyInformation && companyInformation["submitted_by_first_name"]
            ? `${companyInformation["submitted_by_first_name"]} ${companyInformation["submitted_by_last_name"]}`
            : `${currentUserInfo["first_name"]} ${currentUserInfo["last_name"]}`
        }
      />
      <Information
        label="Job Title"
        detail={
          companyInformation && companyInformation["submitted_by_title"]
            ? companyInformation["submitted_by_title"]
            : currentUserInfo["title"]
        }
      />
      <Information
        label="Phone"
        detail={
          companyInformation && companyInformation["submitted_by_phone"]
            ? formatPhone(companyInformation["submitted_by_phone"])
            : formatPhone(currentUserInfo["phone"])
        }
      />
      <Information
        label="Email"
        detail={
          companyInformation && companyInformation["submitted_by_email"]
            ? companyInformation["submitted_by_email"]
            : currentUserInfo["email"]
        }
      />
    </div>
  );
};

const CompanyInformation = ({ companyInformation }) => {
  return (
    <div className="mt-5">
      <h2 className="my-3 mentor-summary-section-heading">
        Company Information
      </h2>
      <Information
        label="Company Name"
        detail={companyInformation["legal_business_name"]}
      />
      <Information
        label="Address"
        detail={companyInformation["company_address"]}
      />
      <Information
        label="Phone"
        detail={phoneFormat(companyInformation["company_phone"])}
      />
      <Information label="City" detail={companyInformation["company_city"]} />
      <Information label="State" detail={companyInformation["company_state"]} />
      <Information label="Zip" detail={companyInformation["company_zip"]} />
      <Information
        label="Fax"
        detail={phoneFormat(companyInformation["company_fax"])}
      />
      <Information
        label="DUNS Number"
        detail={companyInformation["duns_number"]}
      />
      <Information label="Cage Code" detail={companyInformation["cage_code"]} />
    </div>
  );
};

const ContactInformation = ({ contactInformation }) => {
  return (
    <div className="mt-5">
      <h2 className="my-3 mentor-summary-section-heading">
        {" "}
        Contact Information
      </h2>
      <Information
        label="First Name"
        detail={contactInformation["mpp_contact_first_name"]}
      />
      <Information
        label="Last Name"
        detail={contactInformation["mpp_contact_last_name"]}
      />
      <Information
        label="Title"
        detail={contactInformation["mpp_contact_title"]}
      />
      <Information
        label="Email"
        detail={contactInformation["mpp_contact_email"]}
      />
      <Information
        label="Phone"
        detail={phoneFormat(contactInformation["mpp_contact_phone"])}
      />
      <Information
        label="Address"
        detail={contactInformation["mpp_contact_address"]}
      />
      <Information
        label="City"
        detail={contactInformation["mpp_contact_city"]}
      />
      <Information
        label="State"
        detail={contactInformation["mpp_contact_state"]}
      />
      <Information label="Zip" detail={contactInformation["mpp_contact_zip"]} />
    </div>
  );
};

const DODContacts = ({ mentorApp }) => {
  const currentYear = new Date().getFullYear();
  const prevYear = `Fiscal Year ${currentYear - 2}`;
  const twoPrevYear = `Fiscal Year ${currentYear - 1}`;

  const getPercentage = (value1, value2, value3) => {
    const total =
      parseInt(cleanFormatDollar(value1)) + parseInt(cleanFormatDollar(value2));
    const percent = (parseInt(cleanFormatDollar(value3)) / total) * 100;
    const val = !isNaN(percent) ? `${percent}` : "0";
    return `${parseFloat(val).toFixed(2)}%`;
  };

  return (
    <div className="mt-5">
      <h2 className="my-2 mentor-summary-section-heading"> DoD Contracts</h2>

      <div className="pl-3">
        <div className="row">
          <h3 className="col-md-8 p-0 my-3 sub-heading mentor-summary-section-heading">
            Total DoD Contracts
          </h3>
        </div>
        <div className="row">
          <div className="col-md-5 p-0 column-section">
            <div className="row">
              <div className="col-md-12 p-0 p-3 px-5">
                <div className="row">
                  <div className="col-md-12 second-sub-heading">
                    <span>
                      Total dollars of DoD contracts received by the company
                      during the two preceding fiscal years
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
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
                      disabled={true}
                      maxlength="19"
                      format={formatDollar}
                    />
                  </div>
                  <div className="col-md-6">
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
                      disabled={true}
                      maxlength="19"
                      format={formatDollar}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 p-0 column-section ml-2">
            <div className="row">
              <div className="col-md-12 p-0 p-3 px-5">
                <div className="row">
                  <div className="col-md-12 second-sub-heading">
                    <span>
                      Total dollars of DoD subcontracts received by the company
                      during the two preceding fiscal years
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
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
                      disabled={true}
                      maxlength="19"
                      format={formatDollar}
                    />
                  </div>
                  <div className="col-md-6">
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
                      disabled={true}
                      format={formatDollar}
                      maxlength="19"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pl-3 mt-3">
        <div className="row">
          <h3 className="col-md-8 p-0 my-3 sub-heading mentor-summary-section-heading">
            Other Federal Agency Contracts
          </h3>
        </div>
        <div className="row">
          <div className="col-md-5 p-0 column-section">
            <div className="row">
              <div className="col-md-12 p-0 p-3 px-5">
                <div className="row">
                  <div className="col-md-12 second-sub-heading">
                    <span>
                      Total dollars of other Federal Agency contracts received
                      by the company during the two preceding fiscal years
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <InputField
                      name="prev_year_revenue_federal_prime"
                      placeholder={prevYear}
                      id="fa-pc-prev-year"
                      required={true}
                      value={
                        (mentorApp &&
                          mentorApp["prev_year_revenue_federal_prime"]) ||
                        ""
                      }
                      disabled={true}
                      format={formatDollar}
                      maxlength="19"
                    />
                  </div>
                  <div className="col-md-6">
                    <div>
                      <InputField
                        name="two_prev_year_revenue_federal_prime"
                        placeholder={twoPrevYear}
                        id="fa-pc-prev-year"
                        required={true}
                        value={
                          (mentorApp &&
                            mentorApp["two_prev_year_revenue_federal_prime"]) ||
                          ""
                        }
                        disabled={true}
                        format={formatDollar}
                        maxlength="19"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 p-0 column-section ml-2">
            <div className="row">
              <div className="col-md-12 p-0 p-3 px-5">
                <div className="row">
                  <div className="col-md-12 second-sub-heading">
                    <span>
                      Total dollars of other Federal Agency subcontracts
                      received by the company during the two preceding fiscal
                      years
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <InputField
                      name="prev_year_revenue_federal_sub"
                      placeholder={prevYear}
                      inputPlaceholder="$0"
                      id="fa-sc-prev-year"
                      required={true}
                      value={
                        (mentorApp &&
                          mentorApp["prev_year_revenue_federal_sub"]) ||
                        ""
                      }
                      disabled={true}
                      format={formatDollar}
                      maxlength="19"
                    />
                  </div>
                  <div className="col-md-6">
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
                      disabled={true}
                      format={formatDollar}
                      maxlength="19"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pl-3 mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-5">
                <div className="row">
                  <h3 className="col-md-12 p-0 my-3 sub-heading mentor-summary-section-heading">
                    Total Subcontracts Awarded (DoD)
                  </h3>
                </div>
                <div className="row column-section p-3">
                  <div className="col-md-12 second-sub-heading">
                    Total dollars of subcontracts awarded by the company under
                    DoD contracts during the two preceding fiscal years
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-6">
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
                          disabled={true}
                          format={formatDollar}
                          maxlength="19"
                        />
                      </div>
                      <div className="col-md-6">
                        <InputField
                          name="two_prev_year_revenue_dod_awarded_sub"
                          placeholder={twoPrevYear}
                          inputPlaceholder="$0"
                          id="sc-award-two-prev-year"
                          required={true}
                          value={
                            (mentorApp &&
                              mentorApp[
                                "two_prev_year_revenue_dod_awarded_sub"
                              ]) ||
                            ""
                          }
                          disabled={true}
                          format={formatDollar}
                          maxlength="19"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 ml-2">
                <div className="row">
                  <h3 className="col-md-12 p-0 my-3 sub-heading mentor-summary-section-heading">
                    Total Subcontracts Awarded (Other Federal Agencies)
                  </h3>
                </div>
                <div className="row column-section p-3">
                  <div className="col-md-12 second-sub-heading">
                    Total dollars of subcontracts awarded by the company under
                    Other Federal Agencies during the two preceding fiscal years
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-6">
                        <InputField
                          name="prev_year_revenue_federal_awarded_sub"
                          placeholder={prevYear}
                          inputPlaceholder="$0"
                          id="sdb-sc-prev-year"
                          required={true}
                          value={
                            (mentorApp &&
                              mentorApp[
                                "prev_year_revenue_federal_awarded_sub"
                              ]) ||
                            ""
                          }
                          disabled={true}
                          format={formatDollar}
                          maxlength="19"
                        />
                      </div>
                      <div className="col-md-6">
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
                          disabled={true}
                          format={formatDollar}
                          maxlength="19"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pl-3 mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-5">
                <div className="row">
                  <h3 className="col-md-12 p-0 my-3 sub-heading mentor-summary-section-heading">
                    Total Subcontracts Awarded to SDBs (DoD)
                  </h3>
                </div>
                <div className="row column-section p-3">
                  <div className="col-md-12 second-sub-heading">
                    Total dollars and percentage of subcontract awards made to
                    all SDB firms under DoD contracts during the two preceding
                    fiscal years. (If presently required to submit SF 295,
                    provide copies of the previous two years end reports
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-6">
                        <InputField
                          name="prev_year_revenue_dod_sdb_awarded_sub"
                          placeholder={prevYear}
                          inputPlaceholder="$0"
                          id="dod-sc-sdb-prev-year"
                          required={true}
                          value={
                            (mentorApp &&
                              mentorApp[
                                "prev_year_revenue_dod_sdb_awarded_sub"
                              ]) ||
                            ""
                          }
                          mask={
                            mentorApp &&
                            mentorApp["prev_year_revenue_dod_sdb_awarded_sub"]
                          }
                          disabled={true}
                          format={formatDollar}
                          maxlength="19"
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
                      <div className="col-md-6">
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
                            mentorApp[
                              "two_prev_year_revenue_dod_sdb_awarded_sub"
                            ]
                          }
                          disabled={true}
                          format={formatDollar}
                          maxlength="19"
                        />

                        <div>
                          {getPercentage(
                            mentorApp &&
                              mentorApp[
                                "two_prev_year_revenue_total_dod_prime"
                              ],
                            mentorApp &&
                              mentorApp["two_prev_year_revenue_total_dod_sub"],
                            mentorApp &&
                              mentorApp[
                                "two_prev_year_revenue_dod_sdb_awarded_sub"
                              ]
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 ml-2">
                <div className="row">
                  <h3 className="col-md-12 p-0 my-3 sub-heading mentor-summary-section-heading">
                    Total Subcontracts Awarded to SDBs (Other Federal Agencies)
                  </h3>
                </div>
                <div className="row column-section p-3">
                  <div className="col-md-12 second-sub-heading">
                    Total dollars and percentage of subcontract awards made to
                    all SDB firms in other Federal Agencies under during the two
                    preceding fiscal years. (If presently required to submit SF
                    295, provide copies of the previous two years end reports
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-6">
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
                          disabled={true}
                          format={formatDollar}
                          maxlength="19"
                        />
                        <div>
                          {getPercentage(
                            mentorApp &&
                              mentorApp["prev_year_revenue_federal_prime"],
                            mentorApp &&
                              mentorApp["prev_year_revenue_federal_sub"],
                            mentorApp &&
                              mentorApp[
                                "prev_year_revenue_total_sdb_awarded_sub"
                              ]
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
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
                            mentorApp[
                              "two_prev_year_revenue_total_sdb_awarded_sub"
                            ]
                          }
                          disabled={true}
                          format={formatDollar}
                          maxlength="19"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorApplicationSummary;
