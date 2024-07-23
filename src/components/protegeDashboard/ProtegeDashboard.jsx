import React from 'react'
import ProtegeTitle from './ProtegeTitle'
import MentorProtegeAgreeement from './MentorProtegeAgreement'
import MentorAccountInfo from '../mentor/mentorDashboard/MentorAccountInfo'
import { withRouter } from 'react-router-dom'


function ProtegeDashboard() {
  return (
    <div className="wrapper left-align main-padding">
      <ProtegeTitle />
      <div className="container">
        <div className="row my-5">
          <MentorProtegeAgreeement />
          <div className="col-12 col-md-3">
            {/* <MentorAccountInfo /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(ProtegeDashboard)