import React from "react";
import PropTypes from "prop-types";

const Input = ({ type, placeholder, name, id, value, onChange, classes, required }) => {
  return (
    <input
      type={type}
      className={`${classes} w-full outline-none border-1 border-secondary h-14 px-4 text-white rounded-sm bg-white/10 focus:border-primary focus:ring-2 focus:ring-primary`}
      placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  classes: PropTypes.string,
  required: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: "",
  name: "",
  id: "",
  value: "",
  onChange: () => {},
  classes: "",
  required: false,
};

export default Input;