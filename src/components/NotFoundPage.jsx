import React from 'react'
import { Link } from 'react-router-dom'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './notFoundPage.scss'

const NotFoundPage = () => {
    return (
      <main id='main'>
        <section className='section-for-page-not-found center'>
          <div className='page-not-found-404'>404</div>
          <h1 className='page-not-found-header'>Page not found</h1>
          <div className='page-not-found'>
            Oops! The page you are looking for does not exist.
            <br></br>
            It might have been moved or deleted.
          </div>
            <Link
              to='/'
              className='home-link'
              id='go-home-link'
              style={{ color: '#fff', textDecoration: 'none', marginTop: '1rem' }}
            >
                <button type='button' className='bt btn-primary back-to-home-button d-flex'>
                    <div className='back-to-home-text' style={{ fontWeight: '500', fontSize: '1rem'}}>Go to Home Page</div>
                        <FontAwesomeIcon icon={faAngleRight} className='fa-angle-right' style={{ width: '0.65rem', height: '1.5rem'}} /> 
                </button>
            </Link>
        </section>
      </main>
    )
}

export default NotFoundPage
