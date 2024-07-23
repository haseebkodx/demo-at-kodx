/* eslint-disable no-useless-escape */
import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

import MentorApplication from "./components/mentor/mentorApplication/MentorApplication";
import MentorApplicationSucesss from "./components/mentor/mentorApplication/MentorApplicationSuccess";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import MentorLandingPage from "./components/MentorLandingPage";
import ProtegeLandingPage from "./components/ProtegeLandingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserProfile from "./components/user/UserProfile";
import Reviewer from "./components/reviewer/Reviewer";
import MentorDashboard from "./components/mentor/mentorDashboard/MentorDashboard";
import RedeemInvitation from "./components/mentor/mentorDashboard/ProtegeInvitation/RedeemInvitation";
import ProtegeInvitation from "./components/mentor/mentorDashboard/ProtegeInvitation/ProtegeInvitation";
import RoleManagement from "./components/user/admin/RoleManagement";
import InactiveUser from "./components/user/admin/InActiveUser";
import ProtegeAgreement from "./components/protegeAgreement/ProtegeAgreement";
import MentorAgreement from "./components/mentor/mentorAgreement/MentorAgreement";
import AgreementReview from "./components/mentor/mentorAgreement/AgreementReview";
import ReviewMentorProtegeAgreement from "./components/reviewer/reviewAgreement/ReviewMentorProtegeAgreement";
import CompanyProfile from "./components/user/CompanyProfile";
import CompanyProfileSuccessful from "./components/user/CompanyProfileSuccessful";
import CompanyProfileDetails from "./components/user/CompanyProfileDetails";
import InvitationHistory from "./components/InvitationHistory";
import CompanyProfileNextSteps from "./components/user/CompanyProfileNextSteps";
import EsignAgreementReview from "./components/reviewer/reviewAgreement/EsignAgreementReview";
import ReviewerAssignmentTable from "./components/eccalonUserTable/ReviewerAssignment";
import AccessabilityStatement from "./components/AccessabilityStatement";
import ExpiredInvitationPage from "./components/mentor/mentorDashboard/ProtegeInvitation/ExpiredInvitationPage";
import UserCompanyProfileTabs from "./components/user/UserCompanyProfileTabs";
import AgreementConfirmation from "./components/protegeAgreement/AgreementConfirmation";
import NotFoundPage from "./components/NotFoundPage";
import InactiveLoggedOut from "./components/InactiveLoggedOut";
import Failure from "./components/Failure";
import ScrollToTop from "./components/scrollToTop";
import UserInformation from "./components/governmentJourney/UserInformation";
import Review from "./components/governmentJourney/Review";
import SignUpRedirectPage from "./components/SignUpRedirectPage";
import EntityAssociation from "./components/entityAssociation/index";
import GovernmentProfile from "./components/governmentJourney/Profile";
import SubContractorProfile from "./components/subcontractorJourney/SubContractorProfile";
import SubContractorInformation from "./components/subcontractorJourney/SubContractorInformation";
import SubContractorReview from "./components/subcontractorJourney/SubContractorReview";

export default function Routes() {
  const location = useLocation();

  const RequireAuth = ({ children }) => {
    if (!useSelector((state) => state.currentUserInfo)) {
      return <Redirect to={"/"} />;
    }
    return children;
  };

  const AuthUser = ({ children, roles }) => {
    const userInfo = useSelector((state) => state.currentUserInfo);
    const localUserInfo = JSON.parse(localStorage.getItem("user_info"));

    if (
      roles.some(
        (role) =>
          role === (localUserInfo && localUserInfo.role_title) ||
          role === (userInfo && userInfo.role_title)
      )
    ) {
      return children;
    }

    return <Redirect to={"/"} />;
  };

  const RequireEccalonUser = ({ children }) => {
    // from redux-form
    const userInfo = useSelector((state) => state.currentUserInfo);
    const userEmail = userInfo && userInfo.email;

    const parsedEmail = userEmail ? userEmail.split("@") : null;
    const isEccalonEmail =
      parsedEmail && parsedEmail[parsedEmail.length - 1] === "eccalon.com";

    // from local storage
    const localStorage = window.localStorage;
    const userInfoFromStorage = JSON.parse(localStorage.getItem("user_info"));

    const localStorageEmail = userInfoFromStorage && userInfoFromStorage.email;

    const parsedEmailFromStorage = localStorageEmail
      ? localStorageEmail.split("@")
      : null;
    const isEccalonEmailFromStorage =
      parsedEmailFromStorage &&
      parsedEmailFromStorage[parsedEmailFromStorage.length - 1] ===
        "eccalon.com";

    return isEccalonEmail || isEccalonEmailFromStorage ? (
      children
    ) : (
      <Redirect to={"/"} />
    );
  };

  const landingPagePaths = [
    "/",
    "/mentorPath",
    "/protegePath",
    "/entityAssociation",
    "/signup",
  ];
  const landingPagePatterns = ["/contractor", "/gov"];

  const isLandingPage =
    landingPagePaths.includes(location.pathname) ||
    landingPagePatterns.some((pattern) => location.pathname.includes(pattern));

  const path = window.location.pathname.replace(/^\/([^/]*).*$/, "$1");
  localStorage.setItem("localPath", path);
  return (
    <div className="main-app-container">
      <div className="container-wrap">
        <Router>
          <ScrollToTop />
          {!isLandingPage && <Header />}
          <Switch>
            <Route exact path="/idleLogout">
              <InactiveLoggedOut />
            </Route>

            <Route path="/failureReport">
              <Failure />
            </Route>

            <Route exact path="/">
              <LandingPage />
            </Route>

            <Route path="/signup">
              <SignUpRedirectPage />
            </Route>

            <Route path="/entityAssociation">
              <EntityAssociation />
            </Route>

            <Route path="/gov-profile">
              <GovernmentProfile />
            </Route>

            <Route path="/gov-userinformation">
              <UserInformation />
            </Route>

            <Route path="/gov-review">
              <Review />
            </Route>

            <Route path="/contractor-profile">
              <SubContractorProfile />
            </Route>

            <Route path="/contractor-information">
              <SubContractorInformation />
            </Route>

            <Route path="/contractor-review">
              <SubContractorReview />
            </Route>

            <Route path="/mentorPath">
              <MentorLandingPage />
            </Route>

            <Route path="/protegePath">
              <ProtegeLandingPage />
            </Route>

            <Route path="/expiredInvitation">
              <ExpiredInvitationPage />
            </Route>

            <Route path="/invitationHistory">
              <RequireAuth>
                <AuthUser roles={["Mentor", "Admin"]}>
                  <InvitationHistory />
                </AuthUser>
              </RequireAuth>
            </Route>
            <Route exact path="/ecc">
              <RequireAuth>
                <AuthUser roles={["Mentor", "Admin", "Protege", "User"]}>
                  <RequireEccalonUser>
                    <ReviewerAssignmentTable />
                  </RequireEccalonUser>
                </AuthUser>
              </RequireAuth>
            </Route>

            <Route path="/agreementConfirmation">
              <RequireAuth>
                <AuthUser roles={["Protege"]}>
                  <AgreementConfirmation />
                </AuthUser>
              </RequireAuth>
            </Route>

            <Route path="/companyProfileDetails">
              <AuthUser roles={["Mentor", "Protege"]}>
                <CompanyProfileDetails />
              </AuthUser>
            </Route>

            <Route path="/companyProfileSuccessful">
              <AuthUser roles={["Mentor", "Protege"]}>
                <CompanyProfileSuccessful />
              </AuthUser>
            </Route>
            <Route path="/companyProfile">
              <RequireAuth>
                <AuthUser roles={["Mentor", "Protege", "User"]}>
                  <CompanyProfile />
                </AuthUser>
              </RequireAuth>
            </Route>
            <Route path="/reviewAgreement">
              <RequireAuth>
                <AuthUser roles={["Admin"]}>
                  <ReviewMentorProtegeAgreement />
                </AuthUser>
              </RequireAuth>
            </Route>
            <Route path="/agreementReview">
              <RequireAuth>
                <AuthUser roles={["Mentor", "User"]}>
                  <AgreementReview />
                </AuthUser>
              </RequireAuth>
            </Route>
            <Route path="/companyProfileSuccessful">
              <RequireAuth>
                <AuthUser roles={["Mentor", "Protege"]}>
                  <CompanyProfileSuccessful />
                </AuthUser>
              </RequireAuth>
            </Route>
            <Route path="/mentorAgreement">
              <RequireAuth>
                <AuthUser roles={["Mentor"]}>
                  <MentorAgreement />
                </AuthUser>
              </RequireAuth>
            </Route>
            <Route path="/protegeAgreement">
              <RequireAuth>
                <AuthUser roles={["Protege"]}>
                  <ProtegeAgreement />
                </AuthUser>
              </RequireAuth>
            </Route>
            <Route path="/inactiveUser">
              <RequireAuth>
                <AuthUser roles={["Mentor", "Admin", "Protege", "User"]}>
                  <InactiveUser />
                </AuthUser>
              </RequireAuth>
            </Route>
            <Route path="/roleManagement">
              <RequireAuth>
                <AuthUser roles={["Admin"]}>
                  <RoleManagement />
                </AuthUser>
              </RequireAuth>
            </Route>
            <Route path="/redeemInvitation">
              <RedeemInvitation />
            </Route>
            <Route path="/protegeInvitation">
              <RequireAuth>
                <AuthUser roles={["Mentor"]}>
                  <ProtegeInvitation />
                </AuthUser>
              </RequireAuth>
            </Route>
            {/* <Route path='/eligibility'>
              <Eligibility />
            </Route> */}
            <Route path="/dashboard">
              <RequireAuth>
                <AuthUser roles={["Mentor", "Protege", "User"]}>
                  <MentorDashboard />
                </AuthUser>
              </RequireAuth>
            </Route>
            {/* <Route path='/protegeDashboard'>
              <RequireAuth>
                <AuthUser roles={['Protege']}>
                  <ProtegeDashboard />
                </AuthUser>
              </RequireAuth>
            </Route> */}
            <Route path="/reviewerDashboard">
              <RequireAuth>
                <AuthUser roles={["Admin"]}>
                  <Reviewer />
                </AuthUser>
              </RequireAuth>
            </Route>
            <Route path="/mentorApplication">
              <RequireAuth>
                <AuthUser roles={["User", "Mentor", "Admin"]}>
                  <MentorApplication />
                </AuthUser>
              </RequireAuth>
            </Route>
            <Route path="/mentorApplicationSuccess">
              <RequireAuth>
                <AuthUser roles={["User"]}>
                  <MentorApplicationSucesss />
                </AuthUser>
              </RequireAuth>
            </Route>
            <Route path="/companyProfileNextSteps">
              <RequireAuth>
                <AuthUser roles={["Mentor", "Protege", "User"]}>
                  <CompanyProfileNextSteps />
                </AuthUser>
              </RequireAuth>
            </Route>
            <Route path="/userProfile">
              <RequireAuth>
                <AuthUser roles={["Admin", "User", "Protege", "Mentor"]}>
                  {/* <UserProfile /> */}
                  <EntityAssociation />
                </AuthUser>
              </RequireAuth>
            </Route>
            <Route path="/userCompanyProfile">
              <RequireAuth>
                <AuthUser roles={["Admin", "Mentor", "Protege", "User"]}>
                  <UserCompanyProfileTabs />
                </AuthUser>
              </RequireAuth>
            </Route>
            <Route path="/esign">
              <RequireAuth>
                <EsignAgreementReview />
              </RequireAuth>
            </Route>

            <Route path="/accessabilityStatement">
              <AccessabilityStatement />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
          {!isLandingPage && <Footer />}
        </Router>
      </div>
    </div>
  );
}
