import React from "react";
import heroBackgroundImage from "../../../assets/BackgroundImg1.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className="flex items-center bg-center bg-no-repeat min-h-screen w-full"
      style={{
        width: "100vw",
        backgroundImage: `url(${heroBackgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-25"></div>
      <div className="relative px-4 max-w-screen-xl mx-auto py-20">
        <div className="flex flex-col justify-center items-center space-y-8">
          <span className="block pl-3 py-1 text-gray-100 border-l-4 border-primary-500 font-medium shadow-md text-lg md:text-xl">
            Personalized mentor recommendations for you!
          </span>
          <h1 className="text-3xl text-center md:text-4xl lg:text-5xl font-bold text-white leading-tight transition-all duration-300 transform hover:scale-105">
            <span className="block m-4 md:m-8">Discover Your Ideal Mentor</span>
            <span className="relative text-orange-500 px-2 py-1 ">
              Empowered by AI
              <span className="absolute inset-0 bg-white transform -skew-x-12 -z-10"></span>
            </span>
          </h1>
          <Link
            to="/signup"
            className="px-8 py-3 mt-4 text-base bg-purple-600 text-white font-bold rounded-full shadow-lg transition duration-300 hover:bg-primary-700 hover:text-white focus:shadow-outline transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
