import React, { useState } from 'react'
import formatDollar from '../../../helpers/formatter/formatDollar'
import cleanDollarFormat from '../../../helpers/formatter/cleanDollarFormat'
import InputField from '../../commonComponents/forms/InputField'

function EstimatedCost(
  { mentorAgreement,
    reviewer = true,
    mentorAgreementData,
    mentorProtegeAgreementStatus,
    initialize,
    completeMentorAgreement }) {

  const [numberOfYears, useNumberOfYears] = useState(1)

  const subTotal1 = mentorAgreement && parseInt(cleanDollarFormat(mentorAgreement['employee_labor_year_1'] ? mentorAgreement['employee_labor_year_1'] : 0))
    + parseInt(cleanDollarFormat(mentorAgreement['hbcu_year_1'] ? mentorAgreement['hbcu_year_1'] : 0))
    + parseInt(cleanDollarFormat(mentorAgreement['direct_cost_year_1'] ? mentorAgreement['direct_cost_year_1'] : 0))

  const subTotal2 = mentorAgreement
    && parseInt(cleanDollarFormat(mentorAgreement['employee_labor_year_2'] ? mentorAgreement['employee_labor_year_2'] : 0))
    + parseInt(cleanDollarFormat(mentorAgreement['hbcu_year_2'] ? mentorAgreement['hbcu_year_2'] : 0))
    + parseInt(cleanDollarFormat(mentorAgreement['direct_cost_year_2'] ? mentorAgreement['direct_cost_year_2'] : 0))

  const subTotal3 = mentorAgreement
    && parseInt(cleanDollarFormat(mentorAgreement['employee_labor_year_3'] ? mentorAgreement['employee_labor_year_3'] : 0))
    + parseInt(cleanDollarFormat(mentorAgreement['hbcu_year_3'] ? mentorAgreement['hbcu_year_3'] : 0))
    + parseInt(cleanDollarFormat(mentorAgreement['direct_cost_year_3'] ? mentorAgreement['direct_cost_year_3'] : 0))

  const UpdateYear = (number) => {
    useNumberOfYears(number)
  }

  const OnDelete = (number) => {
    initialize({
      ...mentorAgreement,
      [`employee_labor_year_${number}`]: null,
      [`hbcu_year_${number}`]: null,
      [`direct_cost_year_${number}`]: null,

    })
    UpdateYear(number - 1)
  }

  const numOfRows = (mentorAgreement['employee_labor_year_3']
    || mentorAgreement['hbcu_year_3']
    || mentorAgreement['direct_cost_year_3']) ? 3
    : (mentorAgreement['employee_labor_year_2']
      || mentorAgreement['hbcu_year_2']
      || mentorAgreement['direct_cost_year_2']) ? 2
      : 1


  return (
    <div className="col-md-12">
      <h2 className={`page-title  section-header ${reviewer && 'reviewer-section-title'}`}>Estimated Costs</h2>

      <p className="mr-5 mt-2">
        Provide an esitmate of the total cost of the developmental assistanceprovided by  the mentor.
        Include cost breakdown of each year of effort - to be fully funded - by element of costs.
        i.e., employee labor, HBCUs/MIs/PTACs/SBDCs, and incidental costs.)
      </p>

      <fieldset className="row">
        <legend className="col-md-12"><hr />
          <h3 className='agreement-mini-sub-header'>Estimated costs for Year 1</h3></legend>
        <p className="col-md-12 mt-n1 mb-3">Note: Enter &quot;0&quot; anywhere where there is no cost</p>
        <div className="col-md-3">
          <InputField
            placeholder="Employee Labor"
            name='employee_labor_year_1'
            id='employee_labor_year_1'
            format={formatDollar}
            value={(mentorAgreement && mentorAgreement['employee_labor_year_1']) || ''}
            required={true}
            disabled={completeMentorAgreement}
          />
        </div>

        <div className="col-md-3">
          <InputField
            placeholder="HBCU/MI/PRAC/SDBC"
            name='hbcu_year_1'
            id='hbcu_year_1'
            format={formatDollar}
            value={(mentorAgreement && mentorAgreement['hbcu_year_1']) || ''}
            required={true}
            disabled={completeMentorAgreement}

          />
        </div>
        <div className="col-md-2">
          <InputField
            placeholder="Other Direct Costs"
            name='direct_cost_year_1'
            id='direct_cost_year_1'
            format={formatDollar}
            value={(mentorAgreement && mentorAgreement['direct_cost_year_1']) || ''}
            required={true}
            disabled={completeMentorAgreement}
          />
        </div>
        <div className="col-md-2 center"><p className="mt-n3">Sub Total</p> <p className="mt-2">{formatDollar(subTotal1)}</p></div>
        <div className="col-md-2"></div>
        {(numOfRows === 1) && <div>
          <button type="button"
            className="btn btn-white focusable-item ml-3"
            disabled={mentorAgreementData && mentorProtegeAgreementStatus !== 'declined'}
            onClick={() => UpdateYear(numOfRows ? numOfRows + 1 : numberOfYears + 1)}>+ Add Year</button>
        </div >}
      </fieldset>
      {(numberOfYears > 1 ||
        (mentorAgreement['employee_labor_year_2']
          || mentorAgreement['hbcu_year_2']
          || mentorAgreement['direct_cost_year_2']))
        && <fieldset className="row">
          <legend className="col-md-12 mb-3"><hr />
            <h3 className='agreement-mini-sub-header'>Estimated costs for Year 2 </h3></legend>
          <div className="col-md-3">
            <InputField
              placeholder="Employee Labor &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;"
              name='employee_labor_year_2'
              id='employee_labor_year_2'
              format={formatDollar}
              value={(mentorAgreement && mentorAgreement['employee_labor_year_2']) || ''}
              disabled={completeMentorAgreement}

            />
          </div>
          <div className="col-md-3">
            <InputField
              placeholder="HBCU/MI/PRAC/SDBC &nbsp; &nbsp;"
              name='hbcu_year_2'
              id='hbcu_year_2'
              format={formatDollar}
              value={(mentorAgreement && mentorAgreement['hbcu_year_2']) || ''}
              disabled={completeMentorAgreement}
            />
          </div>
          <div className="col-md-2">
            <InputField
              placeholder="Other Direct Costs"
              name='direct_cost_year_2'
              id='direct_cost_year_2'
              format={formatDollar}
              value={(mentorAgreement && mentorAgreement['direct_cost_year_2']) || ''}
              disabled={completeMentorAgreement}
            />
          </div>
          <div className="col-md-2 mt-5 center">{formatDollar(subTotal2)}</div>
          <div className="col-md-2 mt-4">
            {(numberOfYears > 1 && numberOfYears < 3)
              && <button
                type="button"
                className="btn btn-white focusable-item"
                onClick={() => OnDelete(2)}>
                <span className='sr-only'>Year 2</span>
                - Remove
                </button>}
          </div>
        </fieldset>}
      {((numberOfYears === 3) ||
        (mentorAgreement['employee_labor_year_3']
          || mentorAgreement['hbcu_year_3']
          || mentorAgreement['direct_cost_year_3']))
        && <fieldset className="row">
          <legend className="col-md-12 mb-3"><hr />
            <h3 className='agreement-mini-sub-header'>Estimated costs for Year 3</h3></legend>
          <div className="col-md-3">
            <InputField
              placeholder='Employee Labor &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;'
              name='employee_labor_year_3'
              id='employee_labor_year_3'
              format={formatDollar}
              value={(mentorAgreement && mentorAgreement['employee_labor_year_3']) || ''}
              disabled={completeMentorAgreement}
            />
          </div>
          <div className="col-md-3">
            <InputField
              placeholder="HBCU/MI/PRAC/SDBC  &nbsp; &nbsp;"
              name='hbcu_year_3'
              id='hbcu_year_3'
              format={formatDollar}
              value={(mentorAgreement && mentorAgreement['hbcu_year_3']) || ''}
              disabled={completeMentorAgreement}
            />
          </div>
          <div className="col-md-2">
            <InputField
              placeholder="Other Direct Costs"
              name='direct_cost_year_3'
              id='direct_cost_year_3'
              format={formatDollar}
              value={(mentorAgreement && mentorAgreement['direct_cost_year_3']) || ''}
              disabled={completeMentorAgreement}
            />
          </div>
          <div className='col-md-2 mt-5 center'>{formatDollar(subTotal3)}</div>
          <div className='col-md-2 mt-4'>
            <button
              type="button"
              className='btn btn-white focusable-item'
              disabled={mentorAgreementData && mentorProtegeAgreementStatus !== 'declined'}
              onClick={() => OnDelete(3)}>
              <span className='sr-only'>Year 3</span>
              - Remove
            </button>
          </div>
        </fieldset>}
      {(numOfRows > 1 && numberOfYears < 3) && <div>
        <button type="button"
          className="btn btn-white focusable-item"
          disabled={mentorAgreementData && mentorProtegeAgreementStatus !== 'declined'}
          onClick={() => UpdateYear(numOfRows ? numOfRows + 1 : numberOfYears + 1)}>+ Add Year</button>
      </div >}
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-3'></div>
        <div className='col-md-2'>Total Esitmated Cost
          <p className="table-data-detail">(All Budget Years)</p>
        </div>
        <div className="col-md-2 center">{mentorAgreement && formatDollar(subTotal1 + subTotal2 + subTotal3)}</div>
        <div className="col-md-2"></div>

      </div>
    </div >

  )
}

export default EstimatedCost