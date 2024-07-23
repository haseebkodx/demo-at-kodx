import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'

function SessionModal({ handleModal, minutes }) {

  useEffect(() => {
    const localStorage = window.localStorage
    localStorage.setItem('session_time', minutes)
  }, [minutes])

  return (
    <Modal show={true} onHide={handleModal}>
      <Modal.Body className='center-align'>

        <p>{`Your session will expire after ${minutes} minutes`}</p>
        <button className="btn btn-primary" onClick={() => handleModal()}>Close</button>
      </Modal.Body>
    </Modal>
  )
}

export default SessionModal