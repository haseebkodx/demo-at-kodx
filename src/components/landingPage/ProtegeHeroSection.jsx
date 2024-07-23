import React, { useEffect, useState } from "react";
import mainBg from "../../assets/images/heroBg2.png";
import Navbar from "../Navbar";
import sideBg from "../../assets/images/protegeBg.png";
import login from "../login.action";
import logo from "../../assets/images/HeroSection/hero-logo.svg";
import Button from "../commonComponents/Button";
import arrow from "../../assets/images/HeroSection/arrow-2.svg";
import LoginRedirectModal from "../LoginRedirectModal";

const ProtegeHeroSection = () => {
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
      <section className="bg-[#243d80] pt-0 sm:pt-2 relative">
        <img
          src={mainBg}
          alt="Main background"
          className="w-full block sm:hidden object-cover h-[783px] sm:min-h-[850px]"
        />

        <div className="absolute top-0 right-0 w-[787px]">
          <Navbar />
          <img
            src={sideBg}
            alt="Side background"
            className="w-full h-[740px] block sm:hidden object-cover translate-y-0 max-w-max sm:max-w-full"
          />
        </div>

        <div className="flex sm:justify-start sm:static absolute top-20 left-0 px-[120px] sm:px-8">
          <img src={logo} alt="MPP Logo" className="w-[164px] h-[164px]" />
        </div>

        <div className="sm:static absolute z-50 top-60 left-0 sm:w-full flex items-center justify-center pt-10">
          <div className="sm:px-8 px-[120px] mt-0 sm:mt-4">
            <div className="flex flex-col sm:justify-center sm:items-center">
              <p className="font-lato font-bold text-[24px] text-[#C9E1FF] tracking-[6px] sm:text-[20px] uppercase">
                MPP PROTégés
              </p>
              <h1 className="font-lato font-bold text-white text-[52px] leading-none sm:text-center sm:text-[30px]">
                Tap Into Growth Opportunities
              </h1>
              <p className="font-lato max-w-[600px] font-normal leading-[1.3] text-[28px] text-white sm:text-base pb-2 sm:text-center">
                In the past five years, DoD’s MPP has helped more than
                <span className="text-[28px] sm:text-[22px] font-semibold text-[#FFE45F]">
                  {" "}190 small businesses{" "}
                </span>
                secure contract awards to fill critical defense industrial base
                needs. Are you ready to secure yours?
              </p>
              <div onClick={() => LoginModalVisible("Login")}>
                <Button title="LOGIN TO MY DASHBOARD" />
              </div>
              <p className="font-lato max-w-[500px] font-medium text-[18px] sm:text-[16px] text-white pt-4 mb-0">
                Updated SAM profile required. Need to update yours?
              </p>
              <a
                href="https://sam.gov/content/home"
                rel="noreferrer"
                target="_blank"
                className="text-white underline max-w-[200px] min-h-[40px] flex items-center font-bold text-[14px] gap-2 tracking-[2px]"
              >
                CLICK HERE <img src={arrow} alt="Arrow icon" />
              </a>
            </div>
          </div>
        </div>

        <img
          src={sideBg}
          alt="Side background"
          className="pt-6 z-20 w-full hidden sm:block max-w-max sm:max-w-full object-contain"
        />
      </section>
    </>
  );
};

export default ProtegeHeroSection;
