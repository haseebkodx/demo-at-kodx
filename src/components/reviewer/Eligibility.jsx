import React from 'react'
import { withRouter } from 'react-router-dom'
function Eligibility() {
  return (
    <div className="main-padding">
      <div className="container-fluid noXPadding">
        <div className="row no-gutters">
          <div className="col-12 homepage-image">
            <div className="mentor-assisting-protege-img2" alt="Image of a mentor having a conversation with a protégé." />
            <div className="feature-txt-box">
              <div className="row justify-content-center">
                <div className="col">
                  <h2>MPP ELIGIBILITY REQUIREMENTS</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row no-gutters bg-off-white">
          <div className="offset-2 col-8 offset-md-3 col-md-6">
            <p className="my-4 py-5 text-center">
              Both Mentors and Protégés must meet the following requirements to participate in the program.  Mentors and Protégés are
              solely responsible for finding their counterpart.  Legislatively, DoD Offices of Small Business Programs (OSBP) participation
              in the teaming of partnering Mentors and Protégés is prohibited.  Therefore, we strongly encourage firms to explore existing
              business relationships in an effort to establish a Mentor-Protégé relationship.
                    </p>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="offset-1 col-10 offset-md-0 col-md-6 px-5 pt-5 left-align">
            <h2 className="mt-4 font-weight-bold text-center">Mentor Eligibility</h2>
            <p className="font-weight-bold mb-1">To be eligible to participate as a mentor, an entity must</p>
            <ol>
              <li>Be eligible for the award of Federal contracts;</li>
              <li>
                Demonstrate that it:
							<ol type="a">
                  <li>Is qualified to provide assistance that will contribute to the purpose of the Program;</li>
                  <li>Is of good financial health and character; and</li>
                  <li>Is not on a Federal list of debarred or suspended contractors; and</li>
                </ol>
              </li>
              <li>
                Be capable of imparting value to the protégé firm because of experience gained as a DoD contractor or through knowledge of
                general business operations and Government contracting, as demonstarted by evidence that such entity:
							<ol type="a">
                  <li>Received DoD contracts and subcontracts equal to or greater than $100 million during the previous fiscal year;</li>
                  <li>Is an other-than-small business, unless a waiver to the small business exception has been obtained from the Director, Small Business Programs (SBP), OUSD(A&S);</li>
                  <li>Is a prime contractor to DoD with an active subcontracting plan; or</li>
                  <li>Has gradutated from the 8(a) Business Development Program and provides documentation of its ability to serve as a mentor.</li>

                </ol>
              </li>
            </ol>
          </div>
          <div className="d-none d-md-block col-md-6">
            <div className="mentor-assisting-protege-img" alt="Image of a mentor assisting a protégé with work on the protégé's laptop." />
          </div>
        </div>
        <div className="row no-gutters">
          <div className="d-none d-md-block col-md-6">
            <div className="mentor-assisting-protege-img3" alt="Image of a mentor assisting a protégé with work on the protégé's laptop." />
          </div>
          <div className="offset-1 col-10 offset-md-0 col-md-6 px-5 pt-5 left-align">

            <h2 className="mt-4 font-weight-bold text-center">Protégé Eligibility</h2>
            <p className="font-weight-bold mb-1">To be eligible to participate as a mentor, an entity must</p>
            <ol>
              <li>A small business concern;</li>
              <li>Eligible for the award of Federal contracts;</li>
              <li>Less than half the Small Business Adminstration (SBA) size standard for its primary North American Industry classNameification System (NAICS) code;</li>
              <li>Not owned or managed by individuals or entities that directly or indirectly have stock options or convertible securities in the mentor firm; and</li>
              <li>
                At least one of the following:
							<ol type="a">
                  <li>A qualified HUBZone small business concern.</li>
                  <li>A women-owned small business concern.</li>
                  <li>A service-disabled veteran-owned small business concern.</li>
                  <li>An entity owned and controlled by an Indian tribe.</li>
                  <li>An entity owned and controlled by a Native Hawaiian organization.</li>
                  <li>An entity owned and controlled by socially and economically disadvantaged individuals.</li>
                  <li>A qualified organization employing severely disabled individuals.</li>
                  <li>A nontraditional defense contractor.</li>
                  <li>An entity that currently provides goods or services in the private sector that are critical to enhancing the capabilities of the defense supplier base and fulfilling key DoD needs.</li>
                </ol>
              </li>
            </ol>
          </div>
        </div>
        <div className="row no-gutters bg-off-white">
          <div className="offset-1 col-10 offset-md-4 col-md-4 py-5">
            <h3 className="mt-4 text-center font-weight-bold">Questions?</h3>

            <p className="text-center">
              If you have any questions about the MPP process, protocol, requirements or benefits, please email <a className="font-weight-bold" href="mailto:dodmpp@osd.mil">dodmpp@osd.mil</a>.
                    </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Eligibility)