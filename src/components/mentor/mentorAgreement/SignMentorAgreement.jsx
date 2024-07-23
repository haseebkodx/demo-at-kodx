import React from 'react'
import InputField from '../../commonComponents/forms/InputField'
import { formatDate } from '../../../helpers/formatter/format'
import InputCheckbox from '../../commonComponents/forms/InputCheckbox'

function SignMentorAgreement({
  mentorAgreement,
  mentorName,
  mentorFirm,
  mentorAgreementData,
  reviewer = true,
  mentorProtegeAgreementStatus,
}) {
  return (
    <div className='col-md-12'>
      <div className='mb-5' data-test-id='Sign Agreement Agreement'>
        {reviewer && (
          <h4 className='page-title reviewer-section-title'>Sign Agreement</h4>
        )}
        <div className='row'>
          <div className='col-md-12'>
            <p className='left-align'>
              {`${mentorName}, of ${mentorFirm} and Protege, of Protégé Firm
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
          <h5>Mentor Digital Signature</h5>
        </div>
        <div className='col-md-12' data-test-id='Sign Agreement'>
          <InputCheckbox
            name='sign_mentor_agreement'
            placeholder='Sign Agreement'
            required={true}
            ariaRequired={true}
            value={mentorAgreement && mentorAgreement['sign_mentor_agreement']}
            view={mentorAgreementData}
            checked={
              mentorAgreementData
                ? mentorAgreementData['sign_mentor_agreement']
                : mentorAgreement
                  ? mentorAgreement['sign_mentor_agreement']
                  : null
            }
            disabled={
              mentorAgreementData &&
              mentorAgreementData['mentor_arg_status'] === 'complete'
            }
            label={
              <div className='float-left'>
                <span aria-hidden='true'>*</span>
                {`I, ${mentorName}, acknowledge that I am representative of ${mentorFirm}, with the authorization 
              to digitally signed the Mentor-Protégé Agreement with ${'Protégé Firm'}`}
              </div>
            }
            id={'sign_mentor_agreement'}
          />
          <div className='row'>
            <div className='col-md-12' data-test-id='Name'>
              <InputField
                name='sign_mentor_name'
                placeholder='Name'
                id='sign-mentor-name'
                required={true}
                value={mentorAgreement && mentorAgreement['sign_mentor_name']}
                view={mentorAgreementData}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6' data-test-id='Title'>
              <InputField
                name='sign_mentor_title'
                placeholder='Title'
                id='sign-mentor-title'
                required={true}
                value={mentorAgreement && mentorAgreement['sign_mentor_title']}
                view={mentorAgreementData}
              />
            </div>
            <div className='col-md-6' data-test-id='Date'>
              <InputField
                name='sign_mentor_date'
                placeholder='Date'
                id='sign-mentor-date'
                required={true}
                format={formatDate}
                value={mentorAgreement && mentorAgreement['sign_mentor_date']}
                view={mentorAgreementData}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row mb-5" data-test-id="Sign Agreement Agreement">
        <div className="col-md-3">
          <h6 className="form-section-title">Mentor Digital Signature</h6>
        </div>
        <div className="col-md-8">
          <p className="left-align">
            {`Mentor user has not signed the agreement`}
          </p>
        </div>
      </div > */}
    </div>
  )
}

export default SignMentorAgreement
