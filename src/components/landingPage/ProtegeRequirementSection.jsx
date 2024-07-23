import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import login from "../login.action";
import PropTypes from "prop-types";
import mainBg from "../../assets/images/protegesBg.png";
import Button from "../commonComponents/Button";
import LoginRedirectModal from "../LoginRedirectModal";

const ProtegeRequirementCard = ({ icon, title, description }) => {
  return (
    <div className="w-full max-w-4xl bg-[#A0CBFF] rounded-md p-4 flex items-start">
      <div className="sm:h-full w-16 h-16 mr-4 flex items-center justify-center">
        <div className="w-16 h-16 flex items-center justify-center rounded-full">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-[#243D80] text-[24px] sm:text-[20px] font-bold mb-2">
          {title}
        </h3>
        <p className="text-[#243D80] text-[20px] sm:text-[16px]">
          {description}
        </p>
      </div>
    </div>
  );
};

ProtegeRequirementCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const items = [
  "A small business concern owned and controlled by socially and economically disadvantaged individuals",
  "A business entity owned and controlled by an Indian tribe",
  "A business entity owned and controlled by a Native Hawaiian Organization",
  "A qualified organization employing severely disabled individuals",
  "A small business concern owned and controlled by women",
  "A small business concern owned and controlled by service-disabled veterans",
  "A qualified HUBZone small business concern",
  "A small business concern that is a nontraditional defense contractor",
  "A small business concern that currently provides goods or services in the private sector that are critical to enhancing the capabilities of the defense supplier base and fulfilling key Department of Defense needs",
];

// Words to be bolded
const boldWords = [
  "socially and economically disadvantaged",
  "Indian tribe",
  "Native Hawaiian Organization",
  "severely disabled individuals",
  "women",
  "service-disabled veterans",
  "HUBZone",
  "nontraditional",
  "currently provides goods or services in the private sector",
];

const highlightText = (text) => {
  let result = text;
  boldWords.forEach((phrase) => {
    const regex = new RegExp(`(${phrase})`, "gi");
    result = result.replace(regex, '<span class="font-bold">$1</span>');
  });
  return result;
};

const ProtegeRequirementSection = () => {
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
      <section className="relative">
        <img
          src={mainBg}
          alt="Main background"
          className="absolute left-0 top-0 w-screen object-cover h-full bg-[#243d80]"
        />
        <div className="relative px-[120px] sm:px-8">
          <h1 className="font-lato font-bold text-white text-5xl sm:text-3xl leading-tight text-center w-full py-12 px-8 sm:px-0 m-0">
            Are you ready to become a{" "}
            <span className="text-[#FFE45F]">Protégé</span>?
          </h1>

          <div className="font-lato font-bold text-white text-[24px] text-center w-full sm:text-[16px] uppercase leading-normal tracking-[2.88px] pb-8">
            BASIC PROTégé PARTICIPATION REQUIREMENTS INCLUDE:
          </div>
          <div className="w-full flex sm:flex-col items-center justify-center gap-5">
            <div className="flex gap-5 items-center">
              <div className="text-blue-300 text-[130px] sm:text-[100px] font-bold font-lato leading-[96px]">
                1
              </div>
              <div className="text-white text-2xl sm:text-xl font-normal font-lato">
                Must have less than half the size <br />
                standard corresponding <br />
                to its primary NAICS code
              </div>
            </div>
            <div className="w-[140.01px] h-[35.05px] text-center text-yellow-300 text-5xl font-bold font-lato uppercase leading-9 italic">
              and
            </div>
            <div className="flex gap-5 items-center">
              <div className="text-blue-300 text-[130px] sm:text-[100px] font-bold font-lato leading-[96px]">
                2
              </div>
              <div className="text-white text-2xl sm:text-xl font-normal font-lato">
                Must not be owned or managed by individuals or
                <br /> entities that directly or indirectly have stock
                <br /> options or convertible securities in the mentor firm
              </div>
            </div>
            <div></div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="text-yellow-300 text-[112px] sm:text-[75px] ">
              +
            </div>
            <div className="text-white text-2xl sm:text-[18px] uppercase pt-3">
              one or more of the following:
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="w-full grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="max-w-[400px] h-[265px] sm:h-[225px] text-start flex items-center bg-[#A0CBFF] p-[29px] rounded-lg shadow-md"
                >
                  <span
                    className="text-blue-900 text-2xl sm:text-xl font-normal font-lato"
                    dangerouslySetInnerHTML={{ __html: highlightText(item) }}
                  ></span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex items-center justify-center py-12">
            <div onClick={() => LoginModalVisible("Login")}>
              <Button title={<span>Start My Protégé Account Now</span>} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProtegeRequirementSection;
