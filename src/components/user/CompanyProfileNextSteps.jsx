import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ProfileTimeline from './ProfileTimeline'
import getUserInfo from './getUserInfo.action'
import { setUserProfileInfoAction } from './UserProfile.action'
import './userProfile.scss'

const CompanyProfileNextSteps = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [currentUser, setCurrentUser] = useState(null)
    const userInfo = JSON.parse(localStorage.getItem('user_info'))

    useEffect(() => {
        (async () => {
            const { apiData, status } = await getUserInfo(userInfo.access_token)

            if (status === 401) {
                localStorage.removeItem('user_info')
                localStorage.removeItem('login_time')
                localStorage.removeItem('session_time')
                localStorage.removeItem('logged_in')
                history.push('/')
            }

            setCurrentUser(apiData)
        })()
    }, [])

    const changeRoute = (route) => {
        history.push(route)
    }

    const chooseDashboard = (currentUserInfo) => {
        dispatch(setUserProfileInfoAction(currentUserInfo))

        if (currentUserInfo && currentUserInfo.role_title === 'Admin') {
            currentUserInfo.active
                ? changeRoute('/reviewerDashboard')
                : changeRoute('/inactiveUser')
        }
        else if (currentUserInfo && currentUserInfo.role_title === 'Protege') {
            changeRoute('/protegeDashboard')
        }
        else {
            changeRoute('/dashboard')
        }
    }

    return (
        <main id='main' className="container-fluid m-0 p-0 mb-5 py-5 mt-0">
            <div className="user-content-container">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 mt-3">

                        <div className="row">
                            <div className="col-md-12 p-0">
                                <h1 className="float-left">Next Steps</h1>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md-12 p-0">
                                <p>
                                    You have successfully created your user and company profiles. If you need to make changes to either profile, you can do so from your dashboard.
                                </p>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md-12 p-0">
                                <p>
                                    You will now be directed to the dashboard where you will be able to fill out an application to become a mentor, or list yourself as an available protege.
                                </p>
                            </div>
                        </div>

                        <div className="row mt-2 mb-5">
                            <div className="col-md-12 p-0">
                                <button type="button" className="btn btn-primary px-5" onClick={() => chooseDashboard(currentUser)}>CONTINUE</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </main>
    )
}

export default CompanyProfileNextSteps