import React from 'react'
import { Modal } from 'react-bootstrap'
import Loader from 'react-loader-spinner'


function LoadingModal({ showModal, handleModal }) {

  return (
    <Modal show={showModal} onHide={handleModal}>
      <Modal.Body className='center-align p-3'>
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
        />
        <div className='mt-3'>Loading...</div>
      </Modal.Body>
    </Modal>
  )
}

export default LoadingModal