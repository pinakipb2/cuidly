import React from 'react';
import { HiLink } from 'react-icons/hi';
import { IoRocketSharp, IoAnalyticsSharp } from 'react-icons/io5';

const DashboardSidebar = () => {
  return (
    <div className="flex flex-col gap-1 pt-4 text-base font-semibold text-gray-500 w-full">
      <div className="flex items-center hover:cursor-pointer hover:text-indigo-700 bg-indigo-100 text-indigo-700">
        <div className="justify-start bg-indigo-700 w-[5px] py-5"></div>
        <div className="flex px-6 py-2 gap-2">
          <div className="text-2xl">
            <HiLink />
          </div>
          <span>Shorten URL</span>
        </div>
      </div>
      <div className="flex items-center hover:cursor-pointer hover:text-indigo-700">
        <div className="flex px-8 py-2 gap-2">
          <div className="text-2xl">
            <IoAnalyticsSharp />
          </div>
          <span>Analytics</span>
        </div>
      </div>
      {/* <div className="flex px-6 py-2 items-center gap-2 hover:cursor-pointer hover:text-indigo-700">
        <div className="text-xl">
          <IoRocketSharp />
        </div>
        <span>Upgrade Plan</span>
      </div> */}
    </div>
  );
};

export default DashboardSidebar;
