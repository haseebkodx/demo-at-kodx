import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

function HelpfulLinks() {
  return (
    <section className="col-md-12 osbp-block px-0">
      <h2 className="px-4">Helpful Links</h2>
      <ul className="osbp-links px-4 help-link-items">
         <li className="py-1 my-1">
          <a
            tabIndex="-1"
            href="https://business.defense.gov/Programs/Mentor-Protege-Program/How-to-Participate/"
            target="_blank"
            rel="noopener noreferrer">
            <div tabIndex="0" className="focusable-item">How To Participate <FontAwesomeIcon
              size="xs"
              color="grey"
              icon={faExternalLinkAlt} />
            </div>
          </a>
        </li>
        <li className="py-1 my-1">
          <a
            tabIndex="-1"
            href="https://business.defense.gov/Programs/Mentor-Protege-Program/Protege-Eligibility-Requirements/"
            target="_blank"
            rel="noopener noreferrer">
            <div tabIndex="0" className="focusable-item">Eligibility Requirements <FontAwesomeIcon
              size="xs"
              color="grey"
              icon={faExternalLinkAlt} />
            </div>
          </a>
        </li>
        <li className="py-1 my-1">
          <a
            tabIndex="-1"
            href="https://business.defense.gov/Programs/Mentor-Protege-Program/MPP-Resources/"
            target="_blank"
            rel="noopener noreferrer">
            <div tabIndex="0" className="focusable-item">MPP Resources <FontAwesomeIcon
              size="xs"
              color="grey"
              icon={faExternalLinkAlt} />
            </div>
          </a>
        </li>
        <li className="py-1 my-1">
          <a
            tabIndex="-1"
            href="https://business.defense.gov/Programs/Mentor-Prot%C3%A9g%C3%A9-Program/Regulation-Legislation/"
            target="_blank"
            rel="noopener noreferrer">
            <div tabIndex="0" className="focusable-item">Why we have MPP <FontAwesomeIcon
              size="xs"
              color="grey"
              icon={faExternalLinkAlt} />
            </div>
          </a>
        </li>
        <li className="py-1 my-1">
          <a
            tabIndex="-1"
            href="https://business.defense.gov/Programs/Mentor-Protege-Program/Contacts/"
            target="_blank" rel="noopener noreferrer">
            <div tabIndex="0" className="focusable-item">DoD OSBP Contacts <FontAwesomeIcon
              size="xs"
              color="grey"
              icon={faExternalLinkAlt} />
            </div>
          </a>
        </li>
        <li className="py-1 my-1">
          <a
            tabIndex="-1"
            href="https://business.defense.gov/Programs/Mentor-Protege-Program/FAQs/"
            target="_blank"
            rel="noopener noreferrer">
            <div tabIndex="0" className="focusable-item">FAQs <FontAwesomeIcon
              size="xs"
              color="grey"
              icon={faExternalLinkAlt} />
            </div>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default HelpfulLinks