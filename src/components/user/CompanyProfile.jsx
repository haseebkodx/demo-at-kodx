import React, { useState, useEffect } from 'react'
import { reduxForm } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux'
import InputField from '../commonComponents/forms/InputField'
import { formatCage, formatUei } from '../../helpers/formatter/format'
import getCompanyInformation from './getCompanyInformation.action'
import PointOfContactChoice from './PointOfContactChoice'
import CompanyInformation from './CompanyInformation'
import getUserInfo from './getUserInfo.action'
import { setUserProfileInfoAction } from './UserProfile.action'
import './userProfile.scss'
import { keydownHandler } from '../commonComponents/utility'
import { validatePhoneFormatted } from '../commonComponents/forms/validations/validatePhone'

function CompanyProfile({ handleSubmit, handleModal, contactInfo, userType, agreement }) {
  const [companyBusinessName, setCompanyBusinessName] = useState(null)
  const [companyBusinessAddress, setCompanyBusinessAddress] = useState(null)
  const [governmentBusinessPOC, setGovernmentBusinessPOC] = useState(null)
  const [electronicBusinessPOC, setElectronicBusinessPOC] = useState(null)
  const [customBusinessPOC, setCustomBusinessPOC] = useState(null)
  const [selectedPOC, setSelectedPOC] = useState(null)
  const [primaryNaics, setPrimaryNaics] = useState(null)
  const [userProfileCompany, setUserProfileCompany] = useState(null)
  const [samsDataInfo, setSamsDataInfo] = useState(null)
  const [pocInfo, setPocInfo] = useState(null)
  const [showCompanySearch, setShowCompanySearch] = useState(true)
  const [isCompanyConfirmed, setIsCompanyConfirmed] = useState(false)
  const [isCageCode, setIsCageCode] = useState(false)
  const [isUeiCode, setIsUeiCode] = useState(false)
  const [isCageCodeError, setIsCageCodeError] = useState(false)
  const [isUeiCodeError, setIsUeiCodeError] = useState(false)
  const [noUeiCageError, setNoUeiCageError] = useState(false)

  const dispatch = useDispatch()
  const userProfileInfo = useSelector(
    (state) => state.updatedUser.userProfileInfo
  )

  useEffect(() => {
    (async () => {
      if (!userProfileInfo) {
        const localStorage = window.localStorage
        const userInfo = JSON.parse(localStorage.getItem('user_info'))
        const accessToken =
          userInfo && userInfo.token && userInfo.token.access_token
        const userDetails = await getUserInfo(accessToken)
        const { apiData } = userDetails
        dispatch(setUserProfileInfoAction(apiData))
      }
    })()
  }, [])


  const companySelectedPOC = useSelector(
    (state) =>
      state.currentUserInfo &&
      state.currentUserInfo.company &&
      state.currentUserInfo.company[0].poc_selected
  )

  useEffect(() => {
    if (userProfileInfo) {
      const userProfileInfoCompany = userProfileInfo.company

      if (userProfileInfoCompany) {
        const userProfileCompany = userProfileInfoCompany[0]

        const {
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
          custom_contact_zip
        } = userProfileCompany

        setCompanyBusinessName(legal_business_name)

        setPrimaryNaics(naics_codes)

        setCompanyBusinessAddress({
          addressLine1: company_address,
          city: company_city,
          stateOrProvinceCode: company_state,
          zipCode: company_zip,
          phone: company_phone,
          fax: company_fax,
        })

        setPocInfo({
          firstName: mpp_contact_first_name,
          lastName: mpp_contact_last_name,
          title: mpp_contact_title,
          email: mpp_contact_email,
          usPhone: mpp_contact_phone,
          fax: mpp_contact_fax,
          addressLine1: mpp_contact_address,
          city: mpp_contact_city,
          stateOrProvinceCode: mpp_contact_state,
          zipCode: mpp_contact_zip,
        })

        setGovernmentBusinessPOC({
          firstName: gov_business_contact_first_name,
          lastName: gov_business_contact_last_name,
          title: gov_business_contact_title,
          usPhone: gov_business_contact_phone,
          fax: gov_business_contact_fax,
          email: gov_business_contact_email,
          addressLine1: gov_business_contact_address,
          city: gov_business_contact_city,
          stateOrProvinceCode: gov_business_contact_state,
          zipCode: gov_business_contact_zip,
        })

        setElectronicBusinessPOC({
          firstName: electronic_business_contact_first_name,
          lastName: electronic_business_contact_last_name,
          title: electronic_business_contact_title,
          usPhone: electronic_business_contact_phone,
          fax: electronic_business_contact_fax,
          email: electronic_business_contact_email,
          addressLine1: electronic_business_contact_address,
          city: electronic_business_contact_city,
          stateOrProvinceCode: electronic_business_contact_state,
          zipCode: electronic_business_contact_zip,
        })

        setCustomBusinessPOC({
          firstName: custom_contact_first_name,
          lastName: custom_contact_last_name,
          title: custom_contact_title,
          usPhone: custom_contact_phone,
          fax: custom_contact_fax,
          email: custom_contact_email,
          addressLine1: custom_contact_address,
          city: custom_contact_city,
          stateOrProvinceCode: custom_contact_state,
          zipCode: custom_contact_zip,
        })

        setSelectedPOC(companySelectedPOC)

        setUserProfileCompany(userProfileCompany)
      }
    }
  }, [userProfileInfo])

  const companyProfile = useSelector(
    (state) =>
      state.form &&
      state.form.companyProfile &&
      state.form.companyProfile.values
  )

  useEffect(() => {
    if (companyProfile) {
      setIsCageCodeError(false)
    }
  }, [companyProfile && companyProfile['firm_cage_code']])

  useEffect(() => {
    if (companyProfile) {
      setIsUeiCodeError(false)
    }
  }, [companyProfile && companyProfile['firm_uei_number']])

  const GetCompanyInformationData = async () => {

    setIsCageCodeError(false)
    setIsUeiCodeError(false)

    const ueiCage = companyProfile['firm_uei_number'] || companyProfile['firm_cage_code']

    if (!ueiCage) {
      setNoUeiCageError(true)
      return
    }

    const companyInformation = await getCompanyInformation(ueiCage)
    const companyDetailsInfo = Array.isArray(companyInformation)
      ? companyInformation[0]
      : companyInformation

    if (Object.keys(companyDetailsInfo)[0] == 'message') {
      if (companyProfile['firm_cage_code']) {
        setIsCageCodeError(true)
      } else if (companyProfile['firm_uei_number']) {
        setIsUeiCodeError(true)
      }
      return
    }

    const companyName = companyDetailsInfo.legalBusinessName

    let companyAddress = {}
    if (companyDetailsInfo.physicalAddress) {
      companyAddress = {
        addressLine1: companyDetailsInfo.physicalAddress.address1,
        addressLine2: companyDetailsInfo.physicalAddress.address2,
        city: companyDetailsInfo.physicalAddress.city,
        stateOrProvinceCode: companyDetailsInfo.physicalAddress.state,
        countryCode: companyDetailsInfo.physicalAddress.countryCode,
        zipCode: companyDetailsInfo.physicalAddress.zip,
        zipCodePlus4: companyDetailsInfo.physicalAddress.zipPlus4,
      }
    }

    let governmentBusinessPOCDetails = {}
    if (companyDetailsInfo.poc) {
      governmentBusinessPOCDetails = companyDetailsInfo.poc

      const governmentBusinessAddress = companyDetailsInfo.governmentBusinessAddress
      if (governmentBusinessAddress) {
        governmentBusinessPOCDetails = {
          ...companyDetailsInfo.poc,
          addressLine1: governmentBusinessAddress.address1,
          addressLine2: governmentBusinessAddress.address2,
          city: governmentBusinessAddress.city,
          stateOrProvinceCode: governmentBusinessAddress.state,
          zipCode: governmentBusinessAddress.zip,
          zipCodePlus4: governmentBusinessAddress.zipPlus4
        }
      }
    }

    let electronicBusinessPOCDetails = {}
    if (companyDetailsInfo.electronicBusinessPoc) {
      electronicBusinessPOCDetails = companyDetailsInfo.electronicBusinessPoc

      const electronicBusinessAddress = companyDetailsInfo.electronicBusinessAddress
      if (electronicBusinessAddress) {
        electronicBusinessPOCDetails = {
          ...companyDetailsInfo.electronicBusinessPoc,
          addressLine1: electronicBusinessAddress.address1,
          addressLine2: electronicBusinessAddress.address2,
          city: electronicBusinessAddress.city,
          stateOrProvinceCode: electronicBusinessAddress.state,
          zipCode: electronicBusinessAddress.zip,
          zipCodePlus4: electronicBusinessAddress.zipPlus4
        }
      }
    }

    const primaryNaics = companyDetailsInfo.primaryNaics
    const cageCode = companyDetailsInfo.cageCode
    // TODO: Should this bei uei or duns still
    const ueiCode = companyDetailsInfo.samId

    setGovernmentBusinessPOC(governmentBusinessPOCDetails)
    setElectronicBusinessPOC(electronicBusinessPOCDetails)
    setCompanyBusinessName(companyName)
    setCompanyBusinessAddress(companyAddress)
    setPrimaryNaics(primaryNaics)
    setIsCompanyConfirmed(true)
    setSamsDataInfo({
      dunsCode: ueiCode,
      cageCode,
    })
  }

  const returnToCompanySearch = () => {
    companyProfile['firm_cage_code'] = null
    companyProfile['firm_uei_number'] = null
    companyProfile['legal_business_name'] = null
    setGovernmentBusinessPOC(null)
    setElectronicBusinessPOC(null)
    setCompanyBusinessName(null)
    setCompanyBusinessAddress(null)
    setIsCompanyConfirmed(false)
  }

  const displaySearchCompany = () => {
    setIsCompanyConfirmed(false)
    setShowCompanySearch(false)
  }

  const setCageCode = () => {
    setIsCageCode(true)
    setIsUeiCode(false)
    setIsUeiCodeError(false)
    setNoUeiCageError(false)
    if (companyProfile) companyProfile['firm_uei_number'] = null
  }

  const setUeiCode = () => {
    setIsCageCode(false)
    setIsUeiCode(true)
    setIsCageCodeError(false)
    setNoUeiCageError(false)
    if (companyProfile) companyProfile['firm_cage_code'] = null
  }

  const selectedFirmUei = companyProfile && companyProfile['firm_uei_number']
  const selectedFirmCage = companyProfile && companyProfile['firm_cage_code']

  const currentPath = window.location.pathname

  useEffect(() => {
    if (agreement?.poc_selected === "mpp_poc") {
      setSelectedPOC("mpp_poc")
      setCustomBusinessPOC({
        addressLine1: agreement.custom_contact_address,
        city: agreement.custom_contact_city,
        email: agreement.custom_contact_email,
        fax: agreement.custom_contact_fax,
        firstName: agreement.custom_contact_first_name,
        lastName: agreement.custom_contact_last_name,
        stateOrProvinceCode: agreement.custom_contact_state,
        title: agreement.custom_contact_title,
        usPhone: agreement.custom_contact_phone,
        zipCode: agreement.custom_contact_zip
      })
    }
  }, [agreement])

  return (
    <main id='main' className='container-fluid m-0 p-0'>
      <div className='user-content-container'>
        <div className='row'>
          <div className='col-md-9'>
            {showCompanySearch && !isCompanyConfirmed && !userProfileCompany && (
              <div>
                <div className='reviewer-section-title section-heading col-md-4 mt-4 mb-4 col-md-12'>
                  <h1 className="mb-0 section-heading-font">Company Association</h1>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <p>
                      Now it&apos;s time to search for your company and
                      associate yourself with it.
                    </p>
                    <p>
                      Your company profile will be used as part of your
                      application and can only be pulled from an official
                      source. You will be required to answer some additional
                      questions once your company profile has been retrieved.
                    </p>
                    <p>
                      <i>
                        Note: If you need to edit company information, you will
                        need to first make those edits outside of the MPP
                      </i>
                    </p>
                  </div>
                </div>
                <div className='row mb-4'>
                  <div className='row my-3 mb-0'>
                    <div className='col-12'>
                      <form
                        onSubmit={handleSubmit(GetCompanyInformationData)}
                      >
                        <div
                          id='cageUeiCompanySearch'
                          className='input-text-border px-2 py-4'
                        >
                          <fieldset>
                            <legend>
                              <div className='row'>
                                <div className='col-md-12'>
                                  <p className='m-0 p-0 mb-3 px-3'>
                                    Do you want to search for your company Commercial and Government Entity (CAGE) Code or SAM Unique Entity Identifier (UEI)?
                                  </p>
                                </div>
                              </div>
                            </legend>
                            <div className='row'>
                              <div
                                style={{ height: 100 }}
                                className='col-md-12'
                              >
                                <div className='row'>
                                  <div
                                    className='mt-3 p-0'
                                  >
                                    <div className='row'>
                                      <div
                                        style={{ width: 60 }}
                                        className='col-md-6 p-0 mx-5'
                                      >
                                        <label
                                          id='cage-code-label'
                                          htmlFor='cage-code'
                                          tabIndex='0'
                                          onClick={setCageCode}
                                          onKeyDown={e => keydownHandler(e, setCageCode)}
                                        >
                                          <input
                                            className='mr-2 focusable-item'
                                            type='radio'
                                            id='cage-code'
                                            value='cage'
                                            title='cage'
                                            checked={isCageCode}
                                          />
                                          CAGE
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='mt-2 p-0'>
                                    {isCageCode && (
                                      <div className='row'>
                                        <div className='col-md-12 company-code-field'>
                                          <InputField
                                            name='firm_cage_code'
                                            placeholder='Cage Code'
                                            id='firm-cage'
                                            format={formatCage}
                                            value={
                                              companyProfile &&
                                              companyProfile['firm_cage_code']
                                            }
                                            type='text'
                                            min={5}
                                            label='Cage Code'
                                            required={true}
                                            isLabelHidden={true}
                                          />
                                        </div>
                                      </div>
                                    )}
                                    {isCageCodeError && (
                                      <div className='row'>
                                        <div className='col-md-12'>
                                          <div className='erorr-red mt-n2 mb-2'>
                                            The CAGE code entered is not
                                            available or does not exist.
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='row'>
                              <div
                                style={{ height: 100 }}
                                className='col-md-12'
                              >
                                <div className='row'>
                                  <div
                                    className='mt-3 p-0'
                                  >
                                    <div className='row'>
                                      <div
                                        style={{ width: 80 }}
                                        className='col-md-6 p-0 mx-5'
                                      >
                                        <label
                                          id='uei-code-label'
                                          htmlFor='uei-code'
                                          tabIndex='0'
                                          onClick={setUeiCode}
                                          onKeyDown={e => keydownHandler(e, setUeiCode)}
                                        >
                                          <input
                                            className='mr-2 focusable-item'
                                            type='radio'
                                            id='uei-code'
                                            value='uei'
                                            title='uei'
                                            checked={isUeiCode}
                                          />
                                          SAM UEI
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='mt-2 p-0'>
                                    {isUeiCode && (
                                      <div className='row'>
                                        <div className='col-md-12 company-code-field'>
                                          <InputField
                                            name='firm_uei_number'
                                            placeholder='SAM UEI Code'
                                            id='firm-uei'
                                            format={formatUei}
                                            value={
                                              companyProfile &&
                                              companyProfile[
                                              'firm_uei_number'
                                              ]
                                            }
                                            type='text'
                                            min={9}
                                            label='SAM UEI Code'
                                            required={true}
                                            isLabelHidden={true}
                                          />
                                        </div>
                                      </div>
                                    )}
                                    {isUeiCodeError && (
                                      <div className='row'>
                                        <div className='col-md-12'>
                                          <div className='erorr-red mt-n2 mb-2'>
                                            The SAM UEI code entered is not
                                            available or does not exist.
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {noUeiCageError &&
                              !selectedFirmUei &&
                              !selectedFirmCage && (
                                <div className='row'>
                                  <div className='col-md-12 ml-4'>
                                    <div className='erorr-red mt-n2 mb-2'>
                                      You did not enter SAM UEI OR CAGE code.
                                    </div>
                                  </div>
                                </div>
                              )}
                          </fieldset>
                        </div>
                        <div className='row'>
                          <div className='col-md-12 mt-3'>
                            <button
                              tabIndex='0'
                              type='submit'
                              className={`btn ${isCageCode || isUeiCode
                                ? 'btn-primary'
                                : 'btn-secondary'
                                } btn-sm invitation-email-button px-5 pl-3 focusable-item`}
                              aria-disabled={!(isCageCode || isUeiCode)}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isCompanyConfirmed && !userProfileCompany && (
              <div className='row'>
                <div className='reviewer-section-title section-heading col-md-4 mt-4 mb-4 col-md-12'>
                  <h1 className="mb-0 section-heading-font">Company Information Retrieved</h1>
                </div>
                <CompanyInformation
                  primaryNaics={primaryNaics}
                  companyName={companyBusinessName}
                  physicalAddress={companyBusinessAddress}
                  electronicBusinessPOCDetails={electronicBusinessPOC}
                  setPhysicalAddress={setCompanyBusinessAddress}
                  setElectronicBusinessPOCDetails={setElectronicBusinessPOC}
                  isEditable={true}
                />
                <div className='row my-5'>
                  <div className='col-md-12'>
                    <div className='row'>
                      <div className='col-md-12'>
                        Is this the company you want to associate yourself with?
                      </div>
                    </div>
                    <div className='row mt-2'>
                      <div className='col-md-12'>
                        <button
                          tabIndex='0'
                          className='btn btn-primary px-5 mr-3 float-left focusable-item'
                          onClick={displaySearchCompany}
                        >
                          Yes
                        </button>
                        <button
                          tabIndex='0'
                          className='btn btn-primary px-5 float-left focusable-item'
                          onClick={returnToCompanySearch}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(!showCompanySearch || userProfileCompany) && (
              <PointOfContactChoice
                handleModal={handleModal}
                pocInfo={pocInfo}
                samsDataInfo={samsDataInfo}
                primaryNaics={primaryNaics}
                selectedPOC={selectedPOC}
                setSelectedPOC={setSelectedPOC}
                userProfileCompany={userProfileCompany}
                companyBusinessName={companyBusinessName}
                companyBusinessAddress={companyBusinessAddress}
                customBusinessPOC={customBusinessPOC}
                setCustomBusinessPOC={setCustomBusinessPOC}
                governmentBusinessPOC={governmentBusinessPOC}
                setGovernmentBusinessPOC={setGovernmentBusinessPOC}
                electronicBusinessPOC={electronicBusinessPOC}
                setElectronicBusinessPOC={setElectronicBusinessPOC}
                contactInfo={contactInfo}
                userProfileInfo={userProfileInfo}
              />
            )}
          </div>
          {currentPath === '/companyProfile' && (
            <div className='col-md-3'>
              <div className='mt-3'>
                {/* {userProfileCompany && <MentorAccountInfo />} */}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

CompanyProfile = reduxForm({
  enableReinitialize: true,
  form: 'companyProfile',
})(CompanyProfile)

export default CompanyProfile
