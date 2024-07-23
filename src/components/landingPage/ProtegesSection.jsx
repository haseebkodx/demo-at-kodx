import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import business from "../../assets/images/ProtegesSection/business.svg";
import education from "../../assets/images/ProtegesSection/education.svg";
import persons from "../../assets/images/ProtegesSection/persons.svg";
import technical from "../../assets/images/ProtegesSection/technical.svg";
import Button from "../commonComponents/Button";

const CardInfo = ({ logo, heading }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <span>{logo}</span>
      <p className="text-base sm:text-xs text-white text-center max-w-32">
        {heading}
      </p>
    </div>
  );
};

CardInfo.propTypes = {
  logo: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
};

const ProtegesSection = () => {
  const history = useHistory();
  const isMobile = useMediaQuery({ query: '(max-width: 639px)' });
  const dots = Array(9).fill(null);

  return (
    <section className="bg-linearBlue500 w-6/12 sm:w-full flex justify-center sm:py-8">
      <div className="flex flex-col sm:items-start space-y-8 md:px-20 py-[72px] sm:py-[20px] sm:px-5">
      {isMobile && (
        <div className="hidden sm:flex sm:flex-wrap sm:gap-8 sm:px-7">
          {dots.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 bg-yellow-50 rounded-full"
            ></div>
          ))}
        </div>
      )}
        <p className="font-lato font-bold text-white text-3xl md:text-xl sm:text-2xl max-w-96 sm:max-w-full w-full leading-10 sm:px-8">
          <span className="text-yellow-50">Protégés</span> receive guidance from
          top Prime Contractors.
        </p>
        <p className="font-lato font-medium text-2xl md:text-base sm:text-sm max-w-96 sm:max-w-full w-full text-white sm:px-8">
          Protégés connect with experts from top Prime Contractor companies,
          receiving assistance with things like:
        </p>
        <div className="grid mx-auto w-full grid-cols-2 gap-16 md:gap-24 pt-12">
          <CardInfo
            logo={
              <img
                src={technical}
                className="md:w-20 sm:w-11"
                alt="Technical assistance icon"
              />
            }
            heading="Technical and/or management assistance"
          />
          <CardInfo
            logo={
              <img
                src={persons}
                className="md:w-20 sm:w-11"
                alt="Administrative assistance icon"
              />
            }
            heading="General administrative assistance"
          />
          <CardInfo
            logo={
              <img src={education} className="md:w-20 sm:w-11" alt="Education icon" />
            }
            heading="Training and education"
          />
          <CardInfo
            logo={
              <img
                src={business}
                className="md:w-20 sm:w-11"
                alt="Business development icon"
              />
            }
            heading="Business development"
          />
        </div>
        <p className="font-lato text-center font-medium text-3xl sm:text-base text-white italic w-full">
          + MUCH MORE
        </p>
        <div className="w-full flex items-center justify-center">
          <div
            onClick={() => {
              history.push("/protegePath");
            }}
          >
            <Button
              title={
                <span className="md:text-xxs">
                  LEARN MORE ABOUT <strong>Protégés</strong>
                </span>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProtegesSection;
