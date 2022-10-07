import React from 'react';

const Loading = () => {
  let circleCommonClasses = 'h-3 w-3 bg-black rounded-full';
  return (
    <>
      <div className="w-full h-screen overflow-hidden bg-white flex flex-col items-center justify-center">
        <div className="flex mb-6">
          <div className={`${circleCommonClasses} mr-2 animate-bounce`}></div>
          <div className={`${circleCommonClasses} mr-2 animate-bounce200`}></div>
          <div className={`${circleCommonClasses} animate-bounce400`}></div>
        </div>
        <h2 className="text-center text-black text-3xl font-semibold mb-1">Loading...</h2>
        <p className="w-1/3 text-center text-black text-lg">This may take a few seconds, please don&apos;t close this page.</p>
      </div>
    </>
  );
};

export default Loading;
