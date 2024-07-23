import React from 'react'
import { Modal } from 'react-bootstrap'
import emailIconCheck from '../../../assets/images//email_icon_check.png'

const InviteeEmailSentModal = ({ showModal, emailAddress, sendToDashboardHandler }) => {
    return (
        <Modal centered={true} show={showModal}>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12">

                        <div className="row">
                            <div className="col-md-12">
                                <img src={emailIconCheck} alt="email icon check" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mt-3">
                                <h4><strong>Email Sent</strong></h4>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <p className="m-0">{`Your email has been sent to ${emailAddress}.`}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="col-md-12 d-flex">
                    <button type="button" className="btn btn-primary" onClick={() => sendToDashboardHandler()}>RETURN TO DASHBOARD</button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default InviteeEmailSentModal