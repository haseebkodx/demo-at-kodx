import React from "react";
import logo1 from "../../assets/images/CompanyLogos/logo-bp.svg";
import logo2 from "../../assets/images/CompanyLogos/logo-boeing.svg";
import logo3 from "../../assets/images/CompanyLogos/logo-raytheon.svg";
import logo4 from "../../assets/images/CompanyLogos/logo-ibm.svg";
import logo5 from "../../assets/images/CompanyLogos/logo-lockheedmartin.svg";
import logo6 from "../../assets/images/CompanyLogos/logo-l3harris.svg";
import logo7 from "../../assets/images/CompanyLogos/logo-mosaic.svg";
import logo8 from "../../assets/images/CompanyLogos/logo-jakobsjmark.svg";
import logo9 from "../../assets/images/CompanyLogos/logo-advancia.svg";
import logo10 from "../../assets/images/CompanyLogos/logo-evolve.svg";
import logo11 from "../../assets/images/CompanyLogos/logo-bell.svg";
import logo12 from "../../assets/images/CompanyLogos/logo-gdit.svg";
import logo13 from "../../assets/images/CompanyLogos/logo-cla.svg";
import logo14 from "../../assets/images/CompanyLogos/logo-i3.svg";
import logo15 from "../../assets/images/CompanyLogos/logo-wfs.svg";

import logo16 from "../../assets/images/CompanyLogos/logo-grant.svg";
import logo17 from "../../assets/images/CompanyLogos/logo-hos.svg";
import logo18 from "../../assets/images/CompanyLogos/logo-northernpump.svg";
import logo19 from "../../assets/images/CompanyLogos/logo-spark.svg";
import logo20 from "../../assets/images/CompanyLogos/logo-cti.svg";
import logo21 from "../../assets/images/CompanyLogos/logo-loc.svg";
import logo22 from "../../assets/images/CompanyLogos/logo-intlds.svg";
import logo23 from "../../assets/images/CompanyLogos/logo-tmp.svg";
import logo24 from "../../assets/images/CompanyLogos/logo-ng.svg";
import logo25 from "../../assets/images/CompanyLogos/logo-group.svg";
import logo26 from "../../assets/images/CompanyLogos/logo-rockwell.svg";
import logo27 from "../../assets/images/CompanyLogos/logo-saalex.svg";
import logo28 from "../../assets/images/CompanyLogos/logo-ula.svg";
import logo29 from "../../assets/images/CompanyLogos/logo-s3.svg";
import logo30 from "../../assets/images/CompanyLogos/logo-saic.svg";
import logo31 from "../../assets/images/CompanyLogos/logo-tmi.svg";
import logo32 from "../../assets/images/CompanyLogos/logo-telegram.svg";
import logo33 from "../../assets/images/CompanyLogos/logo-snc.svg";
import logo34 from "../../assets/images/CompanyLogos/logo-r.svg";
import logo35 from "../../assets/images/CompanyLogos/logo-t2s.svg";

const logos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
  logo11,
  logo12,
  logo13,
  logo14,
  logo15,
  logo16,
  logo17,
  logo18,
  logo19,
  logo20,
  logo21,
  logo22,
  logo23,
  logo24,
  logo25,
  logo26,
  logo27,
  logo28,
  logo29,
  logo30,
  logo31,
  logo32,
  logo33,
  logo34,
  logo35,
];

const CompanySection = () => {
  return (
    <section className="w-full z-40 relative bg-gradient-to-r from-blue-950 to-blue-900 px-8 pt-10 pb-20 lg:px-28">
      <h1 className="font-lato font-bold text-white text-5xl sm:text-2xl mb-5 leading-tight text-center w-full py-12 px-8 sm:px-0">
        <span className="text-[#FFE45F]"> Protégés </span>
        receive guidance from expert Mentors at
        <br /> top Prime Contractor companies like these:
      </h1>

      <div className="w-full flex flex-wrap items-center justify-center gap-[80px] sm:gap-[50px]">
        {logos.map((logo, index) => (
          <div key={index} className="flex justify-start items-center">
            <img
              src={logo}
              alt={`Company logo ${index + 1}`}
              className="max-h-25 sm:max-h-14"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanySection;
