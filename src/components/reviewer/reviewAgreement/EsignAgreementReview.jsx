import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import getEsignAgreementReviewAction from './getEsignAgreementReview.action'
import { STATUS_COMPLETE_IMG, STATUS_DECLINE_IMAG, STATUS_CANCEL_IMG, STATUS_EXPIRED_IMG } from './EsignAgreementImageStatus'

const getSignedCompleteStatus = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 text-center">
                    <img src={STATUS_COMPLETE_IMG} alt="status complete" />
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center mt-3">
                    <h4><strong>Agreement Review Complete</strong></h4>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center mt-3">
                    <p>{'You have successfully signed off on your company\'s portion of the MPP agreement. The user filling out the MPP agreement will automatically be notified that the review is complete.'}</p>
                </div>
            </div>
        </>
    )
}

const getDeclinedStatus = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 text-center">
                    <img src={STATUS_DECLINE_IMAG} alt="status decline" />
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center mt-3">
                    <h4><strong>Application Declined Confirmation</strong></h4>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center mt-3">
                    <p>You have declined the application. Your company will need to resubmit the MPP application to you for review.</p>
                </div>
            </div>
        </>
    )
}

const getCanceledStatus = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 text-center">
                    <img src={STATUS_CANCEL_IMG} alt="status cancel" />
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center mt-3">
                    <h4><strong>MPP Review Incomplete</strong></h4>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center mt-3">
                    <p>The MPP review is not complete and is pending your review.</p>
                </div>
            </div>
        </>
    )
}

const getExpiredStatus = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 text-center">
                    <img src={STATUS_EXPIRED_IMG} alt="status expired" />
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center mt-3">
                    <h4><strong>Session Expired</strong></h4>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center mt-3">
                    <p>You have been logged out for your security.</p>
                </div>
            </div>
        </>
    )
}

const displayEsignAgreementReview = signedStatus => {
    switch (signedStatus) {
        case 'signing_complete':
            return getSignedCompleteStatus()
        case 'decline':
            return getDeclinedStatus()
        case 'cancel':
            return getCanceledStatus()
        case 'ttl_expired':
            return getExpiredStatus()
        default:
            return null
    }
}

const EsignAgreementReview = () => {
    const location = useLocation()
    const [esignStatus, setEsignStatus] = useState()

    const locationPathnameItems = location.pathname.split('/')
    const locationParams = location.search.replace('?', '').split('=')
    const agreementId = locationPathnameItems[2]
    const role = locationPathnameItems[3]
    const signedStatus = locationParams[1]

    useEffect(() => {
        (async () => {
            setEsignStatus(signedStatus)
            const { status, data } = await getEsignAgreementReviewAction(agreementId, role, signedStatus)
            console.log('Status => ' + status)
            console.log('Data => ' + data)
        })()
    }, [agreementId, role, signedStatus])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                </div>

                <div className="col-md-6 mt-5 p-2 border">
                    {displayEsignAgreementReview(esignStatus)}
                </div>
            </div>
        </div>
    )
}

export default EsignAgreementReview