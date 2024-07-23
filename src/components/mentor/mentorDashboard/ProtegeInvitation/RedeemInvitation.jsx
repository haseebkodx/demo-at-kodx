import React, { useState, useEffect } from 'react'
import login from '../../../login.action'
import { reduxForm } from 'redux-form'
import InputCheckbox from '../../../commonComponents/forms/InputCheckbox'
import { useSelector } from 'react-redux'
import { expiredRedemption } from '../../../expiredInvitation'
import { useHistory } from 'react-router-dom'
import { keydownHandler } from '../../../commonComponents/utility'
import { getQueryString } from '../../../../helpers/urlUtils'

function RedeemInvitation() {
  const handleLogin = async () => {
    const queryString = window.location.search || getQueryString(window.location.href)
    const urlParams = new URLSearchParams(queryString)
    const invitationToken = urlParams.get('invitation_token')
    const loginData = invitationToken && (await login(invitationToken))
    loginData && loginData.url && (window.location.replace(loginData.url))
  }

  const history = useHistory()

  const url = new URLSearchParams(window.location.href)
  const firstName = url.get('fn')
  const lastName = url.get('ln')
  const email = url.get('email')
  const inviteEmail = url.get('inviteEmail')
  const role = url.get('role')
  const date = url.get('date')

  const redeemInviteAgreeToTerms = useSelector(
    (state) =>
      state.form &&
      state.form.redeemInvitation &&
      state.form.redeemInvitation.values
  )

  useEffect(() => {
    if (date) {
      checkExpiration()
    }
  }, [date])

  const checkExpiration = () => {
    if (role === 'protege') {
      const isExpired = expiredRedemption(date)
      if (isExpired) {
        history.push('/expiredInvitation')
      }
    }
  }

  useEffect(() => {
    if (
      redeemInviteAgreeToTerms &&
      redeemInviteAgreeToTerms['redeem-invite-agree-to-terms']
    ) {
      setIsChecked(true)
      setIsDisabled('false')
    } else if (
      redeemInviteAgreeToTerms &&
      redeemInviteAgreeToTerms['redeem-invite-agree-to-terms'] === false
    ) {
      setIsChecked(false)
      setIsDisabled('true')
    }
  }, [
    redeemInviteAgreeToTerms &&
    redeemInviteAgreeToTerms['redeem-invite-agree-to-terms'],
  ])

  const [isDisabled, setIsDisabled] = useState('true')
  const [isChecked, setIsChecked] = useState(false)

  return (
    <main id='main'>
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-6 redeem-invite-container ny-5'>
          <div className='card redeem-invite text-center'>
            <div className='card-body'>
              <div className='invite-mail-img mt-0 mb-2'></div>
              <h2 className='card-title font-weight-bold'>Redeem Invitation</h2>
              {role === 'reviewer' ? (
                // reviewer message
                <p className='card-text'>
                  {`${firstName} ${lastName} (${email}) has invited you to become a Reviewer. You must first redeem the invitation below and then you will be redirected to Login.gov where you can either create a new account or sign in with an existing account.`}
                </p>
              ) : (
                  // protege message
                  <>
                    <p className='card-text'>
                      {`${firstName} ${lastName} (${email}) has invited you to become a Protege and to participate in the Mentor-Protege Program. You must first redeem the invitation below and then you will be redirected to Login.gov where you can either create a new account or sign in with an existing account.`}
                    </p>
                    <hr className='line-break'></hr>
                    <p className='card-text'>
                      <strong>Important</strong>: When signing up with Login.gov,
                    use this email: <strong>{inviteEmail}</strong>
                   
                  </p>
                  </>
                )}
              <div className='input-checkbox'>
                <InputCheckbox
                  label={
                    <div className='card-text'>
                      <span aria-hidden='true'>*</span>I have read and
                      understand the terms.
                    </div>
                  }
                  name='redeem-invite-agree-to-terms'
                  id='I have read and understand the terms'
                  value={
                    redeemInviteAgreeToTerms &&
                    redeemInviteAgreeToTerms['redeem-invite-agree-to-terms']
                  }
                  checked={
                    redeemInviteAgreeToTerms &&
                    redeemInviteAgreeToTerms['redeem-invite-agree-to-terms']
                  }
                  ariaRequired={true}
                  onKeyDown={keydownHandler}
                />

                {!isChecked ? (
                  <div>
                    <p className='sr-only' aria-live='polite'>
                      Please check the checkbox to indicate understand the
                      terms.
                    </p>
                  </div>
                ) : null}
              </div>

              {isChecked ? (
                <div>
                  <p className='sr-only' aria-live='polite'>
                    Please click on the button to redeem your invitation.
                  </p>
                </div>
              ) : null}
              <button
                className='redeem-invite-btn btn btn-primary btn-sm btn-no-pointer-events focusable-item'
                aria-disabled={isDisabled}
                onClick={() => handleLogin()}
              >
                REDEEM INVITATION
              </button>
            </div>
          </div>
        </div>
        <div className='col-md-3'></div>
      </div>
    </main>
  )
}

RedeemInvitation = reduxForm({
  form: 'redeemInvitation',
})(RedeemInvitation)

export default RedeemInvitation
