import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import login from "../login.action";
import mainBg from "../../assets/images/MentorStart_bg.png";
import sideBg from "../../assets/images/handiphone.png";
import ellipse from "../../assets/images/ellipse.png";
import one from "../../assets/images/round_one.svg";
import two from "../../assets/images/round_two.svg";
import three from "../../assets/images/round_three.svg";
import Button from "../commonComponents/Button";
import MentorRequirementModal from "./MentorRequirementModal";
import LoginRedirectModal from "../LoginRedirectModal";

const MentorHeroSection = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

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
        <MentorRequirementModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      }
      {
        <LoginRedirectModal
          loginSignup={loginSignup}
          showModal={isLoginRedirectModalVisible}
          showModalHandler={() => setIsLoginRedirectModalVisible(false)}
          loginHandler={() => handleLogin()}
        />
      }
      <section className="w-full relative bg-[#243d80] min-h-[740px] flex">
        <div
          className="relative flex sm:flex-col-reverse"
          style={{
            background: `url(${mainBg}) right center no-repeat`,
            width: "100%",
            backgroundSize: "cover",
          }}
        >
          <div className="w-1/2 sm:w-full h-full flex items-end justify-center relative">
            <img
              src={ellipse}
              alt="Ellipse"
              className="object-contain absolute"
            />
            <img
              src={sideBg}
              alt="Hand holding phone"
              className="object-contain relative z-10"
            />
          </div>
          <div className="w-1/2 sm:w-full h-full flex flex-col justify-center items-start sm:items-center px-8 sm:py-12">
            <div className="text-white">
              <h1 className="text-5xl sm:text-[30px] mb-5 leading-tight font-[700]">
                Get ready to mentor <br /> &nbsp;in 3 easy steps
              </h1>
              <div className="flex items-center mb-10">
                <img src={one} alt="Step 1" className="w-10 h-10 mr-4" />
                <div className="flex-1 text-left text-3xl sm:text-2xl font-semibold leading-8">
                  Gather the required <br /> documentation
                  <span
                    onClick={() => setShowModal(true)}
                    className="text-yellow-400 text-xl font-[600] ml-2 underline cursor-pointer"
                  >
                    SEE LIST
                  </span>
                </div>
              </div>
              <div className="flex items-center mb-10">
                <img src={two} alt="Step 2" className="w-10 h-10 mr-4" />
                <div className="flex-1 text-left text-3xl sm:text-2xl font-semibold leading-tight">
                  Complete your application
                  <br />
                  (about 30 mins.)
                </div>
              </div>
              <div className="flex items-center mb-10">
                <img src={three} alt="Step 3" className="w-10 h-10 mr-4" />
                <div className="flex-1 text-left text-3xl sm:text-2xl font-semibold leading-tight">
                  Receive approval
                </div>
              </div>
              <div onClick={() => LoginModalVisible("Login")}>
                <Button title="APPLY NOW" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MentorHeroSection;
