import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import formatPhone from '../../helpers/formatter/formatPhone'
import InputField from '../commonComponents/forms/InputField'
import CompanyInformation from './CompanyInformation'
import PointOfContactChoice from './PointOfContactChoice'
import getUserInfo from './getUserInfo.action'
import saveUserInfo from './saveUserInfo.action'
import getCurrentUserInfo from '../../components/getCurrentUserInfo.action'
import { setUpdatedUserAction, setUserProfileInfoAction } from './UserProfile.action'
import { validatePhoneFormatted } from '../commonComponents/forms/validations/validatePhone'

function UserCompanyProfileTabs({ initialize }) {
  const [userInfoDetals, setUserInfoDetails] = useState(null)
  const [companyInfo, setCompanyInfo] = useState(null);
  const [tabKey, setTabKey] = useState('user_profile')
  const [showUserFirstnameInput, setShowUserFirstnameInput] = useState(false)
  const [showUserLastnameInput, setShowUserLastnameInput] = useState(false)
  const [showUserJobTitleInput, setShowUserJobTtitleInput] = useState(false)
  const [showUserPhoneInput, setShowUserPhoneInput] = useState(false)
  const [companyInformation, setCompanyInformation] = useState()
  const [pointOfContactChoice, setPointOfContactChoice] = useState()
  const [selectedPOC, setSelectedPOC] = useState(null)

  const localStorage = window.localStorage
  const userInfo = JSON.parse(localStorage.getItem('user_info'))
  const accessToken = userInfo && userInfo.token && userInfo.token.access_token
  const userProfile = useSelector(state => state.form && state.form.userProfile && state.form.userProfile.values)

  const dispatch = useDispatch()

  const history = useHistory()

  useEffect(() => {
    initializeUserInfo()
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (companyInfo) {
      const {
        cage_code,
        duns_number,
        legal_business_name,
        naics_codes,
        company_phone,
        company_fax,
        company_address,
        company_city,
        company_state,
        company_zip,
        gov_business_contact_first_name,
        gov_business_contact_last_name,
        gov_business_contact_title,
        gov_business_contact_email,
        gov_business_contact_phone,
        gov_business_contact_fax,
        gov_business_contact_address,
        gov_business_contact_city,
        gov_business_contact_state,
        gov_business_contact_zip,
        electronic_business_contact_first_name,
        electronic_business_contact_last_name,
        electronic_business_contact_title,
        electronic_business_contact_email,
        electronic_business_contact_phone,
        electronic_business_contact_fax,
        electronic_business_contact_address,
        electronic_business_contact_city,
        electronic_business_contact_state,
        electronic_business_contact_zip,
        mpp_contact_first_name,
        mpp_contact_last_name,
        mpp_contact_title,
        mpp_contact_email,
        mpp_contact_phone,
        mpp_contact_fax,
        mpp_contact_address,
        mpp_contact_city,
        mpp_contact_state,
        mpp_contact_zip,
        custom_contact_first_name,
        custom_contact_last_name,
        custom_contact_title,
        custom_contact_email,
        custom_contact_phone,
        custom_contact_fax,
        custom_contact_address,
        custom_contact_city,
        custom_contact_state,
        custom_contact_zip,
        poc_selected
      } = companyInfo

      const companyBusinessAddress = {
        addressLine1: company_address,
        city: company_city,
        stateOrProvinceCode: company_state,
        zipCode: company_zip,
        phone: company_phone,
        fax: company_fax
      }

      const electronicBusinessPOC = {
        firstName: electronic_business_contact_first_name,
        lastName: electronic_business_contact_last_name,
        title: electronic_business_contact_title,
        usPhone: electronic_business_contact_phone,
        fax: electronic_business_contact_fax,
        email: electronic_business_contact_email,
        addressLine1: electronic_business_contact_address,
        city: electronic_business_contact_city,
        stateOrProvinceCode: electronic_business_contact_state,
        zipCode: electronic_business_contact_zip
      }

      const governmentBusinessPOC = {
        firstName: gov_business_contact_first_name,
        lastName: gov_business_contact_last_name,
        title: gov_business_contact_title,
        usPhone: gov_business_contact_phone,
        fax: gov_business_contact_fax,
        email: gov_business_contact_email,
        addressLine1: gov_business_contact_address,
        city: gov_business_contact_city,
        stateOrProvinceCode: gov_business_contact_state,
        zipCode: gov_business_contact_zip
      }

      const customBusinessPOC = {
        firstName: custom_contact_first_name,
        lastName: custom_contact_last_name,
        title: custom_contact_title,
        usPhone: custom_contact_phone,
        fax: custom_contact_fax,
        email: custom_contact_email,
        addressLine1: custom_contact_address,
        city: custom_contact_city,
        stateOrProvinceCode: custom_contact_state,
        zipCode: custom_contact_zip
      }

      const pocInfo = {
        firstName: mpp_contact_first_name,
        lastName: mpp_contact_last_name,
        title: mpp_contact_title,
        email: mpp_contact_email,
        usPhone: mpp_contact_phone,
        fax: mpp_contact_fax,
        addressLine1: mpp_contact_address,
        city: mpp_contact_city,
        stateOrProvinceCode: mpp_contact_state,
        zipCode: mpp_contact_zip
      }

      const samsDataInfo = {
        dunsCode: duns_number,
        cageCode: cage_code
      }

      setCompanyInformation({
        primaryNaics: naics_codes,
        legal_business_name,
        companyBusinessAddress,
        electronicBusinessPOC
      })

      setPointOfContactChoice({
        naics_codes,
        legal_business_name,
        companyBusinessAddress,
        samsDataInfo,
        poc_selected,
        companyInfo,
        pocInfo,
        customBusinessPOC,
        governmentBusinessPOC,
        electronicBusinessPOC
      })
    }
  }, [companyInfo])

  useEffect(() => {
    if (showUserFirstnameInput) {
      document.querySelector('#first-name-2').focus()
    }
  }, [showUserFirstnameInput])

  useEffect(() => {
    if (showUserLastnameInput) {
      document.querySelector('#last-name-2').focus()
    }
  }, [showUserLastnameInput])

  useEffect(() => {
    if (showUserJobTitleInput) {
      document.querySelector('#user-title-2').focus()
    }
  }, [showUserJobTitleInput])

  useEffect(() => {
    if (showUserPhoneInput) {
      document.querySelector('#user-phone-2').focus()
    }
  }, [showUserPhoneInput])

  const initializeUserInfo = async () => {
    const userDetails = await getUserInfo(accessToken)
    const { status, apiData } = userDetails
    if (status === 401) {
      localStorage.removeItem('user_info')
      localStorage.removeItem('login_time')
      localStorage.removeItem('session_time')
      localStorage.removeItem('logged_in')
      history.push('/')
    }
    setCompanyInfo(apiData.company && apiData.company[0])
    SetUserInfoDetails(apiData)
    initialize({
      first_name: apiData.first_name,
      last_name: apiData.last_name,
      title: apiData.title,
      phone: apiData.phone
    })
  }

  const SetUserInfoDetails = (userDetails) => {
    setUserInfoDetails(userDetails)
  }

  const setUserInfoItem = async userInfoItemStateHook => {
    const updatedUser = await setUserInfo()
    updatedUser && userInfoItemStateHook(false)
  }

  const cancelUserInfoItem = (userInfoProperty, userInfoItemStateHook) => {
    userProfile[userInfoProperty] = userInfoProperty == 'phone' ? formatPhone(userInfoDetals[userInfoProperty]) : userInfoDetals[userInfoProperty]
    userInfoItemStateHook(false)
  }

  const setUserInfo = async () => {
    if (!userProfile) { return }

    const { first_name, last_name, phone, title } = userProfile
    /** 
     * NOTE: Ideally this should only check for validatePhoneFormatted, not len 10/12, 
     * but converting may break existing profiles with differently formatted phone numbers 
     * */
    const validateUserInfo = first_name && last_name && phone && (phone.length === 10 || phone.length === 12 || validatePhoneFormatted(phone)) && title
    const updatedUser = validateUserInfo && await saveUserInfo(first_name, last_name, phone, title)

    if (updatedUser) {
      const { status } = updatedUser

      if (status === 401) {
        localStorage.removeItem('user_info')
        localStorage.removeItem('login_time')
        localStorage.removeItem('session_time')
        localStorage.removeItem('logged_in')
        history.push('/')
      }

      await dispatch(getCurrentUserInfo(accessToken))
      dispatch(setUpdatedUserAction(updatedUser))
      dispatch(setUserProfileInfoAction(userInfoDetals))

      return updatedUser
    }
  }

  return (
    <div className='container-fluid m-0 p-0'>
      <div className="row">
        <div className="col-md-12 p-0 px-5 my-3">
          <h1 className="font-weight-bold m-0">Profile</h1>
        </div>
      </div>
      <div className='row'>
        <main id='main' className='col-md-8 ml-3 mt-3 user-company-profile-tabs'>
          <Tabs
            id='user-and-company-profile-tabs-id'
            activeKey={tabKey}
            onSelect={(key) => setTabKey(key)}
          >
            <Tab
              eventKey='user_profile'
              title='User Profile'
              tabClassName={tabKey === 'user_profile' ? 'tab-Item' : ''}
            >
              <div className='row'>
                <div className='col-md-12'>
                  <h2 className='font-weight-bold'>User Profile</h2>
                </div>
              </div>
              <div className='row ml-0 mb-5'>
                <table className='col-md-9'>
                  <thead>
                    <tr className='sr-only row'>
                      <th className="col-md-3">
                        User Item
                      </th>
                      <th className="col-md-5">
                        User Data
                      </th>
                      <th className="col-md-3">
                        User Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='row mt-3 pb-3 user-profile-tab-content-info'>
                      <td className='col-md-3 pl-0 font-weight-bold d-flex align-items-center'>
                        First Name
                      </td>
                      <td className='col-md-5 pl-0'>
                        {!showUserFirstnameInput &&
                          userProfile &&
                          userProfile['first_name']}
                        {showUserFirstnameInput && (
                          <>

                            <InputField
                              name='first_name'
                              placeholder='First Name'
                              isLabelHidden={true}
                              id='first-name-2'
                              required={true}
                              value={userProfile && userProfile['first_name']}
                              type='text'
                              className='form-control input-text-border'
                            />
                          </>
                        )}
                      </td>
                      <td className='col-md-3 p-0 d-flex align-items-center justify-content-end'>
                        {!showUserFirstnameInput && (
                          <a
                            className='change-item focusable-item'
                            href='#'
                            onClick={(e) => {
                              e.preventDefault();
                              return setShowUserFirstnameInput(true);
                            }}
                          >
                            Change
                          </a>
                        )}
                        {showUserFirstnameInput && (
                          <div className="mt-2">
                            <button
                              type='button'
                              className='btn btn-primary px-3 focusable-item'
                              onClick={() =>
                                setUserInfoItem(setShowUserFirstnameInput)
                              }
                            >
                              Save
                            </button>
                            <button
                              type='button'
                              className='btn btn-secondary ml-3 focusable-item'
                              onClick={() =>
                                cancelUserInfoItem(
                                  'first_name',
                                  setShowUserFirstnameInput
                                )
                              }
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr className='row mt-3 pb-3 user-profile-tab-content-info'>
                      <td className='col-md-3 pl-0 font-weight-bold d-flex align-items-center'>
                        Last Name
                      </td>
                      <td className='col-md-5 pl-0'>
                        {!showUserLastnameInput &&
                          userProfile &&
                          userProfile['last_name']}
                        {showUserLastnameInput && (
                          <>

                            <InputField
                              name='last_name'
                              placeholder='Last Name'
                              isLabelHidden={true}
                              id='last-name-2'
                              required={true}
                              value={userProfile && userProfile['last_name']}
                              type='text'
                              className='form-control input-text-border'
                            />
                          </>
                        )}
                      </td>
                      <td className='col-md-3 p-0 d-flex align-items-center justify-content-end'>
                        {!showUserLastnameInput && (
                          <a
                            className='change-item focusable-item'
                            href='#'
                            onClick={(e) => {
                              e.preventDefault();
                              return setShowUserLastnameInput(true);
                            }}
                          >
                            Change
                          </a>
                        )}
                        {showUserLastnameInput && (
                          <div className="mt-2">
                            <button
                              type='button'
                              className='btn btn-primary px-3 focusable-item'
                              onClick={() =>
                                setUserInfoItem(setShowUserLastnameInput)
                              }
                            >
                              Save
                            </button>
                            <button
                              type='button'
                              className='btn btn-secondary ml-3 focusable-item'
                              onClick={() =>
                                cancelUserInfoItem(
                                  'last_name',
                                  setShowUserLastnameInput
                                )
                              }
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr className='row mt-3 pb-3 user-profile-tab-content-info'>
                      <td className='col-md-3 pl-0 font-weight-bold d-flex align-items-center'>
                        Job Title
                      </td>
                      <td className='col-md-5 pl-0'>
                        {!showUserJobTitleInput &&
                          userProfile &&
                          userProfile['title']}
                        {showUserJobTitleInput && (
                          <>

                            <InputField
                              name='title'
                              placeholder='Job Title'
                              isLabelHidden={true}
                              id='user-title-2'
                              required={true}
                              value={userProfile && userProfile['title']}
                              type='text'
                              className='form-control input-text-border'
                            />
                          </>
                        )}
                      </td>
                      <td className='col-md-3 p-0 d-flex align-items-center justify-content-end'>
                        {!showUserJobTitleInput && (
                          <a
                            className='change-item focusable-item'
                            href='#'
                            onClick={(e) => {
                              e.preventDefault();
                              return setShowUserJobTtitleInput(true);
                            }}
                          >
                            Change
                          </a>
                        )}
                        {showUserJobTitleInput && (
                          <div className="mt-2">
                            <button
                              type='button'
                              className='btn btn-primary px-3 focusable-item'
                              onClick={() =>
                                setUserInfoItem(setShowUserJobTtitleInput)
                              }
                            >
                              Save
                            </button>
                            <button
                              type='button'
                              className='btn btn-secondary ml-3 focusable-item'
                              onClick={() =>
                                cancelUserInfoItem(
                                  'title',
                                  setShowUserJobTtitleInput
                                )
                              }
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr className='row mt-3 pb-3 user-profile-tab-content-info'>
                      <td className='col-md-3 pl-0 font-weight-bold d-flex align-items-center'>
                        Phone
                      </td>
                      <td className='col-md-5 pl-0'>
                        {!showUserPhoneInput &&
                          userProfile &&
                          formatPhone(userProfile['phone'])}
                        {showUserPhoneInput && (
                          <>

                            <InputField
                              name='phone'
                              placeholder='Phone'
                              isLabelHidden={true}
                              id='user-phone-2'
                              required={true}
                              format={formatPhone}
                              value={userProfile && userProfile['phone']}
                              type='text'
                              className='form-control input-text-border'
                              min={12}
                            />
                          </>
                        )}
                      </td>
                      <td className='col-md-3 p-0 d-flex align-items-center justify-content-end'>
                        {!showUserPhoneInput && (
                          <a
                            className='change-item focusable-item'
                            href='#'
                            onClick={(e) => {
                              e.preventDefault();
                              return setShowUserPhoneInput(true);
                            }}
                          >
                            Change
                          </a>
                        )}
                        {showUserPhoneInput && (
                          <div className="mt-2">
                            <button
                              type='button'
                              className='btn btn-primary px-3 focusable-item'
                              onClick={() =>
                                setUserInfoItem(setShowUserPhoneInput)
                              }
                            >
                              Save
                            </button>
                            <button
                              type='button'
                              className='btn btn-secondary ml-3 focusable-item'
                              onClick={() =>
                                cancelUserInfoItem(
                                  'phone',
                                  setShowUserPhoneInput
                                )
                              }
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr className='row mt-3 pb-3'>
                      <td className='col-md-3 pl-0 font-weight-bold'>
                        Email
                      </td>
                      <td className='col-md-5 pl-0'>
                        {userInfoDetals && userInfoDetals.email}
                      </td>
                      <td className='col-md-3 p-0 text-right'>
                        Not Editable
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Tab>
            <Tab
              eventKey='company_profile'
              title='Company Profile'
              tabClassName={tabKey === 'company_profile' ? 'tab-Item' : ''}
            >
              <div className='row'>
                <div className='col-md-12'>
                  <h2 className='font-weight-bold'>Company Profile</h2>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-9 p-0 mt-3 mb-5'>
                  {companyInformation && (
                    <CompanyInformation
                      primaryNaics={companyInformation.primaryNaics}
                      companyName={companyInformation.legal_business_name}
                      physicalAddress={
                        companyInformation.companyBusinessAddress
                      }
                      electronicBusinessPOCDetails={
                        companyInformation.electronicBusinessPOC
                      }
                    />
                  )}
                </div>
              </div>
            </Tab>
            <Tab
              eventKey='company_contacts'
              title='Company Contacts'
              tabClassName={tabKey === 'company_contacts' ? 'tab-Item' : ''}
            >
              <div className='row'>
                <div className='col-md-12'>
                  <h2 className='font-weight-bold'>Company Contacts</h2>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12 mt-3 mb-5'>
                  {pointOfContactChoice && (
                    <PointOfContactChoice
                      pocInfo={pointOfContactChoice.pocInfo}
                      samsDataInfo={pointOfContactChoice.samsDataInfo}
                      primaryNaics={pointOfContactChoice.naics_codes}
                      setSelectedPOC={setSelectedPOC}
                      selectedPOC={pointOfContactChoice.poc_selected}
                      userProfileCompany={pointOfContactChoice.companyInfo}
                      companyBusinessName={
                        pointOfContactChoice.legal_business_name
                      }
                      companyBusinessAddress={
                        pointOfContactChoice.companyBusinessAddress
                      }
                      customBusinessPOC={
                        pointOfContactChoice.customBusinessPOC
                      }
                      governmentBusinessPOC={
                        pointOfContactChoice.governmentBusinessPOC
                      }
                      electronicBusinessPOC={
                        pointOfContactChoice.electronicBusinessPOC
                      }
                      isCompanyProfileInformationHidden={true}
                      disableEmailAndPhoneEditing={true}
                    />
                  )}
                </div>
              </div>
            </Tab>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

UserCompanyProfileTabs = reduxForm({
  enableReinitialize: true,
  form: 'userProfile'
})(UserCompanyProfileTabs)

export default UserCompanyProfileTabs