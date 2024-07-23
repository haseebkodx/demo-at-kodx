import React from "react";
import { useHistory } from "react-router-dom";
import mainBg from "../../assets/images/CTA_bg.png";
import Button from "../commonComponents/Button";

const ProtegeCTASection = () => {
  const history = useHistory();

  return (
    <section className="relative bg-[#243d80] pt-0 sm:pt-2 w-full">
      <img
        src={mainBg}
        alt="Main background"
        className="w-full h-full absolute top-0 left-0 object-cover"
      />

      <div className="relative w-full flex justify-center items-center h-max-[364px] sm:px-[30px] px-[120px] py-5">
        <div className="w-full bg-[#B3D4FC] rounded-2xl text-center flex flex-col items-center shadow-lg py-8 px-8 mx-4 z-10">
          <h2 className="w-full text-slate-900 text-2xl sm:text-3xl lg:text-4xl font-bold font-lato leading-snug lg:leading-[33.23px] mb-4">
            Are you ready to become a Mentor yourself?
          </h2>
          <p className="w-full text-slate-900 text-base sm:text-lg lg:text-2xl font-normal font-lato leading-normal mb-6">
            Learn more about the opportunity to become an MPP Mentor.
          </p>
          <div
            onClick={() => {
              history.push("/mentorPath");
            }}
          >
            <Button title="Learn more about Mentors" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProtegeCTASection;
