import React from 'react'
import { Modal } from 'react-bootstrap'
import Attachments from '../../reviewer/ApplicationStatus/Attachments'

function StatusModal({
  showModal,
  handleModal,
  reason,
  reviewerFiles,
  isMentorApp = false
}) {
  return (
    <Modal show={showModal} onHide={handleModal} centered>
      <Modal.Header closeButton onHide={handleModal}>
        <Modal.Title className='left-align'>
          <h1 className="modal-heading">
            Comments
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ paddingTop: '0px' }}>
        {reason ? (
          <div className='row mb-5 pt-2'>
            <div className='col-md-12'>
              <div>{reason}</div>
            </div>
          </div>
        ) : (
            <p>No comments.</p>
          )}
        <div className='row'>
          <h2 className='modal-secondary-heading ml-3'>
            Attachments
          </h2>
        </div>
        {reviewerFiles && reviewerFiles.length > 0 ? (
          <>
            <div className='row'>
              <div className='col-md-12 left-align'>
                <p className='mb-0'>
                  Click on a document name to view the attachment.
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12 left-align mb-4 pb-4'>
                <Attachments
                  reasonFiles={reviewerFiles}
                  isMentorApp={isMentorApp}
                  isReasonModal={true}
                />
              </div>
            </div>
          </>
        ) : (
            <p>No attachments.</p>
          )}
        <div>
          <button className='btn btn-sm btn-primary px-4' onClick={handleModal}>
            Exit
          </button>
        </div>
      </Modal.Body>
    </Modal >
  )
}

export default StatusModal
