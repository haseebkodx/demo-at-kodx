import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import InputField from '../commonComponents/forms/InputField'
import validateEmail from '../commonComponents/forms/validations/validateEmail'
import { formatPhone, formatZip } from '../../helpers/formatter/format'
import SelectField from '../commonComponents/forms/SelectField'
import OptionField from '../commonComponents/forms/OptionField'
import { useHistory } from 'react-router-dom'
import InputCheckbox from '../commonComponents/forms/InputCheckbox'
import POCEditModal from './PocEditModal'
import { keydownHandler } from '../commonComponents/utility'

function PointOfContact({
  protegeAgreement,
  mentorProtegeAgrStatus,
  stateOptions,
  protegeAgreementData,
  displayPOCEditModal,
  showPOCEditModal,
  reviewer = true,
  initialize,
  submitted = false,
  // showErrorAdditionalPoC,
  // showErrorProtegeSigneePoc,
}) {
  const [signeePocOptions, setSigneePocOptions] = useState([])
  const companyInfo = useSelector(
    (state) =>
      state.currentUserInfo &&
      state.currentUserInfo.company &&
      state.currentUserInfo.company[0]
  )

  const history = useHistory()

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
  const [compUpdate, setCompUpsate] = useState(false)

  useEffect(() => {
    setCompUpsate(!compUpdate)
  }, [showPOCEditModal])

  const signeeOptoins = [
    {
      name: 'Signee PoC',
      label: `Protege PoC: ${_.startCase(
        _.toLower(mppContactFirstName)
      )} ${_.startCase(_.toLower(mppContactLastName))}`,
      value: 'protege_poc',
      id: 'Yes - Protege PoC',
    },
    {
      name: 'Signee PoC',
      label: `Govt Business PoC: ${_.startCase(
        _.toLower(govBusinessContactFirstName)
      )} ${_.startCase(_.toLower(govBusinessContactLastName))}`,
      value: 'government_poc',
      id: 'No - Govt Business PoC',
    },
    {
      name: 'Signee PoC',
      label: `Electronic Business: ${_.startCase(
        _.toLower(electronicBusinessContactFirstName)
      )} ${_.startCase(_.toLower(electronicBusinessContactLastName))}`,
      value: 'electronic_poc',
      id: 'No - Electronic Business',
    },
    {
      name: 'Signee PoC',
      label: `Create New Signee PoC`,
      value: 'new_protege_signee_poc',
      id: 'Yes - Create New Signee PoC',
    },
  ]

  const portegeSigneePOC = useSelector(
    (state) =>
      state.form &&
      state.form.protegeAgreement &&
      state.form.protegeAgreement.values &&
      state.form.protegeAgreement.values.protege_signee_poc
  )

  const selectSigneePOC = () => {
    const initialValue =
      portegeSigneePOC === 'Govt Business'
        ? 'gov_business'
        : portegeSigneePOC === 'Electronic Business'
          ? 'electronic_business'
          : portegeSigneePOC === 'Protege PoC'
            ? 'mpp'
            : null
  }

  const goToPOC = () => {
    const localStorage = window.localStorage
    localStorage.setItem('routeToAgreement', true)
    history.push('/companyProfile')
  }

  const acoSelected =
    (protegeAgreementData &&
      protegeAgreementData['aco_selected'] &&
      protegeAgreementData['aco_selected'].toString() === 'true') ||
    (protegeAgreement &&
      protegeAgreement['aco_selected'] &&
      protegeAgreement['aco_selected'].toString() === 'true')

  const caoSelected =
    (protegeAgreementData &&
      protegeAgreementData['cao_selected'] &&
      protegeAgreementData['cao_selected'].toString() === 'true') ||
    (protegeAgreement &&
      protegeAgreement['cao_selected'] &&
      protegeAgreement['cao_selected'].toString() === 'true')

  const dcmaSelected =
    (protegeAgreementData &&
      protegeAgreementData['dcma_selected'] &&
      protegeAgreementData['dcma_selected'].toString() === 'true') ||
    (protegeAgreement &&
      protegeAgreement['dcma_selected'] &&
      protegeAgreement['dcma_selected'].toString() === 'true')

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

  useEffect(() => {
    let newState = signeeOptoins.filter((item) => item?.value === protegeAgreement?.protege_company[0]?.poc_selected)
    newState.push(signeeOptoins.find((item) => item?.value === "new_protege_signee_poc"))
    setSigneePocOptions(newState)
  }, [protegeAgreement])

  useEffect(() => {
    if (protegeAgreement['has_additional_point_of_contract'] !== null && protegeAgreement['has_additional_point_of_contract'].toString() === "false") {
      protegeAgreement['aco_selected'] = false
      protegeAgreement['dcma_selected'] = false
      protegeAgreement['cao_selected'] = false
    }
  }, [protegeAgreement['has_additional_point_of_contract']])

  return (
    <div className='col-md-12'>
      {reviewer && (
        <h2 className='page-title reviewer-section-title section-header'>Point of Contact</h2>
      )}

      <POCEditModal
        showModal={showPOCEditModal}
        handleModal={displayPOCEditModal}
        userType="protege"
        agreement={protegeAgreement}
      />

      <div className='row mb-5'>
        <div className='col-md-12 mb-3'>
          <h3 className='agreement-sub-header mb-0'>
            Protégé Company Point of Contact (PoC)
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
                {protegeAgreement &&
                  `${protegeAgreement['mpp_contact_first_name']}  ${protegeAgreement['mpp_contact_last_name']}`}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-2 bold-label'>Title</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-8'>
                {protegeAgreement && protegeAgreement['mpp_contact_title']}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-2 bold-label'>Address</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-8'>
                {protegeAgreement &&
                  `${protegeAgreement['mpp_contact_address']}
                ${protegeAgreement && protegeAgreement['mpp_contact_city']}
                 ${protegeAgreement && protegeAgreement['mpp_contact_state']}, 
                 ${protegeAgreement && protegeAgreement['mpp_contact_zip']}`}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-2 bold-label'>Telephone/ext.</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-8'>
                {protegeAgreement && protegeAgreement['mpp_contact_phone']
                  && formatPhone(protegeAgreement['mpp_contact_phone'])}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-2 bold-label'>Email</div>
              <div className='col-md-1'>:</div>
              <div className='col-md-8'>
                {protegeAgreement && protegeAgreement['mpp_contact_email']}
              </div>
            </div>

            <button
              type='button'
              className='btn btn-white mt-3 focusable-item'
              onClick={() => displayPOCEditModal()}
              disabled={protegeAgreementData}
            >
              Change or Edit PoC
            </button>
          </div>
        </div>
      </div>

      <div className='row mb-4'>
        <div className='col-md-12' data-test-id='Certified Small Business'>
          <fieldset>
            <legend>
              <div className='left-align mb-2'>
                <span aria-hidden='true'>*</span>Do you want to add additional
                Points of Contact?
                <span className='sr-only'>This is a required question.</span>
              </div>
            </legend>
            <OptionField
              name='has_additional_point_of_contract'
              placeholder=''
              options={certificationOptions}
              value={
                protegeAgreement &&
                protegeAgreement['has_additional_point_of_contract']
              }
              required={true}
              submitted={submitted}
              disabled={
                protegeAgreementData
              }
              onKeyDown={keydownHandler}
            />
            {/* {showErrorAdditionalPoC &&
            protegeAgreement &&
            !protegeAgreement['has_additional_point_of_contract'] ? (
              <p className='erorr-red'>This is a required question.</p>
            ) : null} */}
          </fieldset>
        </div>
      </div>

      {protegeAgreement &&
        protegeAgreement['has_additional_point_of_contract'] &&
        protegeAgreement['has_additional_point_of_contract'].toString() ===
        'true' && (
          <div className='mb-4'>
            <fieldset>
              <legend>
                Select additional points of contact (Optional)
              </legend>

              <InputCheckbox
                name='aco_selected'
                id='aco_selected'
                placeholder='Cognizant Administrative contracting officer (ACO)'
                value={protegeAgreement && protegeAgreement['aco_selected']}
                label='Cognizant Administrative contracting officer (ACO)'
                disabled={
                  protegeAgreementData
                }
                checked={
                  protegeAgreementData &&
                    protegeAgreementData['aco_selected'] &&
                    protegeAgreementData['aco_selected'].toString() === 'true'
                    ? true
                    : protegeAgreement &&
                      protegeAgreement['aco_selected'] &&
                      protegeAgreement['aco_selected'].toString() === 'true'
                      ? true
                      : false
                }
                onKeyDown={keydownHandler}
              />

              <InputCheckbox
                name='dcma_selected'
                id='dcma_selected'
                placeholder='Cognizant Defence Management Agency (DCMA)'
                value={protegeAgreement && protegeAgreement['dcma_selected']}
                label='Cognizant Defence Management Agency (DCMA)'
                disabled={
                  protegeAgreementData
                }
                checked={
                  protegeAgreementData &&
                    protegeAgreementData['dcma_selected'] &&
                    protegeAgreementData['dcma_selected'].toString() === 'true'
                    ? true
                    : protegeAgreement &&
                      protegeAgreement['dcma_selected'] &&
                      protegeAgreement['dcma_selected'].toString() === 'true'
                      ? true
                      : false
                }
                onKeyDown={keydownHandler}
              />

              <InputCheckbox
                name='cao_selected'
                id='cao_selected'
                placeholder='Contract Administration Office (CAO)'
                value={protegeAgreement && protegeAgreement['cao_selected']}
                label='Contract Administration Office (CAO)'
                disabled={
                  protegeAgreementData
                }
                checked={
                  protegeAgreementData &&
                    protegeAgreementData['cao_selected'] &&
                    protegeAgreementData['cao_selected'].toString() === 'true'
                    ? true
                    : protegeAgreement &&
                      protegeAgreement['cao_selected'] &&
                      protegeAgreement['cao_selected'].toString() === 'true'
                      ? true
                      : false
                }
                onKeyDown={keydownHandler}
              />
            </fieldset>
          </div>
        )}

      {acoSelected && (
        <div className='row mb-5'>
          <div className='col-md-12'>
            <h3 className='agreement-sub-header mb-0'>
              Cognizant Administrative contracting officer (ACO)
            </h3>
          </div>
          <div className='col-md-12 mt-2'>
            <div className='row'>
              <div
                className='col-md-6'
                data-test-id='Primary Contact (Full Name)'
              >
                <InputField
                  name='aco_name'
                  placeholder='Primary Contact (Full Name)'
                  id='aco_name'
                  required={true}
                  value={protegeAgreement && protegeAgreement['aco_name']}
                  disabled={
                    protegeAgreementData
                  }
                />
              </div>
              <div className='col-md-6' data-test-id='Title'>
                <InputField
                  name='aco_title'
                  placeholder='Title'
                  id='aco-contact-title'
                  required={true}
                  value={protegeAgreement && protegeAgreement['aco_title']}
                  disabled={
                    protegeAgreementData
                  }
                />
              </div>
            </div>
            <fieldset>
              <legend className='sr-only'>Address</legend>
              <div className='row'>
                <div className='col-md-12' data-test-id='Address'>
                  <InputField
                    name='aco_address'
                    placeholder='Address'
                    id='aco-contact-address'
                    required={true}
                    value={protegeAgreement && protegeAgreement['aco_address']}
                    disabled={
                      protegeAgreementData
                    }
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6' data-test-id='City'>
                  <InputField
                    name='aco_city'
                    placeholder='City'
                    id='aco-contact-city'
                    required={true}
                    value={protegeAgreement && protegeAgreement['aco_city']}
                    disabled={
                      protegeAgreementData
                    }
                  />
                </div>
                <div className='col-md-3' data-test-id='State'>
                  <SelectField
                    name='aco_state'
                    placeholder='State'
                    id='aco-contact-state'
                    required={true}
                    options={stateOptions}
                    value={protegeAgreement && protegeAgreement['aco_state']}
                    defaultValue='State'
                    disabled={
                      protegeAgreementData
                    }
                  />
                </div>
                <div className='col-md-3' data-test-id='Zip'>
                  <InputField
                    name='aco_zip'
                    placeholder='Zip'
                    id='aco-contact-zip'
                    required={true}
                    format={formatZip}
                    value={protegeAgreement && protegeAgreement['aco_zip']}
                    min={5}
                    disabled={
                      protegeAgreementData
                    }
                  />
                </div>
              </div>
            </fieldset>
            <div className='row'>
              <div className='col-md-4' data-test-id='Email'>
                <InputField
                  name='aco_email'
                  placeholder='Email'
                  id='aco-contact-email'
                  required={true}
                  value={protegeAgreement && protegeAgreement['aco_email']}
                  validation={validateEmail}
                  disabled={
                    protegeAgreementData
                  }
                />
              </div>

              <div className='col-md-4' data-test-id='Phone'>
                <InputField
                  name='aco_fax'
                  placeholder='Fax'
                  id='aco-contact-fax'
                  // id='contact-phone'
                  format={formatPhone}
                  value={protegeAgreement && protegeAgreement['aco_fax']}
                  min={10}
                  disabled={
                    protegeAgreementData
                  }
                />
              </div>
              <div className='col-md-4' data-test-id='Phone'>
                <InputField
                  name='aco_tel'
                  placeholder='Phone'
                  id='aco-contact-phone'
                  format={formatPhone}
                  required={true}
                  value={protegeAgreement && protegeAgreement['aco_tel']}
                  min={10}
                  disabled={
                    protegeAgreementData
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {dcmaSelected && (
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
                  name='dcma_primary_contact'
                  placeholder='Name'
                  id='dcma-primary-contact'
                  required={true}
                  value={
                    protegeAgreement && protegeAgreement['dcma_primary_contact']
                  }
                  disabled={
                    protegeAgreementData
                  }
                />
              </div>
              <div className='col-md-6' data-test-id='dcma Title'>
                <InputField
                  name='dcma_contact_title'
                  placeholder='Title'
                  id='dcma-contact-title'
                  required={true}
                  value={
                    protegeAgreement && protegeAgreement['dcma_contact_title']
                  }
                  disabled={
                    protegeAgreementData
                  }
                />
              </div>
            </div>
            <fieldset>
              <legend className='sr-only'>Address</legend>
              <div className='row'>
                <div className='col-md-12' data-test-id='dcma Address'>
                  <InputField
                    name='dcma_contact_address'
                    placeholder='Address'
                    id='dcma-contact-address'
                    required={true}
                    value={
                      protegeAgreement &&
                      protegeAgreement['dcma_contact_address']
                    }
                    disabled={
                      protegeAgreementData
                    }
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6' data-test-id='dcma City'>
                  <InputField
                    name='dcma_contact_city'
                    placeholder='City'
                    id='dcma-contact-city'
                    required={true}
                    value={
                      protegeAgreement && protegeAgreement['dcma_contact_city']
                    }
                    disabled={
                      protegeAgreementData
                    }
                  />
                </div>
                <div className='col-md-3' data-test-id='dcma State'>
                  <SelectField
                    name='dcma_contact_state'
                    placeholder='State'
                    id='dcma_contact-state'
                    required={true}
                    options={stateOptions}
                    value={
                      protegeAgreement && protegeAgreement['dcma_contact_state']
                    }
                    defaultValue='State'
                    disabled={
                      protegeAgreementData
                    }
                  />
                </div>
                <div className='col-md-3' data-test-id='dcma Zip'>
                  <InputField
                    name='dcma_contact_zip'
                    placeholder='Zip'
                    format={formatZip}
                    id='dcma-contact-zip'
                    required={true}
                    value={
                      protegeAgreement && protegeAgreement['dcma_contact_zip']
                    }
                    min={5}
                    disabled={
                      protegeAgreementData
                    }
                  />
                </div>
              </div>
            </fieldset>
            <div className='row'>
              <div className='col-md-6' data-test-id='dcma Email'>
                <InputField
                  name='dcma_contact_email'
                  placeholder='Email'
                  id='dcma-contact-email'
                  required={true}
                  value={
                    protegeAgreement && protegeAgreement['dcma_contact_email']
                  }
                  validation={validateEmail}
                  disabled={
                    protegeAgreementData
                  }
                />
              </div>

              <div className='col-md-6' data-test-id='dcma Phone'>
                <InputField
                  name='dcma_contact_phone'
                  placeholder='Phone'
                  id='dcma-contact-phone'
                  format={formatPhone}
                  required={true}
                  value={
                    protegeAgreement && protegeAgreement['dcma_contact_phone']
                  }
                  min={10}
                  disabled={
                    protegeAgreementData
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {caoSelected && (
        <div className='row mb-5'>
          <div className='col-md-12'>
            <h3 className='agreement-sub-header mb-0'>
              Contract Administration Office (CAO)
            </h3>
          </div>
          <div className='col-md-12 mt-2'>
            <div className='row'>
              <div
                className='col-md-6'
                data-test-id='Primary Contact (Full Name)'
              >
                <InputField
                  name='cao_name'
                  placeholder='Name'
                  id='mpp-primary-contact'
                  required={true}
                  value={protegeAgreement && protegeAgreement['cao_name']}
                  disabled={
                    protegeAgreementData
                  }
                />
              </div>
              <div className='col-md-6' data-test-id='Title'>
                <InputField
                  name='cao_title'
                  placeholder='Title'
                  id='cao-contact-title'
                  required={true}
                  value={protegeAgreement && protegeAgreement['cao_title']}
                  disabled={
                    protegeAgreementData
                  }
                />
              </div>
            </div>
            <fieldset>
              <legend className='sr-only'>Address</legend>
              <div className='row'>
                <div className='col-md-12' data-test-id='Address'>
                  <InputField
                    name='cao_address'
                    placeholder='Address'
                    id='cao_contact-address'
                    required={true}
                    value={protegeAgreement && protegeAgreement['cao_address']}
                    disabled={
                      protegeAgreementData
                    }
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6' data-test-id='City'>
                  <InputField
                    name='cao_city'
                    placeholder='City'
                    id='cao-contact-city'
                    required={true}
                    value={protegeAgreement && protegeAgreement['cao_city']}
                    disabled={
                      protegeAgreementData
                    }
                  />
                </div>
                <div className='col-md-3' data-test-id='State'>
                  <SelectField
                    name='cao_state'
                    placeholder='State'
                    id='cao-contact-state'
                    required={true}
                    options={stateOptions}
                    value={protegeAgreement && protegeAgreement['cao_state']}
                    defaultValue='State'
                    disabled={
                      protegeAgreementData
                    }
                  />
                </div>
                <div className='col-md-3' data-test-id='Zip'>
                  <InputField
                    name='cao_zip'
                    placeholder='Zip'
                    id='cao-contact-zip'
                    format={formatZip}
                    required={true}
                    value={protegeAgreement && protegeAgreement['cao_zip']}
                    min={5}
                    disabled={
                      protegeAgreementData
                    }
                  />
                </div>
              </div>
            </fieldset>
            <div className='row'>
              <div className='col-md-4' data-test-id='Email'>
                <InputField
                  name='cao_email'
                  placeholder='Email'
                  id='cao-contact-email'
                  required={true}
                  value={protegeAgreement && protegeAgreement['cao_email']}
                  validation={validateEmail}
                  disabled={
                    protegeAgreementData
                  }
                />
              </div>

              <div className='col-md-4' data-test-id='Phone'>
                <InputField
                  name='cao_fax'
                  placeholder='Fax'
                  // id='contact-phone'
                  id='cao-contact-fax'
                  format={formatPhone}
                  value={protegeAgreement && protegeAgreement['cao_fax']}
                  min={10}
                  disabled={
                    protegeAgreementData
                  }
                />
              </div>
              <div className='col-md-4' data-test-id='Phone'>
                <InputField
                  name='cao_tel'
                  placeholder='Phone'
                  id='cao-contact-phone'
                  format={formatPhone}
                  required={true}
                  value={protegeAgreement && protegeAgreement['cao_tel']}
                  min={10}
                  disabled={
                    protegeAgreementData
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
            Protégé Company Authorized Signee
          </h3>
          <p className='txt-small-italic mt-2'>
            Note: The authorized signee is someone from your company responsible
            for reviewing the agreement filled by you and the Mentor before the
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
                className='col-md-12'
                data-test-id='Protege Firm Participated'
              >
                <OptionField
                  name='protege_signee_poc'
                  placeholder='Protege Firm Participated'
                  options={signeePocOptions}
                  value={
                    protegeAgreement && protegeAgreement['protege_signee_poc']
                  }
                  required={true}
                  submitted={submitted}
                  disabled={
                    protegeAgreementData
                  }
                  onKeyDown={keydownHandler}
                />
              </div>
            </div>
            {protegeAgreement && protegeAgreement['protege_signee_poc'] !== "new_protege_signee_poc" && <div className='mt-3 p-2 border'>
              <div className='row'>
                <div className='col-md-2 bold-label'>Name</div>
                <div className='col-md-1'>:</div>
                <div className='col-md-8'>
                  {protegeAgreement &&
                    `${protegeAgreement['mpp_contact_first_name']}  ${protegeAgreement['mpp_contact_last_name']}`}
                </div>
              </div>

              <div className='row'>
                <div className='col-md-2 bold-label'>Title</div>
                <div className='col-md-1'>:</div>
                <div className='col-md-8'>
                  {protegeAgreement && protegeAgreement['mpp_contact_title']}
                </div>
              </div>

              <div className='row'>
                <div className='col-md-2 bold-label'>Address</div>
                <div className='col-md-1'>:</div>
                <div className='col-md-8'>
                  {protegeAgreement &&
                    `${protegeAgreement['mpp_contact_address']}
                  ${protegeAgreement && protegeAgreement['mpp_contact_city']}
                  ${protegeAgreement && protegeAgreement['mpp_contact_state']}, 
                  ${protegeAgreement && protegeAgreement['mpp_contact_zip']}`}
                </div>
              </div>

              <div className='row'>
                <div className='col-md-2 bold-label'>Telephone/ext.</div>
                <div className='col-md-1'>:</div>
                <div className='col-md-8'>
                  {protegeAgreement && protegeAgreement['mpp_contact_phone']
                    && formatPhone(protegeAgreement['mpp_contact_phone'])}
                </div>
              </div>

              <div className='row'>
                <div className='col-md-2 bold-label'>Email</div>
                <div className='col-md-1'>:</div>
                <div className='col-md-8'>
                  {protegeAgreement && protegeAgreement['mpp_contact_email']}
                </div>
              </div>
            </div>}
          </fieldset>
        </div>
      </div>

      <div className='row'>
        {protegeAgreement &&
          protegeAgreement['protege_signee_poc'] ===
          'new_protege_signee_poc' && (
            <div className='row col-md-12 mb-5 mt-4'>
              <div className='col-md-12'>
                <div className='row'>
                  <div
                    className='col-md-6'
                    data-test-id='dcma Primary Contact (Full Name)'
                  >
                    <InputField
                      name='signee_primary_contact'
                      placeholder='Primary Contact (Full Name)'
                      // id='dcma-primary-contact'
                      id='signee-primary-contact'
                      required={true}
                      value={
                        protegeAgreement &&
                        protegeAgreement['signee_primary_contact']
                      }
                      disabled={
                        protegeAgreementData
                      }
                    />
                  </div>
                  <div className='col-md-6' data-test-id='dcma Title'>
                    <InputField
                      name='signee_contact_title'
                      placeholder='Title'
                      // id='dcma-contact-title'
                      id='signee-contact-title'
                      required={true}
                      value={
                        protegeAgreement &&
                        protegeAgreement['signee_contact_title']
                      }
                      disabled={
                        protegeAgreementData
                      }
                    />
                  </div>
                </div>
                <fieldset>
                  <legend className='sr-only'>Address</legend>
                  <div className='row'>
                    <div className='col-md-12' data-test-id='dcma Address'>
                      <InputField
                        name='signee_contact_address'
                        placeholder='Address'
                        // id='dcma-contact-address'
                        id='signee-contact-address'
                        required={true}
                        value={
                          protegeAgreement &&
                          protegeAgreement['signee_contact_address']
                        }
                        disabled={
                          protegeAgreementData
                        }
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6' data-test-id='dcma City'>
                      <InputField
                        name='signee_contact_city'
                        placeholder='City'
                        // id='dcma-contact-city'
                        id='signee-contact-city'
                        required={true}
                        value={
                          protegeAgreement &&
                          protegeAgreement['signee_contact_city']
                        }
                        disabled={
                          protegeAgreementData
                        }
                      />
                    </div>
                    <div className='col-md-3' data-test-id='dcma State'>
                      <SelectField
                        name='signee_contact_state'
                        placeholder='State'
                        // id='dcma_contact-state'
                        id='signee-contact-state'
                        required={true}
                        options={stateOptions}
                        value={
                          protegeAgreement &&
                          protegeAgreement['signee_contact_state']
                        }
                        disabled={
                          protegeAgreementData
                        }
                        defaultValue='State'
                      />
                    </div>
                    <div className='col-md-3' data-test-id='dcma Zip'>
                      <InputField
                        name='signee_contact_zip'
                        placeholder='Zip'
                        format={formatZip}
                        // id='dcma-contact-zip'
                        id='signee-contact-zip'
                        required={true}
                        value={
                          protegeAgreement &&
                          protegeAgreement['signee_contact_zip']
                        }
                        disabled={
                          protegeAgreementData
                        }
                        min={5}
                      />
                    </div>
                  </div>
                </fieldset>
                <div className='row'>
                  <div className='col-md-4' data-test-id='dcma Email'>
                    <InputField
                      name='signee_contact_email'
                      placeholder='Email'
                      // id='dcma-contact-email'
                      id='signee-contact-email'
                      required={true}
                      value={
                        protegeAgreement &&
                        protegeAgreement['signee_contact_email']
                      }
                      disabled={
                        protegeAgreementData
                      }
                      validation={validateEmail}
                    />
                  </div>

                  <div className='col-md-4' data-test-id='dcma Phone'>
                    <InputField
                      name='signee_contact_fax'
                      placeholder='Fax'
                      id='signee_contact_fax'
                      format={formatPhone}
                      value={
                        protegeAgreement &&
                        protegeAgreement['signee_contact_fax']
                      }
                      disabled={
                        protegeAgreementData
                      }
                      min={10}
                    />
                  </div>

                  <div className='col-md-4' data-test-id='dcma Phone'>
                    <InputField
                      name='signee_contact_phone'
                      placeholder='Phone'
                      id='signee_contact_phone'
                      format={formatPhone}
                      required={true}
                      value={
                        protegeAgreement &&
                        protegeAgreement['signee_contact_phone']
                      }
                      disabled={
                        protegeAgreementData
                      }
                      min={10}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default PointOfContact
