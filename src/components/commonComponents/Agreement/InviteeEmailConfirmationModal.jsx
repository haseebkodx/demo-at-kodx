import React from 'react'
import { Modal } from 'react-bootstrap'
import emailIconEmpty from '../../../assets/images/email_icon_empty.png'

const InviteeEmailConfirmationModal = ({ showModal, emailAddress, setShowModal, sendPOCEmailHandler }) => {
    return (
        <Modal centered={true} show={showModal}>
            <Modal.Body>
                <div className="row mt-3">
                    <div className="col-md-12">

                        <div className="row">
                            <div className="col-md-12">
                                <img src={emailIconEmpty} alt="email icon" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mt-3">
                                <h4><strong>Confirm You Want To Send Agreement</strong></h4>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <p className="m-0">{`You are sending an email to ${emailAddress}.`}</p>
                                <p className="m-0">{'Would you like to proceed?'}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="col-md-12 d-flex">
                    <div className="col-md-6">
                        <button type="button" className="btn btn-border-gray px-4 ml-4" onClick={() => setShowModal(false)}>No</button>
                        <button type="button" className="btn btn-primary px-4" onClick={() => sendPOCEmailHandler()}>Yes</button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default InviteeEmailConfirmationModal