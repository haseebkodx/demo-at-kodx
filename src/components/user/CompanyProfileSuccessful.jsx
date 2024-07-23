import React from 'react'
import { useHistory } from 'react-router-dom'

function CompanyProfileSuccessful() {

  const history = useHistory()
  const localStorage = window.localStorage
  const userInfo = JSON.parse(localStorage.getItem('user_info'))
  const roleTitle = userInfo.role_title

  const changeRoute = (route) => {
    history.push(route)
  }
  return (
    <div className="col-md-7 ml-5 mr-5 mt-5">
      <h4>Next Steps</h4>
      <p>You have successfully created your user and company profiles.
      If you need to make changes to either profile, you can do so from your dashboard.
      </p>

      <p>You will now be redirected to the dashboard where you will be able to fill
      out an application to become a mentor, or list yourself as an available protégé.
      </p>
      <input
        type="button"
        className="btn btn-primary float-right focusable-item"
        value="Continue To Dashboard"
        onClick={roleTitle && roleTitle === 'Mentor' ? () => changeRoute('/dashboard') : () => changeRoute('/protegeDashboard')} />
    </div>
  )
}

export default CompanyProfileSuccessful