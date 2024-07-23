import React, { useState, useEffect } from 'react'
import './multiFileUpload.scss'
import { Modal } from 'react-bootstrap'

const SelectFilesModal = ({
  addFilesBtn,
  uploadFilesMessage,
  selectFilesTable,
  showModal,
  closeModal,
  invalidFiles,
  validFiles,
  onSubmitForm,
  showSpinner,
}) => {
  const [isDisabled, setIsDisabled] = useState('false')

  useEffect(() => {
    if (invalidFiles && invalidFiles.length > 0) {
      setIsDisabled('true')
    } else if (showSpinner) {
      setIsDisabled('true')
    } else {
      setIsDisabled('false')
    }
  }, [invalidFiles, showSpinner])

  return (
    <div>
      <Modal
        dialogClassName='files-modal'
        show={showModal}
        onHide={closeModal}
        aria-labelledby="files-selected-container"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1 id="files-selected-container" className="modal-heading">
              Selected Files
            </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='select-files-modal'>
          {uploadFilesMessage}
          {selectFilesTable}
          {addFilesBtn}
          <div className='row' style={{ paddingTop: '2rem' }}>
            {isDisabled === 'false' &&
              validFiles &&
              validFiles.length > 0 &&
              (!invalidFiles || invalidFiles.length === 0) ? (
                <div>
                  <p className='sr-only' aria-live='polite'>
                    Please click on the Upload button to upload your files.
                </p>
                </div>
              ) : null}
            <div className='col-md-12 pt-6'>
              <button
                type='button'
                className='btn btn-border-gray focusable-item mr-2'
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type='button'
                className='btn btn-primary upload-files-btn focusable-item'
                aria-disabled={isDisabled}
                onClick={onSubmitForm}
              >
                Upload
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default SelectFilesModal
