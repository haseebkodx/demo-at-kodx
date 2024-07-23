import React, { useState, useMemo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import JourneyButton from "../commonComponents/JourneyButton/index";
import Help from "../commonComponents/Help";
import HelpIcon from "../svg/HelpIcon";
import GovernmentJourneyLayout from "../commonComponents/JourneyLayout";
import sideBg from "../../assets/images/GovernmentJourney/sideBg2.png";
import Input from "../commonComponents/Input";
import { GovernmentProfileSchema } from "../../validations";
import MPPLogo from "../../assets/images/logo.svg";
import DropdownComponent from "../commonComponents/DropDown/index";
import {
  GovernmentProfileinitialValues,
  RoleInitialValues,
  branchOptions,
  allRoleOptions,
} from "../../utils/constants";

const GovernmentProfile = ({ navigate }) => {
  const [isSubmit, setISsubmit] = useState(false);
  const [wantHelp, setWantHelp] = useState(false);
  const [roleOptions, setRoleOptions] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    validateOnMount: true,
    initialValues: { ...GovernmentProfileinitialValues, ...RoleInitialValues },
    validationSchema: GovernmentProfileSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      if (isDesktop) {
        history.push("/gov-userinformation");
      }
      if (isMobile) {
        history.push("/gov-review");
      }
    },
  });

  const handleDesktopOnClick = () => {
    setISsubmit(true);
    setIsDesktop(true);
    setIsMobile(false);
  };
  const handleMobileOnClick = () => {
    setISsubmit(true);
    setIsMobile(true);
    setIsDesktop(false);
  };

  const isDisabled = useMemo(
    () =>
      !formik.values.firstName ||
      !formik.values.lastName ||
      !formik.values.emailAddress ||
      !formik.values.phoneNumber
  );

  useEffect(() => {
    setRoleOptions(
      formik.values.myBranch === "OSD"
        ? allRoleOptions["OSD"]
        : allRoleOptions["default"]
    );
  }, [formik.values.myBranch]);

  return (
    <GovernmentJourneyLayout navigate={navigate} imgUrl={sideBg}>
      <div className="flex flex-col mb-3 items-start sm:items-center rounded-lg mt-5 sm:mt-1 md:mt-1 w-full sm:p-2 md:p-2">
        <div className="hidden sm:flex md:flex sm:justify-center -mt-2 z-50 md:ml-10">
          <img src={MPPLogo} alt="MPP Logo" className="w-[170px] h-[170px]" />
        </div>
        <div className="flex flex-col mb-3 items-start rounded-lg sm:px-5 md:px-20 mt-5 w-full sm:max-w-fit md:max-h-fit sm:bg-gray-100 md:bg-gray-100 sm:pt-10 sm:pb-5 md:py-10">
          <span className="flex text-2xl font-bold text-center sm:hidden md:hidden">
            Let&apos;s Start by getting to know you.
          </span>
          <span className="hidden text-2xl font-bold text-center sm:flex md:flex">
            Tell us who you are.
          </span>
          <div className="flex justify-center mt-3 md:mt-5 sm:mt-5">
            <span className="bg-gradient-to-br from-sky-900 to-blue-600  w-28 h-1"></span>
          </div>
          <span className="font-normal text-[16px] mt-2">
            Already have an account?{" "}
            <span
              className="underline text-[#005EA2] cursor-pointer"
              onClick={() => history.push("/signin")}
            >
              Sign in
            </span>
          </span>
          <form
            className="flex flex-col gap-5 w-full mt-3 lg:mt-5 xl:mt-5 items-center xl:items-start"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex items-center md:justify-between gap-10 xl:gap-32 w-full mb:flex-wrap mb:gap-5">
              <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                <Input
                  label="* First Name"
                  name="firstName"
                  type="text"
                  value={formik.values.firstName}
                  handleOnChange={formik.handleChange}
                  handleOnBlur={formik.handleBlur}
                  errors={isSubmit ? formik.errors.firstName : undefined}
                  className="w-full"
                  required={true}
                  labelClass="mb:text-lg md:text-lg"
                />
              </div>
              <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px] ">
                <Input
                  label="* Last Name"
                  name="lastName"
                  type="text"
                  value={formik.values.lastName}
                  handleOnChange={formik.handleChange}
                  handleOnBlur={formik.handleBlur}
                  errors={isSubmit ? formik.errors.lastName : undefined}
                  className="w-full"
                  required={true}
                  labelClass="mb:text-lg md:text-lg"
                />
              </div>
            </div>
            <div className="flex items-center md:justify-between gap-10 xl:gap-32 w-full mb:flex-wrap mb:gap-3">
              <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                <Input
                  label="Preffered Name"
                  name="preferredName"
                  type="text"
                  value={formik.values.preferredName}
                  handleOnChange={formik.handleChange}
                  handleOnBlur={formik.handleBlur}
                  errors={isSubmit ? formik.errors.preferredName : undefined}
                  className="w-full"
                  required={false}
                  labelClass="mb:text-lg md:text-lg"
                />
              </div>
              <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                <Input
                  label="Title"
                  name="title"
                  type="text"
                  value={formik.values.title}
                  handleOnChange={formik.handleChange}
                  handleOnBlur={formik.handleBlur}
                  errors={isSubmit ? formik.errors.title : undefined}
                  className="w-full"
                  required={false}
                  labelClass="mb:text-lg md:text-lg"
                />
              </div>
            </div>
            <div className="flex items-center md:justify-between gap-10 xl:gap-32 w-full mb:flex-wrap mb:gap-3">
              <div className="mb:w-full w-[380px]  md:w-3/6 xl:w-[500px]">
                <Input
                  label="* Email Address"
                  name="emailAddress"
                  type="text"
                  value={formik.values.emailAddress}
                  handleOnChange={formik.handleChange}
                  handleOnBlur={formik.handleBlur}
                  errors={isSubmit ? formik.errors.emailAddress : undefined}
                  className="w-full"
                  required={true}
                  labelClass="mb:text-lg md:text-lg"
                />
              </div>
              <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                <Input
                  label="* Phone Number"
                  name="phoneNumber"
                  type="text"
                  value={formik.values.phoneNumber}
                  handleOnChange={formik.handleChange}
                  handleOnBlur={formik.handleBlur}
                  errors={isSubmit ? formik.errors.phoneNumber : undefined}
                  className="w-full"
                  required={true}
                  labelClass="mb:text-lg md:text-lg"
                />
              </div>
            </div>
            <div className="hidden items-center md:justify-between gap-10 w-full mb:flex-wrap mb:gap-5 sm:flex md:flex">
              <div className="mb:w-full w-[380px] md:w-3/6">
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
              <div className="mb:w-full w-[380px] md:w-3/6">
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
            <div className="flex sm:hidden md:hidden">
              <JourneyButton
                title="Submit"
                type="submit"
                className="mt-32 text-black text-base mb:text-xs"
                disabled={isDisabled}
                handleOnClick={handleDesktopOnClick}
              />
            </div>
            <div className="hidden sm:flex md:flex w-full sm:mt-6">
              <JourneyButton
                title="Submit"
                type="submit"
                className="w-full"
                disabled={isDisabled}
                handleOnClick={handleMobileOnClick}
              />
            </div>
          </form>
          <div className="flex justify-end w-full xl:mt-10 relative">
            {wantHelp && <Help setWantHelp={setWantHelp} />}
            <HelpIcon
              className="lg:-mr-16 cursor-pointer xl:mt-0 -mr-10 mb:h-24 sm:-mb-8 md:-mb-14"
              onClick={() => setWantHelp(true)}
            />
          </div>
        </div>
      </div>
    </GovernmentJourneyLayout>
  );
};

export default GovernmentProfile;
