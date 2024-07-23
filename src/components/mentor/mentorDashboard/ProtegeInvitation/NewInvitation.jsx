import React, { useState, useEffect, useRef } from 'react'
import validateEmail from '../../../commonComponents/forms/validations/validateEmail'
import sendMentorInvitation from './sendMentorInvitation.action'
import { useSelector } from 'react-redux'
import InputField from '../../../commonComponents/forms/InputField'
import { formatCage, formatPhone, formatUei } from '../../../../helpers/formatter/format'
import PointOfContactChoice from '../../../user/PointOfContactChoice'
import getCompanyInformation from '../../../user/getCompanyInformation.action'
import { reduxForm } from 'redux-form'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './protegeInvitation.scss'
import InvitationSentModal from './InvitaitonSentModal'
import InviationConfirmationModal from './InvitationConfirmationModal'
import { keydownHandler } from '../../../commonComponents/utility'
import validatePhone, { validatePhoneFormatted } from '../../../commonComponents/forms/validations/validatePhone'

function NewInvitation({
  getInvitationList,
  handleSubmit,
  hideInvitationListHandler,
  setIsNewProtegeInvited,
  initialize
}) {
  const [newInvitationError, setNewInvitaitonError] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const currentUserInfo = useSelector((state) => state && state.currentUserInfo)
  const newInvitation = useSelector(
    (state) =>
      state.form && state.form.newInvitation && state.form.newInvitation.values
  )
  const [displayCompany, setDisplayCompany] = useState(true)
  const [companyBusinessName, setCompanyBusinessName] = useState(null)
  const [companyBusinessAddress, setCompanyBusinessAddress] = useState(null)
  const [governmentBusinessPOC, setGovernmentBusinessPOC] = useState(null)
  const [electronicBusinessPOC, setElectronicBusinessPOC] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [electronicBusinessPOCEmail, useElectronicBusinessPOCEmail] = useState(
    null
  )
  const [invitedPointOfContact, setInvitedPointOfContact] = useState(null)
  const [primaryNaics, setPrimaryNaics] = useState(null)

  const [isCageCode, setIsCageCode] = useState(false)
  const [isUeiCode, setIsUeiCode] = useState(false)

  const [isCageCodeError, setIsCageCodeError] = useState(false)
  const [isUeiCodeError, setIsUeiCodeError] = useState(false)

  const [isCageCodeInvalid, setIsCageCodeInvalid] = useState(false)
  const [isUeiCodeInvalid, setIsUeiCodeInvalid] = useState(false)

  const [searchMessage, setSearchMessage] = useState(null)

  const [showInviteEmail, setShowInviteEmail] = useState(false)
  const [showInviteCompany, setShowInviteCompany] = useState(false)

  const invitationConfirmationElRef = useRef(null)

  useEffect(() => {
    if (displayCompany) {
      setSearchMessage(
        'You can invite a protégé by searching for them via their Commercial and Government Entity (CAGE) Code or SAM Unique Entity Identifier (UEI), or you can invite via email if you have a point of contact.'
      )
    } else {
      setSearchMessage(
        'Your search result retrieved the following company information:'
      )
    }
  }, [displayCompany])

  useEffect(() => {
    if (invitedPointOfContact) {
      setTimeout(() => {
        invitationConfirmationElRef.current.scrollIntoView({
          behavior: 'smooth',
        })
      }, 1000)
    }
  }, [invitedPointOfContact])

  useEffect(() => {
    if (!newInvitation || (newInvitation && !newInvitation['firm_cage_code'])) {
      setIsCageCodeInvalid(false)
      setIsCageCodeError(false)
    }
  }, [newInvitation && newInvitation['firm_cage_code']])

  useEffect(() => {
    if (
      !newInvitation ||
      (newInvitation && !newInvitation['firm_uei_number'])
    ) {
      setIsUeiCodeInvalid(false)
      setIsUeiCodeError(false)
    }
  }, [newInvitation && newInvitation['firm_uei_number']])

  const history = useHistory()

  const inviteeEmail = electronicBusinessPOCEmail
    ? electronicBusinessPOCEmail
    : newInvitation && newInvitation['invitation_email']
      ? newInvitation['invitation_email']
      : null

  const validationEmail = () => {
    const result = validateEmail(inviteeEmail)
    return result
  }

  const GetSamsInfo = () => {
    const ueiCage =
      newInvitation && newInvitation['firm_uei_number']
        ? newInvitation['firm_uei_number']
        : newInvitation && newInvitation['firm_cage_code']
          ? newInvitation['firm_cage_code']
          : null
    if (ueiCage) {
      GetCompanyProfile(ueiCage)
      setNewInvitaitonError()
    }
  }

  const SendMentorInvitaiton = async () => {
    const validEmail = validationEmail()
    if (validEmail) {
      const { apiData, status } = await sendMentorInvitation({
        inviter_uuid: currentUserInfo.uuid,
        inviter_email: currentUserInfo.email,
        inviter_first_name: currentUserInfo.first_name,
        inviter_last_name: currentUserInfo.last_name,
        inviter_company:
          currentUserInfo &&
          currentUserInfo.company &&
          currentUserInfo.company[0] &&
          currentUserInfo.company[0].legal_business_name,
        invitee_email: inviteeEmail,
      })

      if (status === 400) {
        setNewInvitaitonError(
          apiData &&
          (displayCompany
            ? apiData.message
            : 'Invitation is already sent to this user by you. Click the Back button above to see the Invitation Status Table.')
        )

        setErrorEmail(newInvitation && newInvitation['invitation_email'])
      }

      if (status === 200) {
        setShowModal(true)
        setNewInvitaitonError(false)
      }
    }
    getInvitationList()
  }

  const initializeEmail = () => {
    initialize({
      invitation_email: ''
    })
  }

  const GetCompanyProfile = async (ueiCage) => {
    const companyDetails = await getCompanyInformation(ueiCage)
    const companyDetailsInfo = Array.isArray(companyDetails)
      ? companyDetails[0]
      : companyDetails

    if (isCageCodeInvalid || isUeiCodeInvalid) {
      return
    }

    if (Object.keys(companyDetailsInfo)[0] == 'message') {
      if (newInvitation['firm_cage_code']) {
        setIsCageCodeError(true)
      } else if (newInvitation['firm_uei_number']) {
        setIsUeiCodeError(true)
      }
      return
    }

    setIsCageCodeError(false)
    setIsUeiCodeError(false)

    const companyName = companyDetailsInfo.legalBusinessName
    const companyAddress = {
      addressLine1: companyDetailsInfo.physicalAddress.address1,
      addressLine2: companyDetailsInfo.physicalAddress.address2,
      city: companyDetailsInfo.physicalAddress.city,
      stateOrProvinceCode: companyDetailsInfo.physicalAddress.state,
      countryCode: companyDetailsInfo.physicalAddress.countryCode,
      zipCode: companyDetailsInfo.physicalAddress.zip,
      zipCodePlus4: companyDetailsInfo.physicalAddress.zipPlus4,
    }

    const governmentBusinessPOCDetails = companyDetailsInfo.poc
    governmentBusinessPOCDetails.addressLine1 =
      companyDetailsInfo.governmentBusinessAddress.address1
    governmentBusinessPOCDetails.addressLine2 =
      companyDetailsInfo.governmentBusinessAddress.address2
    governmentBusinessPOCDetails.city =
      companyDetailsInfo.governmentBusinessAddress.city
    governmentBusinessPOCDetails.stateOrProvinceCode =
      companyDetailsInfo.governmentBusinessAddress.state
    governmentBusinessPOCDetails.zipCode =
      companyDetailsInfo.governmentBusinessAddress.zip
    governmentBusinessPOCDetails.zipCodePlus4 =
      companyDetailsInfo.governmentBusinessAddress.zipPlus4

    const electronicBusinessPOCDetails =
      companyDetailsInfo.electronicBusinessPoc
    electronicBusinessPOCDetails.addressLine1 =
      companyDetailsInfo.electronicBusinessAddress.address1
    electronicBusinessPOCDetails.addressLine2 =
      companyDetailsInfo.electronicBusinessAddress.address2
    electronicBusinessPOCDetails.city =
      companyDetailsInfo.electronicBusinessAddress.city
    electronicBusinessPOCDetails.stateOrProvinceCode =
      companyDetailsInfo.electronicBusinessAddress.state
    electronicBusinessPOCDetails.zipCode =
      companyDetailsInfo.electronicBusinessAddress.zip
    electronicBusinessPOCDetails.zipCodePlus4 =
      companyDetailsInfo.electronicBusinessAddress.zipPlus4

    const primaryNaics = companyDetailsInfo.primaryNaics

    setGovernmentBusinessPOC(governmentBusinessPOCDetails)
    setElectronicBusinessPOC(electronicBusinessPOCDetails)
    setCompanyBusinessName(companyName)
    setCompanyBusinessAddress(companyAddress)
    setPrimaryNaics(primaryNaics)
    setDisplayCompany(!displayCompany)
    hideInvitationListHandler(true)
  }

  const handleModal = () => {
    initializeEmail()
    setShowModal(false)
    setTimeout(() => {
      setIsNewProtegeInvited(true)
    }, 1000)
  }

  const invitationCompleteHandler = () => {
    initializeEmail()
    setShowModal(false)
    goToPrevious()
    setTimeout(() => {
      setIsNewProtegeInvited(true)
    }, 1000)
  }

  const SetElectronicBusinessPOCEmail = (poc) => {
    setInvitedPointOfContact(poc)
    useElectronicBusinessPOCEmail(poc ? poc.email : null)
  }

  const sendInvitationProtegeEmail = () => {
    setShowConfirmationModal(false)
    SendMentorInvitaiton()
  }

  const goToPrevious = (displayCompany) => {
    if (displayCompany) {
      history.push('/dashboard')
    } else {
      setDisplayCompany(true)
      setNewInvitaitonError(null)
      hideInvitationListHandler(false)
      SetElectronicBusinessPOCEmail(null)
    }
  }

  const setEmailInvitation = () => {
    setShowInviteEmail(true)
    setShowInviteCompany(false)
  }

  const setCompanyInvitation = () => {
    setShowInviteEmail(false)
    setShowInviteCompany(true)
  }

  const setCageCode = () => {
    setIsCageCode(true)
    setIsUeiCode(false)
    setIsUeiCodeError(false)
    if (newInvitation) newInvitation['firm_uei_number'] = null
  }

  const setUeiCode = () => {
    setIsCageCode(false)
    setIsUeiCode(true)
    setIsCageCodeError(false)
    if (newInvitation) newInvitation['firm_cage_code'] = null
  }

  const cageValidation = (cageCode) => {
    const isCageCodeValid = cageCode.length < 5
    setIsCageCodeInvalid(isCageCodeValid)
    return !isCageCodeValid
  }

  const ueiValidation = (ueiCode) => {
    const isUeiCodeValid = ueiCode.length < 9
    setIsUeiCodeInvalid(isUeiCodeValid)
    return !isUeiCodeValid
  }

  const getCompanyContactMessage = () => {
    return (
      <>
        <p className='m-0 p-0'>
          The contact below have been retrieved from SAM (System for Award
          Management).
        </p>
        <p className='m-0 p-0'>
          You will need to select a point of contact to send the invitation. If
          you do not want to send an invite to any of the contacts below you
          will need to go back and invite someone via email.
        </p>
      </>
    )
  }

  const getInviteConfirmationMessage = (invitedPointOfContact) => {
    return (
      <>
        <p className='m-0 p-0'>
          Please review the above summary and make sure this is the POC and
          company you want to invite.
        </p>
        <p className='m-0 p-0'>
          {`Do you want to invite ${invitedPointOfContact.firstName} ${invitedPointOfContact.lastName} (${invitedPointOfContact.email}, ${formatPhone(invitedPointOfContact.usPhone)}) from ${companyBusinessName}?`}
        </p>
      </>
    )
  }

  function isInvalidEmailOrPhone(invitedPointOfContact){

    const isEmailInvalid = !validateEmail(invitedPointOfContact?.email)
    const isPhoneInvalid = !validatePhoneFormatted(invitedPointOfContact?.usPhone)

    return isEmailInvalid || isPhoneInvalid
  }

  const getInvalidEmailOrPhoneMessage = (invitedPointOfContact) => {
    return (
      <>
        <p className='m-0 p-0' style={{color:'red'}}>
          Please enter a valid email and phone number for the selected contact.
        </p>
      </>
    )
  }

  return (
    <div className='row my-3'>
      <div className='col-12 p-0 mb-3'>
        <div className='px-0 my-2 back-button'>
          <span
            tabIndex="0"
            role='button'
            className='btn pl-0 focusable-item'
            onKeyDown={event => {
              const keycode = event.key
              if (keycode === 'Enter') {
                goToPrevious(displayCompany)
              }
            }}
            onClick={() => goToPrevious(displayCompany)}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> <strong>Back</strong>
          </span>
        </div>
      </div>

      <div className='col-12'>
        <InvitationSentModal
          inviteeEmail={inviteeEmail}
          showModal={showModal}
          handleModal={displayCompany ? handleModal : invitationCompleteHandler}
        />
        <InviationConfirmationModal
          inviteeEmail={inviteeEmail}
          showModal={showConfirmationModal}
          handleModal={() => setShowConfirmationModal(false)}
          sendEmailHandler={() => sendInvitationProtegeEmail()}
        />
        <h1 className='m-0 ml-n3 section-header'>
          <strong>Invite a Protégé</strong>
        </h1>
        <p className='my-3 ml-n3' style={{ fontSize: 15 }}>
          {searchMessage}
        </p>
        <form onSubmit={handleSubmit(SendMentorInvitaiton)}>
          {displayCompany ? (
            <div className='row'>
              <div className='col-md-12 mt-3'>
                <fieldset>
                  <legend>
                    <div className='row'>
                      <div className='col-md-12 p-0'>
                        <h6 className='m-0'>
                          <strong>
                            1. How do you want to invite a new Protégé Company?
                          </strong>
                        </h6>
                      </div>
                    </div>
                  </legend>
                  <div className='row my-2'>
                    <div className='col-md-12 p-0'>
                      <div className='row'>
                        <div
                          className='col-md-12 p-0 mt-1 pl-3'
                        >
                          <label 
                            htmlFor='email-code' 
                            tabIndex="0" 
                            onClick={setEmailInvitation}
                            onKeyDown={keydownHandler}
                          >
                            <input
                              className='mr-2 focusable-item'
                              type='radio'
                              id='email-code'
                              value='email-invite'
                              title='email-invite'
                              checked={showInviteEmail}
                              onKeyDown={keydownHandler}
                            />
                            Invite a company via an email address that you have
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-12 p-0'>
                      <div className='row'>
                        <div
                          className='col-md-12 p-0 mt-1 pl-3'
                        >
                          <label 
                            htmlFor='company-code' 
                            tabIndex="0" 
                            onClick={setCompanyInvitation}
                            onKeyDown={keydownHandler}
                          >
                            <input
                                className='mr-2 focusable-item'
                                type='radio'
                                id='company-code'
                                value='company-invite'
                                title='company-invite'
                                checked={showInviteCompany}
                                onKeyDown={keydownHandler}
                              />
                            Search for a company via CAGE or SAM UEI
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>

                {showInviteEmail && (
                  <div className='row'>
                    <div className='col-md-5 px-0 mt-3 mb-0'>
                      <h6>
                        <strong>2. Invite Via Email</strong>
                      </h6>
                      <div>
                        <InputField
                          name='invitation_email'
                          placeholder='Email'
                          id='email'
                          value={
                            (newInvitation && newInvitation['invitation_email']) || ''
                          }
                          validation={validateEmail}
                          required={true}
                        />

                        {newInvitationError && ((newInvitation && newInvitation['invitation_email']) === errorEmail) && (
                          <div className='erorr-red mt-2'>
                            {newInvitationError}
                          </div>
                        )}

                        <button
                          type='button'
                          className='btn btn-primary mt-3 focusable-item'
                          onClick={() => setShowConfirmationModal(true)}
                        >
                          Invite
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {showInviteCompany && (
                  <div className='row'>
                    <div className='col-sm-12 px-0 mt-3 mb-0'>
                      <fieldset>
                        <legend>
                          <h6 className='m-0'>
                            <strong>
                              2. Search For a Company via CAGE Code or SAM UEI?
                            </strong>
                          </h6>
                        </legend>
                        <div style={{ height: 50 }} className='col-12'>
                          <div className='row'>
                            <div
                              className='p-0 pr-3 mt-3 pt-3'
                            >
                              <label 
                                htmlFor='cage-code'
                                tabIndex='0'
                                onClick={setCageCode}
                                onKeyDown={keydownHandler}
                              >
                                <input
                                  className='mr-2 focusable-item'
                                  type='radio'
                                  id='cage-code'
                                  value='cage'
                                  title='cage'
                                  checked={isCageCode}
                                  onKeyDown={keydownHandler}
                                />
                                CAGE
                              </label>
                            </div>
                            <div className='p-0 mt-n2'>
                              {isCageCode && (
                                <InputField
                                  name='firm_cage_code'
                                  id='firm-cage'
                                  format={formatCage}
                                  value={
                                    newInvitation &&
                                    newInvitation['firm_cage_code']
                                  }
                                  validation={(val) => cageValidation(val)}
                                  isLabelHidden={true}
                                  placeholder='CAGE'
                                  required={true}
                                />
                              )}
                            </div>
                          </div>
                          {isCageCodeError && (
                            <div className='row'>
                              <div className='col-md-12'>
                                <div className='col-md-10 float-right'>
                                  <div className='erorr-red mt-n2 mb-2 pl-4'>
                                    The CAGE code is unavailable.
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {(isCageCodeError || isCageCodeInvalid) && (
                          <div className='row'>
                            <div className='col-md-12 mt-4'></div>
                          </div>
                        )}

                        <div style={{ height: 50 }} className='col-12 mt-2'>
                          <div className='row'>
                            <div
                              className='p-0 pr-3 mt-3 pt-3'
                            >
                              <label 
                                htmlFor='uei-code'
                                tabIndex='0'
                                onClick={setUeiCode}
                                onKeyDown={keydownHandler}
                              >
                                <input
                                  className='mr-2 focusable-item'
                                  type='radio'
                                  id='uei-code'
                                  value='uei'
                                  title='uei'
                                  checked={isUeiCode}
                                  onKeyDown={keydownHandler}
                                />
                                SAM UEI
                              </label>
                            </div>
                            <div className='p-0 mt-n2'>
                              {isUeiCode && (
                                <InputField
                                  name='firm_uei_number'
                                  id='firm-uei'

                                  format={formatUei}
                                  validation={(val) => ueiValidation(val)}
                                  value={
                                    newInvitation &&
                                    newInvitation['firm_uei_number']
                                  }
                                  isLabelHidden={true}
                                  placeholder='SAM UEI'
                                  required={true}
                                />
                              )}
                            </div>
                          </div>
                          {isUeiCodeError && (
                            <div className='row'>
                              <div className='col-md-12'>
                                <div className='col-md-10 float-right'>
                                  <div className='erorr-red mt-n2 mb-2 pl-4'>
                                    The SAM UEI code is unavailable.
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {(isUeiCodeError || isUeiCodeInvalid) && (
                          <div className='row'>
                            <div className='col-md-12 mt-4'></div>
                          </div>
                        )}
                      </fieldset>
                      <div>
                        <div className='col-12 pt-3 mt-3 pl-0'>
                          <button
                            type='button'
                            className='btn btn-primary mt-3 focusable-item'
                            onClick={() => GetSamsInfo()}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
              <>
                <div className='row'>
                  <PointOfContactChoice
                    primaryNaics={primaryNaics}
                    companyBusinessName={companyBusinessName}
                    companyBusinessAddress={companyBusinessAddress}
                    governmentBusinessPOC={governmentBusinessPOC}
                    setGovernmentBusinessPOC={setGovernmentBusinessPOC}
                    electronicBusinessPOC={electronicBusinessPOC}
                    setElectronicBusinessPOC={setElectronicBusinessPOC}
                    isFromNonUserProfile={true}
                    companyContactMsg={getCompanyContactMessage()}
                    selectedPointOfContactHandler={(poc) =>
                      SetElectronicBusinessPOCEmail(poc)
                    }
                  />
                </div>
                {invitedPointOfContact && (
                  <div
                    ref={invitationConfirmationElRef}
                    className='row send-invitation-confirmation pl-0'
                  >
                    {isInvalidEmailOrPhone(invitedPointOfContact) && 
                      <div className='col-12 my-3'>
                      {getInvalidEmailOrPhoneMessage(invitedPointOfContact)}
                      </div>
                    }
                    {!isInvalidEmailOrPhone(invitedPointOfContact) && 
                    <div className='col-12 my-3'>
                      <div className='row'>
                        <div className='col-12'>
                          <h6 className='m-0'>
                            <strong>Send Invitation To Protégé</strong>
                          </h6>
                        </div>
                      </div>
                      <div className='row'>
                        <div style={{ fontSize: 14 }} className='col-12 my-3'>
                          {getInviteConfirmationMessage(invitedPointOfContact)}
                        </div>
                      </div>
                      {newInvitationError && (
                        <div className='row'>
                          <div className='col-12 mb-3 erorr-red'>
                            {newInvitationError}
                          </div>
                        </div>
                      )}
                      <div className='row'>
                        <div className='col-12'>
                          <button
                            type='button'
                            className='btn btn-primary px-4 focusable-item'
                            onClick={() => SendMentorInvitaiton()}
                          >
                            Yes
                        </button>
                          <button
                            type='button'
                            className='btn btn-primary px-4 ml-4 focusable-item'
                            onClick={() => goToPrevious(displayCompany)}
                          >
                            No
                        </button>
                        </div>
                      </div>
                    </div>}
                  </div>
                )}
              </>
            )}
        </form>
      </div>
    </div>
  )
}

NewInvitation = reduxForm({
  enableReinitialize: true,
  form: 'newInvitation',
})(NewInvitation)

export default NewInvitation
