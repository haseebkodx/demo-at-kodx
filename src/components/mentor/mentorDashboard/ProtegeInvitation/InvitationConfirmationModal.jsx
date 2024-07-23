import React from 'react'
import { Modal } from 'react-bootstrap'

const InvitationConfirmationModal = ({ showModal, handleModal, inviteeEmail, sendEmailHandler }) => {
    return (
        <Modal show={showModal} onHide={handleModal} aria-labelledby="invitation-confirmation-container" centered={true}>
            <Modal.Header closeButton>
                <Modal.Title className='w-100'>
                    <h1 id="invitation-confirmation-container" className="modal-heading">
                        Confirm Email Address
                    </h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12">
                        <p className="m-0 my-3">Are you sure you want to invite <strong>{`${inviteeEmail}`}</strong> to become a Protégé?</p>
                    </div>
                </div>
                <div className="row">
                    <div className="my-3 ml-n2">
                        <div className="d-flexr">
                            <button className="btn mr-2 ml-4 btn-border-gray modal-button-width focusable-item" onClick={handleModal}>Cancel</button>
                            <button className="btn btn-primary modal-button-width focusable-item" onClick={sendEmailHandler}>Yes</button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default InvitationConfirmationModal