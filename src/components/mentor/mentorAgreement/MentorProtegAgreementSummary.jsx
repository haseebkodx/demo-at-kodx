import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import InputCheckbox from '../../commonComponents/forms/InputCheckbox'
import OptionField from '../../commonComponents/forms/OptionField'
import ProtegeReviewAgreement from '../../protegeAgreement/ReviewAgreement'
import ProtegeRequestEditModal from './ProtegeRequestEditModal'
import requestProtegeForChanges from './requestProtegeForChanges.action'
import MentorReviewAgreement from './ReviewAgreement'
// implement docusign
import { Tab, Tabs } from 'react-bootstrap'
import { formatPhone } from '../../../helpers/formatter/format'
import { keydownHandler } from '../../commonComponents/utility'
import setDocusignPdfEnvelope from '../../reviewer/reviewAgreement/setDocusignPdfEnvelope.action'
import showPdf from '../../showPdf'
import './mentorAgreement.scss'

function MentorProtegeAgreementSummary({
  mentorAgreement,
  protegeAgreementData,
  setActiveStateZero,
  mentorProtegeAgreementStatus,
  mentorAgreementFileData,
  submitAgreement,
  mentorAgreementData,
  protegeAgreementStatus,
  docusignEnvelope_id,
  developmentalAssistanceFile,
  historicalBackgroundFile,
  historicalAgreementBackgroundFile,
  agreementId,
  agreement_type,
  setActiveState,
  reviewerComments,
  allMentorProtegeAgreementData,
}) {
  const [yAxis, setYAxis] = useState(null)

  const [showLoadingModal, setShowLoadingModal] = useState(false)

  // open the DocuSign file
  const openDocusignPdfFile = async (envelopeId) => {
    setShowLoadingModal(true)
    const blobResponse = await setDocusignPdfEnvelope(envelopeId)
    showPdf(blobResponse, setShowLoadingModal)
  }

  useEffect(() => {
    window.addEventListener('scroll', GetYAxis)
  }, [])

  const [activeSummary, useActiveSummary] = useState('protegeSummary')
  const protegeAgreement = null

  const ChangeActiveSummary = (summary) => {
    useActiveSummary(summary)
  }

  const protegeTabRef = useRef()
  const mentorTabRef = useRef()

  const protegeCompany =
    protegeAgreementData &&
    protegeAgreementData.protege_company &&
    protegeAgreementData.protege_company[0]

  const GetYAxis = () => {
    setYAxis(window.pageYOffset)
  }

  const [tabKey, setTabKey] = useState('protege_section')

  return (
    <div>
      {protegeAgreementStatus === 'complete' ? (
        <div>
          <div className='col-12'>
            {
              <h2 className='page-title reviewer-section-title section-header'>
                Review Agreement
              </h2>
            }

            <div>
              <p className='left-align mb-5 col-md-9 ml-n3'>
                {`
              Please review your Mentor-Protégé Agreement before proceeding by clicking on each tab on the left.
              Once your agreement has been submitted, you will not be able to edit the response.
              Upon submission, this agreement between Brewer Associates and Protégé Firm will be sent to the DoD MPP program office for review.`}
              </p>
            </div>
            <Tabs
              id="switch-tabs"
              className={`nav nav-tabs ${yAxis > 400 ? 'fixed-position-tabs' : null
                } `}
              activeKey={tabKey}
              onSelect={(key) => setTabKey(key)}
            >
              <Tab
                eventKey="protege_section"
                title="Protege Section of Agreement"
                tabClassName={tabKey === 'protege_section' ? 'tab-background-active' : 'tab-background-not-active'}>
                <ProtegeReviewAgreement
                  protegeAgreementData={protegeAgreementData}
                  protegeAgreement={protegeAgreementData}
                  docusignEnvelope_id={docusignEnvelope_id}
                  developmentalAssistanceFile={developmentalAssistanceFile}
                  agreementId={agreementId}
                  agreement_type={agreement_type}
                  historicalAgreementBackgroundFile={
                    historicalAgreementBackgroundFile
                  }
                  forMentorReview={true}
                  mentorAgreement={mentorAgreement}
                  mentorAgreementFileData={mentorAgreementData}
                  allMentorProtegeAgreementData={allMentorProtegeAgreementData}
                  isProtege={true}
                  isDualSummaryPage={true}
                />
              </Tab>
              <Tab
                eventKey="mentor_section"
                title="Mentor Section of Agreement"
                tabClassName={tabKey === 'mentor_section' ? 'tab-background-active' : 'tab-background-not-active'}
              >
                <MentorReviewAgreement
                  mentorAgreement={mentorAgreement}
                  protegeAgreementData={protegeAgreementData}
                  mentorAgreementFileData={mentorAgreementFileData}
                  docusignEnvelope_id={docusignEnvelope_id}
                  developmentalAssistanceFile={developmentalAssistanceFile}
                  historicalBackgroundFile={historicalBackgroundFile}
                  agreementId={agreementId}
                  agreement_type={agreement_type}
                  mentorAgreementData={mentorAgreementData}
                  isMentor={true}
                  allMentorProtegeAgreementData={allMentorProtegeAgreementData}
                  isDualSummaryPage={true}
                />
              </Tab>
            </Tabs>

          </div>

          <div className='mt-4 ml-3'>
            <SubmitAgreementReview
              mentorProtegeAgreementStatus={mentorProtegeAgreementStatus}
              reviewerComments={reviewerComments}
              mentorAgreement={mentorAgreement}
              protegeAgreement={protegeAgreementData}
              setActiveStateZero={setActiveStateZero}
              submitAgreement={submitAgreement}
              mentorAgreementData={mentorAgreementData}
              protegeAgreementData={protegeAgreementData}
              protegeCompany={protegeCompany}
              docusignEnvelope_id={docusignEnvelope_id}
              setActiveState={setActiveState}
            />
          </div>
        </div>
      ) : (
        <div className='ml-3 pending-protege-submission'>
          <h4 className='page-title reviewer-section-title'>
            Review Agreement
            </h4>
          <span className='pending-status'>Status</span>:{' '}
          <span className='pending-submission'>Pending Protégé Submission</span>
          <p>The Protege has not completed their agreement.</p>
          <p>
            You cannot review or submit the agreement until the protégé has
            completed their portion of the agreement.
            </p>
          <p>
            Once the protégé has completed their portion of the agreement, you
            will be able to come back to this screen where you can review and
            submit the agreement.
          </p>
        </div>
      )
      }
    </div >
  )
}

const SubmitAgreementReview = ({
  mentorAgreement,
  setActiveStateZero,
  mentorAgreementData,
  protegeCompany,
  protegeAgreementData,
  setActiveState,
  mentorProtegeAgreementStatus,
  reviewerComments,
}) => {
  const agreementId = useSelector(
    (state) =>
      state.form &&
      state.form.mentorAgreement &&
      state.form.mentorAgreement.values &&
      state.form.mentorAgreement.values.mentor_agreement_id
  )

  const [showProtegeRequestModal, useShowProtegeRequestModal] = useState(false)

  const comapanyInfo = useSelector(
    (state) =>
      state.currentUserInfo &&
      state.currentUserInfo.company &&
      state.currentUserInfo.company[0]
  )

  const mentorInfoOptions = [
    {
      name: 'change_mentor_info',
      label: 'Yes',
      value: 'true',
      id: 'Yes',
    },
    {
      name: 'change_mentor_info',
      label: 'No',
      value: 'false',
      id: 'No',
    },
  ]

  const protegeInfoOptions = [
    {
      name: 'change_protege_info',
      label: 'Yes',
      value: 'true',
      id: 'Yes',
    },
    {
      name: 'change_protege_info',
      label: 'No',
      value: 'false',
      id: 'No',
    },
  ]

  const {
    gov_business_contact_first_name,
    gov_business_contact_last_name,
    gov_business_contact_title,
    gov_business_contact_email,
    gov_business_contact_phone,
    gov_business_contact_fax,
    gov_business_contact_address,
    gov_business_contact_city,
    gov_business_contact_state,
    gov_business_contact_zip,
    electronic_business_contact_first_name,
    electronic_business_contact_last_name,
    electronic_business_contact_title,
    electronic_business_contact_email,
    electronic_business_contact_phone,
    electronic_business_contact_fax,
    electronic_business_contact_address,
    electronic_business_contact_city,
    electronic_business_contact_state,
    electronic_business_contact_zip,
    mpp_contact_first_name,
    mpp_contact_last_name,
    mpp_contact_title,
    mpp_contact_email,
    mpp_contact_phone,
    mpp_contact_fax,
    mpp_contact_address,
    mpp_contact_city,
    mpp_contact_state,
    mpp_contact_zip,
  } = comapanyInfo

  const mentorSelectedPOC =
    mentorAgreement['mentor_signee_poc'] === 'new_mentor_signee_poc'
      ? 'signee'
      : mentorAgreement['mentor_signee_poc'] === 'government_poc'
        ? 'gov_business'
        : mentorAgreement['mentor_signee_poc'] === 'electronic_poc'
          ? 'electronic_business'
          : mentorAgreement['mentor_signee_poc'] === 'mentor_poc'
            ? 'mentor_poc'
            : ''

  const protegeSelectedPOC =
    protegeAgreementData['protege_signee_poc'] === 'new_protege_signee_poc'
      ? 'signee'
      : protegeAgreementData['protege_signee_poc'] === 'government_poc'
        ? 'gov_business'
        : protegeAgreementData['protege_signee_poc'] === 'electronic_poc'
          ? 'electronic_business'
          : protegeAgreementData['protege_signee_poc'] === 'protege_poc'
            ? 'protege_poc'
            : ''

  const HandleModal = () => {
    useShowProtegeRequestModal(!showProtegeRequestModal)
  }

  const requestProtegeForChange = async (reason) => {
    const { apiData } = await requestProtegeForChanges(agreementId, reason)
    HandleModal()
    setActiveState(8)
  }

  const getMentorPrimaryContact = () => {
    return mentorSelectedPOC === 'gov_business'
      ? `${gov_business_contact_first_name} ${gov_business_contact_last_name}`
      : mentorSelectedPOC === 'electronic_business'
        ? `${electronic_business_contact_first_name}  ${electronic_business_contact_last_name}`
        : mentorSelectedPOC === 'signee'
          ? mentorAgreement && mentorAgreement['signee_name']
          : mentorSelectedPOC === 'mentor_poc'
            ? `${mpp_contact_first_name} ${mpp_contact_last_name}`
            : ''
  }

  const getMentorContactTitle = () => {
    return mentorSelectedPOC === 'gov_business'
      ? gov_business_contact_title
      : mentorSelectedPOC === 'electronic_business'
        ? electronic_business_contact_title
        : mentorSelectedPOC === 'signee'
          ? mentorAgreement && mentorAgreement['signee_title']
          : mentorSelectedPOC === 'mentor_poc'
            ? mpp_contact_title
            : ''
  }

  const getMentorContactEmail = () => {
    return mentorSelectedPOC === 'gov_business'
      ? gov_business_contact_email
      : mentorSelectedPOC === 'electronic_business'
        ? electronic_business_contact_email
        : mentorSelectedPOC === 'signee'
          ? mentorAgreement && mentorAgreement['signee_email']
          : mentorSelectedPOC === 'mentor_poc'
            ? mpp_contact_email
            : ''
  }

  const getMentorContactAddress = () => {
    return mentorSelectedPOC === 'gov_business'
      ? gov_business_contact_address
      : mentorSelectedPOC === 'electronic_business'
        ? electronic_business_contact_address
        : mentorSelectedPOC === 'signee'
          ? mentorAgreement && mentorAgreement['signee_address']
          : mentorSelectedPOC === 'mentor_poc'
            ? mpp_contact_address
            : ''
  }

  const getMentorContactCity = () => {
    return mentorSelectedPOC === 'gov_business'
      ? gov_business_contact_city
      : mentorSelectedPOC === 'electronic_business'
        ? electronic_business_contact_city
        : mentorSelectedPOC === 'signee'
          ? mentorAgreement && mentorAgreement['signee_city']
          : mentorSelectedPOC === 'mentor_poc'
            ? mpp_contact_city
            : ''
  }

  const getmentorContactState = () => {
    return mentorSelectedPOC === 'gov_business'
      ? gov_business_contact_state
      : mentorSelectedPOC === 'electronic_business'
        ? electronic_business_contact_state
        : mentorSelectedPOC === 'signee'
          ? mentorAgreement && mentorAgreement['signee_state']
          : mentorSelectedPOC === 'mentor_poc'
            ? mpp_contact_state
            : ''
  }

  const getMentorContactZip = () => {
    return mentorSelectedPOC === 'gov_business'
      ? gov_business_contact_zip
      : mentorSelectedPOC === 'electronic_business'
        ? electronic_business_contact_zip
        : mentorSelectedPOC === 'signee'
          ? mentorAgreement && mentorAgreement['signee_zip']
          : mentorSelectedPOC === 'mentor_poc'
            ? mpp_contact_zip
            : ''
  }

  const getMentorContactPhone = () => {
    return mentorSelectedPOC === 'gov_business'
      ? gov_business_contact_phone
      : mentorSelectedPOC === 'electronic_business'
        ? electronic_business_contact_phone
        : mentorSelectedPOC === 'signee'
          ? mentorAgreement && mentorAgreement['signee_tel']
          : mentorSelectedPOC === 'mentor_poc'
            ? mpp_contact_phone
            : ''
  }

  const getMentorContactFax = () => {
    return mentorSelectedPOC === 'gov_business'
      ? gov_business_contact_fax
      : mentorSelectedPOC === 'electronic_business'
        ? electronic_business_contact_fax
        : mentorSelectedPOC === 'signee'
          ? mentorAgreement && mentorAgreement['contact_fax']
          : mentorSelectedPOC === 'mentor_poc'
            ? mpp_contact_fax
            : ''
  }

  const getProtegePrimaryContact = () => {
    return protegeSelectedPOC === 'gov_business'
      ? `${protegeCompany && protegeCompany.gov_business_contact_first_name} ${protegeCompany && protegeCompany.gov_business_contact_last_name
      }`
      : protegeSelectedPOC === 'electronic_business'
        ? `${protegeCompany &&
        protegeCompany.electronic_business_contact_first_name
        }  ${protegeCompany && protegeCompany.electronic_business_contact_last_name
        }`
        : protegeSelectedPOC === 'signee'
          ? protegeAgreementData && protegeAgreementData['signee_primary_contact']
          : protegeSelectedPOC === 'protege_poc'
            ? `${protegeCompany && protegeCompany.mpp_contact_first_name} ${protegeCompany && protegeCompany.mpp_contact_last_name
            }`
            : ''
  }

  const getProtegeContactTitle = () => {
    return protegeSelectedPOC === 'gov_business'
      ? protegeCompany && protegeCompany.gov_business_contact_title
      : protegeSelectedPOC === 'electronic_business'
        ? protegeCompany && protegeCompany.electronic_business_contact_title
        : protegeSelectedPOC === 'signee'
          ? protegeAgreementData && protegeAgreementData['signee_contact_title']
          : protegeSelectedPOC === 'protege_poc'
            ? protegeCompany && protegeCompany.mpp_contact_title
            : ''
  }

  const getProtegeContactEmail = () => {
    return protegeSelectedPOC === 'gov_business'
      ? protegeCompany && protegeCompany.gov_business_contact_email
      : protegeSelectedPOC === 'electronic_business'
        ? protegeCompany && protegeCompany.electronic_business_contact_email
        : protegeSelectedPOC === 'signee'
          ? protegeAgreementData && protegeAgreementData['signee_contact_email']
          : protegeSelectedPOC === 'protege_poc'
            ? protegeCompany && protegeCompany.mpp_contact_email
            : ''
  }

  const getProtegeContactAddress = () => {
    return protegeSelectedPOC === 'gov_business'
      ? protegeCompany && protegeCompany.gov_business_contact_address
      : protegeSelectedPOC === 'electronic_business'
        ? protegeCompany && protegeCompany.electronic_business_contact_address
        : protegeSelectedPOC === 'signee'
          ? protegeAgreementData && protegeAgreementData['signee_contact_address']
          : protegeSelectedPOC === 'protege_poc'
            ? protegeCompany && protegeCompany.mpp_contact_address
            : ''
  }

  const getProtegeContactCity = () => {
    return protegeSelectedPOC === 'gov_business'
      ? protegeCompany && protegeCompany.gov_business_contact_city
      : protegeSelectedPOC === 'electronic_business'
        ? protegeCompany && protegeCompany.electronic_business_contact_city
        : protegeSelectedPOC === 'signee'
          ? protegeAgreementData && protegeAgreementData['signee_contact_city']
          : protegeSelectedPOC === 'protege_poc'
            ? protegeCompany && protegeCompany.mpp_contact_city
            : ''
  }

  const getProtegeContactState = () => {
    return protegeSelectedPOC === 'gov_business'
      ? protegeCompany && protegeCompany.gov_business_contact_state
      : protegeSelectedPOC === 'electronic_business'
        ? protegeCompany && protegeCompany.electronic_business_contact_state
        : protegeSelectedPOC === 'signee'
          ? protegeAgreementData && protegeAgreementData['signee_contact_state']
          : protegeSelectedPOC === 'protege_poc'
            ? protegeCompany && protegeCompany.mpp_contact_state
            : ''
  }

  const getProtegeContactZip = () => {
    return protegeSelectedPOC === 'gov_business'
      ? protegeCompany && protegeCompany.gov_business_contact_zip
      : protegeSelectedPOC === 'electronic_business'
        ? protegeCompany && protegeCompany.electronic_business_contact_zip
        : protegeSelectedPOC === 'signee'
          ? protegeAgreementData && protegeAgreementData['signee_contact_zip']
          : protegeSelectedPOC === 'prtoege_poc'
            ? protegeCompany && protegeCompany.mpp_contact_zip
            : ''
  }

  const getProtegeContactPhone = () => {
    return protegeSelectedPOC === 'gov_business'
      ? protegeCompany && protegeCompany.gov_business_contact_phone
      : protegeSelectedPOC === 'electronic_business'
        ? protegeCompany && protegeCompany.electronic_business_contact_phone
        : protegeSelectedPOC === 'signee'
          ? protegeAgreementData && protegeAgreementData['signee_contact_phone']
          : protegeSelectedPOC === 'protege_poc'
            ? protegeCompany && protegeCompany.mpp_contact_phone
            : ''
  }

  const getProtegeContactFax = () => {
    return protegeSelectedPOC === 'gov_business'
      ? protegeCompany && protegeCompany.gov_business_contact_fax
      : protegeSelectedPOC === 'electronic_business'
        ? protegeCompany && protegeCompany.electronic_business_contact_fax
        : protegeSelectedPOC === 'signee'
          ? protegeAgreementData && protegeAgreementData['signee_contact_fax']
          : protegeSelectedPOC === 'protege_poc'
            ? protegeCompany && protegeCompany.mpp_contact_fax
            : ''
  }

  return (
    <div>
      {showProtegeRequestModal && (
        <ProtegeRequestEditModal
          showModal={showProtegeRequestModal}
          handleModal={HandleModal}
          requestProtegeForChange={requestProtegeForChange}
        />
      )}
      <h2 className='page-title section-header reviewer-section-title'>Submit Agreement for Review via DocuSign</h2>
      <p>
        Please make sure you have reviewed your Mentor-Protege Agreement before
        proceeding. Once your agreement has been submitted, you will not be able
        to edit the response. Upon submission, this agreement between you and
        the Protege company will be sent to the DoD MPP program office for
        review.
      </p>
      <div className='row mt-5'>
        <div className='col-md-6'>
          <h3>Protege</h3>
          <p>
            <span className='bold-label'>Name: </span>
            {getProtegePrimaryContact()}
          </p>
          <p>
            <span className='bold-label'>Title: </span>
            {getProtegeContactTitle()}
          </p>
          <p>
            <span className='bold-label'> Address: </span>
            {`${getProtegeContactAddress()} ${getProtegeContactCity()} ${getProtegeContactState()}, ${getProtegeContactZip()}`}
          </p>
          <p>
            <span className='bold-label'>Telephone/ext.: </span>
            {getProtegeContactPhone() && formatPhone(getProtegeContactPhone())}
          </p>
          <p>
            <span className='bold-label'>Fax: </span>
            {getProtegeContactFax() && formatPhone(getProtegeContactFax())}
          </p>
          <p>
            <span className='bold-label'> E-mail: </span>
            {mentorAgreement && getProtegeContactEmail()}
          </p>
        </div>

        <div className='col-md-6'>
          <h3>Mentor</h3>
          <p>
            <span className='bold-label'> Name: </span>
            {mentorAgreement && getMentorPrimaryContact()}
          </p>
          <p>
            <span className='bold-label'>Title: </span>
            {mentorAgreement && getMentorContactTitle()}
          </p>
          <p>
            <span className='bold-label'> Address: </span>
            {`${getMentorContactAddress()} ${getMentorContactCity()} ${getmentorContactState()}, ${getMentorContactZip()}`}
          </ p>
          <p>
            <span className='bold-label'> Telephone/ext.: </span>
            {mentorAgreement && getMentorContactPhone() && formatPhone(getMentorContactPhone())}
          </p>
          <p>
            <span className='bold-label'>Fax: </span>
            {mentorAgreement && getMentorContactFax() && formatPhone(getMentorContactFax())}
          </p>
          <p>
            <span className='bold-label'> E-mail: </span>
            {mentorAgreement && getMentorContactEmail()}
          </p>
        </div>
      </div>
      {!mentorAgreementData && (
        <>
          <h3 className='mt-5'>Review</h3>
          <fieldset>
            <legend>
              <p className='mr-5 mt-2' data-test-id='agreement_type'>
                <span aria-hidden='true'>*</span>Do you need to make any changes
                to your information?
                <span className='sr-only'>You must select one option.</span>
              </p>
            </legend>
            <OptionField
              name='change_mentor_info'
              placeholder='mentor info'
              options={mentorInfoOptions}
              value={
                mentorAgreementData
                  ? 'false'
                  : mentorAgreement && mentorAgreement['change_mentor_info']
              }
              disabled={mentorAgreementData}
              onKeyDown={keydownHandler}
            />
          </fieldset>
        </>
      )}
      {mentorAgreement && mentorAgreement['change_mentor_info'] === 'true' && (
        <button
          onClick={() => setActiveStateZero()}
          className='btn btn-primary mt-2'
        >
          Edit Mentor Information
        </button>
      )}

      {mentorAgreement && mentorAgreement['change_mentor_info'] === 'false' && (
        <>
          <fieldset>
            <legend>
              <p className='mr-5 mt-5' data-test-id='agreement_type'>
                <span aria-hidden='true'>*</span>Do you need the Protege to make
                any changes to their part of the agreement?{' '}
                <span className='sr-only'>You must select one option.</span>
              </p>
            </legend>

            <OptionField
              name='change_protege_info'
              placeholder='Agreement Type'
              options={protegeInfoOptions}
              value={
                mentorAgreementData
                  ? 'false'
                  : mentorAgreement && mentorAgreement['change_protege_info']
              }
              disabled={mentorAgreementData}
              onKeyDown={keydownHandler}
            />
          </fieldset>
        </>
      )}

      {mentorAgreement && mentorAgreement['change_protege_info'] === 'true' && (
        <button
          type='button'
          className='btn btn-primary mt-2 mb-4'
          onClick={() => HandleModal()}
        >
          Edit Protege Information
        </button>
      )}

      {mentorAgreement &&
        mentorAgreement['change_mentor_info'] === 'false' &&
        mentorAgreement['change_protege_info'] === 'false' && (
          <div className='my-4'>
            <InputCheckbox
              name='review_agreement'
              placeholder='Agency'
              id='I have reviewed and approve the submitted information'
              value={mentorAgreement && mentorAgreement['review_agreement']}
              label={
                <div>
                  <span aria-hidden='true'>*</span>I have reviewed and approve
                  the submitted information
                </div>
              }
              disabled={mentorAgreementData}
              checked={
                mentorAgreementData ? true : mentorAgreement['review_agreement']
              }
              ariaRequired={true}
              required={true}
              errorMessage={`Please check the chekbox before submitting the agreement.`}
              onKeyDown={keydownHandler}
            />
          </div>
        )}
      {mentorAgreement &&
        mentorAgreement['change_protege_info'] === 'false' &&
        mentorAgreement['change_mentor_info'] === 'false' &&
        mentorAgreement['review_agreement'] && (
          <button className='btn btn-primary mt-3 mb-4 focusable-item'>
            {' '}
            Send To Authorize Signee
          </button>
        )}
      {mentorProtegeAgreementStatus &&
        mentorProtegeAgreementStatus === 'pending' && (
          <ReviewerStatus
            ageementDecision={mentorProtegeAgreementStatus}
            reviewerComments={reviewerComments}
          />
        )}
    </div>
  )
}
export default MentorProtegeAgreementSummary

// @dev - commented out Arslan code because it's not needed here
const ReviewerStatus = ({ ageementDecision, reviewerComments }) => {
  return (
    <div className='mt-5'>
      <h2 className='reviewer-section-title'>Reviewer Status</h2>
      <div className='agreement-sub-header underline-header'>
        Reviewer&apos;s Decision for Agreement
      </div>
      <span>
        <p>{ageementDecision ? ageementDecision : 'None'}</p>
      </span>

      <h3 className='agreement-sub-header underline-header'>Comments</h3>
      <span>
        <p>{reviewerComments ? reviewerComments : 'None'}</p>
      </span>

      <h3 className='agreement-sub-header underline-header'>Attachments</h3>
      <span>
        <p>None</p>
      </span>
    </div>
  )
}