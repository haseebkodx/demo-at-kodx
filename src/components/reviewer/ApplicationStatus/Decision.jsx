import React from 'react'

const Decision = ({ applicationStatus }) => {
  const toUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className='row mt-3 px-3'>
      <div className='col-md-12 p-0 my-2'>
        <h3
          className='m-0 heading-text mentor-summary-section-heading'
        >
          Reviewer&apos;s Decision for Agreement
        </h3>
      </div>
      <div className='col-md-12 p-0 my-2'>
        {applicationStatus && toUpperCase(applicationStatus)}
      </div>
    </div>
  )
}

export default Decision
