import React from 'react'
import OptionField from '../../../components/commonComponents/forms/OptionField'
import InputField from '../../../components/commonComponents/forms/InputField'
import { keydownHandler } from '../../commonComponents/utility'

function AgreementDetails({
  completeMentorAgreement,
  mentorAgreement,
  submitted = false,
  reviewer = true
}) {
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

  const tehchologiesOptions = [
    {
      name: 'Technology Areas',
      label: 'Manufacturing',
      value: 'Manufacturing',
      id: 'manufacturing',
    },
    {
      name: 'Technology Areas',
      label: 'Research and Development',
      value: 'Research and Development',
      id: 'rnd',
    },
    {
      name: 'Technology Areas',
      label: 'Knowledge Based services',
      value: 'Knowledge Based services',
      id: 'kns',
    },
    {
      name: 'Technology Areas',
      label: 'Other',
      value: 'Other',
      id: 'other',
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

  const creditHybrid =
    mentorAgreement &&
    (mentorAgreement.agreement_type === 'Hybrid' ||
      mentorAgreement.agreement_type === 'Credit DCMA')
  const hybridDirect =
    mentorAgreement &&
    (mentorAgreement.agreement_type === 'Hybrid' ||
      mentorAgreement.agreement_type === 'Direct Reimbursement')
  return (
    <div className='col-md-12'>
      <h2 className={`page-title ${reviewer && 'reviewer-section-title'} section-header`}>
        Agreement Details
      </h2>
      <fieldset>
        <legend>
          <p className='mr-5 mt-2' data-test-id='agreement_type'>
            <span aria-hidden='true'>*</span>Select the agreement type
            <span className='sr-only'>You must select one option.</span>
          </p>
        </legend>

        <OptionField
          name='agreement_type'
          placeholder='Agreement Type'
          required={true}
          options={agreementOptions}
          value={mentorAgreement && mentorAgreement['agreement_type']}
          submitted={submitted}
          disabled={completeMentorAgreement}
          onKeyDown={keydownHandler}
        />

      </fieldset>

      <fieldset>
        <legend>
          {hybridDirect && (
            <p className='mt-3' data-test-id='DCMA'>
              <span aria-hidden='true'>*</span>Select the Agency/Dept.{' '}
              <span className='sr-only'>You must select one option.</span>
            </p>
          )}
        </legend>
        {mentorAgreement &&
          (mentorAgreement.agreement_type === 'Hybrid' ||
            mentorAgreement.agreement_type === 'Direct Reimbursement') && (
            <div>
              <OptionField
                name='agency_dept'
                placeholder='Agreement dept'
                options={
                  mentorAgreement && mentorAgreement.agreement_type === 'Hybrid'
                    ? agencyOptionsHybrid
                    : agencyOptionsDirect
                }
                value={mentorAgreement && mentorAgreement['agency_dept']}
                submitted={submitted}
                required={true}
                disabled={completeMentorAgreement}
                onKeyDown={keydownHandler}
              />

            </div>
          )}
      </fieldset>

      <fieldset>
        <legend>
          <p className='mr-5 mt-2' data-test-id='agreement_type'>
            <span aria-hidden='true'>*</span>Please identify the technology focus area for this agreement:
            <span className='sr-only'>You must select one option.</span>
          </p>
        </legend>

        <OptionField
          name='tech_focus'
          placeholder='Tech Focus'
          required={true}
          options={tehchologiesOptions}
          value={mentorAgreement && mentorAgreement['tech_focus']}
          submitted={submitted}
          disabled={completeMentorAgreement}
          onKeyDown={keydownHandler}
        />
      </fieldset>

      {mentorAgreement && mentorAgreement['tech_focus'] && mentorAgreement['tech_focus'] === 'Other'
        && <div className='row mt-3'>
          <div className='col-md-6' data-test-id='agreement_contact'>
            <InputField
              name='tech_focus_other_text'
              id='agreement-contact'
              placeholder={'Please Idendtiy Technology Area'}
              required={mentorAgreement && mentorAgreement['tech_focus'] && mentorAgreement['tech_focus'] === 'Other'
                ? true : false}
              value={(mentorAgreement && mentorAgreement['tech_focus_other_text']) || ''}
              disabled={completeMentorAgreement}
            />
          </div>
        </div>}

      <div className='row mt-3'>
        <div className='col-md-6' data-test-id='agreement_contact'>
          <InputField
            name='agreement_contact'
            id='agreement-contact'
            placeholder={`${creditHybrid ? '' : ''}Contract Number`}
            required={creditHybrid ? true : false}
            value={(mentorAgreement && mentorAgreement['agreement_contact']) || ''}
            disabled={completeMentorAgreement}
          />
        </div>
      </div>
      <div className='row mt-2'>
        <div className='col-md-6' data-test-id='solicitation_title'>
          <InputField
            name='solicitation_title'
            id='solicitation-title'
            placeholder={'Solicitation Title'}
            value={(mentorAgreement && mentorAgreement['solicitation_title']) || ''}
            disabled={completeMentorAgreement}
          />
        </div>
      </div>

    </div>
  )
}

export default AgreementDetails
