import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const inputFileField = ({ fileId, viewFile, id, file, view, onChange, fileError, name, label }) => {
  return (
    view
      ? <div>
        {fileId && view[name] && <FontAwesomeIcon icon={faFile} />}
        <span className="download-file ml-2" onClick={() => viewFile(fileId, view[name])}>{view[name]}</span></div>
      : <>
        <span>{label}</span>
        <div className="custom-file">
          <input id={id} type="file" className="custom-file-input" onChange={(e) => onChange(e)} />
          <label className="custom-file-label" htmlFor="validatedCustomFile">{file ? file : 'Choose file...'}</label>
        </div>
        <div className="erorr-red">{fileError}</div>
      </>
  )
}

export default inputFileField