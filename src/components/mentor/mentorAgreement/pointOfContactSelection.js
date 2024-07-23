const pointOfContactSelection = ({ selectedPOC, mentorAgreement }) => {

  const companyInfo = mentorAgreement
  const initialValue = selectedPOC === "Govt Business"
    ? 'gov_business' : selectedPOC === 'Electronic Business'
      ? "electronic_business" : selectedPOC === 'Mentor POC'
        ? 'mpp' : 'New POC'

  const signeePOC = {
    signee_name: mentorAgreement && mentorAgreement["signee_name"],
    signee_title: mentorAgreement && mentorAgreement["signee_title"],
    signee_address: mentorAgreement && mentorAgreement["signee_address"],
    signee_tel: mentorAgreement && mentorAgreement["signee_tel"],
    signee_fax: mentorAgreement && mentorAgreement["signee_fax"],
    signee_email: mentorAgreement && mentorAgreement["signee_email"],
    signee_city: mentorAgreement && mentorAgreement["signee_city"],
    signee_state: mentorAgreement && mentorAgreement["signee_state"],
    signee_zip: mentorAgreement && mentorAgreement["signee_zip"]
  }

  const POC = {
    signee_name: initialValue !== "New POC" && companyInfo[`${initialValue}_contact_first_name`] && `${companyInfo[`${initialValue}_contact_first_name`]} ${companyInfo[`${initialValue}_contact_first_name`]}`,
    signee_title: initialValue !== "New POC" && companyInfo[`${initialValue}_contact_title`] ? companyInfo[`${initialValue}_contact_title`] : '',
    signee_address: initialValue !== "New POC" && companyInfo[`${initialValue}_contact_address`] ? companyInfo[`${initialValue}_contact_address`] : '',
    signee_city: initialValue !== "New POC" && companyInfo[`${initialValue}_contact_city`] ? companyInfo[`${initialValue}_contact_city`] : '',
    signee_state: initialValue !== "New POC" && companyInfo[`${initialValue}_contact_state`] ? companyInfo[`${initialValue}_contact_state`] : '',
    signee_zip: initialValue !== "New POC" && companyInfo[`${initialValue}_contact_zip`] ? companyInfo[`${initialValue}_contact_zip`] : '',
    signee_email: initialValue !== "New POC" && companyInfo[`${initialValue}_contact_email`] ? companyInfo[`${initialValue}_contact_email`] : '',
    signee_tel: initialValue !== "New POC" && companyInfo[`${initialValue}_contact_phone`] ? companyInfo[`${initialValue}_contact_phone`] : '',
    signee_fax: initialValue !== "New POC" && companyInfo[`${initialValue}_contact_fax`] ? companyInfo[`${initialValue}_contact_fax`] : ''
  }


  return initialValue === 'New POC' ? signeePOC : POC

}

export default pointOfContactSelection