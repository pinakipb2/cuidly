import Image from 'next/image';
import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const ExtendedHero = () => {
  return (
    <div className="flex flex-col text-center w-full justify-center items-center py-14">
      <span className="font-bold text-3xl">Cuidly&apos;s Connections Platform</span>
      <span className="w-1/2 pt-2 pb-10 text-gray-600">
        All the products you need to build brand connections, manage links and QR Codes, and connect with audiences everywhere, in a single unified platform.
      </span>
      <div className="flex w-full justify-center gap-6">
        <div className="border w-1/4 border-black rounded-3xl px-4 pt-8 pb-6">
          <div className="flex gap-6 items-center">
            <Image src="/link-mngt.svg" alt="Link Management" width={40} height={40} />
            <span className="font-bold text-xl">Link Management</span>
          </div>
          <div className="text-gray-500 mt-10 mb-14 text-start">A comprehensive solution to help make every point of connection between your content and your audience more powerful.</div>
          <div className="bg-gray-300 h-[0.1px] mx-3"></div>
          <div className="mt-6 text-start font-bold">Popular Link Management Features</div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-2xl text-blue-600">
              <AiOutlineCheckCircle />
            </span>
            URL shortening at scale
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-2xl text-blue-600">
              <AiOutlineCheckCircle />
            </span>
            Custom links with your brand
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-2xl text-blue-600">
              <AiOutlineCheckCircle />
            </span>
            URL redirects
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-2xl text-blue-600">
              <AiOutlineCheckCircle />
            </span>
            Advanced analytics & tracking
          </div>
          <button className="bg-blue-600 text-white hover:bg-blue-800 px-4 pt-2 pb-3 rounded-lg w-full font-medium mt-5">Get Started For Free</button>
          <div className="pt-3 text-blue-600 font-medium">Learn More</div>
        </div>
        <div className="border w-1/4 border-black rounded-3xl px-4 pt-8 pb-6">
          <div className="flex gap-6 items-center">
            <Image src="/qr-code.svg" alt="QR Codes" width={40} height={40} />
            <span className="font-bold text-xl">QR Codes</span>
          </div>
          <div className="text-gray-500 mt-10 mb-20 text-start">QR Code solutions for every customer, business and brand experience.</div>
          <div className="bg-gray-300 h-[0.1px] mx-3"></div>
          <div className="mt-6 text-start font-bold">Popular QR Code Features</div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-2xl text-blue-600">
              <AiOutlineCheckCircle />
            </span>
            Fully customizable QR Codes
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-2xl text-blue-600">
              <AiOutlineCheckCircle />
            </span>
            Dynamic QR Codes
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-2xl text-blue-600">
              <AiOutlineCheckCircle />
            </span>
            QR Code types & destination options
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-2xl text-blue-600">
              <AiOutlineCheckCircle />
            </span>
            Advanced analytics & tracking
          </div>
          <button className="bg-blue-600 text-white hover:bg-blue-800 px-4 pt-2 pb-3 rounded-lg w-full font-medium mt-5">Get Started For Free</button>
          <div className="pt-3 text-blue-600 font-medium">Learn More</div>
        </div>
        <div className="border w-1/4 border-black rounded-3xl px-4 pt-8 pb-6">
          <div className="flex items-center">
            <Image src="/link-in-bio.svg" alt="Link-in-bio" width={40} height={40} />
            <span className="font-bold text-xl ml-[24px] mr-2">Link-in-bio</span>
            <span className="font-bold text-xs text-white bg-black px-0.5">NEW</span>
          </div>
          <div className="text-gray-500 mt-10 mb-14 text-start">Bitly Link-in-bio, powered by Bitly Link Management, to help you curate, package and track your best links.</div>
          <div className="bg-gray-300 h-[0.1px] mx-3"></div>
          <div className="mt-6 text-start font-bold">Popular Link-in-bio Features</div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-2xl text-blue-600">
              <AiOutlineCheckCircle />
            </span>
            Custom URLs for social media
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-2xl text-blue-600">
              <AiOutlineCheckCircle />
            </span>
            Customizable landing page
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-2xl text-blue-600">
              <AiOutlineCheckCircle />
            </span>
            Easy-to-manage links
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-2xl text-blue-600">
              <AiOutlineCheckCircle />
            </span>
            Link and landing page tracking
          </div>
          <button className="bg-blue-600 text-white hover:bg-blue-800 px-4 pt-2 pb-3 rounded-lg w-full font-medium mt-5">Get Started For Free</button>
          <div className="pt-3 text-blue-600 font-medium">Learn More</div>
        </div>
      </div>
    </div>
  );
};

export default ExtendedHero;
