/*eslint-disable eqeqeq*/
import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import FileUploadComponent from '../multifileUpload/FileUploadComponent'

function StatusModal({
  showModal,
  handleModal,
  uuid,
  reviewerPhase,
  companyName,
  handleApproveDecline,
}) {
  const [reason, setReason] = useState(null)
  const [reasonError, setReasonError] = useState(false)
  const [files, setFiles] = useState(null)
  const [isMentorApplication, setIsMentorApplication] = useState(null)

  useEffect(() => {
    if (reviewerPhase === 'applications') {
      setIsMentorApplication(true)
    } else {
      setIsMentorApplication(false)
    }
  }, [reviewerPhase])

  const ChangeReason = (e) => {
    setReason(e.target.value)
  }

  const handleUploadedFiles = (files) => {
    if (files !== null || files !== 'undefined') {
      setFiles(files)
    }
  }

  const DeclineAgreement = () => {
    !reason && setReasonError(true)
    reason && handleApproveDecline(uuid, false, reason)
  }

  return (
    <Modal show={showModal} onHide={handleModal} aria-labelledby="decline-mentor-application-container" centered>
      <Modal.Header closeButton={handleModal}>
        <Modal.Title className='w-100'>
          <h1 id="decline-mentor-application-container" className="modal-heading">
            {reviewerPhase == 'applications'
              ? 'Decline Application Confirmation'
              : 'Decline Agreement Confirmation'}
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ paddingTop: '0px' }}>
        <div className='row mt-3'>
          <div className='col-md-12'>
            <p className='m-0 p-0'>
              Are you sure you want to decline the{' '}
              {reviewerPhase == 'applications' ? 'application' : 'agreement'}{' '}
              for <strong>{companyName}</strong>?
            </p>
            <p className='m-0 p-0'>
              If Yes, please provide a reason for the rejection.
            </p>
          </div>
        </div>
        <fieldset>
          <legend className='sr-only'>
            Provide comments and/or upload documents (required).
          </legend>
          <div className='row mt-3 mb-0'>
            <div className='col-12'>
              <label htmlFor="decline-mentor-appication" className='p-0 m-0 text-left float-left mb-1'><span aria-hidden='true'>*</span>Comments</label>
            </div>
          </div>
          <textarea
            id="decline-mentor-appication"
            className='mb-3 reason-textarea focusable-item'
            rows={5}
            onChange={(e) => ChangeReason(e)}
          ></textarea>
          {reasonError && <p className='erorr-red mt-n3'>Reason is required</p>}
          <div className='text-left'>
            <FileUploadComponent
              agreement_id={uuid}
              field_name={`reviewer_file_upload`}
              agreement_type={`reviewer`}
              handleUploadedFiles={handleUploadedFiles}
              initialFiles={null}
              isMentorApplication={isMentorApplication}
              forReviewerReasonModal={true}
            />
          </div>
        </fieldset>
      </Modal.Body>
      <Modal.Footer>
        <div className='col-md-12 d-flex'>
          <div>
            <button
              className='btn btn-sm btn-border-gray mr-2 px-4 focusable-item'
              onClick={handleModal}
            >
              NO
            </button>
            <button
              className='btn btn-sm btn-primary px-4 focusable-item'
              onClick={() => DeclineAgreement()}
            >
              YES
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default StatusModal
