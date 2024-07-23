import React from 'react'
import { reduxForm } from 'redux-form'
import FirmInformation from '../../protegeAgreement/FirmInformation'
import PointOfContact from '../../protegeAgreement/PointOfContact'
import ProgramParticipation from '../../protegeAgreement/ProgramParticipation'
import HistoricalBackground from '../../protegeAgreement/HistoricalBackground'
import Certificaitons from '../../protegeAgreement/Certifications'
import DoDContracts from '../../protegeAgreement/DoDContracts'
import DevelopmentAssistance from '../../protegeAgreement/DevelopmentAssistance'
import ReportingRequirements from '../../protegeAgreement/ReportingRequirements'
import ReviewAgreement from '../../protegeAgreement/ReviewAgreement'
import SignAgreement from '../../protegeAgreement/SignAgreement'

function ReviewProtegeAgreement({ mentorProtegeAgreementData }) {

  const protegeAgreementData = mentorProtegeAgreementData && mentorProtegeAgreementData.protege_agreement[0]

  return (
    <form>
      <FirmInformation
        protegeAgreementData={protegeAgreementData}
      />

      <PointOfContact
        protegeAgreementData={protegeAgreementData}
      />
      <ProgramParticipation

        protegeAgreementData={protegeAgreementData}
      />
      <HistoricalBackground

        protegeAgreementData={protegeAgreementData}
      />
      <Certificaitons
        protegeAgreementData={protegeAgreementData}
      />
      <DoDContracts
        protegeAgreementData={protegeAgreementData}
      />
      <DevelopmentAssistance
        protegeAgreementData={protegeAgreementData}
      />
      <ReportingRequirements
        protegeAgreementData={protegeAgreementData}
      />
      <ReviewAgreement
        protegeAgreementData={protegeAgreementData}
      />
      <SignAgreement
        protegeAgreementData={protegeAgreementData}
      />

    </form>
  )

}

ReviewProtegeAgreement = reduxForm({
  enableReinitialize: true,
  form: 'protegeAgreement'
})(ReviewProtegeAgreement)

export default ReviewProtegeAgreement