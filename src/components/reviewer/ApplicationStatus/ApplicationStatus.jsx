import React from 'react'
import Decision from './Decision'
import Comments from './Comments'
import Attachments from './Attachments'

const ApplicationStatus = ({
  applicationStatus,
  statusReason,
  reviewerFiles,
  reasonText,
  isMentorApp
}) => {
  return (
    <div className='row left-align mt-5'>
      <div className='col-md-10 application-status-container mb-5'>
        <h2 className='mt-3 my-3 mentor-summary-section-heading'>
          Application Status
        </h2>
        <p>
          If a reviewer has approved or declined an application, the status,
          comments and/or attachments will be shown below.
        </p>
        <Decision applicationStatus={applicationStatus} />
        <Comments reasonText={statusReason ? statusReason : reasonText} />
        <Attachments reasonFiles={reviewerFiles} isMentorApp={isMentorApp} />
      </div>
    </div>
  )
}

export default ApplicationStatus
