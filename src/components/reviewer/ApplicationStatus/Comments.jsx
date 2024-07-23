import React, { useEffect, useState } from 'react'

const Comments = ({ reasonText }) => {
  const [hasReason, setHasReason] = useState(false)

  useEffect(() => {
    if (reasonText !== null) {
      setHasReason(true)
    }
  }, [reasonText])

  return (
    <div className='row mt-3 px-3'>
      <div className='col-md-12 p-0 my-2'>
        <h3
          className='m-0 heading-text mentor-summary-section-heading'
        >
          Comments
        </h3>
      </div>
      <div className='col-md-12 p-0 my-2'>
        {hasReason ? <p>{reasonText}</p> : <p>No comments.</p>}
      </div>
    </div>
  )
}

export default Comments
