import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Container, Modal, Row } from 'react-bootstrap'
import InputCheckbox from './commonComponents/forms/InputCheckbox'
import { keydownHandler } from './commonComponents/utility'

const PrivacyStatement = () => {
  return (
    <div className='privacy-modal-container mb-3'>
      <div className='privacy-modal-scroll-container'>
        <div className='privacy-modal-scroll-content'>
          <div className='privacy-modal-content'>You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only.</div>
          <br/>
          <div className='privacy-modal-content'>By using this IS (which includes any device attached to this IS), you consent to the following conditions:</div>
          <br/>

          <div className='privacy-modal-content-item'>-The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.</div>
          <br/>
          <div className='privacy-modal-content-item'>-At any time, the USG may inspect and seize data stored on this IS.</div>
          <br/>
          <div className='privacy-modal-content-item'>-Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG-authorized purpose.</div>
          <br/>
          <div className='privacy-modal-content-item'>-This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy.</div>
          <br/>
          <div className='privacy-modal-content-item'>-Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details.</div>
        </div>
      </div>
    </div>
  );
};

function LoginRedirectModal({ showModal, showModalHandler, loginHandler, loginSignup }) {
  const loginRedirectValue = useSelector(
    (state) =>
      state.form &&
      state.form.loginRedirectModal &&
      state.form.loginRedirectModal.values
  )

  useEffect(() => {
    if (loginRedirectValue && loginRedirectValue['loginCheck']) {
      setIsChecked(true)
      setIsDisabled(false)
    } else if (
      loginRedirectValue &&
      loginRedirectValue['loginCheck'] === false
    ) {
      setIsChecked(false)
      setIsDisabled(true)
    }
  }, [loginRedirectValue && loginRedirectValue['loginCheck']])

  const [isDisabled, setIsDisabled] = useState(true)
  const [isChecked, setIsChecked] = useState(false)

  return (
    <Modal show={showModal} aria-labelledby="login-redirect-container" centered={true}>
      <Modal.Header closeButton onHide={showModalHandler}>
        <Modal.Title>
          <h1 id="login-redirect-container" className="modal-heading">IMPORTANT</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row'>
          <div className='col-md-12'>
            {loginSignup === 'Signup' ?
              <div className='mb-3'>
                When signing up with Login.gov{' '}
                <b>you must use your work email address</b> so the system can
                associate you with your company.
                <br/>
                <br/>
                <PrivacyStatement />
              </div>
              : <div className='mb-3'>
                <PrivacyStatement />
              </div>}
          </div>
        </div>
        {<div className='row'>
          {<div className='col-md-12'>
            <InputCheckbox
              label={
                <div>
                  <span aria-hidden='true'>*</span>I have read and understood
                  the above statement
                </div>
              }
              name='loginCheck'
              id='loginCheck'
              placeholder='Login checkbox'
              value={loginRedirectValue && loginRedirectValue['loginCheck'] ? true : false}
              checked={loginRedirectValue && loginRedirectValue['loginCheck'] ? true : false}
              required={true}
              ariaRequired={true}
              errorMessage={`You must check the checkbox to proceed.`}
              onKeyDown={keydownHandler}
            />
          </div>}
          <>{!isChecked ? (
            <div>
              <p className='sr-only' aria-live='polite'>
                Please check the checkbox to indicate that you understand the
                above statement.
              </p>
            </div>
          ) : null}
          </>
        </div>}
      </Modal.Body>
      <Modal.Footer>
        <div className='col-md-12'>
          {isChecked ? (
            <div>
              <p className='sr-only' aria-live='polite'>
                Please click on the Go to Login.gov button to login.
              </p>
            </div>
          ) : null}

          {(loginSignup === 'Signup' || loginSignup === 'Login') && <button
            className='btn btn-border-gray mr-2 focusable-item'
            onClick={showModalHandler}
          >
            Cancel
          </button>}

          <button
            className={`btn btn-primary btn-no-pointer-events focusable-item`}
            aria-disabled={isDisabled && (loginSignup === 'Signup' || loginSignup === 'Login')}
            onClick={loginHandler}
          >
            Go to Login.gov
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

LoginRedirectModal = reduxForm({
  enableReinitialize: true,
  form: 'loginRedirectModal',
})(LoginRedirectModal)

export default LoginRedirectModal
