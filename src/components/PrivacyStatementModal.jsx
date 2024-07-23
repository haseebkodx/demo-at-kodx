import React from "react";

const PrivacyStatementModal = ({ showModal, setShowModal }) => {
  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-blue-950 w-full max-w-[840px] h-full max-h-[500px] overflow-auto rounded-lg p-4 sm:p-6 sm:mx-5 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
          <div className="w-full text-center text-white text-2xl font-black font-lato leading-loose">
            Privacy Statement
          </div>
          <button
            className="text-white text-3xl font-bold"
            onClick={() => setShowModal(false)}
          >
            &times;
          </button>
        </div>
        <div className="h-full flex justify-center items-center space-y-4 px-2 sm:px-6">
          <div className="text-white text-xl font-normal font-lato pl-1">
            To utilize the Mentor-Protégé Program Portal, you will be required
            to provide your name, work phone number, work email address, and
            position title. As a mentor or protégé, this information is used to
            link you to your company. For federal employees or federal
            contractors, this information is used to link you to your agency.
            <br />
            <br />
            The information you provide will be shared with federal agencies
            participating in the Mentor-Protégé Program Agreements, and between
            mentors and protégés with applications or approved agreements. This
            information will not be used outside the Mentor Protégé Program and
            will not be used for marketing purposes. While you must provide the
            above-mentioned information, we recommend that you not include other
            personal information, including home phone numbers and personal
            email addresses.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyStatementModal;
