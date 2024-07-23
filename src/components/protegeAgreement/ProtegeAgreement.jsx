/*eslint-disable eqeqeq*/
import React, { useState, useEffect, useRef } from 'react'
import { reduxForm } from 'redux-form'
import { useSelector } from 'react-redux'
import dateFormat from 'dateformat'
import './protegeAgreement.scss'
import SidebarComponent from '../commonComponents/SidebarComponent'
import validateFirmInfo from './validateFirmInfo'
import getStates from '../mentor/mentorApplication/getStates.action'
import FirmInformation from './FirmInformation'
import PointOfContact from './PointOfContact'
import ProgramParticipation from './ProgramParticipation'
import validatePointOfContact from './validatePointOfContact'
import validateProgramParticipation from './validateProgramParticipation'
import HistoricalBackground from './HistoricalBackground'
import Certificaitons from './Certifications'
import validateCertifications from './validateCertifications'
import DoDContracts from './DoDContracts'
import DevelopmentAssistance from './DevelopmentAssistance'
import ReviewAgreement from './ReviewAgreement'
import validateDoDContracts from './validateDoDContracts'
import DisplayMentorAgreementData from './DisplayMentorAgreementData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faAngleLeft,
  faAngleRight,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'
import submitProtegeAgreementAction from './submitProtegeAgreement.action'
import getProtegeAgeementData from '../protegeDashboard/getProtegeAgreementData.action'
import getAgreementData from '../getAgreementData.action'
import { useHistory } from 'react-router-dom'
import {
  sidebarStyles,
  sidebarLeftImageStyles,
  sidebarRightImageStyles
} from '../commonComponents/sidebarStyles'
import _ from 'lodash'
import { keydownHandler } from '../commonComponents/utility'
import rightNavSwitch from '../../assets/images/RightNav_switch.png'
import leftNavSwitch from '../../assets/images/LeftNav_switch.png'

function ProtegeAgreement({ handleSubmit, initialize }) {
  const localStorage = window.localStorage
  const history = useHistory()
  const userInfo = useSelector((state) => state.currentUserInfo)
  const mentorFirm =
    userInfo &&
    userInfo.agreements &&
    userInfo.agreements[0] &&
    userInfo.agreements[0].mentor_company_name
  const userId = useSelector(
    (state) => state && state.currentUserInfo && state.currentUserInfo.uuid
  )
  const findProtegeAgreement =
    userInfo &&
    userInfo.agreements &&
    userInfo.agreements.find((agreement) => agreement.protege_id === userId)

  const agreementId = findProtegeAgreement && findProtegeAgreement.uuid

  const protegeName = userInfo
    ? `${userInfo.first_name} ${userInfo.last_name}`
    : ''
  const [activeState, useActiveState] = useState(0)
  const [latestState, useLatestState] = useState(0)
  const [statesInfo, useStatesInfo] = useState(null)
  const [
    firstProtegeAgreementStatus,
    setFirstProtegeAgreementStatus
  ] = useState(null)
  const [protegeAgreementData, setProtegeAgreementData] = useState(null)
  const [agreementError, setAgreementError] = useState(false)
  const [capabilitySectionFile, setCapabilitySectionFile] = useState(null)
  const [developmentAssistanceFile, setDevelopmentAssistanceFile] = useState(
    null
  )
  const [historicalBackgroundFile, setHistoricalBackgroundFile] = useState(null)
  const [reviewerFiles, setReviewerFiles] = useState(null)
  const [showPOCEditModal, setShowPOCEditModal] = useState(false)

  const protegeAgreement = useSelector(
    (state) =>
      state.form &&
      state.form.protegeAgreement &&
      state.form.protegeAgreement.values
  )
  const currentUserInfo = useSelector((state) => state.currentUserInfo)
  const [checkFieldError, setCheckFieldError] = useState(null)
  const [
    protegeHighestSelectedSection,
    setProtegeHighestSelectedSection
  ] = useState(null)
  const [
    smallDisadvantagedBusinessDetails,
    setSmallDisadvantagedBusinessDetails
  ] = useState([
    {
      name: 'sba_wosb',
      label: 'Is your firm certified as a women-owned small business (WOSB)?',
      value: false
    },
    {
      name: 'sba_vosb',
      label: 'Is your firm certified as a veteran-owned small business?',
      value: false
    },
    {
      name: 'sba_hz',
      label: 'Is your firm a HUBZone Certified Company (HZ)?',
      value: false
    },
    {
      name: 'sba_asmp',
      label:
        'Is your firm currently enrolled in the SBA All Small Mentor-Protégé Program?',
      value: false
    },
    {
      name: 'sba_8a',
      label: 'Has your firm Participated in the 8(a) program?',
      value: false
    }
  ])
  const validFirm = validateFirmInfo(protegeAgreement, protegeAgreementData)
  const validPointOfContact = validatePointOfContact(
    protegeAgreement,
    protegeAgreementData
  )
  const validProgramParticipation = validateProgramParticipation(
    protegeAgreement
  )
  const validHistoricalBackground =
    (protegeAgreement &&
      protegeAgreement['historical_background_explanation']) ||
    (protegeAgreement &&
      protegeAgreement['historical_agreement_background_file'])

  const validateProtegeSubmssion = firstProtegeAgreementStatus === 'complete'

  const validCertifications = validateCertifications(protegeAgreement)
  const validDoDContracts = validateDoDContracts(protegeAgreement)
  const [firmSubmitted, setFirmSubmitted] = useState(false)
  const [pocSubmitted, setPocSubmitted] = useState(false)
  const [programsubmitted, setProgramSumbitted] = useState(false)
  const [certificationSubmitted, setCertificationSubmitted] = useState(false)
  const [contractsSubmitted, setContractsSubmitted] = useState(false)
  const [saveSlider, useSaveSlider] = useState(false)
  const [mentorAgreementData, setMentorAgreementData] = useState()
  const [allMentorAgreementData, setAllMentorAgreementData] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const validDevelopmentalAssistance = true
  const validReveiwAgreement = true
  const [allProtegeAgreementData, setAllProtegeAgreementData] = useState(null)
  const [
    allMentorProtegeAgreementData,
    setAllMentorProtegeAgreementData
  ] = useState(null)

  const closeSideBarHandlerRef = useRef()

  const inValidSections = [
    validFirm,
    validPointOfContact,
    validProgramParticipation,
    validHistoricalBackground,
    validCertifications,
    validDoDContracts,
    validDevelopmentalAssistance,
    validReveiwAgreement
  ].filter((section) => !section).length

  const agreementHeaderList = [
    {
      name: 'Company Information',
      valid: validFirm
    },
    {
      name: 'Points of Contact',
      valid: validPointOfContact
    },
    {
      name: 'Previous Program Participation',
      valid: validProgramParticipation
    },
    {
      name: 'Historical Background',
      valid: validHistoricalBackground
    },
    {
      name: 'Certifications',
      valid: validCertifications
    },
    {
      name: 'Mentor/Protégé Contracts',
      valid: validDoDContracts
    },
    {
      name: 'Developmental Assistance',
      valid: validDevelopmentalAssistance
    },
    {
      name: 'Review & Submit',
      valid: validateProtegeSubmssion
    }
  ]

  const GetProtegeAgreementData = async () => {
    const protegeAgreement = await getProtegeAgeementData(agreementId)
    const { status, apiData } = protegeAgreement

    const redirectToAgreement = JSON.parse(
      localStorage.getItem('routeToAgreement')
    )

    localStorage.removeItem('routeToAgreement')

    setProtegeHighestSelectedSection(
      apiData && apiData[0] && apiData[0]['protege_highest_selected_section']
    )
    if (status === 401) {
      localStorage.removeItem('user_info')
      localStorage.removeItem('login_time')
      localStorage.removeItem('session_time')
      localStorage.removeItem('logged_in')
      history.push('/')
    }
    const firstProtegeAgreement = protegeAgreement && apiData && apiData[0]
    setFirstProtegeAgreementStatus(
      protegeAgreement ? firstProtegeAgreement['protege_arg_status'] : null
    )
    setProtegeAgreementData(
      protegeAgreement &&
        firstProtegeAgreement['protege_arg_status'] === 'complete'
        ? firstProtegeAgreement
        : null
    )
    initialize({
      ...firstProtegeAgreement
    })

    if (activeState === 1) {
      return
    }
    SetActiveState(
      protegeAgreement &&
        firstProtegeAgreement['protege_arg_status'] === 'complete'
        ? 7
        : redirectToAgreement
          ? 1
          : 0
    )

    const historicalFiles =
      apiData & apiData[0] && apiData[0].historical_agreement_background_file

    const capabilityFile =
      apiData & apiData[0] && apiData[0].capability_section_file

    setHistoricalBackgroundFile(historicalFiles)
    setCapabilitySectionFile(capabilityFile)
  }

  useEffect(() => {
    StatesData()
  }, [])

  useEffect(() => {
    GetProtegeAgreementData()
    UpdateHistoricalFiles()
  }, [userId, showPOCEditModal])

  useEffect(() => {
    if (agreementId) {
      MentorAgreement(agreementId)
    }
  }, [agreementId, showPOCEditModal])

  // const [protegeAgrUuid, setProtegeAgrUuid] = useState(null)
  const [mentorAgrUuid, setMentorAgrUuid] = useState(null)
  const [mentorProtegeAgrUuid, setMentorProtegeAgrUuid] = useState(null)

  useEffect(() => {
    const { agreements } = currentUserInfo
    if (agreements) {
      const agreement = agreements[0]
      const { uuid } = agreement
      MentorAgreement(uuid)
    }
  }, [])

  // docusign envelope id
  const [docusignEnvelope_id, setDocusignEnvelope_id] = useState(null)

  const StatesData = async () => {
    const statesData = await getStates()
    useStatesInfo(statesData)
  }

  const SetActiveState = (idx) => {
    const currentLatestState = idx !== undefined ? idx : activeState + 1
    useActiveState(currentLatestState)
    useLatestState(
      latestState < currentLatestState ? currentLatestState : latestState
    )
    window.scrollTo(0, 0)
  }

  // docusign - get the envelope id
  const MentorAgreement = async (uuid) => {
    const { apiData } = await getAgreementData(uuid)

    const { agreement, mentor_agreement } = apiData
    const agreementData = mentor_agreement[0]
    const agreementDataForMentorAndProtege = agreement[0]
    const docusignId = agreementDataForMentorAndProtege.envelope_id
    setDocusignEnvelope_id(docusignId)

    const mentorProtegeAgreementUuid =
      agreementDataForMentorAndProtege && agreementDataForMentorAndProtege.uuid
    setMentorProtegeAgrUuid(mentorProtegeAgreementUuid)
    const mentorAgreementUuid = agreementData && agreementData.uuid
    setMentorAgrUuid(mentorAgreementUuid)

    const mentorDevelopmentFiles =
      agreementData && agreementData.developmental_assistance_file

    setDevelopmentAssistanceFile(mentorDevelopmentFiles)

    setAllMentorAgreementData(agreementData)

    setAllMentorProtegeAgreementData(agreementDataForMentorAndProtege)

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
      agreement_contact,
      agreement_type,
      agency_dept,
      agreed_to_terms,
      mentor_arg_status,
      number_of_months,
      solicitation_title,
      technology_areas,
      start_date,
      end_date,
      employee_labor_year_1,
      employee_labor_year_2,
      employee_labor_year_3,
      direct_cost_year_1,
      direct_cost_year_2,
      direct_cost_year_3,
      hbcu_year_1,
      hbcu_year_2,
      hbcu_year_3,
      eligibility_explanation,
      historical_background_explanation,
      historical_background,
      developmental_assistance_explanation,
      developmental_assistance_file,
      fed_fiscal_year_subcontract_1,
      federal_number_1,
      fed_dollar_amount_received_1,
      fed_fiscal_year_subcontract_2,
      federal_number_2,
      fed_dollar_amount_received_2,
      fed_fiscal_year_subcontract_3,
      federal_number_3,
      fed_dollar_amount_received_3,
      fiscal_year_federal_agency_1,
      funded_contact_value_federal_agency_1,
      number_federal_agency_1,
      dollar_amount_received_federal_agency_1,
      fiscal_year_federal_agency_2,
      funded_contact_value_federal_agency_2,
      number_federal_agency_2,
      dollar_amount_received_federal_agency_2,
      fiscal_year_federal_agency_3,
      funded_contact_value_federal_agency_3,
      number_federal_agency_3,
      dollar_amount_received_federal_agency_3,
      fiscal_year_potential_subcontract_1,
      funded_contact_value_potential_subcontract_1,
      number_potential_subcontract_1,
      dollar_amount_received_potential_subcontract_1,
      fiscal_year_potential_subcontract_2,
      funded_contact_value_potential_subcontract_2,
      number_potential_subcontract_2,
      dollar_amount_received_potential_subcontract_2,
      fiscal_year_potential_subcontract_3,
      funded_contact_value_potential_subcontract_3,
      number_potential_subcontract_3,
      dollar_amount_received_potential_subcontract_3,
      fiscal_year_subcontract_1,
      funded_contact_value_subcontract_1,
      number_subcontract_1,
      dollar_amount_received_subcontract_1,
      fiscal_year_subcontract_2,
      funded_contact_value_subcontract_2,
      number_subcontract_2,
      dollar_amount_received_subcontract_2,
      fiscal_year_subcontract_3,
      funded_contact_value_subcontract_3,
      number_subcontract_3,
      dollar_amount_received_subcontract_3,
      pco_address,
      pco_state,
      pco_city,
      pco_zip,
      pco_email,
      pco_fax,
      pco_name,
      pco_tel,
      pco_title,
      aco_address,
      aco_city,
      aco_state,
      aco_zip,
      aco_email,
      aco_fax,
      aco_name,
      aco_tel,
      aco_title,
      cao_address,
      cao_city,
      cao_state,
      cao_zip,
      cao_email,
      cao_fax,
      cao_name,
      cao_tel,
      cao_title,
      dcma_address,
      dcma_city,
      dcma_email,
      dcma_name,
      dcma_state,
      dcma_tel,
      dcma_title,
      dcma_zip,
      reporting_requirements,
      review_agreement,
      sign_mentor_date,
      sign_mentor_name,
      sign_mentor_title,
      signee_address,
      signee_city,
      signee_email,
      signee_fax,
      signee_name,
      signee_state,
      signee_tel,
      signee_title,
      signee_zip,
      tech_focus,
      tech_focus_other_text,
      mpp_contact_first_name,
      mpp_contact_last_name,
      mpp_contact_title,
      mpp_contact_phone,
      mpp_contact_fax,
      mpp_contact_email,
      mpp_contact_address,
      mpp_contact_city,
      mpp_contact_state,
      mpp_contact_zip,
      mentor_app,
      total_fed_fiscal_year_subcontract_1,
      total_fed_fiscal_year_subcontract_2,
      total_fed_fiscal_year_subcontract_3,
      total_fed_dollar_amount_received_1,
      total_fed_dollar_amount_received_2,
      total_fed_dollar_amount_received_3,
      total_federal_number_1,
      total_federal_number_2,
      total_federal_number_3
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

    const agreementDetails = {
      agreement_contact,
      agreement_type,
      solicitation_title,
      technology_areas,
      tech_focus,
      tech_focus_other_text,
      agency_dept,
      agreed_to_terms,
      mentor_arg_status
    }

    const performancePeriod = {
      start_date: start_date && dateFormat(start_date, 'mm/dd/yyyy'),
      end_date: end_date && dateFormat(end_date, 'mm/dd/yyyy'),
      number_of_months
    }

    const estimatedCost = {
      employee_labor_year_1,
      employee_labor_year_2,
      employee_labor_year_3,
      direct_cost_year_1,
      direct_cost_year_2,
      direct_cost_year_3,
      hbcu_year_1,
      hbcu_year_2,
      hbcu_year_3
    }

    const federalDodContracts = {
      fed_fiscal_year_subcontract_1,
      federal_number_1,
      fed_dollar_amount_received_1,
      fed_fiscal_year_subcontract_2,
      federal_number_2,
      fed_dollar_amount_received_2,
      fed_fiscal_year_subcontract_3,
      federal_number_3,
      fed_dollar_amount_received_3
    }

    const federalDodContracts2 = {
      total_fed_fiscal_year_subcontract_1,
      total_fed_dollar_amount_received_1,
      total_federal_number_1,
      total_fed_fiscal_year_subcontract_2,
      total_fed_dollar_amount_received_2,
      total_federal_number_2,
      total_fed_fiscal_year_subcontract_3,
      total_fed_dollar_amount_received_3,
      total_federal_number_3
    }

    const eligibility = {
      eligibility_explanation
    }

    const historyBackground = {
      historical_background_explanation,
      historical_background,
      was_small_disadvantaged_business: mentor_app && mentor_app[0].was_small_disadvantaged_business,
      was_woman_owned_small_business: mentor_app && mentor_app[0].was_woman_owned_small_business,
      company_graduated_8a_program: mentor_app && mentor_app[0].company_graduated_8a_program,
      graduated_8a_program_on: mentor_app && mentor_app[0].graduated_8a_program_on
    }

    const developmentalAssistance = {
      developmental_assistance_explanation,
      developmental_assistance_file
    }

    const federalAgencyDetails = {
      fiscal_year_federal_agency_1,
      funded_contact_value_federal_agency_1,
      number_federal_agency_1,
      dollar_amount_received_federal_agency_1,
      fiscal_year_federal_agency_2,
      funded_contact_value_federal_agency_2,
      number_federal_agency_2,
      dollar_amount_received_federal_agency_2,
      fiscal_year_federal_agency_3,
      funded_contact_value_federal_agency_3,
      number_federal_agency_3,
      dollar_amount_received_federal_agency_3
    }

    const primeContractDetails = {
      fiscal_year_potential_subcontract_1,
      funded_contact_value_potential_subcontract_1,
      number_potential_subcontract_1,
      dollar_amount_received_potential_subcontract_1,
      fiscal_year_potential_subcontract_2,
      funded_contact_value_potential_subcontract_2,
      number_potential_subcontract_2,
      dollar_amount_received_potential_subcontract_2,
      fiscal_year_potential_subcontract_3,
      funded_contact_value_potential_subcontract_3,
      number_potential_subcontract_3,
      dollar_amount_received_potential_subcontract_3
    }

    const subContractDetails = {
      fiscal_year_subcontract_1,
      funded_contact_value_subcontract_1,
      number_subcontract_1,
      dollar_amount_received_subcontract_1,
      fiscal_year_subcontract_2,
      funded_contact_value_subcontract_2,
      number_subcontract_2,
      dollar_amount_received_subcontract_2,
      fiscal_year_subcontract_3,
      funded_contact_value_subcontract_3,
      number_subcontract_3,
      dollar_amount_received_subcontract_3
    }

    const pocDetails = {
      pco_address,
      pco_city,
      pco_state,
      pco_zip,
      pco_email,
      pco_fax,
      pco_name,
      pco_tel,
      pco_title
    }

    const acoDetails = {
      aco_address,
      aco_city,
      aco_state,
      aco_zip,
      aco_email,
      aco_fax,
      aco_name,
      aco_tel,
      aco_title
    }

    const caoDetails = {
      cao_address,
      cao_city,
      cao_state,
      cao_zip,
      cao_email,
      cao_fax,
      cao_name,
      cao_tel,
      cao_title
    }

    const dcmaDetails = {
      dcma_address,
      dcma_city,
      dcma_email,
      dcma_name,
      dcma_state,
      dcma_tel,
      dcma_title,
      dcma_zip,
    }

    const signatureAgreements = {
      reporting_requirements,
      review_agreement
    }

    const signedMentor = {
      sign_mentor_date,
      sign_mentor_name,
      sign_mentor_title
    }

    const authorizedMentorPOCSignee = {
      signee_address,
      signee_city,
      signee_email,
      signee_fax,
      signee_name,
      signee_state,
      signee_tel,
      signee_title,
      signee_zip
    }

    const mppPointOfContact = {
      mpp_contact_name: `${mpp_contact_first_name} ${mpp_contact_last_name}`,
      mpp_contact_title,
      mpp_contact_phone,
      mpp_contact_fax,
      mpp_contact_email,
      mpp_contact_address,
      mpp_contact_city,
      mpp_contact_state,
      mpp_contact_zip
    }

    const mentorAgreementDetails = {
      'Compnay Details': { ...companyInfoData },
      'Agreement Details': { ...agreementDetails },
      'Performance Period': { ...performancePeriod },
      'Estimated Costs': { ...estimatedCost },
      'Federal DOD Contracts': { ...federalDodContracts },
      'Federal Agency Details': { ...federalAgencyDetails },
      'Prime Contract Details': { ...primeContractDetails },
      'Sub Contract Details': { ...subContractDetails },
      'Point Of Contact (POC)': { ...pocDetails },
      'Administrative Contracting Officer (ACO)': { ...acoDetails },
      'Contract Administration Officer (CAO)': { ...caoDetails },
      'Signature Agreements': { ...signatureAgreements },
      'Signed Mentor': { ...signedMentor },
      'Authorized Mentor POC Signee': { ...authorizedMentorPOCSignee },
      'Eligibility': { ...eligibility },
      'Historical Background': { ...historyBackground },
      'Developmental Assistance': { ...developmentalAssistance },
      'MPP Point Of Contact': { ...mppPointOfContact },
      'Defense Contract Management Agency (DCMA)': { ...dcmaDetails },
      'Federal DOD Contracts 2': { ...federalDodContracts2 }
    }

    setMentorAgreementData(mentorAgreementDetails)
  }

  const SetMinusActiveState = (idx) => {
    useActiveState(idx !== undefined ? idx : activeState - 1)
    window.scrollTo(0, 0)
  }

  const SetPlusActiveState = (idx) => {
    useActiveState(idx !== undefined ? idx : activeState + 1)
    window.scrollTo(0, 0)
  }

  const SetActiveStateZero = () => {
    useActiveState(0)
    window.scrollTo(0, 0)
  }

  const HandleChangeCheckbox = (index) => {
    var data = [...smallDisadvantagedBusinessDetails]
    data[index].value = !data[index].value
    const value = data.find((item) => item.value === true)
    setCheckFieldError(value ? null : true)
    setSmallDisadvantagedBusinessDetails(data)
  }

  const isFormValid = () => {
    return agreementHeaderList.filter(arr => arr.name !== 'Review & Submit').find(
      (agreementSection) => !agreementSection.valid
    )
  }

  const submit = () => {
    if (showPOCEditModal) {
      return
    }
    activeState === 7 &&
      isFormValid() === undefined &&
      SubmitProtegeAgreement(true)
    activeState === 7 &&
      isFormValid() === undefined &&
      history.push('/agreementConfirmation')
    activeState === 0 && setFirmSubmitted(true)
    activeState === 1 && setPocSubmitted(true)
    activeState === 6 && isFormValid() !== undefined && setAgreementError(true)
    activeState === 6 && isFormValid() !== undefined && window.scrollTo(0, 0)
    activeState === 2 && setProgramSumbitted(true)
    activeState === 4 && setCertificationSubmitted(true)
    activeState === 5 && setContractsSubmitted(true)
    activeState < 7 && SetActiveState()
    setProtegeHighestSelectedSection(
      latestState >= protegeHighestSelectedSection
        ? latestState
        : protegeHighestSelectedSection
    )

    UpdateHistoricalFiles()
  }

  const saveProtegeAgreement = () => {
    SubmitProtegeAgreement(false)
  }

  const SubmitProtegeAgreement = async (submit) => {
    const submitAgreeement = await submitProtegeAgreementAction(
      protegeAgreement,
      submit,
      historicalBackgroundFile,
      smallDisadvantagedBusinessDetails,
      agreementId,
      latestState >= protegeHighestSelectedSection
        ? latestState
        : protegeHighestSelectedSection
    )
    const { status } = submitAgreeement
    if (status === 401) {
      localStorage.removeItem('user_info')
      history.push('/')
      localStorage.removeItem('login_time')
      localStorage.removeItem('session_time')
    }
    UpdateHistoricalFiles()
  }

  const UpdateHistoricalFiles = async () => {
    const protegeAgreement = await getProtegeAgeementData(agreementId)
    const { apiData } = protegeAgreement

    const data = apiData && apiData[0]

    const historicalFiles =
      apiData &&
      apiData[0] &&
      apiData[0]['historical_agreement_background_file']

    const capabilitesFiles =
      apiData &&
      apiData[0] &&
      apiData[0]['capability_section_file']


    setCapabilitySectionFile(capabilitesFiles)
    setHistoricalBackgroundFile(historicalFiles)
    setAllProtegeAgreementData(data)
    checkNoEditFilesMode()
  }

  const HideSlider = () => {
    useSaveSlider(false)
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
        aria-label="Open Right Side Panel"
        onClick={() => setSidebarOpen(true)}
        onKeyDown={keydownHandler}
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
        aria-label="Close Right Side Panel"
        onClick={closeSideBar}
        onKeyDown={keydownHandler}
      />
    )
  }

  const getSidebarContent = () => {
    return (
      <div style={{ width: 700, height: '100%' }}>
        {sidebarOpen && getRightCollapseExpandSidebarCtrl()}
        <div style={{ ...sidebarStyles }}>
          <DisplayMentorAgreementData
            mentorAgreementData={mentorAgreementData}
            closeSideBarFn={closeSideBar}
          />
        </div>
      </div>
    )
  }

  const handleHistoricalBackgroundFile = (files) => {
    setCapabilitySectionFile(files)
    setHistoricalBackgroundFile(files)
  }

  const field_name = {
    historical_background: 'historical_background_upload_file',
    developmental_assistance: 'developmental_assistance_upload_file',
    reviewerFiles: 'reviewer_uploaded_file'
  }

  const [noEditingFiles, setNoEditingFiles] = useState(false)

  const checkNoEditFilesMode = () => {
    if (
      (activeState === 6 &&
        !protegeAgreementData &&
        firstProtegeAgreementStatus === 'complete') ||
      (activeState < 7 &&
        protegeAgreement &&
        firstProtegeAgreementStatus === 'complete')
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

  const mentorProtegeAgrStatus = allMentorProtegeAgreementData &&
    allMentorProtegeAgreementData['mentor_protege_agr_status']

  return (
    <div className='protege-container'>
      <SidebarComponent
        openState={sidebarOpen}
        sidebarRootId={'mentorSectionSidePanel'}
        isSideBarOnLeft={true}
        sidebarContent={mentorAgreementData && getSidebarContent()}
        setCloseSideBarHandler={setCloseSideBarHandler}
        sideBarText={'Mentor Section'}
      />

      {!sidebarOpen && getLeftCollapseExpandSidebarCtrl()}

      {saveSlider && (
        <div
          className='save-alert mb-0 font-size-lg alert alert-primary save-slider'
          role='alert'
        >
          <div className='container'>
            <i className='mr-3 align-middle fas fa-check-circle'></i>
            <span className='slider-message left-align'>
              {' '}
              <FontAwesomeIcon icon={faCheckCircle} /> Application successfully
              saved
            </span>
            <button
              type='button'
              className='close close-save-alert'
              aria-label='Close'
              onClick={() => HideSlider()}
            >
              <span aria-hidden='true'>×</span>
            </button>
          </div>
        </div>
      )}
      <div className='row'>
        <aside className='left-menu mr-3 pt-3 pr-3 scroll-height-100 vertical-border-agreement'>
          <ul className='scroll-height-100 hand-hover'>
            {agreementHeaderList.map((item, idx) => (
              <li
                key={idx}
                tabIndex='0'
                onClick={
                  protegeHighestSelectedSection >= idx &&
                    (idx !== 7 || protegeAgreementData)
                    ? () => SetActiveState(idx)
                    : null
                }
                onKeyDown={keydownHandler}
                className={
                  protegeAgreementData && idx === activeState
                    ? 'ml-4 view-active focusable-item'
                    : item.valid && idx === activeState && !protegeAgreementData
                      ? 'select-active-valid valid'
                      : item.valid &&
                        !protegeAgreementData &&
                        protegeHighestSelectedSection >=
                        (idx === 0 ? idx : idx - 1)
                        ? 'valid'
                        : idx === activeState &&
                          !item.valid &&
                          agreementError &&
                          !protegeAgreementData
                          ? 'view-active'
                          : idx === activeState
                            ? 'select-active ml-2'
                            : !item.valid && agreementError
                              ? ''
                              : 'ml-4'
                }
              >
                {item.valid &&
                  protegeHighestSelectedSection >=
                  (idx === 0 ? idx : idx - 1) && (
                    <span className='mr-2' aria-label="Completed">
                      <FontAwesomeIcon icon={faCheckCircle} color='green' />
                    </span>
                  )}
                {!item.valid && agreementError && idx !== 9 && (
                  <span className='mr-2'>
                    <FontAwesomeIcon icon={faExclamationCircle} color='red' />
                  </span>
                )}
                {item.name}
              </li>
            ))}
          </ul>
        </aside>
        <div className='col-md-9 pt-3'>
          <div>
            {activeState >= 0 && (
              <>
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
                </span>
                <hr className='mt-2' />
                {agreementError && inValidSections > 0 && (
                  <div id="error-list" className='agreement-errors-box col-md-7 mb-4 ml-3'>
                    <h5 className="ml-4 mt-2"><FontAwesomeIcon icon={faExclamationCircle} color='#b20000' /> Issues Found </h5>
                    <p className="mb-n1 ml-4">Please review  and correct the following issues before continuing.</p>
                    <ul className="pt-1 ml-n3 hand-hover">
                      {!validFirm &&
                        <li onClick={() => SetActiveState(0)}>
                          Company Information
                        </li>}
                      {!validPointOfContact &&
                        <li onClick={() => SetActiveState(1)}>Points of Contact</li>}
                      {!validProgramParticipation &&
                        <li onClick={() => SetActiveState(2)}>Previous Program Participation</li>}
                      {!validHistoricalBackground &&
                        <li onClick={() => SetActiveState(3)}>Historical Background</li>}
                      {!validCertifications &&
                        <li onClick={() => SetActiveState(4)}>Certificaiton</li>}
                      {!validDoDContracts &&
                        <li onClick={() => SetActiveState(5)}>Mentor/Protege Contracts</li>}
                    </ul>
                  </div>
                )}
              </>
            )}
            <main id='main' className='mt-0'>
              <h1 className='ml-3 agreement-main-header'>
                {' '}
                MPP Agreement (Protégé)
              </h1>
              <form onSubmit={handleSubmit(submit)}>
                {activeState === 0 && (
                  <FirmInformation
                    handleHistoricalBackgroundFile={handleHistoricalBackgroundFile}
                    UpdateHistoricalFiles={UpdateHistoricalFiles}
                    capabilitySectionFile={capabilitySectionFile}
                    allProtegeAgreementData={allProtegeAgreementData}
                    stateOptions={statesInfo}
                    protegeAgreement={protegeAgreement}
                    protegeAgreementData={protegeAgreementData}
                    agreementId={agreementId}
                    submitted={firmSubmitted}
                    mentorProtegeAgrStatus={mentorProtegeAgrStatus}
                  />
                )}
                {activeState === 1 && (
                  <PointOfContact
                    userType={"protege"}
                    stateOptions={statesInfo}
                    allProtegeAgreementData={allProtegeAgreementData}
                    protegeAgreement={protegeAgreement}
                    protegeAgreementData={protegeAgreementData}
                    displayPOCEditModal={displayPOCEditModal}
                    showPOCEditModal={showPOCEditModal}
                    submitted={pocSubmitted}
                    initialize={initialize}
                    mentorProtegeAgrStatus={mentorProtegeAgrStatus}
                    UpdateHistoricalFiles={UpdateHistoricalFiles}
                  />
                )}
                {activeState === 2 && (
                  <ProgramParticipation
                    submitted={programsubmitted}
                    protegeAgreement={protegeAgreement}
                    protegeAgreementData={protegeAgreementData}
                    mentorProtegeAgrStatus={mentorProtegeAgrStatus}
                  />
                )}
                {activeState === 3 && (
                  <HistoricalBackground
                    mentorProtegeAgrStatus={mentorProtegeAgrStatus}
                    protegeAgreement={protegeAgreement}
                    historicalBackgroundFile={historicalBackgroundFile}
                    initialFiles={historicalBackgroundFile}
                    protegeAgreementData={protegeAgreementData}
                    agreementId={agreementId}
                    handleHistoricalBackgroundFile={
                      handleHistoricalBackgroundFile
                    }
                    UpdateHistoricalFiles={UpdateHistoricalFiles}
                    noEditingFiles={noEditingFiles}
                    checkNoEditFilesMode={checkNoEditFilesMode}
                    allProtegeAgreementData={allProtegeAgreementData}
                  />
                )}
                {activeState === 4 && (
                  <Certificaitons
                    smallDisadvantagedBusinessDetails={
                      smallDisadvantagedBusinessDetails
                    }
                    handleChangeCheckbox={HandleChangeCheckbox}
                    protegeAgreement={protegeAgreement}
                    checkFieldError={checkFieldError}
                    submitted={certificationSubmitted}
                    protegeAgreementData={protegeAgreementData}
                    mentorProtegeAgrStatus={mentorProtegeAgrStatus}
                  />
                )}
                {activeState === 5 && (
                  <DoDContracts
                    protegeAgreement={protegeAgreement}
                    protegeAgreementData={protegeAgreementData}
                    initialize={initialize}
                    mentorProtegeAgrStatus={mentorProtegeAgrStatus}
                    submitted={contractsSubmitted}
                  />
                )}
                {activeState === 6 && (
                  <DevelopmentAssistance
                    protegeAgreement={protegeAgreement}
                    protegeAgreementData={protegeAgreementData}
                    developmentAssistanceFile={developmentAssistanceFile}
                    agreementId={agreementId}
                    mentorAgrUuid={mentorAgrUuid}
                    allMentorAgreementData={allMentorAgreementData}
                    mentorProtegeAgrStatus={mentorProtegeAgrStatus}
                    UpdateHistoricalFiles={UpdateHistoricalFiles}
                    allProtegeAgreementData={allProtegeAgreementData}
                  />
                )}
                {activeState === 7 && (
                  <ReviewAgreement
                    protegeAgreement={protegeAgreement}
                    mentorFirm={mentorFirm}
                    protegeName={protegeName}
                    protegeAgreementData={protegeAgreementData}
                    docusignEnvelope_id={docusignEnvelope_id}
                    historicalBackgroundFile={historicalBackgroundFile}
                    reviewerFiles={reviewerFiles}
                    developmentAssistanceFile={developmentAssistanceFile}
                    agreementId={agreementId}
                    protegeAgrUuid={agreementId}
                    mentorAgrUuid={mentorAgrUuid}
                    mentorProtegeAgrUuid={mentorProtegeAgrUuid}
                    agreement_type={`protege`}
                    field_name={field_name}
                    allMentorAgreementData={allMentorAgreementData}
                    forProtegeView={true}
                    allMentorProtegeAgreementData={allMentorProtegeAgreementData}
                    allProtegeAgreementData={allProtegeAgreementData}
                    mentorProtegeAgrStatus={mentorProtegeAgrStatus}
                    isProtege={true}
                  />
                )}

                {activeState === 6 &&
                  !protegeAgreementData &&
                  firstProtegeAgreementStatus !== 'complete' && (
                    <button
                      className='btn btn-primary mt-3 my-5 focusable-item'
                      type='submit'
                    >
                      Save and Continue
                    </button>
                  )}
                {activeState === 7 &&
                  !protegeAgreementData &&
                  firstProtegeAgreementStatus !== 'complete' && (
                    <div className='mt-3 my-5'>
                      <span>
                        <button
                          className='btn btn-primary focusable-item'
                          type='submit'
                        >
                          Submit To Mentor
                        </button>
                      </span>
                      <span>
                        <button
                          className='btn btn-white px-4 ml-3 focusable-item'
                          onClick={() => SetActiveStateZero()}
                        >
                          Edit Information
                        </button>
                      </span>
                    </div>
                  )}
                {activeState === 6 &&
                  !protegeAgreementData &&
                  firstProtegeAgreementStatus === 'complete' && (
                    <button
                      type='button'
                      className='btn btn-primary mt-3 my-5 ml-3 focusable-item'
                      onClick={() => SetPlusActiveState()}
                    >
                      Next
                      <span className='ml-2'>
                        <FontAwesomeIcon icon={faAngleRight} />
                      </span>
                    </button>
                  )}
                {activeState < 6 &&
                  protegeAgreement &&
                  firstProtegeAgreementStatus !== 'complete' && (
                    <button
                      className='btn btn-primary mt-3 my-5 ml-3 focusable-item'
                      onClick={() => saveProtegeAgreement()}
                    >
                      Save and Continue{' '}
                      <span className='ml-2'>
                        <FontAwesomeIcon icon={faAngleRight} />
                      </span>
                    </button>
                  )}
                {activeState < 7 &&
                  protegeAgreement &&
                  firstProtegeAgreementStatus === 'complete' && (
                    <button
                      type='button'
                      className='btn btn-primary mt-3 my-5 ml-3 focusable-item'
                      onClick={() => SetPlusActiveState()}
                    >
                      Next
                      <span className='ml-2'>
                        <FontAwesomeIcon icon={faAngleRight} />
                      </span>
                    </button>
                  )}
              </form>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

ProtegeAgreement = reduxForm({
  enableReinitialize: true,
  form: 'protegeAgreement'
})(ProtegeAgreement)

export default ProtegeAgreement
