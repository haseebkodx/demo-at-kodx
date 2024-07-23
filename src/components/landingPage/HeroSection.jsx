import React, { useEffect, useState } from "react";
import mainBg from "../../assets/images/heroBg2.png";
import Navbar from "../Navbar";
import sideBg from "../../assets/images/heroBg.png";
import login from "../login.action";
import logo from "../../assets/images/HeroSection/hero-logo.svg";
import Button from "../commonComponents/Button";
import arrow from "../../assets/images/HeroSection/arrow-2.svg";
import LoginRedirectModal from "../LoginRedirectModal";

const HeroSection = () => {
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
          className="w-full object-cover h-[783px] sm:min-h-[850px]"
        />

        <div className="absolute top-0 right-0">
          <Navbar />
          <div className="hidden sm:block sm:absolute top-4 right-8 pt-2">
          <a
            href="https://web.cvent.com/event/0c4877d1-697c-48ca-aebd-01df112c2a0f/websitePage:fb32d815-6dc5-41b6-a2ea-246fc3371fc1"
            rel="noreferrer"
            target="_blank"
          >
            <svg
              width="159"
              height="21"
              viewBox="0 0 159 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[163px] h-[30px] sm:w-[160px]"
            >
              <path
                d="M0.416 20L0.752 0.559999H4.424L7.184 14.024L10.064 0.559999H13.616L13.976 20H11.336L11.048 6.488L8.288 20H6.152L3.344 6.44L3.08 20H0.416ZM16.3668 20V0.559999H22.0788C23.2468 0.559999 24.1908 0.775999 24.9108 1.208C25.6468 1.64 26.1828 2.272 26.5188 3.104C26.8708 3.92 27.0468 4.912 27.0468 6.08C27.0468 7.344 26.8308 8.368 26.3988 9.152C25.9668 9.92 25.3588 10.48 24.5748 10.832C23.8068 11.184 22.8948 11.36 21.8388 11.36H19.9188V20H16.3668ZM19.9188 8.864H21.2628C21.9028 8.864 22.3988 8.776 22.7508 8.6C23.1188 8.408 23.3668 8.112 23.4948 7.712C23.6388 7.296 23.7108 6.744 23.7108 6.056C23.7108 5.352 23.6548 4.784 23.5428 4.352C23.4468 3.904 23.2228 3.576 22.8708 3.368C22.5348 3.16 21.9988 3.056 21.2628 3.056H19.9188V8.864ZM28.5431 20V0.559999H34.2551C35.4231 0.559999 36.3671 0.775999 37.0871 1.208C37.8231 1.64 38.3591 2.272 38.6951 3.104C39.0471 3.92 39.2231 4.912 39.2231 6.08C39.2231 7.344 39.0071 8.368 38.5751 9.152C38.1431 9.92 37.5351 10.48 36.7511 10.832C35.9831 11.184 35.0711 11.36 34.0151 11.36H32.0951V20H28.5431ZM32.0951 8.864H33.4391C34.0791 8.864 34.5751 8.776 34.9271 8.6C35.2951 8.408 35.5431 8.112 35.6711 7.712C35.8151 7.296 35.8871 6.744 35.8871 6.056C35.8871 5.352 35.8311 4.784 35.7191 4.352C35.6231 3.904 35.3991 3.576 35.0471 3.368C34.7111 3.16 34.1751 3.056 33.4391 3.056H32.0951V8.864ZM112.406 20V17.648L117.206 10.232C117.558 9.688 117.886 9.168 118.19 8.672C118.51 8.176 118.766 7.664 118.958 7.136C119.166 6.592 119.27 6 119.27 5.36C119.27 4.64 119.142 4.088 118.886 3.704C118.63 3.32 118.23 3.128 117.686 3.128C117.174 3.128 116.774 3.272 116.486 3.56C116.198 3.848 115.998 4.224 115.886 4.688C115.79 5.152 115.742 5.664 115.742 6.224V7.04H112.478V6.176C112.478 5.024 112.646 4.016 112.982 3.152C113.334 2.272 113.886 1.584 114.638 1.088C115.39 0.591999 116.374 0.343998 117.59 0.343998C119.254 0.343998 120.502 0.791999 121.334 1.688C122.166 2.584 122.582 3.832 122.582 5.432C122.582 6.232 122.47 6.96 122.246 7.616C122.022 8.256 121.726 8.872 121.358 9.464C120.99 10.056 120.59 10.664 120.158 11.288L116.174 17.336H122.078V20H112.406ZM129.28 20.288C128.144 20.288 127.2 20.048 126.448 19.568C125.712 19.088 125.152 18.424 124.768 17.576C124.4 16.728 124.216 15.752 124.216 14.648V6.032C124.216 4.896 124.392 3.904 124.744 3.056C125.112 2.192 125.664 1.52 126.4 1.04C127.152 0.559999 128.112 0.319999 129.28 0.319999C130.448 0.319999 131.4 0.559999 132.136 1.04C132.888 1.52 133.44 2.192 133.792 3.056C134.16 3.904 134.344 4.896 134.344 6.032V14.648C134.344 15.752 134.152 16.728 133.768 17.576C133.4 18.424 132.84 19.088 132.088 19.568C131.352 20.048 130.416 20.288 129.28 20.288ZM129.28 17.432C129.776 17.432 130.144 17.28 130.384 16.976C130.624 16.672 130.784 16.304 130.864 15.872C130.944 15.44 130.984 15.016 130.984 14.6V6.08C130.984 5.632 130.944 5.192 130.864 4.76C130.8 4.312 130.648 3.936 130.408 3.632C130.168 3.328 129.792 3.176 129.28 3.176C128.768 3.176 128.392 3.328 128.152 3.632C127.912 3.936 127.752 4.312 127.672 4.76C127.608 5.192 127.576 5.632 127.576 6.08V14.6C127.576 15.016 127.616 15.44 127.696 15.872C127.792 16.304 127.96 16.672 128.2 16.976C128.44 17.28 128.8 17.432 129.28 17.432ZM136.196 20V17.648L140.996 10.232C141.348 9.688 141.676 9.168 141.98 8.672C142.3 8.176 142.556 7.664 142.748 7.136C142.956 6.592 143.06 6 143.06 5.36C143.06 4.64 142.932 4.088 142.676 3.704C142.42 3.32 142.02 3.128 141.476 3.128C140.964 3.128 140.564 3.272 140.276 3.56C139.988 3.848 139.788 4.224 139.676 4.688C139.58 5.152 139.532 5.664 139.532 6.224V7.04H136.268V6.176C136.268 5.024 136.436 4.016 136.772 3.152C137.124 2.272 137.676 1.584 138.428 1.088C139.18 0.591999 140.164 0.343998 141.38 0.343998C143.044 0.343998 144.292 0.791999 145.124 1.688C145.956 2.584 146.372 3.832 146.372 5.432C146.372 6.232 146.26 6.96 146.036 7.616C145.812 8.256 145.516 8.872 145.148 9.464C144.78 10.056 144.38 10.664 143.948 11.288L139.964 17.336H145.868V20H136.196ZM153.05 20V15.224H147.242V12.392L152.306 0.559999H156.17V12.584H158.162V15.224H156.17V20H153.05ZM150.026 12.584H153.05V4.136L150.026 12.584Z"
                fill="#FF4B52"
              />
              <path
                className=" fill-white"
                d="M45.5216 20.264C44.3536 20.264 43.3776 20.04 42.5936 19.592C41.8096 19.128 41.2176 18.456 40.8176 17.576C40.4176 16.696 40.1936 15.616 40.1456 14.336L43.1936 13.736C43.2256 14.488 43.3136 15.152 43.4576 15.728C43.6176 16.304 43.8496 16.752 44.1536 17.072C44.4736 17.376 44.8896 17.528 45.4016 17.528C45.9776 17.528 46.3856 17.36 46.6256 17.024C46.8656 16.672 46.9856 16.232 46.9856 15.704C46.9856 14.856 46.7936 14.16 46.4096 13.616C46.0256 13.072 45.5136 12.528 44.8736 11.984L42.4256 9.824C41.7376 9.232 41.1856 8.576 40.7696 7.856C40.3696 7.12 40.1696 6.216 40.1696 5.144C40.1696 3.608 40.6176 2.424 41.5136 1.592C42.4096 0.759999 43.6336 0.343998 45.1856 0.343998C46.0976 0.343998 46.8576 0.487998 47.4656 0.775999C48.0736 1.048 48.5536 1.432 48.9056 1.928C49.2736 2.424 49.5456 2.992 49.7216 3.632C49.8976 4.256 50.0096 4.92 50.0576 5.624L47.0336 6.152C47.0016 5.544 46.9296 5 46.8176 4.52C46.7216 4.04 46.5376 3.664 46.2656 3.392C46.0096 3.12 45.6256 2.984 45.1136 2.984C44.5856 2.984 44.1776 3.16 43.8896 3.512C43.6176 3.848 43.4816 4.272 43.4816 4.784C43.4816 5.44 43.6176 5.984 43.8896 6.416C44.1616 6.832 44.5536 7.264 45.0656 7.712L47.4896 9.848C48.2896 10.52 48.9696 11.312 49.5296 12.224C50.1056 13.12 50.3936 14.208 50.3936 15.488C50.3936 16.416 50.1856 17.24 49.7696 17.96C49.3696 18.68 48.8016 19.248 48.0656 19.664C47.3456 20.064 46.4976 20.264 45.5216 20.264ZM57.3329 20.264C55.8929 20.264 54.7729 20 53.9729 19.472C53.1729 18.944 52.6209 18.192 52.3169 17.216C52.0129 16.24 51.8609 15.072 51.8609 13.712V0.559999H55.3169V14.12C55.3169 14.728 55.3569 15.304 55.4369 15.848C55.5169 16.376 55.7009 16.808 55.9889 17.144C56.2929 17.464 56.7409 17.624 57.3329 17.624C57.9569 17.624 58.4049 17.464 58.6769 17.144C58.9649 16.808 59.1489 16.376 59.2289 15.848C59.3249 15.304 59.3729 14.728 59.3729 14.12V0.559999H62.8049V13.712C62.8049 15.072 62.6529 16.24 62.3489 17.216C62.0449 18.192 61.4929 18.944 60.6929 19.472C59.9089 20 58.7889 20.264 57.3329 20.264ZM65.0707 20L65.4067 0.559999H69.0787L71.8387 14.024L74.7187 0.559999H78.2707L78.6307 20H75.9907L75.7027 6.488L72.9427 20H70.8067L67.9987 6.44L67.7347 20H65.0707ZM80.9735 20L81.3095 0.559999H84.9815L87.7415 14.024L90.6215 0.559999H94.1735L94.5335 20H91.8935L91.6055 6.488L88.8455 20H86.7095L83.9015 6.44L83.6375 20H80.9735ZM97.0203 20V0.559999H100.524V20H97.0203ZM104.998 20V3.176H101.902V0.559999H111.598V3.176H108.55V20H104.998Z"
              />
            </svg>
          </a>
        </div>
          <img
            src={sideBg}
            alt="Side background"
            className="pt-6 z-20 block sm:hidden relative xl:translate-y-[-100px] xl:translate-x-[0px] lg:translate-y-[-70px] lg:translate-x-[80px] md:translate-y-[50px] md:translate-x-[350px] sm:translate-y-0 xl:w-full lg:w-11/12 md:w-7/12 max-w-max sm:max-w-full object-contain"
          />
          <img
            src={sideBg}
            alt="Side background"
            className="pt-6 z-20 w-full hidden sm:block max-w-max sm:max-w-full sm:w-7/12 object-contain sm:translate-y-[-80px] sm:translate-x-[400px] opacity-50"
          />
        </div>

        <div className="flex absolute top-20 left-0 px-[120px] md:px-12 sm:px-8">
          <img src={logo} alt="MPP Logo" className="w-[164px] h-[164px]" />
        </div>

        <div className=" absolute z-50 top-60 left-0 sm:w-full flex pt-10">
          <div className="sm:px-8 px-[120px] md:px-12 mt-0 sm:mt-4">
            <div className="flex flex-col sm:items-start">
              <p className="font-lato font-bold text-2xl md:text-sm text-[#C9E1FF] tracking-[6px] sm:text-[20px]">
                WELCOME TO THE
              </p>
              <h1 className="font-lato font-bold text-white text-6xl md:text-3xl leading-none sm:text-start sm:text-2xl">
                Mentor-Protégé Program Portal
              </h1>
              <p className="font-lato max-w-[600px] md:w-3/5 font-normal leading-[1.3] text-3xl md:text-xl text-white sm:text-base pb-2 sm:text-start">
                Easily access your{" "}
                <span className="text-[28px] md:text-lg sm:text-base font-semibold text-[#FFE45F]">
                  Mentor-Protégé Program
                </span>
                <br />
                (MPP) dashboard here. Whether you are a Mentor or a Protégé,
                your dashboard gives you access to everything you need for
                tracking and maintaining your partnerships.
              </p>
              <div onClick={() => LoginModalVisible("Login")} className="pb-2">
                <Button title="LOGIN TO MY DASHBOARD" />
              </div>
              <p className="font-lato max-w-[500px] font-medium text-[18px] md:text-base sm:text-[16px] text-white pt-4 mb-0">
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

        
      </section>
    </>
  );
};

export default HeroSection;
