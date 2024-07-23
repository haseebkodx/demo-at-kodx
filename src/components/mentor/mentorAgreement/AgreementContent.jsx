import React from 'react'
import { useHistory } from 'react-router-dom'

function AgreementContent({ agreementId }) {
  const history = useHistory()

  const changeRoute = () => {
    history.push({
      pathname: "/mentorAgreement",
      state: { agreementId: agreementId }
    })
  }

  return (
    <div className="agreement-content-container mt-3">
      <div className="flex-container">
        <h1 className="title-bold section-header">Fill out the Mentor section of MPP Agreement</h1>

      </div>
      <main id='main' className='m-0'>
        <div className="row">
          <div className="col-md-8 mt-3">
            <p>
              Companies that have been approved as mentors in the DoD Mentor-Protégé Program and have identified
              a protégé firm must submit a signed mentor-protégé agreement for each mentor-protégé relationship
              to the Director, Office of Small Business Programs (OSBP), Office of the Under Secretary of
              Defense (Acquisition, Technology and Logistics [OUSD (AT&L)]) for approval.
          </p>
            <p>
              For companies seeking direct reimbursement of developmental assistance costs, your submission
              should be made through the cognizant Military Department/Defense Agency OSBP.  For companies seeking
              credit of developmental assistance costs (to include hybrid agreements), your submission should be made
              through the Defense Contract Management Agency (DCMA).  Regardless of the agreement type, an information
              copy must be submitted to the OUSD OSBP.
          </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h2 className="title-bold section-header">
              Credit/Hybrid Agreements
          </h2>
            <p>
              Developmental assistance costs may only be incurred after receipt of an approval letter
              from DCMA. Note: Official start date is the date of OUSD (AT&L) approval letter.
            </p>
          </div>
          <div className="col-md-6">
            <h2 className="title-bold section-header">Direct Reimbursement Agreements</h2>
            <p>
              Developmental assistance costs may only be incurred upon the award of a contract modification
              that incorporates a separate line item for the mentor-protégé agreement.  Note: Official start date
              is the date of the contract modification.
          </p>
          </div>
        </div>
      </main>
      <div className="row my-3">
        <div className="col-md-12">
          <button
            className="btn btn-primary focusable-item"
            onClick={() => changeRoute()}>
              Continue Agreement
          </button>
        </div>
      </div>
    </div >
  )
}
export default AgreementContent