import React from 'react'
import { Modal } from 'react-bootstrap'

const ExitToDashboardModal = ({ showModal, returnToDashbaordHandler, closeModalHandler }) => {
    return (
        <Modal show={showModal} aria-labelledby="exit-dashboard-container" centered>
            <Modal.Header>
                <Modal.Title className='w-100'>
                    <h1 id="exit-dashboard-container" className="modal-heading">Exit Mentor Application</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12 my-3">
                        <p className="m-0">
                            If you exit the application now, your entries <strong>will not be saved.</strong>
                        </p>
                        <p className="m-0">
                            Are you sure you want to exit and return to the dashboard?
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 my-3">
                        <div className="d-flex">
                            <button className="btn btn-border-gray px-4 2 focusable-item" onClick={closeModalHandler}>No</button>
                            <button className="btn btn-primary px-4 focusable-item" onClick={returnToDashbaordHandler}>Yes</button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ExitToDashboardModal