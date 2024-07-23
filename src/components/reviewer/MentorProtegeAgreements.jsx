import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import _ from 'lodash'
import AcceptModal from './AcceptModal'
import DeclineReasonModal from './DeclineReasonModal'
import setApproveDeclineAgreement from './reviewAgreement/setApproveDeclineAgreement.action'
import { keydownHandler } from '../commonComponents/utility'

function MentorProtegeAgreements({
  mentorProtegeAgreements,
  handlePageClick,
  totalMentorProtegeAgreementsCount,
  useApproveDeclineMentorApp,
  displayRejectionReasonModal,
  initialStartPage
}) {
  const [showModal, setShowModal] = useState(false)
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [companyName, setCompanyName] = useState(null)
  const [uuid, setUuid] = useState(null)
  const history = useHistory()

  const HandleApproveDeclineAgreeement = async (uuid, approved, reason) => {
    const decision = await setApproveDeclineAgreement({
      uuid,
      approved,
      reason
    })
    useApproveDeclineMentorApp(decision)
    setShowModal(false)
    setShowAcceptModal(false)
    history.push('/reviewerDashboard')
  }

  const HandleAccept = (companyName, uuid) => {
    setCompanyName(companyName)
    setUuid(uuid)
    setShowAcceptModal(true)
  }

  const DismissAcceptModal = () => {
    setShowAcceptModal(false)
    setCompanyName(null)
    setUuid(null)
  }

  const ChangeShowModal = (companyName, uuid) => {
    setUuid(uuid)
    setCompanyName(companyName)
    setShowModal(showModal === true ? false : true)
  }

  return (
    <div className='container-fluid left-align'>
      <div className='row'>
        <div className='col-12 p-0'>
          <div className='tab-content m-0' id='myTabContentAgreements'>
            <div
              className='tab-pane fade show active reviewer-table'
              id='mentor-app-content-agreements'
              role='tabpanel'
            >
              <div className='row'>
                <div className='col-12'>
                  <AcceptModal
                    showModal={showAcceptModal}
                    dismissModal={DismissAcceptModal}
                    acceptApplicationHandler={HandleApproveDeclineAgreeement}
                    reviewerPhase={'agreements'}
                    companyName={companyName}
                    uuid={uuid}
                  />
                  {showModal && (
                    <DeclineReasonModal
                      showModal={showModal}
                      handleModal={ChangeShowModal}
                      reviewerPhase={'agreements'}
                      companyName={companyName}
                      handleApproveDecline={HandleApproveDeclineAgreeement}
                      uuid={uuid}
                    />
                  )}

                  <table className='table table-striped mentor-app-table mb-4'>

                    <thead>
                      <tr>
                        <th scope='col' className='sr-only'>
                          Row ID
                        </th>
                        <th scope='col'>Mentor</th>
                        <th scope='col'>Protege</th>
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
                      <MentorProtegeAgreementsTableData
                        mentorProtegeAgreements={mentorProtegeAgreements}
                        displayRejectionReasonModal={
                          displayRejectionReasonModal
                        }
                        HandleAccept={HandleAccept}
                        changeShowModal={ChangeShowModal}
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
                    pageCount={totalMentorProtegeAgreementsCount / 10}
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

function MentorProtegeAgreementsTableData({
  mentorProtegeAgreements,
  displayRejectionReasonModal,
  HandleAccept,
  changeShowModal
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
    mentorProtegeAgreements &&
    mentorProtegeAgreements.map((mentorProtegeAgreement, idx) => (
      <tr key={idx}>
        <th scope='row' className='sr-only'>
          2
        </th>
        <td className="text-left">{mentorProtegeAgreement.mentor_company_name}</td>
        <td className="text-left">{mentorProtegeAgreement.protege_company_name}</td>
        <td className="text-left">
          <div tabIndex="0" className="text-left focusable-item">
            <FontAwesomeIcon icon={faFileAlt} />
            <Link
              to={{
                pathname: '/reviewAgreement',
                state: {
                  agreementId: mentorProtegeAgreement.uuid,
                  applicationStatus:
                    mentorProtegeAgreement.mentor_protege_agr_status,
                  statusReason: mentorProtegeAgreement.status_reason,
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
              {moment(mentorProtegeAgreement.updated_at).fromNow()}
            </div>
          </div>
        </td>
        <td className="text-left">
          <div className="text-left">
            <div className='col-md-8 p-0'>
              <FontAwesomeIcon
                icon={faCircle}
                className={`${statusClass(
                  mentorProtegeAgreement.mentor_protege_agr_status
                )} font-13`}
              />
              &nbsp;&nbsp;
              {_.startCase(mentorProtegeAgreement.mentor_protege_agr_status)}
            </div>
          </div>
        </td>

        {mentorProtegeAgreement.mentor_protege_agr_status === 'pending' ? (
          <td className="text-left">
            <div className="text-left">
              <button
                tabIndex='0'
                className='btn btn-sm btn-primary focusable-item'
                onClick={() =>
                  HandleAccept(
                    `${mentorProtegeAgreement.mentor_company_name} and ${mentorProtegeAgreement.protege_company_name}`,
                    mentorProtegeAgreement.uuid
                  )
                }
              >
                Approve
              </button>
              <button
                tabIndex='0'
                className='btn btn-sm btn-primary ml-1 focusable-item'
                onClick={() =>
                  changeShowModal(
                    `${mentorProtegeAgreement.mentor_company_name} and ${mentorProtegeAgreement.protege_company_name}`,
                    mentorProtegeAgreement.uuid
                  )
                }
              >
                Decline
              </button>
            </div>
          </td>
        ) : mentorProtegeAgreement.mentor_protege_agr_status === 'declined' ||
          mentorProtegeAgreement.mentor_protege_agr_status === 'approved' ? (
          <td className="text-left">
            <div
              className='reviewer-rejection focusable-item'
              tabIndex='0'
              onClick={() =>
                displayRejectionReasonModal(
                  mentorProtegeAgreement.status_reason,
                  mentorProtegeAgreement.uuid
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

export default MentorProtegeAgreements
