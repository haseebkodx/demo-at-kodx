import React from "react";
import { displayViewFile } from "../multifileUpload/fileUploadService";

// Section Header Template
export const setSectionHeader = (sectionHeader) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12 pl-5">
          <h4>
            <strong>{sectionHeader}</strong>
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 pl-5">
          <div className="col-md-11 mentor-agreement-data-border"></div>
        </div>
      </div>
    </>
  );
};

export const setSubSectionHeader = (subSectionHeader) => {
  return (
    <div className="row mb-2">
      <div className="col-md-12 pl-5">
        <strong>{subSectionHeader}</strong>
      </div>
    </div>
  );
};

// Set Section Item
export const setSectionItem = (sectionItem, sectionTitle) => {
  return (
    <div className="row">
      <div className="col-md-12 p-0 pl-5 pr-5">
        {`${
          sectionTitle ? sectionTitle.concat(":").concat(" ") : ""
        }${sectionItem}`}
      </div>
    </div>
  );
};

// Set Two Items In A Section
export const setTwoItemSection = (
  firstItemTitle,
  firstItem,
  secondItemTitle,
  secondItem
) => {
  return firstItem || secondItem ? (
    <div className="row pl-5 pr-5">
      {firstItem && !secondItem && (
        <div className="col-md-12 p-0">{`${firstItemTitle}: ${firstItem}`}</div>
      )}
      {firstItem && secondItem && (
        <div className="col-md-4 p-0">{`${firstItemTitle}: ${firstItem}`}</div>
      )}
      {secondItem && (
        <div className="col-md-4 p-0">
          {`${secondItemTitle}: ${secondItem}`}
        </div>
      )}
    </div>
  ) : null;
};

// Find If All Of The Properties Falsy
export const areAllPropertiesTruthy = (data) => {
  const properties = Object.keys(data);
  return properties.some((property) => data[property] != null);
};

// Upload the provide file for the uuid to the browser
const uploadFileToBrowser = (uuid, name) => {
  displayViewFile(uuid, name);
};

// Display the Historical Background file and pass the uuid to the onclick handler
const displayHistoricalBackgroundFile = (name, uuid) => {
  return (
    <div className="row my-2">
      <div className="col-md-12 pl-5 pr-5">
        <a
          tabIndex="0"
          className="side-bar-file-upload focusable-item"
          onClick={() => uploadFileToBrowser(uuid, name)}
        >
          {name}
        </a>
      </div>
    </div>
  );
};

// Return Historical Background Files
export const getHistoricalBackgroundFileInformation = (
  historicalBackgroundFiles
) => {
  return historicalBackgroundFiles.map(({ name, uuid }) =>
    displayHistoricalBackgroundFile(name, uuid)
  );
};
