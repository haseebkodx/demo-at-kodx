/*eslint-disable eqeqeq*/
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import InviteeEmailConfirmationModal from './InviteeEmailConfirmationModal'
import InviteeEmailSentModal from './InviteeEmailSentModal'
import getMentorProtegeAgreementData from '../../reviewer/reviewAgreement/getMentorProtegeAgreementData.action'
import saveEsigneeAuthorizationAction from './esigneeAuthorization.action'
import greenCheckMark from '../../../assets/images/greenCheckMark'

function InviteAuthorizeSignee({ mppType, agreementDataInfo }) {
    const history = useHistory()
    const [showInviteeConfirmationModal, setShowInviteeConfirmationModal] = useState(false)
    const [showInviteeSentModal, setShowInviteeSentModal] = useState(false)
    const [protegeStatusesComplete, setProtegeStatusesComplete] = useState()
    const [mentorApplicationStatus, setMentorApplicationStatus] = useState()
    const [protegeEsignCompletionStatus, setProtegeEsignCompletionStatus] = useState()
    const [mentorEsignCompletionStatus, setMentorEsignCompletionStatus] = useState()
    const currentUserInfo = useSelector(state => state.currentUserInfo)

    useEffect(() => {
        GetMentorProtegeAgreementData()
    }, [])

    const sendEmailToInvitePOC = async () => {
        setShowInviteeConfirmationModal(false)

        const { uuid } = currentUserInfo.agreements[0]

        const namePOC = mppType == 'Protégé' ? agreementDataInfo['signee_primary_contact'] : agreementDataInfo['signee_name']
        const emailPOC = mppType == 'Protégé' ? agreementDataInfo['signee_contact_email'] : agreementDataInfo['signee_email']

        const esigneePayload = {
            name: namePOC,
            email: emailPOC,
            agreementId: uuid,
            role: mppType == 'Protégé' ? 'protege' : 'mentor'
        }

        // const response = await saveEsigneeAuthorizationAction(esigneePayload)

        // const esigneeData = response[0]

        // if ((esigneeData.uuid == uuid) &&
        //     ((mppType == 'Protégé' && esigneeData.protege_esignee_status == 'email_sent') || (mppType == 'Mentor' && esigneeData.mentor_esignee_status == 'email_sent'))) {
        //     setShowInviteeSentModal(true)
        // }
    }

    const sendUserToDashbaord = () => {
        setShowInviteeSentModal(false)

        if (mppType == 'Protégé') {
            changeRoute('/protegeDashboard')
        }
        else if (mppType == 'Mentor') {
            changeRoute('/dashboard')
        }
    }

    const GetMentorProtegeAgreementData = async () => {
        const { agreements } = currentUserInfo
        const { uuid } = agreements[0]
        const { agreement } = await getMentorProtegeAgreementData(uuid)

        if (mppType == 'Protégé') {
            const { mentor_arg_status, protege_esignee_status } = agreement[0]
            setMentorApplicationStatus(mentor_arg_status)
            setProtegeEsignCompletionStatus(protege_esignee_status)
        }
        else if (mppType == 'Mentor') {
            const { protege_esignee_status, mentor_esignee_status } = agreement[0]
            setProtegeStatusesComplete(protege_esignee_status)
            setMentorEsignCompletionStatus(mentor_esignee_status)
        }
    }

    const changeRoute = (route) => {
        history.push(route)
    }

    const getUncheckedBox = () => <div style={{ width: 20, height: 17 }}></div>

    const getPointOfContactFullName = () => {
        return mppType == 'Protégé' ? agreementDataInfo['signee_primary_contact'] : agreementDataInfo['signee_name']
    }

    const getPointOfContactTitle = () => {
        return mppType == 'Protégé' ? agreementDataInfo['signee_contact_title'] : agreementDataInfo['signee_title']
    }

    const getPointOfContactAddress = () => {
        return mppType == 'Protégé' ? agreementDataInfo['signee_contact_address'] : agreementDataInfo['signee_address']
    }

    const getPointOfContactPhone = () => {
        return mppType == 'Protégé' ? agreementDataInfo['signee_contact_phone'] : agreementDataInfo['signee_tel']
    }

    const getPointOfContactEmail = () => {
        return mppType == 'Protégé' ? agreementDataInfo['signee_contact_email'] : agreementDataInfo['signee_email']
    }

    const getPointOfContactFax = () => {
        return mppType == 'Protégé' ? agreementDataInfo['signee_contact_fax'] : agreementDataInfo['signee_fax']
    }

    const getEsignCompletionStatuses = esignStatus => {
        let statusText;
        let textCls;

        switch (esignStatus) {
            case 'signing_complete':
                textCls = 'text-success'
                statusText = 'Agreement has been signed and accepted by your authorized signee.'
                break
            case 'decline':
                textCls = 'text-danger'
                statusText = 'Agreement has been declined by your authorized signee.'
                break
            case 'cancel':
                textCls = 'text-warning'
                statusText = 'Agreement has already been sent and is now pending approval from your authorized signee.'
                break
        }

        return (
            <>
                <div className="row">
                    <div className="col-md-1 p-0 pl-3 pr-2">
                        <span><strong>Status:</strong></span>
                    </div>
                    <div className="col-md-11 p-0">
                        <p className="p-0 m-0">
                            <span className={textCls}>{statusText}</span>
                        </p>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-12">
                        <p className="p-0">
                            <strong>The agreement was sent to the following authorized signee.</strong>
                        </p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {<InviteeEmailSentModal showModal={showInviteeSentModal} emailAddress={mppType == 'Protégé' ? agreementDataInfo['signee_contact_email'] : agreementDataInfo['signee_email']} sendToDashboardHandler={sendUserToDashbaord} />}
            {<InviteeEmailConfirmationModal showModal={showInviteeConfirmationModal} emailAddress={mppType == 'Protégé' ? agreementDataInfo['signee_contact_email'] : agreementDataInfo['signee_email']} setShowModal={setShowInviteeConfirmationModal} sendPOCEmailHandler={sendEmailToInvitePOC} />}
            <div className="col-md-12 mb-5">
                <h4 className='page-title reviewer-section-title'>Send To Authorize Signee</h4>
                <div className="row">
                    <div className="col-md-12">
                        {(mppType == 'Protégé' && protegeEsignCompletionStatus) ? getEsignCompletionStatuses(protegeEsignCompletionStatus) : null}
                        {(mppType == 'Mentor' && mentorEsignCompletionStatus) ? getEsignCompletionStatuses(mentorEsignCompletionStatus) : null}
                        {(mppType == 'Protégé' && !protegeEsignCompletionStatus) &&
                            <>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <h5 className="m-0"><strong>Mentor Application Status</strong></h5>
                                    </div>
                                    {mentorApplicationStatus != 'complete' && <div className="col-md-12 mt-3">
                                        <p className="m-0">The Mentor has not completed their application.</p>
                                    </div>}
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-1 text-center p-0">
                                                <div className="w-50 h-100 p-2 m-0 ml-3 border">
                                                    {mentorApplicationStatus == 'complete' ? <img src={greenCheckMark} /> : getUncheckedBox()}
                                                </div>
                                            </div>
                                            <div className="col-md-11 p-0 pt-2">
                                                <span>{'Mentor has completed mentor application.'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        {(mppType == 'Mentor' && !mentorEsignCompletionStatus) &&
                            <>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <h5 className="m-0"><strong>{'Pending Protégé Updates'}</strong></h5>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        {protegeStatusesComplete != 'signing_complete' &&
                                            <>
                                                <p className="m-0">{'The Protégé has not completed their agreement.'}</p>
                                                <p className="m-0">{'You cannot send your agreement to your authorized signee until the Protégé has finished all of the below.'}</p>
                                            </>}
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-1 text-center p-0">
                                                <div className="w-50 p-2 m-0 ml-3 border">
                                                    {(protegeStatusesComplete == 'email_sent' || protegeStatusesComplete == 'signing_complete') ? <img src={greenCheckMark} /> : getUncheckedBox()}
                                                </div>
                                            </div>
                                            <div className="col-md-11 p-0 pt-2">
                                                <span>{'Protégé sent agreement to their authorized signee.'}</span>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-1 text-center p-0">
                                                <div className="w-50 p-2 m-0 ml-3 border">
                                                    {protegeStatusesComplete == 'signing_complete' ? <img src={greenCheckMark} /> : getUncheckedBox()}
                                                </div>
                                            </div>
                                            <div className="col-md-11 p-0 pt-2">
                                                <span>{'Protégé authorized signee has signed off on the Agreement via DocuSign.'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        {((mppType == 'Protégé' && mentorApplicationStatus == 'complete' && !protegeEsignCompletionStatus) || (mppType == 'Mentor' && protegeStatusesComplete == 'signing_complete' && !mentorEsignCompletionStatus)) &&
                            <>
                                <div className="row mt-5">
                                    <div className="col-md-12">
                                        <h5 className="m-0"><strong>Send Agreement for Review Via DocuSign</strong></h5>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <span>The agreement is now ready to be sent to your point of contact listed below. Your point of contact will either accept or decline the agreement feedback. If you are ready to submit for review, press the button below.</span>
                                    </div>
                                </div>
                            </>
                        }
                        {((mppType == 'Protégé' && (mentorApplicationStatus == 'complete' || protegeEsignCompletionStatus)) || (mppType == 'Mentor' && (protegeStatusesComplete == 'signing_complete' || mentorEsignCompletionStatus))) &&
                            <div className="row mt-4">
                                <div className="col-md-6">

                                    <div className="row">
                                        <div className="col-md-4">
                                            <strong>Name:</strong>
                                        </div>
                                        <div className="col-md-8">
                                            <span>{getPointOfContactFullName()}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <strong>Title:</strong>
                                        </div>
                                        <div className="col-md-8">
                                            <span>{getPointOfContactTitle()}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <strong>Address:</strong>
                                        </div>
                                        <div className="col-md-8">
                                            <span>{getPointOfContactAddress()}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <strong>Telephone/Ext:</strong>
                                        </div>
                                        <div className="col-md-8">
                                            <span>{getPointOfContactPhone()}</span>
                                            &nbsp;
                                            <span>FAX:</span>
                                            &nbsp;
                                            <span>{getPointOfContactFax()}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <strong>Email:</strong>
                                        </div>
                                        <div className="col-md-8">
                                            <span>{getPointOfContactEmail()}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        }
                        {(!protegeEsignCompletionStatus && !mentorEsignCompletionStatus) &&
                            <div className="row mt-4">
                                <div className="col-md-12">
                                    <button
                                        className={((mppType == 'Protégé' && mentorApplicationStatus == 'complete') || (mppType == 'Mentor' && protegeStatusesComplete == 'signing_complete')) ? "btn btn-primary my-5" : "btn btn-secondary my-5"}
                                        disabled={((mppType == 'Protégé' && mentorApplicationStatus != 'complete') || (mppType == 'Mentor' && protegeStatusesComplete != 'signing_complete'))}
                                        onClick={() => setShowInviteeConfirmationModal(true)}>Send Agreement To Signee</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default InviteAuthorizeSignee