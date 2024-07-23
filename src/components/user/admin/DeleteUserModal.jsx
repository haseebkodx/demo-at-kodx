/*eslint-disable eqeqeq*/
import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import deleteUserAction from './deleteUser.action'

const DeleteUserModal = ({
  showModal,
  hideModalHandler,
  roleUser,
  updateUsers
}) => {
  const [userNotDeleted, setUserNotDeleted] = useState(false)

  useEffect(() => {
    setUserNotDeleted(false)
  }, [showModal])

  const deleteUserHandler = async (invitation_token) => {
    const { status } = await deleteUserAction(invitation_token)

    if (status == 200) {
      hideModalHandler(false)
      updateUsers()
    } else {
      setUserNotDeleted(true)
    }
  }

  return (
    <Modal show={showModal} centered={true} aria-labelledby="delete-user-container" onHide={hideModalHandler}>
      <Modal.Header closeButton>
        <Modal.Title className='w-100'>
          <h1 id="delete-user-container" className="modal-heading">
            Delete User
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row'>
          <div className='col-md-12'>
            <div className='row my-4'>
              <div className='col-md-12'>
                {roleUser && (
                  <p className='m-0'>
                    Do you want to delete{' '}
                    <strong>{`${roleUser.first_name} ${roleUser.last_name}`}</strong>
                    ?
                  </p>
                )}
                {userNotDeleted && (
                  <p className='m-0 mt-3 text-danger'>
                    Unable to delete this role user
                  </p>
                )}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-12 my-2'>
                <div className='d-flex'>
                  <button
                    className='btn btn-border-gray px-4 py-2 mr-2 focusable-item'
                    onClick={hideModalHandler}
                  >
                    NO
                  </button>
                  <button
                    className='btn btn-primary px-4 py-2 focusable-item'
                    onClick={() => deleteUserHandler(roleUser.invitation_token)}
                  >
                    YES
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteUserModal
