import React, { useState, useEffect, useRef } from 'react'
// import PointOfContact from './PointOfContact'
import AddCustomPoc from './AddCustomPoc'
import CompanyInformation from './CompanyInformation'
import { useDispatch } from 'react-redux'
import { reduxForm } from 'redux-form'
import { useHistory } from 'react-router-dom'
import { saveCompanyInfo } from './saveCompanyInfo.action'
import { updateCompanyInfo } from './updateCompanyInfo.action'
import getUserInfo from './getUserInfo.action'
import getCurrentUserInfo from '../../components/getCurrentUserInfo.action'
import formatPhone from '../../helpers/formatter/formatPhone'
import getStates from '../mentor/mentorApplication/getStates.action'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { keydownHandler } from '../commonComponents/utility'
import info24 from '../../assets/images/info-24px.png'

import './pointOfContactChoice.scss'
import { TextField } from '@material-ui/core'
import validatePhone, { validatePhoneFormatted } from '../commonComponents/forms/validations/validatePhone'
import validateEmail from '../commonComponents/forms/validations/validateEmail'

function FormatPOC(
  { pocId,
    poc,
    setPoc,
    canEditPhoneAndEmail = false,
    stateCheckedValue,
    stateCheckedHandler,
    pocInfo
  }) {

  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (stateCheckedValue) {
      setPhone(pocInfo?.usPhone)
      onEditPhone(pocInfo?.usPhone)
      setEmail(pocInfo?.email)
      onEditEmail(pocInfo?.email)
    }
  }, [pocInfo, stateCheckedValue])

  const na = ['Not Available', '(Not Available)']
  const addressLine1 = poc.addressLine1 && !na.includes(poc.addressLine1)
    ? poc.addressLine1 : '';
  const city = poc.city && !na.includes(poc.city)
    ? poc.city : '';
  const state = poc.stateOrProvinceCode && !na.includes(poc.stateOrProvinceCode)
    ? poc.stateOrProvinceCode : '';
  const zip = poc.zipCode && poc.zipCode !== '0' ? poc.zipCode : '';
  const address = !addressLine1 && !city && !state && !zip
    ? '(Not Available)' : `${addressLine1}${city && ` ${city}`}${state && ` ${state}`}${zip && `, ${zip}`}`;

  const editableEmailValue = (label, value) =>
    <TextField
      error={stateCheckedValue && !validateEmail(email)}
      label={label}
      variant="outlined"
      margin="dense"
      type="phone"
      value={value}
      onChange={(event) => {
        setEmail(event.target.value);
        onEditEmail(event.target.value);
      }}
    />

  const editablePhoneValueField = (label, value) =>
    <TextField
      error={stateCheckedValue && !validatePhoneFormatted(phone)}
      label={label}
      variant="outlined"
      margin="dense"
      type="phone"
      value={value}
      InputProps={{
        inputMode: 'numeric', // Allow only numeric input
      }}
      onChange={(event) => {
        const formattedValue = formatPhone(event.target.value);
        setPhone(formattedValue);
        onEditPhone(formattedValue);
      }}
    />

  const onEditPhone = (phone) => {
    setPoc && setPoc(poc => {
      const updatedPoce = { ...poc, usPhone: phone }
      if (stateCheckedValue) stateCheckedHandler({ updatedPoce })
      return updatedPoce
    })
  }

  const onEditEmail = (email) => {
    setPoc && setPoc(poc => {
      const updatedPoc = { ...poc, email: email }
      if (stateCheckedValue) stateCheckedHandler({ updatedPoc })
      return updatedPoc
    })
  }

  return !poc ? null : (
    <div id={pocId}>
      {/* <p className='title mb-1'><strong>Title: </strong>{poc.title && !na.includes(poc.title) ? poc.title : '(Not Available)'}</p> */}
      <div className='mb-1'><strong>Name: </strong>{`${poc.firstName} ${poc.lastName}`}</div>
      <div className='mb-1'><strong>Address: </strong>{address}</div>
      <div className='mb-1'><strong>Email: </strong>{!canEditPhoneAndEmail && `${poc.email}`}</div>{canEditPhoneAndEmail && editableEmailValue('email', email)}
      <div className='mb-1'><strong>Phone: </strong>{!canEditPhoneAndEmail && `${formatPhone(poc.usPhone)}`}</div>{canEditPhoneAndEmail && editablePhoneValueField('phone', phone)}
      {/* {poc.fax && <p className='m-0'><strong>Fax: </strong>{formatPhone(poc.fax) || '(Not Available)'}</p>} */}
    </div>
  )
}

function PointOfContactChoice({
  userProfileCompany,
  companyBusinessName,
  companyBusinessAddress,
  governmentBusinessPOC,
  setGovernmentBusinessPOC,
  electronicBusinessPOC,
  setElectronicBusinessPOC,
  customBusinessPOC,
  selectedPOC,
  setSelectedPOC,
  pocInfo,
  primaryNaics,
  samsDataInfo,
  isFromNonUserProfile,
  isCompanyProfileInformationHidden,
  companyContactMsg,
  selectedPointOfContactHandler,
  handleModal,
  disableEmailAndPhoneEditing = false,
  setCustomBusinessPOC,
  contactInfo,
  userProfileInfo
}) {

  const history = useHistory()
  const dispatch = useDispatch()
  const localStorage = window.localStorage
  const userInfo = JSON.parse(localStorage.getItem('user_info'))
  const accessToken = userInfo && userInfo.token && userInfo.token.access_token
  const redirectToAgreement = JSON.parse(
    localStorage.getItem('routeToAgreement')
  )

  const pocData = useRef({})
  const pocSelected = useRef()
  const isCustomBusinessPocAddedRef = useRef(false)
  const isNewPocSelectionRef = useRef(false)
  const statesRef = useRef()

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true)
  const [isEmailAndPhoneValid, setIsEmailAndPhoneValid] = useState(true)
  const [
    isGovernmentBusinessSelected,
    setIsGovernmentBusinessSelected,
  ] = useState(false)
  const [
    isElectronicBusinessSelected,
    setIsElectronicBusinessSelected,
  ] = useState(false)
  const [isCustomBusinessSelected, setIsCustomBusinessSelected] = useState(
    false
  )
  const [customBusinessPoc, setCustomBusinessPoc] = useState(null)
  const [showCustomPocModal, setShowCustomPocModal] = useState(false)
  const [showAddContactBtn, setShowAddContactBtn] = useState(true)
  const [showPocSelectedError, setShowPocSelectedError] = useState(false)
  const [showSaveButtons, setShowSaveButtons] = useState(isCompanyProfileInformationHidden)
  const [isNewChangesSaved, setIsNewChangesSaved] = useState(false)
  const currentPath = window.location.pathname

  /** Handle updating the valid phone and email field as the poc selection changes  */
  useEffect(() => {
    if (isGovernmentBusinessSelected) {
      governmentBusinessPOC?.email && governmentBusinessPOC?.usPhone && setIsEmailAndPhoneValid(validateEmail(governmentBusinessPOC?.email) && validatePhone({ phone: governmentBusinessPOC?.usPhone}))
    } else if (isElectronicBusinessSelected) {
      electronicBusinessPOC?.email && electronicBusinessPOC?.usPhone && setIsEmailAndPhoneValid(validateEmail(electronicBusinessPOC?.email) && validatePhone({ phone: electronicBusinessPOC?.usPhone }))
    } else {
      customBusinessPoc?.email && customBusinessPoc?.usPhone && setIsEmailAndPhoneValid(validateEmail(customBusinessPoc?.email) && validatePhone({ phone: customBusinessPoc?.usPhone}))
    }
  }, [selectedPOC, isGovernmentBusinessSelected, isElectronicBusinessSelected, isCustomBusinessSelected, governmentBusinessPOC, electronicBusinessPOC, customBusinessPOC, customBusinessPoc])

  useEffect(() => {
    if (pocInfo) {
      initializePointOfContact(pocInfo)
      setIsSaveButtonDisabled(false)
    }

    if (selectedPOC) {
      switch (selectedPOC) {
        case 'government_poc':
          setIsGovernmentBusinessSelected(true)
          break
        case 'electronic_poc':
          setIsElectronicBusinessSelected(true)
          break
        case 'mpp_poc':
          setIsCustomBusinessSelected(true)
          break
      }

      pocSelected.current = selectedPOC
    }

    // if (customBusinessPOC && selectedPOC === "mpp_poc") {
    //   const isAllCustomBusinessPocValuesDefined = Object.values(
    //     customBusinessPOC
    //   ).every((item) => item != null && item != undefined)
    //   if (isAllCustomBusinessPocValuesDefined) {
    //     setCustomBusinessPoc(customBusinessPOC)
    //     setShowAddContactBtn(false)
    //   }
    // }

    getStateForPoc()
  }, [])

  const getStateForPoc = async () => {
    const states = await getStates()
    statesRef.current = states.map(({ abbreviation }) => ({ abbreviation }))
  }

  const selectPointOfContact = ({ poc }) => {
    initializePointOfContact(poc)
    setIsSaveButtonDisabled(false)
    setShowPocSelectedError(false)
    selectedPointOfContactHandler && selectedPointOfContactHandler(poc)
  }

  const selectGovernmentBusinessPOC = ({ poc }) => {
    setIsGovernmentBusinessSelected(true)
    setIsElectronicBusinessSelected(false)
    setIsCustomBusinessSelected(false)
    selectPointOfContact({ poc })

    if (customBusinessPoc && isCustomBusinessPocAddedRef.current) {
      setShowSaveButtons(false)
    }
    else if (isCompanyProfileInformationHidden === true) {
      selectedPOC === 'government_poc' && !isCustomBusinessPocAddedRef.current ? setShowSaveButtons(true) : setShowSaveButtons(false)
      isNewPocSelectionRef.current = (selectedPOC !== 'government_poc')
    }

    pocSelected.current = 'government_poc'
  }

  const selectElectronicBusinessPOC = ({ poc }) => {
    setIsGovernmentBusinessSelected(false)
    setIsElectronicBusinessSelected(true)
    setIsCustomBusinessSelected(false)
    selectPointOfContact({ poc })

    if (customBusinessPoc && isCustomBusinessPocAddedRef.current) {
      setShowSaveButtons(false)
    }
    else if (isCompanyProfileInformationHidden === true) {
      selectedPOC === 'electronic_poc' && !isCustomBusinessPocAddedRef.current ? setShowSaveButtons(true) : setShowSaveButtons(false)
      isNewPocSelectionRef.current = (selectedPOC !== 'electronic_poc')
    }

    pocSelected.current = 'electronic_poc'
  }

  const selectCustomBusinessPOC = ({ poc }) => {
    setIsGovernmentBusinessSelected(false)
    setIsElectronicBusinessSelected(false)
    setIsCustomBusinessSelected(true)
    setCustomBusinessPoc(poc)
    selectPointOfContact({ poc })
    setSelectedPOC('mpp_poc')

    if (customBusinessPoc && isCustomBusinessPocAddedRef.current) {
      setShowSaveButtons(false)
    }
    else if (isCompanyProfileInformationHidden === true) {
      selectedPOC === 'mpp_poc' && !isCustomBusinessPocAddedRef.current ? setShowSaveButtons(true) : setShowSaveButtons(false)
      isNewPocSelectionRef.current = (selectedPOC !== 'mpp_poc')
    }

    pocSelected.current = 'mpp_poc'
  }

  const initializePointOfContact = (poc) => {
    pocData.current.contact_first_name = poc.firstName
    pocData.current.contact_last_name = poc.lastName
    pocData.current.contact_title = poc.title
    pocData.current.contact_email = poc.email
    pocData.current.contact_phone = poc.usPhone
    pocData.current.contact_fax = poc.fax
    pocData.current.contact_address = `${poc.addressLine1}`
    pocData.current.contact_city = poc.city
    pocData.current.contact_state = poc.stateOrProvinceCode
    pocData.current.contact_zip = poc.zipCode
  }

  const removeCustomMppPoc = (setContactPOC = () => {}) => {
    isNewPocSelectionRef.current = false
    changeAddCustomBusinessPocRef(false)
    setShowCustomPocModal(false)
    setShowAddContactBtn(true)
    setCustomBusinessPoc(null)

    if (pocSelected.current == 'mpp_poc') {
      pocSelected.current = null
      setIsSaveButtonDisabled(true)
      setIsCustomBusinessSelected(false)
      setCustomBusinessPOC(null)
      setContactPOC(null)
      customBusinessPOC = null
      contactInfo.poc_selected = null
      setSelectedPOC(null)
      userProfileInfo.company[0] = {
        ...userProfileInfo.company[0],
        custom_contact_first_name: null,
        custom_contact_last_name: null,
        custom_contact_title: null,
        custom_contact_phone: null,
        custom_contact_fax: null,
        custom_contact_email: null,
        custom_contact_address: null,
        custom_contact_city: null,
        custom_contact_state: null,
        custom_contact_zip: null,
      }
    }
  }

  const addCustomMppPoc = () => {
    setShowCustomPocModal(true)
    setShowAddContactBtn(false)
  }

  const hideCustomModal = () => {
    setShowCustomPocModal(false)
    if (!customBusinessPoc) {
      setShowAddContactBtn(true);
    } else {
      setShowAddContactBtn(false);
    }
  }

  const changeRoute = (route) => {
    history.push(route)
  }

  const changeAddCustomBusinessPocRef = newRefStatus => {
    isCustomBusinessPocAddedRef.current = isCompanyProfileInformationHidden && newRefStatus
  }

  const chooseDashboard = (currentUserInfo) => {
    if (currentUserInfo && currentUserInfo.role_title === 'Admin') {
      currentUserInfo.active
        ? changeRoute('/reviewerDashboard')
        : changeRoute('/inactiveUser')
    } else if (currentPath === '/userCompanyProfile') {
      changeRoute('/dashboard')
    } else {
      handleModal()
    }
  }

  const redirectToHomePage = (status) => {
    if (status === 401) {
      localStorage.removeItem('user_info')
      localStorage.removeItem('login_time')
      localStorage.removeItem('session_time')
      localStorage.removeItem('logged_in')
      history.push('/')
    }
  }

  const submitPOC = async () => {
    let pocCompanyInfoResponse

    if (!pocSelected.current) {
      setShowPocSelectedError(true)
      return
    }

    if (!userProfileCompany) {
      const { dunsCode, cageCode } = samsDataInfo

      const {
        addressLine1,
        city,
        stateOrProvinceCode,
        zipCode,
      } = companyBusinessAddress

      const payload = {
        legal_business_name: companyBusinessName,
        cage_code: cageCode,
        duns_number: dunsCode,
        naics_codes: primaryNaics,
        company_phone: electronicBusinessPOC.usPhone || '(Not Available)',
        company_fax: electronicBusinessPOC.fax || 0,
        company_address: addressLine1,
        company_city: city,
        company_state: stateOrProvinceCode,
        company_zip: zipCode,
        gov_business_contact_first_name: governmentBusinessPOC.firstName,
        gov_business_contact_last_name: governmentBusinessPOC.lastName,
        gov_business_contact_title: governmentBusinessPOC.title || '(Not Available)',
        gov_business_contact_email: governmentBusinessPOC.email || '(Not Available)',
        gov_business_contact_phone: governmentBusinessPOC.usPhone,
        gov_business_contact_fax: governmentBusinessPOC.fax || '(Not Available)',
        gov_business_contact_address: governmentBusinessPOC.addressLine1 || '(Not Available)',
        gov_business_contact_city: governmentBusinessPOC.city || '(Not Available)',
        gov_business_contact_state: governmentBusinessPOC.stateOrProvinceCode || '(Not Available)',
        gov_business_contact_zip: governmentBusinessPOC.zipCode || 0,
        electronic_business_contact_first_name: electronicBusinessPOC.firstName,
        electronic_business_contact_last_name: electronicBusinessPOC.lastName,
        electronic_business_contact_title: electronicBusinessPOC.title || '(Not Available)',
        electronic_business_contact_email: electronicBusinessPOC.email || '(Not Available)',
        electronic_business_contact_phone: electronicBusinessPOC.usPhone || '(Not Available)',
        electronic_business_contact_fax: electronicBusinessPOC.fax || '(Not Available)',
        electronic_business_contact_address: electronicBusinessPOC.addressLine1,
        electronic_business_contact_city: electronicBusinessPOC.city,
        electronic_business_contact_state:
          electronicBusinessPOC.stateOrProvinceCode,
        electronic_business_contact_zip: electronicBusinessPOC.zipCode,
        custom_contact_first_name:
          customBusinessPoc && customBusinessPoc.firstName,
        custom_contact_last_name:
          customBusinessPoc && customBusinessPoc.lastName,
        custom_contact_title: customBusinessPoc && customBusinessPoc.title,
        custom_contact_email: customBusinessPoc && customBusinessPoc.email,
        custom_contact_phone: customBusinessPoc && customBusinessPoc.usPhone,
        custom_contact_fax: customBusinessPoc && customBusinessPoc.fax,
        custom_contact_address:
          customBusinessPoc && customBusinessPoc.addressLine1,
        custom_contact_city: customBusinessPoc && customBusinessPoc.city,
        custom_contact_state:
          customBusinessPoc && customBusinessPoc.stateOrProvinceCode,
        custom_contact_zip: customBusinessPoc && customBusinessPoc.zipCode,
        mpp_contact_first_name: pocData.current.contact_first_name,
        mpp_contact_last_name: pocData.current.contact_last_name,
        mpp_contact_title: pocData.current.contact_title || '(Not Available)',
        mpp_contact_email: pocData.current.contact_email,
        mpp_contact_phone: pocData.current.contact_phone || '(Not Available)',
        mpp_contact_fax: pocData.current.contact_fax,
        mpp_contact_address: pocData.current.contact_address,
        mpp_contact_city: pocData.current.contact_city || '(Not Available)',
        mpp_contact_state: pocData.current.contact_state || '(Not Available)',
        mpp_contact_zip: pocData.current.contact_zip || 0,
        poc_selected: pocSelected.current,
      }

      pocCompanyInfoResponse = await saveCompanyInfo(payload)
      await dispatch(getCurrentUserInfo(accessToken))
      redirectToHomePage(pocCompanyInfoResponse.status)

      if (pocCompanyInfoResponse.status === 200) {
        changeRoute('/companyProfileNextSteps')
        pocData.current = {}
      }
    } else {
      const updatePayload = {
        mpp_contact_first_name: pocData.current.contact_first_name,
        mpp_contact_last_name: pocData.current.contact_last_name,
        mpp_contact_title: pocData.current.contact_title,
        mpp_contact_email: pocData.current.contact_email,
        mpp_contact_phone: pocData.current.contact_phone,
        mpp_contact_fax: pocData.current.contact_fax,
        mpp_contact_address: pocData.current.contact_address,
        mpp_contact_city: pocData.current.contact_city,
        mpp_contact_state: pocData.current.contact_state,
        mpp_contact_zip: pocData.current.contact_zip,
        custom_contact_first_name:
          customBusinessPoc && customBusinessPoc.firstName,
        custom_contact_last_name:
          customBusinessPoc && customBusinessPoc.lastName,
        custom_contact_title: customBusinessPoc && customBusinessPoc.title,
        custom_contact_email: customBusinessPoc && customBusinessPoc.email,
        custom_contact_phone: customBusinessPoc && customBusinessPoc.usPhone,
        custom_contact_fax: customBusinessPoc && customBusinessPoc.fax,
        custom_contact_address:
          customBusinessPoc && customBusinessPoc.addressLine1,
        custom_contact_city: customBusinessPoc && customBusinessPoc.city,
        custom_contact_state:
          customBusinessPoc && customBusinessPoc.stateOrProvinceCode,
        custom_contact_zip: customBusinessPoc && customBusinessPoc.zipCode,
        poc_selected: pocSelected.current,
      }


      pocCompanyInfoResponse = await updateCompanyInfo(updatePayload)
      await dispatch(getCurrentUserInfo(accessToken))
      redirectToHomePage(pocCompanyInfoResponse.status)

      const userInfo = JSON.parse(localStorage.getItem('user_info'))
      const currentUser = await getUserInfo(userInfo.access_token)
      redirectToHomePage(currentUser.status)

      if (pocCompanyInfoResponse.status === 200) {
        if (isCustomBusinessPocAddedRef.current || isNewPocSelectionRef.current) {
          changeAddCustomBusinessPocRef(false)
          setShowSaveButtons(true)
          setIsNewChangesSaved(true)
        }
        else {
          chooseDashboard(currentUser.apiData)
        }

        pocData.current = {}
      }
    }
  }

  const setPocContactInformation = (
    contactType,
    contactTypeId,
    contactTypeValue,
    contactPOC,
    stateCheckedValue,
    stateCheckedHandler,
    setContactPOC = () => { },
    pocInfo,
    canEditPhoneAndEmail = true,
  ) => {

    return (
      <>
        <tr className='row my-3 poc-width poc-contact-data'>
          <td className='col-md-3'>
            <FormatPOC
              pocId={contactTypeId}
              poc={contactPOC}
              setPoc={setContactPOC}
              canEditPhoneAndEmail={canEditPhoneAndEmail}
              stateCheckedValue={stateCheckedValue}
              stateCheckedHandler={stateCheckedHandler}
              pocInfo={pocInfo}
            />
          </td>
          <td className='col-md-3'>
            <span>{contactType}</span>
          </td>
          <td className='col-md-3'>
            <div className='col-md-12 m-0 p-0'>
              <label
                tabIndex="0"
                htmlFor={`${contactTypeId}-id`}
                onClick={stateCheckedHandler}
                onKeyDown={e => keydownHandler(e, stateCheckedHandler)}
                className='cursor-pointer'
              >
                <input
                  className='mr-2 focusable-item cursor-pointer'
                  type='radio'
                  id={`${contactTypeId}-id`}
                  value={`${contactTypeValue}`}
                  title={`${contactTypeId}-title`}
                  checked={stateCheckedValue}
                />
                Select as MPP POC
              </label>
            </div>
          </td>
          <td className='col-md-3'>
            {contactType == 'Custom' ? (
              <>
                <button
                  className='btn px-4 mr-2 custom-poc-buttons focusable-item'
                  onClick={() => setShowCustomPocModal(true)}
                >
                  Edit
                </button>{' '}
                <button
                  className='btn px-3 custom-poc-buttons focusable-item'
                  onClick={() => removeCustomMppPoc(setContactPOC)}
                >
                  Remove
                </button>
              </>
            ) : (
              <div aria-label='No Value'></div>
            )}
          </td>
        </tr>

      </>
    )
  }

  /**
   * Update the selected point of contact when the government business POC is selected
   * on any changes to the government business POC (the email or phone number can now be updated)
   */
  useEffect(() => {
    if (isGovernmentBusinessSelected) {
      selectGovernmentBusinessPOC({ poc: governmentBusinessPOC })
    }
  }, [governmentBusinessPOC, selectGovernmentBusinessPOC, isGovernmentBusinessSelected])

  useEffect(() => {
    if (selectedPOC === "mpp_poc") {
      setCustomBusinessPoc(customBusinessPOC)
    }
  }, [selectedPOC, customBusinessPOC])

  /**
 * Update the selected point of contact when the electronic business POC is selected
 * on any changes to the electronic business POC (the email or phone number can now be updated)
 */
  useEffect(() => {
    if (isElectronicBusinessSelected) {
      selectElectronicBusinessPOC({ poc: electronicBusinessPOC })
    }
  }, [electronicBusinessPOC, selectElectronicBusinessPOC, isElectronicBusinessSelected])

  useEffect(() => {

    if (customBusinessPoc) {
      selectCustomBusinessPOC({ poc: customBusinessPoc })
    }

    if (customBusinessPoc && pocSelected.current == 'mpp_poc') {
      initializePointOfContact(customBusinessPoc)
    }
    if (isCompanyProfileInformationHidden === true) {
      !isCustomBusinessPocAddedRef.current ? setShowSaveButtons(true) : setShowSaveButtons(false)
    }


  }, [customBusinessPoc])

  return (
    <div className='col-12 mx-3'>
      {!(isCompanyProfileInformationHidden === true) && (
        <>
          {!isFromNonUserProfile && currentPath === '/userCompanyProfile' && (
            <div className='reviewer-section-title section-heading col-md-12 mt-4 mb-4'>
              Company Profile
            </div>
          )}
          {((currentPath === '/userCompanyProfile') || (currentPath === '/protegeInvitation')) && (
            <CompanyInformation
              primaryNaics={primaryNaics}
              companyName={companyBusinessName}
              physicalAddress={companyBusinessAddress}
              electronicBusinessPOCDetails={electronicBusinessPOC}
            />
          )}
          {currentPath === '/userCompanyProfile' && (
            <div className='row mt-5'>
              <div className='col-md-12'>
                <div className='row'>
                  <div className='col-md-12'>
                    <h6 className='m-0'>
                      <strong>Company Contacts</strong>
                    </h6>
                  </div>
                </div>
                {!isFromNonUserProfile ? (
                  <>
                    <div className='row mt-3'>
                      <p className='col-md-12'>
                        Select Your MPP Person Of Contact Below
                      </p>
                    </div>
                    <div className='row mb-4 pl-3'>
                      <div className='col-md-12 poc-important-information p-0'>
                        <div className='h-100 poc-left-sidebar float-left'></div>
                        <div className='h-100 pl-4'>
                          <p className='m-0 my-3'>
                            <img
                              id='poc-info-id'
                              src={info24}
                              className='mr-1'
                              alt='POC Info'
                              title='poc-info'
                            />
                            <strong>Important Information</strong>
                          </p>
                          <p className='m-0 mb-2'>
                            <span>&#10003;</span> You can select an existing
                            contact in the table or add a new contact and set
                            them as your preferred Person of Contact for the
                            Mentor Protégé Program.
                          </p>
                          <p className='m-0 mb-2'>
                            <span>&#10003;</span> You will be able to edit or
                            change your Person of Contact later.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: 14 }} className='mt-3'>
                    {companyContactMsg}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
      <div className='row my-2'>
        {!isFromNonUserProfile && currentPath === '/companyProfile' && (
          <div className="reviewer-section-title section-heading col-md-4 col-md-12">
            <h1 className="mb-0 section-heading-font">Company Contacts</h1>
          </div>
        )}
        {showAddContactBtn && (
          <div className='col-md-12 p-0'>
            <button
              className='btn btn-poc-add px-3 focusable-item float-right'
              onClick={addCustomMppPoc}
            >
              <FontAwesomeIcon icon={faPlus} color={'white'} /> Add New Contact
            </button>
          </div>
        )}
      </div>
      <div className='row my-4'>
        <table id='poc-contact-data' className='col-md-12 mb-2 p-0 pl-3'>
          <thead style={{ fontSize: 14 }} className='my-2'>
            <tr className='row poc-width'>
              <th className='col-md-3'>
                <strong className='float-left'>Contact Information</strong>
              </th>
              <th className='col-md-3'>
                <strong className='float-left'>Contact Type</strong>
              </th>
              <th className='col-md-3'>
                <strong className='float-left'>Point Of Contact</strong>
              </th>
              <th className='col-md-3'>
                <strong className='float-left'>Actions</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {setPocContactInformation(
              'Government Business',
              'government-business-poc',
              'government_poc',
              governmentBusinessPOC,
              isGovernmentBusinessSelected,
              () => selectGovernmentBusinessPOC({ poc: governmentBusinessPOC }),
              setGovernmentBusinessPOC,
              pocInfo,
              !disableEmailAndPhoneEditing
            )}
            {setPocContactInformation(
              'Electronic Business',
              'electronic-business-poc',
              'electronic_poc',
              electronicBusinessPOC,
              isElectronicBusinessSelected,
              () => selectElectronicBusinessPOC({ poc: electronicBusinessPOC }),
              setElectronicBusinessPOC,
              pocInfo,
              !disableEmailAndPhoneEditing,
            )}
            {customBusinessPoc &&
              setPocContactInformation(
                'Custom',
                'custom-mpp-poc',
                'mpp-poc',
                customBusinessPoc,
                isCustomBusinessSelected,
                () => selectCustomBusinessPOC({ poc: customBusinessPoc }),
                setCustomBusinessPoc,
                pocInfo,
                false,
              )}
          </tbody>
        </table>
      </div>
      <div className='row my-2'>
        <div className='col-md-12'>
          {showPocSelectedError && (
            <p className='m-0 erorr-red'>A point of contact must be selected.</p>
          )}
        </div>
      </div>
      <div className='row my-2'>
        {isNewChangesSaved &&
          <div className="col-md-5 p-0 p-3 my-3 new-poc-changes">
            <div className="row">
              <div className="col-md-10 text-center">Changes have been saved</div>
              <div className="col-md-2 text-right cursor-pointer" onClick={() => setIsNewChangesSaved(false)}>X</div>
            </div>
          </div>
        }
        {(!isFromNonUserProfile && !showSaveButtons) && (
          <div className='col-md-12 p-0'>
            {(!isSaveButtonDisabled && !isEmailAndPhoneValid) && <p className='m-0 pb-2' style={{ color: 'red' }}>
              Please enter a valid email and phone number for the selected contact.
            </p>}
            {!userProfileCompany ? (
              <button
                type='submit'
                tabIndex='0'
                className='btn btn-md px-5 btn-primary focusable-item'
                aria-disabled={isSaveButtonDisabled || !isEmailAndPhoneValid}
                onClick={() => submitPOC()}
              >
                Save and Continue
              </button>
            ) : (
              <button
                type='submit'
                tabIndex='0'
                className='btn btn-md px-5 mt-0 btn-primary focusable-item'
                aria-disabled={isSaveButtonDisabled}
                onClick={() => submitPOC()}
              >
                {redirectToAgreement ? 'Return to Agreement' : 'Save Changes'}
              </button>
            )}
          </div>
        )}
      </div>
      <AddCustomPoc
        showModal={showCustomPocModal}
        showModalHandler={setShowCustomPocModal}
        hideModalHandler={hideCustomModal}
        customPoc={customBusinessPoc}
        customPocHandler={setCustomBusinessPoc}
        stateOptions={statesRef.current}
        changeAddCustomBusinessPocRef={changeAddCustomBusinessPocRef}
        setSelectedPOC={setSelectedPOC}
      />
    </div>
  )
}

PointOfContactChoice = reduxForm({
  enableReinitialize: true,
  form: 'pocChoice',
})(PointOfContactChoice)

export default PointOfContactChoice