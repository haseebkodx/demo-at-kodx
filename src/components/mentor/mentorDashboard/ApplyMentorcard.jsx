import React from 'react'
import { useHistory } from 'react-router-dom'

function ApplyMentorCard() {
  const history = useHistory()

  const changeRoute = (route) => {
    history.push(route)
  }
  return (
    <section className="osbp-block mb-4 mentor-submitted-app">
      <h2>Apply To Be A Mentor?</h2>

      <button className="btn btn-primary mx-3 my-3 focusable-item" onClick={() => changeRoute('/mentorApplication')}>Start Mentor Application</button>
    </section>
  )
}

export default ApplyMentorCard