import React, { useState } from 'react'
import InputField from '../commonComponents/forms/InputField'
import { formatDollar, formatNumbers } from '../../helpers/formatter/format'
import SelectField from '../commonComponents/forms/SelectField'
import OptionField from '../commonComponents/forms/OptionField'
import InputCheckbox from '../commonComponents/forms/InputCheckbox'

function DoDContracts({
  protegeAgreement,
  mentorProtegeAgrStatus,
  protegeAgreementData,
  initialize,
  reviewer = true,
  submitted = false,
  // showErrorHasContracts,
}) {
  const [subContaractAwardNumber, useSubContaractAwardNumber] = useState(1)
  const [primeContaractAwardNumber, usePrimeContaractAwardNumber] = useState(1)
  const [fedSubContaractAwardNumber, useFedSubContaractAwardNumber] = useState(
    1
  )
  const [
    fedPrimeContaractAwardNumber,
    useFedPrimeContaractAwardNumber,
  ] = useState(1)

  const UpdatePrimeContaractAwardNumber = (number) => {
    usePrimeContaractAwardNumber(number)
  }

  const UpdatesubContaractAwardNumber = (number) => {
    useSubContaractAwardNumber(number)
  }

  const UpdateFedPrimeContaractAwardNumber = (number) => {
    useFedPrimeContaractAwardNumber(number)
  }

  const UpdateFedsubContaractAwardNumber = (number) => {
    useFedSubContaractAwardNumber(number)
  }

  const OnDelete = (
    fiscalYear,
    dollarAmount,
    contractValue,
    number,
    updateContaractAwardNumber
  ) => {
    initialize({
      ...protegeAgreement,
      [`${fiscalYear}2`]: null,
      [`${dollarAmount}2`]: null,
      [`${contractValue}2`]: null,
      [`${number}2`]: null,
    })
    updateContaractAwardNumber(1)
  }

  const certifiedContractsOptions = [
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

  const onKeydownHandler = e => {
    const keycode = e.key
    if (keycode === 'Enter') {
      e.currentTarget.click()
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const hadAwardedContracts = protegeAgreement &&
    protegeAgreement['has_awarded_contracts'] &&
    protegeAgreement['has_awarded_contracts'].toString() === 'true'

  return (
    <div id='dod-contracts' className='col-md-12'>
      {reviewer && (
        <h2 className='page-title reviewer-section-title section-header'>
          Mentor/Protégé Contracts
        </h2>
      )}
      <div className='row'>
        <div className='col-md-12 mb-2'>
          <h3 className='agreement-sub-header mb-0'>
            Protégé-Obtained Contract Awards
          </h3>
        </div>
        <div className='col-md-12' data-test-id='Certified Small Business'>
          <p className='left-align mb-0'>
            The number and total dollar amount of DoD subcontract awards
            obtained by the protege firm during two fiscal years(if any). Please
            note fiscal year here represent the government&apos;s fiscal year
            which run October 1 to through September 30.
          </p>
        </div>
      </div>

      <div className='row mb-4'>
        <div className='col-md-12' data-test-id='Certified Small Business'>
          <fieldset>
            <legend>
              <div className='left-align mt-2 mb-2'>
                <span aria-hidden='true'>*</span>Has your company been awarded a
                contact or contracts in the past?{' '}
                <span className='sr-only'>This is a required question.</span>
              </div>
            </legend>
            <OptionField
              name='has_awarded_contracts'
              placeholder='Has Awarded Contracts'
              options={certifiedContractsOptions}
              value={
                protegeAgreement &&
                protegeAgreement['has_awarded_contracts'] !== null &&
                protegeAgreement['has_awarded_contracts'].toString()
              }

              required={true}
              submitted={submitted}
              disabled={
                protegeAgreementData
              }
              onKeyDown={onKeydownHandler}
            />
            {/* {showErrorHasContracts &&
            protegeAgreement &&
            !protegeAgreement['has_awarded_contracts'] ? (
              <p className='erorr-red'>This is a required question.</p>
            ) : null} */}
          </fieldset>
        </div>
      </div>

      {hadAwardedContracts && (
        <div>
          <fieldset>
            <legend>
              Select type(s) of contracts your company has been awarded in the
              past. (Optional)
              </legend>
            <InputCheckbox
              name='is_dod_prime_contracts'
              id='is_dod_prime_contracts'
              placeholder='DoD Prime contract or contracts'
              value={
                protegeAgreement && protegeAgreement['is_dod_prime_contracts']
              }
              label='DoD Prime contract or contracts'
              disabled={
                protegeAgreementData
              }
              checked={
                protegeAgreementData &&
                  protegeAgreementData['is_dod_prime_contracts'] &&
                  protegeAgreementData['is_dod_prime_contracts'].toString() ===
                  'true'
                  ? true
                  : protegeAgreement &&
                    protegeAgreement['is_dod_prime_contracts'] &&
                    protegeAgreement['is_dod_prime_contracts'].toString() ===
                    'true'
                    ? true
                    : false
              }
              onKeyDown={onKeydownHandler}
            />

            <InputCheckbox
              name='is_dod_subcontracts'
              id='is_dod_subcontracts'
              placeholder='DoD Subcontract or subcontracts'
              value={
                protegeAgreement && protegeAgreement['is_dod_subcontracts']
              }
              label='DoD Subcontract or subcontracts'
              disabled={
                protegeAgreementData
              }
              checked={
                protegeAgreementData &&
                  protegeAgreementData['is_dod_subcontracts'] &&
                  protegeAgreementData['is_dod_subcontracts'].toString() ===
                  'true'
                  ? true
                  : protegeAgreement &&
                    protegeAgreement['is_dod_subcontracts'] &&
                    protegeAgreement['is_dod_subcontracts'].toString() ===
                    'true'
                    ? true
                    : false
              }
              onKeyDown={onKeydownHandler}
            />

            <InputCheckbox
              name='is_federal_agency_prime_contracts'
              id='is_federal_agency_prime_contract'
              placeholder='Federal Agency Prime contract or contracts'
              value={
                protegeAgreement &&
                protegeAgreement['is_federal_agency_prime_contracts']
              }
              label='Federal Agency Prime contract or contracts'
              disabled={
                protegeAgreementData
              }
              checked={
                protegeAgreementData &&
                  protegeAgreementData['is_federal_agency_prime_contracts'] &&
                  protegeAgreementData[
                    'is_federal_agency_prime_contracts'
                  ].toString() === 'true'
                  ? true
                  : protegeAgreement &&
                    protegeAgreement['is_federal_agency_prime_contracts'] &&
                    protegeAgreement[
                      'is_federal_agency_prime_contracts'
                    ].toString() === 'true'
                    ? true
                    : false
              }
              onKeyDown={onKeydownHandler}
            />

            <InputCheckbox
              name='is_federal_agency_subcontracts'
              id='is_federal_agency_subcontracts'
              placeholder='Federal Agency Subcontract or subcontracts'
              value={
                protegeAgreement &&
                protegeAgreement['is_federal_agency_subcontracts']
              }
              label='Federal Agency Subcontract or subcontracts'
              disabled={
                protegeAgreementData
              }
              checked={
                protegeAgreementData &&
                  protegeAgreementData['is_federal_agency_subcontracts'] &&
                  protegeAgreementData[
                    'is_federal_agency_subcontracts'
                  ].toString() === 'true'
                  ? true
                  : protegeAgreement &&
                    protegeAgreement['is_federal_agency_subcontracts'] &&
                    protegeAgreement[
                      'is_federal_agency_subcontracts'
                    ].toString() === 'true'
                    ? true
                    : false
              }
              onKeyDown={onKeydownHandler}
            />
          </fieldset>
        </div>
      )}

      {hadAwardedContracts &&
        protegeAgreement['is_dod_prime_contracts'] && (
          <div className='row'>
            <div className='col-md-12 mt-3'>
              <h3 className='agreement-sub-header mb-0'>
                Total DoD Prime Contract Awards
            </h3>
            </div>
            <div
              className='col-md-12 mt-2'
              data-test-id='Sub Contract Prime Awards'
            >
              <SubContactAwardsRows
                val={
                  protegeAgreement && protegeAgreement['fiscal_year_prime2']
                    ? 2
                    : primeContaractAwardNumber
                }
                protegeAgreement={protegeAgreement}
                mentorProtegeAgrStatus={mentorProtegeAgrStatus}
                updateContaractAwardNumber={UpdatePrimeContaractAwardNumber}
                prime={true}
                protegeAgreementData={protegeAgreementData}
                onDelete={OnDelete}
                fiscalYear='fiscal_year_prime'
                dollarAmount='dollar_amount_recieved_prime'
                contractValue='funded_contact_value_prime'
                number='number_prime_'
              />
            </div>
          </div>
        )}

      {hadAwardedContracts &&
        protegeAgreement['is_dod_subcontracts'] && (
          <div className='row mt-3'>
            <div className='col-md-12'>
              <h3 className='agreement-sub-header mb-0'>
                Total DoD Subcontract Awards
            </h3>
            </div>
            <div className='col-md-12 mt-2' data-test-id='Sub Contract Awards'>
              <SubContactAwardsRows
                val={
                  protegeAgreement && protegeAgreement['fiscal_year2']
                    ? 2
                    : subContaractAwardNumber
                }
                protegeAgreement={protegeAgreement}
                mentorProtegeAgrStatus={mentorProtegeAgrStatus}
                updateContaractAwardNumber={UpdatesubContaractAwardNumber}
                protegeAgreementData={protegeAgreementData}
                fiscalYear='fiscal_year'
                dollarAmount='dollar_amount_recieved'
                contractValue='funded_contact_value'
                number='number_'
                onDelete={OnDelete}
              />
            </div>
          </div>
        )}

      {hadAwardedContracts &&
        protegeAgreement['is_federal_agency_prime_contracts'] && (
          <div className='row mt-3'>
            <div className='col-md-12'>
              <h3 className='agreement-sub-header mb-0'>
                Total Federal Agency Prime Contract Awards
              </h3>
            </div>
            <div className='col-md-12 mt-2' data-test-id='Sub Contract Awards'>
              <SubContactAwardsRows
                val={
                  protegeAgreement &&
                    protegeAgreement['fed_fiscal_year_prime_2']
                    ? 2
                    : fedPrimeContaractAwardNumber
                }
                protegeAgreement={protegeAgreement}
                mentorProtegeAgrStatus={mentorProtegeAgrStatus}
                updateContaractAwardNumber={UpdateFedPrimeContaractAwardNumber}
                protegeAgreementData={protegeAgreementData}
                fiscalYear='fed_fiscal_year_prime_'
                dollarAmount='fed_dollar_amount_recieved_prime_'
                contractValue='fed_funded_contract_value_prime_'
                number='fed_number_prime_'
                onDelete={OnDelete}
              />
            </div>
          </div>
        )}

      {hadAwardedContracts &&
        protegeAgreement['is_federal_agency_subcontracts'] && (
          <div className='row mt-3'>
            <div className='col-md-12'>
              <h3 className='agreement-sub-header mb-0'>
                Total Federal Agency Subcontract Awards
            </h3>
            </div>
            <div className='col-md-12 mt-2' data-test-id='Sub Contract Awards'>
              <SubContactAwardsRows
                val={
                  protegeAgreement && protegeAgreement['fed_fiscal_year_sub_2']
                    ? 2
                    : fedSubContaractAwardNumber
                }
                protegeAgreement={protegeAgreement}
                mentorProtegeAgrStatus={mentorProtegeAgrStatus}
                updateContaractAwardNumber={UpdateFedsubContaractAwardNumber}
                protegeAgreementData={protegeAgreementData}
                fiscalYear='fed_fiscal_year_sub_'
                dollarAmount='fed_dollar_amount_recieved_sub_'
                contractValue='fed_funded_contract_value_sub_'
                number='fed_number_sub_'
                onDelete={OnDelete}
              />
            </div>
          </div>
        )}
    </div>
  )
}

const getCurrentFinancialYear = () => {
  let financial_year = ''
  let today = new Date()
  if (today.getMonth() + 1 <= 3) {
    financial_year = today.getFullYear() - 1 + '-' + today.getFullYear()
  } else {
    financial_year = today.getFullYear() + '-' + (today.getFullYear() + 1)
  }
  return financial_year
}

const getFiscalYearOptions = () => {
  let currentFiscalYear = getCurrentFinancialYear().substr(-4)
  let fiscalYears = []
  for (let i = 0; i < 3; i++) {
    fiscalYears.push({
      abbreviation: currentFiscalYear - i,
      name: currentFiscalYear - i,
    })
  }
  return fiscalYears
}

const SubContactAwardsRows = ({
  val,
  protegeAgreement,
  mentorProtegeAgrStatus,
  updateContaractAwardNumber,
  prime,
  protegeAgreementData,
  fiscalYear,
  dollarAmount,
  contractValue,
  number,
  onDelete,
}) => {
  let rows = []
  for (let i = 1; i <= val; i++) {
    rows.push(
      <fieldset className='row' key={i}>
        <legend className='sr-only'>Fiscal Year</legend>
        <div className='col-md-2'>
          <SelectField
            name={`${fiscalYear}${i}`}
            placeholder='Fiscal Year'
            id={`fiscal-year-${fiscalYear}-${i}`}
            options={getFiscalYearOptions()}
            value={protegeAgreement && protegeAgreement[`${fiscalYear}${i}`]}
            defaultValue=''
            disabled={protegeAgreementData}
          />
        </div>
        <div className='col-md-2'>
          <InputField
            name={`${number}${i}`}
            placeholder='Contact Number'
            id={`number-${fiscalYear}-${i}`}
            format={formatNumbers}
            value={protegeAgreement && protegeAgreement[`${number}${i}`]}
            disabled={protegeAgreementData}
          />
        </div>
        <div className={protegeAgreementData ? 'col-md-4' : 'col-md-3'}>
          <InputField
            name={`${contractValue}${i}`}
            placeholder='Funded Contract Value &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'
            id={`funded-contact-value-${fiscalYear}-${i}`}
            value={protegeAgreement && protegeAgreement[`${contractValue}${i}`]}
            format={formatDollar}
            disabled={protegeAgreementData}
          />
        </div>
        <div className={protegeAgreementData ? 'col-md-4' : 'col-md-3'}>
          <InputField
            name={`${dollarAmount}${i}`}
            placeholder='Dollar Amount Received &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'
            id={`dollar-amount-received-${fiscalYear}-${i}`}
            value={protegeAgreement && protegeAgreement[`${dollarAmount}${i}`]}
            format={formatDollar}
            disabled={protegeAgreementData}
          />
        </div>
        {i === val && i !== 2 && !protegeAgreementData && (
          <div className='col-md-3'>
            <button
              className='btn btn-primary mt-4 focusable-item'
              onClick={() => updateContaractAwardNumber(2)}
            >
              + Add Another Year
            </button>
          </div>
        )}
        {i === val && i !== 1 && !protegeAgreementData && (
          <div className='col-md-2'>
            <button
              type='button'
              className='btn btn-primary add-button delete-button-margin focusable-item'
              onClick={() =>
                onDelete(
                  fiscalYear,
                  dollarAmount,
                  contractValue,
                  number,
                  updateContaractAwardNumber
                )
              }
            >
              - Delete
            </button>
          </div>
        )}
      </fieldset>
    )
  }

  return rows
}
export default DoDContracts
