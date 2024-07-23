/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import IdleTimer from "react-idle-timer";
import login from "./login.action";
import authAction from "./auth.action";
import logout from "./logout.action";
import loadingAction from "./loading.action";
import getCurrentUser from "../components/getCurrentUserInfo.action";
import sendAcceptDeclineReviewerInvitation from "./user/sendAcceptDeclineReviewerInvitation.action";
import LoginRedirectModal from "./LoginRedirectModal";
import SessionModal from "./SessionModal";
import { REVIEWER_ROLE_ID } from "../config/constants";
import UserReviewerModal from "./user/UserReviewerModal";
import { getQueryString } from "../helpers/urlUtils";
import Hamburger from "../assets/images/quill_hamburger.png";

function Navbar() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const localStorage = window.localStorage;
  const localUserInfo = JSON.parse(localStorage.getItem("user_info"));
  const userInfo = useSelector((state) => state.auth);
  const accessToken =
    localUserInfo && localUserInfo.token && localUserInfo.token.access_token;
  const { Toggle, Menu, Item } = Dropdown;
  const [yAxis, setYAxis] = useState(null);
  // const [showTimeoutModal, setShowTimeoutModal] = useState(false)
  const [showUserReviewerModal, setShowUserReviewerModal] = useState(false);
  const [hasEsignLocationPathname, setEsignLocationPathname] = useState(false);
  // const [selectedLink, setSelectedLink] = useState(null)
  const currentUserInfo = useSelector((state) => state.currentUserInfo);
  const [isLoginRedirectModalVisible, setIsLoginRedirectModalVisible] =
    useState(false);

  const [loginSignup, setLoginSignup] = useState("Login");

  const [showSessionModal, setShowSessionModal] = useState(0);
  const [showDropdownList, setShowDropdownList] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", GetYAxis);
    handleAuth();
    setEsignLocationPathname(location.pathname.split("/").includes("esign"));

    return () => {
      setYAxis(null);
      setShowUserReviewerModal(false);
      setEsignLocationPathname(false);
      setIsLoginRedirectModalVisible(false);
      setLoginSignup("Login");
      setShowSessionModal(0);
      setShowDropdownList(false);
    };
  }, []);

  // set the state for the current pathname
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isMenuActive, setIsMenuActive] = useState(false);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    document.onclick = (event) => {
      if (showDropdownList) {
        setShowDropdownList(false);
        event.stopPropagation();
      }
    };
  }, [showDropdownList]);

  // when the location changes, update the state
  useEffect(() => {
    setCurrentPath(location.pathname.toLowerCase());
  }, [location]);

  // list of pathnames where the nav bar sections should be hidden
  const hideNavBarPathnamesList = ["/inactiveuser", "/redeeminvitation"];

  useEffect(() => {
    localStorage.removeItem("logged_in");
    if (
      localStorage.getItem("mentorAppRoute") == "false" &&
      !localStorage.getItem("logged_in") &&
      !localStorage.getItem("login_time") &&
      isUserLoggedIn === true
    ) {
      history.push("/");
      setIsUserLoggedIn(false);
      return;
    }
    HandleToken();
    if (userInfo.active === false) {
      redirectInActiveUser();
    } else if (
      userInfo.invitee_role_id == REVIEWER_ROLE_ID &&
      userInfo.invitation_decision == "pending"
    ) {
      setShowUserReviewerModal(true);
    } else {
      if (
        localStorage.getItem("logged_in") == "true" ||
        localStorage.getItem("login_time")
      ) {
        setIsUserLoggedIn(true);
      }
      getCurrentUserInfoData();
    }
  }, [userInfo, accessToken]);

  setInterval(() => {
    const d = new Date();
    const currentTime = d.getTime();
    const loginTime = localStorage.getItem("login_time");
    const lastActiveTime = localStorage.getItem("last_active_time") || 0;

    /* Use the lastActiveTime instead if user has been active since loginTime */
    const timeToCompare =
      lastActiveTime > loginTime ? lastActiveTime : loginTime;

    setShowSessionModal(
      currentTime - timeToCompare > 1920000
        ? 32
        : currentTime - timeToCompare > 1800000
        ? 30
        : currentTime - timeToCompare > 900000
        ? 15
        : 0
    );
  }, 60 * 1000);

  const acceptUserReviewerHandler = async () => {
    const { token, invitee_email, invitation_token } = userInfo;
    const { id_token } = token;
    const { status } = await sendAcceptDeclineReviewerInvitation(
      invitee_email,
      "accepted",
      invitation_token,
      id_token
    );
    if (status == 200) {
      setShowUserReviewerModal(false);
      await dispatch(authAction(null, null));
      await getCurrentUserInfoData();
      history.push("/userProfile");
    }
  };

  const declineUserReviewHandler = async () => {
    const { token, invitee_email, invitation_token } = userInfo;
    const { id_token } = token;
    const { status } = await sendAcceptDeclineReviewerInvitation(
      invitee_email,
      "declined",
      invitation_token,
      id_token
    );
    if (status == 200) {
      setShowUserReviewerModal(false);
      getCurrentUserInfoData();
    }
  };

  const handleSessionModal = () => {
    setShowSessionModal(showSessionModal ? false : true);
  };

  const selectDashboard = () => {
    return [
      currentUserInfo && currentUserInfo.role_title,
      userInfo && userInfo.role_title,
    ].includes("Admin")
      ? history.push("/reviewerDashboard")
      : history.push("/dashboard");
  };

  /* TODO check this logic */
  const selectUserProfile = () => {
    return (currentUserInfo || userInfo) &&
      (currentUserInfo.role_title === "Admin" ||
        userInfo.role_title === "Admin") &&
      (currentUserInfo.first_name || userInfo.first_name) &&
      (currentUserInfo.last_name || userInfo.last_name)
      ? history.push("/reviewerDashboard")
      : history.push("/userProfile");
  };

  const getCurrentUserInfoData = async () => {
    accessToken && (await dispatch(getCurrentUser(accessToken)));
    const loggedIn = await localStorage.getItem("logged_in");

    if (!loggedIn) {
      userInfo && userInfo.token && userInfo.company && userInfo.company[0]
        ? selectDashboard()
        : userInfo && userInfo.token
        ? selectUserProfile()
        : console.log("null");
    }
  };

  const redirectInActiveUser = () => {
    history.push("/inactiveUser");
  };

  const changeRoute = (route) => {
    setShowDropdownList(false);
    localStorage.setItem("mentorAppRoute", false);
    history.push(route);
  };

  const GetYAxis = () => {
    setYAxis(window.pageYOffset);
  };

  const handleLogin = async () => {
    const loginData = await login();
    loginData && loginData.url && window.location.replace(loginData.url);
  };

  const handleAuth = async () => {
    const queryString =
      window.location.search || getQueryString(window.location.href);
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code && state) {
      dispatch(loadingAction(true));
      await dispatch(authAction(code, state));
      dispatch(loadingAction(false));
    }
  };

  const HandleToken = () => {
    let d = new Date();
    userInfo &&
      userInfo.token &&
      localStorage.setItem("login_time", d.getTime());
    userInfo && userInfo.token && localStorage.removeItem("session_time");
    userInfo &&
      userInfo.token &&
      localStorage.setItem("user_info", JSON.stringify(userInfo));
    userInfo && userInfo.token && dispatch(loadingAction(false));
  };

  const chooseDashboard = () => {
    // changeSelectedLink('Dashboard')
    return [
      currentUserInfo && currentUserInfo.role_title,
      localUserInfo && localUserInfo.role_title,
    ].includes("Admin")
      ? changeRoute("/reviewerDashboard")
      : changeRoute("/dashboard");
  };

  const onIdle = async () => {
    history.push("/idleLogout");
    const { url } = await logout();
    localStorage.removeItem("latest_application");
    localStorage.removeItem("application_saved");
    localStorage.removeItem("user_info");
    localStorage.removeItem("logged_in");
    localStorage.removeItem("login_time");
    localStorage.removeItem("session_time");
    window.location.reload();
  };

  const applyLogout = async () => {
    setShowDropdownList(false);
    const localStorage = window.localStorage;
    localStorage.setItem("mentorAppRoute", false);
    history.push("/");
    const { url } = await logout();
    localStorage.removeItem("latest_application");
    localStorage.removeItem("application_saved");
    localStorage.removeItem("user_info");
    localStorage.removeItem("logged_in");
    localStorage.removeItem("login_time");
    localStorage.removeItem("session_time");
    window.location.replace(url);
  };
  const localStorageItem = localStorage.getItem("session_time");

  const LoginModalVisible = (val) => {
    setIsLoginRedirectModalVisible(true);
    setLoginSignup(val);
  };

  return ( 
    <div>
      {currentUserInfo && currentUserInfo.uuid && (
        <IdleTimer
          onIdle={onIdle}
          onAction={() => {
            const localStorage = window.localStorage;
            const d = new Date();
            localStorage.setItem("last_active_time", d.getTime());
          }}
          throttle={500}
          timeout={1920000}
        />
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

      <div className="relative z-40 flex pr-6 sm:justify-between sm:ml-2 md:justify-end py-6 lg:ml-80">
        <div
          className="hidden items-start sm:flex flex-col cursor-pointer"
          onClick={() => setIsMenuActive(!isMenuActive)}
          aria-label="Toggle menu"
        >
          <img src={Hamburger} />
        </div>
        
        {isMenuActive && (
          <div
            className="fixed w-full h-full top-0 right-0 bg-black opacity-35 transition-all"
            onClick={() => setIsMenuActive(!isMenuActive)}
            aria-label="Close menu overlay"
          ></div>
        )}

        <div
          className={`sm:fixed static font-lato font-medium text-[20px] sm:text-black sm:font-bold text-white/70 flex sm:flex-col bg-transparent sm:bg-linearYellow
          top-0 sm:h-screen gap-11 sm:text-[16px] sm:w-[320px] sm:py-10 sm:px-10 sm:gap-5 transition-all ${
            isMenuActive ? "right-[110px]" : "right-[440px]"
          }`}
        >
          <button
            className="hidden sm:block absolute right-6 top-6 font-bold text-4xl"
            onClick={() => setIsMenuActive(!isMenuActive)}
            aria-label="Close menu"
          >
            &times;
          </button>
          <a
            href="https://web.cvent.com/event/0c4877d1-697c-48ca-aebd-01df112c2a0f/websitePage:fb32d815-6dc5-41b6-a2ea-246fc3371fc1"
            rel="noreferrer"
            target="_blank"
          >
            <svg
              width="159"
              height="21"
              viewBox="0 0 159 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[163px] h-[30px] sm:w-[100px]"
            >
              <path
                d="M0.416 20L0.752 0.559999H4.424L7.184 14.024L10.064 0.559999H13.616L13.976 20H11.336L11.048 6.488L8.288 20H6.152L3.344 6.44L3.08 20H0.416ZM16.3668 20V0.559999H22.0788C23.2468 0.559999 24.1908 0.775999 24.9108 1.208C25.6468 1.64 26.1828 2.272 26.5188 3.104C26.8708 3.92 27.0468 4.912 27.0468 6.08C27.0468 7.344 26.8308 8.368 26.3988 9.152C25.9668 9.92 25.3588 10.48 24.5748 10.832C23.8068 11.184 22.8948 11.36 21.8388 11.36H19.9188V20H16.3668ZM19.9188 8.864H21.2628C21.9028 8.864 22.3988 8.776 22.7508 8.6C23.1188 8.408 23.3668 8.112 23.4948 7.712C23.6388 7.296 23.7108 6.744 23.7108 6.056C23.7108 5.352 23.6548 4.784 23.5428 4.352C23.4468 3.904 23.2228 3.576 22.8708 3.368C22.5348 3.16 21.9988 3.056 21.2628 3.056H19.9188V8.864ZM28.5431 20V0.559999H34.2551C35.4231 0.559999 36.3671 0.775999 37.0871 1.208C37.8231 1.64 38.3591 2.272 38.6951 3.104C39.0471 3.92 39.2231 4.912 39.2231 6.08C39.2231 7.344 39.0071 8.368 38.5751 9.152C38.1431 9.92 37.5351 10.48 36.7511 10.832C35.9831 11.184 35.0711 11.36 34.0151 11.36H32.0951V20H28.5431ZM32.0951 8.864H33.4391C34.0791 8.864 34.5751 8.776 34.9271 8.6C35.2951 8.408 35.5431 8.112 35.6711 7.712C35.8151 7.296 35.8871 6.744 35.8871 6.056C35.8871 5.352 35.8311 4.784 35.7191 4.352C35.6231 3.904 35.3991 3.576 35.0471 3.368C34.7111 3.16 34.1751 3.056 33.4391 3.056H32.0951V8.864ZM112.406 20V17.648L117.206 10.232C117.558 9.688 117.886 9.168 118.19 8.672C118.51 8.176 118.766 7.664 118.958 7.136C119.166 6.592 119.27 6 119.27 5.36C119.27 4.64 119.142 4.088 118.886 3.704C118.63 3.32 118.23 3.128 117.686 3.128C117.174 3.128 116.774 3.272 116.486 3.56C116.198 3.848 115.998 4.224 115.886 4.688C115.79 5.152 115.742 5.664 115.742 6.224V7.04H112.478V6.176C112.478 5.024 112.646 4.016 112.982 3.152C113.334 2.272 113.886 1.584 114.638 1.088C115.39 0.591999 116.374 0.343998 117.59 0.343998C119.254 0.343998 120.502 0.791999 121.334 1.688C122.166 2.584 122.582 3.832 122.582 5.432C122.582 6.232 122.47 6.96 122.246 7.616C122.022 8.256 121.726 8.872 121.358 9.464C120.99 10.056 120.59 10.664 120.158 11.288L116.174 17.336H122.078V20H112.406ZM129.28 20.288C128.144 20.288 127.2 20.048 126.448 19.568C125.712 19.088 125.152 18.424 124.768 17.576C124.4 16.728 124.216 15.752 124.216 14.648V6.032C124.216 4.896 124.392 3.904 124.744 3.056C125.112 2.192 125.664 1.52 126.4 1.04C127.152 0.559999 128.112 0.319999 129.28 0.319999C130.448 0.319999 131.4 0.559999 132.136 1.04C132.888 1.52 133.44 2.192 133.792 3.056C134.16 3.904 134.344 4.896 134.344 6.032V14.648C134.344 15.752 134.152 16.728 133.768 17.576C133.4 18.424 132.84 19.088 132.088 19.568C131.352 20.048 130.416 20.288 129.28 20.288ZM129.28 17.432C129.776 17.432 130.144 17.28 130.384 16.976C130.624 16.672 130.784 16.304 130.864 15.872C130.944 15.44 130.984 15.016 130.984 14.6V6.08C130.984 5.632 130.944 5.192 130.864 4.76C130.8 4.312 130.648 3.936 130.408 3.632C130.168 3.328 129.792 3.176 129.28 3.176C128.768 3.176 128.392 3.328 128.152 3.632C127.912 3.936 127.752 4.312 127.672 4.76C127.608 5.192 127.576 5.632 127.576 6.08V14.6C127.576 15.016 127.616 15.44 127.696 15.872C127.792 16.304 127.96 16.672 128.2 16.976C128.44 17.28 128.8 17.432 129.28 17.432ZM136.196 20V17.648L140.996 10.232C141.348 9.688 141.676 9.168 141.98 8.672C142.3 8.176 142.556 7.664 142.748 7.136C142.956 6.592 143.06 6 143.06 5.36C143.06 4.64 142.932 4.088 142.676 3.704C142.42 3.32 142.02 3.128 141.476 3.128C140.964 3.128 140.564 3.272 140.276 3.56C139.988 3.848 139.788 4.224 139.676 4.688C139.58 5.152 139.532 5.664 139.532 6.224V7.04H136.268V6.176C136.268 5.024 136.436 4.016 136.772 3.152C137.124 2.272 137.676 1.584 138.428 1.088C139.18 0.591999 140.164 0.343998 141.38 0.343998C143.044 0.343998 144.292 0.791999 145.124 1.688C145.956 2.584 146.372 3.832 146.372 5.432C146.372 6.232 146.26 6.96 146.036 7.616C145.812 8.256 145.516 8.872 145.148 9.464C144.78 10.056 144.38 10.664 143.948 11.288L139.964 17.336H145.868V20H136.196ZM153.05 20V15.224H147.242V12.392L152.306 0.559999H156.17V12.584H158.162V15.224H156.17V20H153.05ZM150.026 12.584H153.05V4.136L150.026 12.584Z"
                fill="#FF4B52"
              />
              <path
                className="sm:fill-black fill-white"
                d="M45.5216 20.264C44.3536 20.264 43.3776 20.04 42.5936 19.592C41.8096 19.128 41.2176 18.456 40.8176 17.576C40.4176 16.696 40.1936 15.616 40.1456 14.336L43.1936 13.736C43.2256 14.488 43.3136 15.152 43.4576 15.728C43.6176 16.304 43.8496 16.752 44.1536 17.072C44.4736 17.376 44.8896 17.528 45.4016 17.528C45.9776 17.528 46.3856 17.36 46.6256 17.024C46.8656 16.672 46.9856 16.232 46.9856 15.704C46.9856 14.856 46.7936 14.16 46.4096 13.616C46.0256 13.072 45.5136 12.528 44.8736 11.984L42.4256 9.824C41.7376 9.232 41.1856 8.576 40.7696 7.856C40.3696 7.12 40.1696 6.216 40.1696 5.144C40.1696 3.608 40.6176 2.424 41.5136 1.592C42.4096 0.759999 43.6336 0.343998 45.1856 0.343998C46.0976 0.343998 46.8576 0.487998 47.4656 0.775999C48.0736 1.048 48.5536 1.432 48.9056 1.928C49.2736 2.424 49.5456 2.992 49.7216 3.632C49.8976 4.256 50.0096 4.92 50.0576 5.624L47.0336 6.152C47.0016 5.544 46.9296 5 46.8176 4.52C46.7216 4.04 46.5376 3.664 46.2656 3.392C46.0096 3.12 45.6256 2.984 45.1136 2.984C44.5856 2.984 44.1776 3.16 43.8896 3.512C43.6176 3.848 43.4816 4.272 43.4816 4.784C43.4816 5.44 43.6176 5.984 43.8896 6.416C44.1616 6.832 44.5536 7.264 45.0656 7.712L47.4896 9.848C48.2896 10.52 48.9696 11.312 49.5296 12.224C50.1056 13.12 50.3936 14.208 50.3936 15.488C50.3936 16.416 50.1856 17.24 49.7696 17.96C49.3696 18.68 48.8016 19.248 48.0656 19.664C47.3456 20.064 46.4976 20.264 45.5216 20.264ZM57.3329 20.264C55.8929 20.264 54.7729 20 53.9729 19.472C53.1729 18.944 52.6209 18.192 52.3169 17.216C52.0129 16.24 51.8609 15.072 51.8609 13.712V0.559999H55.3169V14.12C55.3169 14.728 55.3569 15.304 55.4369 15.848C55.5169 16.376 55.7009 16.808 55.9889 17.144C56.2929 17.464 56.7409 17.624 57.3329 17.624C57.9569 17.624 58.4049 17.464 58.6769 17.144C58.9649 16.808 59.1489 16.376 59.2289 15.848C59.3249 15.304 59.3729 14.728 59.3729 14.12V0.559999H62.8049V13.712C62.8049 15.072 62.6529 16.24 62.3489 17.216C62.0449 18.192 61.4929 18.944 60.6929 19.472C59.9089 20 58.7889 20.264 57.3329 20.264ZM65.0707 20L65.4067 0.559999H69.0787L71.8387 14.024L74.7187 0.559999H78.2707L78.6307 20H75.9907L75.7027 6.488L72.9427 20H70.8067L67.9987 6.44L67.7347 20H65.0707ZM80.9735 20L81.3095 0.559999H84.9815L87.7415 14.024L90.6215 0.559999H94.1735L94.5335 20H91.8935L91.6055 6.488L88.8455 20H86.7095L83.9015 6.44L83.6375 20H80.9735ZM97.0203 20V0.559999H100.524V20H97.0203ZM104.998 20V3.176H101.902V0.559999H111.598V3.176H108.55V20H104.998Z"
              />
            </svg>
          </a>
          <a
            href="https://business.defense.gov/Programs/Mentor-Protege-Program/MPP-Resources/"
            rel="noreferrer"
            target="_blank"
            className="text-white !no-underline"
          >
            Resources
          </a>
          {(!isUserLoggedIn || !currentUserInfo || !currentUserInfo.email) && (
            <>
              <a
                className="text-white !no-underline"
                onClick={() => LoginModalVisible("Login")}
              >{`${
                (!isUserLoggedIn || !hasEsignLocationPathname) &&
                !hideNavBarPathnamesList.includes(currentPath)
                  ? "Login"
                  : ""
              }`}</a>
              <a
                className="text-white !no-underline"
                onClick={() => history.push("/signup")}
              >{`${
                (!isUserLoggedIn || !hasEsignLocationPathname) &&
                !hideNavBarPathnamesList.includes(currentPath)
                  ? "Register"
                  : ""
              }`}</a>
            </>
          )}

          {isUserLoggedIn && currentUserInfo && currentUserInfo.email && (
            <a
              className="text-white !no-underline"
              onClick={() => applyLogout()}
            >
              {`${
                (isUserLoggedIn || hasEsignLocationPathname) &&
                !hideNavBarPathnamesList.includes(currentPath)
                  ? "Logout"
                  : ""
              }`}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
