import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/images/HeroSection/hero-logo.svg";
import arrow from "../../assets/images/HeroSection/Vector.svg";
import Button from "../commonComponents/Button";
import Input from "../commonComponents/Input";
import Textarea from "../commonComponents/Textarea";
import login from "../login.action";
import LoginRedirectModal from "../LoginRedirectModal";
import PrivacyStatementModal from "../PrivacyStatementModal";

const ConnectForm = () => {
  return (
    <form className="space-y-4 w-1/2 sm:w-full">
      <h1 className="font-lato font-bold text-xl md:text-lg sm:text-sm text-white m-0 pb-1">
        Get Connected
      </h1>
      <p className="font-lato font-medium text-lg md:text-xs sm:text-xs text-white m-0">
        Have someone reach out with more information about MPP:
      </p>
      <div className="flex gap-4">
        <Input type="text" placeholder="First Name" required={true} />
        <Input type="text" placeholder="Last Name" required={true} />
      </div>
      <div className="flex gap-4">
        <Input type="email" placeholder="Email Address" required={true} />
        <Input type="tel" placeholder="Phone" required={true} />
      </div>
      <Input type="text" placeholder="Organization Name" required={true} />
      <div className="flex gap-4">
        <Textarea
          placeholder="Message..."
          required={true}
        ></Textarea>
        <button
          type="submit"
          className="w-[100px] h-[100px] bg-linearYellow rounded-md flex items-center justify-center"
        >
          <img src={arrow} alt="Submit icon" />
        </button>
      </div>
    </form>
  );
};

const FooterSection = () => {
  const [isLoginRedirectModalVisible, setIsLoginRedirectModalVisible] =
    useState(false);
  const [loginSignup, setLoginSignup] = useState("Login");
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

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
      {
        <PrivacyStatementModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      }
      <footer className="w-full min-h-[550px] sm:min-h-[860px] bg-linearBlue300  pl-[185px] md:pl-[40px] md:pr-[40px] pr-32 pt-20 sm:pt-8 pb-8 mb-[-70px] sm:px-5">
        <div className="flex justify-between items-center  sm:space-y-8">
          <img src={logo} alt="MPP Logo" className="md:w-2/12 sm:w-3/12" />
          <div className="">
            <div className="flex items-center gap-6 sm:flex-col">
              <p className="font-lato font-normal text-xl md:text-sm sm:text-xs text-white mb-0">
                Ready to take your company to the next level?
              </p>
              <div onClick={() => LoginModalVisible("Login")}>
                <Button
                  title="START YOUR MPP JOURNEY NOW"
                  classes="md:text-xs sm:text-xs"
                />
              </div>
            </div>
            <hr className="bg-[#979797] border-none h-[2px] opacity-10" />
          </div>
        </div>
        <div className="py-8 flex justify-between sm:flex-col sm:pr-0">
          <ConnectForm />
          <div className="w-4/12 sm:w-full">
            <nav className="w-full sm:items-start font-lato font-normal text-lg sm:text-sm space-y-4 flex flex-col pt-7">
              <a
                href="https://business.defense.gov/Programs/Mentor-Protege-Program/How-to-Participate/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white !no-underline leading-6 sm:leading-5"
              >
                How to Participate
              </a>
              <a
                href="https://business.defense.gov/Programs/Mentor-Protege-Program/Protege-Eligibility-Requirements/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white !no-underline leading-6 sm:leading-5"
              >
                Eligibility Requirements
              </a>
              <a
                href="https://business.defense.gov/Programs/Mentor-Protege-Program/MPP-Resources/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white !no-underline leading-6 sm:leading-5"
              >
                MPP Resources
              </a>
              <a href="#" className="text-white">
                Browse Approved Mentor List
              </a>
              <a
                href="https://business.defense.gov/Programs/Mentor-Prot%C3%A9g%C3%A9-Program/Regulation-Legislation/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white !no-underline leading-6 sm:leading-5"
              >
                Why we have MPP
              </a>
              <a
                className="text-white !no-underline leading-6 sm:leading-5"
                href="https://business.defense.gov/Programs/Mentor-Protege-Program/Contacts/"
                target="_blank"
                rel="noopener noreferrer"
              >
                DoD OSBP Contacts
              </a>
              <a
                href="https://business.defense.gov/Programs/Mentor-Protege-Program/FAQs/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white !no-underline leading-6 sm:leading-5"
              >
                FAQs
              </a>
            </nav>
          </div>
        </div>
        <div className="font-lato font-medium text-base sm:text-s text-white space-x-8 text-end sm:text-right pt-10 sm:pt-4">
          <a
            href="https://dodcio.defense.gov/DoD-Web-Policy/"
            rel="noreferrer"
            target="_blank"
            className="text-white !no-underline leading-6 sm:leading-5"
          >
            Web Policy
          </a>
          <a onClick={() => setShowModal(true)} className="text-white">
            Privacy Statement
          </a>
          <a
            href="https://business.defense.gov/Programs/Mentor-Protégé-Program/Contacts/"
            rel="noreferrer"
            target="_blank"
            className="text-white !no-underline leading-6 sm:leading-5"
          >
            Contact Us
          </a>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
