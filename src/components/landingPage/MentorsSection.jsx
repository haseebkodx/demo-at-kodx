import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import users from "../../assets/images/MentorsSection/users.svg";
import cash from "../../assets/images/MentorsSection/cash.svg";
import people from "../../assets/images/MentorsSection/peoples.svg";
import Button from "../commonComponents/Button";

const InfoCard = ({ logo, heading }) => {
  return (
    <div className="max-w-[450px] w-full min-h-[100px] bg-[#0C3C91] rounded-md text-white flex items-center gap-4 p-4 sm:max-w-[330px] sm:mx-auto sm:min-h-[80px]">
      <span className="flex-shrink-0 min-w-[63px]">{logo}</span>
      <div>
        <h1 className="text-[20px] m-0">{heading}</h1>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  logo: PropTypes.node.isRequired,
  heading: PropTypes.node.isRequired,
};

const MentorsSection = () => {
  const history = useHistory();

  return (
    <section className="bg-linearBlue500 w-6/12 sm:w-full flex justify-center ">
      <div className="flex flex-col sm:items-start space-y-8 md:px-12 py-[72px] sm:py-[20px] sm:px-5">
        <p className="font-lato font-bold text-3xl text-white md:text-xl sm:text-2xl max-w-96 sm:max-w-full w-full leading-10 sm:px-8">
          <span className="text-[#FFE45F]">Mentors </span>
          shape careers, fortify the defense industry, and foster connections.
        </p>
        <p className="font-lato font-medium text-xl md:text-base sm:text-sm max-w-96 sm:max-w-full w-full text-white sm:px-8 pb-4">
          Mentors partner with small businesses to help enhance their
          capabilities to perform as subcontractors and viable suppliers under
          DoD contracts as well as other federal government and commercial
          contracts.
        </p>

        <InfoCard
          logo={
            <img src={users} className="md:w-16 sm:w-11" alt="Users icon" />
          }
          heading={
            <span className="md:text-xs sm:text-sm">
              Develop a high-quality <br /> subcontracting pool
            </span>
          }
        />
        <InfoCard
          logo={<img src={cash} className="md:w-16 sm:w-11" alt="Cash icon" />}
          heading={
            <span className="md:text-xs sm:text-sm">
              Receive cost reimbursement
              and a credit toward small
              business contracting goals
            </span>
          }
        />
        <InfoCard
          logo={
            <img src={people} className="md:w-20 sm:w-11" alt="People icon" />
          }
          heading={
            <span className="md:text-xs sm:text-sm">
              Pursue new market opportunities
              as part of a team
            </span>
          }
        />
        <div className="sm:w-full sm:flex sm:items-center sm:justify-center xl:ps-12 pt-4">
          <div
            onClick={() => {
              history.push("/mentorPath");
            }}
          >
            <Button
              title={
                <span className="md:text-xs sm:px-5 text-nowrap">
                  LEARN MORE ABOUT <strong>MENTORING</strong>
                </span>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorsSection;
