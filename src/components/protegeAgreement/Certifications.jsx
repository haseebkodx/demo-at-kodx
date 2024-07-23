import React from 'react'
import OptionField from '../../components/commonComponents/forms/OptionField'
import formatDate from '../../helpers/formatter/formatDate'
import InputCheckbox from '../commonComponents/forms/InputCheckbox'
import InputDatePicker from '../commonComponents/forms/InputDatePickert'
import InputField from '../commonComponents/forms/InputField'
import { keydownHandler } from '../commonComponents/utility'

function Certifications({
  protegeAgreement,
  mentorProtegeAgrStatus,
  checkFieldError,
  submitted,
  protegeAgreementData,
  reviewer = true,
}) {
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

  const getCheckFieldError = () => {
    return protegeAgreement &&
      ((protegeAgreement['sba_8a'] &&
        protegeAgreement['sba_8a'].toString() === 'true') ||
        (protegeAgreement['sba_hz'] &&
          protegeAgreement['sba_hz'].toString() === 'true') ||
        (protegeAgreement['sba_vosb'] &&
          protegeAgreement['sba_vosb'].toString() === 'true') ||
        (protegeAgreement['sba_wosb'] &&
          protegeAgreement['sba_wosb'].toString() === 'true') ||
        (protegeAgreement['sba_sde'] &&
          protegeAgreement['sba_sde'].toString() === 'true') ||
        (protegeAgreement['sba_sdb'] &&
          protegeAgreement['sba_sdb'].toString() === 'true') ||
        (protegeAgreement['sba_nog'] &&
          protegeAgreement['sba_nog'].toString() === 'true'))
      ? false
      : true
  }
  return (
    <div className='col-md-12'>
      {reviewer && (
        <h1 className='page-title reviewer-section-title section-header'>Certifications</h1>
      )}
      <div className='row mb-4'>
        <div className='col-md-12' data-test-id='Certified Small Business'>
          <fieldset>
            <legend>
              <div className='left-align mt-2 mb-n2'>
                <span aria-hidden='true'>*</span>Is your Company Certified as
                an SBA small Disadvantaged Business? <br />
                <p className='sub-detail'>
                  (Women-Owned, HUBZone, Veteran Owned)
                </p>{' '}
                <span className='sr-only'>This is a required question.</span>
              </div>
            </legend>
            <OptionField
              name='certified_small_business'
              placeholder='Certified Small Business'
              options={certificationOptions}
              value={
                protegeAgreement && protegeAgreement['certified_small_business']
              }
              submitted={submitted}
              required={true}
              disabled={protegeAgreementData}
              onKeyDown={keydownHandler}
            />
          </fieldset>
        </div>

        {protegeAgreement && protegeAgreement['certified_small_business']
          && protegeAgreement['certified_small_business'].toString() === 'false'
          && <div className='mb-2 mt-4 ml-3' data-test-id='Historical Background'>
            <InputField
              name='sba_cgp'
              type='textarea'
              placeholder='Please provide a description of the goods/services your company provides that
               are critical to enhancing the DOD supplier base'
              id='sba-cgp'
              required={true}
              value={
                protegeAgreement &&
                protegeAgreement['sba_cgp']
              }
              rows='3'
              errorMessage='This field is required'
              disabled={
                protegeAgreementData
              }
            />
          </div>}

      </div>
      {((protegeAgreement &&
        protegeAgreement['certified_small_business'] === 'true') ||
        (protegeAgreementData &&
          protegeAgreementData['certified_small_business'] === 'true')) && (
          <div
            className='row'
            data-test-id='Small Disadvantaged Business Details'
          >
            <div className='col-md-12 mt-2'>
              <fieldset>
                <legend>
                  <p className='left-align mb-n1'>
                    <span aria-hidden='true'>*</span>Check all that apply to your
                  company:{' '}
                    <span className='sr-only'>You must select at least one option.</span>
                  </p>
                </legend>

                <InputCheckbox
                  name='sba_sdb'
                  placeholder='Small Disadvantaged Business (SDB)'
                  value={protegeAgreement && protegeAgreement['sba_sdb']}
                  label={`Small Disadvantaged Business (SDB)`}
                  id={`Small Disadvantaged Business (SDB)`}
                  view={protegeAgreementData}
                  disabled={protegeAgreementData && mentorProtegeAgrStatus !== 'declined'}
                  checked={
                    protegeAgreementData &&
                      protegeAgreementData['sba_sdb'] &&
                      protegeAgreementData['sba_sdb'].toString() === 'sba_sdb'
                      ? true
                      : protegeAgreement &&
                        protegeAgreement['sba_sdb'] &&
                        protegeAgreement['sba_sdb'].toString() === 'true'
                        ? true
                        : false
                  }
                  onKeyDown={keydownHandler}
                />

                <InputCheckbox
                  name='sba_sde'
                  placeholder='A business employing the severely disabled '
                  value={protegeAgreement && protegeAgreement['sba_sde']}
                  label={`A business employing the severely disabled`}
                  id={`A business employing the severely disabled`}
                  view={protegeAgreementData}
                  disabled={protegeAgreementData}
                  checked={
                    protegeAgreementData &&
                      protegeAgreementData['sba_sde'] &&
                      protegeAgreementData['sba_sde'].toString() === 'true'
                      ? true
                      : protegeAgreement &&
                        protegeAgreement['sba_sde'] &&
                        protegeAgreement['sba_sde'].toString() === 'true'
                        ? true
                        : false
                  }
                  onKeyDown={keydownHandler}
                />

                <InputCheckbox
                  name='sba_wosb'
                  placeholder='Reporting Requirements'
                  value={protegeAgreement && protegeAgreement['sba_wosb']}
                  label={`Women-Owned Small Business (WOSB)`}
                  id={`Women-Owned Small Business (WOSB)`}
                  view={protegeAgreementData}
                  checked={
                    protegeAgreementData &&
                      protegeAgreementData['sba_wosb'] &&
                      protegeAgreementData['sba_wosb'].toString() === 'true'
                      ? true
                      : protegeAgreement &&
                        protegeAgreement['sba_wosb'] &&
                        protegeAgreement['sba_wosb'].toString() === 'true'
                        ? true
                        : false
                  }
                  disabled={protegeAgreementData && mentorProtegeAgrStatus !== 'declined'}
                  onKeyDown={keydownHandler}
                />

                {/* <InputCheckbox
                  name='sba_cgp'
                  placeholder='An entity providing goods/services in private sector critical to enhancing DoD supplier base'
                  value={protegeAgreement && protegeAgreement['sba_cgp']}
                  label={`An entity providing goods/services in private sector critical to enhancing DoD supplier base`}
                  id={`An entity providing goods/services in private sector critical to enhancing DoD supplier base`}
                  view={protegeAgreementData}
                  checked={
                    protegeAgreementData &&
                      protegeAgreementData['sba_cgp'] &&
                      protegeAgreementData['sba_cgp'].toString() === 'true'
                      ? true
                      : protegeAgreement &&
                        protegeAgreement['sba_cgp'] &&
                        protegeAgreement['sba_cgp'].toString() === 'true'
                        ? true
                        : false
                  }
                  disabled={protegeAgreementData && mentorProtegeAgrStatus !== 'declined'}
                  onKeyDown={keydownHandler}
                /> */}

                <InputCheckbox
                  name='sba_hz'
                  placeholder='HUBZone Small Business(HUBZone)`'
                  value={protegeAgreement && protegeAgreement['sba_hz']}
                  label={`HUBZone small business(HUBZone)`}
                  id={`HUBZone small business(HUBZone)`}
                  view={protegeAgreementData}
                  checked={
                    protegeAgreementData &&
                      protegeAgreementData['sba_hz'] &&
                      protegeAgreementData['sba_hz'].toString() === 'true'
                      ? true
                      : protegeAgreement &&
                        protegeAgreement['sba_hz'] &&
                        protegeAgreement['sba_hz'].toString() === 'true'
                        ? true
                        : false
                  }
                  disabled={protegeAgreementData && mentorProtegeAgrStatus !== 'declined'}
                  onKeyDown={keydownHandler}
                />

                <InputCheckbox
                  name='sba_nog'
                  placeholder='A business owned and controlled by a Native Organization'
                  value={protegeAgreement && protegeAgreement['sba_nog']}
                  label={`A business owned and controlled by a Native Organization`}
                  id={`A business owned and controlled by a Native Organization`}
                  view={protegeAgreementData}
                  checked={
                    protegeAgreementData &&
                      protegeAgreementData['sba_nog'] &&
                      protegeAgreementData['sba_nog'].toString() === 'true'
                      ? true
                      : protegeAgreement &&
                        protegeAgreement['sba_nog'] &&
                        protegeAgreement['sba_nog'].toString() === 'true'
                        ? true
                        : false
                  }
                  disabled={protegeAgreementData && mentorProtegeAgrStatus !== 'declined'}
                  onKeyDown={keydownHandler}
                />

                <InputCheckbox
                  name='sba_vosb'
                  placeholder='Service-Disabled Veteran-Owned Small Business (SDVOSB)'
                  value={protegeAgreement && protegeAgreement['sba_vosb']}
                  label={`Service-Disabled Veteran-Owned Small Business (SDVOSB)`}
                  id={`Service-Disabled Veteran-Owned Small Business (SDVOSB)`}
                  view={protegeAgreementData}
                  checked={
                    protegeAgreementData &&
                      protegeAgreementData['sba_vosb'] &&
                      protegeAgreementData['sba_vosb'].toString() === 'true'
                      ? true
                      : protegeAgreement &&
                        protegeAgreement['sba_vosb'] &&
                        protegeAgreement['sba_vosb'].toString() === 'true'
                        ? true
                        : false
                  }
                  disabled={protegeAgreementData && mentorProtegeAgrStatus !== 'declined'}
                  onKeyDown={keydownHandler}
                />

                <InputCheckbox
                  name='sba_8a'
                  placeholder='8(a) program'
                  value={protegeAgreement && protegeAgreement['sba_8a']}
                  label={`8(a) program`}
                  id={`8(a) program`}
                  view={protegeAgreementData}
                  checked={
                    protegeAgreementData &&
                      protegeAgreementData['sba_8a'] &&
                      protegeAgreementData['sba_8a'].toString() === 'sba_8a'
                      ? true
                      : protegeAgreement &&
                        protegeAgreement['sba_8a'] &&
                        protegeAgreement['sba_8a'].toString() === 'true'
                        ? true
                        : false
                  }
                  disabled={protegeAgreementData && mentorProtegeAgrStatus !== 'declined'}
                  onKeyDown={keydownHandler}
                />
              </fieldset>

              {getCheckFieldError() && (
                <div className='erorr-red'>
                  You must select at least one option if your company is certified
                  as SBA
                </div>
              )}
              {/* sba_wosb(pin):"true"
              sba_vosb(pin):"true"
              sba_hz(pin):"true"
              sba_asmp(pin):"false"
              sba_8a(p */}
              {/* {smallDisadvantagedBusinessDetails && smallDisadvantagedBusinessDetails.map((item, idx) => {
              return (
                <div key={idx}>
                  <input
                    className="mr-2"
                    type="checkbox"
                    id={item.name}
                    name={item.name}
                    checked={protegeAgreementData ? protegeAgreementData[item.name] === 'true' : protegeAgreement && protegeAgreement[item.name] === 'true' ? protegeAgreement[item.name] : item.value}
                    onChange={() => handleChangeCheckbox(idx)}
                    disabled={protegeAgreementData && protegeAgreementData['protege_arg_status'] === 'complete'}
                  />
                  <label>{item.label}</label>
                </div>
              )
            })} */}
              {protegeAgreement &&
                protegeAgreement['sba_8a'] &&
                protegeAgreement['sba_8a'].toString() === 'true' && (
                  // && <div><InputField
                  //   name='8a_graduated_date'
                  //   placeholder='Date Graduated'
                  //   id='8a-graduated-date'
                  //   required={true}
                  //   format={formatDate}
                  //   min={10}
                  //   value={protegeAgreement && protegeAgreement['8a_graduated_date']}
                  //   disabled={protegeAgreementData}
                  // />
                  // </div>
                  <>
                    <label>8(a) graduated program Date (Optional)</label>
                    <div>
                      <InputDatePicker
                        name='sba_8a_graduated_date'
                        value={
                          protegeAgreement &&
                          protegeAgreement['sba_8a_graduated_date']
                        }
                        disabled={protegeAgreementData && mentorProtegeAgrStatus !== 'declined'}
                        clearAriaLabel={'8a_graduated_date'}
                        calendarAriaLabel={'8a_graduated_date'}
                        maxDate={new Date(4102349083000)}
                      />
                    </div>
                  </>
                )}
            </div>
          </div>
        )}
    </div>
  )
}
export default Certifications
