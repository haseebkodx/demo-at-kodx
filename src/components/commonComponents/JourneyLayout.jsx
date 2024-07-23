import React, { useEffect, useState, useMemo } from "react";
import mainBg from "../../assets/images/GovernmentJourney/govnJourneyBg.png";
import MPPLogo from "../../assets/images/logo.svg";
import landingBg from "../../assets/images/GovernmentJourney/landing.png";

const JourneyLayout = ({ children, imgUrl }) => {
  const [isMaxWidthReached, setIsMaxWidthReached] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMaxWidthReached(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full flex h-screen relative flex-row mb-[-70px]">
      <div className="w-[376px] h-full relative bg-gradient-to-b from-blue-900 to-blue-900 flex flex-col md:hidden sm:hidden">
        <div
          className="bg-cover bg-no-repeat h-full w-[376px] bg-center"
          style={{
            backgroundImage: `url(${mainBg})`,
          }}
        >
          <div className="flex mt-16 justify-center z-50">
            <img src={MPPLogo} alt="MPP Logo" className="w-[220px] h-[220px]" />
          </div>
        </div>
      </div>
      <div
        style={
          isMaxWidthReached
            ? {
                backgroundImage: `url(${landingBg}), linear-gradient(to bottom, #1e3a8a, #1e3a8a)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
        className={`bg-[#F5F5F5] sm:bg-gradient-to-b sm:from-blue-900 sm:to-blue-900 md:bg-gradient-to-b md:from-blue-900 md:to-blue-900 flex p-20 sm:px-1 md:px-1 md:pb-1 sm:pt-2 md:pt-2 overflow-x-hidden w-full xl:pl-24 lg:pl-24 min-h-screen`}
      >
        {children}
      </div>
      <div className="absolute bottom-0 left-0 w-[376px] h-[600px] z-30 bg-gradient-to-b from-blue-900 to-blue-900 opacity-30 flex md:hidden sm:hidden" />
      <div className="absolute bottom-0 left-0">
        <img
          src={imgUrl}
          alt="Side background"
          className="z-20 relative max-w-[377px] object-contain flex md:hidden sm:hidden"
        />
      </div>
    </div>
  );
};

export default JourneyLayout;
