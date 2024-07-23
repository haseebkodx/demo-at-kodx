import React, { useState, useRef, useEffect } from 'react'
import './multiFileUpload.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { validFileTypes } from './fileValidationHelpers'

const AddFilesBtn = ({ addFilesBtnId, selectFilesList, disableInput }) => {
  const [isDisabled, setIsDisabled] = useState(true)

  const inputRef = useRef()

  useEffect(() => {
    let isActive = true

    if (isActive) {
      if (isDisabled === false) {
        inputRef.current.click()
      }
    }
    return () => {
      isActive = false
    }
	}, [isDisabled])

	useEffect(() => {
		let isActive = true;

		if (isActive) {
			if (isDisabled === false) {
				setIsDisabled(true)				
			}
		}
		return () => {
			isActive = false
		}

	}, [disableInput])

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  }

  return (
    <div>
      <label htmlFor={addFilesBtnId || 'select-files-to-upload'}>
        <input
          type='file'
          id={addFilesBtnId || 'select-files-to-upload'}
          name='file_to_upload'
          onChange={(e) => selectFilesList(e)}
          accept={`${validFileTypes}`}
          multiple
          disabled={isDisabled}
          ref={inputRef}
        />
      </label>
      <button
        type='button'
        className='select-files-button focusable-item'
        onClick={toggleDisabled}
        tabIndex='0'
      >
        <FontAwesomeIcon icon={faPlusCircle} />
        <span className='upload-span'>Add file(s)</span>
      </button>
    </div>
  )
}

export default AddFilesBtn
