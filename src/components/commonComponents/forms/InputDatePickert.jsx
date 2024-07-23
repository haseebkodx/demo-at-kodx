import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Field } from 'redux-form'

const InputDatePicker = ({ name, value, disabled, clearAriaLabel, calendarAriaLabel, maxDate }) => {

  return (
    <Field
      name={name}
      component={FieldDatePicker}
      val={value}
      disabled={disabled}
      clearAriaLabel={clearAriaLabel}
      calendarAriaLabel={calendarAriaLabel}
      maxDate={maxDate}
    />
  )
}

const FieldDatePicker = ({ input, val, value, placeholder, minDate, maxDate, disabled, clearAriaLabel, calendarAriaLabel }) => (

  <DatePicker
    className="plus-icon"
    dateFormat="MM/dd/yyyy"
    selected={val && val.toString() !== "null" ? new Date(val) : null}
    onChange={input.onChange}
    minDate={minDate}
    maxDate={maxDate}
    placeholderText={placeholder}
    disabled={disabled}
    dayPlaceholder="dd"
    monthPlaceholder="mm"
    yearPlaceholder="yyyy"
    clearAriaLabel={clearAriaLabel}
    calendarAriaLabel={calendarAriaLabel}
  />

);
export default InputDatePicker