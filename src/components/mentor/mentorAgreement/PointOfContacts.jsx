import React, { useEffect, useState } from 'react'
import InputField from '../../commonComponents/forms/InputField'
import { formatPhone, formatZip } from '../../../helpers/formatter/format'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import validateEmail from '../../commonComponents/forms/validations/validateEmail'
import OptionField from '../../commonComponents/forms/OptionField'
import SelectField from '../../commonComponents/forms/SelectField'
import InputCheckbox from '../../commonComponents/forms/InputCheckbox'
import { useHistory } from 'react-router-dom'
import POCEditModal from '../../protegeAgreement/PocEditModal'
import { keydownHandler } from '../../commonComponents/utility'

function PointOfContacts({
  mentorAgreement,
  reviewer = true,
  mentorAgreementData,
  initialize,
  stateOptions,
  mentorProtegeAgreementStatus,
  displayPOCEditModal,
  showPOCEditModal,
  submitted,
  completeMentorAgreement
  // showErrorAdditionalPoC,
  // showErrorSigneePoc,
}) {
  const [signeePocOptions, setSigneePocOptions] = useState([])
  const companyInfo = useSelector(
    (state) =>
      state.currentUserInfo &&
      state.currentUserInfo.company &&
      state.currentUserInfo.company[0]
  )

  const govBusinessContactFirstName =
    companyInfo && companyInfo['gov_business_contact_first_name']
  const govBusinessContactLastName =
    companyInfo && companyInfo['gov_business_contact_last_name']
  const electronicBusinessContactFirstName =
    companyInfo && companyInfo['electronic_business_contact_first_name']
  const electronicBusinessContactLastName =
    companyInfo && companyInfo['electronic_business_contact_last_name']
  const mppContactFirstName =
    companyInfo && companyInfo['mpp_contact_first_name']
  const mppContactLastName = companyInfo && companyInfo['mpp_contact_last_name']

  const history = useHistory()
  const signeeOptoins = [
    {
      name: 'Signee POC',
      label: `Mentor PoC: ${_.startCase(
        _.toLower(mppContactFirstName)
      )} ${_.startCase(_.toLower(mppContactLastName))}`,
      value: 'mentor_poc',
      id: 'Yes - Mentor POC',
    },
    {
      name: 'Signee POC',
      label: `Govt Business PoC: ${_.startCase(
        _.toLower(govBusinessContactFirstName)
      )} ${_.startCase(_.toLower(govBusinessContactLastName))}`,
      value: 'government_poc',
      id: 'No - Govt Business POC',
    },
    {
      name: 'Signee POC',
      label: `Electronic Business: ${_.startCase(
        _.toLower(electronicBusinessContactFirstName)
      )} ${_.startCase(_.toLower(electronicBusinessContactLastName))}`,
      value: 'electronic_poc',
      id: 'No - Electronic Business',
    },
    {
      name: 'Signee POC',
      label: `Create New Signee PoC`,
      value: 'new_mentor_signee_poc',
      id: 'Yes - Create New Signee POC',
    },
  ]

  const mentorSigneePOC = useSelector(
    (state) =>
      state.form &&
      state.form.mentorAgreement &&
      state.form.mentorAgreement.values &&
      state.form.mentorAgreement.values.mentor_signee_poc
  )

  const goToPOC = () => {
    const localStorage = window.localStorage
    localStorage.setItem('routeToAgreement', true)
    history.push('/companyProfile')
  }

  const acoSelected =
    (mentorAgreementData &&
      mentorAgreementData['aco_selected'] &&
      mentorAgreementData['aco_selected'].toString() === 'true') ||
    (mentorAgreement &&
      mentorAgreement['aco_selected'] &&
      mentorAgreement['aco_selected'].toString() === 'true')

  const caoSelected =
    (mentorAgreementData &&
      mentorAgreementData['cao_selected'] &&
      mentorAgreementData['cao_selected'].toString() === 'true') ||
    (mentorAgreement &&
      mentorAgreement['cao_selected'] &&
      mentorAgreement['cao_selected'].toString() === 'true')

  const dcmaSelected =
    (mentorAgreementData &&
      mentorAgreementData['dcma_selected'] &&
      mentorAgreementData['dcma_selected'].toString() === 'true') ||
    (mentorAgreement &&
      mentorAgreement['dcma_selected'] &&
      mentorAgreement['dcma_selected'].toString() === 'true')

  const pcoSelected =
    (mentorAgreementData &&
      mentorAgreementData['pco_selected'] &&
      mentorAgreementData['pco_selected'].toString() === 'true') ||
    (mentorAgreement &&
      mentorAgreement['pco_selected'] &&
      mentorAgreement['pco_selected'].toString() === 'true')

  const certificationOptions = [
    {
      name: 'Certified Small Business',
      label: 'Yes',
      value: 'true',
      id: 'Yes',
    },
    {
      name: 'Certified Small Business',
      label: 'No',
      value: 'false',
      id: 'No',
    },
  ]

  const hasCheckedAdditionaPorintOfContacts =
    mentorAgreement &&
    mentorAgreement['has_additional_point_of_contact'] &&
    mentorAgreement['has_additional_point_of_contact'].toString() === 'true'

    useEffect(() => {
      let newState = signeeOptoins.filter((item) => item?.value === mentorAgreement?.poc_selected)
      newState.push(signeeOptoins.find((item) => item?.value === "new_mentor_signee_poc"))
      setSigneePocOptions(newState)
    }, [mentorAgreement])

    useEffect(() => {
      if (mentorAgreement['has_additional_point_of_contact'] !== null && mentorAgreement['has_additional_point_of_contact'].toString() === "false") {
        mentorAgreement['aco_selected'] = false
        mentorAgreement['dcma_selected'] = false
        mentorAgreement['cao_selected'] = false
        mentorAgreement['pco_selected'] = false
      }
    }, [mentorAgreement['has_additional_point_of_contact']])

  return (
    <div className='col-md-12'>
      {reviewer && (
        <h2 className='page-title reviewer-section-title section-header'>Point of Contacts</h2>
      )}
      <POCEditModal
        showModal={showPOCEditModal}
        handleModal={displayPOCEditModal}
        userType={"mentor"}
        agreement={mentorAgreement}
      />
      <div className='row mb-5'>
        <div className='col-md-12'>
          <h3 className='agreement-sub-header mb-0'>
            Mentor Firm Point of Contact(PoC)
          </h3>
        </div>

        <div className='col-md-12'>
          <div className='border-box px-3 pb-3'>
            <div className='mt-4 mb-2'>
              <p>
                Review your PoC information. If you need to make changes, you
                can select the Edit PoC button below.
              </p>
            </div>

            <div className='row'>
              <div className='col-md-2 bold-label'>Name</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-8'>
                {mentorAgreement &&
                  `${mentorAgreement['mpp_contact_first_name']}  ${mentorAgreement['mpp_contact_last_name']}`}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-2 bold-label'>Title</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-8'>
                {mentorAgreement && mentorAgreement['mpp_contact_title']}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-2 bold-label'>Address</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-8'>
                {mentorAgreement &&
                  `${mentorAgreement['mpp_contact_address']}
                ${mentorAgreement && mentorAgreement['mpp_contact_city']}
                 ${mentorAgreement && mentorAgreement['mpp_contact_state']}, 
                 ${mentorAgreement && mentorAgreement['mpp_contact_zip']}`}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-2 bold-label'>Telephone/ext.</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-8'>
                {mentorAgreement && mentorAgreement['mpp_contact_phone']}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-2 bold-label'>Email</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-8'>
                {mentorAgreement && mentorAgreement['mpp_contact_email']}
              </div>
            </div>

            <button
              type='button'
              className='btn btn-white mt-3 focusable-item'
              onClick={() => displayPOCEditModal()}
              disabled={mentorAgreementData}
            >
              Edit Or Change PoC
            </button>
          </div>
        </div>
      </div>
      <div className='row mb-4'>
        <div className='col-md-12' data-test-id='Point of Contact'>
          <fieldset>
            <legend>
              <div className='left-align mb-2'>
                <span aria-hidden='true'>*</span>Do you want to add additional
                Points of Contact?{' '}
                <span className='sr-only'>This is a required question.</span>
              </div>
            </legend>
            <OptionField
              name='has_additional_point_of_contact'
              placeholder=''
              required={true}
              options={certificationOptions}
              value={
                mentorAgreement &&
                mentorAgreement['has_additional_point_of_contact'] !== null &&
                mentorAgreement['has_additional_point_of_contact'].toString()
              }
              submitted={submitted}
              disabled={
                completeMentorAgreement
              }
              onKeyDown={keydownHandler}
            />
            {/* {showErrorAdditionalPoC &&
            mentorAgreement &&
            mentorAgreement['has_additional_point_of_contact'] === null ? (
              <p className='erorr-red'>This is a required question.</p>
            ) : null} */}
          </fieldset>
        </div>
      </div>

      {hasCheckedAdditionaPorintOfContacts && (
        <div className='mb-4'>
          <fieldset>
            <legend>
              <p>
                Select at least one additional Point of Contact (Optional)
              </p>
            </legend>

            <InputCheckbox
              name='aco_selected'
              placeholder='Cognizant Administrative contracting officer (ACO)'
              value={mentorAgreement && mentorAgreement['aco_selected']}
              label='Cognizant Administrative contracting officer (ACO)'
              id='Cognizant Administrative contracting officer (ACO)'
              disabled={completeMentorAgreement}
              checked={
                mentorAgreementData &&
                  mentorAgreementData['aco_selected'] &&
                  mentorAgreementData['aco_selected'].toString() === 'true'
                  ? true
                  : mentorAgreement &&
                    mentorAgreement['aco_selected'] &&
                    mentorAgreement['aco_selected'].toString() === 'true'
                    ? true
                    : false
              }
              onKeyDown={keydownHandler}
            />

            <InputCheckbox
              name='dcma_selected'
              placeholder='Cognizant Defence Management Agency (DCMA)'
              value={mentorAgreement && mentorAgreement['dcma_selected']}
              label='Cognizant Defence Management Agency (DCMA)'
              id='Cognizant Defence Management Agency (DCMA)'
              disabled={completeMentorAgreement}
              checked={
                mentorAgreementData &&
                  mentorAgreementData['dcma_selected'] &&
                  mentorAgreementData['dcma_selected'].toString() === 'true'
                  ? true
                  : mentorAgreement &&
                    mentorAgreement['dcma_selected'] &&
                    mentorAgreement['dcma_selected'].toString() === 'true'
                    ? true
                    : false
              }
              onKeyDown={keydownHandler}
            />

            <InputCheckbox
              name='cao_selected'
              placeholder='Contract Administration Office (CAO)'
              value={mentorAgreement && mentorAgreement['cao_selected']}
              label='Contract Administration Office (CAO)'
              id='Contract Administration Office (CAO)'
              disabled={completeMentorAgreement}
              checked={
                mentorAgreementData &&
                  mentorAgreementData['cao_selected'] &&
                  mentorAgreementData['cao_selected'].toString() === 'true'
                  ? true
                  : mentorAgreement &&
                    mentorAgreement['cao_selected'] &&
                    mentorAgreement['cao_selected'].toString() === 'true'
                    ? true
                    : false
              }
              onKeyDown={keydownHandler}
            />

            <InputCheckbox
              name='pco_selected'
              placeholder='Procuring Contract Office (PCO)'
              value={mentorAgreement && mentorAgreement['pco_selected']}
              label='Procuring Contract Office (PCO)'
              id='Procuring Contract Office (PCO)'
              disabled={completeMentorAgreement}
              checked={
                mentorAgreementData &&
                  mentorAgreementData['pco_selected'] &&
                  mentorAgreementData['pco_selected'].toString() === 'true'
                  ? true
                  : mentorAgreement &&
                    mentorAgreement['pco_selected'] &&
                    mentorAgreement['pco_selected'].toString() === 'true'
                    ? true
                    : false
              }
              onKeyDown={keydownHandler}
            />
          </fieldset>
        </div>
      )}

      {/* ACO POC */}

      {acoSelected && hasCheckedAdditionaPorintOfContacts && (
        <div className='row mb-5'>
          <div className='col-md-8'>
            <h3 className='agreement-sub-header mb-0'>
              Mentor Firm&apos;s Cognizant Adminstrative Contracting Officer
              (ACO)
            </h3>
          </div>
          <div className='col-md-12 mt-2' data-test-id='Year Established'>
            <div className='row'>
              <div className='col-md-6' data-test-id='aco_name'>
                <InputField
                  name='aco_name'
                  placeholder='Name'
                  id='aco-name'
                  required={true}
                  value={mentorAgreement && mentorAgreement['aco_name']}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
              <div className='col-md-6' data-test-id='aco_title'>
                <InputField
                  name='aco_title'
                  placeholder='Title'
                  id='aco-title'
                  required={true}
                  value={mentorAgreement && mentorAgreement['aco_title']}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
            </div>
            <fieldset>
              <legend className='sr-only'>Address</legend>
              <div className='row'>
                <div className='col-md-12' data-test-id='aco_address'>
                  <InputField
                    name='aco_address'
                    placeholder='Address'
                    id='aco-address'
                    required={true}
                    value={mentorAgreement && mentorAgreement['aco_address']}
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
              </div>

              <div className='row'>
                <div className='col-md-6' data-test-id='dcma City'>
                  <InputField
                    name='aco_city'
                    placeholder='City'
                    id='dcma-contact-city'
                    required={true}
                    value={mentorAgreement && mentorAgreement['aco_city']}
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
                <div className='col-md-3' data-test-id='dcma State'>
                  <SelectField
                    name='aco_state'
                    placeholder='State'
                    id='dcma_contact-state'
                    required={true}
                    options={stateOptions}
                    value={mentorAgreement && mentorAgreement['aco_state']}
                    defaultValue='State'
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
                <div className='col-md-3' data-test-id='dcma Zip'>
                  <InputField
                    name='aco_zip'
                    placeholder='Zip'
                    format={formatZip}
                    id='dcma-contact-zip'
                    required={true}
                    value={mentorAgreement && mentorAgreement['aco_zip']}
                    min={5}
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
              </div>
            </fieldset>
            <div className='row'>
              <div className='col-md-4' data-test-id='aco_tel'>
                <InputField
                  name='aco_tel'
                  placeholder='Telephone/ext.'
                  id='aco-tel'
                  required={true}
                  format={formatPhone}
                  value={mentorAgreement && mentorAgreement['aco_tel']}
                  min={10}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
              <div className='col-md-4' data-test-id='aco_fax'>
                <InputField
                  name='aco_fax'
                  placeholder='Fax'
                  id='aco-fax'
                  format={formatPhone}
                  value={mentorAgreement && mentorAgreement['aco_fax']}
                  min={10}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
              <div className='col-md-4' data-test-id='aco_email'>
                <InputField
                  name='aco_email'
                  placeholder='Email'
                  id='aco-email'
                  required={true}
                  value={mentorAgreement && mentorAgreement['aco_email']}
                  validation={validateEmail}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DCMA POC */}

      {dcmaSelected && hasCheckedAdditionaPorintOfContacts && (
        <div className='row mb-5'>
          <div className='col-md-12'>
            <h3 className='agreement-sub-header mb-0'>
              Cognizant Defence Management Agency (DCMA)
            </h3>
          </div>
          <div className='col-md-12 mt-2'>
            <div className='row'>
              <div
                className='col-md-6'
                data-test-id='dcma Primary Contact (Full Name)'
              >
                <InputField
                  name='dcma_name'
                  placeholder='Name'
                  id='dcma-primary-contact'
                  required={true}
                  value={mentorAgreement && mentorAgreement['dcma_name']}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
              <div className='col-md-6' data-test-id='dcma Title'>
                <InputField
                  name='dcma_title'
                  placeholder='Title'
                  id='dcma-contact-title'
                  required={true}
                  value={mentorAgreement && mentorAgreement['dcma_title']}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
            </div>
            <fieldset>
              <legend className='sr-only'>Address</legend>
              <div className='row'>
                <div className='col-md-12' data-test-id='dcma Address'>
                  <InputField
                    name='dcma_address'
                    placeholder='Address'
                    id='dcma-contact-address'
                    required={true}
                    value={mentorAgreement && mentorAgreement['dcma_address']}
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6' data-test-id='dcma City'>
                  <InputField
                    name='dcma_city'
                    placeholder='City'
                    id='dcma-contact-city'
                    required={true}
                    value={mentorAgreement && mentorAgreement['dcma_city']}
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
                <div className='col-md-3' data-test-id='dcma State'>
                  <SelectField
                    name='dcma_state'
                    placeholder='State'
                    id='dcma_contact-state'
                    required={true}
                    options={stateOptions}
                    value={mentorAgreement && mentorAgreement['dcma_state']}
                    defaultValue='State'
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
                <div className='col-md-3' data-test-id='dcma Zip'>
                  <InputField
                    name='dcma_zip'
                    placeholder='Zip'
                    format={formatZip}
                    id='dcma-contact-zip'
                    required={true}
                    value={mentorAgreement && mentorAgreement['dcma_zip']}
                    min={5}
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
              </div>
            </fieldset>
            <div className='row'>
              <div className='col-md-6' data-test-id='dcma Email'>
                <InputField
                  name='dcma_email'
                  placeholder='Email'
                  id='dcma-contact-email'
                  required={true}
                  value={mentorAgreement && mentorAgreement['dcma_email']}
                  validation={validateEmail}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>

              <div className='col-md-6' data-test-id='dcma Phone'>
                <InputField
                  name='dcma_tel'
                  placeholder='Phone'
                  id='dcma-contact-phone'
                  format={formatPhone}
                  required={true}
                  value={mentorAgreement && mentorAgreement['dcma_tel']}
                  min={10}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CAO POC */}

      {caoSelected && hasCheckedAdditionaPorintOfContacts && (
        <div className='row mb-5'>
          <div className='col-md-12'>
            <h3 className='agreement-sub-header mb-0'>
              Contract Adminstration Office (CAO)
            </h3>
          </div>
          <div className='col-md-12 mt-2' data-test-id='Year Established'>
            <div className='row'>
              <div className='col-md-6' data-test-id='cao_name'>
                <InputField
                  name='cao_name'
                  placeholder='Name'
                  id='cao-name'
                  required={true}
                  value={mentorAgreement && mentorAgreement['cao_name']}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
              <div className='col-md-6' data-test-id='cao_title'>
                <InputField
                  name='cao_title'
                  placeholder='Title'
                  id='cao-title'
                  required={true}
                  value={mentorAgreement && mentorAgreement['cao_title']}
                  disabled={
                    mentorAgreementData &&
                    mentorProtegeAgreementStatus !== 'declined'
                  }
                />
              </div>
            </div>
            <fieldset>
              <legend className='sr-only'>Address</legend>
              <div className='row'>
                <div className='col-md-12' data-test-id='cao_address'>
                  <InputField
                    name='cao_address'
                    placeholder='Address'
                    id='cao-address'
                    required={true}
                    value={mentorAgreement && mentorAgreement['cao_address']}
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
              </div>

              <div className='row'>
                <div className='col-md-6' data-test-id='dcma City'>
                  <InputField
                    name='cao_city'
                    placeholder='City'
                    id='dcma-contact-city'
                    required={true}
                    value={mentorAgreement && mentorAgreement['cao_city']}
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
                <div className='col-md-3' data-test-id='dcma State'>
                  <SelectField
                    name='cao_state'
                    placeholder='State'
                    id='dcma_contact-state'
                    required={true}
                    options={stateOptions}
                    value={mentorAgreement && mentorAgreement['cao_state']}
                    defaultValue='State'
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
                <div className='col-md-3' data-test-id='dcma Zip'>
                  <InputField
                    name='cao_zip'
                    placeholder='Zip'
                    format={formatZip}
                    id='dcma-contact-zip'
                    required={true}
                    value={mentorAgreement && mentorAgreement['cao_zip']}
                    min={5}
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
              </div>
            </fieldset>
            <div className='row'>
              <div className='col-md-4' data-test-id='cao_tel'>
                <InputField
                  name='cao_tel'
                  placeholder='Telephone/ext.'
                  id='cao-tel'
                  format={formatPhone}
                  required={caoSelected ? true : false}
                  value={mentorAgreement && mentorAgreement['cao_tel']}
                  min={10}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
              <div className='col-md-4' data-test-id='cao_fax'>
                <InputField
                  name='cao_fax'
                  placeholder='Fax'
                  id='cao-fax'
                  format={formatPhone}
                  value={mentorAgreement && mentorAgreement['cao_fax']}
                  min={10}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
              <div className='col-md-4' data-test-id='cao_email'>
                <InputField
                  name='cao_email'
                  placeholder='Email'
                  id='cao-email'
                  required={true}
                  value={mentorAgreement && mentorAgreement['cao_email']}
                  validation={validateEmail}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PCO POC */}
      {pcoSelected && hasCheckedAdditionaPorintOfContacts && (
        <div className='row mb-5'>
          <div className='col-md-12'>
            <h3 className='agreement-sub-header mb-0'>
              Procurring Contracting Officer (PCO)
            </h3>
            <p className='table-data-detail left-align'>
              (Direct reimbursable agreements only)
            </p>
          </div>
          <div className='col-md-12 mt-2' data-test-id='Year Established'>
            <div className='row'>
              <div className='col-md-6' data-test-id='pco_name'>
                <InputField
                  name='pco_name'
                  placeholder='Name'
                  id='pco-name'
                  required={true}
                  value={mentorAgreement && mentorAgreement['pco_name']}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
              <div className='col-md-6' data-test-id='pco_title'>
                <InputField
                  name='pco_title'
                  placeholder='Title'
                  id='pco-title'
                  required={true}
                  value={mentorAgreement && mentorAgreement['pco_title']}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
            </div>
            <fieldset>
              <legend className='sr-only'>Address</legend>
              <div className='row'>
                <div className='col-md-12' data-test-id='pco_address'>
                  <InputField
                    name='pco_address'
                    placeholder='Address'
                    id='pco-address'
                    required={true}
                    value={mentorAgreement && mentorAgreement['pco_address']}
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
              </div>

              <div className='row'>
                <div className='col-md-6' data-test-id='dcma City'>
                  <InputField
                    name='pco_city'
                    placeholder='City'
                    id='pco_city'
                    required={true}
                    value={mentorAgreement && mentorAgreement['pco_city']}
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
                <div className='col-md-3' data-test-id='dcma State'>
                  <SelectField
                    name='pco_state'
                    placeholder='State'
                    id='pco_state'
                    required={true}
                    options={stateOptions}
                    value={mentorAgreement && mentorAgreement['pco_state']}
                    defaultValue='State'
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
                <div className='col-md-3' data-test-id='dcma Zip'>
                  <InputField
                    name='pco_zip'
                    placeholder='Zip'
                    format={formatZip}
                    id='pco_zip'
                    required={true}
                    value={mentorAgreement && mentorAgreement['pco_zip']}
                    min={5}
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
              </div>
            </fieldset>
            <div className='row'>
              <div className='col-md-4' data-test-id='pco_tel'>
                <InputField
                  name='pco_tel'
                  placeholder='Telephone/ext.'
                  id='pco-tel'
                  format={formatPhone}
                  required={true}
                  value={mentorAgreement && mentorAgreement['pco_tel']}
                  min={12}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
              <div className='col-md-4' data-test-id='pco_fax'>
                <InputField
                  name='pco_fax'
                  placeholder='Fax'
                  id='pco-fax'
                  format={formatPhone}
                  value={mentorAgreement && mentorAgreement['pco_fax']}
                  min={12}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
              <div className='col-md-4' data-test-id='pco_email'>
                <InputField
                  name='pco_email'
                  placeholder='Email'
                  id='pco-email'
                  required={true}
                  value={mentorAgreement && mentorAgreement['pco_email']}
                  validation={validateEmail}
                  disabled={
                    completeMentorAgreement
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='row'>
        <div className='col-md-12'>
          <h3 className='agreement-sub-header mb-0'>
            Mentor Firm&apos;s Authorized Signee
          </h3>
          <p className='txt-small-italic mt-2'>
            Note: The authorized signee is someone from your company responsible
            for reviewing the agreement filled by you and the Protégé before the
            agreement is submitted to a reviewer.
          </p>
          <fieldset>
            {signeePocOptions.findIndex((item) => item.value === "government_poc" || item.value === "electronic_poc") !== -1 && <legend>
              <p>
                <span aria-hidden='true'>
                  *Select from either your existing points of contact list or create a new signee PoC:
                </span>
                <span className='sr-only'>You must select one option.</span>
              </p>
            </legend>}
            <div className='row'>
              <div
                className='col-md-12 '
                data-test-id='Protege Firm Participated'
              >
                <OptionField
                  name='mentor_signee_poc'
                  placeholder='Protege Firm Participated'
                  options={signeePocOptions}
                  value={
                    mentorAgreement && mentorAgreement['mentor_signee_poc']
                  }
                  required={true}
                  disabled={
                    completeMentorAgreement
                  }
                  submitted={submitted}
                  errorMessage={'You must select an option for an authorized signee'}
                  onKeyDown={keydownHandler}
                />
                {/* {showErrorSigneePoc &&
                mentorAgreement &&
                mentorAgreement['mentor_signee_poc'] === null ? (
                  <p className='erorr-red'>You must select one option.</p>
                ) : null} */}
              </div>
            </div>
            {mentorAgreement &&
                mentorAgreement['mentor_signee_poc'] !== "new_mentor_signee_poc" && <div className='mt-3 p-2 border'>
              <div className='row'>
                <div className='col-md-2 bold-label'>Name</div>
                <div className='col-md-1'>:</div>
                <div className='col-md-8'>
                  {mentorAgreement &&
                    `${mentorAgreement['mpp_contact_first_name']}  ${mentorAgreement['mpp_contact_last_name']}`}
                </div>
              </div>
              <div className='row'>
                <div className='col-md-2 bold-label'>Title</div>
                <div className='col-md-1'>:</div>
                <div className='col-md-8'>
                  {mentorAgreement && mentorAgreement['mpp_contact_title']}
                </div>
              </div>

              <div className='row'>
                <div className='col-md-2 bold-label'>Address</div>
                <div className='col-md-1'>:</div>
                <div className='col-md-8'>
                  {mentorAgreement &&
                    `${mentorAgreement['mpp_contact_address']}
                  ${mentorAgreement && mentorAgreement['mpp_contact_city']}
                  ${mentorAgreement && mentorAgreement['mpp_contact_state']}, 
                  ${mentorAgreement && mentorAgreement['mpp_contact_zip']}`}
                </div>
              </div>

              <div className='row'>
                <div className='col-md-2 bold-label'>Telephone/ext.</div>
                <div className='col-md-1'>:</div>
                <div className='col-md-8'>
                  {mentorAgreement && mentorAgreement['mpp_contact_phone']}
                </div>
              </div>

              <div className='row'>
                <div className='col-md-2 bold-label'>Email</div>
                <div className='col-md-1'>:</div>
                <div className='col-md-8'>
                  {mentorAgreement && mentorAgreement['mpp_contact_email']}
                </div>
              </div>
            </div>}
          </fieldset>
        </div>
      </div>

      {mentorAgreement &&
        mentorAgreement['mentor_signee_poc'] === 'new_mentor_signee_poc' && (
          <div className='row mb-5'>
            <div className='col-md-12 mt-2'>
              <div className='row'>
                <div
                  className='col-md-6'
                  data-test-id='dcma Primary Contact (Full Name)'
                >
                  <InputField
                    name='signee_name'
                    placeholder='Primary Contact (Full Name)'
                    id='dcma-primary-contact'
                    required={true}
                    value={
                      mentorAgreement &&
                        mentorAgreement['signee_name'] === 'null'
                        ? ''
                        : mentorAgreement['signee_name']
                    }
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
                <div className='col-md-6' data-test-id='dcma Title'>
                  <InputField
                    name='signee_title'
                    placeholder='Title'
                    id='dcma-contact-title'
                    required={true}
                    value={
                      mentorAgreement &&
                        mentorAgreement['signee_title'] === 'null'
                        ? ''
                        : mentorAgreement['signee_title']
                    }
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
              </div>
              <fieldset>
                <legend className='sr-only'>Address</legend>
                <div className='row'>
                  <div className='col-md-12' data-test-id='dcma Address'>
                    <InputField
                      name='signee_address'
                      placeholder='Address'
                      id='dcma-contact-address'
                      required={true}
                      value={
                        mentorAgreement &&
                          mentorAgreement['signee_address'] === 'null'
                          ? ''
                          : mentorAgreement['signee_address']
                      }
                      disabled={
                        completeMentorAgreement
                      }
                    />
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6' data-test-id='dcma City'>
                    <InputField
                      name='signee_city'
                      placeholder='City'
                      id='signee_city'
                      required={true}
                      value={
                        mentorAgreement &&
                          mentorAgreement['signee_city'] === 'null'
                          ? ''
                          : mentorAgreement['signee_city']
                      }
                      disabled={
                        completeMentorAgreement
                      }
                    />
                  </div>
                  <div className='col-md-3' data-test-id='dcma State'>
                    <SelectField
                      name='signee_state'
                      placeholder='State'
                      id='signee_state'
                      required={true}
                      options={stateOptions}
                      value={
                        mentorAgreement &&
                          mentorAgreement['signee_state'] === 'null'
                          ? ''
                          : mentorAgreement['signee_state']
                      }
                      defaultValue='State'
                      disabled={
                        completeMentorAgreement
                      }
                    />
                  </div>
                  <div className='col-md-3' data-test-id='dcma Zip'>
                    <InputField
                      name='signee_zip'
                      placeholder='Zip'
                      format={formatZip}
                      id='signee_zip'
                      required={true}
                      value={
                        mentorAgreement &&
                          mentorAgreement['signee_zip'] === 'null'
                          ? ''
                          : mentorAgreement['signee_zip']
                      }
                      min={5}
                      disabled={
                        completeMentorAgreement
                      }
                    />
                  </div>
                </div>
              </fieldset>
              <div className='row'>
                <div className='col-md-4' data-test-id='dcma Email'>
                  <InputField
                    name='signee_email'
                    placeholder='Email'
                    id='signee_email'
                    required={true}
                    value={
                      mentorAgreement &&
                        mentorAgreement['signee_email'] === 'null'
                        ? ''
                        : mentorAgreement['signee_email']
                    }
                    validation={validateEmail}
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>

                <div className='col-md-4' data-test-id='dcma Phone'>
                  <InputField
                    name='signee_fax'
                    placeholder='Fax'
                    id='signee_fax'
                    format={formatPhone}
                    value={
                      mentorAgreement &&
                        mentorAgreement['signee_fax'] === 'null'
                        ? ''
                        : mentorAgreement['signee_fax']
                    }
                    min={10}
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
                <div className='col-md-4' data-test-id='dcma Phone'>
                  <InputField
                    name='signee_tel'
                    placeholder='Phone'
                    id='signee_tel'
                    format={formatPhone}
                    required={true}
                    value={
                      mentorAgreement &&
                        mentorAgreement['signee_tel'] === 'null'
                        ? ''
                        : mentorAgreement['signee_tel']
                    }
                    min={10}
                    disabled={
                      completeMentorAgreement
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default PointOfContacts
