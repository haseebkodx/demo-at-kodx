import React from 'react'
import dateFormat from 'dateformat'

function Security({ userInfo }) {

  return (
    <div className="card shadow mt-5 mb-1 security-card">
      <div className="card-header">
        <div className="row align-items-center">
          <div className="col">
            <h2 className="mb-0">Security</h2>
          </div>
          <div className="col-auto">
            <span className="btn btn-primary caption text-white pt-0 pb-0">Signed In: {userInfo.sign_in_count} times</span>
          </div>
        </div>
      </div>
      <div className="card-body" data-test-id="Security Info">
        <div className="row">
          <div className="col-md-12">
            <h3 className="mb-3">Last Sign In</h3>
            <div>
              <h4 className="mb-0 text-secondary">Date</h4>
              <p>{dateFormat(userInfo.last_sign_in_at, "mm/dd/yyyy h:MM:ss TT")}</p>
            </div>
            <div>
              <h4 className="mb-0 text-secondary">IP Address</h4>
              <p>{userInfo.last_sign_in_ip || 'Not Available'}</p>
            </div>
          </div>
          <div className="col-md-12">
            <h3 className="mb-3">Account Confirmed</h3>
            <div>
              <h4 className="mb-0 text-secondary">Confirmed</h4>
              <p>{dateFormat(userInfo.updated_at, "mm/dd/yyyy h:MM:ss TT")}</p>
            </div>
            <div>
              <h4 className="mb-0 text-secondary">Confirmation Sent</h4>
              <p>{dateFormat(userInfo.created_at, "mm/dd/yyyy h:MM:ss TT")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Security