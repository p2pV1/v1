import React from "react";

import { ReactComponent as SvgDecoratorBlob3 } from "../../../assets/svg-decorator-blob-3.svg";

import AIIconImage from "../../../assets/icons8-ai-64.png";
import ResumeIconImage from "../../../assets/icons8-resume-50.png";
import GPTIconImage from "../../../assets/icons8-chatgpt-30.png";

const cards = [
  {
    imageSrc: AIIconImage,
    title: "AI-Driven Matchmaking Algorithm Development",
    description:
      "Develop a powerful AI-based matching algorithm that extracts, analyzes, and understands free-form text inputs to facilitate effective mentor-mentee pairing",
  },
  {
    imageSrc: ResumeIconImage,
    title: "Resume and CV Analysis:",
    description:
      "Provide automated analysis of mentor and mentee resumes and CVs, extracting relevant terms and phrases to enhance the matching process.",
  },
  {
    imageSrc: GPTIconImage,
    title: "OpenAI Integration",
    description:
      "Integrate OpenAI capabilities for key phrase extraction, entity linking, and sentiment analysis to gain deeper insights from user inputs.",
  },
];

function Features() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 ">
      <div className="flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center md:py-24 w-full ">
        <div className="flex flex-col items-center">
          <h5 className="mb-4 text-center font-bold text-purple-500">
            Features
          </h5>
          <h3 className="w-full text-4xl sm:text-5xl font-gray-800 font-bold tracking-wide text-center">
            What We
            <span className="ml-3 font-bold text-orange-400 text-center ">
              Offers
            </span>
          </h3>
          <p className="w-full text-center mt-4 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 max-w-xl">
            Here are some of the features we offer.
          </p>
        </div>
        <div className="mt-5 w-full "></div>
        {cards.map((card, i) => (
          <div
            key={i}
            className="max-w-3xl md:min-h-96 md:w-1/2 lg:w-auto mx-4 mb-8 "
          >
            <div className=" flex flex-col items-center text-center md:text-left h-full px-4 py-6 rounded-lg shadow-lg  md:flex-row md:items-start md:content-center">
              <div className="border rounded-full p-3 flex-shrink-0">
                <img src={card.imageSrc} alt="" className="w-6 h-6" />
              </div>
              <div className="sm:ml-4 mt-4 sm:mt-0">
                <h3 className="mt-2 text-2xl font-semibold">{card.title}</h3>
                <p className="mt-2 text-lg text-gray-700">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SvgDecoratorBlob3 className="pointer-events-none absolute bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 " />
    </div>
  );
}
export default Features;
