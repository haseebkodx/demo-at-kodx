import React from 'react'
import { Modal } from 'react-bootstrap'
import emailIconCheck from '../../../../assets/images/email_icon_check.png'

function InvitationSentModal({ showModal, handleModal, inviteeEmail }) {
  return (
    <Modal show={showModal} onHide={handleModal} aria-labelledby="invitation-sent-container" centered={true}>
      <Modal.Header closeButton>
        <Modal.Title className='w-100'>
          <h1 id="invitation-sent-container" className="modal-heading">
            Email Sent
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className='col-md-12 center-align'>
            <img
              id='email_icon_check-id'
              src={emailIconCheck}
              className='mr-3'
              alt=''
              width='80'
              height='80'
              title='email_icon_check'
            />
          </div>
          <div className="col-md-12 my-4">
            <p className='mb-0'>{`Your invitation has been emailed to ${inviteeEmail}.`}</p>
          </div>
          <div className='col-md-12'>
            <button className='btn btn-primary px-4 focusable-item' onClick={handleModal}>
              OK
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default InvitationSentModal
