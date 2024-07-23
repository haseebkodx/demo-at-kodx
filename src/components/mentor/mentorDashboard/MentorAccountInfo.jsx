import React from 'react'
import dateFormat from 'dateformat'

function MentorAccountInfo() {
  const localStorage = window.localStorage
  const userInfo = JSON.parse(localStorage.getItem('user_info'))
  return (
    <section className="card faq-card shadow">
      <div className="card-body" data-test-id="Account information">
        <div className="border-bottom px-1 mb-1">
          <h2 className="font-weight-bold last-signed-in">Last Signed In</h2>
        </div>
        <div className="px-1">
          Date
        </div>
        <div className="px-1">
          <span className="font-size-sm">{dateFormat(userInfo && userInfo.last_sign_in_at, "mm/dd/yyyy h:MM:ss TT")}</span>
        </div>
      </div>
    </section>
  )
}

export default MentorAccountInfo