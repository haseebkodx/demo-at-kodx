/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react"
import { Dropdown } from "react-bootstrap"
import { useHistory, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import IdleTimer from "react-idle-timer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import login from "./login.action"
import authAction from "./auth.action"
import logout from "./logout.action"
import TimeoutModal from "./TimeoutModal"
import loadingAction from "./loading.action"
import getCurrentUser from "../components/getCurrentUserInfo.action"
import sendAcceptDeclineReviewerInvitation from "./user/sendAcceptDeclineReviewerInvitation.action"
import LoginRedirectModal from "./LoginRedirectModal"
import SessionModal from "./SessionModal"
import { REVIEWER_ROLE_ID } from "../config/constants"
import UserReviewerModal from "./user/UserReviewerModal"
import { keydownHandler } from './commonComponents/utility'
import { getQueryString } from "../helpers/urlUtils"
import logo from '../assets/images/logo.svg'
import osbp_logo from '../assets/images/osbp_logo.svg'

function Header() {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const localStorage = window.localStorage
  const localUserInfo = JSON.parse(localStorage.getItem("user_info"))
  const userInfo = useSelector((state) => state.auth)
  const accessToken =
    localUserInfo && localUserInfo.token && localUserInfo.token.access_token
  const { Toggle, Menu, Item } = Dropdown
  const [yAxis, setYAxis] = useState(null)
  // const [showTimeoutModal, setShowTimeoutModal] = useState(false)
  const [showUserReviewerModal, setShowUserReviewerModal] = useState(false)
  const [hasEsignLocationPathname, setEsignLocationPathname] = useState(false)
  // const [selectedLink, setSelectedLink] = useState(null)
  const currentUserInfo = useSelector((state) => state.currentUserInfo)
  const [
    isLoginRedirectModalVisible,
    setIsLoginRedirectModalVisible
  ] = useState(false)

  const [loginSignup, setLoginSignup] = useState('Login')

  const [showSessionModal, setShowSessionModal] = useState(0)
  const [showDropdownList, setShowDropdownList] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", GetYAxis)
    handleAuth()
    setEsignLocationPathname(location.pathname.split("/").includes("esign"))

    return () => {
      setYAxis(null)
      setShowUserReviewerModal(false)
      setEsignLocationPathname(false)
      setIsLoginRedirectModalVisible(false)
      setLoginSignup("Login")
      setShowSessionModal(0)
      setShowDropdownList(false)
    }
  }, [])

  // set the state for the current pathname
  const [currentPath, setCurrentPath] = useState(location.pathname)

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useEffect(() => {
    document.onclick = event => {
      if (showDropdownList) {
        setShowDropdownList(false)
        event.stopPropagation()
      }
    }
  }, [showDropdownList])

  // when the location changes, update the state
  useEffect(() => {
    setCurrentPath(location.pathname.toLowerCase())
  }, [location])

  // list of pathnames where the nav bar sections should be hidden
  const hideNavBarPathnamesList = ["/inactiveuser", "/redeeminvitation"]

  useEffect(() => {
    localStorage.removeItem("logged_in")
    if (localStorage.getItem("mentorAppRoute") == "false" &&
      !localStorage.getItem("logged_in") &&
      !localStorage.getItem("login_time") &&
      isUserLoggedIn === true) {
      history.push("/")
      setIsUserLoggedIn(false)
      return
    }
    HandleToken()
    if (userInfo.active === false) {
      redirectInActiveUser()
    } else if (
      userInfo.invitee_role_id == REVIEWER_ROLE_ID &&
      userInfo.invitation_decision == "pending"
    ) {
      setShowUserReviewerModal(true)
    } else {
      if (localStorage.getItem("logged_in") == "true" || localStorage.getItem("login_time")) {
        setIsUserLoggedIn(true)
      }
      getCurrentUserInfoData()
    }
  }, [userInfo, accessToken])

  setInterval(() => {
    const d = new Date()
    const currentTime = d.getTime()
    const loginTime = localStorage.getItem("login_time")
    const lastActiveTime = localStorage.getItem("last_active_time") || 0

    /* Use the lastActiveTime instead if user has been active since loginTime */
    const timeToCompare = lastActiveTime > loginTime ? lastActiveTime : loginTime

    setShowSessionModal(
      currentTime - timeToCompare > 1920000
        ? 32
        : currentTime - timeToCompare > 1800000
          ? 30
          : currentTime - timeToCompare > 900000
            ? 15
            : 0
    )
  }, 60 * 1000)

  const acceptUserReviewerHandler = async () => {
    const { token, invitee_email, invitation_token } = userInfo
    const { id_token } = token
    const { status } = await sendAcceptDeclineReviewerInvitation(
      invitee_email,
      "accepted",
      invitation_token,
      id_token
    )
    if (status == 200) {
      setShowUserReviewerModal(false)
      await dispatch(authAction(null, null))
      await getCurrentUserInfoData()
      history.push('/entityAssociation')
    }
  }

  const declineUserReviewHandler = async () => {
    const { token, invitee_email, invitation_token } = userInfo
    const { id_token } = token
    const { status } = await sendAcceptDeclineReviewerInvitation(
      invitee_email,
      "declined",
      invitation_token,
      id_token
    )
    if (status == 200) {
      setShowUserReviewerModal(false)
      getCurrentUserInfoData()
    }
  }

  const handleSessionModal = () => {
    setShowSessionModal(showSessionModal ? false : true)
  }

  const selectDashboard = () => {
    return [
      currentUserInfo && currentUserInfo.role_title,
      userInfo && userInfo.role_title
    ].includes('Admin')
      ? history.push("/reviewerDashboard")
      : history.push("/dashboard")
  }

  /* TODO check this logic */
  const selectUserProfile = () => {
    return (currentUserInfo || userInfo) &&
      (currentUserInfo.role_title === "Admin" ||
        userInfo.role_title === "Admin") &&
      (currentUserInfo.first_name || userInfo.first_name) &&
      (currentUserInfo.last_name || userInfo.last_name)
      ? history.push("/reviewerDashboard")
      : history.push("/entityAssociation")
  }

  const getCurrentUserInfoData = async () => {
    accessToken && (await dispatch(getCurrentUser(accessToken)))
    const loggedIn = await localStorage.getItem("logged_in")

    if (!loggedIn) {
      userInfo && userInfo.token && userInfo.company && userInfo.company[0]
        ? selectDashboard()
        : userInfo && userInfo.token
          ? selectUserProfile()
          : console.log("null")
    }
  }

  const redirectInActiveUser = () => {
    history.push("/inactiveUser")
  }

  const changeRoute = (route) => {
    setShowDropdownList(false)
    localStorage.setItem("mentorAppRoute", false)
    history.push(route)
  }

  const GetYAxis = () => {
    setYAxis(window.pageYOffset)
  }

  const handleLogin = async () => {
    const loginData = await login()
    loginData && loginData.url && window.location.replace(loginData.url)
  }

  const homePageNav = () => {
    history.push('/')
    // changeSelectedLink('Home')
  }

  // const changeSelectedLink = (value) => {
  //   setSelectedLink(value)
  // }

  const doesCurrentUserHaveBothUserProfile = () => {
    const {
      first_name,
      last_name,
      title,
      phone,
      company,
      role_title
    } = currentUserInfo
    return (
      first_name &&
      last_name &&
      title &&
      phone &&
      ((company && company.length > 0) || role_title == "Admin")
    )
  }

  const getSignedinUser = () => {
    const { first_name, last_name, email } = currentUserInfo
    return first_name && last_name
      ? `${first_name.toUpperCase()} ${last_name.toUpperCase()}`
      : email
  }

  const handleAuth = async () => {
    const queryString = window.location.search || getQueryString(window.location.href)
    const urlParams = new URLSearchParams(queryString)
    const code = urlParams.get("code")
    const state = urlParams.get("state")

    if (code && state) {
      dispatch(loadingAction(true))
      await dispatch(authAction(code, state));
      dispatch(loadingAction(false))
    }
  }

  const HandleToken = () => {
    let d = new Date()
    userInfo &&
      userInfo.token &&
      localStorage.setItem("login_time", d.getTime())
    userInfo && userInfo.token && localStorage.removeItem("session_time")
    userInfo &&
      userInfo.token &&
      localStorage.setItem("user_info", JSON.stringify(userInfo))
    userInfo && userInfo.token && dispatch(loadingAction(false))
  }

  const chooseDashboard = () => {
    // changeSelectedLink('Dashboard')
    return [
      currentUserInfo && currentUserInfo.role_title,
      localUserInfo && localUserInfo.role_title
    ].includes('Admin')
      ? changeRoute("/reviewerDashboard")
      : changeRoute("/dashboard");
  }

  const onIdle = async () => {
    history.push('/idleLogout')
    const { url } = await logout()
    localStorage.removeItem("latest_application")
    localStorage.removeItem("application_saved")
    localStorage.removeItem("user_info")
    localStorage.removeItem("logged_in")
    localStorage.removeItem("login_time")
    localStorage.removeItem("session_time")
    window.location.reload();
  }

  const applyLogout = async () => {
    // const hostname = window && window.location && window.location.hostname
    // console.log(hostname, 'host name')
    // const path = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1')
    // const urlPath = (path === 'mppstage' || path === 'mpp') ? `https://${hostname}/${path}/` : `http://${hostname}:3000/`
    setShowDropdownList(false)
    const localStorage = window.localStorage
    localStorage.setItem("mentorAppRoute", false)
    history.push("/")
    const { url } = await logout()
    localStorage.removeItem("latest_application")
    localStorage.removeItem("application_saved")
    localStorage.removeItem("user_info")
    localStorage.removeItem("logged_in")
    localStorage.removeItem("login_time")
    localStorage.removeItem("session_time")
    window.location.replace(url);
  }
  const localStorageItem = localStorage.getItem("session_time")

  const LoginModalVisible = (val) => {
    setIsLoginRedirectModalVisible(true)
    setLoginSignup(val)
  }


  return (
    <div>
      {currentUserInfo && currentUserInfo.uuid && (
        <IdleTimer
          onIdle={onIdle}
          onAction={() => {
            const localStorage = window.localStorage
            const d = new Date()
            localStorage.setItem("last_active_time", d.getTime())
          }}
          throttle={500}
          timeout={1920000} />
      )}
      {showSessionModal === 30 && localStorageItem == 15 ? (
        <SessionModal handleModal={handleSessionModal} minutes={2} />
      ) : showSessionModal === 15 && !localStorageItem ? (
        <SessionModal handleModal={handleSessionModal} minutes={15} />
      ) : null}
      {showSessionModal == 32 && localStorageItem && applyLogout()}
      {/* {showTimeoutModal && <TimeoutModal onIdle={onIdle} />} */}

      {
        <LoginRedirectModal
          loginSignup={loginSignup}
          showModal={isLoginRedirectModalVisible}
          showModalHandler={() => setIsLoginRedirectModalVisible(false)}
          loginHandler={() => handleLogin()}
        />
      }
      {
        <UserReviewerModal
          showModal={showUserReviewerModal}
          acceptUserReviewerHandler={acceptUserReviewerHandler}
          declineUserReviewHandler={declineUserReviewHandler}
        />
      }
      <header id="header" className="header d-none d-sm-inline-block">
        <div className='skip-link-container'>
          <a className='skip-link focusable-item' tabIndex='0' href='#main'>
            Skip to main content
          </a>
        </div>
        <div className='center top-bottom-banner'>
          UNCLASSIFIED/FOUO USE ONLY
        </div>
        <div className="align-left ml-2 mt-2">
          <div
            className="mpp-logo-img float-left" onClick={() => { changeRoute("/") }}
          >
            <img src={logo} alt="Logo" width="60" height="60" className="float-left" />
            <p className="header-title font-size-lg mb-0 mt-3 float-left">
              DoD Mentor-Protégé Portal
            </p>
          </div>
        </div>

        <div className="d-flex justify-content-end mr-4">
          <a className="mpp-logo-img" href="https://business.defense.gov/" rel="noreferrer" target="_blank">
            <img src={osbp_logo} alt="Logo" width="60" height="60" />
          </a>
        </div>
      </header>
      <nav
        className={`${yAxis > 100 ? "fixed-position" : ""
          }  navbar navbar-expand-sm sticky-top main-nav`}
      >
        <div className="container-fluid">
          <div className="sm:collapse navbar-collapse xl:visible" id="navbar1">
            {yAxis > 100 && (
              <div
                className="mpp-logo-img float-left my-2"
                onClick={() => {
                  changeRoute("/")
                }}
              >
                <img src={logo} alt="Logo" width="40" height="40" />
              </div>
            )}
            <span className="mt-2 d-inline-block d-sm-none">
              Mentor-Protégé Portal
            </span>
            {!hasEsignLocationPathname &&
              !hideNavBarPathnamesList.includes(currentPath) &&
              (
                <ul className="navbar-nav">
                  <li
                    className={`nav-item ${location.pathname === '/' && 'active-link'}`}
                    onClick={() => homePageNav()}
                    onKeyDown={e => keydownHandler(e, homePageNav)}
                    tabIndex="0"
                  >
                    <a className="nav-link">
                      Home
                    </a>

                  </li>

                  {doesCurrentUserHaveBothUserProfile() &&
                    <li
                      className={`nav-item ${(location.pathname === '/dashboard'
                        || location.pathname === '/reviewerDashboard') && 'active-link'}`}
                      onClick={() => chooseDashboard()}
                      onKeyDown={e => keydownHandler(e, chooseDashboard)}
                      tabIndex="0"
                    >
                      <a className="nav-link">
                        Dashboard
                      </a>
                    </li>}
                </ul>
              )}
          </div>
          <div>
            <ul className="navbar-nav">
              {(!isUserLoggedIn || !currentUserInfo || !currentUserInfo.email) && (
                <>
                  <li className="nav-item mt-0">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={() => LoginModalVisible('Login')}
                      tabIndex="0"
                    >{`${(!isUserLoggedIn || !hasEsignLocationPathname) &&
                      !hideNavBarPathnamesList.includes(currentPath)
                      ? "Login"
                      : ""
                      }`}</a>
                  </li>
                  <div className='mt-2 white'>|</div>
                  <li className="nav-item mt-0">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={() => LoginModalVisible('Signup')}
                      tabIndex="0"
                    >{`${(!isUserLoggedIn || !hasEsignLocationPathname) &&
                      !hideNavBarPathnamesList.includes(currentPath)
                      ? "Sign Up"
                      : ""
                      }`}</a>
                  </li>
                </>
              )}
              <li>
                {isUserLoggedIn && currentUserInfo && currentUserInfo.email && (
                  <Dropdown>
                    <Toggle className="nav-item" onClick={() => setShowDropdownList(true)}>
                      {!hasEsignLocationPathname && (
                        <div className={`mentor-user mt-2 float-right`}>
                          {`${getSignedinUser()}`}
                          <span className="angle-down">
                            <FontAwesomeIcon icon={faAngleDown} />{" "}
                          </span>
                        </div>
                      )}
                    </Toggle>

                    {!hasEsignLocationPathname && (
                      (showDropdownList &&
                        <ul className="dropdown-list float-right">
                          {doesCurrentUserHaveBothUserProfile() &&
                            currentUserInfo && ['Admin', 'Mentor'].includes(currentUserInfo.role_title) && (
                              <li
                                tabIndex="0"
                                className="focusable-item"
                                onClick={() => changeRoute("/invitationHistory")}
                                onKeyDown={e => keydownHandler(e, changeRoute.bind(null, "/invitationHistory"))}
                              >
                                Invitation History
                              </li>
                            )}
                          {currentUserInfo && currentUserInfo.role_title === "Admin" && (
                            <li
                              tabIndex="0"
                              className="focusable-item"
                              onClick={() => changeRoute("/roleManagement")}
                              onKeyDown={e => keydownHandler(e, changeRoute.bind(null, "/roleManagement"))}
                            >
                              Roles
                            </li>
                          )}
                          {doesCurrentUserHaveBothUserProfile() && (
                            <li
                              tabIndex="0"
                              className="focusable-item"
                              onClick={() => changeRoute("/userProfile")}
                              onKeyDown={e => keydownHandler(e, changeRoute.bind(null, "/userProfile"))}
                            >
                              Profile
                            </li>
                          )}
                          <li
                            tabIndex="0"
                            className="focusable-item"
                            onClick={() => applyLogout()}
                            onKeyDown={event => keydownHandler(event, applyLogout)}
                          >
                            Sign Out
                          </li>
                        </ul>)
                    )}
                  </Dropdown>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
