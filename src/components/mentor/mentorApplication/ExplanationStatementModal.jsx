import React from 'react'
import { Modal, Spinner } from 'react-bootstrap'

const ExplanationStatementModal = ({ showModal, showSpinner, message, statementType, clearStatementHandler, retainStatementHandler }) => {
    return (
        <Modal show={showModal} centered>
            <Modal.Header>
                <Modal.Title className='w-100'>
                    <h1 className="m-0 modal-heading">Warning For {statementType}</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12 my-3">
                        <p className="m-0">
                            {message}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 my-3">
                        <div className="d-flex">
                            <button className="btn btn-border-gray px-4 mr-2" onClick={retainStatementHandler}>No</button>
                            <button className="btn btn-primary px-4" onClick={clearStatementHandler}>Yes</button>
                        </div>
                    </div>
                    <div className="col-md-6 my-3">
                        {showSpinner && 
                        <Spinner
                            className='loading-status'
                            animation='border'
                            role='status'
                            variant='info'
                        >
                            <span className='sr-only'>Loading ...</span>
                        </Spinner>}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ExplanationStatementModal