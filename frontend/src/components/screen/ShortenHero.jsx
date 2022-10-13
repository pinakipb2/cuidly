import React from 'react';

const ShortenHero = () => {
  return (
    <div className="flex flex-col bg-dark-blue mt-8 w-full justify-center items-center">
      <div className="flex justify-center items-center space-x-6 w-4/5 mt-5 mb-6">
        <input className="px-5 text-lg py-3 rounded-lg w-full" placeholder="Shorten your link" />
        <button className="text-white bg-blue-700 px-20 py-3 rounded-lg font-normal hover:bg-blue-600 w-fit text-xl">Shorten</button>
      </div>
      <div className="flex flex-col space-y-6 bg-white w-4/5 pt-5 rounded-lg mb-5">
        <div className="flex">
          <div className="flex gap-6 justify-start px-6 items-center w-full">
            <span>{'https://www.youtube.com/watch?v=8kBflal_cdM'.slice(0, 60) + '...'}</span>
          </div>
          <div className="flex gap-6 justify-end px-6 items-center w-full">
            <span className="font-medium text-blue-700">https://cuid.ly/cl7u5xd340003wgff3t68qgqg</span>
            <span className="font-medium text-blue-600 bg-blue-200 rounded-md px-6 pt-1 pb-2 hover:cursor-pointer hover:bg-blue-600 hover:text-white">Copy</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex gap-6 justify-start px-6 items-center w-full">
            <span>{'https://www.youtube.com/watch?v=8kBflal_cdM8kBflal_cdM8kBflal_cdM'.slice(0, 60) + '...'}</span>
          </div>
          <div className="flex gap-6 justify-end px-6 items-center w-full">
            <span className="font-medium text-blue-700">https://cuid.ly/cl7u5xd340003wgff3t68qgqg</span>
            <span className="font-medium text-blue-600 bg-blue-200 rounded-md px-6 pt-1 pb-2 hover:cursor-pointer hover:bg-blue-600 hover:text-white">Copy</span>
          </div>
        </div>
        <div className="flex bg-blue-100 rounded-b-lg py-3">
          <div className="flex gap-6 justify-start px-6 items-center w-full">
            <span className="font-bold">Want to customize, brand, and track your links?</span>
          </div>
          <div className="flex gap-6 justify-end px-6 items-center w-full">
            <span className="font-medium bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-800 hover:cursor-pointer">Get Started</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortenHero;
