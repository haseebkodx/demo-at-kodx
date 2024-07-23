import React from 'react'
import InputField from '../commonComponents/forms/InputField'
import formatDate from '../../helpers/formatter/formatDate'
import InputCheckbox from '../commonComponents/forms/InputCheckbox'

function SignAgreement({
  protegeAgreement,
  mentorFirm,
  protegeName,
  protegeAgreementData,
  reviewer = true,
}) {
  return (
    <div className='col-md-12'>
      {reviewer && (
        <h4 className='page-title reviewer-section-title'>Sign Agreement</h4>
      )}
      <div className='mb-5' data-test-id='Sign Agreement Agreement'>
        {/* <div className="col-md-3">
          <h5 className="form-section-title">Sign Agreement</h5>
        </div> */}
        <div>
          <div className='col-md-8'>
            <p className='left-align'>
              {`Mentor User, of ${mentorFirm} and ${protegeName}, of 
            ${protegeAgreement && protegeAgreement.firm_name
                  ? protegeAgreement.firm_name
                  : 'Protégé Firm'
                } 
            are required to sign this agreement. ${mentorFirm} is responsible for submitting the agreement.
            Upon submission, this agreement will be sent to the Office of Small Business Program for review.`}
            </p>
          </div>
        </div>
      </div>
      <div className='row mb-5' data-test-id='Sign Agreement Agreement'>
        <div className='col-md-11 sign-note ml-4'>
          <p className='left-align'>
            <h6>Please Note</h6>
            {`A mentor firm may not require an SDB concern to enter into a mentor-protégé agreement 
            as a condition for being awarded a contract by the mentor firm including a subcontract
             under a DoD contract awarded to the mentor firm.`}
          </p>
        </div>
      </div>
      <div className='row mb-5' data-test-id='Sign Agreement Agreement'>
        <div className='col-md-12'>
          <h6>Protégé Digital Signature</h6>
        </div>
        <div className='col-md-12' data-test-id='Sign Agreement'>
          <InputCheckbox
            name='sign_agreement'
            placeholder='Sign Agreement'
            required={true}
            ariaRequired={true}
            value={protegeAgreement && protegeAgreement['sign_agreement']}
            view={protegeAgreementData}
            checked={
              protegeAgreementData
                ? protegeAgreementData['sign_agreement']
                : protegeAgreement
                  ? protegeAgreement['sign_agreement']
                  : null
            }
            disabled={
              protegeAgreementData
            }
            id={'sign_agreement'}
            label={
              <div className='float-left'>
                <span aria-hidden='true'>*</span>
                {`I, ${protegeName}, acknowledge that I am representative of ${protegeAgreement && protegeAgreement.firm_name
                  ? protegeAgreement.firm_name
                  : 'Protégé Firm'
                  }, with the authorization 
              to digitally signed the Mentor-Protégé Agreement with ${mentorFirm}`}
              </div>
            }
          />
          <div className='row'>
            <div className='col-md-12' data-test-id='Name'>
              <InputField
                name='sign_protege_name'
                placeholder='Name'
                id='sign-protege-name'
                required={true}
                value={
                  protegeAgreement && protegeAgreement['sign_protege_name']
                }
                view={protegeAgreementData}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6' data-test-id='Title'>

              <InputField
                name='sign_protege_title'
                placeholder='Title'
                id='sign-protege-title'
                required={true}
                value={
                  protegeAgreement && protegeAgreement['sign_protege_title']
                }
                view={protegeAgreementData}
              />
            </div>
            <div className='col-md-6' data-test-id='Date'>

              <InputField
                name='sign_protege_date'
                placeholder='Date'
                id='sign-protege-date'
                required={true}
                format={formatDate}
                value={
                  protegeAgreement && protegeAgreement['sign_protege_date']
                }
                view={protegeAgreementData}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='row mb-5' data-test-id='Sign Agreement Agreement'>
        <div className='col-md-8'>
          <h6>Mentor Digital Signature</h6>
        </div>
        <div className='col-md-8'>
          <p className='left-align'>
            {`Mentor user has not signed the agreement`}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignAgreement
