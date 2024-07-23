import React, { useEffect, useState, useRef } from 'react'
import resendEmailInvitation from './resendEmailInvitation.action'
import dateFormat from 'dateformat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import Message from './Message'
import DeleteProtegeInvitationModal from './DeleteProtegeInvitationModal'
import ConfirmResendInvitationModal from './ConfirmResendInvitationModal'
import { expiredInvitation } from '../../../expiredInvitation'
import { keydownHandler } from '../../../commonComponents/utility'
import './protegeInvitation.scss'
import deleteUserRole from '../../../../assets/images/delete_user_role.png'
import _ from 'lodash'

function InvitationList({
  invitations,
  getInvitationList,
  isNewProtegeInvited,
  setIsNewProtegeInvited
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [activeDeleteUser, setActiveDeleteUser] = useState(null)
  const [message, setMessage] = useState('')
  const [showResendEmailModal, setResendEmailModal] = useState(false)
  const [activeEmailUser, setActiveEmailUser] = useState(null)

  const invitationListRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // if the message changes rerender the component
  useEffect(() => {
    setTimeout(() => setMessage(''), 3000)
  }, [message])

  useEffect(() => {
    if (isNewProtegeInvited) {
      invitationListRef.current.scrollIntoView({ behavior: 'smooth' })
      setIsNewProtegeInvited(false)
    }
  }, [isNewProtegeInvited])

  // if user clicks on message alert, close alert
  const CloseAlert = () => {
    setMessage('')
  }

  const showDeleteUserModal = (protege) => {
    setActiveDeleteUser(protege)
    setShowDeleteModal(true)
  }

  const hideDeleteUserModal = () => {
    setShowDeleteModal(false)
    setActiveDeleteUser(null)
  }

  const ResendEmailInvite = async (invitation) => {
    const { apiData, status } = await resendEmailInvitation({
      invitation_token: invitation.token,
      inviter_email: invitation.inviter_email,
      inviter_first_name: invitation.inviter_first_name,
      inviter_last_name: invitation.inviter_last_name,
      invitee_email: invitation.invitee_email,
      invitee_role_id: invitation.invitee_role_id
    })

    status === 200
      ? setMessage('Email invite was successfully sent')
      : setMessage(apiData.message)

    setResendEmailModal(false)
  }

  const showEmailModal = (protege) => {
    setActiveEmailUser(protege)
    setResendEmailModal(true)
  }

  const hideEmailModal = () => {
    setResendEmailModal(false)
    setActiveEmailUser(null)
  }

  return (
    <>
      {
        <DeleteProtegeInvitationModal
          showModal={showDeleteModal}
          hideModalHandler={hideDeleteUserModal}
          roleUser={activeDeleteUser}
          updateUsers={getInvitationList}
        />
      }
      {
        <ConfirmResendInvitationModal
          showModal={showResendEmailModal}
          handleClose={hideEmailModal}
          setShowModal={hideEmailModal}
          roleUser={activeEmailUser}
          handleResendEmailInvite={ResendEmailInvite}
        />
      }
      <div className='row mb-5 pt-5'>
        <div className='col-12 message-container'>
          {message ? (
            <Message message={message} handleCloseAlert={CloseAlert} />
          ) : null}
        </div>
        <div
          id='protege-invite-table'
          className='protege-card col-12 osbp-block px-0 table-responsive'
        >
          <div>
            <h2 className='table-title m-0'>Protégé Invitation Status</h2>
          </div>
          {!invitations || invitations.length === 0 ? (
            <div className='row'>
              <div className='col-12'>
                There are currently no Protégés listed.
              </div>
            </div>
          ) : (
            <table
              className='table table-striped table-bordered protege-invite-status-table mb-0'
              aria-label='Protégé Invitation Status'
              id='protege-invitation-status'
              ref={invitationListRef}
            >
              <thead className='invite-status-table-header'>
                <tr>
                  <th className='first-cell column-name' scope='col'>
                    Email Address
                  </th>
                  <th className='column-name' scope='col'>
                    Last Update
                  </th>
                  <th className='column-name' scope='col'>
                    Status
                  </th>
                  <th className='column-name' scope='col'>
                    Delete Invite
                  </th>
                  <th className='column-name' scope='col'>
                    Resend Invite
                  </th>
                </tr>
              </thead>
              <tbody>
                <InvitationsTable
                  invitations={invitations}
                  handleResendEmailInvite={showEmailModal}
                  handleDeleteModal={showDeleteUserModal}
                />
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}

function InvitationsTable({
  invitations,
  handleResendEmailInvite,
  handleDeleteModal
}) {
  const getRoleStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return 'fa-success'
      case 'declined':
        return 'fa-danger'
      case 'pending':
        return 'fa-warning'
    }
  }

  return invitations.map((protege, idx) => {
    const expiredDate = expiredInvitation(protege)
    return (
      <tr key={idx}>
        <td className='first-cell align-middle'>{protege.invitee_email}</td>
        <td className='text-center align-middle'>
          {dateFormat(protege.updated_at, 'mm/dd/yyyy')}
        </td>
        {protege.invitation_decision === 'pending' && expiredDate ? (
          <td className='text-left align-middle'>
            <FontAwesomeIcon
              icon={faCircle}
              className={`font-13 fa-expired`}
            />
            {` Expired`}
          </td>
        ) : (
          <td className='text-left align-middle'>
            <FontAwesomeIcon
              icon={faCircle}
              className={`font-13 ${getRoleStatusIcon(
                protege.invitation_decision
              )}`}
            />
            {` ${_.startCase(protege.invitation_decision)}`}
          </td>
        )}
        {protege.invitation_decision === 'accepted' ? (
          <>
            <td className='text-center align-middle' aria-label='No value'></td>
            <td className='text-center align-middle' aria-label='No value'></td>
          </>
        ) : (
          <>
            <td className='text-center align-middle'>
              <div
                tabIndex='0'
                className='delete_user_role focusable-item'
                onClick={() => handleDeleteModal(protege)}
                onKeyDown={keydownHandler}
              >
                <img
                  id={`delete-user-${idx}`}
                  src={deleteUserRole}
                  alt=''
                  title='delete-user-ctrl'
                />
                &nbsp;&nbsp;<span>{`Delete`}</span>
              </div>
            </td>
            <td className='text-center align-middle'>
              <div className='resend-invite-email'>
                <button
                  className='btn btn-primary resend-invite-button focusable-item'
                  onClick={() => {
                    handleResendEmailInvite(protege)
                  }}
                >
                  Resend Invite
                </button>
              </div>
            </td>
          </>
        )}
      </tr>
    )
  })
}

export default InvitationList
