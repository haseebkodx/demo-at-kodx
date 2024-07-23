import React from 'react'
import { Modal } from 'react-bootstrap'

function NoActionModal({
  showNoActionModal,
  handleNoActionModal,
  isReviewer = false,
  isDeactivatingOwnAccount = false
}) {
  return (
    <Modal show={showNoActionModal} onHide={handleNoActionModal} centered>
      <Modal.Header closeButton={handleNoActionModal}>
        <Modal.Title className='text-center w-100'>
          <h1 className="modal-heading">Invalid Action</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isDeactivatingOwnAccount ? (
          <p>You cannot de-activate your own account.</p>
        ) : !isReviewer ? (
          <p>
            You must assign yourself the role of Reviewer before you can
            activate or de-activate a user account.
          </p>
        ) : null}
        <button
          className='btn btn-sm btn-primary px-4'
          onClick={() => handleNoActionModal()}
        >
          Exit
        </button>
      </Modal.Body>
    </Modal>
  )
}

export default NoActionModal
