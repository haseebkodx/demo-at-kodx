import React, { useState, useEffect } from "react"
import getMentorApplicationData from "./getMentorApplicationData.action"
import MentorTitle from "./MentorTitle"
import MentorSubmittedApp from "./MentorSubmittedApp"
import MentorAccountInfo from "./MentorAccountInfo"
import ProtegeInvitationCard from "./ProtegeInvitationCard"
import MentorProtegeAgreement from "./MentorProtegeAgreement"
import ProtegeAgreements from "./ProtegeAgreements"
import HelpfulLinks from "../../../components/HelpfulLinks"
import getMentorAgreementsList from "./getMentorAgeementsList.action"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import ApplyMentorCard from "./ApplyMentorcard"
// import InvitedProtegeCard from './InvitedProtegeCard'
import getPendingAgreementsForUser from "./getPendingAgreementForUser"
import AllProtegeInvitations from "./AllProtegeInvitations"
import getCurrentUser from "../../getCurrentUserInfo.action"
import getMentorProtegeAgreementData from "../../reviewer/reviewAgreement/getMentorProtegeAgreementData.action"
// import MentorApplication from '../mentorApplication/MentorApplication'

function MentorDashboard() {
  const userInfo = useSelector((state) => state.auth)
  const accessToken = userInfo && userInfo.token && userInfo.token.access_token
  const dispatch = useDispatch()
  const [mentorApplicationData, setMentorApplicaitonData] = useState(null)
  const [mentorAgreementList, setMentorAgreementList] = useState(null)
  const [mentorProtegeAgreementInfo, setMentorProtegeAgreementInfo] = useState(
    null
  )
  const [deleteApp, setDeleteApp] = useState(false)
  const localStorage = window.localStorage
  const uuid = useSelector(
    (state) =>
      state.currentUserInfo &&
      state.currentUserInfo.mentor_app &&
      state.currentUserInfo.mentor_app[0] &&
      state.currentUserInfo.mentor_app[0].uuid
  )
  const history = useHistory()
  const appId = useSelector(
    (state) =>
      state.currentUserInfo &&
      state.currentUserInfo.mentor_app &&
      state.currentUserInfo.mentor_app[0] &&
      state.currentUserInfo.mentor_app[0].uuid
  )
  const userEmail = useSelector(
    (state) => state.currentUserInfo && state.currentUserInfo.email
  )
  const currentUserInfo = useSelector((state) => state.currentUserInfo)
  const [pendingAgreementsList, setPendingAgreementsList] = useState(null)
  const acceptDeclineAgreement = useSelector((state) => state.acceptDecline)
  const allAgreements = useSelector(
    (state) => state.currentUserInfo && state.currentUserInfo.agreements
  )
  const currentUserUuid = useSelector(
    (state) => state.currentUserInfo && state.currentUserInfo.uuid
  )
  const findProtegeAgreement =
    allAgreements &&
    allAgreements.find((agreement) => agreement.protege_id === currentUserUuid)
  const protegeAgreementuuid = findProtegeAgreement && findProtegeAgreement.uuid
  const roleTitle = useSelector(
    (state) =>
      state.currentUserInfo &&
      state.currentUserInfo &&
      state.currentUserInfo.role_title
  )

  useEffect(() => {
    if (localStorage.length === 1 && localStorage.getItem("mentorAppRoute") == "false") {
      history.push("/")
      return
    }

    MentorApplicaitonData()
    roleTitle === "Mentor" && MentorAgreementList()
    PendingAgreementsForUser()
    getCurrentUserInfoData()
    setLoggedIn()
    window.scrollTo(0, 0)
  }, [deleteApp])

  useEffect(() => {
    PendingAgreementsForUser()
    roleTitle === "Mentor" && MentorAgreementList()
    MentorApplicaitonData()
    GetProtegeAgreementData()
  }, [appId, deleteApp])

  useEffect(() => {
    GetProtegeAgreementData()
    PendingAgreementsForUser()
  }, [acceptDeclineAgreement, currentUserInfo])

  const getCurrentUserInfoData = async () => {
    await dispatch(getCurrentUser(accessToken))
  }

  const GetProtegeAgreementData = async () => {
    const mentorProtegeAgreement =
      protegeAgreementuuid &&
      (await getMentorProtegeAgreementData(protegeAgreementuuid))
    setMentorProtegeAgreementInfo(mentorProtegeAgreement)
  }

  const setLoggedIn = () => {
    localStorage.setItem("logged_in", true)
  }

  const PendingAgreementsForUser = async () => {
    const pendingAgreements = await getPendingAgreementsForUser(userEmail)
    setPendingAgreementsList(pendingAgreements)
  }

  const MentorApplicaitonData = async () => {
    if (!appId) {
      return
    }
    const mentorApllicationData = await getMentorApplicationData(appId)
    const status = mentorApllicationData && mentorApllicationData.status
    const apiData = mentorApllicationData && mentorApllicationData.apiData
    if (status === 401) {
      localStorage.removeItem("user_info")
      localStorage.removeItem("login_time")
      localStorage.removeItem("session_time")
      localStorage.removeItem("logged_in")
      history.push("/")
    }
    setMentorApplicaitonData(apiData && apiData[0])
  }

  const MentorAgreementList = async () => {
    const mentorAgreements = await getMentorAgreementsList(uuid)
    const status = mentorAgreements && mentorAgreements.status
    if (status === 401) {
      localStorage.removeItem("user_info")
      localStorage.removeItem("login_time")
      localStorage.removeItem("session_time")
      localStorage.removeItem("logged_in")
      history.push("/")
    }

    setMentorAgreementList(mentorAgreements && mentorAgreements.apiData)
  }

  const mentorApplicationInfo = mentorApplicationData
  const pendingAgreementFilter =
    pendingAgreementsList &&
    pendingAgreementsList.filter(
      (agreement) => agreement.invitation_decision === "pending"
    )
  const acceptedInivtationFilter =
    pendingAgreementsList &&
    pendingAgreementsList.filter(
      (agreement) => agreement.invitation_decision === "accepted"
    )

  const protegeAgreementStatus =
    mentorProtegeAgreementInfo &&
    mentorProtegeAgreementInfo.agreement &&
    mentorProtegeAgreementInfo.agreement[0]

  const deleteAppstate = () => {
    setDeleteApp(true)
  }



  return (
    <div className='left-align'>
      {/* <MentorTitle currentUserInfo={currentUserInfo} /> */}
      <div className='px-5'>
        <div className='row mt-3'>
          <main id='main' className='col-md-9 mt-0'>
            <h1 className="sr-only">Dashboard</h1>
            {/* <InvitedProtegeCard /> */}
            {pendingAgreementFilter && pendingAgreementFilter.length > 0 && (
              <AllProtegeInvitations
                invitationsList={pendingAgreementFilter}
                invitationType='Pending Invitations'
              />
            )}
            {mentorApplicationInfo &&
              mentorApplicationInfo.status !== "approved" &&
              pendingAgreementFilter &&
              pendingAgreementFilter.length === 0 && (
                <MentorSubmittedApp
                  mentorApplicationInfo={mentorApplicationInfo}
                  deleteAppstate={deleteAppstate}
                />
              )}
            {mentorAgreementList && mentorAgreementList.length > 0 && (
              <MentorProtegeAgreement
                mentorAgreementList={mentorAgreementList}
              />
            )}
            <ProtegeAgreements
              currentUser={currentUserInfo}
              acceptedInivtationFilter={acceptedInivtationFilter}
            />
            {/* {mentorApplicationInfo &&
              mentorApplicationInfo.status === "approved" && (
                <ProtegeInvitationCard />
              )} */}
            {!appId &&
              pendingAgreementFilter &&
              pendingAgreementFilter.length === 0 &&
              (!protegeAgreementStatus ||
                protegeAgreementStatus.mentor_protege_agr_status ===
                "approved") && <ApplyMentorCard />}
          </main>
          <aside className='col-md-3'>

            {/* <MentorAccountInfo /> */}
            {mentorApplicationInfo &&
              mentorApplicationInfo.status === "approved" && (
                <div className='mt-0'>
                  <MentorSubmittedApp
                    mentorApplicationInfo={mentorApplicationInfo}
                    accessToken={accessToken}
                  />
                </div>
              )}
            <HelpfulLinks />

          </aside>
        </div>
      </div>
    </div>
  )
}

export default MentorDashboard
