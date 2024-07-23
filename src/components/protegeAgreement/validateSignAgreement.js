const validateSignAgreement = (protegeAgreement) => {

  const requiredFields = protegeAgreement && protegeAgreement['sign_protege_name'] && protegeAgreement['sign_protege_title']
    && protegeAgreement['sign_protege_date'] && protegeAgreement['sign_agreement']

  const signProtegeDate = protegeAgreement && protegeAgreement['sign_protege_date'] ? protegeAgreement['sign_protege_date'].length === 10 : true


  return requiredFields && signProtegeDate
}


export default validateSignAgreement