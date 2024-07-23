import React from 'react';
import { Field } from 'redux-form'

const SelectField = ({
  name,
  id,
  required,
  value,
  options,
  placeholder,
  view,
  defaultValue,
  disabled,
  isOptionSelected,
  label,
  errorMessage,
  ariaRequired,
}) => {
  return (
    <Field
      id={id}
      component={RenderField}
      name={name}
      fieldName={name}
      required={required}
      options={options}
      placeholder={placeholder}
      view={view}
      val={value}
      defaultValue={defaultValue}
      disabled={disabled}
      isOptionSelected={isOptionSelected}
      label={label}
      errorMessage={errorMessage}
      ariaRequired={ariaRequired}
    />
  )
}

const RenderField = ({
  input,
  placeholder,
  id,
  required,
  val,
  options,
  view,
  disabled,
  fieldName,
  defaultValue,
  meta: { touched },
  isOptionSelected,
  label,
  errorMessage,
  ariaRequired,
}) => {
  return (
    <>
      {label && label === 'no-show' ? (
        ''
      ) : (
          <label htmlFor={id}>
            <span aria-hidden='true'>{ required && placeholder ? '*' : ''}</span>{`${placeholder}${
          required ? '' : ' (Optional)'
        }`}</label>
      )}
      {!isOptionSelected ? (
        <select
          {...input}
          id={id}
          // aria-label={val ? val.toString().toLowerCase() : ""}
          title={val ? val.toString().toLowerCase() : ''}
          className='form-control focusable-item'
          value={val}
          disabled={view || disabled ? true : false}
          aria-required={ariaRequired ? ariaRequired : required ? required : false}
        >
          <option value=''>{defaultValue}</option>
          {options &&
            options.map((option, idx) => {
              return (
                <option
                  value={option.abbreviation}
                  key={idx}
                  selected={
                    val
                      ? val
                      : view
                      ? view[fieldName] === option.abbreviation
                      : null
                  }
                >
                  {option.abbreviation}
                </option>
              )
            })}
        </select>
      ) : (
        <div className='select-readable-field py-2 px-2'>{val}</div>
      )}
      {!val && required && !view && touched && (
        <div className='erorr-red mt-2'>
          {' '}
          {errorMessage ? errorMessage : `${placeholder} is required`}
        </div>
      )}
    </>
  )
}




export default SelectField