import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { reduxForm } from "redux-form";
import InputCheckbox from "./commonComponents/forms/InputCheckbox";
import login from "./login.action";
import { keydownHandler } from "./commonComponents/utility";
import landingImage from "../assets/images/GovernmentJourney/landing.png";
import NextIcon from "../assets/images/GovernmentJourney/nextIcon.svg";
import CloseIcon from "../assets/images/GovernmentJourney/Close.svg";

const SignUpRedirectPage = () => {
  const loginSignup = "Signup";
  const history = useHistory();

  const handleLogin = async () => {
    const loginData = await login();
    loginData && loginData.url && window.location.replace(loginData.url);
  };

  const loginRedirectValue = useSelector(
    (state) =>
      state.form &&
      state.form.loginRedirectModal &&
      state.form.loginRedirectModal.values
  );

  useEffect(() => {
    if (loginRedirectValue && loginRedirectValue["loginCheck"]) {
      setIsChecked(true);
      setIsDisabled(false);
    } else if (
      loginRedirectValue &&
      loginRedirectValue["loginCheck"] === false
    ) {
      setIsChecked(false);
      setIsDisabled(true);
    }
  }, [loginRedirectValue && loginRedirectValue["loginCheck"]]);

  const [isDisabled, setIsDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      className="flex items-center justify-center min-h-screen sm:py-1 bg-[#243D80] bg-no-repeat bg-cover p-6 sm:p-0 mb-[-70px]"
      style={{
        backgroundImage: `url(${landingImage})`,
      }}
    >
      <div className="bg-white rounded shadow-lg sm:w-full sm:max-h-fit max-w-[520px] h-full max-h-[80vh] sm:mx-2 overflow-auto">
        <div className="justify-between items-center px-2 pt-2 bg-white sticky top-0 z-10">
          <div className="absolute right-1 top-1">
            <button className="text-black hover:text-gray-600">
              <img src={CloseIcon} alt="Close" className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center w-full">
            <div className="flex-grow border-t border-black"></div>
            <div className="w-[238px] text-center text-black/opacity-90 text-2xl font-black font-lato uppercase leading-loose tracking-[3px]">
              Important
            </div>
            <div className="flex-grow border-t border-black"></div>
          </div>
        </div>
        <div className="px-6 pb-6 max-h-[calc(100%_-_93px)] overflow-hidden">
          <div className="w-full">
            <span className="text-zinc-800 text-base font-normal font-lato leading-normal">
              When signing up with Login.gov,{" "}
            </span>
            <span className="text-zinc-800 text-base font-black font-lato leading-normal">
              you must use your work email address{" "}
            </span>
            <span className="text-zinc-800 text-base font-normal font-lato leading-normal">
              so the system can associate you with your company.
            </span>
          </div>

          <div className="bg-[#DBEBFF] text-xs font-normal text-zinc-800 leading-['18px'] font-lato space-y-2 mt-2 mb-3 pl-[20px] pt-[18px] pr-[18px] pb-[20px]">
            <p>
              You are accessing a U.S. Government (USG) Information system (IS)
              that is provided for USG-authorized use only.
            </p>

            <p>
              By using this IS (which includes any device attached to this IS),
              you consent to the following conditions:
            </p>

            <ul className="list-disc pl-3 space-y-4">
              <li>
                The USG regularly intercepts and monitors communications on this
                IS for purposes including but not limited to penetration
                testing, COMSEC monitoring, network operations and defense,
                personnel misconduct (PM), law enforcement (LE), and
                counterintelligence (CI) investigations.
              </li>
              <li>
                At any time, the USG may inspect and seize data stored on this
                IS.
              </li>
              <li>
                Communications using or data stored on this IS are not private,
                are subject to routine monitoring, interception, and search, and
                may be disclosed or used for any USG-authorized purpose.
              </li>
              <li>
                This IS includes security measures (e.g., authentication and
                access controls) to protect USG interests - not for your
                personal benefit or privacy.
              </li>
              <li>
                Notwithstanding the above, using this IS does not constitute
                consent to PM, LE, or CI investigative searching or monitoring
                of the content of privileged communications or work product
                related to personal representation or services by attorneys,
                psychotherapists, or clergy, and their assistants. Such
                communications and work product are private and confidential.
                See User Agreement for details.
              </li>
            </ul>
          </div>
          <div className="px-2 space-y-3">
            <InputCheckbox
              label={
                <div>
                  <span aria-hidden="true">*</span>I have read and understood
                  the above statement
                </div>
              }
              name="loginCheck"
              id="loginCheck"
              placeholder="Login checkbox"
              value={
                loginRedirectValue && loginRedirectValue["loginCheck"]
                  ? true
                  : false
              }
              checked={
                loginRedirectValue && loginRedirectValue["loginCheck"]
                  ? true
                  : false
              }
              required={true}
              ariaRequired={true}
              errorMessage={`You must check the checkbox to proceed.`}
              onKeyDown={keydownHandler}
            />

            <div className="flex gap-[16px] md:flex-row xl:flex-row sm:flex-col-reverse">
              <div className="relative bg-[linear-gradient(to_bottom,#AD8B27,#F7E582,#AD8B27)] p-[3px] rounded-[3px] h-max w-full md:w-fit lg:w-fit">
                <button className="px-4 py-2 border border-gray-300 rounded text-[15px] leading-relaxed tracking-wide font-lato uppercase md:text-sm font-normal hover:bg-gray-50 bg-white w-full">
                  Cancel
                </button>
              </div>
              <button
                className="px-4 py-2 bg-yellow-500 text-black rounded text-[15px] leading-relaxed tracking-wide font-lato uppercase md:text-sm font-medium hover:bg-yellow-600 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-300 border border-solid border-[rgba(242,213,107,0.59)] shadow-md flex items-center justify-between gap-2 disabled:opacity-50"
                disabled={isDisabled}
                onClick={handleLogin}
              >
                Go To Login.Gov{" "}
                <img
                  src={NextIcon}
                  alt="Next"
                  className="w-[24px] h-[24px] group-hover:text-white"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default reduxForm({
  enableReinitialize: true,
  form: "loginRedirectModal",
})(SignUpRedirectPage);
