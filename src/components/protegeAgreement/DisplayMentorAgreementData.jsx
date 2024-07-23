import React, { useRef } from 'react';
import formatPhone from '../../helpers/formatter/formatPhone'
import { setSectionHeader, setSectionItem, setSubSectionHeader, setTwoItemSection, areAllPropertiesTruthy, getHistoricalBackgroundFileInformation } from '../commonComponents/sidebarUtilities'
import { keydownHandler } from '../commonComponents/utility'
import closeIcon from '../../assets/images/close_icon.png'

const DisplayMentorAgreementData = ({ mentorAgreementData, closeSideBarFn }) => {
    const subTotal1Ref = useRef(0)
    const subTotal2Ref = useRef(0)
    const subTotal3Ref = useRef(0)

    const mentorAgreementDataKeys = Object.keys(mentorAgreementData)

    // Retrieving Data For Company Details key
    const companyInfo = mentorAgreementData[mentorAgreementDataKeys[0]]

    // Retrieving Data For Agreement Details key
    const agreementDetails = mentorAgreementData[mentorAgreementDataKeys[1]]

    // Retrieving Data For Performance Period key
    const performancePeriod = mentorAgreementData[mentorAgreementDataKeys[2]]

    // Retrieving Data For Estimated Costs key
    const estimatedCosts = mentorAgreementData[mentorAgreementDataKeys[3]]

    // Retrieving Data For Federal DOD Contract key
    const federalDodContracts = mentorAgreementData[mentorAgreementDataKeys[4]]

    // Retrieving Data For Point Of Contact (POC) key
    const pocDetails = mentorAgreementData[mentorAgreementDataKeys[8]];

    // Retrieving Data For Administrative Contracting Officer (ACO) key
    const acoDetails = mentorAgreementData[mentorAgreementDataKeys[9]];

    // Retrieving Data For Contact Administration Officer (CAO) key
    const caoDetails = mentorAgreementData[mentorAgreementDataKeys[10]];

    // Retrieving Data For Signature Agreements key
    const signatureAgreements = mentorAgreementData[mentorAgreementDataKeys[11]]

    // Retrieving Data For Mentor Signee key
    const signedMentor = mentorAgreementData[mentorAgreementDataKeys[12]]

    // Retrieving Data For Authorized Mentor POC Signee
    const authorizedMentorPOCSignee = mentorAgreementData[mentorAgreementDataKeys[13]]

    // Retrieving Data For Eligibility
    const eligibility = mentorAgreementData[mentorAgreementDataKeys[14]]

    // Retrieving Data For Historical Background
    const historicalBackground = mentorAgreementData[mentorAgreementDataKeys[15]]

    // Retrieving Data For Developmental Assistance
    const developmentalAssistance = mentorAgreementData[mentorAgreementDataKeys[16]]

    // Retrieving Data For MPP Point Of Contact
    const mppPoc = mentorAgreementData[mentorAgreementDataKeys[17]]

    // Retrieving Data For Defense Contract Management Agency (DCMA)
    const dcmaDetails = mentorAgreementData[mentorAgreementDataKeys[18]]

    // Retrieving Data For Federal Contracts Data 2
    const federalContracts2 = mentorAgreementData[mentorAgreementDataKeys[19]]

    const getEstimatedCostSubTotals = (estimatedLabor, directCost, hbcu, year) => {
        const subTotal = parseInt(estimatedLabor ? estimatedLabor : 0) + parseInt(directCost ? directCost : 0) + parseInt(hbcu ? hbcu : 0)

        switch (year) {
            case 'Year 1':
                subTotal1Ref.current = subTotal
                break
            case 'Year 2':
                subTotal2Ref.current = subTotal
                break
            case 'Year 3':
                subTotal3Ref.current = subTotal
        }

        return subTotal
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12 mt-3 text-center">
                        <h4>
                            <strong>Mentor&apos;s Section Of Agreement</strong>
                            <img tabIndex="0" className="side-bar-content float-right mr-2 focusable-item" src={closeIcon} aria-label="Close Right Side Panel" alt="" onClick={() => closeSideBarFn()} onKeyDown={keydownHandler} />
                        </h4>
                    </div>
                </div>

                {Object.values(companyInfo).length > 0 && areAllPropertiesTruthy(companyInfo) &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("Company Information")}
                            <div className="row">
                                <div className="col-md-12 mt-3">
                                    {companyInfo.legal_business_name && setSectionItem(companyInfo.legal_business_name)}
                                    {(companyInfo.company_address && companyInfo.company_city && companyInfo.company_state && companyInfo.company_zip) && setSectionItem(`${companyInfo.company_address} ${companyInfo.company_city} ${companyInfo.company_state} ${companyInfo.company_zip}`)}
                                    {setTwoItemSection('Phone', formatPhone(companyInfo.company_phone), 'Fax', formatPhone(companyInfo.company_fax))}
                                    {setTwoItemSection('CAGE', companyInfo.cage_code, 'DUNS', companyInfo.duns_number)}
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {Object.values(signedMentor).length > 0 && areAllPropertiesTruthy(signedMentor) &&
                    <div className="row">
                        <div className="col-md-12">
                            {setSectionHeader("Signed Mentor")}
                            {signedMentor.sign_mentor_name &&
                                <div className="row mt-3">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>Mentor Name: </strong>&nbsp;&nbsp;<span>{signedMentor.sign_mentor_name}</span>
                                    </div>
                                </div>
                            }
                            {signedMentor.sign_mentor_title &&
                                <div className="row">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>Mentor Title: </strong>&nbsp;&nbsp;<span>{signedMentor.sign_mentor_title}</span>
                                    </div>
                                </div>
                            }
                            {signedMentor.sign_mentor_date &&
                                <div className="row">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>Signed Mentor Date: </strong>&nbsp;&nbsp;<span>{signedMentor.sign_mentor_date}</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }

                {Object.values(pocDetails).length > 0 && areAllPropertiesTruthy(pocDetails) &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("Point Of Contact (POC)")}
                            <div className="row">
                                <div className="col-md-12 mt-3">
                                    {pocDetails.pco_name && setSectionItem(pocDetails.pco_name)}
                                    {pocDetails.pco_title && setSectionItem(pocDetails.pco_title)}
                                    {(pocDetails.pco_address && pocDetails.pco_city && pocDetails.pco_state && pocDetails.pco_zip) && setSectionItem(`${pocDetails.pco_address} ${pocDetails.pco_city} ${pocDetails.pco_state} ${pocDetails.pco_zip}`)}
                                    {pocDetails.pco_tel && setSectionItem(formatPhone(pocDetails.pco_tel), 'Phone')}
                                    {pocDetails.pco_fax && setSectionItem(formatPhone(pocDetails.pco_fax), 'Fax')}
                                    {pocDetails.pco_email && setSectionItem(pocDetails.pco_email, 'Email')}
                                </div>
                            </div>
                        </div>


                        {Object.values(acoDetails).length > 0 && areAllPropertiesTruthy(acoDetails) &&
                            <div className="row mt-3 pl-3">
                                <div className="col-md-12 pl-5">
                                    <strong>Administrative Contact Officer (ACO)</strong>
                                </div>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12 mt-2">
                                            {acoDetails.aco_name && setSectionItem(acoDetails.aco_name)}
                                            {acoDetails.aco_title && setSectionItem(acoDetails.aco_title)}
                                            {(acoDetails.aco_address && acoDetails.aco_city && acoDetails.aco_state && acoDetails.aco_zip) && setSectionItem(`${acoDetails.aco_address} ${acoDetails.aco_city} ${acoDetails.aco_state} ${acoDetails.aco_zip}`)}
                                            {acoDetails.aco_tel && setSectionItem(formatPhone(acoDetails.aco_tel), 'Phone')}
                                            {acoDetails.aco_fax && setSectionItem(formatPhone(acoDetails.aco_fax), 'Fax')}
                                            {acoDetails.aco_email && setSectionItem(acoDetails.aco_email, 'Email')}
                                        </div>
                                    </div>
                                </div>
                            </div>}

                        {Object.values(caoDetails).length > 0 && areAllPropertiesTruthy(caoDetails) &&
                            <div className="row mt-3 pl-3">
                                <div className="col-md-12 pl-5">
                                    <strong>Contact Administration Officer (CAO)</strong>
                                </div>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12 mt-2">
                                            {caoDetails.cao_name && setSectionItem(caoDetails.cao_name)}
                                            {caoDetails.cao_title && setSectionItem(caoDetails.cao_title)}
                                            {(caoDetails.cao_address && caoDetails.cao_city && caoDetails.cao_state && caoDetails.cao_zip) && setSectionItem(`${caoDetails.cao_address} ${caoDetails.cao_city} ${caoDetails.cao_state} ${caoDetails.cao_zip}`)}
                                            {caoDetails.cao_tel && setSectionItem(formatPhone(caoDetails.cao_tel), 'Phone')}
                                            {caoDetails.cao_fax && setSectionItem(formatPhone(caoDetails.cao_fax), 'Fax')}
                                            {caoDetails.cao_email && setSectionItem(caoDetails.cao_email, 'Email')}
                                        </div>
                                    </div>
                                </div>
                            </div>}

                        {Object.values(dcmaDetails).length > 0 && areAllPropertiesTruthy(dcmaDetails) &&
                            <div className="row mt-3 pl-3">
                                <div className="col-md-12 pl-5">
                                    <strong>Defense Contract Management Agency (DCMA)</strong>
                                </div>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12 mt-2">
                                            {dcmaDetails.dcma_name && setSectionItem(dcmaDetails.dcma_name)}
                                            {dcmaDetails.dcma_title && setSectionItem(dcmaDetails.dcma_title)}
                                            {(dcmaDetails.dcma_address && dcmaDetails.dcma_city && dcmaDetails.dcma_state && dcmaDetails.dcma_zip) && setSectionItem(`${dcmaDetails.dcma_address} ${dcmaDetails.dcma_city} ${dcmaDetails.dcma_state} ${dcmaDetails.dcma_zip}`)}
                                            {dcmaDetails.dcma_tel && setSectionItem(formatPhone(dcmaDetails.dcma_tel), 'Phone')}
                                            {dcmaDetails.dcma_email && setSectionItem(dcmaDetails.dcma_email, 'Email')}
                                        </div>
                                    </div>
                                </div>
                            </div>}

                        {Object.values(authorizedMentorPOCSignee).length > 0 && areAllPropertiesTruthy(authorizedMentorPOCSignee) &&
                            <div className="row mt-3 pl-3">
                                <div className="col-md-12 pl-5">
                                    <strong>Authorized Mentor POC Signee</strong>
                                </div>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12 mt-2">
                                            {authorizedMentorPOCSignee.signee_name && setSectionItem(authorizedMentorPOCSignee.signee_name)}
                                            {authorizedMentorPOCSignee.signee_title && setSectionItem(authorizedMentorPOCSignee.signee_title)}
                                            {(authorizedMentorPOCSignee.signee_address && authorizedMentorPOCSignee.signee_city && authorizedMentorPOCSignee.signee_state && authorizedMentorPOCSignee.signee_zip) && setSectionItem(`${authorizedMentorPOCSignee.signee_address} ${authorizedMentorPOCSignee.signee_city} ${authorizedMentorPOCSignee.signee_state} ${authorizedMentorPOCSignee.signee_zip}`)}
                                            {authorizedMentorPOCSignee.signee_tel && setSectionItem(formatPhone(authorizedMentorPOCSignee.signee_tel), 'Phone')}
                                            {authorizedMentorPOCSignee.signee_fax && setSectionItem(formatPhone(authorizedMentorPOCSignee.signee_fax), 'Fax')}
                                            {authorizedMentorPOCSignee.signee_email && setSectionItem(authorizedMentorPOCSignee.signee_email, 'Email')}
                                        </div>
                                    </div>
                                </div>
                            </div>}

                        {Object.values(mppPoc).length > 0 && areAllPropertiesTruthy(mppPoc) &&
                            <div className="row mt-3 pl-3">
                                <div className="col-md-12 pl-5">
                                    <strong>MPP Point Of Contact</strong>
                                </div>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12 mt-2">
                                            {mppPoc.mpp_contact_name && setSectionItem(mppPoc.mpp_contact_name)}
                                            {mppPoc.mpp_contact_title && setSectionItem(mppPoc.mpp_contact_title)}
                                            {mppPoc.mpp_contact_phone && setSectionItem(formatPhone(mppPoc.mpp_contact_phone), 'Phone')}
                                            {mppPoc.mpp_contact_fax && setSectionItem(formatPhone(mppPoc.mpp_contact_fax), 'Fax')}
                                            {mppPoc.mpp_contact_email && setSectionItem(mppPoc.mpp_contact_email, 'Email')}
                                            {(mppPoc.mpp_contact_address && mppPoc.mpp_contact_city && mppPoc.mpp_contact_state && mppPoc.mpp_contact_zip) && setSectionItem(`${mppPoc.mpp_contact_address} ${mppPoc.mpp_contact_city} ${mppPoc.mpp_contact_state} ${mppPoc.mpp_contact_zip}`)}
                                        </div>
                                    </div>
                                </div>
                            </div>}
                    </div>}

                {Object.values(agreementDetails).length > 0 && areAllPropertiesTruthy(agreementDetails) &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("Agreement Details")}
                            <div className="row">
                                <div className="col-md-12 mt-3">
                                    {agreementDetails.agreement_type && setSectionItem(agreementDetails.agreement_type, 'Type')}
                                    {agreementDetails.agency_dept && setSectionItem(agreementDetails.agency_dept, 'Department Agency')}
                                    {agreementDetails.agreement_contact && setSectionItem(agreementDetails.agreement_contact, 'Contract')}
                                    {agreementDetails.solicitation_title && setSectionItem(agreementDetails.solicitation_title, 'Solicitation Title')}
                                    {agreementDetails.tech_focus && setSectionItem(agreementDetails.tech_focus && agreementDetails.tech_focus === 'Other'
                                        ? agreementDetails.tech_focus_other_text : agreementDetails.tech_focus, 'Technology Areas')}
                                    {agreementDetails.mentor_arg_status && setSectionItem(agreementDetails.mentor_arg_status, 'Mentor Agreement Status')}
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {Object.values(performancePeriod).length > 0 && areAllPropertiesTruthy(performancePeriod) &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("Period Of Performance")}
                            <div className="row">
                                <div className="col-md-12 mt-3">
                                    {performancePeriod.number_of_months && setSectionItem(performancePeriod.number_of_months, 'Number Of Months')}
                                    {performancePeriod.start_date && setSectionItem(performancePeriod.start_date, 'Start Date')}
                                    {performancePeriod.end_date && setSectionItem(performancePeriod.end_date, 'End Date')}
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {Object.values(estimatedCosts).length > 0 && areAllPropertiesTruthy(estimatedCosts) &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("Estimated Costs")}
                            <div className="row my-3">
                                <div className="col-md-12">
                                    {(estimatedCosts.employee_labor_year_1 || estimatedCosts.direct_cost_year_1 || estimatedCosts.hbcu_year_1) && setSubSectionHeader("Year 1")}
                                    {estimatedCosts.employee_labor_year_1 && setSectionItem(`$${estimatedCosts.employee_labor_year_1}.00`, 'Employee Labor')}
                                    {estimatedCosts.direct_cost_year_1 && setSectionItem(`$${estimatedCosts.direct_cost_year_1}.00`, 'Direct Cost')}
                                    {estimatedCosts.hbcu_year_1 && setSectionItem(`$${estimatedCosts.hbcu_year_1}.00`, 'HBCU')}
                                </div>
                                {(estimatedCosts.employee_labor_year_1 || estimatedCosts.direct_cost_year_1 || estimatedCosts.hbcu_year_1) &&
                                    <div className="col-md-12 my-2">
                                        {setSectionItem(`$${getEstimatedCostSubTotals(estimatedCosts.employee_labor_year_1, estimatedCosts.direct_cost_year_1, estimatedCosts.hbcu_year_1, 'Year 1')}`, 'Sub Total')}
                                    </div>}
                            </div>
                            <div className="row my-3">
                                <div className="col-md-12">
                                    {(estimatedCosts.employee_labor_year_2 || estimatedCosts.direct_cost_year_2 || estimatedCosts.hbcu_year_2) && setSubSectionHeader("Year 2")}
                                    {estimatedCosts.employee_labor_year_2 && setSectionItem(`$${estimatedCosts.employee_labor_year_2}.00`, 'Employee Labor')}
                                    {estimatedCosts.direct_cost_year_2 && setSectionItem(`$${estimatedCosts.direct_cost_year_2}.00`, 'Direct Cost')}
                                    {estimatedCosts.hbcu_year_2 && setSectionItem(`$${estimatedCosts.hbcu_year_2}.00`, 'HBCU')}
                                </div>
                                {(estimatedCosts.employee_labor_year_2 || estimatedCosts.direct_cost_year_2 || estimatedCosts.hbcu_year_2) &&
                                    <div className="col-md-12 my-2">
                                        {setSectionItem(`$${getEstimatedCostSubTotals(estimatedCosts.employee_labor_year_2, estimatedCosts.direct_cost_year_2, estimatedCosts.hbcu_year_2, 'Year 2')}`, 'Sub Total')}
                                    </div>}
                            </div>
                            <div className="row my-3">
                                <div className="col-md-12">
                                    {(estimatedCosts.employee_labor_year_3 || estimatedCosts.direct_cost_year_3 || estimatedCosts.hbcu_year_3) && setSubSectionHeader("Year 3")}
                                    {estimatedCosts.employee_labor_year_3 && setSectionItem(`$${estimatedCosts.employee_labor_year_3}.00`, 'Employee Labor')}
                                    {estimatedCosts.direct_cost_year_3 && setSectionItem(`$${estimatedCosts.direct_cost_year_3}.00`, 'Direct Cost')}
                                    {estimatedCosts.hbcu_year_3 && setSectionItem(`$${estimatedCosts.hbcu_year_3}.00`, 'HBCU')}
                                </div>
                                {(estimatedCosts.employee_labor_year_3 || estimatedCosts.direct_cost_year_3 || estimatedCosts.hbcu_year_3) &&
                                    <div className="col-md-12 my-2">
                                        {setSectionItem(`$${getEstimatedCostSubTotals(estimatedCosts.employee_labor_year_3, estimatedCosts.direct_cost_year_3, estimatedCosts.hbcu_year_3, 'Year 3')}`, 'Sub Total')}
                                    </div>}
                            </div>
                        </div>
                        {((subTotal1Ref.current != 0) || (subTotal2Ref.current != 0) || (subTotal3Ref.current != 0)) &&
                            <div className="col-md-12 my-2">
                                {setSectionItem(`$${subTotal1Ref.current + subTotal2Ref.current + subTotal3Ref.current}.00`, 'Total Estimated Costs')}
                            </div>}
                    </div>
                }

                {Object.values(federalDodContracts).length > 0 && areAllPropertiesTruthy(federalDodContracts) &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("Federal Subcontracts Awarded to Protégé by Mentor")}
                            {(federalDodContracts.fed_fiscal_year_subcontract_1 || federalDodContracts.fed_dollar_amount_received_1 || federalDodContracts.federal_number_1) &&
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSubSectionHeader(`Federal Subcontract Award For ${federalDodContracts.fed_fiscal_year_subcontract_1}`)}
                                        {federalDodContracts.fed_fiscal_year_subcontract_1 && setSectionItem(federalDodContracts.fed_fiscal_year_subcontract_1, 'Fiscal Year')}
                                        {federalDodContracts.fed_dollar_amount_received_1 && setSectionItem(`$${federalDodContracts.fed_dollar_amount_received_1}.00`, 'Funded Contact Value')}
                                        {federalDodContracts.federal_number_1 && setSectionItem(`$${federalDodContracts.federal_number_1}.00`, 'Number')}
                                    </div>
                                </div>
                            }
                            {(federalDodContracts.fed_fiscal_year_subcontract_2 || federalDodContracts.fed_dollar_amount_received_2 || federalDodContracts.federal_number_2) &&
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSubSectionHeader(`Federal Subcontract Award For ${federalDodContracts.fed_fiscal_year_subcontract_2}`)}
                                        {federalDodContracts.fed_fiscal_year_subcontract_2 && setSectionItem(federalDodContracts.fed_fiscal_year_subcontract_2, 'Fiscal Year')}
                                        {federalDodContracts.fed_dollar_amount_received_2 && setSectionItem(`$${federalDodContracts.fed_dollar_amount_received_2}.00`, 'Funded Contact Value')}
                                        {federalDodContracts.federal_number_2 && setSectionItem(`$${federalDodContracts.federal_number_2}.00`, 'Number')}
                                    </div>
                                </div>
                            }
                            {(federalDodContracts.fed_fiscal_year_subcontract_3 || federalDodContracts.fed_dollar_amount_received_3 || federalDodContracts.federal_number_3) &&
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSubSectionHeader(`Federal Subcontract Award For ${federalDodContracts.fed_fiscal_year_subcontract_3}`)}
                                        {federalDodContracts.fed_fiscal_year_subcontract_3 && setSectionItem(federalDodContracts.fed_fiscal_year_subcontract_3, 'Fiscal Year')}
                                        {federalDodContracts.fed_dollar_amount_received_3 && setSectionItem(`$${federalDodContracts.fed_dollar_amount_received_3}.00`, 'Funded Contact Value')}
                                        {federalDodContracts.federal_number_3 && setSectionItem(`$${federalDodContracts.federal_number_3}.00`, 'Number')}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }

                {Object.values(federalContracts2).length > 0 && areAllPropertiesTruthy(federalContracts2) &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("Total Federal Subcontract Awards to this Protégé")}
                            {(federalContracts2.total_fed_fiscal_year_subcontract_1 || federalContracts2.total_fed_dollar_amount_received_1 || federalContracts2.total_federal_number_1) &&
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSubSectionHeader(`Total Federal Subcontract Award For ${federalContracts2.total_fed_fiscal_year_subcontract_1}`)}
                                        {federalContracts2.total_fed_fiscal_year_subcontract_1 && setSectionItem(federalContracts2.total_fed_fiscal_year_subcontract_1, 'Fiscal Year')}
                                        {federalContracts2.total_fed_dollar_amount_received_1 && setSectionItem(`$${federalContracts2.total_fed_dollar_amount_received_1}.00`, 'Funded Contact Value')}
                                        {federalContracts2.total_federal_number_1 && setSectionItem(`$${federalContracts2.total_federal_number_1}.00`, 'Number')}
                                    </div>
                                </div>
                            }
                            {(federalContracts2.total_fed_fiscal_year_subcontract_2 || federalContracts2.total_fed_dollar_amount_received_2 || federalContracts2.total_federal_number_2) &&
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSubSectionHeader(`Total Federal Subcontract Award For ${federalContracts2.total_fed_fiscal_year_subcontract_2}`)}
                                        {federalContracts2.total_fed_fiscal_year_subcontract_2 && setSectionItem(federalContracts2.total_fed_fiscal_year_subcontract_2, 'Fiscal Year')}
                                        {federalContracts2.total_fed_dollar_amount_received_2 && setSectionItem(`$${federalContracts2.total_fed_dollar_amount_received_2}.00`, 'Funded Contact Value')}
                                        {federalContracts2.total_federal_number_2 && setSectionItem(`$${federalContracts2.total_federal_number_2}.00`, 'Number')}
                                    </div>
                                </div>
                            }
                            {(federalContracts2.total_fed_fiscal_year_subcontract_3 || federalContracts2.total_fed_dollar_amount_received_3 || federalContracts2.total_federal_number_3) &&
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSubSectionHeader(`Total Federal Subcontract Award For ${federalContracts2.total_fed_fiscal_year_subcontract_3}`)}
                                        {federalContracts2.total_fed_fiscal_year_subcontract_3 && setSectionItem(federalContracts2.total_fed_fiscal_year_subcontract_3, 'Fiscal Year')}
                                        {federalContracts2.total_fed_dollar_amount_received_3 && setSectionItem(`$${federalContracts2.total_fed_dollar_amount_received_3}.00`, 'Funded Contact Value')}
                                        {federalContracts2.total_federal_number_3 && setSectionItem(`$${federalContracts2.total_federal_number_3}.00`, 'Number')}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }

                {Object.values(eligibility).length > 0 &&
                    <div className="row my-4">
                        {eligibility.eligibility_explanation &&
                            <div className="col-md-12">
                                {setSectionHeader("Eligibility")}
                                <div className="row my-3">
                                    <div className="col-md-12">
                                        {setSectionItem(eligibility.eligibility_explanation)}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }

                {Object.values(historicalBackground).length > 0 && areAllPropertiesTruthy(historicalBackground) &&
                    <div className="row mt-3">
                        <div className="col-md-12">
                            {setSectionHeader("History Background")}
                            <div className="mt-3"></div>
                            {setSectionItem(historicalBackground.was_small_disadvantaged_business ? 'Yes' : 'No', 'Has Small Disadvantaged Business (SBD)')}
                            {setSectionItem(historicalBackground.was_woman_owned_small_business ? 'Yes' : 'No', 'Has Woman-Owned Small Business (WOSB)')}
                            {setSectionItem(historicalBackground.company_graduated_8a_program ? 'Yes' : 'No', 'Company Graduated From 8(a) Program')}
                            {historicalBackground.graduated_8a_program_on && setSectionItem(historicalBackground.graduated_8a_program_on, '')}
                            {historicalBackground.historical_background_explanation &&
                                <div className="row mt-3">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>{'Historical Background Summary'}: </strong><br />
                                        <span style={{ wordBreak: 'break-word' }}>{historicalBackground.historical_background_explanation}</span>
                                    </div>
                                </div>
                            }
                            {historicalBackground.historical_background &&
                                <>
                                    <div className="row mt-3">
                                        <div className="col-md-12 pl-5 pr-5">
                                            <strong>Document Upload(s):</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            {getHistoricalBackgroundFileInformation(historicalBackground.historical_background)}
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                }

                {Object.values(developmentalAssistance).length > 0 && areAllPropertiesTruthy(developmentalAssistance) &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("Developmental Assistance")}
                            {developmentalAssistance.developmental_assistance_explanation &&
                                <div className="row mt-3">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>{'Developmental Assistance Explanation'}: </strong><br />
                                        <span style={{ wordBreak: 'break-word' }}>{developmentalAssistance.developmental_assistance_explanation}</span>
                                    </div>
                                </div>
                            }
                            {developmentalAssistance.developmental_assistance_file &&
                                <>
                                    <div className="row mt-3">
                                        <div className="col-md-12 pl-5 pr-5">
                                            <strong>Document Upload(s):</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            {getHistoricalBackgroundFileInformation(developmentalAssistance.developmental_assistance_file)}
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                }

                {Object.values(signatureAgreements).length > 0 && areAllPropertiesTruthy(signatureAgreements) &&
                    <div className="row my-4">
                        <div className="col-md-12">
                            {setSectionHeader("Signature Agreements")}
                            {signatureAgreements.reporting_requirements &&
                                <div className="row mt-3">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>Reporting Requirements: </strong>&nbsp;&nbsp;<span>{signatureAgreements.reporting_requirements}</span>
                                    </div>
                                </div>
                            }
                            {signatureAgreements.review_agreement &&
                                <div className="row">
                                    <div className="col-md-12 pl-5 pr-5">
                                        <strong>Review Agreement: </strong>&nbsp;&nbsp;<span>{signatureAgreements.review_agreement}</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default DisplayMentorAgreementData