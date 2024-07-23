import React from 'react';
import CrossIconWhite from '../../svg/CrossIconWhite';
import UploadIcon from '../../svg/UploadIcon';
import JourneyButton from '../JourneyButton';
import Input from '../Input';

const Help = ({ setWantHelp }) => {
  return (
    <div className="h-[556px] w-[386px] bg-white rounded-[10px] absolute bottom-6 -right-8">
      <div className="h-12 flex items-center justify-between text-white bg-primary px-3 rounded-t-[10px]">
        <span></span>
        <span className="text-lg font-bold">Help</span>
        <CrossIconWhite
          className="cursor-pointer"
          onClick={() => setWantHelp(false)}
        />
      </div>
      <form className="flex w-full flex-col gap-5 px-4 mt-10">
        <Input
          label="Summary"
          name="summary"
          type="text"
          className="w-full border-none bg-[#F4F5F7]"
          required={true}
          labelClass="text-[#8B93A3] font-medium mb:text-xs"
        />
        <Input
          label="What do you need help with? Provide as much detail as possible"
          name="details"
          type="text"
          className="w-full border-none bg-[#F4F5F7]"
          required={true}
          labelClass="text-[#8B93A3] font-medium mb:text-xs"
        />
        <div className="flex flex-col gap-1">
          <span className="text-[#8B93A3] font-medium mb:text-xs">
            Attach any relevant files (optional)
          </span>
          <input type="file" id="file-input" className="h-0" />
          <label
            htmlFor="file-input"
            className="flex items-center justify-center h-10 bg-gray-100 border border-none rounded-lg cursor-pointer text-[#185151] font-bold w-28 gap-2 mb:text-xs"
          >
            <UploadIcon />
            Upload
          </label>
        </div>
        <Input
          label="Your Email"
          name="emial"
          type="text"
          className="w-full border-none bg-[#F4F5F7]"
          required={true}
          labelClass="text-[#8B93A3] font-medium mb:text-xs"
        />
        <div>
          <JourneyButton
            title="Send"
            type="submit"
            className="mb:text-xs"
          />
        </div>
      </form>
    </div>
  );
};

export default Help;
