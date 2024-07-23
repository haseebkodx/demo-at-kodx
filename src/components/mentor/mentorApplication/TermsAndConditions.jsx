import React from 'react'
import InputCheckbox from '../../commonComponents/forms/InputCheckbox'
import { keydownHandler } from '../../commonComponents/utility'
import '../../../App.css'
import './mentorApplication.scss'

function TermsAndCondtions({
  mentorApp,
  mentorApplicationInfo,
  submitted,
  summary,
}) {

  return (
    <div
      id='terms-and-conditions'
      className={`row left-align ${summary ? 'mt-5' : 'mb-5'}`}
    >
      {!summary && (
        <div className='col-md-10'>
          <h2 className='reviewer-section-title mentor-application-header col-md-12 p-3'>
            Terms &amp; Conditions
          </h2>
        </div>
      )}
      <div className='col-md-10' data-test-id='TermsAndCondtions'>
        {summary && (
          <h2 className='mt-3 my-3 mentor-summary-section-heading'>
            Terms and Conditions
          </h2>
        )}
        <div className='col-md-12 terms-container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='input-checkbox-container'>
                <InputCheckbox
                  label={
                    <p className='label-paragraph'>
                      <span aria-hidden='true'>*</span>I agree to comply with
                      all programs{' '}
                      <a
                        className='anchor-tag-cls focusable-item'
                        href='https://www.acquisition.gov/dfars/appendix-i-%E2%80%94policy-and-procedures-dod-pilot-mentor-protege-program#id2064F0S0OQN'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        reporting and review requirements
                      </a>{' '}
                      (i.e., monthly progress reports, semi-annual reports for the periods ending March 31st and September 30th, and the Defense Contract Management Agency DCMA annual performance reviews).
                    </p>
                  }
                  name='agreed_to_terms'
                  id='agreed_to_terms'
                  view={mentorApplicationInfo || summary}
                  value={mentorApp && mentorApp['agreed_to_terms'] ? true : false}
                  checked={mentorApp && mentorApp['agreed_to_terms'] ? true : false}
                  submitted={submitted}
                  styling={'inline-flex'}
                  ariaRequired={true}
                  className='checkbox-margin'
                  onKeyDown={keydownHandler}
                />
              </div>
              {!submitted && mentorApp && !mentorApp['agreed_to_terms'] && (
                <div>
                  <p className='sr-only' aria-live='polite'>
                    Please check the checkbox to agree to our terms.
                  </p>
                </div>
              )}
            </div>
            <div className='col-md-10'>
              <div className='row'>
                <div className='col-md-12'>
                  {submitted && mentorApp && !mentorApp['agreed_to_terms'] && (
                    <p className='erorr-red my-2'>
                      You must agree to the terms before submitting the
                      application.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsAndCondtions
