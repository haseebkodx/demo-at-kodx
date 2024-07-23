import React from 'react'
import { Field } from 'redux-form'
import './commonFields.scss'

const InputCheckbox = ({
  name,
  placeholder,
  id,
  required,
  value,
  errorMessage,
  label,
  checked,
  disabled,
  view,
  onClick,
  onKeyDown,
  submitted,
  styling,
  ariaRequired,
  className,
  labelStyle
}) => {
  return (
    <Field
      id={id}
      component={RenderField}
      name={name}
      fieldName={name}
      placeholder={placeholder}
      required={required}
      val={value}
      errorMessage={errorMessage}
      label={label}
      checked={checked}
      disabled={disabled}
      view={view}
      onClick={onClick}
      onKeyDown={onKeyDown}
      styling={styling}
      submitted={submitted}
      className={className}
      ariaRequired={ariaRequired}
      labelStyle={labelStyle}
    />
  )
}

const RenderField = ({
  input,
  id,
  placeholder,
  required,
  val,
  errorMessage,
  dependent,
  checked,
  disabled,
  label,
  view,
  onClick,
  onKeyDown,
  styling = false,
  ariaRequired,
  submitted = false,
  className,
  meta: { touched },
  labelStyle
}) => {
  return (
    <>
      <div className='container-flex'>
        <div
          className='input-checkbox-content'
          style={{ display: styling ? styling : '' }}
        >
          <input
            {...input}
            type='checkbox'
            id={id}
            placeholder={placeholder}
            value={val}
            className={`mr-1 focusable-item ${className}`}
            disabled={disabled ? true : false}
            checked={checked}
            onClick={onClick}
            onKeyDown={onKeyDown}
            tabIndex='0'
            required={required}
            aria-required={
              ariaRequired ? ariaRequired : required ? required : false
            }
          />

          {label && label === 'no-show' ? (
            ''
          ) : (
              <label htmlFor={id} className='checkbox-label' style={labelStyle}>
                {label}
              </label>
            )}
        </div>
      </div>
      {!val && required && touched && !view && !dependent && (
        <div className='erorr-red mt-1 row error-for-agree-to-terms'>
          <div className='col-md-12'>
            {errorMessage ? errorMessage : `${placeholder} is required`}
          </div>
        </div>
      )}
    </>
  )
}

export default InputCheckbox
