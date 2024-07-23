import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'


function ProtegeRequestEditModal({ showModal, handleModal, requestProtegeForChange }) {
  const [reason, useReason] = useState(null)
  const ChangeReason = (e) => {
    useReason(e.target.value)
  }

  return (
    <Modal show={showModal} onHide={handleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1 className="modal-heading">
            Request Agreement Edits from Protege
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          className='mb-3 reason-textarea'
          value={reason}
          onChange={e => ChangeReason(e)}
          rows={5}></textarea>
        <div>
          <button className="btn btn-sm btn-primary px-4" onClick={() => requestProtegeForChange(reason)}>Send Message</button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ProtegeRequestEditModal