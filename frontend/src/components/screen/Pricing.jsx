import React from 'react';
import { HiLockClosed } from 'react-icons/hi';
import { BiRupee } from 'react-icons/bi';
import { FaLink } from 'react-icons/fa';
import Link from 'next/link';

const PricingComponent = () => {
  return (
    <div className="w-full mt-10 flex flex-col">
      <div className="text-center text-5xl font-bold pb-3">Pricing for brands and businesses of all sizes</div>
      <div className="text-center text-xl pb-10">Connect to your audience with branded links, QR Codes, and a Link-in-bio that will get their attention.</div>
      <div className="flex w-full justify-center items-center pb-16">
        <div className="flex bg-gray-200 px-1 py-1 rounded-lg gap-2">
          <div className="bg-white text-black px-5 py-2 font-semibold rounded-md hover:cursor-pointer">Monthly billing</div>
          <div className="px-5 py-2 font-semibold text-gray-500 flex items-center gap-1.5 hover:cursor-pointer">
            <span className="text-lg">
              <HiLockClosed />
            </span>
            Yearly billing
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center gap-6">
        <div className="border-2 w-[20%] border-gray-300 rounded-lg px-4 pt-4 pb-6">
          <div className="font-bold text-xl text-center w-full">GUEST</div>
          <div className="bg-gray-300 h-[0.1px] my-1 mb-4"></div>
          <div className="flex font-bold text-5xl justify-center place-items-end w-full mb-2">
            <div className="text-4xl inline-block align-baseline">
              <BiRupee />
            </div>
            <div className="mr-1">0</div>
            <div className="text-base pb-0.5 font-medium align-text-bottom">/10 days</div>
          </div>
          <Link href="/">
            <button className="bg-blue-600 text-white hover:bg-blue-800 px-4 pt-2 pb-2.5 rounded-lg w-full font-medium mt-5">Get Started</button>
          </Link>
          <div className="text-gray-500 my-3 text-center">10 cuidly links/10 days</div>
          <div className="bg-gray-300 h-[0.1px] mx-3"></div>
          <div className="mt-6 text-start font-bold">Features:</div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-lg text-green-600">
              <FaLink />
            </span>
            Limited 10 days account
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-lg text-green-600">
              <FaLink />
            </span>
            High Rate limitting
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-lg text-green-600">
              <FaLink />
            </span>
            Cuidly AD URL redirects
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-lg text-green-600">
              <FaLink />
            </span>
            No analytics & tracking
          </div>
        </div>
        <div className="border-2 w-[20%] border-gray-300 rounded-lg px-4 pt-4 pb-6">
          <div className="font-bold text-xl text-center w-full">FREE</div>
          <div className="bg-gray-300 h-[0.1px] my-1 mb-4"></div>
          <div className="flex font-bold text-5xl justify-center place-items-end w-full mb-2">
            <div className="text-4xl inline-block align-baseline">
              <BiRupee />
            </div>
            <div className="mr-1">0</div>
            <div className="text-base pb-0.5 font-medium align-text-bottom">/month</div>
          </div>
          <Link href="/register">
            <button className="bg-blue-600 text-white hover:bg-blue-800 px-4 pt-2 pb-2.5 rounded-lg w-full font-medium mt-5">Get Started</button>
          </Link>
          <div className="text-gray-500 my-3 text-center">Unlimited cuidly links</div>
          <div className="bg-gray-300 h-[0.1px] mx-3"></div>
          <div className="bg-gray-300 h-[0.1px] mx-3"></div>
          <div className="mt-6 text-start font-bold">Features:</div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-lg text-blue-600">
              <FaLink />
            </span>
            QR Codes
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-lg text-blue-600">
              <FaLink />
            </span>
            Low Rate limitting
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-lg text-blue-600">
              <FaLink />
            </span>
            Cuidly AD URL redirects
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-lg text-blue-600">
              <FaLink />
            </span>
            Advanced analytics & tracking
          </div>
        </div>
        <div className="border-2 w-[20%] border-gray-300 rounded-lg px-4 pt-4 pb-6">
          <div className="font-bold text-xl text-center w-full">PREMIUM</div>
          <div className="bg-gray-300 h-[0.1px] my-1 mb-4"></div>
          <div className="flex font-bold text-5xl justify-center place-items-end w-full mb-2">
            <div className="text-4xl inline-block align-baseline">
              <BiRupee />
            </div>
            <div className="mr-1">2500</div>
            <div className="text-base pb-0.5 font-medium align-text-bottom">/month</div>
          </div>
          <Link href="/register?type=PREMIUM">
            <button className="bg-blue-600 text-white hover:bg-blue-800 px-4 pt-2 pb-2.5 rounded-lg w-full font-medium mt-5">Get Started</button>
          </Link>
          <div className="text-gray-500 my-3 text-center">Unlimited cuidly links</div>
          <div className="bg-gray-300 h-[0.1px] mx-3"></div>
          <div className="bg-gray-300 h-[0.1px] mx-3"></div>
          <div className="mt-6 text-start font-bold">Features:</div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-lg text-orange-500">
              <FaLink />
            </span>
            Custom links with your brand
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-lg text-orange-500">
              <FaLink />
            </span>
            Advanced analytics & tracking
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-lg text-orange-500">
              <FaLink />
            </span>
            QR Code colors
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-lg text-orange-500">
              <FaLink />
            </span>
            Access to support
          </div>
        </div>
        <div className="border-2 w-[20%] border-gray-300 rounded-lg px-4 pt-4 pb-6">
          <div className="font-bold text-xl text-center w-full">ENTERPRISE</div>
          <div className="bg-gray-300 h-[0.1px] my-1 mb-4"></div>
          <div className="flex font-bold text-4xl justify-center place-items-end w-full mb-4">
            <div>CUSTOM</div>
          </div>
          <button className="bg-green-600 text-white hover:bg-green-800 px-4 pt-2 pb-2.5 rounded-lg w-full font-medium mt-5">Get Started</button>
          <div className="text-gray-500 my-3 text-center">Unlimited cuidly links</div>
          <div className="bg-gray-300 h-[0.1px] mx-3"></div>
          <div className="bg-gray-300 h-[0.1px] mx-3"></div>
          <div className="mt-6 text-start font-bold">Features:</div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-lg text-red-500">
              <FaLink />
            </span>
            Multiple group permissions
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-lg text-red-500">
              <FaLink />
            </span>
            At scale link generation
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-lg text-red-500">
              <FaLink />
            </span>
            99.9% SLA uptime
          </div>
          <div className="my-3 text-start flex gap-2 items-center">
            <span className="text-lg text-red-500">
              <FaLink />
            </span>
            Account manager support
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingComponent;
