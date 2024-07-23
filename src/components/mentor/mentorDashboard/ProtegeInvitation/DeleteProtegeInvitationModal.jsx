/*eslint-disable eqeqeq*/
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import deleteUserAction from '../../../user/admin/deleteUser.action';

const DeleteProtegeInvitationModal = ({
  showModal,
  hideModalHandler,
  roleUser,
  updateUsers
}) => {
  const [userNotDeleted, setUserNotDeleted] = useState(false);

  useEffect(() => {
    setUserNotDeleted(false);
  }, [showModal]);

  const deleteUserHandler = async (token) => {
    const { status } = await deleteUserAction(token);

    if (status == 200) {
      hideModalHandler(false);
      updateUsers();
    } else {
      setUserNotDeleted(true);
    }
  };

  return (
    <Modal show={showModal} centered onHide={hideModalHandler}>
      <Modal.Header closeButton>
        <Modal.Title className='w-100'>
          <h1 className="modal-heading">Delete User</h1></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row'>
          <div className='col-md-12'>
            <div className='row mb-4 ml-1'>

              {roleUser && (
                <p className='m-0'>
                  Do you want to delete{' '}
                  <strong>{roleUser.invitee_email}</strong>?
                </p>
              )}
              {userNotDeleted && (
                <p className='m-0 mt-3 text-danger'>
                  Unable to delete this role user
                </p>
              )}

            </div>

            <div className='row'>

              <div className='d-flex ml-3'>
                <button
                  className='btn btn-border-gray px-4 py-2 mr-2'
                  onClick={hideModalHandler}
                >
                  NO
                  </button>
                <button
                  className='btn btn-primary px-4 py-2'
                  onClick={() => deleteUserHandler(roleUser.token)}
                >
                  YES
                </button>

              </div>

            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteProtegeInvitationModal;
