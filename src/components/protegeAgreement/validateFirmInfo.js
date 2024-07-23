const validateFirmInfo = (protegeAgreement) => {
  const requiredFields = protegeAgreement && protegeAgreement['firm_year_established']
    && protegeAgreement['firm_number_of_employees'] && protegeAgreement['firm_annual_gross_revenue'] && protegeAgreement['capability_statement']
  const firmPercentOwned = protegeAgreement && protegeAgreement['is_firm_percent_owned']
    && protegeAgreement['is_firm_percent_owned'].toString() === 'true' ? protegeAgreement['firm_percent_owned'] : true

  return requiredFields && firmPercentOwned
}

export default validateFirmInfo