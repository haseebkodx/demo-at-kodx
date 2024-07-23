import React, { useEffect, useState } from 'react'
import './userProfile.scss'

function ProfileTimeline({ companyIsActive }) {
  const [ isCompanyBackgroundActive, setIsCompanyBackgroundActive ] = useState(false)

  useEffect(() => {
    setIsCompanyBackgroundActive(companyIsActive)
  }, [companyIsActive])

  return (
    <div className="timeline-wrapper">
      <div className="content-wrap">
        <div>
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x icon-background active"></i>
            <i className="fa fa-user fa-stack-1x time-line-icon"></i>
          </span>
          <div className="mt-1">
            User Profile
          </div>
        </div>
        <div>
          <span className="fa-stack fa-4x">
            <i className={`fa fa-circle fa-stack-2x icon-background ${ isCompanyBackgroundActive ? 'active' : '' }`}></i>
            <i className="fa fa-users fa-stack-1x time-line-icon"></i>
          </span>
          <div className="mt-2">
            Company Association
          </div>
        </div>
      </div>
    </div>
  )


}

export default ProfileTimeline