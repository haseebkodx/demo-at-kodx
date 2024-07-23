import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { formatPhone } from '../../helpers/formatter/format'
import InputCheckbox from '../commonComponents/forms/InputCheckbox'
import OptionField from '../commonComponents/forms/OptionField'

// implement docusign
import setDocusignPdfEnvelope from '../reviewer/reviewAgreement/setDocusignPdfEnvelope.action'
import showPdf from '../showPdf'
import LoadingModal from '../LoadingModal'
import './protegeAgreement.scss'
import DocuSignAgreementComponent from '../commonComponents/DocuSignAgreementComponent'
import FileUploadComponent from '../multifileUpload/FileUploadComponent'
import Attachments from '../reviewer/ApplicationStatus/Attachments'

function ReviewAgreement({
  protegeAgreement,
  docusignEnvelope_id,
  developmentalAssistanceFile,
  handleDevAssistFiles,
  agreementId,
  forMentorReview = false,
  allMentorAgreementData,
  mentorAgreementData,
  isReviewer = false,
  mentorAgreement,
  forProtegeView = false,
  allMentorProtegeAgreementData,
  mentorProtegeAgreement,
  allProtegeAgreementData,
  isDualSummaryPage = false,
  isProtege = false,
}) {

  const [showLoadingModal, setShowLoadingModal] = useState(false)

  // open the DocuSign file
  const openDocusignPdfFile = async (envelopeId) => {
    setShowLoadingModal(true)
    const blobResponse = await setDocusignPdfEnvelope(envelopeId)
    showPdf(blobResponse, setShowLoadingModal)
  }

  const isProvided = (value) => {
    return value ? value : <div className='not-provided'> Not Provided</div>
  }

  return (
    <div className='col-md-12 mb-5' data-test-id='Review Agreement'>
      <div className='row'>
        <div className='col-md-12 mt-2'>
          <div>
            <CompanyInformation
              companyInfo={protegeAgreement}
              field_name='capability_section_file'
              agreementId={agreementId}
              isProvided={isProvided}
              isReviewer={isReviewer}
              forProtegeView={forProtegeView}
              allProtegeAgreementData={allProtegeAgreementData}
              isDualSummaryPage={isDualSummaryPage}
            />
            <ContactInformation
              companyInfo={protegeAgreement}
              isProvided={isProvided}
            />
            <ProgramParticipation
              protegeAgreement={protegeAgreement}
              isProvided={isProvided}
            />
            <HistoricalBackground
              protegeAgreement={protegeAgreement}
              agreementId={agreementId}
              forMentorReview={forMentorReview}
              field_name='historical_background_upload_file'
              isReviewer={isReviewer}
              forProtegeView={forProtegeView}
              allProtegeAgreementData={allProtegeAgreementData}
              isDualSummaryPage={isDualSummaryPage}
            />
            <Certifications protegeAgreement={protegeAgreement} />
            <DoDContracts protegeAgreement={protegeAgreement} />
            <DevelopmentAssistance
              protegeAgreement={protegeAgreement}
              developmentalAssistanceFile={developmentalAssistanceFile}
              handleDevAssistFiles={handleDevAssistFiles}
              agreementId={agreementId}
              agreement_type={'mentor'}
              field_name='developmental_assistance_upload_file'
              allMentorAgreementData={allMentorAgreementData}
              mentorAgreementData={mentorAgreementData}
              forMentorReview={forMentorReview}
              mentorAgreement={mentorAgreement}
              mentorAgreementFileData={mentorAgreementData}
              allProtegeAgreementData={allProtegeAgreementData}
              forProtegeView={forProtegeView}
              isReviewer={isReviewer}
              isDualSummaryPage={isDualSummaryPage}
            />
            {allMentorProtegeAgreementData &&
              allMentorProtegeAgreementData['mentor_protege_agr_status'] !==
              'incomplete' ? (
              <DocuSignAgreementComponent
                docusignEnvelope_id={docusignEnvelope_id}
                openDocusignPdfFile={openDocusignPdfFile}
              />
            ) : null}
            {isProtege &&
              allMentorProtegeAgreementData &&
              (allMentorProtegeAgreementData['mentor_protege_agr_status'] ===
                'approved' ||
                allMentorProtegeAgreementData['mentor_protege_agr_status'] ===
                'declined') ? (
              <ReviewerStatus agreementData={allMentorProtegeAgreementData} />
            ) : isReviewer &&
              mentorProtegeAgreement &&
              (mentorProtegeAgreement['mentor_protege_agr_status'] ===
                'approved' ||
                mentorProtegeAgreement['mentor_protege_agr_status'] ===
                'declined') ? (
              <ReviewerStatus agreementData={mentorProtegeAgreement} />
            ) : null}
            <LoadingModal showModal={showLoadingModal} />
          </div>
        </div>
      </div>
    </div>
  )
}
const CompanyInformation = ({
  forMentorReview,
  companyInfo,
  agreementId,
  isProvided,
  forProtegeView,
  allProtegeAgreementData,
  protegeAgreement,
  agreement_type = 'protege',
}) => {
  const reviewMode = true
  return (
    <div className='mt-3'>
      <h2 className='agreement-sub-header'>
        Company Information
      </h2>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'>Company Name</div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {isProvided(companyInfo && companyInfo['legal_business_name'])}
        </div>
      </div>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'>Address</div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {`${companyInfo && companyInfo['company_address']}
          ${companyInfo && companyInfo['company_city']}
          ${companyInfo && companyInfo['company_state']},
          ${companyInfo && companyInfo['company_zip']}`}
        </div>
      </div>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'>Phone</div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {isProvided(formatPhone(companyInfo && companyInfo['company_phone']))}
        </div>
      </div>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'> Fax</div>
        <div className='col-md-1'>:</div>
        {companyInfo && companyInfo['company_fax'] ? (
          <div className='col-md-3'>
            {isProvided(formatPhone(companyInfo && companyInfo['company_fax']))}
          </div>
        ) : (
          <div> Not Provided</div>
        )}
      </div>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'> DUNS</div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {isProvided(companyInfo && companyInfo['duns_number'])}
        </div>
      </div>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'> Cage Code</div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {isProvided(companyInfo && companyInfo['cage_code'])}
        </div>
      </div>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'> Year Established</div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {isProvided(companyInfo && companyInfo['firm_year_established'])}
        </div>
      </div>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'>No of Employees </div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {isProvided(companyInfo && companyInfo['firm_number_of_employees'])}
        </div>
      </div>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'>Annual Gross Revenue</div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {isProvided(companyInfo && companyInfo['firm_annual_gross_revenue'])}
        </div>
      </div>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'>NAICS codes</div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {isProvided(companyInfo && companyInfo['naics_codes'])}
        </div>
      </div>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'>Percentage (%) Owned</div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {isProvided(companyInfo && companyInfo['firm_percent_owned'])}
        </div>
      </div>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'>Capability Statement</div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {isProvided(companyInfo && companyInfo['capability_statement'])}
        </div>
      </div>


      {forProtegeView &&
        allProtegeAgreementData &&
        allProtegeAgreementData['capability_section_file'] &&
        allProtegeAgreementData['capability_section_file'].length >
        0 ? (
        <div className='row mt-4'>
          <div className='col-12'>
            <h3 className='agreement-mini-sub-header mb-0'>Capability Statement Documents</h3>
            <FileUploadComponent
              agreement_type={agreement_type}
              field_name='capability_section_file'
              agreement_id={agreementId}
              initialFiles={
                allProtegeAgreementData &&
                allProtegeAgreementData['capability_section_file']
              }
              reviewMode={reviewMode}
              fileUploadComponentAddBtnId={'for-protege-agr-historical-agr-background'}
            />
          </div>
        </div>
      ) : forMentorReview &&
        protegeAgreement &&
        protegeAgreement['capability_section_file'] &&
        protegeAgreement['capability_section_file'].length > 0 ? (
        <div className='row mt-4'>
          <div className='col-12'>
            <h3 className='agreement-mini-sub-header'>Capability Statement Documents</h3>
            <FileUploadComponent
              agreement_type={agreement_type}
              field_name='capability_section_file'
              agreement_id={agreementId}
              initialFiles={
                protegeAgreement &&
                protegeAgreement['capability_section_file']
              }
              reviewMode={reviewMode}
              fileUploadComponentAddBtnId={'for-mentor-agr-historical-agr-background'}
            />
          </div>
        </div>
      ) : (
        <>
          <h3 className='agreement-mini-sub-header' style={{ marginBottom: '0px' }}>Capability Statement Documents</h3>
          <FileUploadComponent
            agreement_type={agreement_type}
            field_name='capability_section_file'
            agreement_id={agreementId}
            initialFiles={
              protegeAgreement &&
              protegeAgreement['capability_section_file']
            }
            reviewMode={reviewMode}
            fileUploadComponentAddBtnId={'for-reviewer-historical-agr-background'}
          />
        </>
      )}
    </div>
  )
}

const ContactInformation = ({ companyInfo, isProvided }) => {
  return (
    <div className='mt-5'>
      <h2 className='agreement-sub-header'>
        Points of Contact
      </h2>
      <h3 className='agreement-mini-sub-header mt-4 mb-3'>
        Protégé Company Contact Information
      </h3>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'>Name</div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {companyInfo && companyInfo['mpp_contact_first_name']}{' '}
          {companyInfo && companyInfo['mpp_contact_last_name']}
        </div>
      </div>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'>Title</div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {companyInfo && companyInfo['mpp_contact_title']}
        </div>
      </div>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'>Address</div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {(companyInfo && companyInfo['mpp_contact_address']) ||
            (companyInfo && companyInfo['mpp_contact_city']) ||
            (companyInfo && companyInfo['mpp_contact_state']) ||
            (companyInfo && companyInfo['mpp_contact_zip']) ? (
            `${companyInfo && companyInfo['mpp_contact_address']}
              ${companyInfo && companyInfo['mpp_contact_city']}
              ${companyInfo && companyInfo['mpp_contact_state']},
              ${companyInfo && companyInfo['mpp_contact_zip']}`
          ) : (
            <div className='not-provided'> Not Provided</div>
          )}
        </div>
      </div>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'>Email</div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {companyInfo && companyInfo['mpp_contact_email']}
        </div>
      </div>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'>Phone</div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {formatPhone(companyInfo && companyInfo['mpp_contact_phone'])}
        </div>
      </div>

      <div className='row mt-1'>
        <div className='col-md-3 bold-label'>Fax</div>
        <div className='col-md-1'>:</div>
        <div className='col-md-3'>
          {formatPhone(companyInfo && companyInfo['mpp_contact_fax'])}
        </div>
      </div>

      {/* ACO POC */}

      {companyInfo &&
        companyInfo['aco_selected'] &&
        companyInfo['aco_selected'].toString() === 'true' && (
          <div>
            <h3 className='agreement-mini-sub-header mt-4 mb-3'>
              Cognizant Administrative contracting officer (ACO)
            </h3>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>
                Primary Contact (Full Name)
              </div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(companyInfo && companyInfo['aco_name'])}
              </div>
            </div>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>Title</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(companyInfo && companyInfo['aco_title'])}
              </div>
            </div>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>Address</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {(companyInfo && companyInfo['aco_address']) ||
                  (companyInfo && companyInfo['aco_city']) ||
                  (companyInfo && companyInfo['aco_state']) ||
                  (companyInfo && companyInfo['aco_zip']) ? (
                  `${companyInfo && companyInfo['aco_address']}
              ${companyInfo && companyInfo['aco_city']}
              ${companyInfo && companyInfo['aco_state']},
              ${companyInfo && companyInfo['aco_zip']}`
                ) : (
                  <div className='not-provided'>Not Provided</div>
                )}
              </div>
            </div>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>Email</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(companyInfo && companyInfo['aco_email'])}
              </div>
            </div>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>Phone</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(formatPhone(companyInfo && companyInfo['aco_tel']))}
              </div>
            </div>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>Fax</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(formatPhone(companyInfo && companyInfo['aco_fax']))}
              </div>
            </div>
          </div>
        )}

      {/* DCMA POC */}

      {companyInfo &&
        companyInfo['dcma_selected'] &&
        companyInfo['dcma_selected'].toString() === 'true' && (
          <div>
            <h3 className='agreement-mini-sub-header mt-4 mb-3'>
              Cognizant Defence Management Agency (DCMA)
            </h3>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>
                Primary Contact (Full Name)
              </div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(companyInfo && companyInfo['dcma_primary_contact'])}
              </div>
            </div>
            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>Title</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(companyInfo && companyInfo['dcma_contact_title'])}
              </div>
            </div>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>Address</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {(companyInfo && companyInfo['dcma_contact_address']) ||
                  (companyInfo && companyInfo['dcma_contact_city']) ||
                  (companyInfo && companyInfo['dcma_contact_state']) ||
                  (companyInfo && companyInfo['dcma_contact_zip']) ? (
                  `${companyInfo && companyInfo['dcma_contact_address']}
              ${companyInfo && companyInfo['dcma_contact_city']}
              ${companyInfo && companyInfo['dcma_contact_state']},
              ${companyInfo && companyInfo['dcma_contact_zip']}`
                ) : (
                  <div className='not-provided'>Not Provided</div>
                )}
              </div>
            </div>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>Email</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(companyInfo && companyInfo['dcma_contact_email'])}
              </div>
            </div>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>Phone</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(
                  formatPhone(companyInfo && companyInfo['dcma_contact_phone'])
                )}
              </div>
            </div>
          </div>
        )}

      {/* CAO POC */}

      {companyInfo &&
        companyInfo['cao_selected'] &&
        companyInfo['cao_selected'].toString() === 'true' && (
          <div>
            <h3 className='agreement-mini-sub-header mt-4 mb-3'>
              Contract Administration Office (CAO)
            </h3>

            <div className='row'>
              <div className='col-md-3 bold-label'>
                Primary Contact (Full Name)
              </div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(companyInfo && companyInfo['cao_name'])}
              </div>
            </div>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>Title</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(companyInfo && companyInfo['cao_title'])}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-3 bold-label'>Address</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {(companyInfo && companyInfo['cao_address']) ||
                  (companyInfo && companyInfo['cao_city']) ||
                  (companyInfo && companyInfo['cao_state']) ||
                  (companyInfo && companyInfo['cao_zip']) ? (
                  `${companyInfo && companyInfo['cao_address']}
              ${companyInfo && companyInfo['cao_city']}
              ${companyInfo && companyInfo['cao_state']},
              ${companyInfo && companyInfo['cao_zip']}`
                ) : (
                  <div className='not-provided'>Not Provided</div>
                )}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-3 bold-label'>Email</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(companyInfo && companyInfo['cao_email'])}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-3 bold-label'>Phone</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(formatPhone(companyInfo && companyInfo['cao_tel']))}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-3 bold-label'>Fax</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(formatPhone(companyInfo && companyInfo['cao_fax']))}
              </div>
            </div>
          </div>
        )}

      {companyInfo &&
        companyInfo['protege_signee_poc'] === 'new_protege_signee_poc' && (
          <div>
            <h3 className='agreement-mini-sub-header mt-4 mb-3'>
              Protégé Company Authorized Signee
            </h3>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>
                Primary Contact (Full Name)
              </div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(
                  companyInfo && companyInfo['signee_primary_contact']
                )}
              </div>
            </div>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>Title</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(companyInfo && companyInfo['signee_contact_title'])}
              </div>
            </div>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>Address</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {(companyInfo && companyInfo['signee_contact_address']) ||
                  (companyInfo && companyInfo['signee_contact_city']) ||
                  (companyInfo && companyInfo['signee_contact_state']) ||
                  (companyInfo && companyInfo['signee_contact_zip']) ? (
                  `${companyInfo && companyInfo['signee_contact_address']}
              ${companyInfo && companyInfo['signee_contact_city']}
              ${companyInfo && companyInfo['signee_contact_state']},
              ${companyInfo && companyInfo['signee_contact_zip']}`
                ) : (
                  <div className='not-provided'>Not Provided</div>
                )}
              </div>
            </div>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>Email</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(companyInfo && companyInfo['signee_contact_email'])}
              </div>
            </div>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>Phone</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(
                  formatPhone(
                    companyInfo && companyInfo['signee_contact_phone']
                  )
                )}
              </div>
            </div>

            <div className='row mt-1'>
              <div className='col-md-3 bold-label'>Fax</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(
                  formatPhone(companyInfo && companyInfo['signee_contact_fax'])
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

const ProgramParticipation = ({ protegeAgreement, submitted, isProvided }) => {
  const protegeParticipationOptions = [
    {
      name: 'Protege Participated',
      label: 'Yes',
      value: 'true',
      id: 'Yes-Protege-Participated',
    },
    {
      name: 'Protege Participated',
      label: 'No',
      value: 'false',
      id: 'No-Protege-Participated',
    },
  ]

  const direcOrHybrid =
    protegeAgreement &&
    (protegeAgreement.credit_direct_reimbursed === 'Hybrid' ||
      protegeAgreement.credit_direct_reimbursed === 'Direct Reimbursement')

  const terminationDate = new Date(
    protegeAgreement && protegeAgreement['termination_date']
  )
  return (
    <div className='row mb-5 mt-5'>
      <div className='col-md-12'>
        <h2 className='agreement-sub-header'>
          Program Participation
        </h2>
      </div>
      <div className='col-md-12 mt-2' data-test-id='Protege Firm Participated'>
        <p className='left-align mb-1'>
          <legend className="font-italic">
            Has the Protégé Company previously participated in the DoD
            Mentor-Protégé Program?
          </legend>
        </p>
        <OptionField
          name='protege_firm_participated'
          placeholder='Protege Firm Participated'
          required={true}
          options={protegeParticipationOptions}
          value={
            protegeAgreement && protegeAgreement['protege_firm_participated']
          }
          submitted={submitted}
          // disabled={true}
        />
      </div>
      {protegeAgreement &&
        protegeAgreement['protege_firm_participated'] &&
        protegeAgreement['protege_firm_participated'].toString() === 'true' && (
          <div className='col-md-12'>
            <div className='row mt-1'>
              <div className='col-md-5 bold-label'>
                Previous Mentor Firm Name
              </div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(
                  protegeAgreement && protegeAgreement['prev_mentor_firm_name']
                )}
              </div>
            </div>
            <div className='row mt-1'>
              <div className='col-md-5 bold-label'>Type</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(
                  protegeAgreement &&
                  protegeAgreement['credit_direct_reimbursed']
                )}
              </div>
            </div>
            {direcOrHybrid && (
              <div className='row mt-1'>
                <div className='col-md-5 bold-label'>
                  Sponsoring Military Dept./Agency
                </div>
                <div className='col-md-1'>:</div>
                <div className='col-md-3'>
                  {isProvided(
                    protegeAgreement &&
                    protegeAgreement['sponsoring_military_dept_agency']
                  )}
                </div>
              </div>
            )}
            <div className='row mt-1'>
              <div className='col-md-5 bold-label'>
                Period of Performance of previous agreement
              </div>
              <div className='col-md-1'>:</div>
              <div className='col-md-3'>
                {isProvided(
                  protegeAgreement &&
                  protegeAgreement['period_of_prev_agreement']
                )}
              </div>
            </div>
            <div className='row mt-1'>
              <div className='col-md-5 bold-label'>Termination Date</div>
              <div className='col-md-1'> :</div>
              <div className='col-md-3'>
                {isProvided(
                  protegeAgreement &&
                  protegeAgreement['termination_date'] &&
                  `${terminationDate.getMonth() + 1
                  }/${terminationDate.getDate()}/${terminationDate.getFullYear()}`
                )}
              </div>
            </div>
            <div className='row mt-1'>
              <div className='col-md-5 bold-label'>Termination Reason</div>
              <div className='col-md-1'>:</div>{' '}
              <div className='col-md-2'>
                {isProvided(
                  protegeAgreement && protegeAgreement['termination_reason']
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

const HistoricalBackground = ({
  protegeAgreement,
  agreementId,
  agreement_type = 'protege',
  forMentorReview,
  forProtegeView,
  allProtegeAgreementData,
}) => {
  const reviewMode = true

  return (
    <div className='mb-5'>
      <h2 className='agreement-sub-header'>
        Historical Background
      </h2>
      <div className='mt-4 mb-3'>
        <h3 className='agreement-mini-sub-header mb-1'>Summary</h3>
        {protegeAgreement &&
          protegeAgreement['historical_background_explanation'] ? (
          <p>
            {protegeAgreement &&
              protegeAgreement['historical_background_explanation']}
          </p>
        ) : (
          <p>No summary provided.</p>
        )}
      </div>
      {forProtegeView &&
        allProtegeAgreementData &&
        allProtegeAgreementData['historical_agreement_background_file'] &&
        allProtegeAgreementData['historical_agreement_background_file'].length >
        0 ? (
        <div className='row mt-4'>
          <div className='col-12'>
            <h3 className='agreement-mini-sub-header mb-0'>Uploaded Documents</h3>
            <FileUploadComponent
              agreement_type={agreement_type}
              field_name='historical_agreement_background_file'
              agreement_id={agreementId}
              initialFiles={
                allProtegeAgreementData &&
                allProtegeAgreementData['historical_agreement_background_file']
              }
              reviewMode={reviewMode}
              fileUploadComponentAddBtnId={'for-protege-agr-historical-agr-background'}
            />
          </div>
        </div>
      ) : forMentorReview &&
        protegeAgreement &&
        protegeAgreement['historical_agreement_background_file'] &&
        protegeAgreement['historical_agreement_background_file'].length > 0 ? (
        <div className='row mt-4'>
          <div className='col-12'>
            <h3 className='agreement-mini-sub-header'>Uploaded Documents</h3>
            <FileUploadComponent
              agreement_type={agreement_type}
              field_name='historical_agreement_background_file'
              agreement_id={agreementId}
              initialFiles={
                protegeAgreement &&
                protegeAgreement['historical_agreement_background_file']
              }
              reviewMode={reviewMode}
              fileUploadComponentAddBtnId={'for-mentor-agr-historical-agr-background'}
            />
          </div>
        </div>
      ) : (
        <>
          <h3 className='agreement-mini-sub-header' style={{ marginBottom: '0px' }}>Uploaded Documents</h3>
          <FileUploadComponent
            agreement_type={agreement_type}
            field_name='historical_agreement_background_upload_file'
            agreement_id={agreementId}
            initialFiles={
              protegeAgreement &&
              protegeAgreement['historical_agreement_background_file']
            }
            reviewMode={reviewMode}
            fileUploadComponentAddBtnId={'for-reviewer-historical-agr-background'}
          />
        </>
      )}
    </div>
  )
}

const Certifications = ({
  protegeAgreement,
  checkFieldError,
  submitted,
  protegeAgreementData
}) => {
  const certificationOptions = [
    {
      name: 'Certified Small Business',
      label: 'Yes',
      value: 'true',
      id: 'Yes-Certification-Small-Business',
    },
    {
      name: 'Certified Small Business',
      label: 'No',
      value: 'false',
      id: 'No-Certification-Small-Business',
    },
  ]

  const graduatedDate =
    protegeAgreement && new Date(protegeAgreement['sba_8a_graduated_date'])

  return (
    <div className='row mb-5'>
      <div className='col-md-12' data-test-id='Certified Small Business'>
        <h2 className='agreement-sub-header'>
          Certifications
        </h2>
        <div className='left-align mt-2 font-italic'>
          Is your Company Certified as an SBA small Disadvantaged Business?{' '}
          <br />
          <p className='sub-detail'>
            (8(a), Women-Owned, HUBZone, All Small, Veteran Owned)
          </p>
        </div>

        <OptionField
          name='certified_small_business'
          required={true}
          options={certificationOptions}
          placeholder='Certified Small Business'
          value={
            protegeAgreement && protegeAgreement['certified_small_business']
          }
          submitted={submitted}
          // disabled={true}
        />

        {protegeAgreement && protegeAgreement['certified_small_business']
          && protegeAgreement['certified_small_business'].toString() === 'false'
          && <div className='mb-2 mt-4 ml-3' data-test-id='Historical Background'>
            <h3 className='agreement-mini-sub-header mb-1 ml-n3'> An entity providing goods/service in private sector
            critical to enhancing DOD supplier base</h3>
            <p className='ml-n3'>{
              protegeAgreement &&
              protegeAgreement['sba_cgp']
            }</p>
          </div>}

      </div>
      {((protegeAgreement &&
        protegeAgreement['certified_small_business'] === 'true') ||
        (protegeAgreementData &&
          protegeAgreementData['certified_small_business'] === 'true')) && (
          <div
            className='row'
            data-test-id='Small Disadvantaged Business Details'
          >
            <div className='col-md-12 mt-2 ml-3'>
              <p className='left-align mb-n2'>
                <legend className="font-italic">Check all that apply:</legend>
              </p>

              <InputCheckbox
                name='sba_wosb'
                placeholder='Women-Owned Small Business (WOSB)'
                value={protegeAgreement && protegeAgreement['sba_wosb']}
                label={`Women-Owned Small Business (WOSB)`}
                id={`Women-Owned Small Business (WOSB)`}
                view={protegeAgreementData}
                checked={
                  protegeAgreementData &&
                    protegeAgreementData['sba_wosb'] &&
                    protegeAgreementData['sba_wosb'].toString() === 'true'
                    ? true
                    : protegeAgreement &&
                      protegeAgreement['sba_wosb'] &&
                      protegeAgreement['sba_wosb'].toString() === 'true'
                      ? true
                      : false
                }
                // disabled={true}
              />
              <InputCheckbox
                name='sba_vosb'
                placeholder='Service-Disabled Veteran-Owned Small Business (SDVOSB)s'
                value={protegeAgreement && protegeAgreement['sba_vosb']}
                label={`Service-Disabled Veteran-Owned Small Business (SDVOSB)`}
                id={`Service-Disabled Veteran-Owned Small Business (SDVOSB)`}
                view={protegeAgreementData}
                checked={
                  protegeAgreementData &&
                    protegeAgreementData['sba_vosb'] &&
                    protegeAgreementData['sba_vosb'].toString() === 'true'
                    ? true
                    : protegeAgreement &&
                      protegeAgreement['sba_vosb'] &&
                      protegeAgreement['sba_vosb'].toString() === 'true'
                      ? true
                      : false
                }
                // disabled={true}
              />
              <InputCheckbox
                name='sba_hz'
                placeholder='HUBZone Small Business(HUBZone)'
                value={protegeAgreement && protegeAgreement['sba_hz']}
                label={`HUBZone Small Business(HUBZone)`}
                id={`HUBZone Small Business(HUBZone)`}
                view={protegeAgreementData}
                checked={
                  protegeAgreementData &&
                    protegeAgreementData['sba_hz'] &&
                    protegeAgreementData['sba_hz'].toString() === 'true'
                    ? true
                    : protegeAgreement &&
                      protegeAgreement['sba_hz'] &&
                      protegeAgreement['sba_hz'].toString() === 'true'
                      ? true
                      : false
                }
                // disabled={true}
              />

              <InputCheckbox
                name='sba_sdb'
                placeholder='Small Disadvantaged Business (SDB)'
                value={protegeAgreement && protegeAgreement['sba_sdb']}
                label={`Small Disadvantaged Business (SDB)`}
                id={`Small Disadvantaged Business (SDB)`}
                view={protegeAgreementData}
                checked={
                  protegeAgreementData &&
                    protegeAgreementData['sba_sdb'] &&
                    protegeAgreementData['sba_sdb'].toString() === 'true'
                    ? true
                    : protegeAgreement &&
                      protegeAgreement['sba_sdb'] &&
                      protegeAgreement['sba_sdb'].toString() === 'true'
                      ? true
                      : false
                }
                // disabled={true}
              />

              <InputCheckbox
                name='sba_sde'
                placeholder='A business employing the severely disabled'
                value={protegeAgreement && protegeAgreement['sba_sde']}
                label={`A business employing the severely disabled `}
                id={`A business employing the severely disabled `}
                view={protegeAgreementData}
                checked={
                  protegeAgreementData &&
                    protegeAgreementData['sba_sde'] &&
                    protegeAgreementData['sba_sde'].toString() === 'true'
                    ? true
                    : protegeAgreement &&
                      protegeAgreement['sba_sde'] &&
                      protegeAgreement['sba_sde'].toString() === 'true'
                      ? true
                      : false
                }
                // disabled={true}
              />

              <InputCheckbox
                name='sba_nog'
                placeholder='Reporting Requirements'
                value={protegeAgreement && protegeAgreement['sba_nog']}
                label={`A business owned and controlled by a Native Organization`}
                id={`A business owned and controlled by a Native Organization`}
                view={protegeAgreementData}
                checked={
                  protegeAgreementData &&
                    protegeAgreementData['sba_nog'] &&
                    protegeAgreementData['sba_nog'].toString() === 'true'
                    ? true
                    : protegeAgreement &&
                      protegeAgreement['sba_nog'] &&
                      protegeAgreement['sba_nog'].toString() === 'true'
                      ? true
                      : false
                }
                // disabled={true}
              />

              <InputCheckbox
                name='sba_8a'
                placeholder='8(a) program'
                value={protegeAgreement && protegeAgreement['sba_8a']}
                label={`8(a) program`}
                id={`8(a) program`}
                view={protegeAgreementData}
                checked={
                  protegeAgreementData &&
                    protegeAgreementData['sba_8a'] &&
                    protegeAgreementData['sba_8a'].toString() === 'sba_8a'
                    ? true
                    : protegeAgreement &&
                      protegeAgreement['sba_8a'] &&
                      protegeAgreement['sba_8a'].toString() === 'true'
                      ? true
                      : false
                }
                // disabled={true}
              />

              {checkFieldError && (
                <div className='erorr-red'>This field is required</div>
              )}

              {protegeAgreement &&
                protegeAgreement['sba_8a'] &&
                protegeAgreement['sba_8a'].toString() === 'true' && (
                  <div className='row'>
                    <div className='col-md-5 bold-label'>
                      {' '}
                    8(a) graduated program Date
                  </div>
                    <div className='col-md-1'>:</div>
                    <div className='col-md-3'>
                      {graduatedDate ? (
                        `${graduatedDate.getMonth() + 1
                        }/${graduatedDate.getDate()}/${graduatedDate.getFullYear()}`
                      ) : (
                        <div className='not-provided'> Not Provided</div>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
    </div>
  )
}

const DoDContracts = ({ protegeAgreement, protegeAgreementData }) => {
  return (
    <div id='dod-contracts' className='col-md-12 ml-n3'>
      <h2 className='agreement-sub-header'>
        Mentor/Protégé Contracts
      </h2>

      <div className='row'>
        <div className='col-md-12 mt-4'>
          <h3 className='agreement-mini-sub-header'>
            Total DOD Prime Contract Awards
          </h3>
        </div>
      </div>
      {protegeAgreement && protegeAgreement['has_awarded_contracts']
        && protegeAgreement['has_awarded_contracts'].toString() === 'true'
        && protegeAgreement['is_dod_prime_contracts'] ? <div className='row mb-4'>
        <div className='col-md-12 mt-2' data-test-id='Sub Contract Awards'>
          <SubContactAwardsRows
            val={protegeAgreementData ? 3 : 3}
            protegeAgreement={protegeAgreement}
            protegeAgreementData={protegeAgreementData}
            awardType='Total DOD Subcontract Awards'
            fiscalYear='fiscal_year_prime'
            dollarAmount='dollar_amount_recieved_prime'
            contractValue='funded_contact_value_prime'
            number='number_prime_'
          />
        </div>
      </div> : <div className='not-provided'>Not Provided</div>
      }

      <div className='row'>
        <div className='col-md-12'>
          <h3 className='agreement-mini-sub-header'>
            Total DOD Subcontract Awards
          </h3>
        </div>
      </div>
      {protegeAgreement && protegeAgreement['has_awarded_contracts']
        && protegeAgreement['has_awarded_contracts'].toString() === 'true'
        && protegeAgreement['is_dod_subcontracts'] ?
        <div className='row mb-4'>
          <div
            className='col-md-12 mt-2'
            data-test-id='Sub Contract Prime Awards'
          >
            <SubContactAwardsRows
              val={protegeAgreementData ? 3 : 3}
              protegeAgreement={protegeAgreement}
              prime={true}
              protegeAgreementData={protegeAgreementData}
              fiscalYear='fiscal_year'
              dollarAmount='dollar_amount_recieved'
              contractValue='funded_contact_value'
              number='number_'
            />
          </div>
        </div> : <div className='not-provided'>Not Provided</div>
      }

      <div className='row'>
        <div className='col-md-12'>
          <h3 className='agreement-mini-sub-header'>
            Total Federal Agency Prime Contract Awards
          </h3>
        </div>
      </div>
      {protegeAgreement && protegeAgreement['has_awarded_contracts']
        && protegeAgreement['has_awarded_contracts'].toString() === 'true'
        && protegeAgreement['is_federal_agency_prime_contracts'] ?
        <div className='row mb-4'>
          <div
            className='col-md-12 mt-2'
            data-test-id='Sub Contract Prime Awards'
          >
            <SubContactAwardsRows
              val={protegeAgreementData ? 3 : 3}
              protegeAgreement={protegeAgreement}
              prime={true}
              protegeAgreementData={protegeAgreementData}
              fiscalYear='fed_fiscal_year_prime_'
              dollarAmount='fed_dollar_amount_recieved_prime_'
              contractValue='fed_funded_contract_value_prime_'
              number='fed_number_prime_'
            />
          </div>
        </div> : <div className='not-provided'>Not Provided</div>}



      <div className='row'>
        <div className='col-md-12'>
          <h3 className='agreement-mini-sub-header'>
            Total Federal Agency Subcontract Awards
          </h3>
        </div>
      </div>
      {protegeAgreement && protegeAgreement['has_awarded_contracts']
        && protegeAgreement['has_awarded_contracts'].toString() === 'true'
        && protegeAgreement['is_federal_agency_subcontracts'] ?
        <div className='row'>
          <div
            className='col-md-12 mt-2'
            data-test-id='Sub Contract Prime Awards'
          >
            <SubContactAwardsRows
              val={protegeAgreementData ? 3 : 3}
              protegeAgreement={protegeAgreement}
              prime={true}
              protegeAgreementData={protegeAgreementData}
              fiscalYear='fed_fiscal_year_sub_'
              dollarAmount='fed_dollar_amount_recieved_sub_'
              contractValue='fed_funded_contract_value_sub_'
              number='fed_number_sub_'
            />
          </div>
        </div> : <div className='not-provided'>Not Provided</div>}

    </div >
  )
}

const SubContactAwardsRows = ({
  val,
  protegeAgreement,
  fiscalYear,
  dollarAmount,
  contractValue,
  number,
}) => {
  const awards =
    protegeAgreement &&
    (protegeAgreement[`${fiscalYear}${1}`] ||
      protegeAgreement[`${fiscalYear}${2}`] ||
      protegeAgreement[`${fiscalYear}${3}`])
  if (!awards) {
    return <div className='not-provided'>Not Provided</div>
  }

  return (
    <table id={`${fiscalYear}-contract-table`} className='col-md-8 border-box'>
      <thead className='px-2'>
        <th>Fiscal Year</th>
        <th>Contract Number</th>
        <th>Funded Contract value</th>
        <th>Dollar Amount Received</th>
      </thead>
      <tbody className='px-2'>
        <tr>
          <td>{protegeAgreement[`${fiscalYear}1`]}</td>
          <td>{protegeAgreement[`${number}1`]}</td>
          <td>{protegeAgreement[`${contractValue}1`] ? `$${protegeAgreement[`${contractValue}1`]}` : ''}</td>
          <td>{protegeAgreement[`${dollarAmount}1`] ? `$${protegeAgreement[`${dollarAmount}1`]}` : ''}</td>
        </tr>
        <tr>
          <td>{protegeAgreement[`${fiscalYear}2`]}</td>
          <td>{protegeAgreement[`${number}2`]}</td>
          <td>{protegeAgreement[`${contractValue}2`] ? `$${protegeAgreement[`${contractValue}2`]}` : ''}</td>
          <td>{protegeAgreement[`${dollarAmount}2`] ? `$${protegeAgreement[`${dollarAmount}2`]}` : ''}</td>
        </tr>
      </tbody>
    </table>
  )
}

const DevelopmentAssistance = ({
  developmentalAssistanceFile,
  agreementId,
  allMentorAgreementData,
  forMentorReview,
  mentorAgreement,
  forProtegeView,
  allProtegeAgreementData
}) => {
  const reviewMode = true

  return (
    <div className='col-md-12 ml-n3 mt-5'>
      <h2 className='agreement-sub-header'>
        Developmental Assistance
      </h2>
      <div className='row mb-2'></div>
      <p className='mb-n1'>Document(s) uploaded by Mentor :</p>
      <div className='row mb-2'></div>
      {forMentorReview &&
        ((mentorAgreement && mentorAgreement['developmental_assistance_file']) ||
          (developmentalAssistanceFile &&
            developmentalAssistanceFile.length > 0)) ? (
        <FileUploadComponent
          agreement_type={`mentor`}
          field_name='developmental_assistance_upload_file'
          agreement_id={agreementId}
          initialFiles={
            developmentalAssistanceFile
              ? developmentalAssistanceFile
              : mentorAgreement &&
              mentorAgreement['developmental_assistance_file']
          }
          reviewMode={reviewMode}
          fileUploadComponentAddBtnId={'for-mentor-review-developmental-assistance'}
        />
      ) : forProtegeView ? (
        <FileUploadComponent
          agreement_type={`mentor`}
          field_name='developmental_assistance_upload_file'
          agreement_id={agreementId}
          initialFiles={
            allMentorAgreementData &&
            allMentorAgreementData['developmental_assistance_file']
          }
          developmentalAssistanceFile={developmentalAssistanceFile}
          reviewMode={reviewMode}
          fileUploadComponentAddBtnId={'for-protege-review-developmental-assistance'}
        />
      ) : (
        // isReviewerView
        <FileUploadComponent
          agreement_type={`mentor`}
          field_name='developmental_assistance_upload_file'
          agreement_id={agreementId}
          initialFiles={
            mentorAgreement && mentorAgreement['developmental_assistance_file']
          }
          developmentalAssistanceFile={developmentalAssistanceFile}
          reviewMode={reviewMode}
          fileUploadComponentAddBtnId={'for-reviewer-review-developmental-assistance'}
        />

      )}
      <div className="mb-n3">
        <p>Document(s) uploaded by Protégé:</p>
      </div>

      <div className='row'>
        <div
          className='col-md-12 pt-0 mt-0'
          data-test-id='Certified Small Business'
        >
          <FileUploadComponent
            agreement_type={`protege`}
            field_name='developmental_assistance_protege_file'
            agreement_id={agreementId}
            initialFiles={
              allProtegeAgreementData &&
              allProtegeAgreementData['developmental_assistance_protege_file']
            }
            isMentorApplication={false}
            reviewMode={true}
            fileUploadComponentAddBtnId={'protege-agr-developmental-assistance'}
          />
        </div>
      </div>
    </div>
  )
}

const ReviewerStatus = ({ agreementData }) => {
  const files = agreementData && agreementData['reviewer_uploaded_file']

  const comments = agreementData && agreementData['status_reason']

  const decision = agreementData && agreementData['mentor_protege_agr_status']

  return (
    <div className='mt-5'>
      <h2 className='reviewer-section-title'>Reviewer Status</h2>
      <h3 className='agreement-sub-header'>
        Reviewer&apos;s Decision for Agreement
      </h3>
      <span>
        <p>{decision ? decision : 'None'}</p>
      </span>

      <h3 className='agreement-sub-header'>Comments</h3>
      <span>
        <p>{comments ? comments : 'None'}</p>
      </span>

      <Attachments
        reasonFiles={files}
        attachmentStyle={'agreement-sub-header'}
      />
    </div>
  )
}

export default ReviewAgreement
