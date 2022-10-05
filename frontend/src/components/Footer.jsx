import React from 'react';

const Footer = () => {
  return (
    <div className="w-full bg-dark-blue mt-10 text-white flex flex-col justify-center items-center py-20 space-y-10">
      <span className="font-bold text-4xl">More than a free link shortener</span>
      <button className="text-white bg-blue-600 px-6 py-4 rounded-lg font-medium hover:bg-blue-800 w-fit text-xl">Get Started</button>
    </div>
  );
};

export default Footer;
