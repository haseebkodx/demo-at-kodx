import React from "react";
import { Field } from "redux-form";

const InputField = ({
  name,
  placeholder,
  id,
  mask,
  required,
  value,
  min,
  validation,
  type,
  rows,
  maxlength,
  errorMessage,
  dependent,
  format,
  view,
  disabled,
  readOnly,
  label,
  className,
  onCopy,
  onPaste,
  isLabelHidden,
  normalizeValues,
  ariaRequired,
  inputPlaceholder,
  onBlur = () => {}
}) => {
  return (
    <Field
      id={id}
      component={RenderField}
      type={type}
      rows={rows}
      className={className || "form-control"}
      disabled={disabled}
      readOnly={readOnly}
      name={name}
      fieldName={name}
      normalize={normalizeValues}
      placeholder={placeholder}
      required={required}
      val={value}
      min={min}
      validation={validation}
      errorMessage={errorMessage}
      dependent={dependent}
      changeFormat={format}
      view={view}
      maxlength={maxlength}
      label={label}
      onCopy={onCopy}
      onPaste={onPaste}
      isLabelHidden={isLabelHidden}
      ariaRequired={ariaRequired}
      inputPlaceholder={inputPlaceholder}
      onBlur={onBlur}
      {...mask}
    />
  );
};

const RenderField = ({
  input,
  id,
  type,
  className,
  disabled,
  readOnly,
  placeholder,
  fieldName,
  required,
  val,
  min,
  rows,
  validation,
  errorMessage,
  dependent,
  changeFormat,
  label,
  view,
  maxlength,
  onCopy,
  onPaste,
  isLabelHidden,
  ariaRequired,
  meta: { touched },
  inputPlaceholder,
}) => {
  return (
    <>
      {label && label === "no-show" ? (
        ""
      ) : (
        <label
          style={{ visibility: isLabelHidden ? "hidden" : "visible" }}
          htmlFor={id}
        >
          <span aria-hidden="true">{required && placeholder ? "*" : ""}</span>
          {`${placeholder}${
            required ? "" : !required && placeholder ? " (Optional)" : ""
          }`}
          {functionName(changeFormat) === "formatDollar" && (
            <span className="sr-only">Dollar Amount</span>
          )}
        </label>
      )}
      {type !== "textarea" ? (
        <input
          {...input}
          type={type}
          id={id}
          maxLength={maxlength}
          onCopy={(e) => onCopy && e.preventDefault()}
          onPaste={(e) => onPaste && e.preventDefault()}
          aria-disabled={readOnly || (view && view.status !== "incomplete")}
          // aria-label={label && label === 'no-show' ? 'no-show' : label}
          title={val ? val.toString().toLowerCase() : ""}
          className={`${className} mb-3 focusable-item`}
          disabled={
            (view && view.status !== "incomplete") || disabled ? true : false
          }
          readOnly={readOnly}
          tabIndex="0"
          value={
            view && changeFormat
              ? changeFormat(view[fieldName])
              : view
              ? view[fieldName]
              : val && changeFormat
              ? changeFormat(val)
              : val
          }
          aria-required={
            ariaRequired ? ariaRequired : required ? required : false
          }
          placeholder={inputPlaceholder}
        />
      ) : (
        <textarea
          {...input}
          type={type}
          id={id}
          onCopy={(e) => onCopy && e.preventDefault()}
          onPaste={(e) => onCopy && e.preventDefault()}
          aria-multiline={true}
          aria-disabled={readOnly || view}
          // aria-label={label && label === 'no-show' ? 'no-show' : label}
          title={val ? val.toString().toLowerCase() : ""}
          className={`${className} mb-3 focusable-item`}
          value={
            view && changeFormat
              ? changeFormat(view[fieldName])
              : view
              ? view[fieldName]
              : val && changeFormat
              ? changeFormat(val)
              : val
          }
          rows={rows}
          disabled={view || disabled ? true : false}
          readOnly={readOnly}
          tabIndex="0"
          aria-required={
            ariaRequired ? ariaRequired : required ? required : false
          }
        />
      )}
      {!val && required && !view && touched && !dependent && (
        <div className="erorr-red mt-n2 mb-2">
          {errorMessage ? errorMessage : `${placeholder} is required`}
        </div>
      )}
      {val &&
        (val.length < min || (validation && !validation(val))) &&
        !view &&
        touched && (
          <div className="erorr-red mt-n1 mb-2">
            Invalid entry for {placeholder}
          </div>
        )}
    </>
  );
};

const functionName = (fun) => {
  let ret = fun && fun.toString();
  ret = ret && ret.substr("function ".length);
  ret = ret && ret.substr(0, ret.indexOf("("));
  return ret;
};

export default InputField;
