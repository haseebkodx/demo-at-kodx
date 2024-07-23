import React, { useState, useEffect } from 'react'
import './reviewerAssignment.scss'
import _ from 'lodash'

const SelectReviewerDropDownMenu = ({
  users,
  handleSwitchReviewerRole,
  currentReviewer
}) => {
  const [reviewerName, setReviewerName] = useState(undefined)
  const [currentReviewerRole, setCurrentReviewerRole] = useState(null)
  const [newUserToBecomeReviewer, setNewUserToBecomeReviewer] = useState(null)
  const [allUsers, setAllUsers] = useState(null)

  useEffect(() => {
    let isActive = true

    if (isActive && users && users.length > 0) {
      filterActiveUsers()
    }

    return () => (isActive = false)
  }, [users])

  useEffect(() => {
    let isActive = true

    if (isActive && currentReviewer) {
      const firstAndLastName = `${currentReviewer.first_name} ${currentReviewer.last_name}`
      setReviewerName(firstAndLastName)
      setCurrentReviewerRole(currentReviewer)
    }

    return () => (isActive = false)
  }, [currentReviewer])

  useEffect(() => {}, [reviewerName])

  const filterActiveUsers = () => {
    const activeUsers = _.filter(users, { active: true })
    setAllUsers(activeUsers)
  }

  const handleChange = async (e) => {
    const index = e.target.options.selectedIndex

    const userToBecomeReviewer = allUsers[index]
    setNewUserToBecomeReviewer(userToBecomeReviewer)

    const firstAndLastName = `${userToBecomeReviewer.first_name} ${userToBecomeReviewer.last_name}`
    setReviewerName(firstAndLastName)
  }

  const handleClick = async () => {
    if (
      JSON.stringify(newUserToBecomeReviewer) !==
      JSON.stringify(currentReviewerRole)
    ) {
      await handleSwitchReviewerRole(newUserToBecomeReviewer)
      return
    } else {
      return
    }
  }

  return (
    <>
      <select
        name='users'
        onChange={(e) => handleChange(e)}
        value={reviewerName}
        className='select-dropdown'
      >
        {allUsers &&
          allUsers.length > 0 &&
          allUsers.map((user, idx) => {
            const userName = `${user.first_name} ${user.last_name}`
            return <option key={`${idx}-${user.uuid}`}>{userName}</option>
          })}
      </select>
      <div style={{ maxWidth: '80%', whiteSpace: 'nowrap' }}>
        <button
          className='btn btn-primary mt-3'
          type='button'
          onClick={handleClick}
        >
          Save Changes
        </button>
      </div>
    </>
  )
}

export default SelectReviewerDropDownMenu
