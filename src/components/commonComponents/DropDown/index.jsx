import React from "react";

const StateDropdown = ({
  name,
  value,
  className,
  label,
  options,
  errors,
  required,
  labelClass,
  handleOnChange,
}) => {
  return (
    <div>
      <div className="flex items-start flex-col gap-1 relative">
        <div className="flex items-center gap-2">
          <span className={labelClass}>{label}</span>
        </div>
        <select
          id={name}
          value={value}
          className={`${className} h-[50px] border rounded-md outline-none p-2 border-gray-300 "pl-[1rem]"`}
          required={required}
          onChange={handleOnChange}
        >
          <option value=""> </option>
          {options.map((option, index) => (
            <option key={index} value={option} className="dropdown-option">
              {option}
            </option>
          ))}
        </select>

        {errors && (
          <div className="text-red-600 absolute text-[12px] top-[68px]">
            {errors}
          </div>
        )}
      </div>
    </div>
  );
};

export default StateDropdown;
