import React from 'react'
import { useHistory } from 'react-router-dom'
function CompanyProfileDetails() {

  const history = useHistory()

  const changeRoute = (route) => {
    history.push(route)
  }

  return (
    <div className='col-md-7 mt-3 mx-5'>
      <div>
        <h4>Your Company Information</h4>
        <p>Please review the information to make sure this is the company you want to associate your profile with.</p>

        <div>
          <h4 className='page-title reviewer-section-title mb-1 py-1 px-1'>Company Information</h4>
          <tr className="row">
            <td className="col-md-3">Company Information</td>
            <td className="col-md-3">ABC</td>
          </tr>
          <tr className="row">
            <td className="col-md-3">Address</td>
            <td className="col-md-6">1111 old waterloo rd, Elkridge, MD, 11212</td>
          </tr>
          <tr className="row">
            <td className="col-md-3">Phone</td>
            <td className="col-md-3">111-1111-1111</td>
          </tr>
          <tr className="row">
            <td className="col-md-3">Fax</td>
            <td className="col-md-3">111-1111-1111</td>
          </tr>
          <tr className="row">
            <td className="col-md-3">Website</td>
            <td className="col-md-3">www.asdf.com</td>
          </tr>
        </div>

        <div>
          <h4 className='page-title reviewer-section-title px-1 py-1 mb-1 mt-3'>Point Of Contact</h4>
          <tr className="row">
            <td className="col-md-3">Name</td>
            <td className="col-md-3">TOM HARRY</td>
          </tr>
          <tr className="row">
            <td className="col-md-3">Address</td>
            <td className="col-md-6">1111 old waterloo rd, Elkridge, MD, 11212</td>
          </tr>
          <tr className="row">
            <td className="col-md-3">Phone</td>
            <td className="col-md-3">111-1111-1111</td>
          </tr>
          <tr className="row">
            <td className="col-md-3">Fax</td>
            <td className="col-md-3">111-1111-1111</td>
          </tr>
          <tr className="row">
            <td className="col-md-3">Website</td>
            <td className="col-md-3">www.asdf.com</td>
          </tr>
        </div>
        <button className="btn btn-primary btn-md float-right px-5 mt-2" onClick={() => changeRoute('/companyProfileSuccessful')}>Next</button>
      </div>
    </div>
  )
}

export default CompanyProfileDetails