import React, { useState, useMemo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import JourneyButton from "../commonComponents/JourneyButton/index";
import Help from "../commonComponents/Help";
import HelpIcon from "../svg/HelpIcon";
import DropdownComponent from "../commonComponents/DropDown/index";
import {
  affiliation,
  ContractorProfileinitialValues,
} from "../../utils/constants";
import JourneyLayout from "../commonComponents/JourneyLayout";
import sideBg from "../../assets/images/GovernmentJourney/sideBg2.png";
import Input from "../commonComponents/Input";
import { ContractorProfileSchema } from "../../validations";
import { subContractorBranchOptions } from "../../utils/constants";
import MPPLogo from "../../assets/images/logo.svg";

const SubContractorProfile = ({ navigate }) => {
  const [isSubmit, setISsubmit] = useState(false);
  const [wantHelp, setWantHelp] = useState(false);
  const [titleCaption, setTitleCaption] = useState("Submit");
  const history = useHistory();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setTitleCaption("Continue");
      } else if (window.innerWidth >= 800 && window.innerWidth < 1200) {
        setTitleCaption("Next: Continue Organization Profile");
      } else {
        setTitleCaption("Submit");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const formik = useFormik({
    validateOnMount: true,
    initialValues: ContractorProfileinitialValues,
    validationSchema: ContractorProfileSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      history.push("/contractor-information");
    },
  });

  const handleOnClick = () => {
    setISsubmit(true);
  };

  const isDisabled = useMemo(
    () =>
      !formik.values.firstName ||
      !formik.values.lastName ||
      !formik.values.emailAddress ||
      !formik.values.phoneNumber ||
      !formik.values.branch ||
      !formik.values.affiliation
  );

  return (
    <JourneyLayout navigate={navigate} imgUrl={sideBg}>
      <div className="flex flex-col mb-3 items-start sm:items-center rounded-lg mt-5 w-full sm:p-2 md:p-2">
        <div className="hidden sm:flex md:flex sm:justify-center -mt-2 z-50 md:ml-10">
          <img src={MPPLogo} alt="MPP Logo" className="w-[170px] h-[170px]" />
        </div>
        <div className="flex flex-col mb-3 items-start rounded-lg sm:px-5 md:px-20 mt-5 w-full sm:max-w-fit md:max-h-fit sm:bg-gray-100 md:bg-gray-100 sm:py-10 md:py-10">
          <span className="flex text-2xl font-bold text-center sm:hidden md:hidden">
            Let&apos;s Start by getting to know you.
          </span>
          <span className="hidden text-2xl font-bold text-center sm:flex md:flex">
            Tell us who you are.
          </span>
          <div className="flex justify-center mt-3 md:mt-5 sm:mt-5">
            <span className="bg-gradient-to-br from-sky-900 to-blue-600  w-28 h-1"></span>
          </div>
          <span className="font-normal text-[16px] mt-2 sm:font-semibold md:font-semibold">
            Already have an account?{" "}
            <span
              className="underline text-[#005EA2] cursor-pointer sm:font-semibold md:font-semibold"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </span>
          </span>
          <form
            className="flex flex-col gap-5 w-full mt-5 items-center xl:items-start"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex items-center md:justify-between gap-10 xl:gap-32 w-full mb:flex-wrap mb:gap-2">
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
                  labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
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
                  labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
                />
              </div>
            </div>
            <div className="flex items-center md:justify-between gap-10 xl:gap-32 w-full mb:flex-wrap mb:gap-2">
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
                  labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
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
                  labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
                />
              </div>
            </div>
            <div className="flex items-center md:justify-between gap-10 xl:gap-32 w-full mb:flex-wrap mb:gap-2">
              <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
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
                  labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
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
                  labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
                />
              </div>
            </div>

            <div className="flex items-center md:justify-between gap-10 xl:gap-32 w-full mb:flex-wrap mb:gap-2">
              <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                <DropdownComponent
                  label="I am with....."
                  name="branch"
                  options={subContractorBranchOptions}
                  value={formik.values.branch}
                  errors={isSubmit ? formik.errors.branch : undefined}
                  handleOnChange={formik.handleChange}
                  className="w-full"
                  required={false}
                  labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
                />
              </div>
              <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                <DropdownComponent
                  label="* Affiliation"
                  name="affiliation"
                  options={affiliation}
                  value={formik.values.affiliation}
                  errors={isSubmit ? formik.errors.affiliation : undefined}
                  handleOnChange={formik.handleChange}
                  className="w-full"
                  required={false}
                  labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
                />
              </div>
            </div>
            <div className="flex sm:w-full md:w-full">
              <JourneyButton
                title={titleCaption}
                type="submit"
                className={
                  "mt-16 mb:mt-8 text-black text-base mb:text-xs md:w-full sm:w-full sm:font-semibold md:font-semibold"
                }
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
      </div>
    </JourneyLayout>
  );
};

export default SubContractorProfile;
