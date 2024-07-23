import React from 'react'
import { reduxForm } from 'redux-form'
import EstimatedCost from '../../mentor/mentorAgreement/EstimatedCost'
import PointOfContacts from '../../mentor/mentorAgreement/PointOfContacts'
import DevelopmentalAssistance from '../../mentor/mentorAgreement/DevelopmentalAssistance'
import AgreementDetails from '../../mentor/mentorAgreement/AgreementDetails'
import PeriodOfPerformance from '../../mentor/mentorAgreement/PeriodOfPerformance'
import MentorProtegeContracts from '../../mentor/mentorAgreement/MentorProtegeContracts'
import MentorFirm from '../../mentor/mentorAgreement/MentorFirm'
import HistoricalBackground from '../../mentor/mentorAgreement/HistoricalBackground'
import ReportReviewRequirment from '../../mentor/mentorAgreement/ReportReviewRequirement'
import ReviewAgreement from '../../mentor/mentorAgreement/ReviewAgreement'
import SignMentorAgreement from '../../mentor/mentorAgreement/SignMentorAgreement'


function ReviewMentorAgreement({ mentorProtegeAgreementData }) {
  let mentorAgreementData = mentorProtegeAgreementData && mentorProtegeAgreementData.mentor_agreement && mentorProtegeAgreementData.mentor_agreement[0]

  mentorAgreementData = {
    poc_name: `${mentorAgreementData && mentorAgreementData.contact_first_name} ${mentorAgreementData && mentorAgreementData.contact_last_name}`,
    poc_title: mentorAgreementData && mentorAgreementData.contact_title,
    poc_address: mentorAgreementData && mentorAgreementData.contact_address,
    poc_tel: mentorAgreementData && mentorAgreementData.contact_phone,
    poc_fax: mentorAgreementData && mentorAgreementData.contact_fax,
    poc_email: mentorAgreementData && mentorAgreementData.contact_email,
    ...mentorAgreementData
  }

  return (
    <form>
      <AgreementDetails
        mentorAgreementData={mentorAgreementData}
      />

      <PeriodOfPerformance
        mentorAgreementData={mentorAgreementData}
      />

      <EstimatedCost
        mentorAgreementData={mentorAgreementData}
      />

      <MentorFirm
        mentorAgreementData={mentorAgreementData}
      />

      <HistoricalBackground
        mentorAgreementData={mentorAgreementData}
      />

      <MentorProtegeContracts
        mentorAgreementData={mentorAgreementData}
      />
      <PointOfContacts
        mentorAgreementData={mentorAgreementData}
      />

      <DevelopmentalAssistance
        mentorAgreementData={mentorAgreementData}
      />

      <ReportReviewRequirment
        mentorAgreementData={mentorAgreementData}
      />
      <ReviewAgreement
        mentorAgreementData={mentorAgreementData}
      />
      <SignMentorAgreement
        mentorAgreementData={mentorAgreementData}
      />
    </form>
  )
}

ReviewMentorAgreement = reduxForm({
  enableReinitialize: true,
  form: 'mentorAgreement'
})(ReviewMentorAgreement)

export default ReviewMentorAgreement