import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserTag } from '@fortawesome/free-solid-svg-icons'

function AccountInformation({ userInfo }) {
  return (
    <div>
      <h4 className="heading-small text-medium mb-4">Account Information</h4>
      <div className="form-group mb-3" data-test-id="User Email">
        <div className="input-group input-group-login">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
          <label className="sr-only" htmlFor="user-email">User Email</label>
          <input className="form-control" placeholder="Email" value={userInfo.email} type="text" name="user[email]" id="user-email" readOnly />
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6 mb-3" data-test-id="First Name">
            <div className="input-group input-group-login">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faUserTag} />
                </span>
              </div>
              <label className="sr-only" htmlFor="user-first-name">First Name</label>
              <input className="form-control" placeholder="First Name" value={userInfo.first_name} type="text" name="user[first_name]" id="user-first-name" readOnly />
            </div>
          </div>
          <div className="col-6 mb-3" data-test-id="Last Name">
            <div className="input-group input-group-login">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faUserTag} />
                </span>
              </div>
              <label className="sr-only" htmlFor="user-last-name">Last Name</label>
              <input className="form-control" placeholder="Last Name" value={userInfo.last_name} type="text" name="user[last_name]" id="user-last-name" readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default AccountInformation