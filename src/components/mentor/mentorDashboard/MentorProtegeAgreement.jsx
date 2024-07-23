import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import ReasonModal from './ReasonModal'
import getMentorProtegeAgreementData from '../../reviewer/reviewAgreement/getMentorProtegeAgreementData.action'

function MentorProtegeAgreement({ mentorAgreementList }) {
  const [comments, setComments] = useState(null)
  const [reviewerFiles, setReviewerFiles] = useState(null)
  const [showReasonModal, setShowReasonModal] = useState(null)

  const history = useHistory()
  const statusDesign = ({ agreement }) => {
    return (
      agreement &&
      (agreement && agreement.mentor_protege_agr_status === 'incomplete'
        ? 'in-progress-app'
        : agreement && agreement.mentor_protege_agr_status === 'pending'
          ? 'pending-app'
          : agreement && agreement.mentor_protege_agr_status === 'approved'
            ? 'approved-app'
            : agreement && agreement.mentor_protege_agr_status === 'declined'
              ? 'rejected-app'
              : null)
    )
  }

  const GetMentorProtegeAgreementData = async (uuid) => {
    const data = await getMentorProtegeAgreementData(uuid)
    const { agreement } = data
    const comments = agreement && agreement[0] && agreement[0].status_reason
    setComments(comments)
    const files =
      agreement && agreement[0] && agreement[0].reviewer_uploaded_file
    setReviewerFiles(files)
    setShowReasonModal(showReasonModal === true ? false : true)
  }

  const HandleReasonModal = (uuid) => {
    GetMentorProtegeAgreementData(uuid)
  }

  return (
    <section className='osbp-block mb-3'>
      <h2>MPP Agreements (Mentor)</h2>
      {showReasonModal && (
        <ReasonModal
          showModal={showReasonModal}
          handleModal={HandleReasonModal}
          reason={comments}
          reviewerFiles={reviewerFiles}
        />
      )}
      <div id='agreement-list' className="px-3">
        <AgreementsList
          agreements={mentorAgreementList}
          history={history}
          statusDesign={statusDesign}
          handleReason={HandleReasonModal}
          reason={comments}
        />
      </div>
    </section>
  )
}

const AgreementsList = ({
  agreements,
  history,
  statusDesign,
  handleReason
}) => {
  const changePath = (uuid) => {
    history.push({
      pathname: '/agreementReview',
      state: { agreementId: uuid }
    })
  }

  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr className='sr-only row'>
          <th className='col-md-5'>
            Mentor Company and Protege Company
        </th>
          <th className='col-md-3'>
            Action
        </th>
          <th className='col-md-2'>
            Agreement Status
        </th>
          <th className='col-md-2'>
            Comments
        </th>
        </tr>
      </thead>
      <tbody>
        {agreements && agreements.length > 0 ? (
          agreements.map((agreement, idx) => {
            const mentorCompanyName =
              agreement && agreement.mentor_company_name
            const protegeCompanyName =
              agreement && agreement.protege_company_name
            return (
              <tr className='row' key={idx}>
                <td
                  className='col-md-5 align-self-center font-weight-bold py-2'
                  data-test-id='Mentor Name'
                >
                  <span className='company-name'>{`${_.startCase(
                    _.toLower(mentorCompanyName)
                  )} and ${_.startCase(
                    _.toLower(protegeCompanyName)
                  )}`}</span>
                </td>

                <td className='col-md-3' data-test-id='Mentor Status'>
                  <button
                    className='btn btn-primary btn-dashboard my-2 focusable-item'
                    onClick={() => changePath(agreement.uuid)}
                  >
                    <span>
                      {agreement && agreement.mentor_arg_status === 'complete'
                        ? 'View Agreement'
                        : agreement &&
                          agreement.mentor_arg_status === 'incomplete'
                          ? 'Continue Agreement'
                          : 'Start Agreement'}
                    </span>
                  </button>
                </td>

                <td className='col-md-2 my-3'>
                  <span className={statusDesign({ agreement })}>
                    {agreement &&
                      agreement.mentor_protege_agr_status === 'incomplete' ? (
                      <span style={{ color: '#7B4E05' }}>In progress</span>
                    ) : agreement &&
                      agreement.mentor_protege_agr_status === 'pending' ? (
                      <span style={{ color: '#7B4E05' }}>
                        Pending approval
                      </span>
                    ) : agreement &&
                      agreement.mentor_protege_agr_status === 'approved' ? (
                      <span style={{ color: '#2C632C' }}>Approved</span>
                    ) : agreement &&
                      agreement.mentor_protege_agr_status === 'declined' ? (
                      <span style={{ color: '#A02722' }}>Rejected</span>
                    ) : null}
                  </span>
                </td>

                {agreement &&
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
                ) : null}
              </tr>
            )
          })
        ) : (
          <p className='px-3 pt-3'>You have no agreements.</p>
        )}
      </tbody>
    </table>
  )
}

export default MentorProtegeAgreement
