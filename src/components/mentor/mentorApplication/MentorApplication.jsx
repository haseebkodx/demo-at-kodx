import _ from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { reduxForm } from 'redux-form'
import '../../../App.css'
import checkMarkIcon from '../../../assets/images/checkmark_Icon_2.png'
import errorAlert from '../../../assets/images/error-alert.png'
import settings from '../../../config/settings'
import cleanDollarFormat from '../../../helpers/formatter/cleanDollarFormat'
import initialDateFormat from '../../../helpers/formatter/initalDateFormat'
import authHeader from '../../authHeader'
import getCurrentUser from '../../getCurrentUserInfo.action'
import ApplicationStatus from '../../reviewer/ApplicationStatus/ApplicationStatus'
import { getAllMentorFiles } from '../../reviewer/ApplicationStatus/getFilesCall'
import AnticipatedProtege from './AnticipatedProtege'
import CompanyInformation from './CompanyInformation'
import ContactInformation from './ContactInformation'
import DevelopmentAssistance from './DevelopmentAssistance'
import DODContracts from './DODContracts'
import Eligibility from './Eligibility'
import Eligibility2 from './Eligibility2'
import ExitToDashboardModal from './ExitToDashboardModal'
import getMentorApplicationData from './getMentorApplicationData.action.js'
import getStates from './getStates.action'
import HistoricalBackground from './HistoricalBackground'
import History from './History'
import MentorApplicationSummary from './MentorApplicationSummary'
import TermsAndConditions from './TermsAndConditions'
import validateMentorForm from './validateMentorForm'

// field names to save files - matched with back end
export const fieldNames = {
  anticipated_protege: 'anticipated_protege_file',
  eligibility: 'eligibility_upload_file',
  historical_background: 'historical_background',
  developmental_assistance: 'developmental_assistance',
  reviewerFiles: 'reviewer_file_upload'
}

function MentorApplication({ handleSubmit, mentorApp, initialize }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const [saveSlider, setSaveSlider] = useState(false)
  const [anticipatedFile, setAnticipatedFile] = useState(null)
  const [eligibilityFile, setEligibilityFile] = useState(null)
  const [developmentAssistanceFile, setDevelopmentAssistanceFile] = useState(
    null
  )
  const [sdbDoDContractFile, setSdbDoDContractFile] = useState(
    null
  )
  const [ofaDoDContractFile, setOfaDoDContractFile] = useState(
    null
  )
  const [historicalBackgroundFile, setHistoricalBackgroundFile] = useState(null)
  const [statesInfo, useStatesInfo] = useState(null)
  const [mentorApplicationInfo, setMentorApplicationInfo] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [mentorApplicationSummary, setMentorApplicationSummary] = useState(
    false
  )
  const [showExitToDashboardModal, setShowExitToDashboardModal] = useState(
    false
  )
  const [isAnticipatedStatement, setAnticipatedStatement] = useState(false)
  const [isEligibleStatement, setIsEligibleStatement] = useState(false)
  const [isHistoryStatement, setIsHistoryStatement] = useState(false)
  const [isDevelopmentStatement, setIsDevelopmentStatement] = useState(false)
  const [isEligibleFiles, setIsEligibleFiles] = useState(false)
  const [isHistoryFiles, setIsHistoryFiles] = useState(false)
  const [isDevelopmentFiles, setIsDevelopmentFiles] = useState(false)

  const [
    isAnticipatedProtegeExplanationOrFileUploadMissing,
    setIsAnticipatedProtegeExplanationOrFileUploadMissing,
  ] = useState(false);

  const [
    isEligibilityExplanationOrFileUploadMissing,
    setIsEligibilityExplanationOrFileUploadMissing
  ] = useState(false)
  const [
    isHistoryBackgroundExplanationOrFileUploadMissing,
    setIsHistoryBackgroundExplanationOrFileUploadMissing
  ] = useState(false)
  const [
    isDevelopmentalAssistanceExplanationOrFileUploadMissing,
    setIsDevelopmentalAssistanceExplanationOrFileUploadMissing
  ] = useState(false)


  const [
    notAnsweredEligibilityQuestions,
    setNotAnsweredEligibilityQuestions
  ] = useState(false)
  const [
    notAnsweredHistoryQuestions,
    setNotAnsweredHistoryQuestions
  ] = useState(false)
  const [
    isGraduation8aProgramDateProvided,
    setIsGraduation8aProgramDateProvided
  ] = useState(false)
  const [
    isAllDodAndFederalAgenciesContractsMissing,
    setIsAllDodAndFederalAgenciesContractsMissing,
  ] = useState(false);
  const [hasNotAgreedToTerms, setHasNotAgreedToTerms] = useState(true);
  const [validateFieldSubmit, setValidateFieldSubmit] = useState(false);
  const [isErrorsFound, setIsErrorsFound] = useState(false);
  const [isDisabled, setIsDisabled] = useState("true");
  const localStorage = window.localStorage;
  const userInfo = useSelector((state) => state.currentUserInfo);
  const location = useLocation();
  const uuid = location.state && location.state?.uuid;
  const toDashboard = location.state && location.state.toDashboard;
  const applicationStatus = location.state && location.state.applicationStatus;
  const statusReason = location.state && location.state.statusReason;
  const status = location.state && location.state.status;
  const reason = location.state && location.state.reason;
  const accessToken = location.state && location.state.accessToken;
  const isReviewer = location.state && location.state.isReviewer;

  const [mentorAppId, setMentorAppId] = useState(null)
  const [allMentorAppMentorUser, setAllMentorAppMentorUser] = useState(null)
  const [reviewerFiles, setReviewerFiles] = useState(null)
  const [comments, setComments] = useState(null)

  const errorSummaryRef = useRef(null)

  const currentUserInfo = useSelector(
    state => state.currentUserInfo
  )


  useEffect(() => {
    getMentorApp()
  }, [userInfo])

  // get the mentor app uuid from Redux
  const getMentorApp = async () => {
    const mentorAppData = await getUpdatedMentorApplicationData()
    setAllMentorAppMentorUser(mentorAppData)
  }

  useEffect(() => {
    const initialUuid = location.state && location.state.initialUuid;
    const uuid = location.state && location.state?.uuid;
    StatesData();
    uuid && MentorApplicationData();
    initialUuid && MentorApplicationInitialData();

    if (!uuid && !initialUuid) {
      initialize({
        prev_year_revenue_total_dod_prime: '$0',
        two_prev_year_revenue_total_dod_prime: '$0',
        prev_year_revenue_total_dod_sub: '$0',
        two_prev_year_revenue_total_dod_sub: '$0',
        prev_year_revenue_federal_prime: '$0',
        two_prev_year_revenue_federal_prime: '$0',
        prev_year_revenue_federal_sub: '$0',
        two_prev_year_revenue_federal_sub: '$0',
        prev_year_revenue_dod_awarded_sub: '$0',
        two_prev_year_revenue_dod_awarded_sub: '$0',
        prev_year_revenue_federal_awarded_sub: '$0',
        two_prev_year_revenue_federal_awarded_sub: '$0',
        prev_year_revenue_dod_sdb_awarded_sub: '$0',
        two_prev_year_revenue_dod_sdb_awarded_sub: '$0',
        prev_year_revenue_total_sdb_awarded_sub: '$0',
        two_prev_year_revenue_total_sdb_awarded_sub: '$0'
      })
    }

    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (saveSlider) {
      setTimeout(() => setSaveSlider(false), 5000)
    }
  }, [saveSlider])

  const getUuid = async (submit) => {
    const url = settings.devUrl + '/mentorApp/'

    const payload = {
      submitted: submit,
      user_id: userInfo?.uuid,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json', ...authHeader() }
      })

      const applicationResponse = await response.json()

      const agreementId = applicationResponse?.uuid;
      setMentorAppId(agreementId);

      localStorage.setItem("latest_application", applicationResponse?.uuid);
      localStorage.setItem("application_saved", true);
      getCurrentUserInfoData();
      return {
        status: 'Success',
        appUuid: agreementId
      }
    } catch (err) {
      return {
        status: 'Error',
        errorMessage: `There was an error. ${err}`
      }
    }
  }

  useEffect(() => {
    if (
      mentorApp &&
      mentorApp['eligible_for_federal_contracts'] &&
      mentorApp['active_subcontracting_plan']
    ) {
      setNotAnsweredEligibilityQuestions(false)
    } else {
      setNotAnsweredEligibilityQuestions(true)
    }
  }, [
    mentorApp &&
    mentorApp['eligible_for_federal_contracts'] &&
    mentorApp['active_subcontracting_plan']
  ])

  useEffect(() => {
    if (
      mentorApp &&
      mentorApp['certified_small_business']
    ) {
      setNotAnsweredHistoryQuestions(false)
    }
    if (mentorApp && mentorApp['agreed_to_terms']) {
      setHasNotAgreedToTerms(!mentorApp['agreed_to_terms'])
    } else if (mentorApp && !mentorApp['agreed_to_terms']) {
      setHasNotAgreedToTerms(true)
      setIsDisabled('true')
    }
  }, [mentorApp])


  const mentorAppAnticipatedProtegeDetails = mentorApp?.['anticipated_protege_details']
  const mentorAppAnticipatedFile = mentorApp?.[fieldNames.anticipated_protege]

  useEffect(() => {
    if (
      isEligibilityExplanationOrFileUploadMissing &&
      (mentorAppAnticipatedProtegeDetails?.trim() ||
        (mentorAppAnticipatedFile && anticipatedFile?.length > 0))
    ) {
      setIsAnticipatedProtegeExplanationOrFileUploadMissing(false);
    }
  }, [
    isEligibilityExplanationOrFileUploadMissing,
    mentorAppAnticipatedProtegeDetails,
    mentorAppAnticipatedFile,
    anticipatedFile?.length,
  ]);

  useEffect(() => {
    if (
      isEligibilityExplanationOrFileUploadMissing &&
      mentorApp['eligibility_explanation']?.trim()
    ) {
      setIsEligibilityExplanationOrFileUploadMissing(false);
    }
  }, [
    isEligibilityExplanationOrFileUploadMissing,
    mentorApp?.['eligibility_explanation'],
  ]);

  useEffect(() => {
    if (
      isEligibilityExplanationOrFileUploadMissing &&
      mentorApp['eligibility_upload_file'] &&
      eligibilityFile?.length > 0
    ) {
      setIsEligibilityExplanationOrFileUploadMissing(false);
    }
  }, [
    eligibilityFile,
    isEligibilityExplanationOrFileUploadMissing,
    mentorApp?.['eligibility_upload_file'],
  ]);

  useEffect(() => {
    if (
      isHistoryBackgroundExplanationOrFileUploadMissing &&
      mentorApp['historical_background_explanation']?.trim()
    ) {
      setIsHistoryBackgroundExplanationOrFileUploadMissing(false)
    }
  }, [mentorApp && mentorApp['historical_background_explanation']])

  useEffect(() => {
    if (
      isHistoryBackgroundExplanationOrFileUploadMissing &&
      mentorApp['historical_background_upload_file'] &&
      (historicalBackgroundFile && historicalBackgroundFile.length > 0)
    ) {
      setIsHistoryBackgroundExplanationOrFileUploadMissing(false)
    }
  }, [historicalBackgroundFile])

  useEffect(() => {
    if (
      isDevelopmentalAssistanceExplanationOrFileUploadMissing &&
      mentorApp['developmental_assistance_explanation']?.trim()
    ) {
      setIsDevelopmentalAssistanceExplanationOrFileUploadMissing(false)
    }
  }, [mentorApp && mentorApp['developmental_assistance_explanation']])

  useEffect(() => {
    if (
      isDevelopmentalAssistanceExplanationOrFileUploadMissing &&
      mentorApp['developmental_assistance_upload_file'] &&
      (developmentAssistanceFile && developmentAssistanceFile.length)
    ) {
      setIsDevelopmentalAssistanceExplanationOrFileUploadMissing(false)
    }
  }, [developmentAssistanceFile])

  useEffect(() => {
    if (mentorApp && (mentorApp['company_graduated_8a_program'] === 'false' || mentorApp['company_graduated_8a_program'] === 'false')) {
      mentorApp['graduated_8a_program_on'] = null
      setIsGraduation8aProgramDateProvided(false)
    }
  }, [mentorApp && mentorApp['company_graduated_8a_program']])

  useEffect(() => {
    if (isGraduation8aProgramDateProvided && mentorApp['graduated_8a_program_on']) {
      setIsGraduation8aProgramDateProvided(false)
    }
  }, [mentorApp && mentorApp['company_graduated_8a_program'] && mentorApp['graduated_8a_program_on']])

  /* Check if All DOD contracts have been provided */
  const allDodContractsProvided = mentorApp &&
    (mentorApp['prev_year_revenue_total_dod_prime'] && mentorApp['prev_year_revenue_total_dod_prime'] != '$') &&
    (mentorApp['two_prev_year_revenue_total_dod_prime'] && mentorApp['two_prev_year_revenue_total_dod_prime'] != '$') &&
    (mentorApp['prev_year_revenue_total_dod_sub'] && mentorApp['prev_year_revenue_total_dod_sub'] != '$') &&
    (mentorApp['two_prev_year_revenue_total_dod_sub'] && mentorApp['two_prev_year_revenue_total_dod_sub'] != '$') &&
    (mentorApp['prev_year_revenue_federal_prime'] && mentorApp['prev_year_revenue_federal_prime'] != '$') &&
    (mentorApp['two_prev_year_revenue_federal_prime'] && mentorApp['two_prev_year_revenue_federal_prime'] != '$') &&
    (mentorApp['prev_year_revenue_federal_sub'] && mentorApp['prev_year_revenue_federal_sub'] != '$') &&
    (mentorApp['two_prev_year_revenue_federal_sub'] && mentorApp['two_prev_year_revenue_federal_sub'] != '$') &&
    (mentorApp['prev_year_revenue_dod_awarded_sub'] && mentorApp['prev_year_revenue_dod_awarded_sub'] != '$') &&
    (mentorApp['two_prev_year_revenue_dod_awarded_sub'] && mentorApp['two_prev_year_revenue_dod_awarded_sub'] != '$') &&
    (mentorApp['prev_year_revenue_federal_awarded_sub'] && mentorApp['prev_year_revenue_federal_awarded_sub'] != '$') &&
    (mentorApp['two_prev_year_revenue_federal_awarded_sub'] && mentorApp['two_prev_year_revenue_federal_awarded_sub'] != '$') &&
    (mentorApp['prev_year_revenue_dod_sdb_awarded_sub'] && mentorApp['prev_year_revenue_dod_sdb_awarded_sub'] != '$') &&
    (mentorApp['two_prev_year_revenue_dod_sdb_awarded_sub'] && mentorApp['two_prev_year_revenue_dod_sdb_awarded_sub'] != '$') &&
    (mentorApp['prev_year_revenue_total_sdb_awarded_sub'] && mentorApp['prev_year_revenue_total_sdb_awarded_sub'] != '$') &&
    (mentorApp['two_prev_year_revenue_total_sdb_awarded_sub'] && mentorApp['two_prev_year_revenue_total_sdb_awarded_sub'] != '$');

  useEffect(() => {
    setIsAllDodAndFederalAgenciesContractsMissing(!allDodContractsProvided);
  }, [allDodContractsProvided]);

  useEffect(() => {
    if (
      !isEligibilityExplanationOrFileUploadMissing &&
      !isHistoryBackgroundExplanationOrFileUploadMissing &&
      !isDevelopmentalAssistanceExplanationOrFileUploadMissing &&
      !isGraduation8aProgramDateProvided &&
      !notAnsweredEligibilityQuestions &&
      !notAnsweredHistoryQuestions &&
      !hasNotAgreedToTerms &&
      !isAllDodAndFederalAgenciesContractsMissing
    ) {
      setIsErrorsFound(false)
      setIsDisabled('false')
    } else {
      setIsDisabled('true')
    }
  }, [
    isEligibilityExplanationOrFileUploadMissing,
    isHistoryBackgroundExplanationOrFileUploadMissing,
    isDevelopmentalAssistanceExplanationOrFileUploadMissing,
    isGraduation8aProgramDateProvided,
    notAnsweredEligibilityQuestions,
    notAnsweredHistoryQuestions,
    hasNotAgreedToTerms,
    isAllDodAndFederalAgenciesContractsMissing
  ])

  useEffect(() => {
    if (isErrorsFound) {
      scrollToErrorSummary()
    }
  }, [isErrorsFound])

  const scrollToErrorSummary = () => {
    errorSummaryRef.current && errorSummaryRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const StatesData = async () => {
    const statesData = await getStates()
    useStatesInfo(statesData)
  }

  const MentorApplicationData = async () => {
    const uuid = location.state && location.state?.uuid;
    const mentorApplicationData = await getMentorApplicationData(uuid);
    const { status, apiData } = mentorApplicationData;
    if (status === 401) {
      localStorage.removeItem('user_info')
      localStorage.removeItem('login_time')
      localStorage.removeItem('session_time')
      localStorage.removeItem('logged_in')
      history.push('/')
    }
    setMentorApplicationInfo(apiData)
  }

  const MentorApplicationInitialData = async () => {
    const initialUuid = location.state && location.state.initialUuid
    const { apiData } = await getMentorApplicationData(initialUuid)
    const mentorApplicationData = apiData

    setIsEligibleStatement(
      mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].eligibility_explanation
        ? true
        : false
    )
    setIsHistoryStatement(
      mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].historical_background_explanation
        ? true
        : false
    )
    setIsDevelopmentStatement(
      mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].developmental_assistance_explanation
        ? true
        : false
    )

    setAnticipatedStatement(
      mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].anticipated_protege_details
        ? true
        : false
    )

    setIsEligibleFiles(
      mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].eligibility_upload_file
        ? true
        : false
    )

    setIsHistoryFiles(
      mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].historical_background_upload_file
        ? true
        : false
    )

    setIsDevelopmentFiles(
      mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].developmental_assistance_upload_file
        ? true
        : false
    )

    setAnticipatedFile(
      mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].anticipated_protege_file
    );

    setEligibilityFile(
      mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].eligibility_upload_file
    );

    setHistoricalBackgroundFile(
      mentorApplicationData &&
      mentorApplicationData[0] &&
      mentorApplicationData[0].historical_background_upload_file
    )

    setDevelopmentAssistanceFile(
      mentorApplicationData &&
      mentorApplicationData[0] &&
      mentorApplicationData[0].developmental_assistance_upload_file
    )

    setSdbDoDContractFile(
      mentorApplicationData &&
      mentorApplicationData[0] &&
      mentorApplicationData[0].sdb_dod_contract_upload_file
    )

    setOfaDoDContractFile(
      mentorApplicationData &&
      mentorApplicationData[0] &&
      mentorApplicationData[0].sdb_ofa_contract_upload_file
    )

    initialize({
      ...mentorApplicationData[0],
      has_anticipated_protege:
        mentorApplicationData?.[0]?.has_anticipated_protege === true
          ? 'true'
          : 'false',
      active_subcontracting_plan:
        mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].active_subcontracting_plan &&
        mentorApplicationData[0].active_subcontracting_plan === true
          ? "true"
          : "false",
      current_fiscal_year_dod_contracts:
        mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].current_fiscal_year_dod_contracts &&
        mentorApplicationData[0].current_fiscal_year_dod_contracts === true
          ? "true"
          : "false",
      agreed_to_terms:
        mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].agreed_to_terms &&
        mentorApplicationData[0].agreed_to_terms === true
          ? 'true'
          : 'false',
      company_graduated_8a_program:
        mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].company_graduated_8a_program &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].company_graduated_8a_program === true
          ? 'true'
          : 'false',
      eligible_for_federal_contracts:
        mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].eligible_for_federal_contracts &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].eligible_for_federal_contracts === true
          ? 'true'
          : 'false',
      was_small_disadvantaged_business:
        mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].was_small_disadvantaged_business &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].was_small_disadvantaged_business === true
          ? 'true'
          : 'false',
      was_woman_owned_small_business:
        mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].was_woman_owned_small_business &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].was_woman_owned_small_business === true
          ? 'true'
          : 'false',
      graduated_8a_program_on:
        mentorApplicationData &&
        mentorApplicationData[0] &&
        mentorApplicationData[0].graduated_8a_program_on &&
        initialDateFormat(
          mentorApplicationData[0] &&
            mentorApplicationData[0].graduated_8a_program_on
        ),
    });
  }

  useEffect(() => {
    if (allMentorAppMentorUser) {
      if (allMentorAppMentorUser.status_reason === null) {
        setComments('No comments.')
      }
      else {
        setComments(allMentorAppMentorUser.status_reason)
      }

      const getFiles = async () => {
        const response = await getAllMentorFiles(allMentorAppMentorUser?.uuid);
        if (
          response &&
          response.status === 'Success' &&
          response.data &&
          response.data.length > 0
        ) {
          parseFiles(response.data)
        }
      }

      getFiles()
    }
  }, [allMentorAppMentorUser])

  const parseFiles = (files) => {
    const reviewerFileUploads = _.filter(files, [
      'field_name',
      'reviewer_file_upload'
    ])
    if (reviewerFileUploads && reviewerFileUploads.length > 0) {
      setReviewerFiles(reviewerFileUploads)
    }
  }

  const submit = () => {
    const valid = validateMentorForm(
      mentorApp,
      allMentorAppMentorUser,
      setIsAnticipatedProtegeExplanationOrFileUploadMissing,
      setIsEligibilityExplanationOrFileUploadMissing,
      setIsHistoryBackgroundExplanationOrFileUploadMissing,
      setIsDevelopmentalAssistanceExplanationOrFileUploadMissing,
      setIsGraduation8aProgramDateProvided,
      setIsAllDodAndFederalAgenciesContractsMissing
    )
    valid && setSubmitted(true)
  }

  const Save = async () => {
    const __allMentorAppMentorUser = await getUpdatedMentorApplicationData()
    setAllMentorAppMentorUser(__allMentorAppMentorUser)

    const valid = validateMentorForm(
      mentorApp,
      __allMentorAppMentorUser,
      setIsAnticipatedProtegeExplanationOrFileUploadMissing,
      setIsEligibilityExplanationOrFileUploadMissing,
      setIsHistoryBackgroundExplanationOrFileUploadMissing,
      setIsDevelopmentalAssistanceExplanationOrFileUploadMissing,
      setIsGraduation8aProgramDateProvided,
      setIsAllDodAndFederalAgenciesContractsMissing
    )

    setValidateFieldSubmit(true)

    if (valid) {
      setMentorApplicationSummary(true)
      setSaveSlider(true)
      sendMentorApp(false)
      setIsDisabled('false')
    } else {
      setIsErrorsFound(true)
      setIsDisabled('true')
    }
  }

  const getUpdatedMentorApplicationData = async () => {
    const getUserInfo = localStorage.getItem('user_info')
    const userInfoFromStorage = JSON.parse(getUserInfo)

    // check Redux
    if (userInfo && userInfo?.mentor_app && userInfo?.mentor_app[0]) {
      const mentorAppUuid = userInfo.mentor_app[0]?.uuid;
      setMentorAppId(mentorAppUuid);
      const { apiData } = await getMentorApplicationData(mentorAppUuid);
      const mentorApplication = apiData;
      return mentorApplication && mentorApplication[0];
    } else if (
      // check local storage
      userInfoFromStorage &&
      userInfoFromStorage.mentor_app &&
      userInfoFromStorage.mentor_app[0]
    ) {
      const mentorApp = userInfoFromStorage.mentor_app[0]?.uuid;
      setMentorAppId(mentorApp);
      const { apiData } = await getMentorApplicationData(mentorApp);
      const mentorApplication = apiData;
      return mentorApplication && mentorApplication[0];
    } else if (history.location.state?.uuid) {
      const mentorAppUuid = history.location.state?.uuid;
      setMentorAppId(mentorAppUuid);
      const { apiData } = await getMentorApplicationData(mentorAppUuid);
      const mentorApplication = apiData;
      return mentorApplication && mentorApplication[0];
    }
  }

  const HideSlider = () => {
    setSaveSlider(false)
  }

  const onFileChange = (value, hook) => {
    hook(value)
  }

  const changeToApplication = (mentorAppUuid) => {
    if (
      mentorApp &&
      !mentorAppUuid &&
      (!mentorApp.status ||
        mentorApp.status == 'incomplete' ||
        mentorApp.status == 'declined')
    ) {
      setMentorApplicationSummary(false)
      window.scrollTo(0, 0)

      setAnticipatedStatement(
        mentorApp && mentorApp.anticipated_protege_details ? true : false
      )
      setIsEligibleStatement(
        mentorApp && mentorApp.eligibility_explanation ? true : false
      )
      setIsHistoryStatement(
        mentorApp && mentorApp.historical_background_explanation ? true : false
      )
      setIsDevelopmentStatement(
        mentorApp && mentorApp.developmental_assistance_explanation
          ? true
          : false
      )

      setIsEligibleFiles(
        mentorApp && mentorApp.eligibility_upload_file ? true : false
      )

      setIsHistoryFiles(
        mentorApp && mentorApp.historical_background_upload_file ? true : false
      )

      setIsDevelopmentFiles(
        mentorApp && mentorApp.developmental_assistance_upload_file
          ? true
          : false
      )

      return
    }
    history.push(`/${toDashboard}`)
  }

  const ChangeToMentorApp = () => {
    setMentorApplicationSummary(false)
  }

  const displayExitToDashboardModal = () => {
    setShowExitToDashboardModal(true)
  }

  const goBackToMentorDashboard = () => {
    setShowExitToDashboardModal(false)
    history.push('/dashboard')
  }

  const closeExitToDashboardModal = () => {
    setShowExitToDashboardModal(false)
  }

  const getCurrentUserInfoData = async () => {
    await dispatch(getCurrentUser(accessToken))
  }

  async function sendMentorApp(submit) {
    // using alt way to get the graduation date if it exists
    const graduated8aOn =
      mentorApp && mentorApp['graduated_8a_program_on']
        ? new Date(mentorApp.graduated_8a_program_on).toISOString()
        : null
    const data = {
      ...mentorApp,
      submitted: submit,
      user_id: userInfo?.uuid,
      graduated_8a_program_on: graduated8aOn,
    };

    const url = settings.devUrl + '/mentorApp/'
    const putUrl =
      settings.devUrl +
      `/mentorApp/${userInfo.mentor_app && userInfo.mentor_app[0]?.uuid}`;

    const payload = {
      submitted: submit,
      user_id: userInfo?.uuid,
      graduated_8a_program_on: graduated8aOn,

      //submitted_by

      submitted_by_first_name: currentUserInfo['first_name'],
      submitted_by_last_name: currentUserInfo['last_name'],
      submitted_by_title: currentUserInfo['title'],
      submitted_by_phone: currentUserInfo['phone'],
      submitted_by_email: currentUserInfo['email'],

      //anticipated section
      has_anticipated_protege: mentorApp && mentorApp.has_anticipated_protege,
      anticipated_protege_details: mentorApp && mentorApp.anticipated_protege_details,

      // eligibility form section
      active_subcontracting_plan:
        mentorApp && mentorApp.active_subcontracting_plan,
      current_fiscal_year_dod_contracts:
        mentorApp && mentorApp.current_fiscal_year_dod_contracts,
      eligible_for_federal_contracts:
        mentorApp && mentorApp.eligible_for_federal_contracts,

      // history form section
      historical_background_explanation:
        mentorApp && mentorApp.historical_background_explanation,
      app_certified_small_business: mentorApp && mentorApp.app_certified_small_business,

      // historical_background_upload_file: historicalBackgroundFile,

      // historical background form section
      company_graduated_8a_program:
        mentorApp && mentorApp.company_graduated_8a_program,

      // was_woman_owned_small_business:
      //   mentorApp && mentorApp.was_woman_owned_small_business,
      // was_small_disadvantaged_business:
      //   mentorApp && mentorApp.was_small_disadvantaged_business,
      // terms and conditions
      agreed_to_terms: mentorApp && mentorApp.agreed_to_terms,

      // DoD contracts form section
      prev_year_revenue_total_dod_prime:
        mentorApp &&
        cleanDollarFormat(mentorApp['prev_year_revenue_total_dod_prime']),
      two_prev_year_revenue_total_dod_prime:
        mentorApp &&
        cleanDollarFormat(mentorApp['two_prev_year_revenue_total_dod_prime']),
      prev_year_revenue_total_dod_sub:
        mentorApp &&
        cleanDollarFormat(mentorApp['prev_year_revenue_total_dod_sub']),
      two_prev_year_revenue_total_dod_sub:
        mentorApp &&
        cleanDollarFormat(mentorApp['two_prev_year_revenue_total_dod_sub']),
      prev_year_revenue_federal_prime:
        mentorApp &&
        cleanDollarFormat(mentorApp['prev_year_revenue_federal_prime']),
      two_prev_year_revenue_federal_prime:
        mentorApp &&
        cleanDollarFormat(mentorApp['two_prev_year_revenue_federal_prime']),
      prev_year_revenue_federal_sub:
        mentorApp &&
        cleanDollarFormat(mentorApp['prev_year_revenue_federal_sub']),
      two_prev_year_revenue_federal_sub:
        mentorApp &&
        cleanDollarFormat(mentorApp['two_prev_year_revenue_federal_sub']),
      prev_year_revenue_dod_awarded_sub:
        mentorApp &&
        cleanDollarFormat(mentorApp['prev_year_revenue_dod_awarded_sub']),
      two_prev_year_revenue_dod_awarded_sub:
        mentorApp &&
        cleanDollarFormat(mentorApp['two_prev_year_revenue_dod_awarded_sub']),
      prev_year_revenue_federal_awarded_sub:
        mentorApp &&
        cleanDollarFormat(mentorApp['prev_year_revenue_federal_awarded_sub']),
      two_prev_year_revenue_federal_awarded_sub:
        mentorApp &&
        cleanDollarFormat(
          mentorApp['two_prev_year_revenue_federal_awarded_sub']
        ),

      // DoD subcontracts form section
      prev_year_revenue_dod_sdb_awarded_sub:
        mentorApp &&
        cleanDollarFormat(mentorApp['prev_year_revenue_dod_sdb_awarded_sub']),
      two_prev_year_revenue_dod_sdb_awarded_sub:
        mentorApp &&
        cleanDollarFormat(
          mentorApp['two_prev_year_revenue_dod_sdb_awarded_sub']
        ),
      prev_year_revenue_total_sdb_awarded_sub:
        mentorApp &&
        cleanDollarFormat(mentorApp['prev_year_revenue_total_sdb_awarded_sub']),
      two_prev_year_revenue_total_sdb_awarded_sub:
        mentorApp &&
        cleanDollarFormat(
          mentorApp['two_prev_year_revenue_total_sdb_awarded_sub']
        ),

      // eligibility2 form section
      eligibility_explanation: mentorApp && mentorApp.eligibility_explanation,

      app_sba_cgp: mentorApp && mentorApp["app_sba_cgp"],
      app_sba_sdb: mentorApp && mentorApp["app_sba_sdb"],
      app_sba_sde: mentorApp && mentorApp["app_sba_sde"],
      app_sba_hz: mentorApp && mentorApp["app_sba_hz"],
      app_sba_wosb: mentorApp && mentorApp["app_sba_wosb"],
      app_sba_nog: mentorApp && mentorApp["app_sba_nog"],
      app_sba_vosb: mentorApp && mentorApp["app_sba_vosb"],
      app_sba_8a: mentorApp && mentorApp["app_sba_8a"],
      app_sba_8a_graduated_date:
        mentorApp && mentorApp["app_sba_8a_graduated_date"],
      // new fields
      app_sba_it: mentorApp && mentorApp["app_sba_it"],
      app_sba_ndc: mentorApp && mentorApp["app_sba_ndc"],
      app_sba_dod_needs: mentorApp && mentorApp["app_sba_dod_needs"],

      // developmental assistance form section
      developmental_assistance_explanation:
        mentorApp && mentorApp.developmental_assistance_explanation
    }

    if (mentorApp && mentorApp['company_graduated_8a_program'] === 'false') {
      delete payload['graduated_8a_program_on']
    }

    const rawResponse = fetch(
      userInfo && userInfo.mentor_app && userInfo.mentor_app[0] ? putUrl : url,
      {
        method:
          userInfo && userInfo.mentor_app && userInfo.mentor_app[0]
            ? 'put'
            : 'post',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json', ...authHeader() }
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })

    const applicationResponse = await rawResponse

    if (
      submit == false &&
      userInfo.mentor_app &&
      userInfo.mentor_app[0]?.uuid
    ) {
      setMentorApplicationSummary(true);
      getMentorApp();
      return;
    }

    if (applicationResponse && applicationResponse?.uuid && submit === true) {
      localStorage.setItem("application_submitted", true);
      localStorage.setItem("latest_application", applicationResponse?.uuid);
      getMentorApp();
      history.push("/mentorApplicationSuccess");
    } else if (
      (await applicationResponse) &&
      applicationResponse?.uuid &&
      submit === false
    ) {
      localStorage.setItem("latest_application", applicationResponse?.uuid);
      localStorage.setItem("application_saved", true);
      getMentorApp();
      getCurrentUserInfoData();
    }
  }

  const mentorApplicationInformation =
    mentorApplicationInfo && mentorApplicationInfo[0]

  const handleAnticipatedFiles = (files) => {
    setAnticipatedFile(files);
  };

  const handleEligibilityFiles = (files) => {
    setEligibilityFile(files);
  };

  const handleHistoricalFiles = (files) => {
    setHistoricalBackgroundFile(files);
  };

  const handleDevelopmentalAssistanceFile = (files) => {
    setDevelopmentAssistanceFile(files);
  };

  const handleDodContractFile = (files) => {
    setSdbDoDContractFile(files);
  };

  // field names to get files
  const get_field_name = {
    eligibility: 'eligibility_upload_file',
    historical_background: 'historical_background_upload_file',
    developmental_assistance: 'developmental_assistance_upload_file',
    sdb_dod_contract: 'sdb_dod_contract_upload_file',
    sdb_ofa_contract: 'sdb_ofa_contract_upload_file',
    reviewerFiles: 'reviewer_uploaded_file'
  }

  const agreement_type = 'mentor application'

  return (
    <div className="mb-5">
      {saveSlider && (
        <div className="px-5 d-flex justify-content-center">
          <div className="success-application col-md-4 p-3">
            <div className="row d-flex justify-content-center">
              <div className="col-md-1">
                <img className="success-checkmark" alt="" src={checkMarkIcon} />
              </div>
              <div className="col-md-8">
                <p className="m-0 text-center font-weight-bold">
                  Application Successfully Saved
                </p>
              </div>
              <div className="col-md-1">
                <div
                  tabIndex="0"
                  className="success-close focusable-item"
                  onClick={() => HideSlider()}
                >
                  X
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isErrorsFound && (
        <div className="px-5">
          <div
            ref={errorSummaryRef}
            className="row"
            role="group"
            tabIndex="-1"
            // aria-labelledby='errorSummary-heading' // commenting out for discussion
          >
            <div className="col-md-10 p-0 ml-3 error-summary">
              <div className="row">
                <div className="col-md-12">
                  <h4 className="m-0">
                    <img className="mb-1" alt="" src={errorAlert} /> Errors Have
                    Been Found
                  </h4>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p className="my-2">
                    Please review the following issues and re-submit
                  </p>
                </div>
              </div>
              <ul className="p-0">
                {!mentorApp?.['has_anticipated_protege'] && (
                  <li className="error-list-item">
                    <HashLink
                      className="m-0 error-item focusable-item"
                      to={{ hash: '#anticipated-protege-questions' }}
                    >
                      Anticipated Protégé Questions
                    </HashLink>
                  </li>
                )}

                {mentorApp?.['has_anticipated_protege'] === 'true' &&
                  isAnticipatedProtegeExplanationOrFileUploadMissing && (
                    <li className="error-list-item">
                      <HashLink
                        className="m-0 error-item focusable-item"
                        to={{ hash: '#anticipated-protege-questions' }}
                      >
                        Anticipated Protégé Statement
                      </HashLink>
                    </li>
                  )}
                {notAnsweredEligibilityQuestions && (
                  <li className="error-list-item">
                    <HashLink
                      className="m-0 error-item focusable-item"
                      to={{ hash: '#eligibility-questions' }}
                    >
                      Eligibility Questions
                    </HashLink>
                  </li>
                )}
                {isEligibilityExplanationOrFileUploadMissing && (
                  <li className="error-list-item">
                    <HashLink
                      className="m-0 error-item focusable-item"
                      to={{ hash: '#eligibility-content' }}
                    >
                      Eligibility Statement
                    </HashLink>
                  </li>
                )}
                {notAnsweredHistoryQuestions && (
                  <li className="error-list-item">
                    <HashLink
                      className="m-0 error-item focusable-item"
                      to={{ hash: '#history-questions' }}
                    >
                      History Questions
                    </HashLink>
                  </li>
                )}
                {isHistoryBackgroundExplanationOrFileUploadMissing && (
                  <li className="error-list-item">
                    <HashLink
                      className="m-0 error-item focusable-item"
                      to={{ hash: '#history-content' }}
                    >
                      History Statement
                    </HashLink>
                  </li>
                )}
                {isDevelopmentalAssistanceExplanationOrFileUploadMissing && (
                  <li className="error-list-item">
                    <HashLink
                      className="m-0 error-item focusable-item"
                      to={{ hash: '#developmental-assitance-content' }}
                    >
                      Developmental Assistance
                    </HashLink>
                  </li>
                )}
                {hasNotAgreedToTerms && (
                  <li className="error-list-item">
                    <HashLink
                      className="m-0 error-item focusable-item"
                      to={{ hash: '#terms-and-conditions' }}
                    >
                      Terms &amp; Conditions
                    </HashLink>
                  </li>
                )}
                {isGraduation8aProgramDateProvided && (
                  <li className="error-list-item">
                    <HashLink
                      className="m-0 error-item focusable-item"
                      to={{ hash: '#graduation-eighta-program-on' }}
                    >
                      Graduation 8(a) Program On
                    </HashLink>
                  </li>
                )}
                {isAllDodAndFederalAgenciesContractsMissing && (
                  <li className="error-list-item">
                    <HashLink
                      className="m-0 error-item focusable-item"
                      to={{ hash: '#dod-federal-agency-contracts' }}
                    >
                      DoD &amp; Federal Agencies Contract
                    </HashLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {
        <ExitToDashboardModal
          showModal={showExitToDashboardModal}
          closeModalHandler={closeExitToDashboardModal}
          returnToDashbaordHandler={goBackToMentorDashboard}
        />
      }

      {!mentorApplicationSummary && !uuid ? (
        <main id="main">
          <div id="mentor-application-form" className="px-5">
            <h1 className="page-title my-4 section-header">
              Mentor Application
            </h1>
            <form onSubmit={handleSubmit(submit)}>
              <div className="row mb-4">
                <div className="col-10">
                  <p className="m-0 mb-3 left-align">
                    A Company interested in participating in the DoD
                    Mentor-Protégé Program must submit this application for
                    approval as a mentor. Interested firms must be accepted as a
                    participating mentor prior to negotiation of a
                    mentor-protégé agreement.
                  </p>
                  <p className="m-0 left-align">
                    <strong>Note:</strong> Some of your information is
                    pre-filled, but you will need to complete this application.
                  </p>
                </div>
              </div>
              <CompanyInformation
                mentorApp={mentorApp}
                stateOptions={statesInfo}
                mentorApplicationInfo={mentorApplicationInformation}
              />
              <ContactInformation
                mentorApp={mentorApp}
                stateOptions={statesInfo}
                mentorApplicationInfo={mentorApplicationInformation}
              />
              <Eligibility
                mentorApp={mentorApp}
                mentorApplicationInfo={mentorApplicationInformation}
                submitted={validateFieldSubmit}
                fileChange={onFileChange}
                hook={setEligibilityFile}
                isEligibleStatement={isEligibleStatement}
                isEligibleFiles={isEligibleFiles}
                agreement_type={agreement_type}
                handleUploadedFiles={handleEligibilityFiles}
                mentor_app_id={mentorAppId}
                initialFiles={eligibilityFile}
                eligibilityUploadFile={eligibilityFile}
                getMentorApp={getMentorApp}
                isEligibilityExplanationOrFileUploadProvided={
                  isEligibilityExplanationOrFileUploadMissing
                }
                uploadFieldName={fieldNames.eligibility}
                getUuid={getUuid}
                userUuid={userInfo?.uuid}
                allMentorAppMentorUser={allMentorAppMentorUser}
                isMentor={true}
                fieldNames={fieldNames}
              />
              {/* <Eligibility2
                mentorApp={mentorApp}
                fileChange={onFileChange}
                hook={setEligibilityFile}
                isEligibleStatement={isEligibleStatement}
                isEligibleFiles={isEligibleFiles}
                mentorApplicationInfo={mentorApplicationInformation}
                agreement_type={agreement_type}
                handleUploadedFiles={handleEligibilityFiles}
                mentor_app_id={mentorAppId}
                initialFiles={eligibilityFile}
                eligibilityUploadFile={eligibilityFile}
                getMentorApp={getMentorApp}
                isEligibilityExplanationOrFileUploadProvided={
                  isEligibilityExplanationOrFileUploadMissing
                }
                uploadFieldName={fieldNames.eligibility}
                getUuid={getUuid}
                userUuid={userInfo?.uuid}
                allMentorAppMentorUser={allMentorAppMentorUser}
                isMentor={true}
              /> */}
              <AnticipatedProtege
                mentorApp={mentorApp}
                mentorApplicationInfo={mentorApplicationInformation}
                handleUploadedFiles={handleAnticipatedFiles}
                mentor_app_id={mentorAppId}
                agreement_type={agreement_type}
                getUuid={getUuid}
                uploadFieldName={fieldNames.anticipated_protege}
                getMentorApp={getMentorApp}
                anticipatedFile={anticipatedFile}
                isAnticipatedStatement={isAnticipatedStatement}
                allMentorAppMentorUser={allMentorAppMentorUser}
                isExplanationOrFileUploadProvided={
                  isAnticipatedProtegeExplanationOrFileUploadMissing
                }
                submitted={validateFieldSubmit}
                // initialFiles={anticipatedFile}
              />
              <HistoricalBackground
                mentorApp={mentorApp}
                mentorApplicationInfo={mentorApplicationInformation}
                submitted={validateFieldSubmit}
                isGraduation8aProgramDateProvided={
                  isGraduation8aProgramDateProvided
                }
              />
              <History
                mentorApp={mentorApp}
                fileChange={onFileChange}
                hook={setHistoricalBackgroundFile}
                isHistoryStatement={isHistoryStatement}
                isHistoryFiles={isHistoryFiles}
                mentorApplicationInfo={mentorApplicationInformation}
                agreement_type={agreement_type}
                handleUploadedFiles={handleHistoricalFiles}
                mentor_app_id={mentorAppId}
                historyUploadFile={historicalBackgroundFile}
                getMentorApp={getMentorApp}
                isHistoryBackgroundExplanationOrFileUploadProvided={
                  isHistoryBackgroundExplanationOrFileUploadMissing
                }
                initialFiles={historicalBackgroundFile}
                field_name={fieldNames.historical_background}
                getUuid={getUuid}
                userUuid={userInfo?.uuid}
                allMentorAppMentorUser={allMentorAppMentorUser}
                isMentor={true}
              />
              <DODContracts
                mentorApp={mentorApp}
                mentorApplicationInfo={mentorApplicationInformation}
                isAllDodAndFederalAgenciesContractsProvided={
                  isAllDodAndFederalAgenciesContractsMissing
                }
                agreement_type={agreement_type}
                field_name={fieldNames.developmental_assistance}
                mentor_app_id={mentorAppId}
                allMentorAppMentorUser={allMentorAppMentorUser}
                getUuid={getUuid}
                userUuid={userInfo?.uuid}
              />
              <DevelopmentAssistance
                mentorApp={mentorApp}
                fileChange={onFileChange}
                hook={setDevelopmentAssistanceFile}
                isDevelopmentStatement={isDevelopmentStatement}
                isDevelopmentFiles={isDevelopmentFiles}
                mentorApplicationInfo={mentorApplicationInformation}
                agreement_type={agreement_type}
                handleUploadedFiles={handleDevelopmentalAssistanceFile}
                mentor_app_id={mentorAppId}
                developmentalAssistanceUploadFile={developmentAssistanceFile}
                getMentorApp={getMentorApp}
                isDevelopmentalAssistanceExplanationOrFileUploadProvided={
                  isDevelopmentalAssistanceExplanationOrFileUploadMissing
                }
                initialFiles={developmentAssistanceFile}
                field_name={fieldNames.developmental_assistance}
                getUuid={getUuid}
                userUuid={userInfo?.uuid}
                allMentorAppMentorUser={allMentorAppMentorUser}
                isMentor={true}
              />
              <TermsAndConditions
                mentorApp={mentorApp}
                mentorApplicationInfo={mentorApplicationInformation}
                submitted={validateFieldSubmit}
                setHasNotAgreedToTerms={setHasNotAgreedToTerms}
                hasNotAgreedToTerms={hasNotAgreedToTerms}
              />
              {allMentorAppMentorUser &&
              allMentorAppMentorUser.status === 'declined' ? (
                <ApplicationStatus
                  applicationStatus={allMentorAppMentorUser.status}
                  statusReason={comments}
                  reviewerFiles={reviewerFiles}
                  isMentorApp={true}
                />
              ) : null}
              {isErrorsFound === false ? (
                <div>
                  <p className="sr-only">
                    Please hit the submit button to submit the form.
                  </p>
                </div>
              ) : null}
              <div className="row">
                <div className="col-md-10 text-right">
                  <button
                    type="submit"
                    className="btn btn-primary float-left mentor-app-submit-button focusable-item"
                    aria-disabled={isDisabled}
                    onClick={() => Save()}
                  >
                    Save &amp; Continue
                  </button>
                  <button
                    type="button"
                    className="btn button-border float-left ml-4 focusable-item"
                    onClick={displayExitToDashboardModal}
                  >
                    Exit to Dashboard
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      ) : (
        <MentorApplicationSummary
          mentorApp={
            mentorApplicationInfo ? mentorApplicationInfo[0] : mentorApp
          }
          changeToApplication={changeToApplication}
          changeToMentorApp={ChangeToMentorApp}
          sendMentorApp={sendMentorApp}
          applicationStatus={applicationStatus}
          field_name={fieldNames}
          // anticipatedFile={anticipatedFile}
          eligiblityFile={eligibilityFile}
          historicalBackgroundFile={historicalBackgroundFile}
          developmentAssistanceFile={developmentAssistanceFile}
          reviewerFiles={reviewerFiles}
          mentor_app_id={mentorAppId}
          appUuid={mentorAppId}
          statusReason={statusReason}
          status={status}
          reason={reason}
          allMentorAppMentorUser={allMentorAppMentorUser}
          isMentor={true}
          isReviewer={isReviewer}
          uuid={uuid}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  mentorApp: state.form.mentorApplication && state.form.mentorApplication.values
})

MentorApplication = reduxForm({
  enableReinitialize: true,
  form: 'mentorApplication'
})(MentorApplication)

export default connect(mapStateToProps, null)(MentorApplication)
