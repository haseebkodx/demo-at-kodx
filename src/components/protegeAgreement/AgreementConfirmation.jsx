import React from 'react'
import { useHistory } from 'react-router-dom'

function AgreementConfirmation() {
  const history = useHistory()
  return (
    <main id='main' className='row'>
      <div id='agreement-confirmation' className='col-md-8 ml-5 mt-4' >
        <h1 className="section-header">Next Steps</h1>
        <p>
          You have successfully completed the Protégé portion of the agreement.
          Your Mentor will review your submission.  If the mentor requires you to make any updates then you will be notified via email and you can view the status in your dashboard.
        </p>
        <button className='btn btn-primary comp-margin-bottom focusable-item' onClick={() => history.push('/dashboard')}>{'Go to Dashboard >'}</button>
      </div>
    </main >
  )
}

export default AgreementConfirmation