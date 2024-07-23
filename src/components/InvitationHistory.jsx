import React, { useEffect, useState } from 'react'
import AllProtegeInvitations from '../components/mentor/mentorDashboard/AllProtegeInvitations'
import getAllAgreements from '../components/mentor/mentorDashboard/getPendingAgreementForUser'
import HelpfulLinks from '../components/HelpfulLinks'
import MentorAccountInfo from './mentor/mentorDashboard/MentorAccountInfo'

function InvitationsHistory() {

  const [invitationHistory, useInvitationHistory] = useState(null)
  const localStorage = window.localStorage
  const userInfo = JSON.parse(localStorage.getItem('user_info'))
  const userEmail = userInfo && userInfo.email

  useEffect(() => {
    AllAgreementsForUser()
  }, [])

  const AllAgreementsForUser = async () => {
    const pendingAgreements = await getAllAgreements(userEmail)
    useInvitationHistory(pendingAgreements)
  }

  const nonPendingInvitation = invitationHistory && invitationHistory.filter(invitation => invitation.invitation_decision !== 'pending')

  return (
    <div className="mx-5">
      <div className="row">
        <main id='main' className="col-md-9 mt-5">
          <AllProtegeInvitations invitationsList={nonPendingInvitation} invitationType="Invitation History" />
        </main>
        <aside className="col-md-3">
          <div className="mt-5">
            {/* <MentorAccountInfo /> */}
            <HelpfulLinks />
          </div>
        </aside>
      </div >
    </div >
  )
}

export default InvitationsHistory