import React from "react";
import mainBg from "../../assets/images/MppSubmitSection/main-bg.svg";
import skyline from "../../assets/images/MppSubmitSection/skyline.svg";
import logo from "../../assets/images/MppSubmitSection/logo.svg";
import date from "../../assets/images/MppSubmitSection/date.svg";
import Button from "../commonComponents/Button";

const MppSubmitSection = () => {
  return (
    <section className="relative bg-black">
      <img
        src={mainBg}
        alt="Main background"
        className="absolute left-0 top-0 w-screen object-cover h-full bg-[#243d80]"
      />
      <div className="relative">
        <h1 className="font-lato font-bold text-white text-5xl sm:text-3xl leading-tight text-center w-full py-12 px-8 sm:px-0 m-0">
          Network with current and potential Mentors and
          <br /> Protégés at the annual
          <span className="text-[#FFE45F]"> Mentor-Protégé Summit.</span>
        </h1>
        <div className="z-30 w-full items-center justify-center space-y-4 sm:top-32 flex flex-col px-8 xl:space-y-16 lg:space-y-10">
          <img
            src={logo}
            alt="Event logo"
            className="sm:w-[350px] sm:h-[70px]"
          />
          <img
            src={date}
            alt="Event date"
            className="sm:w-[350px] sm:h-[60px]"
          />
          <a
            href="https://web.cvent.com/event/0c4877d1-697c-48ca-aebd-01df112c2a0f/websitePage:fb32d815-6dc5-41b6-a2ea-246fc3371fc1"
            rel="noreferrer"
            target="_blank"
          >
            <Button title="REGISTER NOW" />
          </a>
        </div>
        <img src={skyline} alt="Skyline background" className="w-screen" />
      </div>
    </section>
  );
};

export default MppSubmitSection;
