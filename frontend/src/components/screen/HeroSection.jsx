import Image from 'next/image';
import React from 'react';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';

const HeroSection = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full px-48 py-28">
        <div className="w-2/3 flex flex-col space-y-10">
          <div className="font-extrabold text-4xl flex flex-col space-y-2">
            <span>Shorten URLs.</span>
            <span>Track analytics of shortened URLs.</span>
            <span>Generate QR Codes.</span>
          </div>
          <button className="text-white bg-blue-600 px-6 py-4 rounded-lg font-normal hover:bg-blue-800 w-fit text-xl">Get Started for Free</button>
        </div>
        <div className="w-1/3">
          <Image src="/shortner.svg" alt="cuidly" height={700} width={800} />
        </div>
      </div>
      <div className="bg-gray-300 h-[0.1px] mx-32"></div>
      <div className="w-full text-center pt-4 font-medium">
        Exploring <span className="text-orange-500 font-bold">CUID</span>s. Shorten URL on the GO.
      </div>
      <span className="w-full flex justify-center items-center pt-1.5">
        <HiOutlineChevronDoubleDown />
      </span>
    </div>
  );
};

export default HeroSection;
