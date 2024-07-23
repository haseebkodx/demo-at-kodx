import React from "react";
import InformationIcon from "../../svg/InformationIcon";
import ToolTip from "../ToolTip";

const Input = ({
  name,
  value,
  className,
  type,
  label,
  errors,
  infoIcon,
  icon,
  tooltipText,
  tooltipPosition,
  required,
  labelClass,
  handleOnBlur,
  handleOnChange,
  maxLength,
  inputRefs,
  onKeyDown,
  handlePaste,
}) => (
  <div>
    <div className="flex items-start flex-col gap-1 relative">
      <div className="flex items-center gap-2">
        <span className={labelClass}>{label}</span>
        {infoIcon && (
          <ToolTip
            icon={<InformationIcon />}
            tooltipText={tooltipText}
            position={tooltipPosition}
            className="mb:max-w-[230px]"
          />
        )}
      </div>

      {icon && (
        <i className="absolute left-3 bottom-4 pointer-events-none">
          {icon}
        </i>
      )}
      <input
        name={name}
        type={type}
        value={value}
        maxLength={maxLength}
        className={`${className} max-h-[50px] border rounded-md outline-none p-3 border-gray-300 ${
          icon ? "pl-5" : "pl-2"
        }`}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        required={required}
        ref={inputRefs}
        onKeyDown={onKeyDown}
        onPaste={handlePaste}
      />

      {errors && (
        <div className="text-red-600 absolute text-[12px] top-[68px]">
          {errors}
        </div>
      )}
    </div>
  </div>
);

export default Input;
