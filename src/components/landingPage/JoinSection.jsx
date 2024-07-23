import React from "react";
import line from "../../assets/images/JoinSection/Line.svg";
import logo from "../../assets/images/JoinSection/logo.svg";
import logo2 from "../../assets/images/JoinSection/bp-logo-2.svg";
import logo3 from "../../assets/images/JoinSection/bp-logo-3.svg";
import logo4 from "../../assets/images/JoinSection/bp-logo-4.svg";
import logo5 from "../../assets/images/JoinSection/bp-logo-5.svg";
import logo6 from "../../assets/images/JoinSection/bp-logo-6.svg";
import logo7 from "../../assets/images/JoinSection/bp-logo-7.svg";

const JoinSection = () => {
  return (
    <section className="w-full z-40 relative bg-[#071646] px-[120px] md:px-10 sm:flex-col sm:justify-center sm:gap-4 sm:px-8 py-8 flex items-center justify-between">
      <div className="flex gap-2 justify-center items-center sm:w-full">
        <img src={line} alt="Decorative line" />
        <p className="ml-3 font-lato text-xl md:text-xs sm:text-sm tracking-[0.03em] text-white m-0 flex items-start justify-start text-start">
          JOIN OUR MENTOR COMMUNITY <br />
          REPRESENTING TOP PRIME CONTRACTORS
        </p>
      </div>
      <div className="flex gap-x-3 gap-y-6 flex-wrap items-center justify-center">
        <div className="flex justify-center items-center gap-6">
          <img src={logo} className="md:w-8 sm:w-8" alt="Company logo 1" />
          <img src={logo2} className="md:w-8 sm:w-8" alt="Company logo 2" />
          <img src={logo3} className="md:w-8 sm:w-8" alt="Company logo 3" />
          <img src={logo4} className="md:w-8 sm:w-8" alt="Company logo 4" />
          <img src={logo5} className="md:w-8 sm:w-8" alt="Company logo 5" />
          <img src={logo6} className="md:w-8 sm:w-8" alt="Company logo 6" />
          <img src={logo7} className="md:w-8 sm:w-8" alt="Company logo 7" />
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
