import React, { useEffect, useState } from 'react'
import InputField from '../../commonComponents/forms/InputField'
import { formatDollar } from '../../../helpers/formatter/format'
import SelectField from '../../commonComponents/forms/SelectField'
import OptionField from '../../commonComponents/forms/OptionField'
import InputCheckbox from '../../commonComponents/forms/InputCheckbox'
import { keydownHandler } from '../../commonComponents/utility'

function MentorProtegeContracts({
  mentorProtegeAgreementStatus,
  mentorAgreement,
  mentorAgreementData,
  reviewer = true,
  initialize,
  submitted,
  completeMentorAgreement
  // showErrorHasContracts,
}) {
  const [
    totalSubContractAwardNumber,
    setTotalSubContractAwardNumber,
  ] = useState(1)
  const [fedSubContractAwardNumber, setFedSubContractAwardNumber] = useState(1)

  useEffect(() => {
    setTotalSubContractAwardNumber(
      mentorAgreement && mentorAgreement['total_fed_fiscal_year_subcontract_3']
        ? 3
        : mentorAgreement &&
          mentorAgreement['total_fed_fiscal_year_subcontract_2']
          ? 2
          : 1
    )
    setFedSubContractAwardNumber(
      mentorAgreement && mentorAgreement['fed_fiscal_year_subcontract_3']
        ? 3
        : mentorAgreement && mentorAgreement['fed_fiscal_year_subcontract_2']
          ? 2
          : 1
    )
  }, [])

  const UpdateTotalSubContaractAwardNumber = (number) => {
    setTotalSubContractAwardNumber(number)
  }

  const UpdateFedSubContractAwardNumber = (number) => {
    setFedSubContractAwardNumber(number)
  }

  const OnDelete = (
    fiscalYear,
    dollarAmount,
    contractValue,
    updateContaractAwardNumber,
    number
  ) => {
    initialize({
      ...mentorAgreement,
      [`${fiscalYear}${number + 1}`]: null,
      [`${dollarAmount}${number + 1}`]: null,
      [`${contractValue}${number + 1}`]: null,
    })
    updateContaractAwardNumber(number)
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

  return (
    <div className='col-md-12'>
      {reviewer && (
        <h2 className='page-title reviewer-section-title section-header'>
          Mentor Protégé Contracts
        </h2>
      )}

      <div>
        <div className='row mb-2'>
          <div className='col-md-12'>
            <h3 className='agreement-sub-header mb-0'>Potential Subcontracts</h3>
          </div>
          <div
            className='col-md-12 mt-2'
            data-test-id='Certified Small Business'
          >
            <p className='left-align'>
              <legend>
                The anticipated number, dollar value, and the type of
                subcontracts to be awarded to the protégé company consistent
                with the extent and nature of mentor company&apos;s business and
                the period of time over which they will be awarded. Do not
                include an estimate of any awards that you are currently biding
                on, unless the number are based on documented historical annual
                averages for your company.
              </legend>
            </p>
          </div>
        </div>
        <div className='row mb-3'>
          <fieldset
            className='col-md-12'
            data-test-id='Certified Small Business'
          >
            <legend className='left-align mt-2 mb-2'>
              <span aria-hidden='true'>*</span>Do you want to award a subcontract to the protégé company?
              {' '}
              <span className='sr-only'>This is a required question.</span>
            </legend>
            <OptionField
              name='has_awarded_contracts'
              placeholder='Has Awarded Contracts'
              options={certifiedContractsOptions}
              value={
                mentorAgreement &&
                mentorAgreement['has_awarded_contracts'] !== null &&
                mentorAgreement['has_awarded_contracts'].toString()
              }
              required={true}
              submitted={submitted}
              disabled={completeMentorAgreement}
              onKeyDown={keydownHandler}
            />

          </fieldset>
        </div>
        {mentorAgreement &&
          mentorAgreement['has_awarded_contracts'] &&
          mentorAgreement['has_awarded_contracts'].toString() === 'true' && (
            <fieldset className='mb-4'>
              <legend>
                Select the types of subcontracts your company anticipates to award to the protégé company.(Optional)
              </legend>
              <InputCheckbox
                name='is_total_federal_agency_subcontracts'
                id='is_total_federal_agency_subcontracts'
                placeholder='Total Federal Agency Subcontract Awards'
                value={mentorAgreement && mentorAgreement['is_total_federal_agency_subcontracts']}
                label='Total Federal Agency Subcontract Awards'
                disabled={completeMentorAgreement}
                checked={mentorAgreementData
                  && mentorAgreementData['is_total_federal_agency_subcontracts']
                  && mentorAgreementData['is_total_federal_agency_subcontracts'].toString() === 'true'
                  ? true : mentorAgreement && mentorAgreement['is_total_federal_agency_subcontracts']
                    && mentorAgreement['is_total_federal_agency_subcontracts'].toString() === 'true'
                    ? true : false}
                onKeyDown={keydownHandler}
              />
              <InputCheckbox
                name='is_federal_agency_subcontracts'
                id='is_federal_agency_subcontracts'
                placeholder='Federal Agency Subcontracts Awarded to Protégé by Mentor'
                value={mentorAgreement && mentorAgreement['is_federal_agency_subcontracts']}
                label='Federal Agency Subcontracts Awarded to Protégé by Mentor'
                disabled={completeMentorAgreement}
                checked={mentorAgreementData
                  && mentorAgreementData['is_federal_agency_subcontracts']
                  && mentorAgreementData['is_federal_agency_subcontracts'].toString() === 'true'
                  ? true : mentorAgreement && mentorAgreement['is_federal_agency_subcontracts']
                    && mentorAgreement['is_federal_agency_subcontracts'].toString() === 'true'
                    ? true : false}
                onKeyDown={keydownHandler}
              />
            </fieldset>)
        }


        {/* {mentorAgreement
          && mentorAgreement['is_federal_agency_subcontracts']
          && mentorAgreement['has_awarded_contracts']
          && mentorAgreement['has_awarded_contracts'].toString() === 'true'
          &&
          <div className='row mb-5'>
            <div className='col-md-12'>
              <span className='agreement-sub-header'>
                Federal Agency Subcontracts Awarded to Protégé by Mentor
              </span>
              <p>
                Note: Start with the most recent year, followed by one or more preceding years.
              </p>
            </div>
            <div
              className='col-md-12 mt-2'
              data-test-id='Sub Contract Prime Awards'
            >
              <SubContactAwardsRows
                val={fedSubContractAwardNumber}
                mentorAgreement={mentorAgreement}
                updateContaractAwardNumber={UpdateFedSubContractAwardNumber}
                awardNumber={fedSubContractAwardNumber}
                mentorProtegeAgreementStatus={mentorProtegeAgreementStatus}
                prime={true}
                completeMentorAgreement={completeMentorAgreement}
                onDelete={OnDelete}
                fiscalYear="fed_fiscal_year_subcontract_"
                dollarAmount="fed_dollar_amount_received_"
                contractValue="federal_number_"
              />
            </div>
          </div>
        } */}

        {mentorAgreement &&
          mentorAgreement['is_total_federal_agency_subcontracts'] &&
          mentorAgreement['has_awarded_contracts'] &&
          mentorAgreement['has_awarded_contracts'].toString() === 'true' && (
            <div className='row mb-5'>
              <div className='col-md-12'>
                <h3 className='agreement-sub-header mb-0'>
                  Total Federal Agency Subcontract Awards to this Protégé
                </h3>
                <p>
                  Note: Start with the most recent fiscal year, followed by one
                  or more future years.
                </p>
              </div>
              <div
                className='col-md-12 mt-2'
                data-test-id='Sub Contract Awards'
              >
                <SubContactAwardsRows
                  val={totalSubContractAwardNumber}
                  mentorAgreement={mentorAgreement}
                  updateContaractAwardNumber={
                    UpdateTotalSubContaractAwardNumber
                  }
                  awardNumber={totalSubContractAwardNumber}
                  prime={true}
                  completeMentorAgreement={completeMentorAgreement}
                  onDelete={OnDelete}
                  fiscalYear='total_fed_fiscal_year_subcontract_'
                  dollarAmount='total_fed_dollar_amount_received_'
                  contractValue='total_federal_number_'
                />
              </div>
            </div>
          )}

        {mentorAgreement &&
          mentorAgreement['is_federal_agency_subcontracts'] &&
          mentorAgreement['has_awarded_contracts'] &&
          mentorAgreement['has_awarded_contracts'].toString() === 'true' && (
            <div className='row mb-5'>
              <div className='col-md-12'>
                <h3 className='agreement-sub-header mb-0'>
                  Federal Agency Subcontracts Awarded to Protégé by Mentor
                </h3>
                <p>
                  Note: Start with the most recent year, followed by one or more
                  preceding years.
                </p>
              </div>
              <div
                className='col-md-12 mt-2'
                data-test-id='Sub Contract Prime Awards'
              >
                <SubContactAwardsRows
                  val={fedSubContractAwardNumber}
                  mentorAgreement={mentorAgreement}
                  updateContaractAwardNumber={UpdateFedSubContractAwardNumber}
                  awardNumber={fedSubContractAwardNumber}
                  prime={true}
                  completeMentorAgreement={completeMentorAgreement}
                  onDelete={OnDelete}
                  fiscalYear='fed_fiscal_year_subcontract_'
                  dollarAmount='fed_dollar_amount_received_'
                  contractValue='federal_number_'
                />
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

const getCurrentFinancialYear = () => {
  let financial_year = "";
  let today = new Date();
  if ((today.getMonth() + 1) <= 3) {
    financial_year = (today.getFullYear() - 1) + "-" + today.getFullYear()
  } else {
    financial_year = today.getFullYear() + "-" + (today.getFullYear() + 1)
  }
  return financial_year;
}

const getFiscalYearOptions = ({ mentorAgreement, year, i }) => {

  let currentFiscalYear = getCurrentFinancialYear().substr(-4)
  let currentyear = currentFiscalYear - 1
  let fiscalYears = []
  for (let i = 0; i < 4; i++) {
    fiscalYears.push({ abbreviation: parseInt(currentyear) + i, name: parseInt(currentyear) + i })
  }
  let filterFiscalYear = []
  if (i === 1) {
    filterFiscalYear = fiscalYears.filter(fiscalYear =>
      (fiscalYear && fiscalYear.abbreviation.toString()) !== (mentorAgreement[`${year}2`] && mentorAgreement[`${year}2`].toString())
      && (fiscalYear && fiscalYear.abbreviation.toString()) !== (mentorAgreement[`${year}3`] && mentorAgreement[`${year}3`].toString()))
  }
  else if (i === 2) {
    filterFiscalYear = fiscalYears.filter(fiscalYear =>
      (fiscalYear && fiscalYear.abbreviation.toString()) !== (mentorAgreement[`${year}1`] && mentorAgreement[`${year}1`].toString())
      && (fiscalYear && fiscalYear.abbreviation.toString()) !== (mentorAgreement[`${year}3`] && mentorAgreement[`${year}3`].toString()))
  }
  else if (i === 3) {
    filterFiscalYear = fiscalYears.filter(fiscalYear =>
      (fiscalYear && fiscalYear.abbreviation.toString()) !== (mentorAgreement[`${year}1`] && mentorAgreement[`${year}1`].toString())
      && (fiscalYear && fiscalYear.abbreviation.toString()) !== (mentorAgreement[`${year}2`] && mentorAgreement[`${year}2`].toString()))
  }
  else filterFiscalYear = fiscalYears

  return filterFiscalYear
}


const SubContactAwardsRows = ({
  mentorProtegeAgreementStatus,
  val,
  mentorAgreement,
  updateContaractAwardNumber,
  awardNumber,
  prime,
  mentorAgreementData,
  fiscalYear,
  dollarAmount,
  contractValue,
  number,
  onDelete,
  completeMentorAgreement
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
            id={`contact-state-${fiscalYear}-${i}`}
            options={getFiscalYearOptions({
              mentorAgreement,
              year: fiscalYear,
              i,
            })}
            value={mentorAgreement && mentorAgreement[`${fiscalYear}${i}`]}
            required={true}
            defaultValue=''
            disabled={
              completeMentorAgreement
            }
          />
        </div>
        <div className={mentorAgreementData ? 'col-md-4' : 'col-md-3'}>
          <InputField
            name={`${contractValue}${i}`}
            placeholder='Funded Contract Value'
            id={`funded-contact-value-${fiscalYear}-${i}`}
            value={mentorAgreement && mentorAgreement[`${contractValue}${i}`]}
            format={formatDollar}
            required={true}
            disabled={
              completeMentorAgreement
            }
          />
        </div>
        <div className={mentorAgreementData ? 'col-md-4' : 'col-md-3'}>
          <InputField
            name={`${dollarAmount}${i}`}
            placeholder='Dollar Amount Received'
            id={`dollar-amount-received-${fiscalYear}-${i}`}
            value={mentorAgreement && mentorAgreement[`${dollarAmount}${i}`]}
            format={formatDollar}
            required={true}
            disabled={
              completeMentorAgreement
            }
          />
        </div>
        {i === val && i > 1 && !mentorAgreementData && (
          <div className='col-md-2'>
            <button
              type='button'
              className='btn btn-primary add-button delete-button focusable-item'
              disabled={
                mentorAgreementData &&
                mentorProtegeAgreementStatus !== 'declined'
              }
              onClick={() =>
                onDelete(
                  fiscalYear,
                  dollarAmount,
                  contractValue,
                  updateContaractAwardNumber,
                  i - 1
                )
              }
            >
              - Remove Year
            </button>
          </div>
        )}
        {i === val && i < 3 && !mentorAgreementData && (
          <div className='col-md-6'>
            <button
              className='btn btn-primary add-button mt-4'
              disabled={
                completeMentorAgreement
              }
              onClick={() => updateContaractAwardNumber(i + 1)}
            >
              + Add Year
            </button>
          </div>
        )}
      </fieldset>
    )
  }
  return rows
}

export default MentorProtegeContracts
