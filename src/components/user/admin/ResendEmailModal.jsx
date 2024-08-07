import React from 'react'
import { Modal } from 'react-bootstrap'

const ResendEmailModal = ({
  showModal,
  handleClose,
  setShowModal,
  roleUser,
  handleResendEmailInvite
}) => {
  return (
    <Modal centered={true} show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className='w-100'>
          <h1 className="modal-heading">
            Resend Invitation
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row mt-3'>
          <div className='col-md-12'>
            <div className='row'>
              <div className='col-md-12'>
                {roleUser && (
                  <p className='m-0'>
                    Do you want to resend an email invitation to{' '}
                    <strong>{`${roleUser.first_name} ${roleUser.last_name}`}</strong>
                    ?
                  </p>
                )}
                {/* <p className='m-0'>{"Would you like to proceed?"}</p> */}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='col-md-12 d-flex'>
          <div className='col-md-6'>

            <button
              type='button'
              className='btn btn-border-gray px-4 mr-2 focusable-item'
              onClick={() => setShowModal(false)}
            >
              No
            </button>
            <button
              type='button'
              className='btn btn-primary px-4 focusable-item'
              onClick={() => handleResendEmailInvite(roleUser)}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default ResendEmailModal
