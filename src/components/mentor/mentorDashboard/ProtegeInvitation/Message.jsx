import React from "react"

function Message({ message, handleCloseAlert }) {
  return (
    <div>
      <div
        className='alert alert-info alert-dismissible fade show'
        role='alert'
      >
        {message}
        <button
          onClick={() => handleCloseAlert()}
          type='button'
          className='close'
          data-dismiss='alert'
          aria-label='Close'
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    </div>
  )
}

export default Message
