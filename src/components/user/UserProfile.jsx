import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import InputField from '../commonComponents/forms/InputField'
import { reduxForm } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux'
import formatPhone from '../../helpers/formatter/formatPhone'
import getUserInfo from './getUserInfo.action'
import saveUserInfo from './saveUserInfo.action'
import getCurrentUserInfo from '../../components/getCurrentUserInfo.action'
import { setUpdatedUserAction, setUserProfileInfoAction } from './UserProfile.action'
import './userProfile.scss'
import { validatePhoneFormatted } from '../commonComponents/forms/validations/validatePhone'

function UserProfile({ handleSubmit, initialize }) {
  const [userInfoDetails, setUserInfoDetails] = useState(null)
  const [companyInfo, setCompanyInfo] = useState(null);
  const [isUserProfileFormEditable, setIsUserProfileFormEditable] = useState(false);
  const [canEditUserProfile, setCanEditUserProfile] = useState(false)
  const localStorage = window.localStorage
  const userInfo = JSON.parse(localStorage.getItem('user_info'))
  const accessToken = userInfo && userInfo.token && userInfo.token.access_token
  const userProfile = useSelector(state => state.form && state.form.userProfile && state.form.userProfile.values)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    userInfo && userInfo.active === false && changeRoute('/inactiveUser')
    initializeUserInfo()
    setLoggedIn()
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const localStorage = window.localStorage
    const userInfoFromStorage = JSON.parse(localStorage.getItem('user_info'))
    !userInfoFromStorage && history.push('/')
  }, [])

  useEffect(() => {
    if (userInfoDetails) {
      const isUserInfoAvaliable = userInfoDetails && userInfoDetails['first_name'] && userInfoDetails['last_name'] && userInfoDetails['title'] && userInfoDetails['phone'] ? true : false
      const isCompanyInfoAvailable = companyInfo ? true : false;
      const isBothUserInfoAndCompanyInfoAvaliable = isCompanyInfoAvailable && isUserInfoAvaliable ? true : false
      if (isBothUserInfoAndCompanyInfoAvaliable) {
        changeRoute('/userCompanyProfile')
      }
    }
  }, [userInfoDetails, companyInfo])

  useEffect(() => {
    if (userInfoDetails && !canEditUserProfile) {
      const { first_name, last_name, title, phone } = userInfoDetails
      initialize({ first_name, last_name, title, phone })
    }
  }, [canEditUserProfile])

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
    setUserInfoDetails(apiData)
    initialize({
      first_name: apiData.first_name,
      last_name: apiData.last_name,
      title: apiData.title,
      phone: apiData.phone
    })
  }
  const setLoggedIn = () => {
    localStorage.setItem('logged_in', true)
  }

  const changeRoute = (route) => {
    history.push(route)
  }

  const validateUserProfileEntry = () => {
    if (!userProfile) return false 
    const { first_name, last_name, phone, title } = userProfile
    return first_name && last_name && phone && validatePhoneFormatted(phone) && title
  }

  const updateUserInfo = async () => {
    if (!userProfile) { return }
    const { first_name, last_name, phone, title } = userProfile
    const updatedUser = await saveUserInfo(first_name, last_name, phone, title)
    if (updatedUser) {
      await dispatch(getCurrentUserInfo(accessToken))
      const { status } = updatedUser
      if (status === 401) {
        localStorage.removeItem('user_info')
        localStorage.removeItem('login_time')
        localStorage.removeItem('session_time')
        localStorage.removeItem('logged_in')
        history.push('/')
      }
      dispatch(setUpdatedUserAction(updatedUser))
      dispatch(setUserProfileInfoAction(userInfoDetails))
      setCanEditUserProfile(false);
      status === 200 && (userInfoDetails && userInfoDetails.role_title == 'Admin') ? changeRoute('/reviewerDashboard') : changeRoute('/companyProfile')
    }
  }

  return (
    <div className='container-fluid m-0 p-0'>
      <form onSubmit={handleSubmit(updateUserInfo)}>
        <main id='main' className='user-content-container'>
          <div className='row'>
            <div className='col-md-9'>
              <div className='row mt-4 mb-4 pl-3'>
                <div className='reviewer-section-title section-heading col-md-12'>
                  <h1 className="mb-0 section-heading-font">User Profile</h1>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12 mb-4'>
                  <p className='mb-0 text-font-size'>
                    Start by telling us who you are:
                  </p>
                </div>
              </div>
              <div id='user-profile-form' className='row'>
                <div className='col-md-6' data-test-id='First Name'>

                  <InputField
                    name='first_name'
                    placeholder='First Name'
                    id='first-name'
                    required={true}
                    value={userProfile && userProfile['first_name']}
                    type='text'
                    className='form-control input-text-border'
                    readOnly={
                      !canEditUserProfile &&
                      userInfoDetails &&
                      userInfoDetails['first_name'] &&
                      isUserProfileFormEditable
                    }
                  />
                </div>
                <div className='col-md-6' data-test-id='Last Name'>

                  <InputField
                    name='last_name'
                    placeholder='Last Name'
                    id='last-name'
                    required={true}
                    value={userProfile && userProfile['last_name']}
                    type='text'
                    className='form-control input-text-border'
                    readOnly={
                      !canEditUserProfile &&
                      userInfoDetails &&
                      userInfoDetails['last_name'] &&
                      isUserProfileFormEditable
                    }
                  />
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col-md-6' data-test-id='Company Address'>

                  <InputField
                    name='title'
                    placeholder='Job Title'
                    id='user-title'
                    required={true}
                    value={userProfile && userProfile['title']}
                    type='text'
                    className='form-control input-text-border'
                    readOnly={
                      !canEditUserProfile &&
                      userInfoDetails &&
                      userInfoDetails['title'] &&
                      isUserProfileFormEditable
                    }
                  />
                </div>
                <div className='col-md-6' data-test-id='Company Phone Number'>

                  <InputField
                    name='phone'
                    placeholder='Phone'
                    id='user-phone'
                    required={true}
                    format={formatPhone}
                    value={userProfile && formatPhone(userProfile['phone'])}
                    type='text'
                    className='form-control input-text-border'
                    readOnly={
                      !canEditUserProfile &&
                      userInfoDetails &&
                      userInfoDetails['phone'] &&
                      isUserProfileFormEditable
                    }
                    maxlength={14}
                  />
                </div>
              </div>

              <div className='row mt-2'>
                <div className='col-md-6' data-test-id='Email'>

                  <InputField
                    name='user_email'
                    placeholder='Email'
                    id='user-email'
                    required={true}
                    value={
                      (userInfo && userInfo.email) ||
                      (userInfoDetails && userInfoDetails.email)
                    }
                    type='email'
                    min={10}
                    className='form-control input-text-border'
                    readOnly={true}
                  />
                </div>
              </div>
              <div className='row mt-4'>
                <div className='col-md-12'>
                  <button
                    type='submit'
                    disabled={!validateUserProfileEntry()}
                    aria-disabled={!validateUserProfileEntry()}
                    className='btn btn-md btn-primary mt-3 px-5 btn-next focusable-item'
                  >
                    {canEditUserProfile || !isUserProfileFormEditable
                      ? 'Save and Continue'
                      : 'Next'}
                  </button>
                </div>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='mt-4'>
              </div>
            </div>
          </div>
        </main>
      </form>
    </div>
  )
}


UserProfile = reduxForm({
  enableReinitialize: true,
  form: 'userProfile'
})(UserProfile)

export default UserProfile


