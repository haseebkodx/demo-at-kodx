import React from "react";
import NextIcon from "../../../assets/images/GovernmentJourney/nextIcon.svg";

const JourneyButton = ({ title, handleOnClick, className, disabled, type }) => (
  <button
    className={`${className} ${
      disabled
        ? "bg-[#707070] cursor-not-allowed text-black"
        : "bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-300 "
    } py-[10px] rounded-sm px-4 flex items-center justify-center`}
    onClick={handleOnClick}
    disabled={disabled}
    type={type}
  >
    {title}
    <img
      src={NextIcon}
      alt="Next"
      className="w-[24px] h-[24px] ml-1 group-hover:text-white hidden sm:block"
    />
  </button>
);

export default JourneyButton;
