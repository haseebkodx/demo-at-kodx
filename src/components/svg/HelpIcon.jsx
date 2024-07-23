import React from "react";

const HelpIcon = (props) => (
  <svg
    {...props}
    width="143"
    height="143"
    viewBox="0 0 143 143"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_826_6164)">
      <ellipse cx="71.5" cy="67.1294" rx="31.5" ry="31.1294" fill="#243E81" />
    </g>
    <path
      d="M62.9764 58.5719C62.9764 47.252 80.7647 47.2521 80.7647 58.5719C80.7647 66.6574 72.6791 65.0401 72.6791 74.7427"
      stroke="white"
      strokeWidth="3.57116"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M72.6992 84.497L72.7229 84.4707"
      stroke="white"
      strokeWidth="3.57116"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <filter
        id="filter0_d_826_6164"
        x="0"
        y="0"
        width="143"
        height="142.26"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="20" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_826_6164"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_826_6164"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default HelpIcon;
