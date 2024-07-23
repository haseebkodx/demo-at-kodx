import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import login from "../login.action";
import mainBg from "../../assets/images/MentorStart_bg.png";
import sideBg from "../../assets/images/handiphone2.png";
import ellipse from "../../assets/images/ellipse2.png";
import Button from "../commonComponents/Button";
import LoginRedirectModal from "../LoginRedirectModal";

const MentorPartnershipSection = () => {
  const history = useHistory();
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
      <section className="w-full relative bg-[#243d80] min-h-[525px] flex">
        <div
          className="relative flex sm:flex-col-reverse"
          style={{
            background: `url(${mainBg}) right center no-repeat`,
            width: "100%",
            backgroundSize: "cover",
          }}
        >
          <div className="w-1/2 sm:w-full h-full flex items-end justify-center relative">
            <img src={ellipse} alt="Ellipse" className="object-fill absolute" />
            <img
              src={sideBg}
              alt="Hand holding phone"
              className="object-contain relative z-10"
            />
          </div>
          <div className="w-1/2 sm:w-full h-full flex flex-col justify-center items-start sm:items-center px-8 sm:py-10">
            <div className="text-white">
              <h1 className="text-5xl sm:text-[30px] mb-5 leading-tight font-[700]">
                Mentor partnerships are <br /> the secret sauce
              </h1>

              <div className="flex items-center mb-10">
                <div className="flex-1 text-left text-2xl sm:text-xl leading-tight">
                  To elevate your company, stay relevant & tap into <br />
                  exponential networks of opportunity
                </div>
              </div>
              <div onClick={() => LoginModalVisible("Login")}>
                <Button title="GET STARTED" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MentorPartnershipSection;
