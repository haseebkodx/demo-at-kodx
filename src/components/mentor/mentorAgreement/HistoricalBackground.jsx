import React, { useEffect } from 'react'
import OptionField from '../../commonComponents/forms/OptionField'
import InputField from '../../commonComponents/forms/InputField'
import formatDate from '../../../helpers/formatter/formatDate'
import FileUploadComponent from '../../multifileUpload/FileUploadComponent'
import { keydownHandler } from '../../commonComponents/utility'
import InputCheckbox from '../../commonComponents/forms/InputCheckbox'
import InputDatePicker from '../../commonComponents/forms/InputDatePickert'

function HistoricalBackground({
  mentorAgreement,
  reviewer = true,
  mentorAgreementData,
  historicalBackgroundFile,
  handleHistoricalFiles,
  noEditingFiles,
  latestMentorAgreementData,
  agreementId,
  completeMentorAgreement
}) {

  const SDB = [
    {
      name: 'was_small_disadvantaged_business',
      label: 'Yes',
      value: 'true',
      id: 'Yes_was_small_disadvantaged_business'
    },
    {
      name: 'was_small_disadvantaged_business',
      label: 'No',
      value: 'false',
      id: 'No_was_small_disadvantaged_business'
    }
  ]

  const WOSB = [
    {
      name: 'was_woman_owned_small_business',
      label: 'Yes',
      value: 'true',
      id: 'Yes_was_woman_owned_small_business'
    },
    {
      name: 'was_woman_owned_small_business',
      label: 'No',
      value: 'false',
      id: 'No_was_woman_owned_small_business'
    }
  ]
  const EightAProgram = [
    {
      name: 'company_graduated_8a_program',
      label: 'Yes',
      value: 'true',
      id: 'Yes_company_graduated_8a_program'
    },
    {
      name: 'company_graduated_8a_program',
      label: 'No',
      value: 'false',
      id: 'No_company_graduated_8a_program'
    }
  ]

  const mentorApp = mentorAgreement && mentorAgreement.mentor_app && mentorAgreement.mentor_app[0]

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
    return mentorApp &&
      ((mentorApp['sba_8a'] &&
        mentorApp['sba_8a'].toString() === 'true') ||
        (mentorApp['sba_hz'] &&
          mentorApp['sba_hz'].toString() === 'true') ||
        (mentorApp['sba_vosb'] &&
          mentorApp['sba_vosb'].toString() === 'true') ||
        (mentorApp['sba_wosb'] &&
          mentorApp['sba_wosb'].toString() === 'true') ||
        (mentorApp['sba_sde'] &&
          mentorApp['sba_sde'].toString() === 'true') ||
        (mentorApp['sba_sdb'] &&
          mentorApp['sba_sdb'].toString() === 'true') ||
        (mentorApp['sba_nog'] &&
          mentorApp['sba_nog'].toString() === 'true'))
      ? false
      : true
  }

  return (
    <div className='left-align col-md-12'>
      {reviewer ? (
        <h2 className={`page-title section-header ${reviewer && 'reviewer-section-title'}`}>
          Historical Background
        </h2>
      ) : (
        <div className='col-md-12'>
          <h4 className='form-section-title'>
            Historical <br className='d-none d-md-block' />
            Background
          </h4>
        </div>
      )}
      {/* <div>
        <div className='row mb-4'>
          <div className='col-12' data-test-id='SDB'>
            <p className="mb-3">Note: Some of the information below was provided during the Mentor Application and cannot be edited</p>
            <p className='mt-2'>
              <legend>
                Has your company ever been a small disadvantaged business (SDB)?
              </legend>
            </p>
            <OptionField
              name='was_small_disadvantaged_business'
              placeholder='SDB'
              required={true}
              options={SDB}
              value={
                mentorApp &&
                mentorApp['was_small_disadvantaged_business'].toString()
              }
              disabled={true}
            />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-12' data-test-id='WOSB'>
            <p>
              <legend>
                Has your company ever been a woman-owned small business (WOSB)?
              </legend>
            </p>
            <OptionField
              name='was_woman_owned_small_business'
              placeholder='WOSB'
              required={true}
              options={WOSB}
              value={
                mentorApp &&
                mentorApp['was_woman_owned_small_business'].toString()
              }
              disabled={true}
            />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-12' data-test-id='EightAProgram'>
            <p>
              <legend>Has your company graduated from the 8(a) program?</legend>
            </p>
            <OptionField
              name='company_graduated_8a_program'
              placeholder='EightAProgram'
              required={true}
              options={EightAProgram}
              value={
                mentorApp &&
                mentorApp['company_graduated_8a_program'].toString()
              }
              disabled={true}
            />
          </div>
        </div>
        <div
          className='col-12 col-lg-5 pln prn'
          data-test-id='Company Phone Number'
        >
          {((mentorAgreement &&
            mentorAgreement['company_graduated_8a_program'] === 'true') ||
            (mentorAgreementData &&
              mentorAgreementData['graduated_8a_program_on'])) && (
              <InputField
                name='graduated_8a_program_on'
                placeholder='Graduated 8(a) program on'
                id='eight-a-program-date'
                required={true}
                format={formatDate}
                value={
                  mentorApp && mentorApp['graduated_8a_program_on']
                    ? 'Yes'
                    : 'No'
                }
                disabled={true}
              />
            )}
        </div>
      </div> */}

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
              name='app_certified_small_business'
              placeholder='Certified Small Business'
              options={certificationOptions}
              value={
                mentorApp && mentorApp['app_certified_small_business']
              }
              submitted={''}
              required={true}
              disabled={true}
              onKeyDown={keydownHandler}
            />
          </fieldset>
        </div>

        {mentorApp && mentorApp['app_certified_small_business']
          && mentorApp['app_certified_small_business'].toString() === 'false'
          && <div className='mb-2 mt-4 ml-3' data-test-id='Historical Background'>
            <InputField
              name='sba_cgp'
              type='textarea'
              placeholder='Please provide a description of the goods/services your company provides that
               are critical to enhancing the DOD supplier base'
              id='sba-cgp'
              required={true}
              value={
                mentorApp &&
                mentorApp['sba_cgp']
              }
              rows='3'
              errorMessage='This field is required'
              disabled={
                true
              }
            />
          </div>}

      </div>
      {((mentorApp && mentorApp['app_certified_small_business'].toString() === 'true') ||
        (mentorAgreementData && mentorAgreementData['app_certified_small_business'].toString() === 'true')) && (
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
                  name='app_sba_sdb'
                  placeholder='Small Disadvantaged Business (SDB)'
                  value={mentorApp && mentorApp['app_sba_sdb']}
                  label={`Small Disadvantaged Business (SDB)`}
                  id={`Small Disadvantaged Business (SDB)`}
                  view={mentorAgreementData}
                  disabled={true}
                  checked={
                    mentorAgreementData &&
                      mentorAgreementData['app_sba_sdb'] &&
                      mentorAgreementData['app_sba_sdb'].toString() === 'sba_sdb'
                      ? true
                      : mentorApp &&
                        mentorApp['app_sba_sdb'] &&
                        mentorApp['app_sba_sdb'].toString() === 'true'
                        ? true
                        : false
                  }
                  onKeyDown={keydownHandler}
                />

                <InputCheckbox
                  name='app_sba_sde'
                  placeholder='A business employing the severely disabled '
                  value={mentorApp && mentorApp['app_sba_sde']}
                  label={`A business employing the severely disabled`}
                  id={`A business employing the severely disabled`}
                  view={mentorAgreementData}
                  disabled={true}
                  checked={
                    mentorAgreementData &&
                      mentorAgreementData['app_sba_sde'] &&
                      mentorAgreementData['app_sba_sde'].toString() === 'true'
                      ? true
                      : mentorApp &&
                        mentorApp['app_sba_sde'] &&
                        mentorApp['app_sba_sde'].toString() === 'true'
                        ? true
                        : false
                  }
                  onKeyDown={keydownHandler}
                />

                <InputCheckbox
                  name='app_sba_wosb'
                  placeholder='Reporting Requirements'
                  value={mentorApp && mentorApp['app_sba_wosb']}
                  label={`Women-Owned Small Business (WOSB)`}
                  id={`Women-Owned Small Business (WOSB)`}
                  view={mentorAgreementData}
                  checked={
                    mentorAgreementData &&
                      mentorAgreementData['app_sba_wosb'] &&
                      mentorAgreementData['app_sba_wosb'].toString() === 'true'
                      ? true
                      : mentorApp &&
                        mentorApp['app_sba_wosb'] &&
                        mentorApp['app_sba_wosb'].toString() === 'true'
                        ? true
                        : false
                  }
                  disabled={true}
                  onKeyDown={keydownHandler}
                />

                <InputCheckbox
                  name='app_sba_hz'
                  placeholder='HUBZone Small Business(HUBZone)`'
                  value={mentorApp && mentorApp['app_sba_hz']}
                  label={`HUBZone small business(HUBZone)`}
                  id={`HUBZone small business(HUBZone)`}
                  view={mentorAgreementData}
                  checked={
                    mentorAgreementData &&
                      mentorAgreementData['app_sba_hz'] &&
                      mentorAgreementData['app_sba_hz'].toString() === 'true'
                      ? true
                      : mentorApp &&
                        mentorApp['app_sba_hz'] &&
                        mentorApp['app_sba_hz'].toString() === 'true'
                        ? true
                        : false
                  }
                  disabled={true}
                  onKeyDown={keydownHandler}
                />

                <InputCheckbox
                  name='app_sba_nog'
                  placeholder='A business owned and controlled by a Native Organization'
                  value={mentorApp && mentorApp['app_sba_nog'] ? true : false}
                  label={`A business owned and controlled by a Native Organization`}
                  id={`A business owned and controlled by a Native Organization`}
                  view={mentorAgreementData}
                  checked={
                    mentorAgreementData &&
                      mentorAgreementData['app_sba_nog'] &&
                      mentorAgreementData['app_sba_nog'].toString() === 'true'
                      ? true
                      : mentorApp &&
                        mentorApp['app_sba_nog'] &&
                        mentorApp['app_sba_nog'].toString() === 'true'
                        ? true
                        : false
                  }
                  disabled={true}
                  onKeyDown={keydownHandler}
                />

                <InputCheckbox
                  name='app_sba_vosb'
                  placeholder='Service-Disabled Veteran-Owned Small Business (SDVOSB)'
                  value={mentorApp && mentorApp['app_sba_vosb'] ? true : false}
                  label={`Service-Disabled Veteran-Owned Small Business (SDVOSB)`}
                  id={`Service-Disabled Veteran-Owned Small Business (SDVOSB)`}
                  view={mentorAgreementData}
                  checked={
                    mentorAgreementData &&
                      mentorAgreementData['app_sba_vosb'] &&
                      mentorAgreementData['app_sba_vosb'].toString() === 'true'
                      ? true
                      : mentorApp &&
                        mentorApp['app_sba_vosb'] &&
                        mentorApp['app_sba_vosb'].toString() === 'true'
                        ? true
                        : false
                  }
                  disabled={true}
                  onKeyDown={keydownHandler}
                />

                <InputCheckbox
                  name='app_sba_8a'
                  placeholder='8(a) program'
                  value={mentorApp && mentorApp['app_sba_8a'] ? true : false}
                  label={`8(a) program`}
                  id={`8(a) program`}
                  view={mentorAgreementData}
                  checked={
                    mentorAgreementData &&
                      mentorAgreementData['app_sba_8a'] &&
                      mentorAgreementData['app_sba_8a'].toString() === 'sba_8a'
                      ? true
                      : mentorApp &&
                        mentorApp['app_sba_8a'] &&
                        mentorApp['app_sba_8a'].toString() === 'true'
                        ? true
                        : false
                  }
                  disabled={true}
                  onKeyDown={keydownHandler}
                />
              </fieldset>

              {/* {getCheckFieldError() && (
                <div className='erorr-red'>
                  You must select at least one option if your company is certified
                  as SBA
                </div>
              )} */}

              {mentorApp &&
                mentorApp['app_sba_8a'] &&
                mentorApp['app_sba_8a'].toString() === 'true' && (

                  <>
                    <label>8(a) graduated program Date (Optional)</label>
                    <div>
                      <InputDatePicker
                        name='app_sba_8a_graduated_date'
                        value={
                          mentorApp &&
                          mentorApp['app_sba_8a_graduated_date']
                        }
                        disabled={true}
                        clearAriaLabel={'app_8a_graduated_date'}
                        calendarAriaLabel={'app_8a_graduated_date'}
                        maxDate={new Date(4102349083000)}
                      />
                    </div>
                  </>
                )}
            </div>
          </div>
        )}

      <div className='mt-6'>

        <InputField
          name='app_sba_cgp'
          placeholder='Summary'
          type='textarea'
          id='historical-background-summary'
          required={true}
          value={
            mentorApp && mentorApp['app_sba_cgp'] !== null
              ? mentorApp['app_sba_cgp'] : mentorApp && mentorApp['app_sba_cgp']
                ? mentorApp['app_sba_cgp'] : null
          }
          disabled={true}
        />

        {mentorAgreement && mentorAgreement['historical_background_explanation'] !== null && (
            <div className='mt-2 mb-2'>
              <div className='col-md-12 p-0 my-2'>
                <h3 className='m-0 heading-text mentor-summary-section-heading'>Explanation</h3>
              </div>
              <div className='col-md-12 p-0 mt-2'>
                {mentorAgreement['historical_background_explanation']}
              </div>
            </div>
          )}

        <div className='row mb-4 mt-6 pt-6 pb-4'>
          <div className='col-md-12 pb-3 pt-6'>
            <h3 className='agreement-mini-sub-header mb-0'>
              Document Upload(s)
            </h3>

            <p>
              Any documents that were uploaded as part of the mentor application
              are shown below. You can provide additional files, or delete any
              existing files that you do not want to submit as part of this
              agreement.{' '}
            </p>
          </div>
          <div className='col-md-12 pb-4'>
            <p>
              Acceptable formats are: PDF, Word, or Excel. Maximum file size is
              5MB.
            </p>
          </div>
          <div className='col-md-12'>
            <FileUploadComponent
              agreement_type='mentor'
              field_name='historical_background'
              agreement_id={agreementId}
              handleUploadedFiles={handleHistoricalFiles}
              initialFiles={
                latestMentorAgreementData &&
                latestMentorAgreementData['historical_background']
              }
              reviewMode={noEditingFiles}
              fileUploadComponentAddBtnId={'mentor-agr-historical-background'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoricalBackground
