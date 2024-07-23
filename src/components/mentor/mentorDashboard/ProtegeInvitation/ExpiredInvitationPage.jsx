import React from 'react'
import './expiredInvitation.scss'
import { useHistory } from 'react-router-dom'
import time from '../../../../assets/images/time.png'

const ExpiredInvitationPage = () => {
  const history = useHistory()

  const handleClick = () => {
    history.push('/')
  }

  return (
    <section>
      <div className='container expired-invite-container'>
        <div className='row image-row'>
          <div className='col'>
            <img
              className='image-time-out'
              src={time}
              alt=''
            />
          </div>
        </div>
        <div className='row invitation-expired-row'>
          <div className='col'>
            <div className='invitation-expired-heading'>Invitation Expired</div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p className='paragraph-element'>
              We are unable to process this request because the link has
              expired. Please contact your mentor to re-send an invitation.
            </p>
          </div>
        </div>
        <div className='row button-row'>
          <div className='col'>
            <button
              className='btn btn-primary ok-button'
              type='button'
              onClick={handleClick}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExpiredInvitationPage
