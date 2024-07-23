import React from 'react'

function MentorTitle({ currentUserInfo }) {
  return (
    <div className="mentor-title-bar">
      <div className="pl-5">
        <div className="row">
          <div className="col-12" data-test-id="Mentor Title">
            {currentUserInfo ? <h3 className="title my-1">{`Welcome ${currentUserInfo && currentUserInfo.first_name} ${currentUserInfo && currentUserInfo.last_name},`}</h3> : <h2>Welcome</h2>}
          </div>
        </div>
      </div>
    </div >
  )
}

export default MentorTitle