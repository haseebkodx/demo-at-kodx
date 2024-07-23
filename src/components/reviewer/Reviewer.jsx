import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import OptionItems from './OptionItems.jsx'
import MentorApplications from './MentorApplications'
import AcceptModal from './AcceptModal'
import DeclineReasonModal from './DeclineReasonModal'
import RejectionReasonModal from './RejectionReasonModal'
import getAllMentorApplications from './getAllmentorApplications.action'
import getAllMentorApplicationsCount from './getAllMentorApplicationsCount.action'
import setApproveDeclineMentorApp from './setApproveOrDeclineMentorApplication.action'
import getAllMentorProtegeAgreementsCount from './getAllMentorProtegeAgreementsCount.action'
import MentorProtegeAgreements from './MentorProtegeAgreements'
import getAllMentorProtegeAgreements from './getAllMentorProtegeAgreements.action'
import {
  setReviewerMentorApplicationPage,
  setReviewerMentorProtegeAgreementPage,
  setReviewerMentorApplicationStatus,
  setReviewerMentorProtegeAgreementStatus
} from './ReviewerPage.action'
import { useHistory, useLocation } from 'react-router-dom'
import {
  getAllMentorFiles,
  getAllFilesByAgreementAndType,
} from './ApplicationStatus/getFilesCall'
import _ from 'lodash'

function Reviewer() {
  const dispatch = useDispatch()
  const history = useHistory()
  const mentorAppSummaryPage = useSelector(
    (state) => state.reviewerPage.mentorAppSummaryPage
  )
  const mentorProtegeSummaryPage = useSelector(
    (state) => state.reviewerPage.mentorProtegeSummaryPage
  )
  const mentorAppStatus = useSelector(
    state => state.reviewerPage.mentorAppStatus
  )
  const mentorProtegeAgrStatus = useSelector(
    state => state.reviewerPage.mentorProtegeAgrStatus
  )
  const [mentorApplications, setMentorApplications] = useState(null)
  const [mentorProtegeAgreements, setMentorProtegeAgreements] = useState(null)
  const [mentorApplicationsCount, useMentorApplicationsCount] = useState(null)
  const [
    mentorProtegeAgreementsCount,
    useMentorProtegeAgreementsCount,
  ] = useState(null)
  const [offset, setOffset] = useState(0)
  const [agreementsOffset, setAgreementOffset] = useState(0)
  const [uuid, setUuid] = useState(null)
  const [
    totalMentorApplicationsCount,
    useTotalMentorApplicationsCount,
  ] = useState(0)
  const [
    totalMentorProtegeAgreementsCount,
    useTotalMentorProtegeAgreementsCount,
  ] = useState(0)
  const [approvedDeclineMentorApp, useApproveDeclineMentorApp] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [companyName, setCompanyName] = useState(null)
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [rejectionReasonText, setRejectionReasonText] = useState(null)

  const [reasonText, setReasonText] = useState(null)
  const [reasonFiles, setReasonFiles] = useState(null)

  const [reviewerPhase, useReviewerPhase] = useState('applications')
  const [isMentorApplication, setIsMentorApplication] = useState(null)

  useEffect(() => {
    if (reviewerPhase === 'applications') {
      setIsMentorApplication(true)
    } else {
      setIsMentorApplication(false)
    }
  }, [reviewerPhase])

  const location = useLocation()

  const limit = 10

  //Lifecycle Hooks

  useEffect(() => {
    window.scrollTo(0, 0)

    const searchParams = new URLSearchParams(location.search)
    if (searchParams) {
      if (searchParams.get('currentReviewerPhase') == 'agreements') {
        SetReviewerPhase()
      }
    }
  }, [])

  useEffect(() => {
    GetMentorApplicationsCount()
    GetMentorProtegeAgreeementsCount()
  }, [approvedDeclineMentorApp])

  useEffect(() => {
    if (mentorAppStatus) {
      GetMentorApplications(mentorAppStatus)
    } else {
      GetMentorApplications()
    }
  }, [offset, approvedDeclineMentorApp])

  useEffect(() => {
    if (mentorProtegeAgrStatus) {
      GetMentorProtegeAgreeements(mentorProtegeAgrStatus)
    } else {
      GetMentorProtegeAgreeements()
    }
  }, [agreementsOffset, approvedDeclineMentorApp])

  useEffect(() => {
    const newOffset = Math.ceil(mentorAppSummaryPage * limit)
    setOffset(newOffset)
  }, [mentorApplications])

  useEffect(() => {
    const newAgreementOffset = Math.ceil(mentorProtegeSummaryPage * limit)
    setAgreementOffset(newAgreementOffset)
  }, [mentorProtegeAgreements])

  //Custom Hooks

  const HandlePageClick = (data) => {
    const selected = data.selected
    const newOffset = Math.ceil(selected * limit)
    setOffset(newOffset)
    dispatch(setReviewerMentorApplicationPage(selected))
  }

  const HandleAgreementClick = (data) => {
    const selected = data.selected
    const agreementOffset = Math.ceil(selected * limit)
    setAgreementOffset(agreementOffset)
    dispatch(setReviewerMentorProtegeAgreementPage(selected))
  }

  const HandleApproveDecline = async (uuid, approved, reason) => {
    const decision = await setApproveDeclineMentorApp({
      uuid,
      approved,
      reason,
    })
    useApproveDeclineMentorApp(decision)
    setShowModal(false)
    setShowAcceptModal(false)
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

  const HandleDecline = async (companyName, uuid) => {
    setUuid(uuid)
    setCompanyName(companyName)
    setShowModal(showModal === true ? false : true)
  }

  const HandleMentorApplicationCount = (count) => {
    useTotalMentorApplicationsCount(count)
  }

  const HandleMentorProtegeAgreementsCount = (count) => {
    useTotalMentorProtegeAgreementsCount(count)
  }

  const GetMentorApplications = async (appStatus) => {
    const payload = appStatus
      ? JSON.stringify({ offset, limit, mentor_app_status: appStatus })
      : JSON.stringify({ offset, limit })
    const allMentorApplications = await getAllMentorApplications(payload)
    const { status, apiData } = allMentorApplications
    if (status === 401) {
      localStorage.removeItem('user_info')
      localStorage.removeItem('login_time')
      localStorage.removeItem('session_time')
      localStorage.removeItem('logged_in')
      history.push('/')
    }
    setMentorApplications(apiData)
  }

  const GetMentorProtegeAgreeements = async (agrStatus) => {
    const payload = agrStatus
      ? JSON.stringify({
        offset: agreementsOffset,
        limit,
        mentor_protege_agr_status: agrStatus,
      })
      : JSON.stringify({ offset: agreementsOffset, limit })
    const allMentorProtegeAgreements = await getAllMentorProtegeAgreements(
      payload
    )
    const { status, apiData } = allMentorProtegeAgreements
    if (status === 401) {
      localStorage.removeItem('user_info')
      localStorage.removeItem('login_time')
      localStorage.removeItem('session_time')
      localStorage.removeItem('logged_in')
      history.push('/')
    }
    setMentorProtegeAgreements(apiData)
  }

  const GetMentorApplicationsCount = async () => {
    const allMentorApplicationsCount = await getAllMentorApplicationsCount()
    const { status, apiData } = allMentorApplicationsCount
    if (status === 401) {
      localStorage.removeItem('user_info')
      localStorage.removeItem('login_time')
      localStorage.removeItem('session_time')
      localStorage.removeItem('logged_in')
      history.push('/')
    }
    useMentorApplicationsCount(apiData)
  }

  const GetMentorProtegeAgreeementsCount = async () => {
    const allMentorProtegeAgreementsCount = await getAllMentorProtegeAgreementsCount()
    const { status, apiData } = allMentorProtegeAgreementsCount
    if (status === 401) {
      localStorage.removeItem('user_info')
      localStorage.removeItem('login_time')
      localStorage.removeItem('session_time')
      localStorage.removeItem('logged_in')
      history.push('/')
    }
    useMentorProtegeAgreementsCount(apiData)
  }

  const SetReviewerPhase = () => {
    useReviewerPhase(
      reviewerPhase === 'applications' ? 'agreements' : 'applications'
    )
  }

  const [appUuid, setAppUuid] = useState(null)

  const displayRejectionReasonModal = (reason, appUuid) => {
    setReasonText(reason)
    setShowRejectionModal(true)
    setAppUuid(appUuid)
  }

  const parseFiles = (files) => {
    const reviewerFileUploads = _.filter(files, [
      'field_name',
      'reviewer_file_upload',
    ])
    if (reviewerFileUploads && reviewerFileUploads.length > 0) {
      setReasonFiles(reviewerFileUploads)
    }
  }

  const dismissRejectionReasonModal = () => {
    setShowRejectionModal(false)
    setReasonText(null)
    setReasonFiles(null)
  }

  const ResetOffset = (status) => {
    setOffset(0)
    dispatch(setReviewerMentorApplicationPage(0))
    dispatch(setReviewerMentorApplicationStatus(status))
  }

  const ResetAgreementOffset = (status) => {
    setAgreementOffset(0)
    dispatch(setReviewerMentorProtegeAgreementPage(0))
    dispatch(setReviewerMentorProtegeAgreementStatus(status))
  }

  return (
    <div className='wrapper'>
      <div className='container-fluid gray-bg'>
        <div className='row'>
          <div className='col-12'>
            <h1 className='my-3 font-weight-bold'>Reviewer Dashboard</h1>
          </div>
        </div>

        <div className='row tabs-row'>
          <div className='col-md-12 reviewer-dashboard-tabs'>
            <Tabs
              id='reviewer-dashboard-tabs-id'
              activeKey={reviewerPhase}
              onSelect={() => SetReviewerPhase()}
            >
              <Tab
                eventKey='applications'
                title='Mentor Applications'
                tabClassName={
                  reviewerPhase === 'applications' ? 'tab-Item' : ''
                }
              >
                <div className='row'>
                  <div className='col-md-12 p-0 my-2'>
                    <fieldset>
                      <legend>
                        <div className='row'>
                          <div className='col-md-12'>
                            <div className='m-0 font-weight-bold showing-apps-heading'>
                              Showing Applications:
                            </div>
                          </div>
                        </div>
                      </legend>

                      <div className='row'>
                        <div className='col-md-12'>
                          <OptionItems
                            mentorApplicationsCount={mentorApplicationsCount}
                            handleMentorApplicationCount={
                              HandleMentorApplicationCount
                            }
                            reviewerPhase={'applications'}
                            getApplicationOrAgreementDataHandler={
                              GetMentorApplications
                            }
                            resetOffsetHandler={ResetOffset}
                            activeOptionStatus={mentorAppStatus}
                          />
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <main id='main' className='row mt-0'>
                  <div className='col-md-12 p-0 pr-2'>
                    <MentorApplications
                      mentorApplications={mentorApplications}
                      handlePageClick={HandlePageClick}
                      handleAccept={HandleAccept}
                      handleDecline={HandleDecline}
                      totalMentorApplicationsCount={
                        totalMentorApplicationsCount
                      }
                      displayRejectionReasonModal={displayRejectionReasonModal}
                      initialStartPage={mentorAppSummaryPage}
                    />
                  </div>
                </main>
              </Tab>
              <Tab
                eventKey='agreements'
                title='MPP Agreements'
                tabClassName={reviewerPhase === 'agreements' ? 'tab-Item' : ''}
              >
                <div className='row'>
                  <div className='col-md-12 p-0 my-2'>
                    <fieldset>
                      <legend>
                        <div className='row'>
                          <div className='col-md-12'>
                            <h6 className='m-0 font-weight-bold'>
                              Showing Agreements:
                            </h6>
                          </div>
                        </div>
                      </legend>

                      <div className='row'>
                        <div className='col-md-12'>
                          <OptionItems
                            mentorApplicationsCount={
                              mentorProtegeAgreementsCount
                            }
                            handleMentorApplicationCount={
                              HandleMentorProtegeAgreementsCount
                            }
                            reviewerPhase={'agreements'}
                            getApplicationOrAgreementDataHandler={
                              GetMentorProtegeAgreeements
                            }
                            resetOffsetHandler={ResetAgreementOffset}
                            activeOptionStatus={mentorProtegeAgrStatus}
                          />
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <main id='main' className='row mt-0'>
                  <div className='col-md-12 p-0 pr-2'>
                    <MentorProtegeAgreements
                      mentorProtegeAgreements={mentorProtegeAgreements}
                      handlePageClick={HandleAgreementClick}
                      totalMentorProtegeAgreementsCount={
                        totalMentorProtegeAgreementsCount
                      }
                      useApproveDeclineMentorApp={useApproveDeclineMentorApp}
                      displayRejectionReasonModal={displayRejectionReasonModal}
                      initialStartPage={mentorProtegeSummaryPage}
                    />
                  </div>
                </main>
              </Tab>
            </Tabs>
          </div>
        </div>

        {showModal && (
          <DeclineReasonModal
            showModal={showModal}
            handleModal={HandleDecline}
            reviewerPhase={reviewerPhase}
            uuid={uuid}
            companyName={companyName}
            handleApproveDecline={HandleApproveDecline}
          />
        )}

        <AcceptModal
          showModal={showAcceptModal}
          dismissModal={DismissAcceptModal}
          acceptApplicationHandler={HandleApproveDecline}
          reviewerPhase={reviewerPhase}
          companyName={companyName}
          uuid={uuid}
        />

        <RejectionReasonModal
          uuid={uuid}
          showModal={showRejectionModal}
          onHideModal={dismissRejectionReasonModal}
          rejectionReasonText={rejectionReasonText}
          reasonText={reasonText}
          reasonFiles={reasonFiles}
          reviewerPhase={reviewerPhase}
          appUuid={appUuid}
          getAllMentorFiles={getAllMentorFiles}
          parseFiles={parseFiles}
          setReasonFiles={setReasonFiles}
          getAllFilesByAgreementAndType={getAllFilesByAgreementAndType}
          setReasonText={setReasonText}
        />
      </div>
    </div>
  )
}

export default Reviewer
