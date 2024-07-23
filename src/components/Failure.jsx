import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'

function Failure() {
  const history = useHistory()

  return (
    <div className='center'>
      <FontAwesomeIcon
        icon={faExclamationCircle}
        size='7x'
        className='mt-5'
        color='#A8A8A8'
      />
      <p className='ml-5 mt-3 section-header'>Oops! Something went wrong.</p>

      <div>
        <button className="btn btn-primary mr-5 px-4" onClick={() => history.push('/')}> {`<`} &nbsp; &nbsp;  Back </button>

        <button className="btn btn-primary ml-5" onClick={() => window.open('mailto:mppsupport@eccalon.com?subject=Subject&body=Body%20goes%20here')}>Report Issue</button>
      </div>

    </div >
  )

}

export default Failure