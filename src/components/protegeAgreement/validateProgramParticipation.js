const validateProgramParticipation = (protegeAgreement) => {

  const requiredFields = protegeAgreement && protegeAgreement['protege_firm_participated'] === 'false' ?
    true : protegeAgreement && protegeAgreement['credit_direct_reimbursed'] === 'Credit DCMA'
      ? protegeAgreement && protegeAgreement['prev_mentor_firm_name']
      && protegeAgreement['period_of_prev_agreement']
      && protegeAgreement['credit_direct_reimbursed']
      : protegeAgreement && protegeAgreement['prev_mentor_firm_name']
      && protegeAgreement['sponsoring_military_dept_agency']
      && protegeAgreement['period_of_prev_agreement']
      && protegeAgreement['credit_direct_reimbursed']

  return requiredFields

}

export default validateProgramParticipation