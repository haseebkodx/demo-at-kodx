import React from 'react'
import InputCheckbox from '../../commonComponents/forms/InputCheckbox'

function ReportReviewRequirement({
  mentorAgreement,
  mentorFirm,
  mentorName,
  reviewer = true,
  mentorAgreementData,
  mentorProtegeAgreementStatus,
  completeMentorAgreement
}) {
  return (
    <div className='col-md-12 mb-5' data-test-id='Reporting Requirments'>
      {reviewer && (
        <h4 className='page-title reviewer-section-title'>Report & Reiew</h4>
      )}
      <div className='row'>
        <div className='col-md-12'>
          <span className='agreement-sub-header'>Report & Review</span>
          <p className='left-align mt-2'>
            {`${mentorFirm} and ${mentorAgreement && mentorAgreement.firm_name
              ? mentorAgreement.firm_name
              : 'Protégé Firm'
              } are willing to comply with the Mentor-Protégé Program's
          reporting and review requirements to include the semi-annual reports and the annual performance
          reviews that will be conducted by the Defense Contract Management Agency (DCMA).`}
          </p>
          <p>
            {`${mentorFirm} will provide data on employment and revenues for two years after the conclusion
          of the agreement.`}
          </p>
          <div className='mb-4'>
            <InputCheckbox
              name='reporting_requirements'
              placeholder='Reporting Requirements'
              value={
                mentorAgreement && mentorAgreement['reporting_requirements']
              }
              required={true}
              ariaRequired={true}
              label={
                <div>
                  <span aria-hidden='true'>*</span>
                  {`I, ${mentorName}, agree to
                  above agreement`}
                </div>
              }
              id={`I, ${mentorName}, agree to above agreement`}
              view={mentorAgreementData}
              checked={
                mentorAgreementData
                  ? mentorAgreementData['reporting_requirements']
                  : mentorAgreement
                    ? mentorAgreement['reporting_requirements']
                    : null
              }
              disabled={
                completeMentorAgreement
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportReviewRequirement
