import React, { useState, useEffect, useRef } from 'react'
import { reduxForm } from 'redux-form'
import { useLocation, useHistory } from 'react-router-dom'
import MentorReviewAgreement from '../../mentor/mentorAgreement/ReviewAgreement'
import ProtegeReviewAgreement from '../../protegeAgreement/ReviewAgreement'
import AcceptModal from '../AcceptModal'
import DeclineReasonModal from '../DeclineReasonModal'
import LoadingModal from '../../LoadingModal'
import getMentorProtegeAgreementData from './getMentorProtegeAgreementData.action'
import setApproveDeclineAgreement from './setApproveDeclineAgreement.action'
import setDocusginPdfEnvelope from './setDocusignPdfEnvelope.action'
import showPdf from '../../showPdf'
import { keydownElReferenceHandler } from '../../commonComponents/utility'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import pdf from '../../../assets/images/pdf.png'

import '../reviewer.scss'

function ReviewMentorProtegeAgreement() {
  const [agreement, setAgreement] = useState()
  const [hasEnvelope, setHasEnvelope] = useState(false)
  const [mentorAgreement, setMentorAgreement] = useState()
  const [mentorAgreementFileData, setMentorAgreementFileData] = useState()
  const [protegeAgreementData, setProtegeAgreementData] = useState()
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showDeclineModal, setShowDeclineModal] = useState(false)
  const [showLoadingModal, setShowLoadingModal] = useState(false)

  const location = useLocation()
  const history = useHistory()
  const agreementId = location.state && location.state.agreementId
  const applicationStatus = location.state && location.state.applicationStatus
  const statusReason = location.state && location.state.status_reason
  const isReviewer = location.state && location.state.isReviewer

  const [activeSummary, useActiveSummary] = useState('protegeSummary')

  const protegeTabRef = useRef()
  const mentorTabRef = useRef()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    GetMentorProtegeAgreementData()
  }, [agreementId])

  const ChangeActiveSummary = (summary) => {
    useActiveSummary(summary)
  }

  const changeToApplication = () => {
    history.push('/reviewerDashboard?currentReviewerPhase=agreements')
  }

  const ShowAcceptModal = () => {
    setShowAcceptModal(true)
  }

  const ShowDeclineModal = () => {
    setShowDeclineModal(true)
  }

  const DismissAcceptModal = () => {
    setShowAcceptModal(false)
  }

  const DismissDeclineModal = () => {
    setShowDeclineModal(false)
  }

  const HandleApproveDecline = async (uuid, approved, reason) => {
    await setApproveDeclineAgreement({ uuid, approved, reason })
    setShowAcceptModal(false)
    setShowDeclineModal(false)
    changeToApplication()
  }

  const GetMentorProtegeAgreementData = async () => {
    const data = await getMentorProtegeAgreementData(agreementId)
    const { agreement, mentor_agreement, protege_agreement } = data
    setAgreement(agreement[0])
    setHasEnvelope(agreement[0].envelope_id && true)
    setMentorAgreement(mentor_agreement[0])
    setProtegeAgreementData(protege_agreement[0])
  }

  const openDocusignPdfFile = async (envelopeId) => {
    setShowLoadingModal(true)
    const blobResponse = await setDocusginPdfEnvelope(envelopeId)
    showPdf(blobResponse, setShowLoadingModal)
  }

  return (
    <div id='mentor-protege-summary' className='row px-5'>
      <div className='col-md-12 mt-5 px-4'>
        <div className='px-0 mb-2 top-back-button'>
          <button className='btn pl-0' onClick={changeToApplication}>
            <FontAwesomeIcon icon={faChevronLeft} /> <strong>Back</strong>
          </button>
        </div>
      </div>

      <main id='main' className='mt-0'>
        <h1 className='sr-only'>Review Mentor Protege Agreement</h1>

        <div className='col-md-12 mt-5'>
          <ul className='nav nav-tabs ml-3' id='switch-tabs'>
            <li className='nav-item focusable-item' tabIndex='0' onKeyDown={e => keydownElReferenceHandler(e, protegeTabRef.current)}>
              <a
                ref={protegeTabRef}
                className={`nav-link ${activeSummary === 'protegeSummary' ? 'active' : 'not-active'
                  }`}
                id='mentor-app-tab'
                data-toggle='tab'
                onClick={() => ChangeActiveSummary('protegeSummary')}
              >
                Protege Section of Agreement
              </a>
            </li>
            <li className='nav-item focusable-item' tabIndex='0' onKeyDown={e => keydownElReferenceHandler(e, mentorTabRef.current)}>
              <a
                ref={mentorTabRef}
                className={`nav-link ${activeSummary === 'mentorSummary' ? 'active' : 'not-active'
                  }`}
                id='mpp-agreement-tab'
                data-toggle='tab'
                onClick={() => ChangeActiveSummary('mentorSummary')}
              >
                Mentor Section of Agreement
              </a>
            </li>
          </ul>
          <div className='summary-border pl-2 ml-3'>
            {activeSummary === 'mentorSummary' && (
              <MentorReviewAgreement
                mentorAgreement={mentorAgreement}
                mentorAgreementFileData={mentorAgreementFileData}
                isReviewer={isReviewer}
                mentorProtegeAgreement={agreement}
              />
            )}
            {activeSummary === 'protegeSummary' && (
              <ProtegeReviewAgreement
                mentorAgreement={mentorAgreement}
                protegeAgreement={protegeAgreementData}
                isReviewer={isReviewer}
                mentorProtegeAgreement={agreement}
              />
            )}
          </div>
        </div>

        {hasEnvelope && (
          <>
            <div className='col-md-12 mt-5 px-4'>
              <div className='row pl-4'>
                <div className='reviewer-section-title reviewer-summary-header col-md-12 px-0 px-2'>
                  DocuSign - Signed Agreement
                </div>
              </div>
              <div className='row my-3 pl-4'>
                <div className='col-md-12 p-0'>
                  <p className='m-0 p-0'>
                    Click below to view the completed agreement signed by all
                    parties.
                  </p>
                </div>
              </div>
              <div className='row pl-4'>
                <div className='col-md-12 p-0'>
                  <div
                    style={{ height: '100%', width: 150 }}
                    className='float-left'
                  >
                    <img
                      id='docusign-pdf-id'
                      src={pdf}
                      className='mr-3'
                      alt='DocuSign Pdf'
                      title='docusign-pdf'
                    />
                    <label htmlFor='docusign-pdf-id'>docusign.pdf</label>
                  </div>
                  <button
                    className='btn ml-5 px-5 py-2 bottom-back-button'
                    onClick={() => openDocusignPdfFile(agreement.envelope_id)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
            <div className='row mt-4 pl-4'>
              <div className='col-md-12 p-0 my-4 reviewer-section-separation'></div>
            </div>
          </>
        )}

        <div className='col-md-12 mt-0 px-4'>
          {applicationStatus == 'pending' && (
            <>
              <div className='row'>
                <div className='col-md-12 my-4'>
                  <div className='row'>
                    <div className='col-md-12 pl-4'>
                      <h5 className='m-0 reviewer-header'>
                        <strong>Approve/Decline Agreement</strong>
                      </h5>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12 pl-4 my-3'>
                      Please make sure you have reviewed both the Mentor and
                      Protégé sections of the agreement before approving or
                      declining the agreement.
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <button
                    className='btn btn-primary px-5'
                    onClick={ShowAcceptModal}
                  >
                    Approve
                  </button>
                  <button
                    className='btn btn-primary px-5 ml-4'
                    onClick={ShowDeclineModal}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className='col-md-12 my-5 px-4'>
          <button
            className='btn px-5 bottom-back-button'
            onClick={changeToApplication}
          >
            <FontAwesomeIcon icon={faChevronLeft} color={'#172b4d'} /> Back
          </button>
        </div>

        <LoadingModal showModal={showLoadingModal} />

        <AcceptModal
          showModal={showAcceptModal}
          dismissModal={DismissAcceptModal}
          acceptApplicationHandler={HandleApproveDecline}
          companyName={
            agreement &&
            `${agreement.mentor_company_name} and ${agreement.protege_company_name}`
          }
          uuid={agreementId}
        />

        <DeclineReasonModal
          showModal={showDeclineModal}
          handleModal={DismissDeclineModal}
          handleApproveDecline={HandleApproveDecline}
          reviewerPhase={'agreement'}
          companyName={
            agreement &&
            `${agreement.mentor_company_name} and ${agreement.protege_company_name}`
          }
          uuid={agreementId}
        />
      </main>
    </div>

  )
}

ReviewMentorProtegeAgreement = reduxForm({
  enableReinitialize: true,
  form: 'protegeAgreement'
})(ReviewMentorProtegeAgreement)

export default ReviewMentorProtegeAgreement
