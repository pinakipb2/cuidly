import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = ({ item }) => {
  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-white px-36 py-2 pt-3 rounded">
        <div className="flex flex-row justify-between items-center w-full">
          <Link href="/">
            <div className="hover:cursor-pointer">
              <Image src="/cuidly.svg" className="mr-3 h-6" width={120} height={60} alt="cuidly" />
            </div>
          </Link>
          <div className="flex flex-row w-full justify-end space-x-8">
            <ul className="flex mt-0 mr-16 rounded-lg flex-row space-x-8 font-medium">
              <li className="block py-2 pr-4 pl-3 text-gray-700 hover:cursor-pointer hover:text-blue-600">
                <span>Why Cuidly?</span>
              </li>
              <Link href="/about">
                <li className={`block py-2 pr-4 pl-3  hover:cursor-pointer hover:text-blue-600 ${item === 'about' ? 'text-blue-600' : 'text-gray-700'}`}>
                  <span>About</span>
                </li>
              </Link>
              <Link href="/pricing">
                <li className={`block py-2 pr-4 pl-3  hover:cursor-pointer hover:text-blue-600 ${item === 'pricing' ? 'text-blue-600' : 'text-gray-700'}`}>
                  <span>Pricing</span>
                </li>
              </Link>
            </ul>
            <ul className="flex mt-0 rounded-lg flex-row space-x-6 font-medium">
              <Link href="/login">
                <li className={`block py-2 pr-4 pl-3  hover:cursor-pointer hover:text-blue-600 ${item === 'login' ? 'text-blue-600' : 'text-gray-700'}`}>
                  <span>Log in</span>
                </li>
              </Link>
              <Link href="/register">
                <li className="block py-2 pr-4 pl-3 text-gray-700 hover:cursor-pointer">
                  <span className="text-blue-600">Sign up Free</span>
                </li>
              </Link>
            </ul>
            <button className="text-white bg-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-800 pb-2.5">Get a Quote</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
