import React from 'react';
import Modal from 'react-bootstrap/Modal';

function BrowserSupportModal({ showModal }) {
    return (
        <Modal show={showModal} >
            <Modal.Header className="d-block text-center mt-1">
                <Modal.Title>Browser Compatibility</Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-block text-center mt-3'>
                <p>For the best user experience, please use Google Chrome or Mozilla Firefox to access the Mentor Protege Portal.</p>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    )
}

export default BrowserSupportModal