import React from "react";
import MentorHeroSection from "./landingPage/MentorHeroSection";
import JoinSection from "./landingPage/JoinSection";
import MppSubmitSection from "./landingPage/MppSubmitSection";
import FooterSection from "./landingPage/FooterSection";
import MentorRequirementSection from "./landingPage/MentorRequirementSection";
import StartMentoringSection from "./landingPage/StartMentoringSection";
// import StaticsSection from "./landingPage/StaticsSection";
import TestimonialsSection from "./landingPage/TestimonialSection";
import CTASection from "./landingPage/CTASection";
import TempStaticsSection from "./landingPage/TempStaticsSection";

function MentorLandingPage() {
  return (
    <>
      <MentorHeroSection />
      <JoinSection />
      <MentorRequirementSection />
      <StartMentoringSection />
      <TempStaticsSection />
      {/* <StaticsSection /> */}
      <MppSubmitSection />
      <TempStaticsSection />
      {/* <TestimonialsSection /> */}
      <CTASection />
      <FooterSection />
    </>
  );
}

export default MentorLandingPage;
