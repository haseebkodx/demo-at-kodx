import React from "react";
import mentor1 from "../../assets/images/testimonial1.svg";
import mentor2 from "../../assets/images/testimonial2.svg";
import mentor3 from "../../assets/images/testimonial3.svg";

const TestimonialCard = ({ text, mentorName, mentorImage }) => {
  return (
    <div className=" max-w-[375px] lg:w-[350px] h-[275px] lg:h-[250px] p-6 bg-[#243D80] rounded-lg flex flex-col justify-center">
      <p className="text-white text-base mb-5">{text}</p>
      <div className="w-full flex items-center pl-2">
        <img
          src={mentorImage}
          alt={mentorName}
          className="w-10 h-10 rounded-full mr-4"
        />
        <p className="text-white text-sm mb-0">{mentorName}</p>
      </div>
    </div>
  );
};

const ProtegeTestimonialSection = () => {
  const testimonials = [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
      mentorName: "Protégé Name",
      mentorImage: mentor1,
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
      mentorName: "Protégé Name",
      mentorImage: mentor2,
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
      mentorName: "Protégé Name",
      mentorImage: mentor3,
    },
  ];

  return (
    <section className="w-full z-40 relative bg-[#0B1E5A] px-[120px] sm:px-8 pb-20 flex flex-col items-center">
      <h1 className="font-lato font-bold text-white text-4xl sm:text-3xl leading-tight text-center w-full py-12 px-8 sm:px-0 m-0">
        See what ambitious professionals like you have accomplished through the
        power of <span className="text-[#FFE45F]">MPP mentorship</span>.
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-12">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default ProtegeTestimonialSection;
