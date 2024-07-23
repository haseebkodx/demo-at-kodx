const validateMentorSignAgreement = (mentorAgreement) => {
  const requiredFields =
    mentorAgreement &&
    mentorAgreement['sign_mentor_name'] &&
    mentorAgreement['sign_mentor_title'] &&
    mentorAgreement['sign_mentor_date'] &&
    mentorAgreement['sign_mentor_agreement']

  const signMentorDate =
    mentorAgreement && mentorAgreement['sign_mentor_date']
      ? mentorAgreement['sign_mentor_date'].length === 10
      : true

  return requiredFields && signMentorDate
}

export default validateMentorSignAgreement
