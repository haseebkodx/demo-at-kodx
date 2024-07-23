import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCity, faGlobeAmericas, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

function ContactInformation({ userInfo }) {
  return (
    <div>
      <h4 className="heading-small text-medium my-4">Contact Information</h4>
      <div className="form-group mb-3" data-test-id="Address Line 1">
        <div className="row">
          <div className="col-12">
            <div className="input-group input-group-login">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faHome} />
                </span>
              </div>
              <label className="sr-only" htmlFor="user-address-1">Address Line 1</label>
              <input className="form-control" placeholder="Address Line 1" value={userInfo && userInfo.address && userInfo.address.street_address} type="text" name="user[address1]" id="user-address-1" readOnly />
            </div>
          </div>
        </div>
      </div>
      <div className="form-group mb-3" data-test-id="Address Line 2">
        <div className="row">
          <div className="col-12">
            <div className="input-group input-group-login">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faHome} />
                </span>
              </div>
              <label className="sr-only" htmlFor="user-address-2">Address Line 2 (Optional)</label>
              <input className="form-control" placeholder="Address Line 2" value="Address Line 2" type="text" name="user[address2]" id="user-address-2" readOnly />
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-12 col-md-4 mb-3" data-test-id="City">
            <div className="input-group input-group-login">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faCity} />
                </span>
              </div>
              <label className="sr-only" htmlFor="user-city">City</label>
              <input className="form-control" placeholder="City" value={userInfo && userInfo.address && userInfo.address.city} type="text" name="user[city]" id="user-city" readOnly />
            </div>
          </div>
          <div className="col-6 col-md-4 mb-3" data-test-id="State">
            <div className="input-group input-group-login">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faGlobeAmericas} />
                </span>
              </div>
              <label className="sr-only" htmlFor="user-state">State</label>
              <input className="form-control" placeholder="State" value={userInfo && userInfo.address && userInfo.address.state} type="text" name="user[state]" id="user-state" readOnly />
            </div>
          </div>
          <div className="col-6 col-md-4 mb-3" data-test-id="Zip">
            <div className="input-group input-group-login">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </span>
              </div>
              <label className="sr-only" htmlFor="user-zipcode">Zip</label>
              <input className="form-control input-zip" placeholder="Zip" value={userInfo && userInfo.address && userInfo.address.zip} type="text" name="user[zipcode]" id="user-zipcode" im-insert="true" readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactInformation