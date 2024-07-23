import React from "react";
import PropTypes from "prop-types";

const Textarea = ({ type, placeholder, name, id, value, onChange, classes, required }) => {
  return (
    <textarea
      type={type}
      className={`${classes} w-full h-[100px] px-4 bg-white/10 rounded-sm outline-none border-1 border-secondary text-white p-2 focus:border-primary focus:ring-2 focus:ring-primary`}
      placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

Textarea.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  classes: PropTypes.string,
  required: PropTypes.bool,
};

Textarea.defaultProps = {
  placeholder: "",
  name: "",
  id: "",
  value: "",
  onChange: () => {},
  classes: "",
  required: false,
};

export default Textarea;