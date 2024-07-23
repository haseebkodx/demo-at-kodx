import React from 'react'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import _ from 'lodash'
import { keydownHandler } from '../commonComponents/utility'

function MentorApplications({
  mentorApplications,
  handlePageClick,
  handleDecline,
  handleAccept,
  totalMentorApplicationsCount,
  displayRejectionReasonModal,
  initialStartPage
}) {
  return (
    <div className='container-fluid left-align'>
      <div className='row'>
        <div className='col-12 p-0'>
          <div className='tab-content m-0' id='myTabContentApplications'>
            <div
              className='tab-pane fade show active reviewer-table'
              id='mentor-app-content-applications'
              role='tabpanel'
            >
              <div className='row'>
                <div className='col-12'>
                  <table className='table table-striped mentor-app-table mb-4'>
                    <thead>
                      <tr>
                        <th scope='col' className='sr-only'>
                          Row ID
                        </th>
                        <th scope='col'>Mentor</th>
                        <th scope='col' className="text-left">
                          Application Details
                        </th>
                        <th scope='col' className="text-left">
                          Last Updated
                        </th>
                        <th scope='col' className="text-left">
                          Status
                        </th>
                        <th scope='col' className="text-left">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className=''>
                      <MentorApplicationsTableData
                        mentorApplications={mentorApplications}
                        handleDecline={handleDecline}
                        handleAccept={handleAccept}
                        displayRejectionReasonModal={
                          displayRejectionReasonModal
                        }
                      />
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={totalMentorApplicationsCount / 10}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    containerClassName={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link focusable-item'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link focusable-item'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link focusable-item'}
                    activeClassName={'active'}
                    onPageChange={handlePageClick}
                    initialPage={initialStartPage}
                    forcePage={initialStartPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MentorApplicationsTableData({
  mentorApplications,
  handleDecline,
  handleAccept,
  displayRejectionReasonModal
}) {
  const statusClass = (status) => {
    if (status === 'pending') {
      return 'fa-warning'
    } else if (status === 'approved') {
      return 'fa-success'
    } else if (status === 'declined') {
      return 'fa-danger'
    } else {
      return null
    }
  }

  return (
    mentorApplications &&
    mentorApplications.map((mentorApplication, idx) => (
      <tr key={idx}>
        <th scope='row' className='sr-only'>
          2
        </th>
        <td className="text-left">{mentorApplication.legal_business_name}</td>
        <td className="text-left">
          <div tabIndex="0" className="text-left focusable-item">
            <FontAwesomeIcon icon={faFileAlt} />
            <Link
              to={{
                pathname: '/mentorApplication',
                state: {
                  uuid: mentorApplication.uuid,
                  toDashboard: 'reviewerDashboard',
                  applicationStatus: mentorApplication.status,
                  statusReason: mentorApplication.status_reason,
                  isReviewer: true
                }
              }}
            >
              &nbsp;View
            </Link>
          </div>
        </td>
        <td className="text-left">
          <div className="text-left">
            <div className='col-md-10 p-0'>
              {moment(mentorApplication.updated_at).fromNow()}
            </div>
          </div>
        </td>
        <td className="text-left">
          <div className="text-left">
            <div className='col-md-7 p-0'>
              <FontAwesomeIcon
                icon={faCircle}
                className={`${statusClass(mentorApplication.status)} font-13`}
              />
              &nbsp;&nbsp;{_.startCase(mentorApplication.status)}
            </div>
          </div>
        </td>

        {mentorApplication.status === 'pending' ? (
          <td className="text-left">
            <div className="text-left">
              <button
                tabIndex='0'
                className='btn btn-sm btn-primary focusable-item'
                onClick={() => {
                  handleAccept(
                    mentorApplication.legal_business_name,
                    mentorApplication.uuid
                  )
                }}
              >
                Approve
              </button>
              <button
                tabIndex='0'
                className='btn btn-sm btn-primary ml-1 focusable-item'
                onClick={() => {
                  handleDecline(
                    mentorApplication.legal_business_name,
                    mentorApplication.uuid
                  )
                }}
              >
                Decline
              </button>
            </div>
          </td>
        ) : mentorApplication.status === 'declined' ||
          mentorApplication.status === 'approved' ? (
          <td className="text-left">
            <div
              className='reviewer-rejection focusable-item'
              tabIndex='0'
              onClick={() =>
                displayRejectionReasonModal(
                  mentorApplication.status_reason,
                  mentorApplication.uuid
                )
              }
              onKeyDown={keydownHandler}
            >
              <FontAwesomeIcon icon={faFileAlt} />
              &nbsp;View Comments/Attachments
            </div>
          </td>
        ) : (
          <td className="text-left">
            {'-'}&nbsp;
            <p className='sr-only'>
              No options currently exist because Application has been approved.
            </p>
          </td>
        )}
      </tr>
    ))
  )
}

export default MentorApplications
