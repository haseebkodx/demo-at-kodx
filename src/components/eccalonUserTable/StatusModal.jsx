import React from 'react'
import { Modal } from 'react-bootstrap'
import changeStatus from '../user/admin/changeStatus.action'

const changeUserState = ({ userStatus, closeModal, uuid, GetEccalonUsers }) => {
  changeStatus(uuid, userStatus)
  setTimeout(() => {
    closeModal()
  }, 500)

  setTimeout(() => {
    GetEccalonUsers()
  }, 1000)
}

function StatusModal({
  showModal,
  userStatus,
  uuid,
  name,
  closeModal,
  GetEccalonUsers
}) {
  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton={closeModal}>
        <Modal.Title className='w-100'>
          <h1 className="modal-heading">
            {userStatus === true
              ? 'Deactivate User Confirmation'
              : 'Re-activate User Confirmation'}
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {userStatus === true
            ? `Are you sure you want to deactivate the user ${name}?`
            : `Are you sure you want to re-activate the user ${name}?`}
        </p>
        <button
          className='btn btn-sm btn-primary px-4 mr-2'
          onClick={() =>
            changeUserState({
              userStatus,
              closeModal,
              uuid,
              GetEccalonUsers
            })
          }
        >
          Yes
        </button>
        <button
          className='btn btn-sm btn-secondary px-4'
          onClick={() => closeModal()}
        >
          Cancel
        </button>
      </Modal.Body>
    </Modal>
  )
}

export default StatusModal
