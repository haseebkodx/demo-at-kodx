import React from 'react'
import { useLocation } from 'react-router-dom'
import AgreementReviewHeader from './AgreementReviewHeader'
import AgreementContent from './AgreementContent'

function AgreementReview() {
  const location = useLocation()
  const agreementId = location.state && location.state.agreementId
  return (
    <div>
      {/* <AgreementReviewHeader /> */}
      <AgreementContent agreementId={agreementId} />

    </div>
  )
}

export default AgreementReview