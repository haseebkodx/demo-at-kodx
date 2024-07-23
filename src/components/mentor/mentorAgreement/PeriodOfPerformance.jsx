import React, { useEffect, useState } from 'react'
import periodOfPerformance from './periodOfPerformanceError.action'
import { useDispatch } from 'react-redux'
import DatePicker from "react-date-picker";
import InputDatePicker from '../../commonComponents/forms/InputDatePickert'
import SelectField from '../../commonComponents/forms/SelectField'

function PeriodOfPerformance({
  mentorAgreement,
  reviewer = true,
  mentorAgreementData,
  mentorProtegeAgreementStatus,
  completeMentorAgreement
}) {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date())
  const monthDiff = (date1, date2) => {

    const d1 = new Date(date1)
    const d2 = new Date(date2)

    let months
    months = (d2.getFullYear() - d1.getFullYear()) * 12
    months -= d1.getMonth()
    months += d2.getMonth()
    return months <= 0 ? 0 : months
  }
  const months = mentorAgreement && mentorAgreement['start_date'] && mentorAgreement['end_date']
    ? monthDiff(mentorAgreement['start_date'], mentorAgreement['end_date']) : 0
  const error = mentorAgreement
    && (months > 36 || months < 1)
    ? 'Number of months should between 1 and 36' : null

  useEffect(() => {
    dispatch(periodOfPerformance(error))
  }, [error])

  const getMonths = () => {
    let numOfMonths = []
    for (let i = 1; i <= 36; i++) {
      numOfMonths.push({ abbreviation: i, name: i })
    }
    return numOfMonths
  }

  return (
    <div className="col-md-12">
      <h2 className={`page-title section-header ${reviewer && 'reviewer-section-title'}`}>Period of Performance</h2>

      <p className="mt-2">State the period of time over which the developmental assistance will be performed.<br />
      All Mentor-Protege Agreements must be approved by DoD OSBP office.
      </p>
      <div>
        <div className="col-md-2 ml-n3">
          <SelectField
            name='number_of_months'
            placeholder='Number of Months'
            id='contact-state'
            required={true}
            options={getMonths()}
            value={
              mentorAgreement && mentorAgreement['number_of_months']
            }
            defaultValue=''
            disabled={completeMentorAgreement}
          />
        </div>

        <div className="row">
          <div className="col-md-3 mt-4" data-test-id='start_date'>
            <div>
              <label>Anticipated Start Date (Optional)</label>
            </div>
            <span>Example: 11/15/2021</span>
            <InputDatePicker
              name='start_date'
              value={mentorAgreement && mentorAgreement['start_date']}
              disabled={completeMentorAgreement}
              clearAriaLabel={'start_date'}
              calendarAriaLabel={'start_date'}
              maxDate={new Date(4102349083000)}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default PeriodOfPerformance