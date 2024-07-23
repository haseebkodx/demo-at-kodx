import React from 'react'

function InvitedProtegeCard() {
  return (
    <div className="osbp-block mb-4 mentor-submitted-app">
      <h4>Action Item</h4>
      <div className="center-align">
        <div className="invite-mail-img my-4"></div>
        <p className="font-weight-bold mb-0">You have been invited by ABC Company to be a Protégé</p>
        <button className="btn btn-primary mx-3 my-3">Accept</button>
        <button className="btn btn-secondary mx-3 my-3">Decline</button>
      </div>
    </div>
  )
}

export default InvitedProtegeCard
