import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { trimFileNamesForSelectFilesTable } from './fileUploadService'

const SelectFilesTable = ({
  validFiles,
  invalidFiles,
  removeValidFile,
  removeInvalidFile,
  ViewFile,
  children
}) => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>{children()}</div>
      <div className='col-md-12 pl-0 pr-0' style={{ paddingBottom: '2rem' }}>
        <ul className='list-group listGroupFiles selectGroupFiles pl-0'>
          {validFiles.length > 0
            ? validFiles.map((file, idx) => {
                const file_name = trimFileNamesForSelectFilesTable(file.name)
                return (
                  <li
                    className='list-group-item single-file d-flex justify-content-between align-items-center border list-group-item-action pl-0'
                    key={idx}
                  >
                    <div className='align-self-start uploaded-file-name'>
                      <button
                        type='button'
                        className='view-single-file focusable-item'
                        onClick={() => ViewFile(file)}
                        style={{ paddingLeft: '0px' }}
                      >
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
                        className='remove_file_role focusable-item'
                        onClick={() => removeValidFile(idx)}
                      >
                        <div className='remove-icon-and-text-button'>
                          <FontAwesomeIcon icon={faTimesCircle} />
                          <span className='remove-span span-text-spacing'>
                            Remove
                          </span>
                        </div>
                      </button>
                    </div>
                  </li>
                )
              })
            : null}
        </ul>
      </div>

      {invalidFiles.length > 0 ? (
        <>
          <div
            className='space-between-two-tables'
            style={{ height: '30px' }}
          ></div>
          <div
            className='border border-light pt-3 mt-3 mb-4 pb-4 col-md-12'
            style={{
              borderRadius: '5px',
              backgroundColor: '#FFDD77'
            }}
          >
            <p
              className='list-header mb-4'
              style={{ paddingLeft: '10px', fontWeight: '600' }}
            >
              Invalid files below. Remove the files before uploading.
            </p>

            <ul className='list-group listGroupFiles pb-6'>
              {' '}
              {invalidFiles.length > 0 &&
                invalidFiles.map((file, idx) => {
                  const file_name = trimFileNamesForSelectFilesTable(file.name)

                  return (
                    <li
                      className='list-group-item single-file d-flex justify-content-between align-items-center border-0 list-group-item-action'
                      key={idx}
                      style={{
                        paddingLeft: '10px',
                        backgroundColor: '#FFDD77'
                      }}
                    >
                      <div className='align-self-start file-name'>
                        {file_name}
                      </div>
                      <div className='remove-file-button'>
                        <button
                          type='button'
                          className='align-self-end remove_file_role focusable-item'
                          onClick={() => removeInvalidFile(idx)}
                        >
                          <div className='remove-icon-and-text-button'>
                            <FontAwesomeIcon icon={faTimesCircle} />
                            <strong className='remove-span span-text-spacing'>
                              Remove
                            </strong>
                          </div>
                        </button>
                      </div>
                    </li>
                  )
                })}
            </ul>
          </div>
        </>
      ) : null}
    </>
  )
}

export default SelectFilesTable
