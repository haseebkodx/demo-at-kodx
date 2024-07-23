import React, { useState, useEffect } from 'react'
import { reduxForm } from 'redux-form'
// import resendInvite action
// import resendInvitation from 'resendInvitation'
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import dateFormat from 'dateformat'
import Switch from '@material-ui/core/Switch'
import AddUserModal from './AddUserModal'
import DeleteUserModal from './DeleteUserModal'
import getUsers from './getUsers.action'
import changeStatus from './changeStatus.action'
import StatusModal from './StatusModal'
import ResendEmailModal from './ResendEmailModal'
import Message from '../../mentor/mentorDashboard/ProtegeInvitation/Message'
import resendEmailInvitation from '../../mentor/mentorDashboard/ProtegeInvitation/resendEmailInvitation.action'
import checkMarkGreen from '../../../assets/images/checkmark-green.png'
import deleteUserROle from '../../../assets/images/delete_user_role.png'
import addUserProfile from '../../../assets/images/add_role_user.png'
import './admin.scss'
import _ from 'lodash'

function RoleManagement() {
  const [showUserModal, setShowUserModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [usersList, setUsersList] = useState(null)
  const [userStatus, setUserStatus] = useState(false)
  const [newUserList, setNewUserList] = useState(false)
  const [userCount, setUserCount] = useState(null)
  const [updateUserList, setUpdateUserList] = useState(false)
  const [uuid, setUuid] = useState(null)
  const [offset, useOffset] = useState(0)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [activeDeleteUser, setActiveDeleteUser] = useState()
  const [newUserAdded, setNewUserAdded] = useState()
  const [name, setName] = useState()
  const [message, setMessage] = useState('')
  const [showResendEmailModal, setResendEmailModal] = useState(false)
  const [activeEmailUser, setActiveEmailUser] = useState(null)
  const limit = 10

  useEffect(() => {
    getUsersList()
  }, [newUserList, offset, userCount, updateUserList])

  // if the message changes rerender the component
  useEffect(() => {
    setTimeout(() => setMessage(''), 3000)
  }, [message])

  // if user clicks on message alert, close alert
  const CloseAlert = () => {
    setMessage('')
  }

  const ResendEmailInvite = async (invitation) => {
    const { apiData, status } = await resendEmailInvitation({
      invitation_token: invitation.token,
      inviter_email: invitation.invitee_email,
      inviter_first_name: invitation.invitee_first_name,
      inviter_last_name: invitation.invitee_last_name,
      invitee_email: invitation.invitee_email,
      invitee_role_id: invitation.invitee_role_id
    })

    status === 200
      ? setMessage('Email invite was successfully sent')
      : setMessage(apiData.message)

    setResendEmailModal(false)
  }

  const showEmailModal = (user) => {
    setActiveEmailUser(user)
    setResendEmailModal(true)
  }

  const hideEmailModal = () => {
    setResendEmailModal(false)
    setActiveEmailUser(null)
  }

  const getUsersList = async () => {
    const { apiData } = await getUsers(offset, limit)
    const users = apiData
    setUsersList(users && users.data)
    setUserCount(users && users.count)
  }

  const HandleModal = () => {
    showUserModal === true ? setShowUserModal(false) : setShowUserModal(true)
    setNewUserAdded(null)
  }

  const HandleStatusModal = (active, uuid, name) => {
    setName(name)
    setUuid(uuid)
    setUserStatus(active)
    showStatusModal === true
      ? setShowStatusModal(false)
      : setShowStatusModal(true)
  }

  const HandlePageClick = (data) => {
    const selected = data.selected
    const newOffset = Math.ceil(selected * limit)
    useOffset(newOffset)
  }

  const changeUserStatus = (active, uuid) => {
    changeStatus(uuid, active ? true : false)
  }

  const UpdateUsers = () => {
    setTimeout(() => {
      setNewUserList(newUserList ? false : true)
    }, 3000)
  }

  const showDeleteUserModal = (user) => {
    setActiveDeleteUser(user)
    setShowDeleteModal(true)
  }

  const hideDeleteUserModal = () => {
    setShowDeleteModal(false)
    setActiveDeleteUser(null)
  }

  return (
    <div className='container-fluid left-align'>
      <div className='row'>
        <div className='col-12'>
          <div className='row mt-4'>
            <div className='col-12'>
              <div className='row'>
                <div className='col-3'>
                  <h4 className='m-0 mb-2'>
                    <strong>Role Management</strong>
                  </h4>
                  {usersList &&
                    usersList.length > 0 &&
                    'Manage reviewer access below.'}
                </div>
                <div className='col-9'>
                  {newUserAdded && (
                    <div className='new_user_added'>
                      <div className='row'>
                        <div className='col-md-2'>
                          <img
                            className='new_user_checkmark_icon'
                            src={checkMarkGreen}
                          />
                        </div>
                        <div className='col-md-10'>
                          <div className='row'>
                            <div className='col-md-10 my-3'>
                              <p className='m-0 text-center'>
                                <strong>{`${newUserAdded.invitee_first_name} ${newUserAdded.invitee_last_name} (${newUserAdded.invitee_email}) has been successfully added as a reviewer.`}</strong>
                              </p>
                            </div>
                            <div className='col-md-2'>
                              <div
                                tabIndex="0"
                                className='close_new_user_added focusable-item'
                                aria-label="Close New User Modal"
                                onClick={() => setNewUserAdded(null)}
                              >
                                X
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {(!usersList || usersList.length === 0) && (
                <div className='row'>
                  <div className='col-12'>
                    There are currently no user listed. You can add a new user
                    with the Add New User button below.
                  </div>
                </div>
              )}
              <div className='row'>
                <div className='col-12 my-2'>
                  <button
                    tabIndex='0'
                    className='btn btn-sm btn-primary px-4 py-2 float-right focusable-item'
                    onClick={() => HandleModal()}
                  >
                    <img
                      id='add-user-id'
                      src={addUserProfile}
                      alt='User Profile'
                      title='add-user-ctrl'
                    // aria-label='add-user-ctrl'
                    />
                    &nbsp;&nbsp;&nbsp;Add New User
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='row my-3'>
            {
              <AddUserModal
                showModal={showUserModal}
                handleModal={HandleModal}
                updateUsers={UpdateUsers}
                setNewUserAdded={setNewUserAdded}
              />
            }
            {
              <StatusModal
                showModal={showStatusModal}
                handleModal={HandleStatusModal}
                userStatus={userStatus}
                uuid={uuid}
                name={name}
                updateUserList={updateUserList}
                setUpdateUserList={setUpdateUserList}
              />
            }
            {
              <DeleteUserModal
                showModal={showDeleteModal}
                hideModalHandler={hideDeleteUserModal}
                roleUser={activeDeleteUser}
                updateUsers={UpdateUsers}
              />
            }
            {
              <ResendEmailModal
                showModal={showResendEmailModal}
                handleClose={hideEmailModal}
                setShowModal={hideEmailModal}
                roleUser={activeEmailUser}
                handleResendEmailInvite={ResendEmailInvite}
              />
            }
            <div className='col-12 message-container'>
              {message ? (
                <Message message={message} handleCloseAlert={CloseAlert} />
              ) : null}
            </div>
            {usersList && usersList.length > 0 && (
              <main id='main' className='col-12 mt-0'>
                <table className='table table-striped mentor-app-table mb-4'>
                  <thead className='roles_table_head'>
                    <tr>
                      <th scope='col'>User</th>
                      <th scope='col'>Email</th>
                      <th scope='col'>Role</th>
                      <th scope='col'>Title</th>
                      <th scope='col'>Last Updated</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Access Control</th>
                      <th scope='col'>Resend Invite</th>
                    </tr>
                  </thead>
                  <tbody className='roles-table-body'>
                    <UserTable
                      usersList={usersList}
                      changeUserStatus={changeUserStatus}
                      handleStatusModal={HandleStatusModal}
                      handleDeleteModal={showDeleteUserModal}
                      handleResendEmailInvite={showEmailModal}
                    />
                  </tbody>
                </table>
              </main>
            )}
          </div>
        </div>
      </div>
      <div className='row my-1'>
        <div className='col-12'>
          {usersList && usersList.length > 0 && (
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              pageCount={usersList && userCount / 10}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              containerClassName={
                'pagination justify-content-center float-right'
              }
              pageClassName={'page-item'}
              pageLinkClassName={'page-link focusable-item'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link focusable-item'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link focusable-item'}
              activeClassName={'active'}
              onPageChange={HandlePageClick}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function UserTable({
  usersList,
  handleStatusModal,
  handleDeleteModal,
  handleResendEmailInvite
}) {
  const getRoleStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return 'fa-success'
      case 'declined':
        return 'fa-danger'
      case 'pending':
        return 'fa-warning'
    }
  }

  return usersList
    ? usersList.map((user, idx) => {
      return (
        <tr key={idx}>
          <td>{`${user.first_name} ${user.last_name}`}</td>
          <td>{user.email}</td>
          <td>{_.startCase(user.role_name)}</td>
          <td>{user.role_title}</td>
          <td>{dateFormat(user.updated_at, 'mm/dd/yyyy h:MM:ss TT')}</td>
          <td>
            <FontAwesomeIcon
              icon={faCircle}
              className={`font-13 ${getRoleStatusIcon(
                user.invitation_status
              )}`}
            />
            {` ${_.startCase(user.invitation_status)}`}
          </td>
          {user.invitation_status === 'accepted' ? (
            <>
              <td
                onClick={() => {
                  handleStatusModal(
                    user.active,
                    user.uuid,
                    `${user.first_name} ${user.last_name}`
                  )
                }}
              >
                <Switch
                  checked={user.active ? true : false}
                  color='primary'
                  size='small'
                  className='fa-success focusable-item'
                />
                {user.active ? 'Active' : 'InActive'}
              </td>
              <td className='text-center align-middle'>-</td>
            </>
          ) : (
            <>
              <td className='access-control-column'>
                <div
                  tabIndex='0'
                  className='delete_user_role focusable-item'
                  onClick={() => handleDeleteModal(user)}
                >
                  <img
                    id={`delete-user-${idx}`}
                    src={deleteUserROle}
                    title='delete-user-ctrl'
                  />
                  &nbsp;&nbsp;<span>{`Delete`}</span>
                </div>
              </td>
              <td className='text-center align-middle'>
                <button
                  className='btn btn-primary btn-sm resend-invite-btn focusable-item'
                  onClick={() => {
                    handleResendEmailInvite(user)
                  }}
                >
                  Resend Invite
                </button>
              </td>
            </>
          )}
        </tr>
      )
    })
    : ''
}

RoleManagement = reduxForm({
  form: 'AddUser'
})(RoleManagement)

export default RoleManagement
