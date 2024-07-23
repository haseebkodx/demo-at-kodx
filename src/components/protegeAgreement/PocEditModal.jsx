import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import CompanyProfile from '../user/CompanyProfile'


function POCEditModal({ showModal, handleModal, contactInfo, acceptDeclineInvitaton, token, company, decision, userType, agreement }) {

  return (

    <Modal dialogClassName="custom-class-modal" show={showModal} onHide={handleModal} aria-labelledby="poc-edit-container">
      <Modal.Header
        style={{ paddingBottom: '0px' }}
        closeButton={handleModal}
      >
        <h1 id="poc-edit-container" className="modal-heading">Edit Point Of Contact</h1>
      </Modal.Header>
      <Modal.Body className="pt-0">
        < div>
          <CompanyProfile handleModal={handleModal} showModal={showModal} contactInfo={contactInfo} userType={userType} agreement={agreement} />
        </div>
      </Modal.Body>
    </Modal>

  )
}

export default POCEditModal