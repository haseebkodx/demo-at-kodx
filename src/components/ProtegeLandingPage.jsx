import React from "react";
import ProtegeHeroSection from "./landingPage/ProtegeHeroSection";
import MppSubmitSection from "./landingPage/MppSubmitSection";
import FooterSection from "./landingPage/FooterSection";
import ProtegeStatisticsSection from "./landingPage/ProtegeStatisticsSection";
import ProtegeTestimonialSection from "./landingPage/ProtegeTestimonialSection";
import ProtegeCTASection from "./landingPage/ProtegeCTASection";
import MentorPartnershipSection from "./landingPage/MentorPartnershipSection";
import CompanySection from "./landingPage/CompanySection";
import ProtegeRequirementSection from "./landingPage/ProtegeRequirementSection";
import ParticipateSection from "./landingPage/ParticipateSection";
import TempStaticsSection from "./landingPage/TempStaticsSection";

function ProtegeLandingPage() {
  return (
    <>
      <ProtegeHeroSection />
      {/* <ProtegeStatisticsSection /> */}
      <TempStaticsSection />
      <MentorPartnershipSection />
      <CompanySection />
      <ProtegeRequirementSection />
      <ParticipateSection />
      <MppSubmitSection />
      <TempStaticsSection />
      {/* <ProtegeTestimonialSection /> */}
      <ProtegeCTASection />
      <FooterSection />
    </>
  );
}

export default ProtegeLandingPage;
