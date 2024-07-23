import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Information from '../../commonComponents/InformationRow'
import phontFormat from '../../../helpers/formatter/formatPhone'
import './mentorApplication.scss'

const CompanyInformation = () => {

  const companyInfo = useSelector(
    state => state.currentUserInfo
      && state.currentUserInfo.company
      && state.currentUserInfo.company[0])
  const [showdetails, setShowDetails] = useState(false)

  const ShowHide = () => {
    setShowDetails(showdetails === false ? true : false)
  }

  return (
    <div>
      <div className='row mb-5'>
        <div className='col-md-10'>
          <h2 className='reviewer-section-title mentor-application-header col-md-12 p-3'>
            Company Information
          </h2>
        </div>
        <div className='col-md-7' data-test-id='Company and/or Division Name'>
          <div className='' data-test-id='Contact Info'>
            <Information
              label='Company Name'
              detail={companyInfo && companyInfo['legal_business_name']}
            />
            <Information
              label='Address'
              detail={companyInfo && companyInfo['company_address']}
            />
            {/* <Information
              label='Phone'
              detail={companyInfo && phontFormat(companyInfo['company_phone'])}
            /> */}
            <Information
              label='City'
              detail={companyInfo && companyInfo['company_city']}
            />
            <Information
              label='State'
              detail={companyInfo && companyInfo['company_state']}
            />
            <Information
              label='Zip'
              detail={companyInfo && companyInfo['company_zip']}
            />
            {/* <Information
              label='Fax'
              detail={companyInfo && phontFormat(companyInfo['company_fax'])}
            /> */}
            <Information
              label='SAM UEI'
              detail={companyInfo && companyInfo['duns_number']}
            />
            <Information
              label='Cage Code'
              detail={companyInfo && companyInfo['cage_code']}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyInformation