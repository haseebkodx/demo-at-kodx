import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import './mentor-dashboard.scss'
import { Link } from 'react-router-dom'
import ReasonModal from './ReasonModal'
import { getAllMentorFiles } from '../../reviewer/ApplicationStatus/getFilesCall'
import InformationRow from '../../commonComponents/InformationRow'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import deleteMentorApp from './deleteMentorApp.action'

function MentorSubmittedApp({ mentorApplicationInfo, accessToken, deleteAppstate }) {
  const [showReasonModal, setShowReasonModal] = useState(null)
  const [reviewerFiles, setReviewerFiles] = useState(null)
  const status = mentorApplicationInfo && mentorApplicationInfo.status
  const reason = mentorApplicationInfo && mentorApplicationInfo.status_reason
  const HandleReasonModal = () => {
    setShowReasonModal(showReasonModal === true ? false : true)
  }

  const approvedApplication =
    mentorApplicationInfo && mentorApplicationInfo.status === 'approved'

  useEffect(() => {
    if (mentorApplicationInfo) {
      const getFiles = async () => {
        const response = await getAllMentorFiles(mentorApplicationInfo.uuid)
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
    }
  }, [mentorApplicationInfo])

  const parseFiles = (files) => {
    const reviewerFileUploads = _.filter(files, [
      'field_name',
      'reviewer_file_upload',
    ])
    if (reviewerFileUploads && reviewerFileUploads.length > 0) {
      setReviewerFiles(reviewerFileUploads)
    }
  }

  const DeleteMentorApplication = async (uuid) => {
    await deleteMentorApp(uuid)
    await deleteAppstate()
  }

  return (
    <section
      className='osbp-block mb-4 mentor-submitted-app'
      data-test-id='mentor-submitted-app'
    >
      <h2>Mentor Application</h2>

      {showReasonModal && (
        <ReasonModal
          showModal={showReasonModal}
          handleModal={HandleReasonModal}
          reason={mentorApplicationInfo && mentorApplicationInfo.status_reason}
          reviewerFiles={reviewerFiles}
          isMentorApp={true}
        />
      )}
      <div className='card-body'>
        <div id='application-table'>
          <InformationRow
            label='Name'
            detail={_.startCase(
              _.toLower(
                mentorApplicationInfo &&
                mentorApplicationInfo.legal_business_name
              )
            )}
            isMentorSubmittedCard={true}
          />
          <InformationRow
            label='Status'
            detail={
              mentorApplicationInfo &&
              _.startCase(_.toLower(mentorApplicationInfo.status))
            }
            isMentorSubmittedCard={true}
          />

          <InformationRow
            label='Reason'
            detail={mentorApplicationInfo && (mentorApplicationInfo.status === 'declined' || mentorApplicationInfo.status === 'approved') && <div className="align-self-center" data-test-id="Mentor View">
              <span className="company-name" onClick={() => HandleReasonModal()}>
                <FontAwesomeIcon icon={faFileAlt} />
                &nbsp;View Comments
              </span>
            </div>
            }
            isMentorSubmittedCard={true}
          />



          {/* {agreement &&
            (agreement.mentor_protege_agr_status === 'approved' ||
              agreement.mentor_protege_agr_status === 'declined') ? (
            <td className='col-md-2'>
              <button
                type='button'
                style={{
                  border: 'none',
                  backgroundColor: 'transparent'
                }}
                className='reviewer-rejection focusable-item'
                tabIndex='0'
                onClick={() => handleReason(agreement.uuid)}
              >
                <FontAwesomeIcon icon={faFileAlt} />
                        &nbsp;View Comments
                      </button>
            </td>
          ) : null} */}

          {status !== 'declined' && status !== 'incomplete' ? (
            <Link
              to={{
                pathname: '/mentorApplication',
                state: {
                  uuid: mentorApplicationInfo && mentorApplicationInfo.uuid,
                  toDashboard: 'dashboard',
                  accessToken: accessToken,
                  status: status,
                  reason: reason,
                },
              }}
            >
              <button
                className={`btn btn-primary mt-2 center focusable-item ${approvedApplication && 'center'
                  } ${!approvedApplication && 'col-md-4 float-left mb-3'}`}
              >
                <span className='font-white'>View Application</span>
              </button>
            </Link>
          ) : (
            <Link
              to={{
                pathname: '/mentorApplication',
                state: {
                  initialUuid:
                    mentorApplicationInfo && mentorApplicationInfo.uuid,
                  accessToken: accessToken,
                  status: status,
                  reason: reason,
                },
              }}
            >
              <button
                className={`btn btn-primary mt-2 center focusable-item ${approvedApplication && 'center'
                  } ${!approvedApplication && 'col-md-4 float-left mb-3'}`}
              >
                <span className='font-white'>Continue</span>
              </button>
            </Link>
          )}

          {status !== 'approved' && <button
            className={`btn btn-white mt-2 center focusable-item ml-2 ${approvedApplication && 'center'
              } ${!approvedApplication && 'col-md-4 float-left mb-3'}`}
            onClick={() => DeleteMentorApplication(mentorApplicationInfo && mentorApplicationInfo.uuid)}
          >
            <span className=''>Delete</span>
          </button>}

        </div>
        {/* <div className="row border-grey no-gutters">
          <div className="col-6 col-md-2 align-self-center font-weight-bold px-4" data-test-id="Mentor Name">
            <span className="company-name">{mentorApplicationInfo && mentorApplicationInfo.company_name}</span>
          </div>

          <div className="col-6 col-md-2 align-self-center" data-test-id="Mentor View">
            {(status !== 'declined' && status !== 'incomplete') ? <span className="company-name"><FontAwesomeIcon icon={faFileAlt} /> <Link to={{ pathname: '/mentorApplication', state: { uuid: mentorApplicationInfo && mentorApplicationInfo.uuid } }}>&nbsp;View</Link></span>
              : <span className="company-name"><FontAwesomeIcon icon={faFileAlt} /> <Link to={{ pathname: '/mentorApplication', state: { initialUuid: mentorApplicationInfo && mentorApplicationInfo.uuid } }}>&nbsp;Continue</Link></span>}
          </div>

          <div className="col-6 col-md-4 align-self-center px-4 font-size-sm text-center mt-1 mb-1" data-test-id="Mentor Last Update">
            <div className="mt-1">{mentorApplicationInfo && getDateFormat(mentorApplicationInfo.updated_at)}</div>
            <div className="text-nowrap text-muted">Last Update</div>
          </div>

          {mentorApplicationInfo && mentorApplicationInfo.status === 'declined' && < div className="col-6 col-md-2 align-self-center" data-test-id="Mentor View">
            <span className="company-name" onClick={() => HandleReasonModal()}>&nbsp;Reason</span>
          </div>
          }
          <div className={`col-6 col-md-2 align-self-center px-4 font-size-sm text-center ${statusDesign}`} data-test-id="Mentor Status">
            <div className="status text-center">
              <div>
                <FontAwesomeIcon icon={icon} />
              </div>
              <div className="text-nowrap text-muted">
                <span className={`content d-block declined-app ${statusDesign}`}>{mentorApplicationInfo && _.startCase(_.toLower(mentorApplicationInfo.status))}</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section >
  )
}

export default MentorSubmittedApp