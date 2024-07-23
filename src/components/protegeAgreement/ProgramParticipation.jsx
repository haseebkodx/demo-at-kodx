import React from 'react'
import InputField from '../commonComponents/forms/InputField'
import OptionField from '../commonComponents/forms/OptionField'
import SelectField from '../commonComponents/forms/SelectField'
import InputDatePicker from '../commonComponents/forms/InputDatePickert'
import { keydownHandler } from '../commonComponents/utility'

function ProgramParticipation({
  protegeAgreement,
  mentorProtegeAgrStatus,
  submitted,
  protegeAgreementData,
  reviewer = true,
  // showErrorProtegeFirmParticipation,
  // showErrorAgreementType,
  // showErrorHybrid,
  // showErrorDirectReimbursement,
}) {
  const protegeParticipationOptions = [
    {
      name: 'Protege Participated',
      label: 'Yes',
      value: 'true',
      id: 'Yes',
    },
    {
      name: 'Protege Participated',
      label: 'No',
      value: 'false',
      id: 'No',
    },
  ]

  const getMonths = () => {
    let numOfMonths = []
    for (let i = 1; i <= 36; i++) {
      numOfMonths.push({ abbreviation: i, name: i })
    }
    return numOfMonths
  }

  const agreementOptions = [
    {
      name: 'Agreement Type',
      label: 'Credit (DCMA only)',
      value: 'Credit DCMA',
      id: 'credit',
    },
    {
      name: 'Agreement Type',
      label: 'Hybrid',
      value: 'Hybrid',
      id: 'hybrid',
    },
    {
      name: 'Agreement Type',
      label: 'Direct Reimbursement',
      value: 'Direct Reimbursement',
      id: 'direct',
    },
  ]

  const agencyOptionsHybrid = [
    {
      name: 'agency type',
      label: 'Army + DCMA',
      value: 'Army + DCMA',
      id: 'army',
    },
    {
      name: 'Agreement Type',
      label: 'DIA + DCMA',
      value: 'DIA + DCMA',
      id: 'dia',
    },
    {
      name: 'Agreement Type',
      label: 'DLA + DCMA',
      value: 'DLA + DCMA',
      id: 'dla',
    },

    {
      name: 'agency type',
      label: 'MDA + DCMA',
      value: 'MDA + DCMA',
      id: 'mda',
    },
    {
      name: 'Agreement Type',
      label: 'SOCOM + DCMA',
      value: 'SOCOM + DCMA',
      id: 'socom',
    },
    {
      name: 'Agreement Type',
      label: 'NGA + DCMA',
      value: 'NGA + DCMA',
      id: 'nga',
    },

    {
      name: 'agency type',
      label: 'Navy + DCMA',
      value: 'Navy + DCMA',
      id: 'navy',
    },
    {
      name: 'Agreement Type',
      label: 'Airforce + DCMA',
      value: 'Airforce + DCMA',
      id: 'airforce',
    },
  ]

  const agencyOptionsDirect = [
    {
      name: 'agency type',
      label: 'Army',
      value: 'Army',
      id: 'army',
    },
    {
      name: 'Agreement Type',
      label: 'DIA',
      value: 'DIA',
      id: 'dia',
    },
    {
      name: 'Agreement Type',
      label: 'DLA',
      value: 'DLA',
      id: 'dla',
    },

    {
      name: 'agency type',
      label: 'MDA',
      value: 'MDA',
      id: 'mda',
    },
    {
      name: 'Agreement Type',
      label: 'SOCOM',
      value: 'SOCOM',
      id: 'socom',
    },
    {
      name: 'Agreement Type',
      label: 'NGA',
      value: 'NGA',
      id: 'nga',
    },

    {
      name: 'agency type',
      label: 'Navy',
      value: 'Navy',
      id: 'navy',
    },
    {
      name: 'Agreement Type',
      label: 'Airforce',
      value: 'Airforce',
      id: 'airforce',
    },
  ]

  const direcOrHybrid =
    protegeAgreement &&
    (protegeAgreement.credit_direct_reimbursed === 'Hybrid' ||
      protegeAgreement.credit_direct_reimbursed === 'Direct Reimbursement')

  return (
    <div className='col-md-12'>
      {reviewer && (
        <h2 className='page-title reviewer-section-title section-header'>
          Previous Program Participation
        </h2>
      )}
      <div className='row mb-3'>
        <div className='col-md-12'>
          <h3 className='agreement-sub-header mb-n2'>Previous Program Participation</h3>
        </div>
        <div
          className='col-md-12 mt-2'
          data-test-id='Protege Firm Participated'
        >
          <fieldset>
            <legend>
              <p className='left-align mb-1'>
                <span aria-hidden='true'>*</span>Has the Protégé Company previously
                participated in the DoD Mentor-Protégé Program?{' '}
                <span className='sr-only'>This is a required question.</span>
              </p>
            </legend>

            <OptionField
              name='protege_firm_participated'
              placeholder='Protege Firm Participated'
              options={protegeParticipationOptions}
              value={
                protegeAgreement &&
                protegeAgreement['protege_firm_participated']
              }
              required={true}
              submitted={submitted}
              disabled={
                protegeAgreementData
              }
              onKeyDown={keydownHandler}
            />
            {/* {showErrorProtegeFirmParticipation &&
            protegeAgreement &&
            !protegeAgreement['protege_firm_participated'] ? (
              <p className='erorr-red'>This is a required question.</p>
            ) : null} */}
          </fieldset>
        </div>
      </div>
      {((protegeAgreement &&
        protegeAgreement['protege_firm_participated'] === 'true') ||
        (protegeAgreementData &&
          protegeAgreementData['protege_firm_participated'] === 'true')) && (
          <div>
            <div className='row mb-1'>
              <div className='col-md-12'>
                <h3 className='agreement-sub-header mb-n2'>
                  Participation Details
              </h3>
              </div>
              <div className='col-md-11 mt-2'>
                <p className='left-align'>
                  <legend>
                    Provide a statement(separate enclosure to this agreement) that there
                    will be no duplicate of effort (i.e, development assistance
                    provided by the mentor company) previously provided to protégé
                    company under prior agreements. This must be agreed upon and
                    presented on letterhead from both the mentor and protégé
                    companys.
                </legend>
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <h3 className='agreement-sub-header mb-n2'>
                  Previous Mentor Company Name
              </h3>
              </div>
              <div className='col-md-6 mt-2' data-test-id=''>
                <InputField
                  name='prev_mentor_firm_name'
                  placeholder='Previous Mentor Company Name'
                  id='prev-mentor-firm-name'
                  required={true}
                  value={
                    protegeAgreement && protegeAgreement['prev_mentor_firm_name']
                  }
                  disabled={
                    protegeAgreementData
                  }
                />
              </div>
            </div>

            <div className='row ml-1 my-2'>
              <h3 className='agreement-sub-header mb-n2'>Agreement Details</h3>
            </div>
            <fieldset>
              <legend>
                <p className='mb-1'>
                  <span aria-hidden='true'>*</span>1: Select the agreement type
                that applies:{' '}
                  <span className='sr-only'>You must select one option.</span>
                </p>
              </legend>
              <OptionField
                name='credit_direct_reimbursed'
                placeholder='Agreement Type'
                required={true}
                options={agreementOptions}
                value={
                  protegeAgreement && protegeAgreement['credit_direct_reimbursed']
                }
                submitted={submitted}
                disabled={
                  protegeAgreementData
                }
                onKeyDown={keydownHandler}
              />
              {/* {showErrorAgreementType &&
            protegeAgreement &&
            protegeAgreement['protege_firm_participated'] === 'true' &&
            !protegeAgreement['credit_direct_reimbursed'] ? (
              <p className='erorr-red'>You must select one option.</p>
            ) : null} */}
            </fieldset>

            <fieldset>
              <legend>
                {direcOrHybrid && (
                  <p className='mt-3 mb-1' data-test-id='DCMA'>
                    <span aria-hidden='true'>*</span>2: Select the Agency/Dept.{' '}
                    <span className='sr-only'>You must select one option.</span>
                  </p>
                )}
              </legend>
              {protegeAgreement &&
                protegeAgreement.credit_direct_reimbursed === 'Hybrid' && (
                  <div data-test-id='Sponsoring Military Dept./Agency'>
                    <OptionField
                      name='sponsoring_military_dept_agency'
                      placeholder='Agreement dept'
                      required={true}
                      options={agencyOptionsHybrid}
                      value={
                        protegeAgreement &&
                        protegeAgreement['sponsoring_military_dept_agency']
                      }
                      submitted={submitted}
                      disabled={
                        protegeAgreementData
                      }
                      onKeyDown={keydownHandler}
                    />
                    {/* {showErrorHybrid &&
                  protegeAgreement &&
                  protegeAgreement['protege_firm_participated'] === 'true' &&
                  protegeAgreement['credit_direct_reimbursed'] === 'Hybrid' &&
                  !protegeAgreement['sponsoring_military_dept_agency'] ? (
                    <p className='erorr-red'>You must select one option.</p>
                  ) : null} */}
                  </div>
                )}
              {protegeAgreement &&
                protegeAgreement.credit_direct_reimbursed ===
                'Direct Reimbursement' && (
                  <div>
                    <OptionField
                      name='sponsoring_military_dept_agency'
                      placeholder='agency type'
                      required={true}
                      options={agencyOptionsDirect}
                      value={
                        protegeAgreement &&
                        protegeAgreement['sponsoring_military_dept_agency']
                      }
                      submitted={submitted}
                      disabled={
                        protegeAgreementData
                      }
                      onKeyDown={keydownHandler}
                    />
                    {/* {showErrorDirectReimbursement &&
                  protegeAgreement &&
                  protegeAgreement['protege_firm_participated'] === 'true' &&
                  protegeAgreement['credit_direct_reimbursed'] ===
                    'Direct Reimbursement' &&
                  !protegeAgreement['sponsoring_military_dept_agency'] ? (
                    <p className='erorr-red'>You must select one option.</p>
                  ) : null} */}
                  </div>
                )}
            </fieldset>
            <div className='row mt-3'>
              <div className='col-md-12'>
                <h3 className='agreement-sub-header mb-n2'>
                  Period of performance of previous agreement
              </h3>
              </div>
              <div
                className='col-md-12 mt-2'
                data-test-id='Period of performance of previous agreement'
              >
                <label htmlFor='period-of-prev-agreement' className='mb-n4'>
                  <span aria-hidden='true'>*</span>Period of Performance of
                previous agreement in months
              </label>
                <div className='col-md-2 ml-n3'>
                  <SelectField
                    name='period_of_prev_agreement'
                    placeholder='Period of Performance'
                    label={'no-show'}
                    // id='contact-state'
                    id='period-of-prev-agreement'
                    required={true}
                    options={getMonths()}
                    value={
                      protegeAgreement &&
                      protegeAgreement['period_of_prev_agreement']
                    }
                    defaultValue=''
                    disabled={
                      protegeAgreementData
                    }
                  />
                </div>
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col-md-12'>
                <h3 className='agreement-sub-header mb-n2'>Termination Date</h3>
              </div>

              <div className='col-md-12 mt-3'>
                <p>Termination Date (Optional)</p>
              </div>
              <div className='col-md-2 mt-n1' data-test-id='Termination Date'>
                <span>Example: 11/15/2021</span>
                <InputDatePicker
                  name='termination_date'
                  value={protegeAgreement && protegeAgreement['termination_date']}
                  disabled={
                    protegeAgreementData
                  }
                  clearAriaLabel={'termination_date'}
                  calendarAriaLabel={'termination_date'}
                  maxDate={new Date(4102349083000)}
                />
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col-md-12'>
                <h3 className='agreement-sub-header mb-n2'>Termination Reason</h3>
              </div>
              <div className='col-md-6 mt-2' data-test-id='Termination Reason'>
                <InputField
                  name='termination_reason'
                  type='textarea'
                  placeholder='Termination Reason'
                  rows={2}
                  id='termination-reason'
                  value={
                    protegeAgreement && protegeAgreement['termination_reason']
                  }
                  disabled={
                    protegeAgreementData
                  }
                />
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default ProgramParticipation
