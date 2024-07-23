import React, { useState, useEffect } from "react"
import NewInvitation from "./NewInvitation"
import InvitationList from "./InvitationList"
import getInvitationList from "./getInvitationList.action"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import MentorAccountInfo from "../MentorAccountInfo"
import HelpfulLinks from "../../../HelpfulLinks"
import MentorTitle from "../MentorTitle"

function ProtegeInvitation() {
  const history = useHistory()
  const [invitationList, setInvitationList] = useState(null)
  const localStorage = window.localStorage
  const userInfo = useSelector((state) => state.currentUserInfo)
  const currentUserInfo = useSelector((state) => state.currentUserInfo)
  const [hideInvitationLists, setHideInvitationLists] = useState(false)
  const [isNewProtegeInvited, setIsNewProtegeInvited] = useState(false)
  let invitations

  useEffect(() => {
    GetInvitationList()
  }, [userInfo])

  const GetInvitationList = async () => {
    invitations = await getInvitationList(userInfo.uuid)
    const { status, apiData } = invitations
    if (status === 401) {
      localStorage.removeItem("user_info")
      localStorage.removeItem("login_time")
      localStorage.removeItem("session_time")
      history.push("/")
    }
    setInvitationList(apiData)
  }

  return (
    <div className='align-left left-align'>
      <div className='mx-5 px-5 my-3'>
        <div className='row'>
          <main id='main' className='col-md-8 mt-0'>
            <h1 className='sr-only'>Invitation History</h1>
            <NewInvitation
              invitations={invitationList}
              getInvitationList={GetInvitationList}
              hideInvitationListHandler={listDisplayStatus => setHideInvitationLists(listDisplayStatus)}
              setIsNewProtegeInvited={setIsNewProtegeInvited}
            />
            {!hideInvitationLists &&
              <InvitationList
                invitations={invitationList}
                getInvitationList={GetInvitationList}
                isNewProtegeInvited={isNewProtegeInvited}
                setIsNewProtegeInvited={setIsNewProtegeInvited}
              />}
          </main>
          <div className='col-md-1'></div>
          <aside className='col-md-3'>
            {/* <MentorAccountInfo /> */}
            <HelpfulLinks />
          </aside>
        </div>
      </div>
    </div >
  )
}

export default ProtegeInvitation
