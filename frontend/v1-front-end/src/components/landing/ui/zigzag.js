import React from "react";
import { Link } from "react-router-dom";

import featImage01 from "../../../assets/FeatureImg.png";
import featImage03 from "../../../assets/undraw_stepping_up_g6oo.svg";

function Zigzag() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        <div className="py-12 md:py-20 border-t border-gray-800">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-green-600 bg-green-200 rounded-full mb-4">
              Reach goals that matter
            </div>
            <h1 className="h2 mb-4">One product, unlimited solutions</h1>
            <p className="text-xl text-gray-400">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit laborum — semper quis lectus nulla.
            </p>
          </div>

          {/* Items */}

          {/* 1st item */}
          <div className="flex flex-col-reverse md:flex-row items-center">
            {/* Image */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1 rounded-lg shadow-lg"
              data-aos="fade-up"
            >
              <img
                className="max-w-full mx-auto mt-8 md:max-w-none h-auto"
                src={featImage01}
                width={540}
                height={405}
                alt="Features 01"
              />
            </div>
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 "
              data-aos="fade-right"
            >
              <div className="md:pr-4 lg:pr-12 xl:pr-16">
                <div className="w-full flex flex-col items-center justify-center text-4xl lg:text-5xl gap-5">
                  <span className="font-bold text-orange-400 text-center ">
                    AI-Powered
                  </span>
                  <div className=" font-bold text-center text-purple-600 mb-2">
                    Mentor Matching
                  </div>
                </div>
                <p className="text-xl m-4">
                  Our AI algorithm analyzes your needs and preferences to
                  recommend the perfect mentor for you. Save time and find the
                  best mentor for your professional growth.
                </p>
              </div>
            </div>
          </div>

          {/* 2nd item */}
          <div className="mt-8 flex flex-col md:flex-row-reverse md:mt-20 items-center">
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 "
              data-aos="fade-right"
            >
              <div className="md:pl-4 lg:pl-12 xl:pl-16">
                <div className="w-full flex flex-col items-center justify-center text-4xl lg:text-5xl gap-5">
                  <span className="font-bold text-orange-400 text-center ">
                    Easy to
                  </span>
                  <div className="font-bold text-center text-purple-600 mb-2">
                    Get Started
                  </div>
                </div>

                <p className="text-xl m-4">
                  Getting started is as easy as 1-2-3! Simply follow these
                  simple steps to begin your journey with us.
                </p>
                <ul className="text-lg text-gray-400 mb-2 px-5">
                  <li className="flex items-center mb-2">
                    <svg
                      className="w-3 h-3 fill-current text-purple-500 mr-2 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Step 1</span>
                  </li>
                  <li className="flex items-center mb-2">
                    <svg
                      className="w-3 h-3 fill-current text-purple-500 mr-2 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Step 2</span>
                  </li>

                  <li className="flex items-center">
                    <svg
                      className="w-3 h-3 fill-current text-purple-500 mr-2 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Step 3</span>
                  </li>
                </ul>
                <Link
                  to="/signup"
                  className="flex items-center justify-center text-xl px-8 py-3 mt-4 w-48 bg-purple-600 text-white font-bold rounded-full shadow-lg transition duration-300 hover:bg-primary-700 hover:text-white focus:shadow-outline transform hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            </div>
            {/* Image */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1 rounded-lg shadow-lg"
              data-aos="fade-up"
            >
              <img
                className="max-w-full mx-auto mt-8 md:max-w-none h-auto"
                src={featImage03}
                width={540}
                height={400}
                alt="steps"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Zigzag;
