import React from 'react'
import { Modal } from 'react-bootstrap'

const UserReviewerModal = ({ showModal, acceptUserReviewerHandler, declineUserReviewHandler }) => {
    return (
        <Modal show={showModal} centered>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12">

                        <div className="row">
                            <div className="col-md-12">
                                <p className="m-0 my-3 text-center">Do you want to be granted the role of a Reviewer?</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-primary px-4 py-2" onClick={acceptUserReviewerHandler}>YES</button>
                                    <button className="btn btn-primary px-4 py-2 ml-4" onClick={declineUserReviewHandler}>NO</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default UserReviewerModal