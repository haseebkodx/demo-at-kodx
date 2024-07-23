import React, { useEffect } from 'react'
import { Field } from 'redux-form'
import './commonFields.scss'

const OptionField = ({
  name,
  required,
  value,
  options,
  view,
  submitted,
  disabled,
  errorMessage,
  onKeyDown
}) => {

  return (
    <>
      {options && options.length>0 &&
        options.map((option, idx) => {
          return view ? (
            <div key={idx}>
              <label htmlFor={option.id} className='radio-button-label'>
                <Field
                  id={option.id}
                  className='focusable-item'
                  name={name}
                  component='input'
                  type='radio'
                  value={option.value}
                  checked={
                    JSON.parse(view[name]) === JSON.parse(option.value)
                      ? true
                      : false
                  }
                  disabled={view || disabled ? true : false}
                />
                {`  ${option.label}`}
              </label>
            </div>
          ) : (
            <div key={idx}>
              <label htmlFor={option.id} className='radio-button-label' tabIndex="0" onKeyDown={onKeyDown}>
                <Field
                  id={option.id}
                  className='focusable-item'
                  name={name}
                  component='input'
                  type='radio'
                  value={option.value}
                  checked={
                    (option && option.value.toString()) ===
                      (value?.toString())
                      ? true
                      : false
                  }
                  disabled={view || disabled ? true : false}
                  onKeyDown={onKeyDown}
                />
                {` ${option.label}`}
              </label>
            </div>
          )
        })}
      {!view && !value && submitted && required && (
        <div className='erorr-red'> {errorMessage ? errorMessage : 'This field is required'}</div>
      )}
    </>
  )
}

export default OptionField
