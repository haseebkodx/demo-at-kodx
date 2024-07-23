import React from "react";
import PropTypes from "prop-types";
import arrow from "../../assets/images/HeroSection/Vector.svg";

const Button = ({ title, classes }) => {
  return (
    <button className={`${classes}  min-h-[50px] sm:w-full bg-linearYellow gap-2 flex items-center justify-center rounded-sm font-lato uppercase text-[#14142B] font-normal text-[16px] sm:text-[14px] px-3`} >
      {title} <img src={arrow} alt="Arrow icon" className="sm:w-3" />
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
};

Button.defaultProps = {
  title: "",
};

export default Button;
