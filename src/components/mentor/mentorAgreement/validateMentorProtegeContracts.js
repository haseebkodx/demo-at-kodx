const validateMentorProtegeContracts = (mentorAgreement) => {
  const hasAwardedContracts = mentorAgreement && mentorAgreement['has_awarded_contracts'] !== null

  // const fiscalYearSubcontract1 = mentorAgreement && mentorAgreement['fiscal_year_subcontract_1']
  // const fiscalYearSubcontract2 = mentorAgreement && mentorAgreement['fiscal_year_subcontract_2']
  // const fiscalYearSubcontract3 = mentorAgreement && mentorAgreement['fiscal_year_subcontract_3']

  // const fiscalYearFederalAgency1 = mentorAgreement && mentorAgreement['fiscal_year_federal_agency_1']
  // const fiscalYearFederalAgency2 = mentorAgreement && mentorAgreement['fiscal_year_federal_agency_2']
  // const fiscalYearFederalAgency3 = mentorAgreement && mentorAgreement['fiscal_year_federal_agency_3']

  // const fiscalYearPotentialSubcontract1 = mentorAgreement && mentorAgreement['fiscal_year_potential_Subcontract_1']
  // const fiscalYearPotentialSubcontract2 = mentorAgreement && mentorAgreement['fiscal_year_potential_Subcontract_2']
  // const fiscalYearPotentialSubcontract3 = mentorAgreement && mentorAgreement['fiscal_year_potential_Subcontract_3']


  const isTotalFederalAgencySubcontracts = mentorAgreement && mentorAgreement['is_total_federal_agency_subcontracts']
  const isFederalralAgencySubcontracts = mentorAgreement && mentorAgreement['is_federal_agency_subcontracts']

  const fedFiscalYearSubcontract1 = mentorAgreement && mentorAgreement["fed_fiscal_year_subcontract_1"]
  const fedDollarAmountReceived1 = mentorAgreement && mentorAgreement["fed_dollar_amount_received_1"]
  const federalNumber1 = mentorAgreement && mentorAgreement["federal_number_1"]

  const fedFiscalYearSubcontract2 = mentorAgreement && mentorAgreement["fed_fiscal_year_subcontract_2"]
  const fedDollarAmountReceived2 = mentorAgreement && mentorAgreement["fed_dollar_amount_received_2"]
  const federalNumber2 = mentorAgreement && mentorAgreement["federal_number_2"]

  const fedFiscalYearSubcontract3 = mentorAgreement && mentorAgreement["fed_fiscal_year_subcontract_3"]
  const fedDollarAmountReceived3 = mentorAgreement && mentorAgreement["fed_dollar_amount_received_3"]
  const federalNumber3 = mentorAgreement && mentorAgreement["federal_number_3"]

  const totalFedFiscalYearSubcontract1 = mentorAgreement && mentorAgreement['total_fed_fiscal_year_subcontract_1']
  const totalFedDollarAmountReceived1 = mentorAgreement && mentorAgreement['total_fed_dollar_amount_received_1']
  const totalFederalNumber1 = mentorAgreement && mentorAgreement['total_federal_number_1']


  const totalFedFiscalYearSubcontract2 = mentorAgreement && mentorAgreement['total_fed_fiscal_year_subcontract_2']
  const totalFedDollarAmountReceived2 = mentorAgreement && mentorAgreement['total_fed_dollar_amount_received_2']
  const totalFederalNumber2 = mentorAgreement && mentorAgreement['total_federal_number_2']


  const totalFedFiscalYearSubcontract3 = mentorAgreement && mentorAgreement['total_fed_fiscal_year_subcontract_3']
  const totalFedDollarAmountReceived3 = mentorAgreement && mentorAgreement['total_fed_dollar_amount_received_3']
  const totalFederalNumber3 = mentorAgreement && mentorAgreement['total_federal_number_3']


  const federalYear2 = fedFiscalYearSubcontract2
    || fedDollarAmountReceived2
    || federalNumber2

  const federalYear3 = fedFiscalYearSubcontract3
    || fedDollarAmountReceived3
    || federalNumber3

  const totalFederalYear2 = totalFedFiscalYearSubcontract2
    || totalFedDollarAmountReceived2
    || totalFederalNumber2

  const totalFederalYear3 = totalFedFiscalYearSubcontract3
    || totalFedDollarAmountReceived3
    || totalFederalNumber3


  const fedFiscaYear1 = hasAwardedContracts && isFederalralAgencySubcontracts
    ? fedFiscalYearSubcontract1
    && fedDollarAmountReceived1
    && federalNumber1
    : true


  const fedFiscaYear2 = hasAwardedContracts && isFederalralAgencySubcontracts && federalYear2
    ? fedFiscalYearSubcontract2
    && fedDollarAmountReceived2
    && federalNumber2
    : true

  const fedFiscaYear3 = hasAwardedContracts && isFederalralAgencySubcontracts && federalYear3
    ? fedFiscalYearSubcontract3
    && fedDollarAmountReceived3
    && federalNumber3
    : true



  const totalFiscalYear1 = hasAwardedContracts && isTotalFederalAgencySubcontracts
    ? totalFedFiscalYearSubcontract1
    && totalFedDollarAmountReceived1
    && totalFederalNumber1
    : true

  const totalFiscalYear2 = hasAwardedContracts && isTotalFederalAgencySubcontracts && totalFederalYear2
    ? totalFedFiscalYearSubcontract2
    && totalFedDollarAmountReceived2
    && totalFederalNumber2
    : true

  const totalFiscalYear3 = hasAwardedContracts && isTotalFederalAgencySubcontracts && totalFederalYear3
    ? totalFedFiscalYearSubcontract3
    && totalFedDollarAmountReceived3
    && totalFederalNumber3
    : true


  return hasAwardedContracts
    && fedFiscaYear1
    && totalFiscalYear1
    && fedFiscaYear2
    && fedFiscaYear3
    && totalFiscalYear2
    && totalFiscalYear3

}

export default validateMentorProtegeContracts