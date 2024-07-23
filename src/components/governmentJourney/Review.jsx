import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import GovernmentJourneyLayout from "../commonComponents/JourneyLayout";
import sideBg from "../../assets/images/GovernmentJourney/sideBg4.png";
import JourneyButton from "../commonComponents/JourneyButton";
import MPPLogo from "../../assets/images/logo.svg";

const Review = ({ navigate }) => {
  const history = useHistory();

  const handleOnClick = () => {
    history.push("/dashboard");
  };

  return (
    <GovernmentJourneyLayout navigate={navigate} imgUrl={sideBg}>
      <div className="flex flex-col mb-3 items-start sm:items-center rounded-lg mt-10 w-full pt-20 sm:pt-2 md:pt-2 sm:p-2 md:p-2">
        <div className="hidden sm:flex md:flex sm:justify-center -mt-2 z-50 md:ml-10">
          <img src={MPPLogo} alt="MPP Logo" className="w-[170px] h-[170px]" />
        </div>
        <div className="flex flex-col mb-3 items-start rounded-lg sm:px-5 md:px-20 mt-5 w-full sm:h-screen sm:bg-gray-100 md:bg-gray-100 sm:py-20 md:py-20">
          <div className="relative flex items-center justify-center w-24 h-24 mb-14 sm:justify-center sm:items-center sm:m-auto md:justify-center md:items-center md:m-auto">
            <div className="absolute inset-0 wave-effect"></div>
            <div
              className="absolute inset-0 wave-effect"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute inset-0 wave-effect"
              style={{ animationDelay: "2s" }}
            ></div>
            <div className="relative flex items-center justify-center w-24 h-24 bg-[#1F4186] rounded-full">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm7-3l4 4"
                ></path>
              </svg>
            </div>
          </div>

          <span className="text-2xl font-bold text-center sm:text-2xl text-blue-800 sm:mt-8 md:mt-8 sm:justify-center sm:items-center sm:mx-auto md:justify-center md:items-center md:m-auto">
            Your account is being reviewed.
          </span>
          <span className="font-bold text-[16px] leading-[18px] tracking-tight text-blue-800 sm:text-sm md:text-sm mt-2 sm:m-auto md:m-auto">
            We’ll get back to you once the status is updated
          </span>
          <div className="flex w-250px sm:m-auto sm:justify-center sm:items-center md:m-auto md:justify-center md:items-center">
            <JourneyButton
              title="Go to my dashboard"
              type="submit"
              className="mt-32 sm:mt-7 md:mt-7 text-black text-base sm:w-full md:w-full"
              handleOnClick={handleOnClick}
            />
          </div>
        </div>
      </div>
    </GovernmentJourneyLayout>
  );
};

export default Review;
