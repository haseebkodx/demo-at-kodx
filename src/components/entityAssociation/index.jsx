import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ToolTip from "../commonComponents/ToolTip/index";
import useScreenSize from "./useScreenSize";
import InfoIconWhite from "../svg/InfoIconWhite";
import InformationIcon from "../svg/InformationIcon";
import { associationItems } from "../../utils/constants";
import JourneyLayout from "../commonComponents/JourneyLayout";
import sideBg from "../../assets/images/GovernmentJourney/sideBg.png";
import MPPLogo from "../../assets/images/logo.svg";

const EntityAssociation = ({ navigate }) => {
  const [selectedIndex, setSelectedIndex] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const history = useHistory();

  const screenSize = useScreenSize();

  const handleHover = (index) => {
    setSelectedIndex(index);
    setIsSelected(true);
  };

  const handleClick = (index) => {
    setSelectedIndex(index);
    setIsSelected(true);
    const paths = ["/gov-profile", "/business-profile", "/contractor-profile"];

    history.push(paths[index]);
  };

  const getTooltipPosition = (index) => {
    if (index === 0 && screenSize === "mb") return "top";
    else return "left";
  };

  return (
    <JourneyLayout navigate={navigate} imgUrl={sideBg}>
      <div className="w-full xl:pl-10">
        <div className="hidden sm:flex md:flex sm:justify-center mt-4 z-50 md:ml-10 sm:p-2 md:p-2">
          <img src={MPPLogo} alt="MPP Logo" className="w-[200px] h-[200px]" />
        </div>
        <div className="flex flex-col mb-3 items-start rounded-lg sm:px-5 md:px-20 mt-5 w-full md:max-h-fit sm:bg-gray-100 md:bg-gray-100 sm:py-10 md:py-10">
          <span className="text-2xl font-bold text-center">
            Who are you representing?
          </span>
          <div className="flex mt-2">
            <span className="bg-gradient-to-br from-sky-900 to-blue-600 w-28 h-1"></span>
          </div>
          <div className="flex sm:flex-col md:grid md:grid-cols-2 md:gap-5 xl:justify-start items-center xl:gap-10 w-full mt-10 md:pt-5 xl:pt-20 md:justify-center sm:justify-center gap-5">
            {associationItems.map((item, index) => {
              const isSelected = selectedIndex === index;
              const { DarkIcon, Icon } = item;

              return (
                <div
                  onMouseEnter={() => handleHover(index)}
                  onClick={() => handleClick(index)}
                  className="w-[272px] h-[204px] flex gap-4 mb:w-[200px] mb:h-[150px]"
                  key={index}
                >
                  <div
                    className={`flex flex-col cursor-pointer items-center p-4 rounded-lg w-full h-full border border-gray-300 gap-3 relative z-40 justify-center mb:p-2 ${
                      isSelected
                        ? "bg-gradient-to-br from-sky-900 to-blue-600 "
                        : "bg-white "
                    }`}
                  >
                    <div className="absolute right-5 top-4 z-10 mb:top-1 mb:right-2">
                      <ToolTip
                        icon={
                          isSelected ? <InfoIconWhite /> : <InformationIcon />
                        }
                        tooltipText={item.tooltipText}
                        position={getTooltipPosition(index)}
                        bullets={true}
                        className={
                          screenSize === "mb" && index === 0 ? "h-[318px]" : ""
                        }
                      />
                    </div>
                    {isSelected ? (
                      <Icon className="h-24 mb:h-16" />
                    ) : (
                      <DarkIcon className="h-24 mb:h-16" />
                    )}

                    <span
                      className={`text-center text-[15px] font-bold mb:text-[10px] mb:font-semibold ${
                        isSelected ? "text-white" : ""
                      }`}
                    >
                      {item.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </JourneyLayout>
  );
};

export default EntityAssociation;
