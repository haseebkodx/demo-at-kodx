import React, { useState, useEffect, useRef } from 'react'
import { reduxForm } from 'redux-form'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import FileSaver from 'file-saver'
import dateFormat from 'dateformat'
import getFileData from '../../../components/mentor/mentorApplication/getFileData.action'
import EstimatedCost from './EstimatedCost'
import PointOfContacts from './PointOfContacts'
import getMentorApplicationData from '../../../components/mentor/mentorApplication/getMentorApplicationData.action'
import validatePointOfContacts from './validatePointsOfContacts'
import DevelopmentalAssistance from './DevelopmentalAssistance'
import validateDevelopmentalAssistance from './validateDevelopmentalAssistance'
import AgreementDetails from './AgreementDetails'
import PeriodOfPerformance from './PeriodOfPerformance'
import './mentorAgreement.scss'
import SidebarComponent from '../../commonComponents/SidebarComponent'
import DisplayProtegeAgreementData from './DisplayProtegeAgreementData'
import valdiateAgreementDetails from './validateAgreementDetails'
import MentorProtegeContracts from './MentorProtegeContracts'
import validateMentorProtegeContracts from './validateMentorProtegeContracts'
import MentorFirm from './MentorFirm'
import getStates from '../mentorApplication/getStates.action'
import HistoricalBackground from './HistoricalBackground'
import ReviewAgreement from './ReviewAgreement'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
  faCheckCircle,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'
import getMentorAgreementData from '../mentorDashboard/getMentorAgreementData.action'
import submitMentorAgreement from './submitMentorAgreement.action'
import getAgreementData from '../../getAgreementData.action'
import { useHistory } from 'react-router-dom'
import {
  sidebarStyles,
  sidebarLeftImageStyles,
  sidebarRightImageStyles
} from '../../commonComponents/sidebarStyles'
import MentorProtegeAgreementSummary from './MentorProtegAgreementSummary'
import sendEsignAgreementReview from '../../reviewer/reviewAgreement/sendEsignAgreement.action'
import { keydownHandler } from '../../commonComponents/utility'
import leftNavSwitch from '../../../assets/images/LeftNav_switch.png'
import rightNavSwitch from '../../../assets/images/RightNav_switch.png'

function MentorAgreement({ initialize, handleSubmit }) {
  const location = useLocation()
  const history = useHistory()
  const currentAgreementId = location.state && location.state.agreementId
  const [activeState, useActiveState] = useState(0)

  const [subContractAwardNumber, useSubContractAwardNumber] = useState(1)
  const [federalContractAward, useFederalContractAward] = useState(1)
  const [potentialSubcontractAward, usePotentialContractAward] = useState(1)
  const [statesInfo, setStatesInfo] = useState(null)
  const [mentorAppInfo, setMentorAppInfo] = useState(null)
  const [allMentorAppInfo, setAllMentorAppInfo] = useState(null)
  const [latestState, setLatestState] = useState(0)
  const [mentorAgreementData, setMentorAgreementData] = useState(null)
  const [agreementType, setAgreementType] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [protegeAgreementData, setProtegeAgreementData] = useState()
  const [showPOCEditModal, setShowPOCEditModal] = useState(false)
  const [contractsSubmitted, setContractsSubmitted] = useState(false)
  const [pocSubmitted, setPocSubmitted] = useState(false)

  const [
    protegeAgreementDataDetails,
    setProtegeAgreeementDetailsData
  ] = useState(null)
  const [agreementError, setAgreementError] = useState(false)
  const [firstMentorAgreementStatus, setFirstMentorAgreementStatus] = useState(
    null
  )
  const [
    mentorProtegeAgreementStatus,
    setMentorProtegeAgremeementStatus
  ] = useState(null)
  const [protegeAgreementStatus, setProtegeAgreementStatus] = useState(null)

  const [developmentAssistanceFile, setDevelopmentAssistanceFile] = useState(
    null
  )
  const [historicalBackgroundFile, setHistoricalBackgroundFile] = useState(null)
  const [reviewerComments, setReviewerComments] = useState(null)
  const [
    allMentorProtegeAgreementData,
    setAllMentorProtegeAgreementData
  ] = useState(null)
  const [latestMentorAgreementData, setLatestMentorAgreementData] = useState(
    null
  )
  const closeSideBarHandlerRef = useRef()

  const agreement_type = 'mentor'

  const handleDevAssistFiles = (files) => {
    setDevelopmentAssistanceFile(files)
  }

  const handleHistoricalFiles = (files) => {
    setHistoricalBackgroundFile(files)
  }

  const localStorage = window.localStorage
  const userInfo = JSON.parse(localStorage.getItem('user_info'))
  
  const mentorAppUuid = useSelector(
    (state) => state.currentUserInfo?.mentor_app?.[0]?.uuid
  );

  const mentorFirm =
    userInfo &&
    userInfo.agreements &&
    userInfo.agreements[0] &&
    userInfo.agreements[0].mentor_company_name

  const mentorName = userInfo
    ? `${userInfo.first_name} ${userInfo.last_name}`
    : ''

  const mentorApp = userInfo && userInfo.mentor_app && userInfo.mentor_app[0]
  const uuid = (mentorApp && mentorApp.uuid) || mentorAppUuid
  const mentorAgreement = useSelector(
    (state) =>
      state.form &&
      state.form.mentorAgreement &&
      state.form.mentorAgreement.values
  )

  const companyPOC = useSelector(
    (state) =>
      state.currentUserInfo &&
      state.currentUserInfo.company &&
      state.currentUserInfo.company[0]
  )

  // docusign envelope id
  const [docusignEnvelope_id, setDocusignEnvelope_id] = useState(null)
  // if the currentAgreementId changes then render
  useEffect(() => {
    GetDocusignEnvelopId(currentAgreementId)
  }, [currentAgreementId])

  const GetDocusignEnvelopId = async (uuid) => {
    const agreementData = await getAgreementData(uuid)
    const apiData = agreementData && agreementData.apiData
    const agreement = apiData && apiData.agreement
    const agreementDataForMentorAndProtege = agreement && agreement[0]
    const docusignId =
      agreementDataForMentorAndProtege &&
      agreementDataForMentorAndProtege.envelope_id
    setDocusignEnvelope_id(docusignId)
  }

  const mentorAgreeemntRealData =
    mentorAgreementData && mentorAgreementData.mentor_arg_status === 'complete'
      ? mentorAgreementData
      : null

  const SetActiveState = (idx) => {
    const latestActiveState = idx !== undefined ? idx : activeState + 1
    useActiveState(latestActiveState)
    setLatestState(
      latestState < latestActiveState ? latestActiveState : latestState
    )
    window.scrollTo(0, 0)
    checkNoEditFilesMode()
  }

  useEffect(() => {
    let isActive = true

    if (isActive) {
      StatesData()
    }

    return () => {
      isActive = false
    }
  }, [])

  const StatesData = async () => {
    const statesData = await getStates()
    setStatesInfo(statesData)
  }

  useEffect(() => {
    let isActive = true

    if (isActive) {
      ProtegeAgreement(currentAgreementId)
    }

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    let isActive = true

    if (isActive) {
      const historicalFiles =
        latestMentorAgreementData &&
        latestMentorAgreementData['historical_background']

      setHistoricalBackgroundFile(historicalFiles)

      const developmentAssistanceFiles =
        latestMentorAgreementData &&
        latestMentorAgreementData['developmental_assistance_file']

      setDevelopmentAssistanceFile(developmentAssistanceFiles)
    }

    return () => (isActive = false)
  }, [latestMentorAgreementData])

  const ProtegeAgreement = async (uuid) => {
    const protegeAgreementData = await getAgreementData(uuid)
    if (!protegeAgreementData) {
      return
    }
    const apiData = protegeAgreementData && protegeAgreementData.apiData
    const protege_agreement = apiData && apiData.protege_agreement
    const agreementData = protege_agreement && protege_agreement[0]

    const {
      legal_business_name,
      company_address,
      company_city,
      company_fax,
      company_phone,
      company_state,
      company_zip,
      cage_code,
      duns_number,
      sign_agreement,
      sign_protege_date,
      sign_protege_name,
      sign_protege_title,
      mpp_contact_address,
      mpp_contact_city,
      mpp_contact_email,
      mpp_contact_fax,
      mpp_contact_first_name,
      mpp_contact_last_name,
      mpp_contact_phone,
      mpp_contact_state,
      mpp_contact_title,
      mpp_contact_zip,
      aco_address,
      aco_city,
      aco_email,
      aco_fax,
      aco_name,
      aco_selected,
      aco_state,
      aco_tel,
      aco_title,
      aco_zip,
      cao_address,
      cao_city,
      cao_email,
      cao_fax,
      cao_name,
      cao_selected,
      cao_state,
      cao_tel,
      cao_title,
      cao_zip,
      dcma_primary_contact,
      dcma_contact_address,
      dcma_contact_city,
      dcma_contact_email,
      dcma_contact_phone,
      dcma_contact_state,
      dcma_contact_title,
      dcma_contact_zip,
      historical_agreement_background_file,
      historical_background_explanation,
      historical_background_file,
      protege_arg_status,
      protege_firm_participated,
      protege_submitted,
      firm_annual_gross_revenue,
      firm_number_of_employees,
      firm_percent_owned,
      firm_year_established,
      reporting_requirements,
      review_agreement,
      termination_date,
      termination_reason,
      signee_contact_address,
      signee_contact_city,
      signee_contact_email,
      signee_contact_fax,
      signee_contact_phone,
      signee_contact_state,
      signee_contact_title,
      signee_contact_zip,
      signee_primary_contact,
      fiscal_year1,
      number_1,
      funded_contact_value1,
      dollar_amount_recieved1,
      fiscal_year2,
      number_2,
      funded_contact_value2,
      dollar_amount_recieved2,
      fiscal_year3,
      number_3,
      funded_contact_value3,
      dollar_amount_recieved3,
      fiscal_year_prime1,
      number_prime_1,
      funded_contact_value_prime1,
      dollar_amount_recieved_prime1,
      fiscal_year_prime2,
      number_prime_2,
      funded_contact_value_prime2,
      dollar_amount_recieved_prime2,
      fiscal_year_prime3,
      number_prime_3,
      funded_contact_value_prime3,
      dollar_amount_recieved_prime3,
      period_of_prev_agreement,
      prev_mentor_firm_name,
      credit_direct_reimbursed,
      protege_highest_selected_section,
      sponsoring_military_dept_agency,
      certified_small_business,
      sba_8a,
      sba_8a_graduated_date,
      sba_cgp,
      sba_hz,
      sba_nog,
      sba_sdb,
      sba_sde,
      sba_vosb,
      sba_wosb,
      naics_codes,
      fed_fiscal_year_prime_1,
      fed_number_prime_1,
      fed_dollar_amount_recieved_prime_1,
      fed_funded_contract_value_prime_1,
      fed_fiscal_year_prime_2,
      fed_number_prime_2,
      fed_dollar_amount_recieved_prime_2,
      fed_funded_contract_value_prime_2,
      fed_number_sub_1,
      fed_fiscal_year_sub_1,
      fed_funded_contract_value_sub_1,
      fed_dollar_amount_recieved_sub_1,
      fed_number_sub_2,
      fed_fiscal_year_sub_2,
      fed_funded_contract_value_sub_2,
      fed_dollar_amount_recieved_sub_2
    } = agreementData

    const companyInfoData = {
      legal_business_name,
      company_address,
      company_city,
      company_state,
      company_zip,
      company_phone,
      company_fax,
      cage_code,
      duns_number
    }

    const mppContact = {
      mpp_contact_address,
      mpp_contact_city,
      mpp_contact_email,
      mpp_contact_fax,
      mpp_contact_first_name,
      mpp_contact_last_name,
      mpp_contact_phone,
      mpp_contact_state,
      mpp_contact_title,
      mpp_contact_zip
    }

    const dcmaContact = {
      dcma_primary_contact,
      dcma_contact_address,
      dcma_contact_city,
      dcma_contact_email,
      dcma_contact_phone,
      dcma_contact_state,
      dcma_contact_title,
      dcma_contact_zip
    }

    const acoContact = {
      aco_address,
      aco_city,
      aco_email,
      aco_fax,
      aco_name,
      aco_selected,
      aco_state,
      aco_tel,
      aco_title,
      aco_zip
    }

    const caoContact = {
      cao_address,
      cao_city,
      cao_email,
      cao_fax,
      cao_name,
      cao_selected,
      cao_state,
      cao_tel,
      cao_title,
      cao_zip
    }

    const authorizedProtegePOCSignee = {
      signee_contact_address,
      signee_contact_city,
      signee_contact_email,
      signee_contact_fax,
      signee_contact_phone,
      signee_contact_state,
      signee_contact_title,
      signee_contact_zip,
      signee_primary_contact
    }

    const signedProtege = {
      sign_agreement,
      sign_protege_date,
      sign_protege_name,
      sign_protege_title
    }

    const protegeStatus = {
      protege_arg_status,
      protege_firm_participated,
      protege_submitted,
      period_of_prev_agreement,
      prev_mentor_firm_name,
      credit_direct_reimbursed,
      protege_highest_selected_section,
      sponsoring_military_dept_agency
    }

    const firmData = {
      firm_annual_gross_revenue,
      firm_number_of_employees,
      firm_percent_owned,
      firm_year_established,
      legal_business_name,
      company_address,
      company_city,
      company_state,
      company_zip,
      company_phone,
      company_fax,
      cage_code,
      duns_number,
      naics_codes
    }

    const historicalBackground = {
      historical_agreement_background_file,
      historical_background_explanation,
      historical_background_file
    }

    const signingAgreements = {
      reporting_requirements,
      review_agreement
    }

    const terminationData = {
      termination_date: termination_date && dateFormat(termination_date, 'mm/dd/yyyy'),
      termination_reason
    }

    const dodContracts = {
      fiscal_year1,
      number_1,
      funded_contact_value1,
      dollar_amount_recieved1,
      fiscal_year2,
      number_2,
      funded_contact_value2,
      dollar_amount_recieved2,
      fiscal_year3,
      number_3,
      funded_contact_value3,
      dollar_amount_recieved3
    }

    const dodPrimeContracts = {
      fiscal_year_prime1,
      number_prime_1,
      funded_contact_value_prime1,
      dollar_amount_recieved_prime1,
      fiscal_year_prime2,
      number_prime_2,
      funded_contact_value_prime2,
      dollar_amount_recieved_prime2,
      fiscal_year_prime3,
      number_prime_3,
      funded_contact_value_prime3,
      dollar_amount_recieved_prime3
    }

    const federalAgencyContracts = {
      fed_fiscal_year_prime_1,
      fed_number_prime_1,
      fed_dollar_amount_recieved_prime_1,
      fed_funded_contract_value_prime_1,
      fed_fiscal_year_prime_2,
      fed_number_prime_2,
      fed_dollar_amount_recieved_prime_2,
      fed_funded_contract_value_prime_2
    }

    const federalAgencySubcontracts = {
      fed_fiscal_year_sub_1,
      fed_number_sub_1,
      fed_funded_contract_value_sub_1,
      fed_dollar_amount_recieved_sub_1,
      fed_fiscal_year_sub_2,
      fed_number_sub_2,
      fed_funded_contract_value_sub_2,
      fed_dollar_amount_recieved_sub_2
    }

    const certifications = {
      certified_small_business,
      sba_8a,
      sba_8a_graduated_date: sba_8a_graduated_date && dateFormat(sba_8a_graduated_date, 'mm/dd/yyyy'),
      sba_cgp,
      sba_hz,
      sba_nog,
      sba_sdb,
      sba_sde,
      sba_vosb,
      sba_wosb
    }

    const protegeAgreementDetails = {
      'Compnay Details': { ...companyInfoData },
      'MPP Contact (Protégé)': { ...mppContact },
      'DCMA Contact': { ...dcmaContact },
      'Authorized Protégé POC Signee': { ...authorizedProtegePOCSignee },
      'Signed Protégé': { ...signedProtege },
      'Protégé Status': { ...protegeStatus },
      'Firm Information': { ...firmData },
      'Historical Background': { ...historicalBackground },
      'Signing Agreements': { ...signingAgreements },
      'Termination Data': { ...terminationData },
      'DoD Contracts': { ...dodContracts },
      'DoD Prime Contracts': { ...dodPrimeContracts },
      'Certifications': { ...certifications },
      'Federal Agency Contracts': { ...federalAgencyContracts },
      'Federal Agency Subcontracts': { ...federalAgencySubcontracts },
      'ACO Contact': { ...acoContact },
      'CAO Contact': { ...caoContact }
    }

    setProtegeAgreementData(protegeAgreementDetails)
  }

  const GetMentorApplicationData = async () => {
    const userInfoData = await getMentorApplicationData(uuid)
    const contactInfo = userInfoData && userInfoData[0]
    const mentorAgreementData = await getMentorAgreementData(currentAgreementId)
    const status = mentorAgreementData && mentorAgreementData.status
    const apiData = mentorAgreementData && mentorAgreementData.apiData
    const agreementData = await getAgreementData(currentAgreementId)
    const protegeAgreementData =
      agreementData &&
      agreementData.apiData &&
      agreementData.apiData.protege_agreement &&
      agreementData.apiData.protege_agreement[0]

    setProtegeAgreeementDetailsData(protegeAgreementData)

    const mentorProtegeAgrStatus =
      agreementData &&
      agreementData.apiData &&
      agreementData.apiData.agreement &&
      agreementData.apiData.agreement[0] &&
      agreementData.apiData.agreement[0].mentor_protege_agr_status

    const reviewerComments =
      agreementData &&
      agreementData.apiData &&
      agreementData.apiData.agreement &&
      agreementData.apiData.agreement[0] &&
      agreementData.apiData.agreement[0].status_reason

    const protegeAgrStatus =
      agreementData &&
      agreementData.apiData &&
      agreementData.apiData.protege_agreement &&
      agreementData.apiData.protege_agreement[0] &&
      agreementData.apiData.protege_agreement[0].protege_arg_status

    const realMentorAgreement =
      agreementData &&
      agreementData.apiData &&
      agreementData.apiData.mentor_agreement &&
      agreementData.apiData.mentor_agreement[0] &&
      agreementData.apiData.mentor_agreement[0]

    const mentorProtegeAgreementData =
      agreementData &&
      agreementData.apiData &&
      agreementData.apiData.agreement &&
      agreementData.apiData.agreement[0]

    setAllMentorProtegeAgreementData(mentorProtegeAgreementData)

    const developmentalAssistanceFiles =
      realMentorAgreement && realMentorAgreement.developmental_assistance_file

    setDevelopmentAssistanceFile(developmentalAssistanceFiles)
    setProtegeAgreementStatus(protegeAgrStatus)
    setMentorProtegeAgremeementStatus(mentorProtegeAgrStatus)
    setReviewerComments(reviewerComments)

    const historicalFiles =
      realMentorAgreement && realMentorAgreement['historical_background']

    setHistoricalBackgroundFile(historicalFiles)
    setAllMentorAppInfo(
      userInfoData && userInfoData.apiData && userInfoData.apiData[0]
    )

    setLatestMentorAgreementData(realMentorAgreement)

    if (status === 401) {
      localStorage.removeItem('user_info')
      localStorage.removeItem('login_time')
      localStorage.removeItem('session_time')
      localStorage.removeItem('logged_in')
      history.push('/')
    }
    const firstMentorAgreement = apiData && apiData[0]
    firstMentorAgreement && setMentorAgreementData(firstMentorAgreement)
    setFirstMentorAgreementStatus(
      firstMentorAgreement ? firstMentorAgreement['mentor_arg_status'] : null
    )
    setMentorAppInfo(contactInfo)
    initialize({
      poc_name: `${contactInfo && contactInfo.contact_first_name} ${contactInfo && contactInfo.contact_last_name
        }`,
      poc_title: contactInfo && contactInfo.contact_title,
      poc_address: contactInfo && contactInfo.contact_address,
      poc_tel: contactInfo && contactInfo.contact_phone,
      poc_fax: contactInfo && contactInfo.contact_fax,
      poc_email: contactInfo && contactInfo.contact_email,
      company_name: contactInfo && contactInfo.company_name,
      company_address: contactInfo && contactInfo.company_address,
      company_phone: contactInfo && contactInfo.company_phone,
      company_city: contactInfo && contactInfo.company_city,
      company_state: contactInfo && contactInfo.company_state,
      company_zip: contactInfo && contactInfo.company_zip,
      company_fax: contactInfo && contactInfo.company_fax,
      company_duns_number: contactInfo && contactInfo.company_duns_number,
      company_cage_code: contactInfo && contactInfo.company_cage_code,
      company_website: contactInfo && contactInfo.company_website,
      was_small_disadvantaged_business: 'false',
      was_woman_owned_small_business: 'true',
      company_graduated_8a_program: 'false',
      graduated_8a_program_on:
        contactInfo && contactInfo.graduated_8a_program_on,
      ...firstMentorAgreement
    })
  }
  
  useEffect(() => {
    let isActive = true

    if ((isActive && latestState === 0) || latestState >= 8) {
      GetMentorApplicationData()
    }

    return () => {
      isActive = false
    }
  }, [activeState])


  useEffect(() => {
    GetMentorApplicationData()
  }, [showPOCEditModal])

  const validPointOfContacts = validatePointOfContacts(mentorAgreement)
  const validDevelopmentalAssistance = mentorAgreeemntRealData
    ? true
    : validateDevelopmentalAssistance(
      mentorAgreement,
      developmentAssistanceFile
    )

  const validAgreementDetails = valdiateAgreementDetails(mentorAgreement)
  const validEstimatedCost =
    mentorAgreement &&
    mentorAgreement['hbcu_year_1'] &&
    mentorAgreement['employee_labor_year_1'] &&
    mentorAgreement['direct_cost_year_1']
  const validatePeriodOfPerformance =
    mentorAgreement && mentorAgreement['number_of_months']
  const validMentorProtegeContracts = validateMentorProtegeContracts(
    mentorAgreement
  )
  const validMentorFirm = true
  const validHistoricalBackground = true
  const validReviewAgreement = true
  const validMentorAgreementSubmission = firstMentorAgreementStatus === 'complete'
  const inValidSections = [
    validPointOfContacts,
    validDevelopmentalAssistance,
    validAgreementDetails,
    validEstimatedCost,
    validatePeriodOfPerformance,
    validMentorProtegeContracts,
    validMentorFirm,
    validHistoricalBackground,
    validReviewAgreement
  ].filter((section) => !section).length

  const agreementHeaderList = [
    {
      name: 'Agreement Details',
      valid: validAgreementDetails
    },
    {
      name: 'Period of Performance',
      valid: validatePeriodOfPerformance
    },
    {
      name: 'Estimated Costs',
      valid: validEstimatedCost
    },
    {
      name: 'Mentor Company',
      valid: validMentorFirm
    },
    {
      name: 'Mentor Historical Background',
      valid: validHistoricalBackground
    },
    {
      name: 'Mentor/Protégé Contracts',
      valid: validMentorProtegeContracts
    },
    {
      name: 'Points of Contact',
      valid: validPointOfContacts
    },
    {
      name: 'Developmental Assistance',
      valid: validDevelopmentalAssistance
    },
    {
      name: 'Review Mentor Information',
      valid: validReviewAgreement
    },
    {
      name: 'Review & Submit Agreement',
      valid: validMentorAgreementSubmission
    }
  ]

  const onFileChange = (value, hook) => {
    hook(value)
  }

  const UpdateContaractAwardNumber = (useAward, awardName) => {
    useAward(awardName + 1)
  }

  const isFormValid = () => {
    return agreementHeaderList
      .filter(arr => arr.name !== 'Review & Submit Agreement')
      .find(
        (agreementSection) => !agreementSection.valid
      )
  }

  const submitAgreement = async () => {
    if (showPOCEditModal) {
      return
    }
    activeState < 8 &&
      isFormValid() === undefined &&
      SubmitMentorAgreement(false)
    activeState === 7 && isFormValid() !== undefined && setAgreementError(true)
    activeState === 9 &&
      isFormValid() === undefined &&
      (await SubmitMentorAgreement(true))
    activeState === 9 &&
      isFormValid() === undefined &&
      sendEsignAgreementReview(currentAgreementId)
    activeState === 0 && setAgreementType(true)
    activeState === 5 && setContractsSubmitted(true)
    activeState === 6 && setPocSubmitted(true)
    activeState < 7 && SetActiveState()
    activeState > 6 && activeState < 9 && isFormValid() === undefined && SetActiveState()

    checkNoEditFilesMode()
  }

  const saveMentorAgreement = () => {
    SubmitMentorAgreement(false)
  }

  const SubmitMentorAgreement = async (submit) => {
    const mentorHighestSelectedSection =
      mentorAgreementData &&
        parseInt(mentorAgreementData['mentor_highest_selected_section'])
        ? parseInt(mentorAgreementData['mentor_highest_selected_section'])
        : 0

    await submitMentorAgreement({
      submit: submit,
      mentorAgreement: mentorAgreement,
      agreementId: currentAgreementId,
      developmental_assistance_file: developmentAssistanceFile,
      companyPOC: companyPOC,
      highestState:
        latestState >= mentorHighestSelectedSection
          ? latestState
          : mentorHighestSelectedSection
    })

    const { apiData } = await getMentorAgreementData(currentAgreementId)
    const firstMentorAgreement = apiData && apiData[0]
    firstMentorAgreement && setMentorAgreementData(firstMentorAgreement)

    setLatestMentorAgreementData(firstMentorAgreement)
    checkNoEditFilesMode()
    submit && history.push('/dashboard')
  }

  const SetMinusActiveState = (idx) => {
    useActiveState(idx !== undefined ? idx : activeState - 1)
    window.scrollTo(0, 0)
  }


  const SetActiveStateZero = () => {
    useActiveState(0)
    window.scrollTo(0, 0)
  }

  const setCloseSideBarHandler = closeSideBarHandler => {
    closeSideBarHandlerRef.current = closeSideBarHandler
  }

  const closeSideBar = () => {
    closeSideBarHandlerRef.current()
    setTimeout(() => setSidebarOpen(false), 250)
  }

  const getLeftCollapseExpandSidebarCtrl = () => {
    return (
      <img
        tabIndex="0"
        className="side-bar-img-btn focusable-item"
        style={{ ...sidebarLeftImageStyles }}
        src={leftNavSwitch}
        onClick={() => setSidebarOpen(true)}
        onKeyDown={keydownHandler}
        aria-label="Open Right Side Panel"
      />
    )
  }

  const getRightCollapseExpandSidebarCtrl = () => {
    return (
      <img
        tabIndex="0"
        className="side-bar-img-btn focusable-item"
        style={{ ...sidebarRightImageStyles }}
        src={rightNavSwitch}
        onClick={closeSideBar}
        onKeyDown={keydownHandler}
        aria-label="Close Right Side Panel"
      />
    )
  }

  const getSidebarContent = () => {
    return (
      <div style={{ width: 700, height: '100%' }}>
        {sidebarOpen && getRightCollapseExpandSidebarCtrl()}
        <div style={{ ...sidebarStyles }}>
          <DisplayProtegeAgreementData
            protegeAgreementData={protegeAgreementData}
            closeSideBarFn={closeSideBar}
          />
        </div>
      </div>
    )
  }

  const ViewFile = async (fileId, name) => {
    const data = await getFileData(fileId)
    const newBlob = new Blob([data], { type: data && data.type })
    const file = window.URL.createObjectURL(newBlob, { oneTimeOnly: true })
    FileSaver.saveAs(file, name)
  }

  const mentorHighestSelectedSection =
    mentorAgreementData &&
      parseInt(mentorAgreementData['mentor_highest_selected_section'])
      ? parseInt(mentorAgreementData['mentor_highest_selected_section'])
      : 0

  const [noEditingFiles, setNoEditingFiles] = useState(false)

  const checkNoEditFilesMode = () => {
    if (
      activeState < 9 &&
      mentorAgreement &&
      firstMentorAgreementStatus === 'complete' &&
      mentorProtegeAgreementStatus !== 'declined'
    ) {
      setNoEditingFiles(true)
    }
  }

  const displayPOCEditModal = () => {
    setShowPOCEditModal(!showPOCEditModal)
  }

  const backButtonEnterKeyHandler = event => {
    const keycode = event.key
    if (keycode === 'Enter') {
      SetMinusActiveState()
    }
  }

  const completeMentorAgreement = firstMentorAgreementStatus === 'complete'

  return (
    <div className='mentor-container mt-0 mb-0'>
      {activeState !== 9 &&
        <SidebarComponent
          openState={sidebarOpen}
          sidebarRootId={'protegeSectionSidePanel'}
          isSideBarOnLeft={true}
          sidebarContent={protegeAgreementData && getSidebarContent()}
          setCloseSideBarHandler={setCloseSideBarHandler}
          sideBarText={'Protégé Section'}
        />}


      {(activeState !== 9) && !sidebarOpen && getLeftCollapseExpandSidebarCtrl()}
      <div className='main mb-0'>
        <form onSubmit={handleSubmit(submitAgreement)}>
          <div className='row' role={sidebarOpen ? "text" : ''}>
            <aside className='left-menu scroll-height-100 pr-3 vertical-border-agreement pt-5'>
              <ul className='scroll-height-100 hand-hover'>
                {agreementHeaderList.map((item, idx) => (
                  <li
                    key={idx}
                    tabIndex='0'
                    onClick={
                      mentorHighestSelectedSection >= idx &&
                        (idx < 8 || mentorAgreementData)
                        ? () => SetActiveState(idx)
                        : null
                    }
                    onKeyDown={keydownHandler}
                    className={
                      mentorAgreeemntRealData && idx === activeState
                        ? 'ml-4 view-active focusable-item'
                        : item.valid &&
                          idx === activeState &&
                          !mentorAgreeemntRealData
                          ? 'select-active-valid valid'
                          : item.valid &&
                            !mentorAgreeemntRealData &&
                            mentorHighestSelectedSection >=
                            (idx === 0 ? idx : idx - 1)
                            ? 'valid'
                            : idx === activeState &&
                              !item.valid &&
                              agreementError &&
                              !mentorAgreeemntRealData
                              ? 'view-active'
                              : idx === activeState
                                ? 'select-active ml-2'
                                : !item.valid && agreementError
                                  ? ''
                                  : 'ml-4'
                    }
                  >
                    {item.valid &&
                      mentorHighestSelectedSection >=
                      (idx === 0 ? idx : idx - 1) && (
                        <span className='mr-2' aria-label="Completed">
                          <FontAwesomeIcon icon={faCheckCircle} color='green' />
                        </span>
                      )}
                    {!item.valid && agreementError && idx !== 10 && (
                      <span className='mr-2'>
                        <FontAwesomeIcon
                          icon={faExclamationCircle}
                          color='red'
                        />
                      </span>
                    )}
                    {item.name}
                  </li>
                ))}
              </ul>
            </aside>
            <div className='col-md-9 pt-5'>
              {activeState > 0 &&
                <span
                  tabIndex='0'
                  role='button'
                  className='ml-3 hand-hover focusable-item'
                  onKeyDown={backButtonEnterKeyHandler}
                  onClick={() => {
                    SetMinusActiveState()
                  }}
                >
                  <FontAwesomeIcon icon={faAngleLeft} /> Back
                  <hr />
                </span>}
              {activeState >= 0 && (
                <>
                  {agreementError && inValidSections > 0 && (
                    <section id="error-list" className='agreement-errors-box col-md-7 mb-4 ml-3'>
                      <h5 className="ml-4 mt-2"><FontAwesomeIcon icon={faExclamationCircle} color='#b20000' /> Issues Found </h5>
                      <p className="mb-n1 ml-4">Please review  and correct the following issues before continuing.</p>
                      <ul className="pt-1 ml-n3 hand-hover">
                        {!validAgreementDetails &&
                          <li onClick={() => SetActiveState(0)}>Agreement Details</li>}
                        {!validatePeriodOfPerformance &&
                          <li onClick={() => SetActiveState(1)}>Period Of Performance</li>}
                        {!validEstimatedCost &&
                          <li onClick={() => SetActiveState(2)}>Estimated Cost</li>}
                        {!validMentorFirm &&
                          <li onClick={() => SetActiveState(3)}>Company Information</li>}
                        {!validHistoricalBackground &&
                          <li onClick={() => SetActiveState(4)}>Historical Background</li>}
                        {!validMentorProtegeContracts &&
                          <li onClick={() => SetActiveState(5)}>Mentor/Protege Contracts</li>}
                        {!validPointOfContacts &&
                          <li onClick={() => SetActiveState(6)}>Point Of contacts</li>}
                        {!validDevelopmentalAssistance &&
                          <li onClick={() => SetActiveState(7)}>Developmental Assistance</li>}
                      </ul>
                    </section>
                  )}
                </>
              )}
              <main id='main' className='mt-0'>
                <h1 className='ml-3 agreement-main-header'>
                  {' '}
                  MPP Agreement (Mentor)
                </h1>
                {activeState === 0 && (
                  <AgreementDetails
                    mentorAgreement={mentorAgreement}
                    submitted={agreementType}
                    mentorAgreementData={mentorAgreeemntRealData}
                    mentorProtegeAgreementStatus={mentorProtegeAgreementStatus}
                    completeMentorAgreement={completeMentorAgreement}
                  />
                )}

                {activeState === 1 && (
                  <PeriodOfPerformance
                    mentorAgreement={mentorAgreement}
                    mentorAgreementData={mentorAgreeemntRealData}
                    mentorProtegeAgreementStatus={mentorProtegeAgreementStatus}
                    completeMentorAgreement={completeMentorAgreement}
                  />
                )}
                {activeState === 2 && (
                  <EstimatedCost
                    mentorAgreement={mentorAgreement}
                    mentorAgreementData={mentorAgreeemntRealData}
                    mentorProtegeAgreementStatus={mentorProtegeAgreementStatus}
                    initialize={initialize}
                    completeMentorAgreement={completeMentorAgreement}
                  />
                )}
                {activeState === 3 && (
                  <MentorFirm
                    stateOptions={statesInfo}
                    mentorAgreement={mentorAgreement}
                    mentorAgreementData={mentorAgreeemntRealData}
                    mentorProtegeAgreementStatus={mentorProtegeAgreementStatus}
                    completeMentorAgreement={completeMentorAgreement}
                  />
                )}
                {activeState === 4 && (
                  <HistoricalBackground
                    mentorAgreement={mentorAgreement}
                    mentorAppInfo={mentorAppInfo}
                    mentorAgreementData={mentorAgreeemntRealData}
                    mentorProtegeAgreementStatus={mentorProtegeAgreementStatus}
                    historicalBackgroundFile={historicalBackgroundFile}
                    allMentorAppInfo={allMentorAppInfo}
                    noEditingFiles={noEditingFiles}
                    handleHistoricalFiles={handleHistoricalFiles}
                    latestMentorAgreementData={latestMentorAgreementData}
                    agreementId={currentAgreementId}
                    completeMentorAgreement={completeMentorAgreement}
                  />
                )}
                {activeState === 5 && (
                  <MentorProtegeContracts
                    mentorAgreement={mentorAgreement}
                    subContractAwardNumber={subContractAwardNumber}
                    useSubContractAwardNumber={useSubContractAwardNumber}
                    federalContractAward={federalContractAward}
                    useFederalContractAward={useFederalContractAward}
                    potentialSubcontractAward={potentialSubcontractAward}
                    usePotentialContractAward={usePotentialContractAward}
                    UpdateContaractAwardNumber={UpdateContaractAwardNumber}
                    initialize={initialize}
                    mentorAgreementData={mentorAgreeemntRealData}
                    mentorProtegeAgreementStatus={mentorProtegeAgreementStatus}
                    submitted={contractsSubmitted}
                    completeMentorAgreement={completeMentorAgreement}
                  />
                )}
                {activeState === 6 && (
                  <PointOfContacts
                    userType={"mentor"}
                    mentorAgreement={mentorAgreement}
                    mentorAgreementData={mentorAgreeemntRealData}
                    displayPOCEditModal={displayPOCEditModal}
                    showPOCEditModal={showPOCEditModal}
                    initialize={initialize}
                    stateOptions={statesInfo}
                    protegeAgreementDataDetails={protegeAgreementDataDetails}
                    mentorProtegeAgreementStatus={mentorProtegeAgreementStatus}
                    submitted={pocSubmitted}
                    completeMentorAgreement={completeMentorAgreement}
                  />
                )}
                {activeState === 7 && (
                  <DevelopmentalAssistance
                    mentorAgreement={mentorAgreement}
                    mentorAgreementData={mentorAgreeemntRealData}
                    protegeAgreementData={protegeAgreementDataDetails}
                    mentorProtegeAgreementStatus={mentorProtegeAgreementStatus}
                    handleDevAssistFiles={handleDevAssistFiles}
                    agreementId={currentAgreementId}
                    agreement_type={agreement_type}
                    initialFiles={developmentAssistanceFile}
                    developmentalAssistanceFile={developmentAssistanceFile}
                    noEditingFiles={noEditingFiles}
                    latestMentorAgreementData={latestMentorAgreementData}
                    completeMentorAgreement={completeMentorAgreement}
                  />
                )}
                {activeState === 8 && (
                  <ReviewAgreement
                    mentorAgreement={mentorAgreement}
                    mentorFirm={mentorFirm}
                    mentorName={mentorName}
                    protegeAgreementData={protegeAgreementDataDetails}
                    mentorAgreementData={mentorAgreeemntRealData}
                    mentorProtegeAgreementStatus={mentorProtegeAgreementStatus}
                    docusignEnvelope_id={docusignEnvelope_id}
                    developmentalAssistanceFile={developmentAssistanceFile}
                    handleDevAssistFiles={handleDevAssistFiles}
                    agreementId={currentAgreementId}
                    agreement_type={agreement_type}
                    historicalBackgroundFile={historicalBackgroundFile}
                    allMentorAppInfo={allMentorAppInfo}
                    isMentor={true}
                    allMentorProtegeAgreementData={allMentorProtegeAgreementData}
                    latestMentorAgreementData={latestMentorAgreementData}
                    completeMentorAgreement={completeMentorAgreement}
                  />
                )}

                {activeState === 9 && (
                  <MentorProtegeAgreementSummary
                    mentorAgreement={mentorAgreement}
                    mentorAgreementFileData={mentorAgreementData}
                    setActiveState={SetActiveState}
                    mentorAgreementData={mentorAgreeemntRealData}
                    submitAgreement={submitAgreement}
                    protegeAgreementData={protegeAgreementDataDetails}
                    setActiveStateZero={SetActiveStateZero}
                    mentorProtegeAgreementStatus={mentorProtegeAgreementStatus}
                    protegeAgreementStatus={protegeAgreementStatus}
                    docusignEnvelope_id={docusignEnvelope_id}
                    historicalBackgroundFile={historicalBackgroundFile}
                    developmentalAssistanceFile={developmentAssistanceFile}
                    allMentorAppInfo={allMentorAppInfo}
                    reviewerComments={reviewerComments}
                    allMentorProtegeAgreementData={allMentorProtegeAgreementData}
                    completeMentorAgreement={completeMentorAgreement}
                  />
                )}

                {activeState < 7 &&
                  mentorAgreement &&
                  (firstMentorAgreementStatus !== 'complete' ||
                    mentorProtegeAgreementStatus === 'declined') && (
                    <button
                      className='btn btn-primary mt-3 ml-3 mb-5 focusable-item'
                      onClick={() => saveMentorAgreement()}
                    >
                      Save and Continue{' '}
                      <span className='ml-2'>
                        <FontAwesomeIcon icon={faAngleRight} />
                      </span>
                    </button>
                  )}

                {activeState < 9 &&
                  mentorAgreement &&
                  firstMentorAgreementStatus === 'complete' &&
                  mentorProtegeAgreementStatus !== 'declined' && (
                    <button
                      type='button'
                      className='btn btn-primary mt-3 my-5 ml-3 px-4 focusable-item'
                      onClick={() => SetActiveState()}
                    >
                      Next
                      <span className='ml-2'>
                        <FontAwesomeIcon icon={faAngleRight} />
                      </span>
                    </button>
                  )}
                {activeState === 7 &&
                  !mentorAgreeemntRealData &&
                  (firstMentorAgreementStatus !== 'complete' ||
                    mentorProtegeAgreementStatus === 'declined') && (
                    <span>
                      <button
                        type='submit'
                        className='btn btn-primary mb-5 focusable-item'
                      >
                        {' '}
                        Save and Continue <FontAwesomeIcon icon={faAngleRight} />
                      </button>
                    </span>
                  )}
                {activeState === 8 &&
                  !mentorAgreeemntRealData &&
                  firstMentorAgreementStatus !== 'complete' && (
                    <div className='mt-4 mb-5'>
                      <span>
                        <button
                          className='btn btn-primary ml-3 focusable-item'
                          onClick={() => saveMentorAgreement()}
                        >
                          Save and Continue{' '}
                          <span className='ml-2'>
                            <FontAwesomeIcon icon={faAngleRight} />
                          </span>
                        </button>
                      </span>
                      <span>
                        <button
                          className='btn btn-white ml-3 focusable-item'
                          onClick={() => SetActiveStateZero()}
                        >
                          Edit Information
                        </button>
                      </span>
                    </div>
                  )}
              </main>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

MentorAgreement = reduxForm({
  enableReinitialize: true,
  form: 'mentorAgreement'
})(MentorAgreement)

export default MentorAgreement
