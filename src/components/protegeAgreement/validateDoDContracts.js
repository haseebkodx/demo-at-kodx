const validateDoDContracts = (protegeAgreement) => {

  // const isDodPrimeContracts = protegeAgreement && protegeAgreement['is_dod_prime_contracts']
  //   ? protegeAgreement['fiscal_year_prime1'] && protegeAgreement['dollar_amount_recieved_prime1']
  //   && protegeAgreement['funded_contact_value_prime1'] && protegeAgreement['number_prime_1'] : true

  // const isDodSubContracts = protegeAgreement && protegeAgreement['is_dod_subcontracts']
  //   ? protegeAgreement['fiscal_year1'] && protegeAgreement['dollar_amount_recieved1']
  //   && protegeAgreement['funded_contact_value1'] && protegeAgreement['funded_contact_value1'] : true


  // const isFederalAgencyPrimeContracts = protegeAgreement && protegeAgreement['is_federal_agency_prime_contracts']
  //   ? protegeAgreement['fed_fiscal_year_prime_1'] && protegeAgreement['fed_dollar_amount_recieved_prime_1']
  //   && protegeAgreement['fed_funded_contract_value_prime_1'] && protegeAgreement['fed_number_prime_1'] : true

  // const isFederalAgencySubcontracts = protegeAgreement && protegeAgreement['is_federal_agency_subcontracts']
  //   ? protegeAgreement['fed_fiscal_year_sub_1'] && protegeAgreement['fed_dollar_amount_recieved_sub_1']
  //   && protegeAgreement['fed_funded_contract_value_sub_1'] && protegeAgreement['fed_number_sub_1'] : true

  const awardedContracts = protegeAgreement && protegeAgreement['has_awarded_contracts'] !== null

  return awardedContracts
}

export default validateDoDContracts