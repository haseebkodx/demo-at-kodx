/*eslint-disable eqeqeq*/
import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import FileUploadComponent from '../multifileUpload/FileUploadComponent'

const AcceptModal = ({
  showModal,
  dismissModal,
  acceptApplicationHandler,
  companyName,
  reviewerPhase,
  uuid,
}) => {
  const [reason, setReason] = useState(null)
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

  return (
    <Modal show={showModal} onHide={dismissModal} aria-labelledby="accept-mentor-application-container" centered>
      <Modal.Header closeButton={dismissModal}>
        <Modal.Title className='w-100'>
          <h1 id="accept-mentor-application-container" className="modal-heading">
            {reviewerPhase == 'applications'
              ? 'Accept Application Confirmation'
              : 'Accept Agreement Confirmation'}
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ paddingTop: '0px' }}>
        <div className='row mt-3'>
          <div className='col-md-12'>
            <p className='p-0 m-0'>
              Are you sure you want to accept the{' '}
              {reviewerPhase === 'applications' ? 'application' : 'agreement'}{' '}
              for <strong>{`${companyName}`}</strong>?
            </p>
          </div>
        </div>
        <fieldset>
          <legend className='sr-only'>Provide feedback (optional).</legend>

          <div className='row mt-3 mb-0'>
            <div className='col-12'>
            <label htmlFor="accept-mentor-application" className='p-0 m-0 text-left float-left mb-1'>Comments</label>
            </div>
          </div>
          <textarea
            id="accept-mentor-application"
            className='mb-3 reason-textarea focusable-item'
            rows={5}
            onChange={(e) => ChangeReason(e)}
          ></textarea>
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
        <div className='col-md-12'>
          <div className='d-flex'>

            <button
              className='btn btn-sm btn-border-gray px-4 mr-2 focusable-item'
              onClick={() => dismissModal()}
            >
              NO
            </button>
            <button
              className='btn btn-sm btn-primary px-4 focusable-item'
              onClick={() => acceptApplicationHandler(uuid, true, reason)}
            >
              YES
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default AcceptModal
