import React, { useState, useMemo, useEffect } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import JourneyButton from "../commonComponents/JourneyButton/index";
import DropdownComponent from "../commonComponents/DropDown/index";
import Help from "../commonComponents/Help";
import HelpIcon from "../svg/HelpIcon";
import {
  RoleInitialValues,
  branchOptions,
  allRoleOptions,
} from "../../utils/constants";
import GovernmentJourneyLayout from "../commonComponents/JourneyLayout";
import sideBg from "../../assets/images/GovernmentJourney/sideBg3.png";
import ArrowLeft from "../svg/ArrowLeft";

const UserInformation = ({ navigate }) => {
  const [isSubmit, setISsubmit] = useState(false);
  const [wantHelp, setWantHelp] = useState(false);
  const [roleOptions, setRoleOptions] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      history.push("/gov-profile");
    }
  }, [isMobile, history]);

  const formik = useFormik({
    validateOnMount: true,
    initialValues: RoleInitialValues,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      history.push("/gov-review");
    },
  });

  useEffect(() => {
    setRoleOptions(
      formik.values.myBranch === "OSD"
        ? allRoleOptions["OSD"]
        : allRoleOptions["default"]
    );
  }, [formik.values.myBranch]);

  const handleOnClick = () => {
    setISsubmit(true);
  };

  const isDisabled = useMemo(
    () => !formik.values.myBranch || !formik.values.myRole,
    [formik.values.myBranch, formik.values.myRole]
  );

  return (
    <GovernmentJourneyLayout navigate={navigate} imgUrl={sideBg}>
      <div className="flex flex-col mb-3 items-start sm:items-center md:items-center rounded-lg mt-5 w-full sm:hidden md:hidden">
        <div
          className=" items-center gap-2 mb-4 hidden xl:flex cursor-pointer"
          onClick={() => history.goBack()}
        >
          <ArrowLeft />
          <span className="text-[16px] font-bold text-[#185151]">Back</span>
        </div>
        <span className="text-2xl font-bold text-center mb:text-base">
          Tell us who you are
        </span>
        <div className="flex justify-center mt-1">
          <span className="bg-gradient-to-br from-sky-900 to-blue-600  w-28 h-1"></span>
        </div>
        <span className="font-normal text-[16px] mb:text-xs mt-2">
          We want to be sure we’re connecting with the right person and that
          we’re connecting you with the right information.
        </span>
        <form
          className="flex flex-col gap-5 w-full mt-4 items-center xl:items-start"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex items-center gap-10 w-full mb:flex-wrap mb:gap-5">
            <div className="mb:w-full w-[380px]">
              <DropdownComponent
                label="I am with....."
                name="myBranch"
                options={branchOptions}
                value={formik.values.myBranch}
                errors={isSubmit ? formik.errors.myBranch : undefined}
                handleOnChange={formik.handleChange}
                className="w-full"
                required={false}
              />
            </div>
            <div className="mb:w-full w-[380px]">
              <DropdownComponent
                label="My role is....."
                name="myRole"
                options={roleOptions}
                value={formik.values.myRole}
                errors={isSubmit ? formik.errors.myRole : undefined}
                handleOnChange={formik.handleChange}
                className="w-full"
                required={false}
              />
            </div>
          </div>
          <div>
            <JourneyButton
              title=" Submit"
              type="submit"
              className="mt-32 text-black text-base mb:text-xs"
              disabled={isDisabled}
              handleOnClick={handleOnClick}
            />
          </div>
        </form>
        <div className="flex justify-end w-full xl:mt-10 relative">
          {wantHelp && <Help setWantHelp={setWantHelp} />}
          <HelpIcon
            className="lg:-mr-16 cursor-pointer xl:mt-0 -mr-10 -mt-14 mb:h-24"
            onClick={() => setWantHelp(true)}
          />
        </div>
      </div>
    </GovernmentJourneyLayout>
  );
};

export default UserInformation;
