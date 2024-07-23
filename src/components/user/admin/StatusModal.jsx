import React from 'react'
import { Modal } from 'react-bootstrap'
import changeStatus from './changeStatus.action'

const changeUserState = (
  userStatus,
  handleModal,
  uuid,
  updateUserList,
  setUpdateUserList
) => {
  changeStatus(uuid, userStatus)
  handleModal()
  setTimeout(() => {
    setUpdateUserList(updateUserList === true ? false : true)
  }, 1000)
}

function StatusModal({
  showModal,
  handleModal,
  userStatus,
  uuid,
  name,
  updateUserList,
  setUpdateUserList
}) {
  return (
    <Modal show={showModal} onHide={handleModal} aria-labelledby="user-status-container" centered>
      <Modal.Header closeButton>
        <Modal.Title className='w-100'>
          <h1 id="user-status-container" className="modal-heading">
            User Status Change
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {userStatus === true
            ? `Are you sure you want to deactivate the account for ${name}?`
            : `Are you sure you want to activate the account for ${name}?`}
        </p>
        <button
          className='btn btn-sm btn-border-gray m4-4 px-4 focusable-item'
          onClick={() => handleModal()}
        >
          Cancel
        </button>
        <button
          className='btn btn-sm btn-primary px-4 focusable-item'
          onClick={() =>
            changeUserState(
              userStatus,
              handleModal,
              uuid,
              updateUserList,
              setUpdateUserList
            )
          }
        >
          Confirm
        </button>
      </Modal.Body>
    </Modal>
  )
}

export default StatusModal
