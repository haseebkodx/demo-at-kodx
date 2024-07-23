const valdiateAgreementDetails = (mentorAgreement) => {
  const hybrid = mentorAgreement && mentorAgreement.agreement_type === "Hybrid"
  const credit = mentorAgreement && mentorAgreement.agreement_type === "Credit DCMA"
  const direct = mentorAgreement && mentorAgreement.agreement_type === "Direct Reimbursement"
  const techAreas = mentorAgreement && mentorAgreement['tech_focus'] && mentorAgreement['tech_focus'] === 'Other'
    ? mentorAgreement['tech_focus_other_text'] : true
  const requiredFields =
    hybrid
      ? mentorAgreement && mentorAgreement['agreement_type'] && mentorAgreement['agency_dept'] && mentorAgreement['agreement_contact']
      : credit ? mentorAgreement && mentorAgreement['agreement_type'] && mentorAgreement['agreement_contact']
        : direct ? mentorAgreement && mentorAgreement['agreement_type'] && mentorAgreement['agency_dept'] : null

  return requiredFields && techAreas
}
export default valdiateAgreementDetails