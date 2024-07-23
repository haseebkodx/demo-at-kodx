/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import sendAcceptDecineInvitation from './sendAcceptDeclineinvitation.action'
import getCurrentUser from '../../getCurrentUserInfo.action'
import ProtegeAcceptModal from './ProtegeAcceptModal'
import { expiredInvitation } from '../../expiredInvitation'

function AllProtegeInvitations({ invitationsList, invitationType }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  const history = useHistory()
  // const statusDesign = mentorApplicationInfo && mentorApplicationInfo.status === 'declined' ? 'declined-app' : mentorApplicationInfo && mentorApplicationInfo.status === 'approved' ? 'approved-app' : 'pending-app'
  const statusDesign = (status) => {
    return status === 'accepted' ? 'approved-app' : 'declined-app'
  }

  return (
    <div className='osbp-block mb-3'>
      <h2>{invitationType}</h2>
      <div id='agreement-list'>
        <InvitationsList
          invitationsList={invitationsList}
          history={history}
          statusDesign={statusDesign}
        />
      </div>
    </div>
  )
}

const InvitationsList = ({ invitationsList, history, statusDesign }) => {
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [token, setToken] = useState(null)
  const [company, setCompany] = useState(null)
  const [selectedDecision, setSelectedDecision] = useState(null)
  const userInfo = useSelector((state) => state.auth)
  const accessToken = userInfo && userInfo.token && userInfo.token.access_token
  const currentUserInfo = useSelector((state) => state && state.currentUserInfo)
  const dispatch = useDispatch()

  const getCurrentUserInfoData = async () => {
    await dispatch(getCurrentUser(accessToken))
  }

  const acceptDeclineInvitaiton = async ({ decision, token }) => {
    const invite = await dispatch(
      sendAcceptDecineInvitation({
        uuid: currentUserInfo.uuid,
        title: currentUserInfo.role_title,
        roleName: currentUserInfo.role_name,
        invitation: decision,
        invitationToken: token,
        email: currentUserInfo.email
      })
    )

    getCurrentUserInfoData()
  }

  const ShowAcceptModal = ({ company, token, decision }) => {
    setToken(token)
    setCompany(company)
    setShowAcceptModal(!showAcceptModal)
    setSelectedDecision(decision)
  }

  const checkExpiration = (invitation) => {
    return expiredInvitation(invitation)
  }

  return invitationsList && invitationsList.length > 0 ? (
    invitationsList.map((invitation, idx) => {
      const expiredDate = checkExpiration(invitation)
      return (
        <div className='row single-agreement remove-row-margin' key={idx}>
          <div
            className='col-md-4 align-self-center font-weight-bold py-2'
            data-test-id='Mentor Name'
          >
            <span className='company-name'>{invitation.inviter_company}</span>
          </div>

          <div
            className='col-md-4 align-self-center font-weight-bold py-2'
            data-test-id='Mentor Name'
          >
            <span className='company-name'>{invitation.inviter_email}</span>
          </div>

          {showAcceptModal === true ? (
            <ProtegeAcceptModal
              showModal={showAcceptModal}
              handleModal={ShowAcceptModal}
              acceptDeclineInvitaton={acceptDeclineInvitaiton}
              token={token}
              company={company}
              decision={selectedDecision}
            />
          ) : null}

          {invitation && invitation.invitation_decision === 'pending' && expiredDate ? (
            <div
              className='col-md-4 py-2 align-middle'
              data-test-id='Mentor Status'
            >
              <p className='expired-invite-message'>
                Invitation Expired. Contact the Mentor to resend an invite.
              </p>
            </div>
          ) : invitation && invitation.invitation_decision === 'pending' ? (
            <div className='col-md-4' data-test-id='Mentor Status'>
              <button
                className='btn btn-primary my-2 focusable-item'
                onClick={() =>
                  ShowAcceptModal({
                    company: invitation.inviter_company,
                    token: invitation.token,
                    decision: 'accepted'
                  })
                }
              >
                Accept
              </button>
              <button
                className='btn btn-secondary ml-3 focusable-item'
                onClick={() =>
                  ShowAcceptModal({
                    company: invitation.inviter_company,
                    token: invitation.token,
                    decision: 'declined'
                  })
                }
              >
                Decline
              </button>
            </div>
          ) : (
                <div
                  className={`mt-2 ml-5 col-md-2 ${statusDesign(
                    invitation.invitation_decision
                  )}`}
                >
                  {' '}
                  {invitation &&
                    _.startCase(_.toLower(invitation.invitation_decision))}{' '}
                </div>
              )}
        </div>
      )
    })
  ) : (
      <div className='mx-2 my-3'> There is no invitation History</div>
    )
}

export default AllProtegeInvitations
