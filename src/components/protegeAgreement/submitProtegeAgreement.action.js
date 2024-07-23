import authHeader from '../authHeader'
import settings from '../../config/settings'
import {
  cleanDollarFormat,
  setPhoneFormat
} from '../../helpers/formatter/format'

const submitProtegeAgreement = async (
  protegeAgreement,
  submit,
  historicalBackgroundFile,
  smallDisadvantagedBusinessDetails,
  agreementId,
  highestState
) => {
  const url = settings.devUrl + '/protegeAgr/'

  const payload = {
    // firm form section
    legal_business_name:
      protegeAgreement && protegeAgreement.legal_business_name,
    company_address: protegeAgreement && protegeAgreement.company_address,
    company_city: protegeAgreement && protegeAgreement.company_city,
    company_state: protegeAgreement && protegeAgreement.company_state,
    company_zip: protegeAgreement && protegeAgreement.company_zip,
    company_phone: protegeAgreement && protegeAgreement.company_phone,
    company_fax: protegeAgreement && protegeAgreement.company_fax,
    cage_code: protegeAgreement && protegeAgreement.cage_code,
    duns_number: protegeAgreement && protegeAgreement.duns_number,
    firm_year_established:
      protegeAgreement && protegeAgreement.firm_year_established
        ? protegeAgreement && protegeAgreement.firm_year_established : null,
    firm_number_of_employees:
      protegeAgreement && protegeAgreement.firm_number_of_employees,
    firm_annual_gross_revenue: cleanDollarFormat(
      protegeAgreement && protegeAgreement.firm_annual_gross_revenue),
    naics_codes: protegeAgreement && protegeAgreement.naics_codes,
    is_firm_percent_owned: protegeAgreement && protegeAgreement.is_firm_percent_owned,
    firm_percent_owned: protegeAgreement && protegeAgreement.firm_percent_owned,
    capability_statement: protegeAgreement && protegeAgreement.capability_statement,

    // point of contact form section

    has_additional_point_of_contract: protegeAgreement && protegeAgreement.has_additional_point_of_contract,
    aco_selected: protegeAgreement && protegeAgreement.aco_selected,
    dcma_selected: protegeAgreement && protegeAgreement.dcma_selected,
    cao_selected: protegeAgreement && protegeAgreement.cao_selected,

    mpp_contact_first_name:
      protegeAgreement && protegeAgreement.mpp_contact_first_name,
    mpp_contact_last_name:
      protegeAgreement && protegeAgreement.mpp_contact_first_name,
    mpp_contact_title: protegeAgreement && protegeAgreement.mpp_contact_title,
    mpp_contact_address:
      protegeAgreement && protegeAgreement.mpp_contact_address,
    mpp_contact_city: protegeAgreement && protegeAgreement.mpp_contact_city,
    mpp_contact_state: protegeAgreement && protegeAgreement.mpp_contact_state,
    mpp_contact_zip: protegeAgreement && protegeAgreement.mpp_contact_zip,
    mpp_contact_email: protegeAgreement && protegeAgreement.mpp_contact_email,
    mpp_contact_fax: protegeAgreement && protegeAgreement.mpp_contact_fax,
    mpp_contact_phone: protegeAgreement && protegeAgreement.mpp_contact_phone,
    dcma_primary_contact:
      protegeAgreement && protegeAgreement.dcma_primary_contact,
    dcma_contact_title: protegeAgreement && protegeAgreement.dcma_contact_title,
    dcma_contact_address:
      protegeAgreement && protegeAgreement.dcma_contact_address,
    dcma_contact_city: protegeAgreement && protegeAgreement.dcma_contact_city,
    dcma_contact_state:
      protegeAgreement && protegeAgreement.dcma_contact_state,
    dcma_contact_zip: protegeAgreement && protegeAgreement.dcma_contact_zip,
    dcma_contact_email: protegeAgreement && protegeAgreement.dcma_contact_email,
    dcma_contact_phone:
      protegeAgreement &&
      setPhoneFormat(protegeAgreement['dcma_contact_phone']),

    aco_name: protegeAgreement && protegeAgreement.aco_name,
    aco_title: protegeAgreement && protegeAgreement.aco_title,
    aco_address: protegeAgreement && protegeAgreement.aco_address,
    aco_city: protegeAgreement && protegeAgreement.aco_city,
    aco_state: protegeAgreement && protegeAgreement.aco_state,
    aco_zip: protegeAgreement && protegeAgreement.aco_zip,
    aco_email: protegeAgreement && protegeAgreement.aco_email,
    aco_tel: protegeAgreement && setPhoneFormat(protegeAgreement['aco_tel']),
    aco_fax: protegeAgreement && setPhoneFormat(protegeAgreement['aco_fax']),

    cao_name: protegeAgreement && protegeAgreement.cao_name,
    cao_title: protegeAgreement && protegeAgreement.cao_title,
    cao_address: protegeAgreement && protegeAgreement.cao_address,
    cao_city: protegeAgreement && protegeAgreement.cao_city,
    cao_state: protegeAgreement && protegeAgreement.cao_state,
    cao_zip: protegeAgreement && protegeAgreement.cao_zip,
    cao_email: protegeAgreement && protegeAgreement.cao_email,
    cao_tel: protegeAgreement && setPhoneFormat(protegeAgreement['cao_tel']),
    cao_fax: protegeAgreement && setPhoneFormat(protegeAgreement['cao_fax']),

    protege_signee_poc: protegeAgreement && protegeAgreement.protege_signee_poc,
    signee_primary_contact:
      protegeAgreement && protegeAgreement.signee_primary_contact,
    signee_contact_title:
      protegeAgreement && protegeAgreement.signee_contact_title,
    signee_contact_address:
      protegeAgreement && protegeAgreement.signee_contact_address,
    signee_contact_city:
      protegeAgreement && protegeAgreement.signee_contact_city,
    signee_contact_state:
      protegeAgreement && protegeAgreement.signee_contact_state,
    signee_contact_zip: protegeAgreement && protegeAgreement.signee_contact_zip,
    signee_contact_email:
      protegeAgreement && protegeAgreement.signee_contact_email,
    signee_contact_fax: protegeAgreement && protegeAgreement.signee_contact_fax,
    signee_contact_phone:
      protegeAgreement && protegeAgreement.signee_contact_phone,

    // historical background form section
    historical_background_explanation:
      protegeAgreement && protegeAgreement.historical_background_explanation,
    historical_agreement_background_file: historicalBackgroundFile,
    // certifications
    // program participation form section
    protege_firm_participated: protegeAgreement.protege_firm_participated,
    prev_mentor_firm_name:
      protegeAgreement.protege_firm_participated === 'true'
        ? protegeAgreement.prev_mentor_firm_name
        : '',
    sponsoring_military_dept_agency:
      protegeAgreement.protege_firm_participated === 'true'
        ? protegeAgreement.sponsoring_military_dept_agency
        : '',
    credit_direct_reimbursed:
      protegeAgreement.protege_firm_participated === 'true'
        ? protegeAgreement.credit_direct_reimbursed
        : '',
    period_of_prev_agreement:
      protegeAgreement.protege_firm_participated === 'true'
        ? protegeAgreement.period_of_prev_agreement
        : '',
    termination_date:
      protegeAgreement.protege_firm_participated === 'true'
        ? protegeAgreement.termination_date
        : '',
    termination_reason:
      protegeAgreement.protege_firm_participated === 'true'
        ? protegeAgreement.termination_reason
        : '',

    //sba_asmp: protegeAgreement.sba_asmp,
    certified_small_business: protegeAgreement.certified_small_business,
    sba_sdb: protegeAgreement.sba_sdb,
    sba_sde: protegeAgreement.sba_sde,
    sba_wosb: protegeAgreement.sba_wosb,
    sba_cgp: protegeAgreement.sba_cgp,
    sba_hz: protegeAgreement.sba_hz,
    sba_nog: protegeAgreement.sba_nog,
    sba_vosb: protegeAgreement.sba_vosb,
    sba_8a: protegeAgreement.sba_8a,
    sba_8a_graduated_date: protegeAgreement['sba_8a_graduated_date'],
    // DoD contracts form section
    has_awarded_contracts: protegeAgreement.has_awarded_contracts,

    is_dod_prime_contracts: protegeAgreement.is_dod_prime_contracts,
    is_dod_subcontracts: protegeAgreement.is_dod_subcontracts,
    is_federal_agency_prime_contracts: protegeAgreement.is_federal_agency_prime_contracts,
    is_federal_agency_subcontracts: protegeAgreement.is_federal_agency_subcontracts,

    fiscal_year1: protegeAgreement.fiscal_year1,
    fiscal_year2: protegeAgreement.fiscal_year2,
    // fiscal_year3: protegeAgreement.fiscal_year3,
    fiscal_year_prime1: protegeAgreement.fiscal_year_prime1,
    fiscal_year_prime2: protegeAgreement.fiscal_year_prime2,
    // fiscal_year_prime3: protegeAgreement.fiscal_year_prime3,
    number_1: protegeAgreement.number_1,
    number_2: protegeAgreement.number_2,
    // number_3: protegeAgreement.number_3,
    number_prime_1: protegeAgreement.number_prime_1,
    number_prime_2: protegeAgreement.number_prime_2,
    // number_prime_3: protegeAgreement.number_prime_3,
    fed_fiscal_year_prime_1: protegeAgreement.fed_fiscal_year_prime_1,
    fed_fiscal_year_prime_2: protegeAgreement.fed_fiscal_year_prime_2,
    fed_dollar_amount_recieved_prime_1: cleanDollarFormat(
      protegeAgreement.fed_dollar_amount_recieved_prime_1
    ),
    fed_dollar_amount_recieved_prime_2: cleanDollarFormat(
      protegeAgreement.fed_dollar_amount_recieved_prime_2
    ),
    fed_funded_contract_value_prime_1: cleanDollarFormat(
      protegeAgreement.fed_funded_contract_value_prime_1
    ),
    fed_funded_contract_value_prime_2: cleanDollarFormat(
      protegeAgreement.fed_funded_contract_value_prime_2
    ),
    fed_number_prime_1: protegeAgreement.fed_number_prime_1,
    fed_number_prime_2: protegeAgreement.fed_number_prime_2,
    fed_fiscal_year_sub_1: protegeAgreement.fed_fiscal_year_sub_1,
    fed_fiscal_year_sub_2: protegeAgreement.fed_fiscal_year_sub_2,
    fed_dollar_amount_recieved_sub_1: cleanDollarFormat(
      protegeAgreement.fed_dollar_amount_recieved_sub_1
    ),
    fed_dollar_amount_recieved_sub_2: cleanDollarFormat(
      protegeAgreement.fed_dollar_amount_recieved_sub_2
    ),
    fed_funded_contract_value_sub_1: cleanDollarFormat(
      protegeAgreement.fed_funded_contract_value_sub_1
    ),
    fed_funded_contract_value_sub_2: cleanDollarFormat(
      protegeAgreement.fed_funded_contract_value_sub_2
    ),
    fed_number_sub_1: protegeAgreement.fed_number_sub_1,
    fed_number_sub_2: protegeAgreement.fed_number_sub_2,
    funded_contact_value1: cleanDollarFormat(
      protegeAgreement['funded_contact_value1']
    ),
    funded_contact_value2: cleanDollarFormat(
      protegeAgreement['funded_contact_value2']
    ),
    funded_contact_value3: cleanDollarFormat(
      protegeAgreement['funded_contact_value3']
    ),
    funded_contact_value_prime1:
      protegeAgreement &&
      cleanDollarFormat(protegeAgreement['funded_contact_value_prime1']),
    funded_contact_value_prime2:
      protegeAgreement &&
      cleanDollarFormat(protegeAgreement['funded_contact_value_prime2']),
    funded_contact_value_prime3:
      protegeAgreement &&
      cleanDollarFormat(protegeAgreement['funded_contact_value_prime3']),
    dollar_amount_recieved1:
      protegeAgreement &&
      cleanDollarFormat(protegeAgreement['dollar_amount_recieved1']),
    dollar_amount_recieved2:
      protegeAgreement &&
      cleanDollarFormat(protegeAgreement['dollar_amount_recieved2']),
    dollar_amount_recieved3:
      protegeAgreement &&
      cleanDollarFormat(protegeAgreement['dollar_amount_recieved3']),
    dollar_amount_recieved_prime1:
      protegeAgreement &&
      cleanDollarFormat(protegeAgreement['dollar_amount_recieved_prime1']),
    dollar_amount_recieved_prime2:
      protegeAgreement &&
      cleanDollarFormat(protegeAgreement['dollar_amount_recieved_prime2']),
    dollar_amount_recieved_prime3:
      protegeAgreement &&
      cleanDollarFormat(protegeAgreement['dollar_amount_recieved_prime3']),
    // other sections
    protege_submitted: submit,
    protege_agr_status: protegeAgreement && protegeAgreement.protege_agr_status,
    protege_highest_selected_section: highestState,
    agreement_id: agreementId
  }

  const rawResponse = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json', ...authHeader() }
  })


  const apiData = await rawResponse.json()
  const { status } = rawResponse
  return { status, apiData }
}

export default submitProtegeAgreement
