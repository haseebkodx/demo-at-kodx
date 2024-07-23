import React from 'react'
import { Modal } from 'react-bootstrap'


function ProtegeAcceptModal({ showModal, handleModal, acceptDeclineInvitaton, token, company, decision }) {

  const acceptMessage = `Are you sure you want to accept the invitation from ${company}. This will automatically Reject all other pending invitations`
  const declineMessage = `Are you sure you want to decline the invitation from ${company}.`
  const selectedDecision = decision === 'accepted' ? 'accepted' : 'declined'
  const decisionButtonText = decision === 'accepted' ? "Accept" : "Decline"

  return (
    <Modal show={showModal} onHide={handleModal} centered={true}>
      <Modal.Body>
        <div className="mt-2">
          <div className="invite-mail-img mb-2 center-align"></div>
          <p className="mb-0">{selectedDecision === 'accepted' ? acceptMessage : declineMessage}</p>
          <div className="mt-4">
            <button className="btn btn-border-gray px-4 mr-2" onClick={handleModal}>Cancel</button>
            <button className="btn btn-primary px-4" onClick={() => acceptDeclineInvitaton({ decision: selectedDecision, token: token })}>{decisionButtonText}</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ProtegeAcceptModal