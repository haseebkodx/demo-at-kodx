import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import JourneyButton from "../commonComponents/JourneyButton/index";
import Help from "../commonComponents/Help";
import HelpIcon from "../svg/HelpIcon";
import { ContractorInformationinitialValues } from "../../utils/constants";
import JourneyLayout from "../commonComponents/JourneyLayout";
import sideBg from "../../assets/images/GovernmentJourney/sideBg5.png";
import Input from "../commonComponents/Input";
import { ContractorInformationSchema } from "../../validations";
import UploadIcon from "../svg/UploadIcon";
import Linkedin from "../svg/Linkedin";
import Facebook from "../svg/Facebook";
import Youtube from "../svg/Youtube";
import Instagram from "../svg/Instagram";
import MPPLogo from "../../assets/images/logo.svg";

const SubContractorInformation = () => {
  const [isSubmit, setISsubmit] = useState(false);
  const [wantHelp, setWantHelp] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    validateOnMount: true,
    initialValues: ContractorInformationinitialValues,
    validationSchema: ContractorInformationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      history.push("/contractor-review");
    },
  });

  const handleOnClick = () => {
    setISsubmit(true);
  };

  const isDisabled = useMemo(
    () =>
      !formik.values.orgName ||
      !formik.values.orgAddress ||
      !formik.values.orgMission ||
      !formik.values.orgVision ||
      !formik.values.orgState ||
      !formik.values.orgZipCode
  );

  return (
    <JourneyLayout imgUrl={sideBg}>
      <div className="flex flex-col mb-3 items-start sm:items-center rounded-lg mt-5 w-full sm:p-2 md:p-2">
        <div className="hidden sm:flex md:flex sm:justify-center -mt-2 z-50 md:ml-10">
          <img src={MPPLogo} alt="MPP Logo" className="w-[170px] h-[170px]" />
        </div>
        <div className="flex flex-col mb-3 items-start rounded-lg sm:px-5 md:px-20 mt-5 w-full sm:max-w-fit md:max-h-fit sm:bg-gray-100 md:bg-gray-100 sm:pt-10 md:pt-10">
          <span className="text-2xl font-bold text-center">
            About your organization
          </span>
          <div className="flex justify-center mt-3">
            <span className="bg-gradient-to-br from-sky-900 to-blue-600  w-28 h-1"></span>
          </div>
          <span className="font-normal text-[16px] mt-2">
            Information such as company names, SAM IDs and cage codes are pulled
            from sam.gov. If this data is inaccurate, please contact sam.gov
          </span>
          <form
            className="flex flex-col w-full mt-5"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col gap-5 w-full items-center xl:items-start">
              <div className="flex items-center md:justify-between gap-10 xl:gap-32 w-full mb:flex-wrap mb:gap-5">
                <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                  <Input
                    label="* Organization Name"
                    name="orgName"
                    type="text"
                    value={formik.values.orgName}
                    handleOnChange={formik.handleChange}
                    handleOnBlur={formik.handleBlur}
                    errors={isSubmit ? formik.errors.orgName : undefined}
                    className="w-full"
                    required={true}
                    labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
                  />
                </div>
                <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px] ">
                  <Input
                    label="* Organization Website"
                    name="orgWebsite"
                    type="text"
                    value={formik.values.orgWebsite}
                    handleOnChange={formik.handleChange}
                    handleOnBlur={formik.handleBlur}
                    errors={isSubmit ? formik.errors.orgWebsite : undefined}
                    className="w-full"
                    required={true}
                    labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
                  />
                </div>
              </div>
              <div className="flex items-center md:justify-between gap-10 xl:gap-32 w-full mb:flex-wrap mb:gap-3">
                <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                  <Input
                    label="SAM ID"
                    name="samID"
                    type="text"
                    value={formik.values.samID}
                    handleOnChange={formik.handleChange}
                    handleOnBlur={formik.handleBlur}
                    errors={isSubmit ? formik.errors.samID : undefined}
                    className="w-full"
                    required={false}
                    labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
                  />
                </div>
                <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                  <Input
                    label="Cage Code"
                    name="cageCode"
                    type="text"
                    value={formik.values.cageCode}
                    handleOnChange={formik.handleChange}
                    handleOnBlur={formik.handleBlur}
                    errors={isSubmit ? formik.errors.cageCode : undefined}
                    className="w-full"
                    required={false}
                    labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
                  />
                </div>
              </div>
              <div className="flex items-center md:justify-between gap-10 xl:gap-32 w-full mb:flex-wrap mb:gap-3">
                <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                  <Input
                    label="* Organization Address"
                    name="orgAddress"
                    type="text"
                    value={formik.values.orgAddress}
                    handleOnChange={formik.handleChange}
                    handleOnBlur={formik.handleBlur}
                    errors={isSubmit ? formik.errors.orgAddress : undefined}
                    className="w-full"
                    required={true}
                    labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
                  />
                </div>
                <div className="flex mb:w-full md:justify-between w-[380px] xl:w-[500px] gap-10">
                  <div className="w-full">
                    <Input
                      label="State"
                      name="orgState"
                      type="text"
                      value={formik.values.orgState}
                      handleOnChange={formik.handleChange}
                      handleOnBlur={formik.handleBlur}
                      errors={isSubmit ? formik.errors.orgState : undefined}
                      className="w-full"
                      required={true}
                      labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      label="Zip Code"
                      name="orgZipCode"
                      type="text"
                      value={formik.values.orgZipCode}
                      handleOnChange={formik.handleChange}
                      handleOnBlur={formik.handleBlur}
                      errors={isSubmit ? formik.errors.orgZipCode : undefined}
                      className="w-full"
                      required={true}
                      labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center md:justify-between gap-10 xl:gap-32 w-full mb:flex-wrap mb:gap-3">
                <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                  <Input
                    label="* Organization's Mission"
                    name="orgMission"
                    type="text"
                    value={formik.values.orgMission}
                    handleOnChange={formik.handleChange}
                    handleOnBlur={formik.handleBlur}
                    errors={isSubmit ? formik.errors.orgMission : undefined}
                    className="w-full"
                    required={false}
                    labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
                  />
                </div>
                <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                  <Input
                    label="* Organization's Vision"
                    name="orgVision"
                    type="text"
                    value={formik.values.orgVision}
                    handleOnChange={formik.handleChange}
                    handleOnBlur={formik.handleBlur}
                    errors={isSubmit ? formik.errors.orgVision : undefined}
                    className="w-full"
                    required={false}
                    labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
                  />
                </div>
              </div>
              <div className="flex items-center md:justify-between gap-10 xl:gap-32 w-full mb:flex-wrap mb:gap-3">
                <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                  <Input
                    label="Who We Serve"
                    name="orgCustomer"
                    type="text"
                    value={formik.values.orgCustomer}
                    handleOnChange={formik.handleChange}
                    handleOnBlur={formik.handleBlur}
                    errors={isSubmit ? formik.errors.orgCustomer : undefined}
                    className="w-full"
                    required={false}
                    labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
                  />
                </div>
                <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                  <Input
                    label="What Services We Provide"
                    name="orgService"
                    type="text"
                    value={formik.values.orgService}
                    handleOnChange={formik.handleChange}
                    handleOnBlur={formik.handleBlur}
                    errors={isSubmit ? formik.errors.orgService : undefined}
                    className="w-full"
                    required={false}
                    labelClass="sm:text-sm md:text-sm sm:font-semibold md:font-semibold"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 pt-5 pb-3">
              <span className="text-stone-900 text-base font-normal font-roboto">
                Upload Organization Materials{" "}
                <span className="text-blue-900 text-sm font-normal font-roboto pl-3">
                  (Max file size-500mb)
                </span>
              </span>
              <span className="text-neutral-500 text-sm font-normal font-roboto leading-tight mb-3">
                Use the Upload area to share completed projects, past
                performance details, testimonials, case studies, videos,
                capability statement.
              </span>
              <input type="file" id="file-input" className="h-0" />
              <label
                htmlFor="file-input"
                className="flex items-center justify-center h-10 bg-gray-100 border border-none rounded-lg cursor-pointer text-[#185151] font-bold w-28 gap-2 mb:text-xs"
              >
                <UploadIcon />
                Upload
              </label>
            </div>

            <div className="w-[1150px] mb:w-full h-[0px] border border-neutral-200"></div>

            <span className="text-blue-900 text-xl font-normal font-roboto py-4 sm:text-base">
              Organization{" "}
              <span className="font-bold">social media links (optional)</span>
            </span>
            <div className="flex flex-col gap-5 w-full items-center xl:items-start">
              <div className="flex items-center md:justify-center gap-10 xl:gap-32 w-full mb:flex-wrap mb:gap-3">
                <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                  <Input
                    label="Linkedin"
                    name="orgLinkedin"
                    type="text"
                    icon={<Linkedin />}
                    value={formik.values.orgLinkedin}
                    handleOnChange={formik.handleChange}
                    handleOnBlur={formik.handleBlur}
                    errors={isSubmit ? formik.errors.orgLinkedin : undefined}
                    className="w-full"
                    required={false}
                    labelClass="mb:text-xs"
                  />
                </div>
                <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                  <Input
                    label="Facebook"
                    name="orgFacebook"
                    type="text"
                    icon={<Facebook />}
                    value={formik.values.orgFacebook}
                    handleOnChange={formik.handleChange}
                    handleOnBlur={formik.handleBlur}
                    errors={isSubmit ? formik.errors.orgFacebook : undefined}
                    className="w-full"
                    required={false}
                    labelClass="mb:text-xs"
                  />
                </div>
              </div>
              <div className="flex items-center md:justify-center gap-10 xl:gap-32 w-full mb:flex-wrap mb:gap-3">
                <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                  <Input
                    label="YouTube"
                    name="orgYoutube"
                    type="text"
                    icon={<Youtube />}
                    value={formik.values.orgYoutube}
                    handleOnChange={formik.handleChange}
                    handleOnBlur={formik.handleBlur}
                    errors={isSubmit ? formik.errors.orgYoutube : undefined}
                    className="w-full"
                    required={false}
                    labelClass="mb:text-xs"
                  />
                </div>
                <div className="mb:w-full w-[380px] md:w-3/6 xl:w-[500px]">
                  <Input
                    label="Instagram"
                    name="orgInstagram"
                    type="text"
                    icon={<Instagram />}
                    value={formik.values.orgInstagram}
                    handleOnChange={formik.handleChange}
                    handleOnBlur={formik.handleBlur}
                    errors={isSubmit ? formik.errors.orgInstagram : undefined}
                    className="w-full"
                    required={false}
                    labelClass="mb:text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex sm:w-full md:w-full">
              <JourneyButton
                title="Continue"
                type="submit"
                className="mt-16 text-black sm:p-3 mb:text-xl sm:text-xl md:w-full sm:w-full sm:font-normal md:font-semibold"
                disabled={isDisabled}
                handleOnClick={handleOnClick}
              />
            </div>
          </form>
          <div className="flex justify-end w-full xl:mt-10 relative">
            {wantHelp && <Help setWantHelp={setWantHelp} />}
            <HelpIcon
              className="lg:-mr-16 cursor-pointer xl:mt-0 -mr-10 mb:h-24"
              onClick={() => setWantHelp(true)}
            />
          </div>
        </div>
      </div>
    </JourneyLayout>
  );
};

export default SubContractorInformation;
