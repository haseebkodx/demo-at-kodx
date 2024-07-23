import React from 'react'
import { Link } from 'react-router-dom'

function ProtegeInvitationCard() {
  return (
    <section className="mt-0 mb-1" data-test-id="Protege Invitation">
      <div className="osbp-block">
        <h2>Invitations</h2>
        <div className="px-3">
          <p className="my-3"> Now that your application has been approved to be a Mentor,
          it is time to invite a Protégé. Once you have selected a Protégé you
             will both be required to fill out a single agreement.</p>
          <div className="mb-2">
            <Link to={{ pathname: '/protegeInvitation' }}><button className="btn btn-primary justify-content-center focusable-item">Protégé Invitations</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProtegeInvitationCard

