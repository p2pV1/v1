import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

function Faq() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);
  const toggleQuestion = (questionIndex) => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="relative mb-12 py-12 border-t border-gray-800 md:py-20">
        <div className="flex flex-col items-center">
          <div>
            <h5 className="mb-4 text-center font-bold text-purple-500">FAQS</h5>
            <h3 className="w-full text-4xl sm:text-5xl font-gray-800 font-bold tracking-wide text-center">
              You have
              <span className="ml-3 font-bold text-orange-400 text-center ">
                Questions ?
              </span>
            </h3>

            <p className="w-full text-center mt-4 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 max-w-xl">
              And we have got answers to all of them. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="m-5 max-w-4xl relativen">
            {faqs.map((faq, index) => (
              <div
                key={index}
                onClick={() => {
                  toggleQuestion(index);
                }}
                className="cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300 group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg lg:text-xl font-semibold">
                    {faq.question}
                  </span>
                  <motion.span
                    className="ml-2 transition duration-300 text-purple-600"
                    aria-hidden="true"
                    variants={{
                      collapsed: { rotate: 0 },
                      open: { rotate: -180 },
                    }}
                    initial="collapsed"
                    animate={
                      activeQuestionIndex === index ? "open" : "collapsed"
                    }
                    transition={{
                      duration: 0.02,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    {activeQuestionIndex === index ? "-" : "+"}
                  </motion.span>
                </div>
                <motion.div
                  className="pointer-events-none text-sm sm:text-base leading-relaxed"
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: "0px" },
                    collapsed: { opacity: 0, height: 0, marginTop: "8px" },
                  }}
                  initial="collapsed"
                  animate={activeQuestionIndex === index ? "open" : "collapsed"}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  {faq.answer}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
