import React from "react";
import HeroSection from "./landingPage/HeroSection";
import JoinSection from "./landingPage/JoinSection";
import MentorsSection from "./landingPage/MentorsSection";
import ProtegesSection from "./landingPage/ProtegesSection";
import MppSubmitSection from "./landingPage/MppSubmitSection";
import FooterSection from "./landingPage/FooterSection";

function LandingPage() {
  return (
    <>
      <HeroSection />
      <JoinSection />
      <div className="flex sm:flex-col">
        <MentorsSection />
        <ProtegesSection />
      </div>
      <MppSubmitSection />
      <FooterSection />
    </>
  );
}

export default LandingPage;
