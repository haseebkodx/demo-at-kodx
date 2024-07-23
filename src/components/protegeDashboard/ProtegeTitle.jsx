import React from 'react'

function ProtegeTitle() {

  const localStorage = window.localStorage
  const userInfo = JSON.parse(localStorage.getItem('user_info'))

  return (
    <div className="mentor-title-bar">
      <div className="container">
        <div className="row">
          <div className="col-12" data-test-id="Mentor Title">
            <h2 className="title mt-4 font-weight-bold">Welcome Protégé</h2>
            <h3 className="company mb-2 font-weight-bold">{`${userInfo && userInfo.first_name} ${userInfo && userInfo.last_name}`}</h3>
            <p className="address mb-5">
              <span className="address-label">{userInfo && userInfo.address && userInfo.address.street_address}</span><br />
              {`${userInfo && userInfo.address && userInfo.address.city}, ${userInfo && userInfo.address && userInfo.address.state} ${userInfo && userInfo.address && userInfo.address.zip}`}<br />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProtegeTitle