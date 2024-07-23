import React from 'react'
import dateFormat from 'dateformat'
import Switch from '@material-ui/core/Switch'
import {
  REVIEWER_ROLE_ADMIN_TITLE,
  REVIEWER_ROLE_SUPPORT_TITLE,
  USER_ROLE_MENTOR_TITLE,
  USER_ROLE_USER_TITLE,
  USER_ROLE_PROTEGE_TITLE
} from './RolesConstants'

const UsersTable = ({ users, handleStatusModal }) => {
  const userTitle = (user) => {
    if (user.role_id === REVIEWER_ROLE_ADMIN_TITLE) {
      return {
        currentRole: 'Reviewer',
        currentTitle: 'Admin'
      }
    } else if (user.role_id === REVIEWER_ROLE_SUPPORT_TITLE) {
      return {
        currentRole: 'Reviewer',
        currentTitle: 'Support'
      }
    } else if (user.role_id === USER_ROLE_USER_TITLE) {
      return {
        currentRole: 'User',
        currentTitle: 'User'
      }
    } else if (user.role_id === USER_ROLE_MENTOR_TITLE) {
      return {
        currentRole: 'User',
        currentTitle: 'Mentor'
      }
    } else if (user.role_id === USER_ROLE_PROTEGE_TITLE) {
      return {
        currentRole: 'User',
        currentTitle: 'Protege'
      }
    } else {
      return {
        currentRole: '-',
        currentTitle: '-'
      }
    }
  }

  const reviewerRowBackground = { backgroundColor: '#C6F1D6' }

  const findReviewer = (user) => {
    return user.role_id === REVIEWER_ROLE_ADMIN_TITLE && user.active === true
  }

  return (
    <div className='container table-container' style={{ marginBottom: '40px' }}>
      <div className='row'>
        <div className='col-12'>
          <table className='table table-bordered'>
            <caption className='reviewer-assignment-table-caption'>
              Reviewer Assignment Table
            </caption>
            <thead className='reviewer-header'>
              <tr>
                <th scope='col' className='reviewer-table-heading'>
                  Name
                </th>
                <th scope='col' className='reviewer-table-heading'>
                  Email Address
                </th>
                <th scope='col' className='reviewer-table-heading'>
                  Current Role
                </th>
                <th scope='col' className='reviewer-table-heading'>
                  Current Title
                </th>
                <th scope='col' className='reviewer-table-heading'>
                  Last Updated
                </th>
                <th scope='col' className='reviewer-table-heading'>
                  Access Control
                </th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((user, idx) => {
                  const firstAndLastName = `${user.first_name} ${user.last_name}`
                  const currentRoleAndTitle = userTitle(user)
                  const isReviewer = findReviewer(user)
                  return (
                    <tr
                      key={`${idx}-${user.first_name}-${user.active}`}
                      style={isReviewer ? reviewerRowBackground : null}
                    >
                      <td>{firstAndLastName}</td>
                      <td>{user.email}</td>
                      <td>{currentRoleAndTitle.currentRole}</td>
                      <td>{currentRoleAndTitle.currentTitle}</td>
                      <td>
                        {dateFormat(user.updated_at, 'mm/dd/yyyy h:MM TT')}
                      </td>
                      <td
                        className='access-control-column'
                        onClick={() =>
                          handleStatusModal(
                            user.active,
                            user.uuid,
                            firstAndLastName
                          )
                        }
                      >
                        <Switch
                          checked={user.active === true ? true : false}
                          color='primary'
                          size='small'
                        />
                        {user.active ? 'Active' : 'InActive'}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan='6'>There are no Eccalon users.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UsersTable
