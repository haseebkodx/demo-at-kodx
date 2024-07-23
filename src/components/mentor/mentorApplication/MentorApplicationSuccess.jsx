import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'


function MentorApplicationSuccess() {
  const history = useHistory()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main id='main'>
      <div className="wrapper">
        <div className="container justify-content-center">
          <div className="row">
          </div>
          <div className="row mt-5">
            <div className="d-none d-md-block col-md-2 text-center">
            </div>
            <div className="col-12 col-md-8">
              <h1 className="font-weight-bold section-header">
                Your Mentor Application has been submitted!
              </h1>
              <p>
                Your application is currently under review with the DoD Mentor Protégé
                Program Office. In the event there is an error or concern with your Application, the
                program office will reach out to you to ask for additional documentation.
                            </p>
              <p>
                If you have any additional questions about your application please contact
              <a href="mailto:dodmpp@osd.mil" aria-label="Link to DoD admin email">dodmpp@osd.mil</a>
              </p>
              <div><button className="btn btn-primary" onClick={() => history.push('/dashboard')}>Go To Dashboard</button></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MentorApplicationSuccess
