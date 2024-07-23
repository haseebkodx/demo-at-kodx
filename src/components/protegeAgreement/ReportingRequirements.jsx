import React from 'react'
import InputCheckbox from '../commonComponents/forms/InputCheckbox'

function ReportingRequirements({
  mentorProtegeAgrStatus,
  protegeAgreement,
  mentorFirm,
  protegeName,
  protegeAgreementData,
  reviewer = true,
}) {
  return (
    <div className='col-md-12 mb-5' data-test-id='Reporting Requirments'>
      {reviewer && (
        <h2 className='page-title reviewer-section-title section-header'>Report & Review</h2>
      )}
      <div className='row'>
        {/* <div className="col-md-3">
          <h5 className="form-section-title">Report and Review Requirments</h5>
        </div> */}
        <div className='col-md-12'>
          <span className='agreement-sub-header'>
            {' '}
            Report and Review Requirements
          </span>
          <p className='left-align mt-2'>
            {`${mentorFirm} and ${protegeAgreement && protegeAgreement.firm_name
              ? protegeAgreement.firm_name
              : 'Protégé Firm'
              } are willing to comply with the Mentor-Protégé Program's
          reporting and review requirements to include the semi-annual reports and the annual performance
          reviews that will be conducted by the Defense Contract Management Agency (DCMA).`}
          </p>
          <p>
            {`${protegeAgreement && protegeAgreement.firm_name
              ? protegeAgreement.firm_name
              : 'Protégé Firm'
              } will provide data on employment and revenues for two years after the conclusion
          of the agreement.`}
          </p>
          <div>
            <InputCheckbox
              name='reporting_requirements'
              placeholder='Reporting Requirements'
              value={
                protegeAgreement && protegeAgreement['reporting_requirements']
              }
              required={true}
              ariaRequired={true}
              label={
                <div>
                  <span aria-hidden='true'>*</span>
                  {`I, ${protegeName}, agree to
                  above agreement`}
                </div>
              }
              id={`I, ${protegeName}, agree to above agreement`}
              view={protegeAgreementData}
              checked={
                protegeAgreementData
                  ? protegeAgreementData['reporting_requirements']
                  : protegeAgreement
                    ? protegeAgreement['reporting_requirements']
                    : null
              }
              disabled={protegeAgreementData}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default ReportingRequirements
