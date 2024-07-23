import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './reviewerAssignment.scss'
import SelectReviewerDropDownMenu from './SelectReviewerDropDownMenu'
import UsersTable from './UsersTable'
import {
  getOnlyEccalonUsers,
  updateRoleOfEccalonUser
} from './updateUserStatusService'
import { REVIEWER_ROLE_ADMIN_TITLE } from './RolesConstants'
import _ from 'lodash'
import StatusModal from './StatusModal'
import NoActionModal from './NoActionModal'
import getUserInfo from '../user/getUserInfo.action'

const ReviewerAssignment = () => {
  const [users, setUsers] = useState(null)
  const [currentReviewer, setCurrentReviewer] = useState(null)
  const [name, setName] = useState(null)
  const [uuid, setUuid] = useState(null)
  const [userStatus, setUserStatus] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(false)
  const [showNoActionModal, setShowNoActionModal] = useState(false)
  const [isReviewer, setIsReviewer] = useState(false)
  const [isDeactivatingOwnAccount, setIsDeactivatingOwnAccount] = useState(
    false
  )

  const localStorage = window.localStorage
  const userInfo = JSON.parse(localStorage.getItem('user_info'))
  const accessToken = userInfo && userInfo.token && userInfo.token.access_token

  const history = useHistory()

  useEffect(() => {
    GetEccalonUsers()
    GetCurrentUser()
  }, [])

  useEffect(() => {
    let isActive = true

    if (isActive && users && users.length > 0) {
      const singleReviewer = _.find(users, {
        role_id: REVIEWER_ROLE_ADMIN_TITLE
      })
      if (singleReviewer) {
        setCurrentReviewer(singleReviewer)
      }
    }

    return () => (isActive = false)
  }, [users, currentReviewer])

  useEffect(() => {
    if (users && users.length > 0 && currentUser) {
      const isCurrentUserOnList = _.find(users, {
        email: currentUser.email
      })
      if (isCurrentUserOnList === undefined) {return history.push('/')}
    }
  }, [users, currentUser])

  const GetEccalonUsers = async () => {
    const allEccalonUsers = await getOnlyEccalonUsers()
    setUsers(allEccalonUsers)
  }

  const GetCurrentUser = async () => {
    const currentUser = await getUserInfo(accessToken)
    const { apiData } = currentUser
    setCurrentUser(apiData)
  }

  const handleSwitchReviewerRole = async (user) => {
    const role = 'reviewer'
    const uuid = user.uuid
    try {
      const response = await updateRoleOfEccalonUser(uuid, role)

      if (response && response.message) {
        setCurrentReviewer(user)
      }
    } catch (err) {
      return
    } finally {
      GetEccalonUsers()
    }
  }

  const handleStatusModal = (active, uuid, name) => {
    if (currentUser.uuid === uuid) {
      setIsDeactivatingOwnAccount(true)
      setIsReviewer(false)
      setShowNoActionModal(true)
    } else if (
      currentUser.role_id !== REVIEWER_ROLE_ADMIN_TITLE &&
      currentUser.uuid !== uuid
    ) {
      setIsReviewer(false)
      setIsDeactivatingOwnAccount(false)
      setShowNoActionModal(true)
    } else {
      setName(name)
      setUuid(uuid)
      setUserStatus(active)
      showModal === true ? setShowModal(false) : setShowModal(true)
    }
  }

  const closeModal = () => {
    setName(null)
    setUuid(null)
    setUserStatus(null)
    setShowModal(false)
    setIsReviewer(false)
    setIsDeactivatingOwnAccount(false)
  }

  const handleNoActionModal = () => {
    setShowNoActionModal(!showNoActionModal)
  }

  return (
    <section className='section-container'>
      {showModal ? (
        <StatusModal
          showModal={showModal}
          closeModal={closeModal}
          userStatus={userStatus}
          uuid={uuid}
          name={name}
          GetEccalonUsers={GetEccalonUsers}
        />
      ) : null}
      {showNoActionModal ? (
        <NoActionModal
          showNoActionModal={showNoActionModal}
          handleNoActionModal={handleNoActionModal}
          isReviewer={isReviewer}
          isDeactivatingOwnAccount={isDeactivatingOwnAccount}
        />
      ) : null}
      <div
        className='container reviewer-container'
        style={{ marginTop: '40px' }}
      >
        <div className='row'>
          <div className='col-12'>
            <h1 className='reviewer-page-heading'>Reviewer Assignment</h1>
          </div>
          <div className='col-8'>
            <p className='mb-0'>
              Add and assign a role to the first time/master reviewer by
              selecting a user from the dropdown and then pressing the Save
              Changes button.
            </p>
            <p>
              <strong>
                Important: This is to be used by Eccalon users only. Only 1 user
                can have a reviewer role.
              </strong>
            </p>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col add-border-bottom'></div>
        </div>
      </div>
      <div
        className='container dropdown-container'
        style={{ marginBottom: '40px', marginTop: '40px' }}
      >
        <div className='row row-dropdown-container'>
          <div className='col-2'>
            <strong>Assign a Reviewer:</strong>
          </div>
          <div className='col-3 d-flex flex-column'>
            <SelectReviewerDropDownMenu
              users={users}
              handleSwitchReviewerRole={handleSwitchReviewerRole}
              currentReviewer={currentReviewer}
              setCurrentReviewer={setCurrentReviewer}
            />
          </div>
          <div className='col-6'></div>
        </div>
      </div>
      <div className='container' style={{ marginBottom: '40px' }}>
        <div className='row'>
          <div className='col add-border-bottom'></div>
        </div>
      </div>
      <UsersTable
        users={users}
        currentReviewer={currentReviewer}
        setCurrentReviewer={setCurrentReviewer}
        handleStatusModal={handleStatusModal}
      />
    </section>
  )
}

export default ReviewerAssignment
