import authHeader from '../../authHeader'
import settings from '../../../config/settings'
import {
  cleanDollarFormat,
  setPhoneFormat
} from '../../../helpers/formatter/format'
import pointOfContactSelection from './pointOfContactSelection'

const submitMentorAgreement = async ({
  mentorAgreement,
  submit,
  agreementId,
  developmental_assistance_file,
  companyPOC,
  highestState
}) => {
  const url = settings.devUrl + `/mentorAgr/`
  const data = mentorAgreement

  const pocSelection = pointOfContactSelection({
    selectedPOC: companyPOC,
    mentorAgreement: mentorAgreement
  })

  const payload = {
    // agreement details form section
    agreement_type: data && data.agreement_type,
    agency_dept: data.agency_dept,
    agreement_contact: data && data.agreement_contact,
    solicitation_title: data && data.solicitation_title,
    technology_areas: data && data.technology_areas,
    tech_focus: data && data.tech_focus,
    tech_focus_other_text: data && data.tech_focus_other_text,


    // period of performance form section
    start_date: data && data.start_date,
    number_of_months: data.number_of_months,
    // estimated costs form section
    employee_labor_year_1:
      data && cleanDollarFormat(data.employee_labor_year_1),
    employee_labor_year_2:
      data && cleanDollarFormat(data.employee_labor_year_2),
    employee_labor_year_3:
      data && cleanDollarFormat(data.employee_labor_year_3),
    hbcu_year_1: data && cleanDollarFormat(data.hbcu_year_1),
    hbcu_year_2: data && cleanDollarFormat(data.hbcu_year_2),
    hbcu_year_3: data && cleanDollarFormat(data.hbcu_year_3),
    direct_cost_year_1: data && cleanDollarFormat(data.direct_cost_year_1),
    direct_cost_year_2: data && cleanDollarFormat(data.direct_cost_year_2),
    direct_cost_year_3: data && cleanDollarFormat(data.direct_cost_year_3),
    // mentor firm form section
    legal_business_name: data && data.legal_business_name,
    company_address: data && data.company_address,
    company_phone: data && data.company_phone,
    company_city: data && data.company_city,
    company_state: data && data.company_state,
    company_zip: data && data.company_zip,
    company_fax: data && data.company_fax,
    duns_number: data && data.duns_number,
    cage_code: data && data.cage_code,
    // historical background form section
    // was_small_disadvantaged_business:
    //   data && data.was_small_disadvantaged_business,
    // was_woman_owned_small_business: data && data.was_woman_owned_small_business,
    // company_graduated_8a_program: data && data.company_graduated_8a_program,
    historical_background_explanation: data && data.historical_background_explanation,
    // mentor protege contracts form section
    has_awarded_contracts:
      mentorAgreement.has_awarded_contracts,
    is_total_federal_agency_subcontracts:
      mentorAgreement.is_total_federal_agency_subcontracts,
    is_federal_agency_subcontracts:
      mentorAgreement.is_federal_agency_subcontracts,
    total_fed_fiscal_year_subcontract_1:
      mentorAgreement.total_fed_fiscal_year_subcontract_1,
    total_fed_fiscal_year_subcontract_2:
      mentorAgreement.total_fed_fiscal_year_subcontract_2,
    total_fed_fiscal_year_subcontract_3:
      mentorAgreement.total_fed_fiscal_year_subcontract_3,

    total_fed_dollar_amount_received_1: cleanDollarFormat(
      mentorAgreement.total_fed_dollar_amount_received_1
    ),
    total_fed_dollar_amount_received_2: cleanDollarFormat(
      mentorAgreement.total_fed_dollar_amount_received_2
    ),
    total_fed_dollar_amount_received_3: cleanDollarFormat(
      mentorAgreement.total_fed_dollar_amount_received_3
    ),

    fed_fiscal_year_subcontract_1:
      mentorAgreement.fed_fiscal_year_subcontract_1,
    fed_fiscal_year_subcontract_2:
      mentorAgreement.fed_fiscal_year_subcontract_2,
    fed_fiscal_year_subcontract_3:
      mentorAgreement.fed_fiscal_year_subcontract_3,

    fed_dollar_amount_received_1: cleanDollarFormat(
      mentorAgreement.fed_dollar_amount_received_1
    ),
    fed_dollar_amount_received_2: cleanDollarFormat(
      mentorAgreement.fed_dollar_amount_received_2
    ),
    fed_dollar_amount_received_3: cleanDollarFormat(
      mentorAgreement.fed_dollar_amount_received_3
    ),

    federal_number_1: cleanDollarFormat(mentorAgreement.federal_number_1),
    federal_number_2: cleanDollarFormat(mentorAgreement.federal_number_2),
    federal_number_3: cleanDollarFormat(mentorAgreement.federal_number_3),

    total_federal_number_1: cleanDollarFormat(
      mentorAgreement.total_federal_number_1
    ),
    total_federal_number_2: cleanDollarFormat(
      mentorAgreement.total_federal_number_2
    ),
    total_federal_number_3: cleanDollarFormat(
      mentorAgreement.total_federal_number_3
    ),

    // point of contacts form section
    has_additional_point_of_contact: data.has_additional_point_of_contact,
    aco_selected: data && data.aco_selected,
    dcma_selected: data && data.dcma_selected,
    cao_selected: data && data.cao_selected,
    pco_selected: data && data.pco_selected,

    mpp_contact_first_name: data && data.mpp_contact_first_name,
    mpp_contact_title: data && data.mpp_contact_title,
    mpp_contact_address: data && data.mpp_contact_address,
    mpp_contact_city: data && data.mpp_contact_city,
    mpp_contact_state: data && data.mpp_contact_state,
    mpp_contact_zip: data && data.mpp_contact_zip,
    mpp_contact_phone: data && data.mpp_contact_phone,
    mpp_contact_fax: data && data.mpp_contact_fax,
    mpp_contact_email: data && data.mpp_contact_email,

    pco_name: data && data.pco_name,
    pco_title: data && data.pco_title,
    pco_address: data && data.pco_address,
    pco_city: data && data.pco_city,
    pco_state: data && data.pco_state,
    pco_zip: data && data.pco_zip,
    pco_tel: data && setPhoneFormat(data.pco_tel),
    pco_fax: data && setPhoneFormat(data.pco_fax),
    pco_email: data && data.pco_email,

    dcma_name: data && data.dcma_name,
    dcma_title: data && data.dcma_title,
    dcma_address: data && data.dcma_address,
    dcma_city: data && data.dcma_city,
    dcma_state: data && data.dcma_state,
    dcma_zip: data && data.dcma_zip,
    dcma_tel: data && setPhoneFormat(data.dcma_tel),
    dcma_fax: data && setPhoneFormat(data.dcma_fax),
    dcma_email: data && data.dcma_email,

    aco_name: data && data.aco_name,
    aco_title: data && data.aco_title,
    aco_address: data && data.aco_address,
    aco_city: data && data.aco_city,
    aco_state: data && data.aco_state,
    aco_zip: data && data.aco_zip,
    aco_tel: data && setPhoneFormat(data.aco_tel),
    aco_fax: data && setPhoneFormat(data.aco_fax),
    aco_email: data && data.aco_email,

    cao_name: data && data.cao_name,
    cao_title: data && data.cao_title,
    cao_address: data && data.cao_address,
    cao_city: data && data.cao_city,
    cao_state: data && data.cao_state,
    cao_zip: data && data.cao_zip,
    cao_tel: data && setPhoneFormat(data.cao_tel),
    cao_fax: data && setPhoneFormat(data.cao_fax),
    cao_email: data && data.cao_email,

    mentor_signee_poc: data && data.mentor_signee_poc,
    signee_name: data && pocSelection['signee_name'],
    signee_title: data && pocSelection['signee_title'],
    signee_address: data && pocSelection['signee_address'],
    signee_city: data && pocSelection['signee_city'],
    signee_state: data && pocSelection['signee_state'],
    signee_zip: data && pocSelection['signee_zip'],
    signee_tel: data && setPhoneFormat(pocSelection['signee_tel']),
    signee_fax: data && setPhoneFormat(pocSelection['signee_fax']),
    signee_email: data && pocSelection['signee_email'],

    // developmental assistance form section // given the changes, we may not need these fields
    developmental_assistance_upload_id: data.developmental_assistance_upload_id,
    developmental_assistance_file: developmental_assistance_file,
    // other sections
    mentor_submitted: submit,
    agreement_id: agreementId,
    mentor_highest_selected_section: highestState
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

export default submitMentorAgreement

// replaced the code below with code above
// import authHeader from '../../authHeader';
// import settings from '../../../config/settings';
// import {
//   cleanDollarFormat,
//   setPhoneFormat
// } from '../../../helpers/formatter/format';
// import pointOfContactSelection from './pointOfContactSelection';

// const submitMentorAgreement = async ({
//   mentorAgreement,
//   submit,
//   agreementId,
//   developmentalAssistanceUploadId,
//   developmentalAssistanceFileName,
//   companyPOC,
//   highestState
// }) => {
//   const url = settings.devUrl + `/mentorAgr/`;
//   const data = mentorAgreement;
//   const formData = new FormData();
//   const mentorSigneePOC =
//     mentorAgreement && mentorAgreement['mentor_signee_poc'];

//   for (const name in data) {
//     data[name] !== null &&
//       data[name] !== '
//       poc_name
//       poc_title
//       poc_fax
//       poc_address
//       poc_tel
//       poc_email
//       company_name
//       company_address
//       company_phone
//       company_city
//       company_state
//       company_zip
//       company_fax
//       company_duns_number
//       company_cage_code
//       company_website
//       was_small_disadvantaged_business
//       was_woman_owned_small_business
//       company_graduated_8a_program
//       graduated_8a_program_on
//       aco_tel
//       aco_fax
//       cao_tel
//       cao_fax
//       pco_tel
//       pco_fax
//       emplyoee_labor_year_1
//       emplyoee_labor_year_2
//       emplyoee_labor_year_3
//       hbcu_year_1
//       hbcu_year_2
//       hbcu_year_3
//       direct_cost_year_1
//       direct_cost_year_2
//       direct_cost_year_3
//       funded_contact_value_subcontract_1
//       dollar_amount_recieved_subcontract_1
//       funded_contact_value_subcontract_2
//       dollar_amount_recieved_subcontract_2
//       funded_contact_value_subcontract_3
//       dollar_amount_recieved_subcontract_3
//       funded_contact_value_federal_agency_1
//       dollar_amount_recieved_federal_agency_1
//       funded_contact_value_federal_agency_2
//       dollar_amount_recieved_federal_agency_2
//       funded_contact_value_federal_agency_3
//       dollar_amount_recieved_federal_agency_3
//       dollar_amount_recieved_potential_Subcontract_1
//       dollar_amount_recieved_potential_Subcontract_2
//       dollar_amount_recieved_potential_Subcontract_3
//       developmental_assistance_file
//       developmental_assistance_upload_id
//       mentor_submitted
//       employee_labor_year_1
//       employee_labor_year_2
//       employee_labor_year_3
//       dollar_amount_received_subcontract_1
//       dollar_amount_received_subcontract_2
//       dollar_amount_received_subcontract_3
//       dollar_amount_received_federal_agency_1
//       dollar_amount_received_federal_agency_2
//       dollar_amount_received_federal_agency_3
//       dollar_amount_received_potential_subcontract_1
//       dollar_amount_received_potential_subcontract_2
//       dollar_amount_received_potential_subcontract_3
//       funded_contact_value_potential_subcontract_1
//       funded_contact_value_potential_subcontract_2
//       funded_contact_value_potential_subcontract_3
//       signee_name
//       signee_title
//       signee_address
//       signee_tel
//       signee_fax
//       signee_email
//       signee_city
//       signee_state
//       signee_zip
//       mentor_highest_selected_section
//       formData.append(name, data[name]);
//   }

//   formData.append('mentor_submitted', submit);
//   formData.append('agreement_id', agreementId);
//   // formData.append('developmental_assistance_file', developmentAssistanceFile)

//   // appending dev assistance upload id and filename
//   formData.append(
//     'developmental_assistance_upload_id',
//     developmentalAssistanceUploadId
//   );
//   formData.append(
//     'developmental_assistance_file',
//     developmentalAssistanceFileName
//   );

//   // selectedPOC, mentorAgreement
//   const pocSelection = pointOfContactSelection({
//     selectedPOC: companyPOC,
//     mentorAgreement: mentorAgreement
//   });

//   formData.append('signee_name', setPhoneFormat(pocSelection['signee_name']));
//   formData.append('signee_title', setPhoneFormat(pocSelection['signee_title']));
//   formData.append(
//     'signee_address',
//     setPhoneFormat(pocSelection['signee_address'])
//   );
//   formData.append('signee_tel', setPhoneFormat(pocSelection['signee_tel']));
//   formData.append('signee_fax', setPhoneFormat(pocSelection['signee_fax']));
//   formData.append('signee_email', setPhoneFormat(pocSelection['signee_email']));
//   formData.append('signee_city', setPhoneFormat(pocSelection['signee_city']));
//   formData.append('signee_state', setPhoneFormat(pocSelection['signee_state']));
//   formData.append('signee_zip', setPhoneFormat(pocSelection['signee_zip']));
//   formData.append('mentor_highest_selected_section', highestState);

//   mentorAgreement['aco_tel'] &&
//     formData.append('aco_tel', setPhoneFormat(mentorAgreement['aco_tel']));
//   mentorAgreement['aco_fax'] &&
//     formData.append('aco_fax', setPhoneFormat(mentorAgreement['aco_fax']));

//   mentorAgreement['cao_tel'] &&
//     formData.append('cao_tel', setPhoneFormat(mentorAgreement['cao_tel']));
//   mentorAgreement['cao_fax'] &&
//     formData.append('cao_fax', setPhoneFormat(mentorAgreement['cao_fax']));

//   mentorAgreement['pco_tel'] &&
//     formData.append('pco_tel', setPhoneFormat(mentorAgreement['pco_tel']));
//   mentorAgreement['pco_fax'] &&
//     formData.append('pco_fax', setPhoneFormat(mentorAgreement['pco_fax']));

//   mentorAgreement['employee_labor_year_1'] &&
//     formData.append(
//       'employee_labor_year_1',
//       cleanDollarFormat(mentorAgreement['employee_labor_year_1'])
//     );
//   mentorAgreement['employee_labor_year_2'] &&
//     formData.append(
//       'employee_labor_year_2',
//       cleanDollarFormat(mentorAgreement['employee_labor_year_2'])
//     );
//   mentorAgreement['employee_labor_year_3'] &&
//     formData.append(
//       'employee_labor_year_3',
//       cleanDollarFormat(mentorAgreement['employee_labor_year_3'])
//     );

//   mentorAgreement['hbcu_year_1'] &&
//     formData.append(
//       'hbcu_year_1',
//       cleanDollarFormat(mentorAgreement['hbcu_year_1'])
//     );
//   mentorAgreement['hbcu_year_2'] &&
//     formData.append(
//       'hbcu_year_2',
//       cleanDollarFormat(mentorAgreement['hbcu_year_2'])
//     );
//   mentorAgreement['hbcu_year_3'] &&
//     formData.append(
//       'hbcu_year_3',
//       cleanDollarFormat(mentorAgreement['hbcu_year_3'])
//     );

//   mentorAgreement['direct_cost_year_1'] &&
//     formData.append(
//       'direct_cost_year_1',
//       cleanDollarFormat(mentorAgreement['direct_cost_year_1'])
//     );
//   mentorAgreement['direct_cost_year_2'] &&
//     formData.append(
//       'direct_cost_year_2',
//       cleanDollarFormat(mentorAgreement['direct_cost_year_2'])
//     );
//   mentorAgreement['direct_cost_year_3'] &&
//     formData.append(
//       'direct_cost_year_3',
//       cleanDollarFormat(mentorAgreement['direct_cost_year_3'])
//     );

//   mentorAgreement['funded_contact_value_subcontract_1'] &&
//     formData.append(
//       'funded_contact_value_subcontract_1',
//       cleanDollarFormat(mentorAgreement['funded_contact_value_subcontract_1'])
//     );
//   mentorAgreement['funded_contact_value_subcontract_2'] &&
//     formData.append(
//       'funded_contact_value_subcontract_2',
//       cleanDollarFormat(mentorAgreement['funded_contact_value_subcontract_2'])
//     );
//   mentorAgreement['funded_contact_value_subcontract_3'] &&
//     formData.append(
//       'funded_contact_value_subcontract_3',
//       cleanDollarFormat(mentorAgreement['funded_contact_value_subcontract_3'])
//     );

//   mentorAgreement['dollar_amount_received_subcontract_1'] &&
//     formData.append(
//       'dollar_amount_received_subcontract_1',
//       cleanDollarFormat(mentorAgreement['dollar_amount_received_subcontract_1'])
//     );
//   mentorAgreement['dollar_amount_received_subcontract_2'] &&
//     formData.append(
//       'dollar_amount_received_subcontract_2',
//       cleanDollarFormat(mentorAgreement['dollar_amount_received_subcontract_2'])
//     );
//   mentorAgreement['dollar_amount_received_subcontract_3'] &&
//     formData.append(
//       'dollar_amount_received_subcontract_3',
//       cleanDollarFormat(mentorAgreement['dollar_amount_received_subcontract_3'])
//     );

//   mentorAgreement['funded_contact_value_federal_agency_1'] &&
//     formData.append(
//       'funded_contact_value_federal_agency_1',
//       cleanDollarFormat(
//         mentorAgreement['funded_contact_value_federal_agency_1']
//       )
//     );
//   mentorAgreement['funded_contact_value_federal_agency_2'] &&
//     formData.append(
//       'funded_contact_value_federal_agency_2',
//       cleanDollarFormat(
//         mentorAgreement['funded_contact_value_federal_agency_2']
//       )
//     );
//   mentorAgreement['funded_contact_value_federal_agency_3'] &&
//     formData.append(
//       'funded_contact_value_federal_agency_3',
//       cleanDollarFormat(
//         mentorAgreement['funded_contact_value_federal_agency_3']
//       )
//     );

//   mentorAgreement['dollar_amount_received_federal_agency_1'] &&
//     formData.append(
//       'dollar_amount_received_federal_agency_1',
//       cleanDollarFormat(
//         mentorAgreement['dollar_amount_received_federal_agency_1']
//       )
//     );
//   mentorAgreement['dollar_amount_received_federal_agency_2'] &&
//     formData.append(
//       'dollar_amount_received_federal_agency_2',
//       cleanDollarFormat(
//         mentorAgreement['dollar_amount_received_federal_agency_2']
//       )
//     );
//   mentorAgreement['dollar_amount_received_federal_agency_3'] &&
//     formData.append(
//       'dollar_amount_received_federal_agency_3',
//       cleanDollarFormat(
//         mentorAgreement['dollar_amount_received_federal_agency_3']
//       )
//     );

//   mentorAgreement['funded_contact_value_potential_subcontract_1'] &&
//     formData.append(
//       'funded_contact_value_potential_subcontract_1',
//       cleanDollarFormat(
//         mentorAgreement['funded_contact_value_potential_subcontract_1']
//       )
//     );
//   mentorAgreement['funded_contact_value_potential_subcontract_2'] &&
//     formData.append(
//       'funded_contact_value_potential_subcontract_2',
//       cleanDollarFormat(
//         mentorAgreement['funded_contact_value_potential_subcontract_2']
//       )
//     );
//   mentorAgreement['funded_contact_value_potential_subcontract_3'] &&
//     formData.append(
//       'funded_contact_value_potential_subcontract_3',
//       cleanDollarFormat(
//         mentorAgreement['funded_contact_value_potential_subcontract_3']
//       )
//     );

//   mentorAgreement['dollar_amount_received_potential_subcontract_1'] &&
//     formData.append(
//       'dollar_amount_received_potential_subcontract_1',
//       cleanDollarFormat(
//         mentorAgreement['dollar_amount_received_potential_subcontract_1']
//       )
//     );
//   mentorAgreement['dollar_amount_received_potential_subcontract_2'] &&
//     formData.append(
//       'dollar_amount_received_potential_subcontract_2',
//       cleanDollarFormat(
//         mentorAgreement['dollar_amount_received_potential_subcontract_2']
//       )
//     );
//   mentorAgreement['dollar_amount_received_potential_subcontract_3'] &&
//     formData.append(
//       'dollar_amount_received_potential_subcontract_3',
//       cleanDollarFormat(
//         mentorAgreement['dollar_amount_received_potential_subcontract_3']
//       )
//     );

//   await fetch(url, {
//     method: 'post',
//     body: formData,
//     headers: { ...authHeader() }
//   });
// };

// export default submitMentorAgreement;
