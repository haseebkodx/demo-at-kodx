import React, { useEffect, useState } from "react";
import login from "../login.action";
import sideBg from "../../assets/images/participateBg.png";
import Button from "../commonComponents/Button";
import LoginRedirectModal from "../LoginRedirectModal";

const ParticipateSection = () => {
  const [isLoginRedirectModalVisible, setIsLoginRedirectModalVisible] =
    useState(false);
  const [loginSignup, setLoginSignup] = useState("Login");

  const LoginModalVisible = (val) => {
    setIsLoginRedirectModalVisible(true);
    setLoginSignup(val);
  };

  useEffect(() => {
    return () => {
      setIsLoginRedirectModalVisible(false);
      setLoginSignup("Login");
    };
  }, []);

  const handleLogin = async () => {
    const loginData = await login();
    loginData && loginData.url && window.location.replace(loginData.url);
  };

  return (
    <>
      {
        <LoginRedirectModal
          loginSignup={loginSignup}
          showModal={isLoginRedirectModalVisible}
          showModalHandler={() => setIsLoginRedirectModalVisible(false)}
          loginHandler={() => handleLogin()}
        />
      }
      <section className="w-full z-40 relative bg-gradient-to-r from-blue-950 to-blue-900 px-[120px] sm:px-8 pt-10 pb-12">
        <h1 className="font-lato font-bold text-white text-5xl sm:text-3xl leading-tight text-center w-full py-12 px-8 sm:px-0 m-0">
          How to participate in the
          <span className="text-[#FFE45F]"> Mentor-Protégé Program </span>
        </h1>

        <div className="relative">
          <div className="w-full flex sm:flex-col items-end justify-center sm:gap-8">
            <img
              src={sideBg}
              alt="Hand holding phone"
              className="object-contain z-10 rounded-[410px]"
            />
            <div className="flex flex-col gap-2 max-w-[800px]">
              <div className="w-full h-full flex items-center justify-start bg-indigo-50 rounded gap-5 px-3 py-1">
                <div className="text-[#0C3C91] opacity-60 text-[76px] sm:text-[60px] font-semibold font-['Oswald'] leading-[76px]">
                  1
                </div>
                <div className="flex flex-col">
                  <span className="text-blue-900 text-xl sm:text-[16px] font-bold font-lato leading-tight">
                    Establish a Counterpart:
                  </span>
                  <span className="text-black text-xl sm:text-[16px] font-normal font-lato leading-tight">
                    Mentors and Protégés are responsible for finding each other.
                  </span>
                </div>
              </div>

              <div className="w-full h-full flex items-center justify-start bg-indigo-50 rounded gap-5 px-3 py-2">
                <div className="text-[#0C3C91] opacity-60 text-[76px] sm:text-[60px] font-semibold font-['Oswald'] leading-[76px]">
                  2
                </div>
                <div className="flex flex-col">
                  <span className="text-blue-900 text-xl sm:text-[16px] font-bold font-lato leading-tight">
                    Determine Agreement Type:
                  </span>
                  <span className="text-black text-xl sm:text-[16px] font-normal font-lato leading-tight">
                    Reimbursable, Credit, or Hybrid.
                  </span>
                </div>
              </div>

              <div className="w-full h-full flex items-center justify-start bg-indigo-50 rounded gap-5 px-3 py-2">
                <div className="text-[#0C3C91] opacity-60 text-[76px] sm:text-[60px] font-semibold font-['Oswald'] leading-[76px]">
                  3
                </div>
                <div className="flex flex-col">
                  <span className="text-blue-900 text-xl sm:text-[16px] font-bold font-lato leading-tight">
                    Develop the Agreement:
                  </span>
                  <span className="text-black text-xl sm:text-[16px] font-normal font-lato leading-tight">
                    Align developmental assistance with the protégé&apos;s
                    strategic vision.
                  </span>
                </div>
              </div>

              <div className="w-full h-full flex items-center justify-start bg-indigo-50 rounded gap-5 px-3 py-2">
                <div className="text-[#0C3C91] opacity-60 text-[76px] sm:text-[60px] font-semibold font-['Oswald'] leading-[76px]">
                  4
                </div>
                <div className="flex flex-col">
                  <span className="text-blue-900 text-xl sm:text-[16px] font-bold font-lato leading-tight">
                    Submit Agreement Proposal:
                  </span>
                  <span className="text-black text-xl sm:text-[16px] font-normal font-lato leading-tight">
                    Contact the agency&apos;s small business office for
                    submission details.
                  </span>
                </div>
              </div>

              <div className="w-full h-full flex items-center justify-start bg-indigo-50 rounded gap-5 px-3 py-2">
                <div className="text-[#0C3C91] opacity-60 text-[76px] sm:text-[60px] font-semibold font-['Oswald'] leading-[76px]">
                  5
                </div>
                <div className="flex flex-col">
                  <span className="text-blue-900 text-xl sm:text-[16px] font-bold font-lato leading-tight">
                    Start the Agreement:
                  </span>
                  <span className="text-black text-xl sm:text-[16px] font-normal font-lato leading-tight">
                    Credit agreements start on approval; reimbursed agreements
                    start when funds are obligated.
                  </span>
                </div>
              </div>

              <div className="w-full h-full flex items-center justify-start bg-indigo-50 rounded gap-5 px-3 py-2">
                <div className="text-[#0C3C91] opacity-60 text-[76px] sm:text-[60px] font-semibold font-['Oswald'] leading-[76px]">
                  6
                </div>
                <div className="flex flex-col">
                  <span className="text-blue-900 text-xl sm:text-[16px] font-bold font-lato leading-tight">
                    Follow Reporting and Defense Contract Management Agency
                    (DCMA) Review and Reporting Requirements:{" "}
                    <span className="text-black text-xl sm:text-[16px] font-normal font-lato leading-tight">
                      These impact the mentor&apos;s reimbursement eligibility
                      in the remaining years of direct reimbursement agreements.
                    </span>
                  </span>
                </div>
              </div>

              <div className="w-full h-full flex items-center justify-start bg-indigo-50 rounded gap-5 px-3 py-2">
                <div className="text-[#0C3C91] opacity-60 text-[76px] sm:text-[60px] font-semibold font-['Oswald'] leading-[76px]">
                  7
                </div>
                <div className="flex flex-col">
                  <span className="text-blue-900 text-xl sm:text-[16px] font-bold font-lato leading-tight">
                    Ask Questions:
                  </span>
                  <span className="text-black text-xl sm:text-[16px] font-normal font-lato leading-tight">
                    Contact your agency&apos;s small business office or email{" "}
                    <a href="mailto:osd.pentagon.ousd-a-s.mbx.osbp-mpp@mail.mil">DoD&apos;s Office of Small Business Programs MPP</a> for assistance.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full text-center text-white text-xl sm:text-[16px] py-10">
            A more in-depth guide to MPP participation can be found here:&nbsp;
            <a
              href="https://business.defense.gov/Programs/Mentor-Protege-Program/How-to-Participate/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline"
            >
              How to Participate
            </a>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div onClick={() => LoginModalVisible("Login")}>
            <Button
              title={
                <span>
                  Start My <strong>Protégé</strong> Account
                </span>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ParticipateSection;
