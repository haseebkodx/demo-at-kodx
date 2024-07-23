import validUploadFile from '../../commonComponents/forms/validations/validUploadFile'
import { fieldNames } from './MentorApplication'

const validateMentorForm = (
  mentorApp,
  allMentorAppMentorUser,
  setIsAnticipatedProtegeExplanationOrFileUploadMissing,
  setIsEligibilityExplanationOrFileUploadMissing,
  setIsHistoryBackgroundExplanationOrFileUploadMissing,
  setIsDevelopmentalAssistanceExplanationOrFileUploadMissing,
  setIsGraduation8aProgramDateProvided,
  setIsAllDodAndFederalAgenciesContractsMissing
  // prevYearRevenueFile,
  // twoPrevYearRevenueFile
) => {
  const requiredField = [
    'app_certified_small_business',
    'active_subcontracting_plan',
    'current_fiscal_year_dod_contracts',
    'eligible_for_federal_contracts',
    'agreed_to_terms',
    'prev_year_revenue_total_dod_prime',
    'two_prev_year_revenue_total_dod_prime',
    'prev_year_revenue_total_dod_sub',
    'two_prev_year_revenue_total_dod_sub',
    'prev_year_revenue_federal_prime',
    'two_prev_year_revenue_federal_prime',
    'prev_year_revenue_federal_sub',
    'two_prev_year_revenue_federal_sub',
    'prev_year_revenue_dod_awarded_sub',
    'two_prev_year_revenue_dod_awarded_sub',
    'prev_year_revenue_federal_awarded_sub',
    'two_prev_year_revenue_federal_awarded_sub',
    'prev_year_revenue_dod_sdb_awarded_sub',
    'two_prev_year_revenue_dod_sdb_awarded_sub',
    'prev_year_revenue_total_sdb_awarded_sub',
    'two_prev_year_revenue_total_sdb_awarded_sub',
    'has_anticipated_protege',
  ]

  const dodfederalAgenciesAwardFields = [
    'prev_year_revenue_total_dod_prime',
    'two_prev_year_revenue_total_dod_prime',
    'prev_year_revenue_total_dod_sub',
    'two_prev_year_revenue_total_dod_sub',
    'prev_year_revenue_federal_prime',
    'two_prev_year_revenue_federal_prime',
    'prev_year_revenue_federal_sub',
    'two_prev_year_revenue_federal_sub',
    'prev_year_revenue_dod_awarded_sub',
    'two_prev_year_revenue_dod_awarded_sub',
    'prev_year_revenue_federal_awarded_sub',
    'two_prev_year_revenue_federal_awarded_sub',
    'prev_year_revenue_dod_sdb_awarded_sub',
    'two_prev_year_revenue_dod_sdb_awarded_sub',
    'prev_year_revenue_total_sdb_awarded_sub',
    'two_prev_year_revenue_total_sdb_awarded_sub'
  ]

  const requiredFieldValidate = requiredField.find(
    (field) => mentorApp && !mentorApp[field]
  )

  const hasAnticipatedProtegeExplanation =
    mentorApp?.['anticipated_protege_details'] ? true : false;
    
  const hasAnticipatedProtegeUploadFiles =
    allMentorAppMentorUser?.[fieldNames.anticipated_protege]?.length > 0
      ? true
      : false;


  const hasEligibilityExplanation =
    mentorApp && mentorApp['eligibility_explanation'] ? true : false
  const hasEligibilityUploadFiles =
    (allMentorAppMentorUser &&
      allMentorAppMentorUser['eligibility_upload_file'] &&
      allMentorAppMentorUser['eligibility_upload_file'].length > 0)
      ? true
      : false

  const hasHistoryExplanation =
    mentorApp && mentorApp['historical_background_explanation'] ? true : false
  const hasHistoryUploadFiles =
    (allMentorAppMentorUser &&
      allMentorAppMentorUser['historical_background_upload_file'] &&
      allMentorAppMentorUser['historical_background_upload_file'].length > 0)
      ? true
      : false

  const hasDevelopmentAssistanceExplanation =
    mentorApp && mentorApp['developmental_assistance_explanation']
      ? true
      : false
  const hasDevelopmentAssistanceUploadFiles =
    (allMentorAppMentorUser &&
      allMentorAppMentorUser['developmental_assistance_upload_file'] &&
      allMentorAppMentorUser['developmental_assistance_upload_file'].length > 0)
      ? true
      : false

  // removing check for a valid file name, since we are saving multiple files in an object
      
  const hasAnticipatedProtege = mentorApp?.['has_anticipated_protege'] === 'true';
  const anticipatedProtegeValidate =
    hasAnticipatedProtegeExplanation || hasAnticipatedProtegeUploadFiles;

  const elibilityFileValidate =
    hasEligibilityExplanation || hasEligibilityUploadFiles

  const historicalBgFileValidate =
    hasHistoryExplanation || hasHistoryUploadFiles

  const developAssistFileValidate =
    hasDevelopmentAssistanceExplanation || hasDevelopmentAssistanceUploadFiles

  setIsAnticipatedProtegeExplanationOrFileUploadMissing(!anticipatedProtegeValidate)

  setIsEligibilityExplanationOrFileUploadMissing(!elibilityFileValidate)

  setIsHistoryBackgroundExplanationOrFileUploadMissing(
    !historicalBgFileValidate
  )

  setIsDevelopmentalAssistanceExplanationOrFileUploadMissing(
    !developAssistFileValidate
  )

  // const prevYearRevenueFileValidate = mentorApp && prevYearRevenueFile

  // const twoPrevYearRevenueFileValidate = mentorApp && twoPrevYearRevenueFile

  // const elibilityFileValidate = ((mentorApp && mentorApp['eligibility_explanation'])
  //   || (mentorApp && eligiblityFile && validUploadFile(eligiblityFile.name)))
  //   && (eligiblityFile ? validUploadFile(eligiblityFile.name) : true)

  // const historicalbgFileValidate = ((mentorApp && mentorApp['historical_background_explanation'])
  //   || (mentorApp && historicalBackgroundFile && validUploadFile(historicalBackgroundFile.name)))
  //   && (historicalBackgroundFile ? validUploadFile(historicalBackgroundFile.name) : true)

  // const developAssistFileValidate = ((mentorApp && mentorApp['developmental_assistance_explanation'])
  //   || (mentorApp && developmentAssistanceFile && validUploadFile(developmentAssistanceFile.name)))
  //   && (developmentAssistanceFile ? validUploadFile(developmentAssistanceFile.name) : true)

  // const prevYearRevenueFileValidate = mentorApp && prevYearRevenueFile ? validUploadFile(prevYearRevenueFile.name) : true
  // const twoPrevYearRevenueFileValidate = mentorApp && twoPrevYearRevenueFile ? validUploadFile(twoPrevYearRevenueFile.name) : true

  const graduateEightAProgramDate =
    mentorApp && (mentorApp['company_graduated_8a_program'] === true || mentorApp['company_graduated_8a_program'] === 'true')
      ? mentorApp['graduated_8a_program_on']
      : true

  setIsGraduation8aProgramDateProvided(!graduateEightAProgramDate)

  const dodFederalContractAwardsValidate = dodfederalAgenciesAwardFields.every(field => mentorApp[field] && mentorApp[field].trim() != '$' ? true : false)
  setIsAllDodAndFederalAgenciesContractsMissing(!dodFederalContractAwardsValidate)

  // elibilityFileValidate, historicalbgFileValidate, developAssistFileValidate, prevYearRevenueFileValidate,
  //   twoPrevYearRevenueFileValidate, validateFormat, graduateEightAProgramDate, 'validation')

  return (
    requiredFieldValidate === undefined &&
    graduateEightAProgramDate &&
    (!hasAnticipatedProtege || anticipatedProtegeValidate) &&
    elibilityFileValidate &&
    historicalBgFileValidate &&
    developAssistFileValidate &&
    dodFederalContractAwardsValidate
    // prevYearRevenueFileValidate &&
    //twoPrevYearRevenueFileValidate

  )
}

export default validateMentorForm
