import React from 'react'
function TroubleSupport() {
  return (
    <div className="card shadow mt-4 mb-5 faq-card">
      <div className="card-header border-0 bg-transparent">
        <h2 className="mb-0">Having Trouble?</h2>
      </div>
      <div className="card-body" data-test-id="Trouble Support Info">
        <div className="row">
          <div className="col-md-12">
            <h3 className="mb-0">Tech Support</h3>
            <p className="mb-0">410-111-2222</p>
            <p>tech@support.com</p>
          </div>
          <div className="col-md-12">
            <h3 className="mb-0">Application Assistance</h3>
            <p className="mb-0">410-111-2222</p>
            <p>tech@support.com</p>
          </div>
          <div className="col-md-12">
            <h3 className="mb-0">General</h3>
            <p className="mb-0">410-111-2222</p>
            <p>tech@support.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TroubleSupport