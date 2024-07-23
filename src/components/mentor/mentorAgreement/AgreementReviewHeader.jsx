import React from 'react'
import logo from '../../../assets/images/logo.svg'

function AgreementReviewHeader() {
  const localStorage = window.localStorage
  const userInfo = JSON.parse(localStorage.getItem('user_info'))
  return (
    <div className="mentor-title-bar">
      <div className="container">
        <div className="row">
          <div className="col-md-1d">
            <div className="mpp-logo-img my-4">
              <img src={logo} alt="Logo" width="60" height="60" />
            </div>
          </div>
          <div className="col-md-11 mt-4">
            <h2>DoD OSBP Mentor-Protégé Program</h2>
            <h3>{`${userInfo && userInfo.first_name} ${userInfo && userInfo.last_name} - Protégé Agreement`}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgreementReviewHeader
