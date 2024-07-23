const validateCertifications = (protegeAgreement) => {
  const eightAprogram = protegeAgreement && protegeAgreement['sba_8a']

  const requiredFields = protegeAgreement
    && protegeAgreement['certified_small_business']
    && protegeAgreement['certified_small_business'].toString()

  const eightADate = protegeAgreement && protegeAgreement['8a_graduated_date'] ? protegeAgreement['8a_graduated_date'].length === 10 : true


  if (requiredFields === 'true' &&
    (protegeAgreement && protegeAgreement['sba_8a'] && protegeAgreement['sba_8a'].toString() === 'true'
      || protegeAgreement && protegeAgreement['sba_hz'] && protegeAgreement['sba_hz'].toString() === 'true'
      || protegeAgreement && protegeAgreement['sba_vosb'] && protegeAgreement['sba_vosb'].toString() === 'true'
      || protegeAgreement && protegeAgreement['sba_wosb'] && protegeAgreement['sba_wosb'].toString() === 'true'
      || protegeAgreement && protegeAgreement['sba_sde'] && protegeAgreement['sba_sde'].toString() === 'true'
      || protegeAgreement && protegeAgreement['sba_sdb'] && protegeAgreement['sba_sdb'].toString() === 'true'
      || protegeAgreement && protegeAgreement['sba_nog'] && protegeAgreement['sba_nog'].toString() === 'true')) {
    return true
  }
  else if (requiredFields === 'false') {
    return protegeAgreement && protegeAgreement['sba_cgp']
  }
  else {
    return false
  }

}

export default validateCertifications