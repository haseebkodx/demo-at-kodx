import React from 'react'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import './multiFileUpload.scss'
import { trimFileName } from './fileUploadService'
import pdf from '../../assets/images/pdf.png'
import deleteIcon from '../../assets/images/delete_user_role.png'

const UploadedFilesTable = ({
  uploadedFiles = [],
  handleDeleteFile,
  deletedFileMessage,
  ViewFile,
  showSpinner,
  inReviewMode = false,
  deleteBtnId,
  children,
  forReviewerReasonModal = false
}) => {
  return (
    <>
      <div className='col-md-12 mt-2 mb-4 pl-0 pr-0'>
        {deletedFileMessage}
        <div style={{ textAlign: 'center' }}>{showSpinner()}</div>
        {!inReviewMode && !forReviewerReasonModal ? (
          <div className='col-12 files-container pl-0 ml-n3'>
            <ul className='pl-0'>
              {uploadedFiles &&
                uploadedFiles.map((file, idx) => {
                  const file_name = trimFileName(file)
                  return (
                    <li
                      className="list-group-item  pl-0 border border-0 edit-single-file list-group-item-action"
                      key={idx}
                    >
                      <div className="col-md-5">
                        <button
                          type="button"
                          className="view-single-file focusable-item"
                          onClick={() => ViewFile(file)}
                          style={{ paddingLeft: '0px' }}
                        >
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            style={{ color: 'green' }}
                          />
                          <img
                            src={pdf}
                            alt=""
                            style={{
                              maxWidth: '100%',
                              height: '20px',
                              paddingLeft: '10px',
                              marginRight: 5,
                            }}
                          />
                          <span
                            className=""
                            style={{
                              textDecoration: 'underline',
                              color: '#0275d8',
                            }}
                          >
                            {file_name}
                          </span>
                        </button>
                      </div>
                      <div className="align-self-start justify-content-start col-md-4">
                        <button
                          type="button"
                          tabIndex="0"
                          className="delete-file delete-file-btn focusable-item d-flex align-items-center"
                          onClick={() => handleDeleteFile(file, idx)}
                        >
                          <img
                            id={`delete-file-${deleteBtnId}-${idx}`}
                            src={deleteIcon}
                            alt=""
                            title="delete-file-ctrl"
                            aria-label="delete-file-ctrl"
                            style={{ height: 17 }}
                          />
                          &nbsp;&nbsp;<span>Delete</span>
                        </button>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        ) : !inReviewMode && forReviewerReasonModal ? (
          <div className='files-container'>
            <ul className='list-group listGroupFiles'>
              {uploadedFiles &&
                uploadedFiles.map((file, idx) => {
                  const file_name = trimFileName(file)
                  return (
                    <li
                      className='list-group-item d-flex justify-content-between border border-0 edit-single-file list-group-item-action pl-0'
                      key={idx}
                      style={{
                        maxWidth: '100%'
                      }}
                    >
                      <div className='align-self-start uploaded-file-name'>
                        <button
                          type='button'
                          className='view-single-file focusable-item'
                          onClick={() => ViewFile(file)}
                          style={{ paddingLeft: '0px' }}
                        >
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            style={{ color: 'green' }}
                          />
                          <img
                            src={pdf}
                            alt=''
                            style={{
                              maxWidth: '100%',
                              height: '20px',
                              paddingLeft: '10px',
                              marginRight: 5,
                            }}
                          />
                          <span
                            className='span-text-spacing'
                            style={{
                              textDecoration: 'underline',
                              color: '#0275d8'
                            }}
                          >
                            {file_name}
                          </span>
                        </button>
                      </div>
                      <div className='align-self-end'>
                        <button
                          type='button'
                          tabIndex='0'
                          className='delete-file delete-file-btn focusable-item'
                          onClick={() => handleDeleteFile(file, idx)}
                        >
                          <img
                            id={`delete-file-${deleteBtnId}-${idx}`}
                            src={deleteIcon}
                            alt=''
                            title='delete-file-ctrl'
                            aria-label='delete-file-ctrl'
                          />
                          &nbsp;&nbsp;<span>Delete</span>
                        </button>
                      </div>
                    </li>
                  )
                })}
            </ul>
          </div>
        ) : (
          <ul className='list-group listGroupFiles'>
            {uploadedFiles &&
              uploadedFiles.map((file, idx) => {
                const file_name = trimFileName(file)
                return (
                  <li
                    className='list-group-item border border-0 review-single-file'
                    key={idx}
                    style={{ paddingLeft: '0px' }}
                  >
                    <div className='uploaded-file-name'>
                      <button
                        type='button'
                        className='view-single-file focusable-item'
                        onClick={() => ViewFile(file)}
                        style={{ paddingLeft: '0px' }}
                      >
                        <img
                          src={pdf}
                          alt=''
                          style={{ maxWidth: '100%', height: '20px' }}
                        />
                        <span
                          className='span-text-spacing'
                          style={{
                            textDecoration: 'underline',
                            color: '#0275d8'
                          }}
                        >
                          {file_name}
                        </span>
                      </button>
                    </div>
                  </li>
                )
              })}
          </ul>
        )}
      </div>
      {children()}
    </>
  )
}

export default UploadedFilesTable
