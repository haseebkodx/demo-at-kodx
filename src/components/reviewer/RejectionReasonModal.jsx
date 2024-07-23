import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import Attachments from './ApplicationStatus/Attachments'
import getMentorProtegeAgreementData from './reviewAgreement/getMentorProtegeAgreementData.action'

const RejectionReasonModal = ({
  showModal,
  reasonText,
  reasonFiles,
  onHideModal,
  reviewerPhase,
  appUuid,
  getAllMentorFiles,
  parseFiles,
  setReasonFiles,
  setReasonText
}) => {
	const [isMentorApplication, setIsMentorApplication] = useState(null)
	
  useEffect(() => {
    if (reviewerPhase === 'applications') {
      setIsMentorApplication(true)
      getReviewerFiles()
    } else {
      setIsMentorApplication(false)
      getReviewerFiles()
    }
  }, [reviewerPhase])

  useEffect(() => {
    getReviewerFiles()
  }, [showModal])

  const getReviewerFiles = async () => {
    if (appUuid && isMentorApplication) {
      const getFiles = async () => {
        const response = await getAllMentorFiles(appUuid)
        if (
          response &&
          response.status === 'Success' &&
          response.data &&
          response.data.length > 0
        ) {
          parseFiles(response.data)
        }
      }
      getFiles()
    } else if (appUuid) {
      const GetMentorProtegeAgreementData = async () => {
        const data = await getMentorProtegeAgreementData(appUuid)

        const { agreement } = data

        const reviewerUploadedFiles =
          agreement && agreement[0].reviewer_uploaded_file
        setReasonFiles(reviewerUploadedFiles)

        const commentsProvided = agreement && agreement[0].status_reason
        setReasonText(commentsProvided)
      }
      GetMentorProtegeAgreementData()
    }
  }

  return (
    <Modal show={showModal} aria-labelledby="rejection-reason-container" onHide={onHideModal} centered>
      <Modal.Header
        className='modal-header-reason pb-0'
        closeButton={onHideModal}
        onHide={onHideModal}
        style={{ paddingBottom: '0px' }}
      >
      </Modal.Header>
      <Modal.Body
        className='modal-body-reason pt-0'
        style={{ paddingTop: '0px' }}
      >
        <Modal.Title className='left-align'>
          <h2 className="modal-heading">
            Comments
          </h2>
        </Modal.Title>
        {reasonText ? (
          <div className='row mb-5 pt-2'>
            <div className='col-md-12'>
              <div>{reasonText}</div>
            </div>
          </div>
        ) : (
            <p>No comments.</p>
          )}
        <div className='row'>
          <div className='col-md-12 left-align'>
            <Modal.Title className='left-align'>
              <h2 className="modal-heading">
                Attachments
              </h2>
            </Modal.Title>
          </div>
        </div>
        {reasonFiles && reasonFiles.length > 0 ? (
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
                  reasonText={reasonText}
                  reasonFiles={reasonFiles}
                  isMentorApp={isMentorApplication}
                  isReasonModal={true}
                />
              </div>
            </div>
          </>
        ) : (
            <p>No attachments.</p>
          )}
      </Modal.Body>
      <Modal.Footer className='modal-footer-exit-button'>
        <div className='row'>
          <div className='col-12 p-0'>
            <div>
              <button className='btn btn-primary focusable-item' onClick={onHideModal}>
                Exit
              </button>
            </div>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default RejectionReasonModal
