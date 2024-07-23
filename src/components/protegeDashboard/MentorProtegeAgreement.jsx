import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import getProtegeAgeementData from './getProtegeAgreementData.action'
import { useHistory } from 'react-router-dom'

function MentorProtegeAgreement() {
  const history = useHistory()
  const localStorage = window.localStorage
  const userInfo = useSelector((state) => state.currentUserInfo)
  const uuid =
    userInfo &&
    userInfo.agreements &&
    userInfo.agreements[0] &&
    userInfo.agreements[0].uuid
  const [protegeAgreementInfo, setProtegeAgreementInfo] = useState(null)

  const GetProtegeAgreementData = async () => {
    const protegeAgreement = await getProtegeAgeementData(uuid)
    const { status, apiData } = protegeAgreement
    if (status === 401) {
      localStorage.removeItem('user_info')
      localStorage.removeItem('login_time')
      localStorage.removeItem('session_time')
      localStorage.removeItem('logged_in')
      history.push('/')
    }
    setProtegeAgreementInfo(apiData)
  }

  useEffect(() => {
    GetProtegeAgreementData()
  }, [])

  return (
    <div className='col-12 col-md-9'>
      <div className='card app-card shadow mb-3'>
        <div className='card-header'>
          <h2 className='mb-4'>Mentor Protégé Agreement</h2>
        </div>
        <div className='card-body'>
          <div className='row border-grey no-gutters'>
            <div
              className='col-6 col-md-8 align-self-center font-weight-bold px-4'
              data-test-id='Mentor Name'
            >
              <span className='company-name'>{`${userInfo &&
                userInfo.agreements &&
                userInfo.agreements[0] &&
                userInfo.agreements[0].mentor_company_name
                } and Protege Firm`}</span>
            </div>

            <div
              className='col-6 col-md-4 align-self-center px-4 font-size-sm text-center mt-1 mb-1'
              data-test-id='Mentor Status'
            >
              <div className='status text-center'>
                <div className='text-nowrap text-muted'>
                  <Link to={{ pathname: '/protegeAgreement' }}>
                    <span className='content d-block'>
                      {protegeAgreementInfo &&
                        protegeAgreementInfo[0] &&
                        protegeAgreementInfo[0].protege_arg_status === 'complete'
                        ? 'View'
                        : protegeAgreementInfo &&
                          protegeAgreementInfo[0] &&
                          protegeAgreementInfo[0].protege_arg_status ===
                          'InComplete'
                          ? 'continue'
                          : 'Start MPP Agreement'}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentorProtegeAgreement
