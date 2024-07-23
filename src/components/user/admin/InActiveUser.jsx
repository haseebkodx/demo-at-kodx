import React from "react"
import logout from "../../logout.action"
import { useHistory } from "react-router-dom"

function InactiveUser() {
  const history = useHistory()

  const applyLogout = async () => {
    const localStorage = window.localStorage
    localStorage.setItem("mentorAppRoute", false)
    history.push("/")
    await logout()
    localStorage.removeItem("latest_application")
    localStorage.removeItem("application_saved")
    localStorage.removeItem("user_info")
    localStorage.removeItem("logged_in")
    localStorage.removeItem("login_time")
    localStorage.removeItem("session_time")
    window.location.reload(true)
  }

  return (
    <main id='main'>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 inactive-user-container ny-5">
          <div className="card text-center inactive-user-card">
            <h2 className="card-title font-weight-bold">Account Deactivated</h2>
            <p className="card-text">
              Our records indicate that your account has been deactivated by
              site admin. For further information regarding the account, please
              contact{" "}
              <span className="inactive-email">fake_email@eccalon.com</span>
            </p>
            <div className="row justify-content-center">
              <button className="btn btn-primary" onClick={() => applyLogout()}>
                EXIT
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </main>
  )
}

export default InactiveUser
