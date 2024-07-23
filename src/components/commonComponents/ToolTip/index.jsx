import React from "react";

const ToolTip = ({ position, tooltipText, icon, bullets, className }) => {
  return (
    <div className="tooltip relative text-xs z-[999]">
      <span className="cursor-pointer icon">{icon}</span>
      <ul
        className={`${className} max-w-[280px] tooltiptext list-none flex flex-col gap-2 ${position} px-8 py-4 z-[999]`}
      >
        {tooltipText?.map((item, index) => (
          <li key={index} className="flex flex-col gap-1">
            <span className="font-medium text-[#185151]">{item.heading}</span>
            <ul className="flex-col flex gap-1">
              {item?.desc?.map((desc, descIndex) => (
                <li
                  key={descIndex}
                  className={`${bullets ? "list-disc" : "list-none"}`}
                >
                  {desc}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolTip;
