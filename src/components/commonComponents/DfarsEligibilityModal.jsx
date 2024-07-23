import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Ic_Warning from "../../assets/images/ic_warning.svg";

function DfarsEligibilityModal({ showModal, closeModal }) {
  return (
    <Modal show={showModal}>
      <Modal.Body className="d-block text-center p-4 mt-3">
        <div className="d-flex justify-center">
          <img
            src={Ic_Warning}
            width={75}
            className="mb-4"
            alt="Icon Wanring"
          />
        </div>
        <p className="mb-4">
          In accordance with DFARS Appendix I-102, your selection does not meet
          all eligibility requirements to be an approved mentor in the DoD
          Program.
        </p>
        <div className="mt-2">
          <Button className="mr-2" onClick={closeModal}>
            Edit Application
          </Button>
          <button
            type="button"
            className="btn button-border focusable-item"
            onClick={closeModal}
          >
            Save & Exit Application
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DfarsEligibilityModal;