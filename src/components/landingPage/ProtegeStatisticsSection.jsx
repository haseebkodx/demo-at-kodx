import React from "react";
import arrow from "../../assets/images/arror_bg.svg";

const StatisticCard = ({ value, text }) => {
  const values = value.split(",");

  return (
    <div className="w-[328px] h-[206px] flex flex-col justify-center items-center">
      <div className="flex items-center">
        {values.map((val, index) => (
          <React.Fragment key={index}>
            <div className="text-[#C8E1FF] text-[64px] font-black font-lato leading-[54px]">
              {val}
            </div>
            {index < values.length - 1 && (
              <img src={arrow} alt="Arrow icon" className="mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center text-white text-2xl font-normal font-lato leading-loose mt-3">
        {text}
      </div>
    </div>
  );
};

const ProtegeStatisticsSection = () => {
  return (
    <section className="w-full z-40 relative bg-gradient-to-b from-[#0B1E5A] to-[#172E77] px-[120px] sm:flex-col sm:justify-center sm:gap-4 sm:px-8 pt-8 pb-20 flex items-center justify-center">
      <div className="flex flex-wrap justify-center items-center gap-6">
        <StatisticCard value="5X" text="Significant statistic here" />
        <StatisticCard value="90%" text="Significant statistic here" />
        <StatisticCard value="87%" text="Significant statistic here" />
      </div>
    </section>
  );
};

export default ProtegeStatisticsSection;
