import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Information from '../../commonComponents/InformationRow'
import POCEditModal from '../../protegeAgreement/PocEditModal'
import phontFormat from '../../../helpers/formatter/formatPhone'

const ContactInformation = ({mentorApp}) => {

  const [showPocEditModal, setShowPocEditModal] = useState(false)

  const contactInfo = useSelector(
    state => state.currentUserInfo
      && state.currentUserInfo.company
      && state.currentUserInfo.company[0])

  const showModal = () => {
    setShowPocEditModal(!showPocEditModal)
  }

  return (
    <>
      <div className='row mb-2'>
        <div className='col-md-10'>
          <h2 className='reviewer-section-title mentor-application-header col-md-12 p-3'>
            Contact Information
          </h2>
        </div>
        <div className='col-md-7'>
          <div className='' data-test-id='Contact Info'>
            <Information
              label='First Name'
              detail={contactInfo && contactInfo['mpp_contact_first_name']}
            />
            <Information
              label='Last Name'
              detail={contactInfo && contactInfo['mpp_contact_last_name']}
            />
            {/* <Information
              label='Title'
              detail={contactInfo && contactInfo['mpp_contact_title']}
            /> */}
            <Information
              label='Email'
              detail={contactInfo && contactInfo['mpp_contact_email']}
            />
            <Information
              label='Phone'
              detail={contactInfo && phontFormat(contactInfo['mpp_contact_phone'])}
            />
            <Information
              label='Address'
              detail={contactInfo && contactInfo['mpp_contact_address']}
            />
            <Information
              label='City'
              detail={contactInfo && contactInfo['mpp_contact_city']}
            />
            <Information
              label='State'
              detail={contactInfo && contactInfo['mpp_contact_state']}
            />
            <Information
              label='Zip'
              detail={contactInfo && contactInfo['mpp_contact_zip']}
            />
          </div>
        </div>
        <div className="col-md-12 mt-4 mb-4">
          <button
            type='button'
            className='btn button-border float-left focusable-item'
            onClick={showModal}
          >
            Edit Contact Information
          </button>
        </div>
      </div>
      <POCEditModal
        showModal={showPocEditModal}
        handleModal={showModal}
        contactInfo={contactInfo}
      />
    </>
  )
}

export default ContactInformation