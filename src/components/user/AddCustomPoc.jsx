import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { reduxForm } from 'redux-form'
import { useSelector } from 'react-redux'
import InputField from '../commonComponents/forms/InputField'
import SelectField from '../commonComponents/forms/SelectField'
import validateEmail from '../commonComponents/forms/validations/validateEmail'
import validatePhone from '../commonComponents/forms/validations/validatePhone'
import formatPhone from '../../helpers/formatter/formatPhone'
import validateStateAndZip from '../commonComponents/forms/validations/validateStateAndZip';
import { zipMask } from '../../helpers/formatter/masks'

function AddCustomPoc({ showModal, showModalHandler, hideModalHandler, stateOptions, customPoc, customPocHandler, changeAddCustomBusinessPocRef, initialize, handleSubmit, setSelectedPOC }) {
  const [isNewCustomPoc, setIsNewCustomPoc] = useState(true)
  const poc = useSelector(state => state.form.mppContact && state.form.mppContact.values)

  useEffect(() => {
    if (customPoc) {
      setIsNewCustomPoc(false)
      initialize({ ...customPoc })
    }
    else {
      setIsNewCustomPoc(true)
      initialize({
        firstName: '',
        lastName: '',
        title: '',
        email: '',
        usPhone: '',
        fax: '',
        addressLine1: '',
        city: '',
        stateOrProvinceCode: '',
        zipCode: ''
      })
    }
  }, [showModal])

  const setCustomPoc = () => {
    const isAllRequiredPOCValuesDefined = poc && poc['firstName'] && poc['lastName'] && poc['title'] && poc['email'] && poc['usPhone'] && poc['addressLine1'] && poc['city'] && poc['stateOrProvinceCode'] && poc['zipCode'] && true
    const isFaxValidated = (poc['fax'] == '') || (poc['fax'] && validatePhone({ phone: poc['fax'] }))
    const isPhoneValidated = poc['usPhone'] !== '' && validatePhone({ phone: poc['usPhone'] });
    const isStateAndZipValidate = validateStateAndZip(poc['stateOrProvinceCode'], poc['zipCode']);

    if (isAllRequiredPOCValuesDefined && isFaxValidated && isPhoneValidated && isStateAndZipValidate) {
      customPocHandler(poc)
      setSelectedPOC("mpp_poc")
      showModalHandler(false)
      changeAddCustomBusinessPocRef(true)
      hideModalHandler(); 
    }
    setSelectedPOC("mpp_poc")
  }

  return (
    <Modal
      dialogClassName={'add-custom-contact-dialog'}
      show={showModal}
      onHide={hideModalHandler}
      aria-labelledby="custom-contact-poc"
      centered
    >
      <form onSubmit={handleSubmit(setCustomPoc)}>
        <Modal.Header closeButton className='pb-0'>
          <Modal.Title>
            <h1 id="custom-contact-poc" className='modal-heading'>
              {isNewCustomPoc ? 'Add New Contact' : 'Edit New Contact'}
            </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='pt-1'>
          <main id='main' className='m-0'>
            <div className='row mt-2'>
              <div className='col-md-6' data-test-id='Contact First Name'>

                <InputField
                  name='firstName'
                  placeholder='First Name'
                  id='contact-first-name'
                  type='text'
                  required={true}
                  value={poc && poc['firstName']}
                />
              </div>
              <div className='col-md-6' data-test-id='Contact Last Name'>

                <InputField
                  name='lastName'
                  placeholder='Last Name'
                  id='contact-last-name'
                  type='text'
                  required={true}
                  value={poc && poc['lastName']}
                />
              </div>
            </div>

            <div className='row mt-2'>
              <div className='col-md-6' data-test-id='Contact Title'>

                <InputField
                  name='title'
                  placeholder='Job Title'
                  id='contact-title'
                  type='text'
                  required={true}
                  value={poc && poc['title']}
                />
              </div>
              <div className='col-md-6' data-test-id='Contact Email Address'>

                <InputField
                  name='email'
                  placeholder='Email'
                  id='contact-email'
                  type='email'
                  required={true}
                  value={poc && poc['email']}
                  validation={validateEmail}
                />
              </div>
            </div>

            <div className='row mt-2'>
              <div className='col-md-6' data-test-id='Contact Phone Number'>

                <InputField
                  name='usPhone'
                  placeholder='Phone'
                  id='contact-phone'
                  type='text'
                  required={true}
                  format={formatPhone}
                  value={poc && poc['usPhone']}
                  min={14}
                  
                />
              </div>
              <div className='col-md-6' data-test-id='Contact Fax Number'>
                <InputField
                  name='fax'
                  placeholder='Fax'
                  id='contact-fax'
                  type='text'
                  format={formatPhone}
                  value={poc && poc['fax']}
                  min={14}
                />
              </div>
            </div>

            <fieldset>
              <legend className='sr-only'>
                New Contact Address
                </legend>
              <div className='row mt-2'>
                <div className='col-md-12' data-test-id='Contact Address'>

                  <InputField
                    name='addressLine1'
                    placeholder='Address'
                    id='contact-address'
                    type='text'
                    required={true}
                    value={poc && poc['addressLine1']}
                  />
                </div>
              </div>


              <div className='row mt-2'>
                <div className='col-md-6' data-test-id='Contact City'>

                  <InputField
                    name='city'
                    placeholder='City'
                    id='contact-city'
                    type='text'
                    required={true}
                    value={poc && poc['city']}
                  />
                </div>
                <div className='col-md-4' data-test-id='Contact State'>

                  <SelectField
                    name='stateOrProvinceCode'
                    id='contact-state'
                    required={true}
                    placeholder='State'
                    options={stateOptions}
                    value={poc && poc['stateOrProvinceCode']}
                    defaultValue='State'
                  />
                  {  
                    (poc && poc['stateOrProvinceCode'] && poc['zipCode'] && !validateStateAndZip(poc['stateOrProvinceCode'], poc['zipCode'])) &&
                    <div className='erorr-red mt-1 mb-2'>State and zip do not match</div> 
                  }  
                </div>
                <div className='col-md-2' data-test-id='Contact Zip'>

                  <InputField
                    name='zipCode'
                    placeholder='Zip Code'
                    id='contact-zip'
                    type='text'
                    required={true}
                    mask={zipMask}
                    value={poc && poc['zipCode']}
                  />
                </div>
              </div>
            </fieldset>


            <div className='row mt-3 mb-1'>
              <div className='col-md-12'>
                <button type='submit' className='btn btn-primary px-5 focusable-item'>
                  {isNewCustomPoc ? 'Add New Contact' : 'Save Changes'}
                </button>
              </div>
            </div>
          </main>
        </Modal.Body>
      </form>
    </Modal>
  )
}

AddCustomPoc = reduxForm({
  form: 'mppContact'
})(AddCustomPoc)

export default AddCustomPoc