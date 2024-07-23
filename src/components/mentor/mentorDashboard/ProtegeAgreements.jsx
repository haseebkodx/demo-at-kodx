/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import getProtegeAgeementData from './getProtegeAgreementData.action'
import getMentorProtegeAgreementData from '../../reviewer/reviewAgreement/getMentorProtegeAgreementData.action'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import ReasonModal from './ReasonModal'

function ProtegeAgreements({ currentUser, acceptedInivtationFilter }) {
  const history = useHistory()
  const userInfo = useSelector((state) => state.currentUserInfo)
  const userId = useSelector(
    (state) => state && state.currentUserInfo && state.currentUserInfo.uuid
  )
  const protegeAgreement =
    userInfo &&
    userInfo.agreements &&
    userInfo.agreements.find((agreement) => agreement.protege_id === userId)
  const protegeUuid = protegeAgreement && protegeAgreement.uuid
  const [protegeAgreementInfo, setProtegeAgreementInfo] = useState(null)
  const [mentorProtegeAgreementInfo, setMentorProtegeAgreementInfo] = useState(
    null
  )

  const [comments, setComments] = useState(null)
  const [reviewerFiles, setReviewerFiles] = useState(null)
  const [showReasonModal, setShowReasonModal] = useState(null)
  const [uuid, setUuid] = useState(null)

  const statusDesign = (protegeAgreementStatus) => {
    return (
      protegeAgreementStatus &&
      (protegeAgreementStatus &&
        protegeAgreementStatus.mentor_protege_agr_status === 'incomplete'
        ? 'in-progress-app'
        : protegeAgreementStatus &&
          protegeAgreementStatus.mentor_protege_agr_status === 'pending'
          ? 'pending-app'
          : protegeAgreementStatus &&
            protegeAgreementStatus.mentor_protege_agr_status === 'approved'
            ? 'approved-app'
            : protegeAgreementStatus &&
              protegeAgreementStatus.mentor_protege_agr_status === 'declined'
              ? 'rejected-app'
              : null)
    )
  }

  const GetProtegeAgreementData = async () => {
    const protegeAgreement =
      protegeUuid &&
      acceptedInivtationFilter &&
      acceptedInivtationFilter.length > 0 &&
      (await getProtegeAgeementData(protegeUuid))
    setProtegeAgreementInfo(protegeAgreement)
    const mentorProtegeAgreement =
      protegeUuid && (await getMentorProtegeAgreementData(protegeUuid))

    setMentorProtegeAgreementInfo(mentorProtegeAgreement)
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

  const handleReason = (uuid) => {
    setUuid(uuid)
    GetMentorProtegeAgreementData(uuid)
  }

  useEffect(() => {
    GetProtegeAgreementData()
  }, [currentUser, acceptedInivtationFilter])

  const changePath = (path) => {
    history.push(path)
  }

  const protegeAgreementStatus =
    mentorProtegeAgreementInfo &&
    mentorProtegeAgreementInfo.agreement &&
    mentorProtegeAgreementInfo.agreement[0]
  const mentorCompanyName =
    protegeAgreementStatus && protegeAgreementStatus.mentor_company_name
  const protegeCompanyName =
    protegeAgreementStatus && protegeAgreementStatus.protege_company_name

  return (
    <section>
      {showReasonModal && (
        <ReasonModal
          showModal={showReasonModal}
          handleModal={handleReason}
          reason={comments}
          reviewerFiles={reviewerFiles}
        />
      )}

      {protegeAgreementInfo &&
        protegeAgreementInfo[0] &&
        protegeAgreementInfo[0].legal_business_name && (
          <div className='osbp-block mb-3 mt-0'>
            <h2>MPP Agreements (Protégé)</h2>
            {protegeAgreementInfo ? (
              <div className='row single-agreement remove-row-margin'>
                <div
                  className='col-md-5 align-self-center font-weight-bold py-2'
                  data-test-id='Mentor Name'
                > <span className='sr-only'>Mentor Company and Protege Company</span>
                  <span className='company-name'>{`${_.startCase(
                    _.toLower(mentorCompanyName)
                  )} and  ${_.startCase(_.toLower(protegeCompanyName))}`}</span>
                </div>
                <div className='col-md-3' data-test-id='Mentor Status'>

                  <div className='status'>
                    <div className='col-md-3' data-test-id='Mentor Status'>
                      <button
                        className='btn btn-primary btn-dashboard my-4 focusable-item'
                        onClick={() => changePath('/protegeAgreement')}
                      ><span className='sr-only'>Action</span>
                        <span>
                          {protegeAgreementStatus &&
                            protegeAgreementStatus.protege_arg_status ===
                            'complete'
                            ? 'View Agreement'
                            : protegeAgreementStatus &&
                              protegeAgreementStatus.protege_arg_status ===
                              'incomplete'
                              ? 'Continue Agreement'
                              : 'Start Agreement'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className='col-md-2 my-3 pl-5'
                  style={{ display: 'flex', alignItems: 'center' }}
                ><span className='sr-only'> Agreement Status</span>
                  <span className={statusDesign(protegeAgreementStatus)}>
                    {protegeAgreementStatus &&
                      protegeAgreementStatus.mentor_protege_agr_status ===
                      'incomplete' ? (
                        <span style={{ color: '#7B4E05' }}>In progress</span>
                      ) : protegeAgreementStatus &&
                        protegeAgreementStatus.mentor_protege_agr_status ===
                        'pending' ? (
                          <span style={{ color: '#7B4E05' }}>Pending approval</span>
                        ) : protegeAgreementStatus &&
                          protegeAgreementStatus.mentor_protege_agr_status ===
                          'approved' ? (
                            <span style={{ color: '#2C632C' }}>Approved</span>
                          ) : protegeAgreementStatus &&
                            protegeAgreementStatus.mentor_protege_agr_status ===
                            'declined' ? (
                              <span style={{ color: '#A02722' }}>Rejected</span>
                            ) : null}
                  </span>
                </div>
                {protegeAgreementStatus &&
                  (protegeAgreementStatus.mentor_protege_agr_status ===
                    'approved' ||
                    protegeAgreementStatus.mentor_protege_agr_status ===
                    'declined') ? (
                    <div
                      className='col-md-2 my-3'
                      style={{ display: 'flex', alignItems: 'center' }}
                    >

                      <button
                        type='button'
                        style={{
                          border: 'none',
                          backgroundColor: 'transparent'
                        }}
                        className='reviewer-rejection'
                        tabIndex='0'
                        onClick={() => handleReason(protegeUuid)}
                      ><span className='sr-only'>Comments</span>
                        <FontAwesomeIcon icon={faFileAlt} />
                      &nbsp;View Comments
                    </button>
                    </div>
                  ) : null}
              </div>
            ) : (
                <p className='px-3 pt-3'>You have no agreements.</p>
              )}
          </div>
        )}
    </section>
  )
}

export default ProtegeAgreements
