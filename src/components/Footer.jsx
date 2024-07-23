import React from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../assets/images/logo.svg'

const Footer = () => {
  const localStorage = window.localStorage

  const history = useHistory()

  const changeRoute = (route) => {
    localStorage.setItem('mentorAppRoute', false)
    history.push(route)
  }

  return (
    <>
      <footer id="footer">
        <div id="footer-bottom">
          <div className="row">
            <div className="col-12 col-md-4 mt-1">
              <div className="logo" onClick={() => changeRoute('/')}>
                <img className="float-left" src={logo} alt="Logo" width="40" height="40" />
                <div className="footer-title float-left">MPP Portal</div>
              </div>
            </div>
            <div className="col-md-8 pt-1">
              <a className="float-right mt-2 mr-4" href="https://business.defense.gov/Programs/Mentor-Protégé-Program/Contacts/" rel="noreferrer" target="_blank">Contact Us</a>
              <div id="accessibility-stmt-link" className="float-right mt-2 mr-4" onClick={() => history.push('/accessabilityStatement')}>Privacy Statement</div>
              <a className="float-right mt-2 mr-4" href="https://dodcio.defense.gov/DoD-Web-Policy/" rel="noreferrer" target="_blank">Web Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer