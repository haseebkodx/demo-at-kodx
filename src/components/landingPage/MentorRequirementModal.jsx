import React from "react";

const CustomModal = ({ showModal, setShowModal }) => {
  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="relative bg-blue-950 w-full max-w-[908px] h-full max-h-[850px] overflow-auto rounded-lg p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
          <div className="w-full text-center text-white text-2xl font-black font-lato leading-loose">
            Required documentation for MPP Mentor Application
          </div>
          <button
            className="text-white text-3xl font-bold"
            onClick={() => setShowModal(false)}
          >
            &times;
          </button>
        </div>
        <div className="space-y-4 px-2 sm:px-6">
          <div className="flex gap-x-4 sm:gap-x-8">
            <div className="text-center text-blue-200 text-[52px] font-bold font-['Oswald'] leading-[40px] sm:leading-[60px]">
              1
            </div>
            <div className="text-white text-xl font-normal font-lato pl-1">
              A statement that your company is currently performing under at
              least one active approved subcontracting plan negotiated with DOD
              or another Federal agency pursuant to FAR 19.702, and that your
              company is currently eligible for award of Federal contracts.
            </div>
          </div>
          <div className="flex gap-x-4 sm:gap-x-8">
            <div className="text-center text-blue-200 text-[52px] font-bold font-['Oswald'] leading-[40px] sm:leading-[60px]">
              2
            </div>
            <div className="text-white text-xl font-normal font-lato">
              A brief summary about your company, including the company profile,
              and historical and recent activities and accomplishments under
              your Small Disadvantaged Business and Mentor-Protégé Programs.
              Indicate whether your company has been a small disadvantaged
              business (SDB), women-owned small business, or 8(a). If a
              graduated 8(a), you will need to provide your graduation date.
            </div>
          </div>
          <div className="flex gap-x-4 sm:gap-x-8">
            <div className="text-center text-blue-200 text-[52px] font-bold font-['Oswald'] leading-[40px] sm:leading-[60px]">
              3
            </div>
            <div className="text-white text-xl font-normal font-lato">
              Description of your company&apos;s ability to provide
              developmental assistance and how that assistance will potentially
              increase subcontracting opportunities in industry categories where
              SDBs are not dominant in your company&apos;s vendor base.
            </div>
          </div>
          <div className="flex gap-x-4 sm:gap-x-8">
            <div className="text-center text-blue-200 text-[52px] font-bold font-['Oswald'] leading-[40px] sm:leading-[60px]">
              4
            </div>
            <div className="text-white text-xl font-normal font-lato">
              Total dollars of DoD contracts and subcontracts received by your
              company during the 2 preceding fiscal years.
            </div>
          </div>
          <div className="flex gap-x-4 sm:gap-x-8">
            <div className="text-center text-blue-200 text-[52px] font-bold font-['Oswald'] leading-[40px] sm:leading-[60px]">
              5
            </div>
            <div className="text-white text-xl font-normal font-lato">
              Total dollars of other Federal Agency contracts and subcontracts
              received by your company during the 2 preceding fiscal years.
            </div>
          </div>
          <div className="flex gap-x-4 sm:gap-x-8">
            <div className="text-center text-blue-200 text-[52px] font-bold font-['Oswald'] leading-[40px] sm:leading-[60px]">
              6
            </div>
            <div className="text-white text-xl font-normal font-lato">
              Total dollars of subcontracts awarded by your company under DOD
              contracts and other Federal Agency contracts during the two
              preceding fiscal years.
            </div>
          </div>
          <div className="flex gap-x-4 sm:gap-x-8">
            <div className="text-center text-blue-200 text-[52px] font-bold font-['Oswald'] leading-[40px] sm:leading-[60px]">
              7
            </div>
            <div className="text-white text-xl font-normal font-lato">
              Total dollars and percentage of subcontract awards made to all SDB
              firms under DOD contracts and other Federal agency contracts
              during the two preceding fiscal years (If presently required to
              submit SF 295, be prepared to provide copies of the previous 2
              year end reports).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
