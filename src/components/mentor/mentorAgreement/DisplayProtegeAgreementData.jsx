import React from 'react'
import formatPhone from '../../../helpers/formatter/formatPhone'
import { setSectionHeader, setSectionItem, setSubSectionHeader, setTwoItemSection, areAllPropertiesTruthy, getHistoricalBackgroundFileInformation } from '../../commonComponents/sidebarUtilities'
import { keydownHandler } from '../../commonComponents/utility'
import closeIcon from '../../../assets/images/close_icon.png'

const DisplayProtegeAgreementData = ({ protegeAgreementData, closeSideBarFn }) => {
    const protegeAgreementDataKeys = protegeAgreementData && Object.keys(protegeAgreementData);

    // Retrieving Data For MPP Contact (Protégé) key
    const mppContactProtege = protegeAgreementDataKeys && protegeAgreementData[protegeAgreementDataKeys[1]]

    // Retrieving Data For DCMA Contact key
    const dcmaContact = protegeAgreementDataKeys && protegeAgreementData[protegeAgreementDataKeys[2]]

    // Retrieving Data For Authorized Protégé POC Signee key
    const authorizedProtegePOCSignee = protegeAgreementDataKeys && protegeAgreementData[protegeAgreementDataKeys[3]]

    // Retrieving Data For Protégé Status key
    const protegeStatus = protegeAgreementDataKeys && protegeAgreementData[protegeAgreementDataKeys[5]]

    // Retrieving Data For Firm Information key
    const firmInformation = protegeAgreementDataKeys && protegeAgreementData[protegeAgreementDataKeys[6]]

    // Retrieving Data For Historical Background key
    const historicalBackground = protegeAgreementDataKeys && protegeAgreementData[protegeAgreementDataKeys[7]]

    // Retrieving Data For Termination Data key
    const terminationData = protegeAgreementDataKeys && protegeAgreementData[protegeAgreementDataKeys[9]]

    // Retrieving Data For DoD Contracts key
    const dodContracts = protegeAgreementDataKeys && protegeAgreementData[protegeAgreementDataKeys[10]]

    // Retrieving Data For DoD Prime Contracts key
    const dodPrimeContracts = protegeAgreementDataKeys && protegeAgreementData[protegeAgreementDataKeys[11]]

    // Retrieving Data For Certifications key
    const certifications = protegeAgreementDataKeys && protegeAgreementData[protegeAgreementDataKeys[12]]

    // Retrieving Data For DoD Contracts key
    const federalAgencyContracts = protegeAgreementDataKeys && protegeAgreementData[protegeAgreementDataKeys[13]]

    // Retrieving Data For DoD Prime Contracts key
    const federalAgencySubContracts = protegeAgreementDataKeys && protegeAgreementData[protegeAgreementDataKeys[14]]

    // Retrieving Data For ACO Contact key
    const acoContact = protegeAgreementDataKeys && protegeAgreementData[protegeAgreementDataKeys[15]]

    // Retrieving Data For CAO Contact key
    const caoContact = protegeAgreementDataKeys && protegeAgreementData[protegeAgreementDataKeys[16]]

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12 mt-3 text-center">
                        <h4>
                            <strong>Protégé&apos;s Section Of Agreement</strong>
                            <img tabIndex="0" className="side-bar-content float-right mr-2 focusable-item" src={closeIcon} aria-label="Close Right Side Panel" alt="" onClick={() => closeSideBarFn()} onKeyDown={keydownHandler} />
                        </h4>
                    </div>
                </div>

                {firmInformation && Object.values(firmInformation).length > 0 && areAllPropertiesTruthy(firmInformation) &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("Company Information")}
                            <div className="row mt-3"></div>
                            <div className="row">
                                <div className="col-md-12 pl-5 pr-5">
                                    <strong>{'Name'}: </strong>&nbsp;&nbsp;<span>{firmInformation.legal_business_name}</span>
                                </div>
                            </div>
                            {(firmInformation.company_address && firmInformation.company_city && firmInformation.company_state && firmInformation.company_zip) &&
                                <div className="row">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>{'Address'}: </strong>&nbsp;&nbsp;<span>{`${firmInformation.company_address} ${firmInformation.company_city} ${firmInformation.company_state} ${firmInformation.company_zip}`}</span>
                                    </div>
                                </div>}
                            <div className="row">
                                <div className="col-md-12 pl-5 pr-5">
                                    <strong>{'Phone'}: </strong>&nbsp;&nbsp;<span>{firmInformation.company_phone}</span>
                                </div>
                            </div>
                            {firmInformation.company_fax &&
                                <div className="row">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>{'Fax'}: </strong>&nbsp;&nbsp;<span>{firmInformation.company_fax}</span>
                                    </div>
                                </div>}
                            <div className="row">
                                <div className="col-md-12 pl-5 pr-5">
                                    <strong>{'Cage Code'}: </strong>&nbsp;&nbsp;<span>{firmInformation.cage_code}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 pl-5 pr-5">
                                    <strong>{'Duns Number'}: </strong>&nbsp;&nbsp;<span>{firmInformation.duns_number}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 pl-5 pr-5">
                                    <strong>{'Year Established'}: </strong>&nbsp;&nbsp;<span>{firmInformation.firm_year_established}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 pl-5 pr-5">
                                    <strong>{'Number Of Employees'}: </strong>&nbsp;&nbsp;<span>{firmInformation.firm_number_of_employees}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 pl-5 pr-5">
                                    <strong>{'Annual Gross Revenue'}: </strong>&nbsp;&nbsp;<span>{`$${firmInformation.firm_annual_gross_revenue}.00`}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 pl-5 pr-5">
                                    <strong>{'NAICS Codes'}: </strong>&nbsp;&nbsp;<span>{firmInformation.naics_codes}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 pl-5 pr-5">
                                    <strong>{'Percentage Owned'}: </strong>&nbsp;&nbsp;<span>{firmInformation.firm_percent_owned}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="row my-4">
                    <div className="col-md-12">
                        {setSectionHeader("Point Of Contact")}

                        {mppContactProtege && Object.values(mppContactProtege).length > 0 && areAllPropertiesTruthy(mppContactProtege) &&
                            <div className="row mt-3">
                                <div className="col-md-12 pl-5">
                                    <strong>MPP Contact (Protégé)</strong>
                                </div>
                                <div className="col-md-12 mt-2">
                                    {setSectionItem(`${mppContactProtege.mpp_contact_first_name} ${mppContactProtege.mpp_contact_last_name}`)}
                                    {setSectionItem(mppContactProtege.mpp_contact_title)}
                                    {(mppContactProtege.mpp_contact_address && mppContactProtege.mpp_contact_city && mppContactProtege.mpp_contact_state && mppContactProtege.mpp_contact_zip) && setSectionItem(`${mppContactProtege.mpp_contact_address} ${mppContactProtege.mpp_contact_city} ${mppContactProtege.mpp_contact_state} ${mppContactProtege.mpp_contact_zip}`)}
                                    {setTwoItemSection('Phone', formatPhone(mppContactProtege.mpp_contact_phone), 'Fax', formatPhone(mppContactProtege.mpp_contact_fax))}
                                    {setTwoItemSection('Email', mppContactProtege.mpp_contact_email)}
                                </div>
                            </div>}

                        {dcmaContact && Object.values(dcmaContact).length > 0 && areAllPropertiesTruthy(dcmaContact) &&
                            <div className="row mt-3">
                                <div className="col-md-12 pl-5">
                                    <strong>DCMA Contact</strong>
                                </div>
                                <div className="col-md-12 mt-2">
                                    {setSectionItem(dcmaContact.dcma_primary_contact)}
                                    {setSectionItem(dcmaContact.dcma_contact_title)}
                                    {(dcmaContact.dcma_contact_address && dcmaContact.dcma_contact_city && dcmaContact.dcma_contact_state && dcmaContact.dcma_contact_zip) && setSectionItem(`${dcmaContact.dcma_contact_address} ${dcmaContact.dcma_contact_city} ${dcmaContact.dcma_contact_state} ${dcmaContact.dcma_contact_zip}`)}
                                    {setTwoItemSection('Phone', formatPhone(dcmaContact.dcma_contact_phone))}
                                    {setTwoItemSection('Email', dcmaContact.dcma_contact_email)}
                                </div>
                            </div>}

                        {acoContact && Object.values(acoContact).length > 0 && areAllPropertiesTruthy(acoContact) &&
                            <div className="row mt-3">
                                <div className="col-md-12 pl-5">
                                    <strong>ACO Contact</strong>
                                </div>
                                <div className="col-md-12 mt-2">
                                    {setSectionItem(acoContact.aco_name)}
                                    {setSectionItem(acoContact.aco_title)}
                                    {(acoContact.aco_address && acoContact.aco_city && acoContact.aco_state && acoContact.aco_zip) && setSectionItem(`${acoContact.aco_address} ${acoContact.aco_city} ${acoContact.aco_state} ${acoContact.aco_zip}`)}
                                    {setTwoItemSection('Phone', formatPhone(acoContact.aco_tel), 'Fax', formatPhone(acoContact.aco_fax))}
                                    {setTwoItemSection('Email', acoContact.aco_email)}
                                </div>
                            </div>}

                        {caoContact && Object.values(caoContact).length > 0 && areAllPropertiesTruthy(caoContact) &&
                            <div className="row mt-3">
                                <div className="col-md-12 pl-5">
                                    <strong>CAO Contact</strong>
                                </div>
                                <div className="col-md-12 mt-2">
                                    {setSectionItem(caoContact.cao_name)}
                                    {setSectionItem(caoContact.cao_title)}
                                    {(caoContact.cao_address && caoContact.cao_city && caoContact.cao_state && caoContact.cao_zip) && setSectionItem(`${caoContact.cao_address} ${caoContact.cao_city} ${caoContact.cao_state} ${caoContact.cao_zip}`)}
                                    {setTwoItemSection('Phone', formatPhone(caoContact.cao_tel), 'Fax', formatPhone(caoContact.cao_fax))}
                                    {setTwoItemSection('Email', caoContact.cao_email)}
                                </div>
                            </div>}

                        {authorizedProtegePOCSignee && Object.values(authorizedProtegePOCSignee).length > 0 && areAllPropertiesTruthy(authorizedProtegePOCSignee) &&
                            <div className="row mt-3">
                                <div className="col-md-12 pl-5">
                                    <strong>Authorized Protégé POC Signee</strong>
                                </div>
                                <div className="col-md-12 mt-2">
                                    {setSectionItem(authorizedProtegePOCSignee.signee_primary_contact)}
                                    {setSectionItem(authorizedProtegePOCSignee.signee_contact_title)}
                                    {(authorizedProtegePOCSignee.signee_contact_address && authorizedProtegePOCSignee.signee_contact_city && authorizedProtegePOCSignee.signee_contact_state && authorizedProtegePOCSignee.signee_contact_zip) && setSectionItem(`${authorizedProtegePOCSignee.signee_contact_address} ${authorizedProtegePOCSignee.signee_contact_city} ${authorizedProtegePOCSignee.signee_contact_state} ${authorizedProtegePOCSignee.signee_contact_zip}`)}
                                    {setTwoItemSection('Phone', authorizedProtegePOCSignee.signee_contact_phone, 'Fax', authorizedProtegePOCSignee.signee_contact_fax)}
                                    {setTwoItemSection('Email', authorizedProtegePOCSignee.signee_contact_email)}
                                </div>
                            </div>}
                    </div>
                </div>

                {protegeStatus && Object.values(protegeStatus).length > 0 &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("Program Participation")}
                            <div className="row mt-3"></div>
                            {protegeStatus.protege_firm_participated &&
                                <div className="row">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>{'Protégé Firm Participated'}: </strong>&nbsp;&nbsp;<span>{protegeStatus.protege_firm_participated ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>
                            }
                            {protegeStatus.prev_mentor_firm_name &&
                                <div className="row">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>{'Previous Mentor Company Name'}: </strong>&nbsp;&nbsp;<span>{protegeStatus.prev_mentor_firm_name}</span>
                                    </div>
                                </div>
                            }
                            {protegeStatus.credit_direct_reimbursed &&
                                <div className="row">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>{'Agreement Type'}: </strong>&nbsp;&nbsp;<span>{protegeStatus.credit_direct_reimbursed}</span>
                                    </div>
                                </div>
                            }
                            {protegeStatus.sponsoring_military_dept_agency &&
                                <div className="row">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>{'Agency Type'}: </strong>&nbsp;&nbsp;<span>{protegeStatus.sponsoring_military_dept_agency}</span>
                                    </div>
                                </div>
                            }
                            {protegeStatus.period_of_prev_agreement &&
                                <div className="row">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>{'Period of Performance'}: </strong>&nbsp;&nbsp;<span>{protegeStatus.period_of_prev_agreement}</span>
                                    </div>
                                </div>
                            }
                            {terminationData && Object.values(terminationData).length > 0 && areAllPropertiesTruthy(terminationData) &&
                                <div className="row">
                                    <div className="col-md-12">
                                        {terminationData.termination_date &&
                                            <div className="row">
                                                <div className="col-md-12 pl-5 pr-5">
                                                    <strong>Termination Date: </strong>&nbsp;&nbsp;<span>{terminationData.termination_date}</span>
                                                </div>
                                            </div>
                                        }
                                        {terminationData.termination_reason &&
                                            <div className="row">
                                                <div className="col-md-12 pl-5 pr-5">
                                                    <strong>Termination Reason: </strong><br />
                                                    <span style={{ wordBreak: 'break-word' }}>{terminationData.termination_reason}</span>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }

                {historicalBackground && Object.values(historicalBackground).length > 0 && areAllPropertiesTruthy(historicalBackground) &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("Historical Background")}
                            <div className="row mt-3"></div>
                            {historicalBackground.historical_agreement_background_file &&
                                <>
                                    <div className="row">
                                        <div className="col-md-12 pl-5 pr-5">
                                            <strong>Document Upload(s):</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            {getHistoricalBackgroundFileInformation(historicalBackground.historical_agreement_background_file)}
                                        </div>
                                    </div>
                                </>
                            }
                            {historicalBackground.historical_background_explanation &&
                                <div className="row">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>{'Historical Background Summary'}: </strong><br />
                                        <span style={{ wordBreak: 'break-word' }}>{historicalBackground.historical_background_explanation}</span>
                                    </div>
                                </div>
                            }
                            {historicalBackground.historical_background_file &&
                                <div className="row">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>{'Historical Background File'}: </strong>&nbsp;&nbsp;<span>{historicalBackground.historical_background_file}</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }

                {dodContracts && Object.values(dodContracts).length > 0 && areAllPropertiesTruthy(dodContracts) &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("DoD Contract")}
                            {(dodContracts.fiscal_year1 || dodContracts.funded_contact_value1 || dodContracts.number_1 || dodContracts.dollar_amount_recieved1) &&
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSubSectionHeader("DoD Contract 1")}
                                        {dodContracts.fiscal_year1 && setSectionItem(dodContracts.fiscal_year1, "Fiscal Year")}
                                        {dodContracts.funded_contact_value1 && setSectionItem(`$${dodContracts.funded_contact_value1}.00`, "Funded Contact Value")}
                                        {dodContracts.number_1 && setSectionItem(dodContracts.number_1, "Number")}
                                        {dodContracts.dollar_amount_recieved1 && setSectionItem(`$${dodContracts.dollar_amount_recieved1}.00`, "Dollar Amount Received")}
                                    </div>
                                </div>
                            }
                            {(dodContracts.fiscal_year2 || dodContracts.funded_contact_value2 || dodContracts.number_2 || dodContracts.dollar_amount_recieved2) &&
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSubSectionHeader("DoD Contract 2")}
                                        {dodContracts.fiscal_year2 && setSectionItem(dodContracts.fiscal_year2, "Fiscal Year")}
                                        {dodContracts.funded_contact_value2 && setSectionItem(`$${dodContracts.funded_contact_value2}.00`, "Funded Contact Value")}
                                        {dodContracts.number_2 && setSectionItem(dodContracts.number_2, "Number")}
                                        {dodContracts.dollar_amount_recieved2 && setSectionItem(`$${dodContracts.dollar_amount_recieved2}.00`, "Dollar Amount Received")}
                                    </div>
                                </div>
                            }
                            {(dodContracts.fiscal_year3 || dodContracts.funded_contact_value3 || dodContracts.number_3 || dodContracts.dollar_amount_recieved3) &&
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSubSectionHeader("DoD Contract 3")}
                                        {dodContracts.fiscal_year3 && setSectionItem(dodContracts.fiscal_year3, "Fiscal Year")}
                                        {dodContracts.funded_contact_value3 && setSectionItem(`$${dodContracts.funded_contact_value3}.00`, "Funded Contact Value")}
                                        {dodContracts.number_3 && setSectionItem(dodContracts.number_3, "Number")}
                                        {dodContracts.dollar_amount_recieved3 && setSectionItem(`$${dodContracts.dollar_amount_recieved3}.00`, "Dollar Amount Received")}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }

                {dodPrimeContracts && Object.values(dodPrimeContracts).length > 0 && areAllPropertiesTruthy(dodPrimeContracts) &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("DoD Prime Contract")}
                            {(dodPrimeContracts.fiscal_year_prime1 || dodPrimeContracts.funded_contact_value_prime1 || dodPrimeContracts.number_prime_1 || dodPrimeContracts.dollar_amount_recieved_prime1) &&
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSubSectionHeader("DoD Contract 1")}
                                        {dodPrimeContracts.fiscal_year_prime1 && setSectionItem(dodPrimeContracts.fiscal_year_prime1, "Fiscal Year")}
                                        {dodPrimeContracts.funded_contact_value_prime1 && setSectionItem(`$${dodPrimeContracts.funded_contact_value_prime1}.00`, "Funded Contact Value")}
                                        {dodPrimeContracts.number_prime_1 && setSectionItem(dodPrimeContracts.number_prime_1, "Number")}
                                        {dodPrimeContracts.dollar_amount_recieved_prime1 && setSectionItem(`$${dodPrimeContracts.dollar_amount_recieved_prime1}.00`, "Dollar Amount Received")}
                                    </div>
                                </div>
                            }
                            {(dodPrimeContracts.fiscal_year_prime2 || dodPrimeContracts.funded_contact_value_prime2 || dodPrimeContracts.number_prime_2 || dodPrimeContracts.dollar_amount_recieved_prime2) &&
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSubSectionHeader("DoD Contract 2")}
                                        {dodPrimeContracts.fiscal_year_prime2 && setSectionItem(dodPrimeContracts.fiscal_year_prime2, "Fiscal Year")}
                                        {dodPrimeContracts.funded_contact_value_prime2 && setSectionItem(`$${dodPrimeContracts.funded_contact_value_prime2}.00`, "Funded Contact Value")}
                                        {dodPrimeContracts.number_prime_2 && setSectionItem(dodPrimeContracts.number_prime_2, "Number")}
                                        {dodPrimeContracts.dollar_amount_recieved_prime2 && setSectionItem(`$${dodPrimeContracts.dollar_amount_recieved_prime2}.00`, "Dollar Amount Received")}
                                    </div>
                                </div>
                            }
                            {(dodPrimeContracts.fiscal_year_prime3 || dodPrimeContracts.funded_contact_value_prime3 || dodPrimeContracts.number_prime_3 || dodPrimeContracts.dollar_amount_recieved_prime3) &&
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSubSectionHeader("DoD Contract 3")}
                                        {dodPrimeContracts.fiscal_year_prime3 && setSectionItem(dodPrimeContracts.fiscal_year_prime3, "Fiscal Year")}
                                        {dodPrimeContracts.funded_contact_value_prime3 && setSectionItem(`$${dodPrimeContracts.funded_contact_value_prime3}.00`, "Funded Contact Value")}
                                        {dodPrimeContracts.number_prime_3 && setSectionItem(dodPrimeContracts.number_prime_3, "Number")}
                                        {dodPrimeContracts.dollar_amount_recieved_prime3 && setSectionItem(`$${dodPrimeContracts.dollar_amount_recieved_prime3}.00`, "Dollar Amount Received")}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }

                {federalAgencyContracts && Object.values(federalAgencyContracts).length > 0 && areAllPropertiesTruthy(federalAgencyContracts) &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("Federal Agency Contracts")}
                            {(federalAgencyContracts.fed_fiscal_year_prime_1 || federalAgencyContracts.fed_funded_contract_value_prime_1 || federalAgencyContracts.fed_number_prime_1 || federalAgencyContracts.fed_dollar_amount_recieved_prime_1) &&
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSubSectionHeader("DoD Contract 1")}
                                        {federalAgencyContracts.fed_fiscal_year_prime_1 && setSectionItem(federalAgencyContracts.fed_fiscal_year_prime_1, "Fiscal Year")}
                                        {federalAgencyContracts.fed_funded_contract_value_prime_1 && setSectionItem(`$${federalAgencyContracts.fed_funded_contract_value_prime_1}.00`, "Funded Contact Value")}
                                        {federalAgencyContracts.fed_number_prime_1 && setSectionItem(federalAgencyContracts.fed_number_prime_1, "Number")}
                                        {federalAgencyContracts.fed_dollar_amount_recieved_prime_1 && setSectionItem(`$${federalAgencyContracts.fed_dollar_amount_recieved_prime_1}.00`, "Dollar Amount Received")}
                                    </div>
                                </div>
                            }
                            {(federalAgencyContracts.fed_fiscal_year_prime_2 || federalAgencyContracts.fed_funded_contract_value_prime_2 || federalAgencyContracts.fed_number_prime_2 || federalAgencyContracts.fed_dollar_amount_recieved_prime_2) &&
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSubSectionHeader("DoD Contract 2")}
                                        {federalAgencyContracts.fed_fiscal_year_prime_2 && setSectionItem(federalAgencyContracts.fed_fiscal_year_prime_2, "Fiscal Year")}
                                        {federalAgencyContracts.fed_funded_contract_value_prime_2 && setSectionItem(`$${federalAgencyContracts.fed_funded_contract_value_prime_2}.00`, "Funded Contact Value")}
                                        {federalAgencyContracts.fed_number_prime_2 && setSectionItem(federalAgencyContracts.fed_number_prime_2, "Number")}
                                        {federalAgencyContracts.fed_dollar_amount_recieved_prime_2 && setSectionItem(`$${federalAgencyContracts.fed_dollar_amount_recieved_prime_2}.00`, "Dollar Amount Received")}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }

                {federalAgencySubContracts && Object.values(federalAgencySubContracts).length > 0 && areAllPropertiesTruthy(federalAgencySubContracts) &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("Federal Agency SubContracts")}
                            {(federalAgencySubContracts.fed_fiscal_year_sub_1 || federalAgencySubContracts.fed_funded_contract_value_sub_1 || federalAgencySubContracts.fed_number_sub_1 || federalAgencySubContracts.fed_dollar_amount_recieved_sub_1) &&
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSubSectionHeader("DoD Contract 1")}
                                        {federalAgencySubContracts.fed_fiscal_year_sub_1 && setSectionItem(federalAgencySubContracts.fed_fiscal_year_sub_1, "Fiscal Year")}
                                        {federalAgencySubContracts.fed_funded_contract_value_sub_1 && setSectionItem(`$${federalAgencySubContracts.fed_funded_contract_value_sub_1}.00`, "Funded Contact Value")}
                                        {federalAgencySubContracts.fed_number_sub_1 && setSectionItem(federalAgencySubContracts.fed_number_sub_1, "Number")}
                                        {federalAgencySubContracts.fed_dollar_amount_recieved_sub_1 && setSectionItem(`$${federalAgencySubContracts.fed_dollar_amount_recieved_sub_1}.00`, "Dollar Amount Received")}
                                    </div>
                                </div>
                            }
                            {(federalAgencySubContracts.fed_fiscal_year_sub_2 || federalAgencySubContracts.fed_funded_contract_value_sub_2 || federalAgencySubContracts.fed_number_sub_2 || federalAgencySubContracts.fed_dollar_amount_recieved_sub_2) &&
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSubSectionHeader("DoD Contract 2")}
                                        {federalAgencySubContracts.fed_fiscal_year_sub_2 && setSectionItem(federalAgencySubContracts.fed_fiscal_year_sub_2, "Fiscal Year")}
                                        {federalAgencySubContracts.fed_funded_contract_value_sub_2 && setSectionItem(`$${federalAgencySubContracts.fed_funded_contract_value_sub_2}.00`, "Funded Contact Value")}
                                        {federalAgencySubContracts.fed_number_sub_2 && setSectionItem(federalAgencySubContracts.fed_number_sub_2, "Number")}
                                        {federalAgencySubContracts.fed_dollar_amount_recieved_sub_2 && setSectionItem(`$${federalAgencySubContracts.fed_dollar_amount_recieved_sub_2}.00`, "Dollar Amount Received")}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }

                {certifications && Object.values(certifications).length > 0 && areAllPropertiesTruthy(certifications) &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("Certifications")}
                            <div className="row mt-3"></div>
                            {certifications.certified_small_business &&
                                <div className="row">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>{'Small Business Certification'}: </strong>&nbsp;&nbsp;<span>{certifications.certified_small_business == 'true' ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>
                            }

                            {certifications.certified_small_business == 'false' && certifications.sba_cgp &&
                                <div className="row">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>{'Critical Goods Supplier Program'}: </strong>&nbsp;&nbsp;<span>{certifications.sba_cgp}</span>
                                    </div>
                                </div>
                            }
                            {certifications && certifications.certified_small_business === 'true' && <>
                                {certifications.sba_8a &&
                                    <div className="row">
                                        <div className="col-md-12 pl-5 pr-5">
                                            <strong>{'8(a) Program Participation'}: </strong>&nbsp;&nbsp;<span>{certifications.sba_8a == 'true' ? 'Yes' : 'No'}</span>
                                        </div>
                                    </div>
                                }

                                {certifications.sba_8a_graduated_date &&
                                    <div className="row">
                                        <div className="col-md-12 pl-5 pr-5">
                                            <strong>{'Protégé Agreement Submitted'}: </strong>&nbsp;&nbsp;<span>{certifications.sba_8a_graduated_date ? 'Submitted' : 'Not Submitted'}</span>
                                        </div>
                                    </div>
                                }

                                {certifications.sba_hz &&
                                    <div className="row">
                                        <div className="col-md-12 pl-5 pr-5">
                                            <strong>{'HUBZone Certified Company'}: </strong>&nbsp;&nbsp;<span>{certifications.sba_hz == 'true' ? 'Yes' : 'No'}</span>
                                        </div>
                                    </div>
                                }

                                {certifications.sba_nog &&
                                    <div className="row">
                                        <div className="col-md-12 pl-5 pr-5">
                                            <strong>{'Native Organization Business'}: </strong>&nbsp;&nbsp;<span>{certifications.sba_nog == 'true' ? 'Yes' : 'No'}</span>
                                        </div>
                                    </div>
                                }

                                {certifications.sba_sdb &&
                                    <div className="row">
                                        <div className="col-md-12 pl-5 pr-5">
                                            <strong>{'Small Disadvantaged Business'}: </strong>&nbsp;&nbsp;<span>{certifications.sba_sdb == 'true' ? 'Yes' : 'No'}</span>
                                        </div>
                                    </div>
                                }

                                {certifications.sba_sde &&
                                    <div className="row">
                                        <div className="col-md-12 pl-5 pr-5">
                                            <strong>{'Severly Disabled Employing Business'}: </strong>&nbsp;&nbsp;<span>{certifications.sba_sde == 'true' ? 'Yes' : 'No'}</span>
                                        </div>
                                    </div>
                                }

                                {certifications.sba_vosb &&
                                    <div className="row">
                                        <div className="col-md-12 pl-5 pr-5">
                                            <strong>{'Veteran Owned Small Business'}: </strong>&nbsp;&nbsp;<span>{certifications.sba_vosb == 'true' ? 'Yes' : 'No'}</span>
                                        </div>
                                    </div>
                                }

                                {certifications.sba_wosb &&
                                    <div className="row">
                                        <div className="col-md-12 pl-5 pr-5">
                                            <strong>{'Women Owned Small Business'}: </strong>&nbsp;&nbsp;<span>{certifications.sba_wosb == 'true' ? 'Yes' : 'No'}</span>
                                        </div>
                                    </div>
                                }
                            </>}

                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default DisplayProtegeAgreementData