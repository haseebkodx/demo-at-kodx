import React, { useState, useEffect } from 'react'
import InputField from '../commonComponents/forms/InputField'
import SelectField from '../commonComponents/forms/SelectField'
import { zipMask } from '../../helpers/formatter/masks'
import validateEmail from '../commonComponents/forms/validations/validateEmail'
import formatPhone from '../../helpers/formatter/formatPhone'
import pen from '../../assets/images/pen.png'

const PointOfContact = ({ poc, stateOptions, userProfileCompany, canEditCompanyProfile, isCompanyProfileFormEditable, onEditCompanyProfileClickHandler }) => {
  const [isStateOptionSelected, setIsStateOptionSelected] = useState(false)

  useEffect(() => {
    if (poc) {
      if (poc['contact_state'] && poc['contact_state'] != 'State') {
        setIsStateOptionSelected(true)
      }
    }
  }, [(poc && poc['contact_state'])])

  return (
    <div id='point-of-contact'>
      <div className='row my-3 ml-3'>
        <div className='col-md-6 p-0'>
          <strong className='float-left'>MPP POC</strong>
        </div>
        <div className='col-md-6 p-0'>
          {isCompanyProfileFormEditable && (
            <button
              type='button'
              className={
                canEditCompanyProfile
                  ? 'btn btn-secondary float-right px-3 py-2'
                  : 'btn btn-primary float-right px-3 py-2'
              }
              onClick={onEditCompanyProfileClickHandler}
            >
              <img
                id='company-profile-edit-id'
                src={pen}
                className='mr-3'
                alt=''
                title='company-profile-edit'
              />
              Edit Profile
            </button>
          )}
        </div>
      </div>
      <div className='row mb-1 ml-3'>
        <div className='col-12 col-md-12 poc-container float-left'>
          <div className='row'>
            <div
              className='col-12 col-lg-4 mb-3'
              data-test-id='Contact First Name'
            >

              <InputField
                name='contact_first_name'
                placeholder='First Name'
                id='contact-first-name'
                required={true}
                value={poc && poc['contact_first_name']}
                disabled={userProfileCompany && !canEditCompanyProfile}
                readOnly={userProfileCompany && !canEditCompanyProfile}
              />
            </div>
            <div
              className='col-12 col-lg-4 mb-3'
              data-test-id='Contact Last Name'
            >

              <InputField
                name='contact_last_name'
                placeholder='Last Name'
                id='contact-last-name'
                required={true}
                value={poc && poc['contact_last_name']}
                disabled={userProfileCompany && !canEditCompanyProfile}
                readOnly={userProfileCompany && !canEditCompanyProfile}
              />
            </div>
            <div className='col-12 col-lg-4 mb-3' data-test-id='Contact Title'>
              <InputField
                name='contact_title'
                placeholder='Job Title'
                id='contact-title'
                required={false}
                value={poc && poc['contact_title']}
                disabled={userProfileCompany && !canEditCompanyProfile}
                readOnly={userProfileCompany && !canEditCompanyProfile}
              />
            </div>
          </div>
          <div className='row'>
            <div
              className='col-12 col-lg-6 mb-3'
              data-test-id='Contact Email Address'
            >

              <InputField
                name='contact_email'
                placeholder='Email'
                id='contact-email'
                required={true}
                value={poc && poc['contact_email']}
                validation={validateEmail}
                disabled={userProfileCompany && !canEditCompanyProfile}
                readOnly={userProfileCompany && !canEditCompanyProfile}
              />
            </div>
            <div
              className='col-12 col-lg-3 mb-3'
              data-test-id='Contact Phone Number'
            >

              <InputField
                name='contact_phone'
                placeholder='Phone'
                id='contact-phone'
                required={true}
                format={formatPhone}
                value={poc && poc['contact_phone']}
                min={10}
                disabled={userProfileCompany && !canEditCompanyProfile}
                readOnly={userProfileCompany && !canEditCompanyProfile}
              />
            </div>
            <div
              className='col-12 col-lg-3 mb-3'
              data-test-id='Contact Fax Number'
            >
              <InputField
                name='contact_fax'
                placeholder='Fax'
                id='contact-fax'
                format={formatPhone}
                value={poc && poc['contact_fax']}
                min={10}
                disabled={userProfileCompany && !canEditCompanyProfile}
                readOnly={userProfileCompany && !canEditCompanyProfile}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-12 mb-3' data-test-id='Contact Address'>
              <InputField
                name='contact_address'
                placeholder='Address'
                id='contact-address'
                value={poc && poc['contact_address']}
                disabled={userProfileCompany && !canEditCompanyProfile}
                readOnly={userProfileCompany && !canEditCompanyProfile}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-lg-6 mb-3' data-test-id='Contact City'>
              <InputField
                name='contact_city'
                placeholder='City'
                id='contact-city'
                value={poc && poc['contact_city']}
                disabled={userProfileCompany && !canEditCompanyProfile}
                readOnly={userProfileCompany && !canEditCompanyProfile}
              />
            </div>
            <div className='col-6 col-lg-3 mb-3' data-test-id='Contact State'>
              <SelectField
                name='contact_state'
                id='contact-state'
                placeholder='State'
                options={stateOptions}
                value={poc && poc['contact_state']}
                defaultValue='State'
                disabled={userProfileCompany && !canEditCompanyProfile}
                isOptionSelected={
                  isStateOptionSelected &&
                  isCompanyProfileFormEditable &&
                  !canEditCompanyProfile
                }
              />
            </div>
            <div className='col-6 col-lg-3 mb-3' data-test-id='Contact Zip'>
              <InputField
                name='contact_zip'
                placeholder='Zip Code'
                id='contact-zip'
                mask={zipMask}
                value={poc && poc['contact_zip']}
                disabled={userProfileCompany && !canEditCompanyProfile}
                readOnly={userProfileCompany && !canEditCompanyProfile}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default PointOfContact