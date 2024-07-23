import React from "react";
import { useHistory } from "react-router-dom";
import GovernmentJourneyLayout from "../commonComponents/JourneyLayout";
import sideBg from "../../assets/images/GovernmentJourney/sideBg4.png";
import JourneyButton from "../commonComponents/JourneyButton";
import MPPLogo from "../../assets/images/logo.svg";

const SubContractorReview = ({ navigate }) => {
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
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M48.1427 52.8148L43.4829 57.4746L59.5958 73.5875L64.2556 68.9276L48.1427 52.8148Z"
                  fill="white"
                />
                <path
                  d="M54.9351 68.9281L59.595 73.5879L85.4899 47.6929L80.8301 43.0331L54.9351 68.9281Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_745_6405"
                    x1="79.008"
                    y1="85.89"
                    x2="19.116"
                    y2="18"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#1F4186" />
                    <stop offset="1" stopColor="#1F4186" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <span className="text-2xl font-bold text-center sm:text-xl text-stone-900 sm:text-blue-800  md:text-blue-800 sm:mt-8 md:mt-8 sm:justify-center sm:items-center sm:m-auto md:justify-center md:items-center md:m-auto">
            Great work on creating your profile!
          </span>
          <span className="font-normal text-[16px] text-stone-900 sm:text-blue-800 md:text-blue-800 sm:text-sm md:text-sm mt-2 sm:m-auto md:m-auto">
            Now let’s check out your user dashboard
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

export default SubContractorReview;
