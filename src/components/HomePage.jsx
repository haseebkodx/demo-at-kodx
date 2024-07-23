import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import HelpfulLinks from './HelpfulLinks'
import './homePage.scss'
import LoadingModal from './LoadingModal'
import LoginRedirectModal from './LoginRedirectModal'
import login from './login.action'

const HomePage = () => {

  const localStorage = window.localStorage
  // const location = useLocation()
  // const localUserInfo = JSON.parse(localStorage.getItem('user_info'))
  // const uuid = localUserInfo && localUserInfo.mentor_app && localUserInfo.mentor_app[0] && localUserInfo.mentor_app[0].uuid
  // const [userInfo, setUserInfo] = useState(null)
  const loading = useSelector(state => state.loading)
  // const pageId = location.state && location.state.id
  const mentorAppRoute = JSON.parse(localStorage.getItem('mentorAppRoute'))
  const selectedRoute = mentorAppRoute
  // const latestApplication = localStorage.getItem('latest_application')
  // const currentUserInfo = useSelector(state => state.currentUserInfo)

  // useEffect(() => {
    // MentorApplicationData()
  // }, [currentUserInfo])

  // const MentorApplicationData = async () => {
  //   const mentorApplicationData = (latestApplication || uuid) && await getMentorApplicationData(latestApplication ? latestApplication : uuid)
  //   setUserInfo(mentorApplicationData && mentorApplicationData.apiData ? mentorApplicationData.apiData.apiData && mentorApplicationData.apiData.apiData[0] : null)
  // }

  const [isLoginRedirectModalVisible, setIsLoginRedirectModalVisible] =
    useState(false);

  const handleLogin = async () => {
    const loginData = await login();
    loginData && loginData.url && window.location.replace(loginData.url);
  };

  return (
    <div className="container-fluid noXPadding">
      <LoadingModal showModal={loading === true} />
      <div className="row no-gutters">
        <div className="col-12 homepage-image mentor-homepage-container" role="banner">
          {selectedRoute ?
            <div alt="Mentor Home Image" className="mentor-home-img" /> :
            <div alt="MPP Home Page Image" className="mpp-home-img">
              <div className="row">
                <div className="home-image col-md-4">
                  <h1>Welcome to the Mentor-Protégé Program Portal</h1>
                  <p>
                    The Department of Defense (DoD) Mentor-Protégé Program (MPP)
                    helps eligible small businesses enhance their capabilities
                    and expand their footprint in the defense industrial base.
                    Small businesses are partnered with larger companies to help
                    enhance their capabilities to perform as subcontractors and
                    viable suppliers under DoD contracts, other federal
                    government, and commercial contracts.
                  </p>
                  <button
                    className="btn btn-primary mr-5 px-4"
                    onClick={() => setIsLoginRedirectModalVisible(true)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>}
        </div>
        <div className="col-12">
          <div className="mentor-application-container">
            {!selectedRoute &&
              <div className="row">
                <main id="main" className="col-md-8 ml-5 mr-4 mr-3 my-4">
                  <p>
                    <b>Welcome to the Mentor-Protégé Program Portal</b>
                    <br />
                    The Mentor-Protégé Portal is a new resource to support
                    prospective and current mentors and protégés in the program.
                    Please visit our Helpful Links for a deeper dive into the
                    program and for answers to frequently asked questions.
                    Registering with the portal will allow you to apply to be a
                    mentor.
                  </p>

                  <br />
                  <p>
                    <b>Now Accepting Applications for Mentors!</b>
                    <br />
                    Ensure your company is eligible to be a Mentor participant
                    by checking the eligibility requirements under the&nbsp;
                    <a
                      className="href-link"
                      href="https://www.acquisition.gov/dfars/appendix-i-policy-and-procedures-dod-pilot-mentor-protege-program#DFARS_SUBPART_APPENDIX_I_I_102"
                      rel="noreferrer"
                      target="_blank"
                    >
                      Defense Federal Acquisition Regulation Supplement Appendix
                      I-102
                    </a>
                    . Begin your application to the DoD Mentor-Protégé Program
                    by clicking on the button below. The process takes about 30
                    minutes and you will need to be prepared to provide the
                    following to complete your application:
                    <br />
                    &nbsp;&bull; A statement that your company is currently
                    performing under at least one active approved subcontracting
                    plan negotiated with DOD or another Federal agency pursuant
                    to FAR 19.702, and that your company is currently eligible
                    for award of Federal contracts.
                    <br />
                    &nbsp;&bull; A brief summary about your company, including
                    the company profile, and historical and recent activities
                    and accomplishments under your Small Disadvantaged Business
                    and Mentor-Protégé Programs. Indicate whether your company
                    has been a small disadvantaged business (SDB), women-owned
                    small business, or 8(a). If a graduated 8(a), you will need
                    to provide your graduation date.
                    <br />
                    &nbsp;&bull; Description of your company&apos;s ability to
                    provide developmental assistance and how that assistance
                    will potentially increase subcontracting opportunities in
                    industry categories where SDBs are not dominant in your
                    company&apos;s vendor base.
                    <br />
                    &nbsp;&bull; Total dollars of DoD contracts and subcontracts
                    <b> received</b> by your company during the 2 preceding
                    fiscal years.
                    <br />
                    &nbsp;&bull; Total dollars of other Federal Agency contracts
                    and subcontracts <b>received</b> by your company during the
                    2 preceding fiscal years.
                    <br />
                    &nbsp;&bull; Total dollars of subcontracts <b>awarded</b> by
                    your company under DOD contracts and other Federal Agency
                    contracts during the two preceding fiscal years.
                    <br />
                    &nbsp;&bull; Total dollars and percentage of subcontract
                    awards made to all SDB firms under DOD contracts and other
                    Federal agency contracts during the two preceding fiscal
                    years (If presently required to submit SF 295, be prepared
                    to provide copies of the previous 2 year end reports).
                  </p>

                  <button
                    className="btn btn-primary mr-5 px-4"
                    onClick={() => setIsLoginRedirectModalVisible(true)}
                  >
                    Apply
                  </button>

                  <br />
                  <br />
                  <br />
                  <p>
                    <b>What&apos;s happening with DoD&apos;s MPP?</b>
                    <br />
                    In the past five years, DoD’s MPP has helped more than 190
                    small businesses secure contract awards to fill critical
                    defense industrial base needs. While contract awards are the
                    most sought-after prize for protégé’s, support with other
                    areas are key benefits of the program. For example, the
                    mentor-protégé agreements include support with technical
                    and/or management assistance, financial assistance, trade
                    education, business development, and general administrative
                    assistance. There are also significant benefits for mentors,
                    too. For example, mentors develop long-term relationships
                    with small businesses which helps develop a high-quality
                    subcontracting pool, can pursue new market opportunities as
                    part of a team, receive cost reimbursement and a credit
                    towards small business contracting goals. Successful
                    mentor-protégé agreements provide a winning relationship for
                    the protégé, the mentor and the DoD.
                  </p>
                </main>
                <aside className="col-md-3" role="complementary">
                  <div className="row">
                    <div className="col-md-12 mt-4">
                      <HelpfulLinks />
                    </div>
                  </div>
                </aside>
              </div>}
          </div>
        </div>
      </div>

      <LoginRedirectModal
        loginSignup="Signup"
        showModal={isLoginRedirectModalVisible}
        showModalHandler={() => setIsLoginRedirectModalVisible(false)}
        loginHandler={() => handleLogin()}
      />
    </div>
  )
}

export default HomePage