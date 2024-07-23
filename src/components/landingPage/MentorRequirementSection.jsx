import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import login from "../login.action";
import check from "../../assets/images/MentorRequirementSection/check.svg";
import coins from "../../assets/images/MentorRequirementSection/coins.svg";
import group from "../../assets/images/MentorRequirementSection/group.svg";
import vector from "../../assets/images/MentorRequirementSection/vector.svg";
import Button from "../commonComponents/Button";
import LoginRedirectModal from "../LoginRedirectModal";

const MentorRequirementCard = ({ icon, title, description }) => {
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

MentorRequirementCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const MentorRequirementSection = () => {
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
      <section className="bg-linearBlue400 w-full justify-center sm:justify-normal min-h-[800px] sm:min-h-max px-[120px] py-[70px] sm:py-[20px] flex flex-col items-start sm:px-5">
        <h1 className="font-lato font-bold text-white text-[42px] text-center w-full sm:text-[30px]">
          Are you ready to become a
          <span className="text-[#FFE45F]"> Mentor</span>?
        </h1>
        <p className="w-full text-center font-lato font-bold text-[24px] sm:text-[18px] text-white uppercase">
          basic Mentor requirements include:
        </p>
        <div className="w-full flex flex-col items-stretch justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MentorRequirementCard
              icon={<img src={vector} alt="Icon" />}
              title="Current Subcontracting Plan"
              description="You are currently performing under at least one active, approved subcontracting plan negotiated with DoD or another Federal agency pursuant to FAR 19.702."
            />
            <MentorRequirementCard
              icon={<img src={coins} alt="Icon" />}
              title="Contracts Totaling $25M"
              description="You have DoD contracts totaling at least $25M in the previous fiscal year. (NDAA 23 lowers $100M to $25M, pending DFARS update.)"
            />
            <MentorRequirementCard
              icon={<img src={group} alt="Icon" />}
              title="Prime Contractor or 8(a) Graduate"
              description="You are an other than small business concern or have graduated from the 8(a) Business Development Program with documentation of ability to serve as a mentor.  "
            />
            <MentorRequirementCard
              icon={<img src={check} alt="Icon" />}
              title="Federal Contract Eligible"
              description="You are eligible for award of a Federal contract and are not on a Federal list of debarred or suspended contractors."
            />
          </div>
          <p className="w-full text-center font-lato font-medium text-[20px] sm:text-[16px] text-white mt-[20px]">
            The full list of eligibility requirements can be found here: &nbsp;
            <a
              className="href-link text-white"
              href="https://www.acquisition.gov/dfars/appendix-i-policy-and-procedures-dod-pilot-mentor-protege-program#DFARS_SUBPART_APPENDIX_I_I_102"
              rel="noreferrer"
              target="_blank"
            >
              Defense Federal Acquisition Regulation Supplement Appendix I-102
            </a>
          </p>

          <div className="w-full flex items-center justify-center mt-[36px]">
            <div onClick={() => LoginModalVisible("Login")}>
              <Button title="START MY MENTOR APPLICATION" onClick={() => {}} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MentorRequirementSection;
