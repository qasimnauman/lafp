import React from "react";
import {
  FaSearch,
  FaBell,
  FaShieldAlt,
  FaFileAlt,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

const steps = [
  {
    icon: <FaFileAlt className="w-6 h-6 text-white" />,
    title: "Report",
    description:
      "Submit details of lost or found items on campus, including photos and descriptions.",
  },
  {
    icon: <FaSearch className="w-6 h-6 text-white" />,
    title: "Search",
    description:
      "Explore categorized listings by areas like A-Block, B-Block, or Cafeteria.",
  },
  {
    icon: <FaBell className="w-6 h-6 text-white" />,
    title: "Get Notified",
    description:
      "Get instant alerts when your lost item is found or your report matches something.",
  },
  {
    icon: <FaShieldAlt className="w-6 h-6 text-white" />,
    title: "Claim Securely",
    description:
      "Verify ownership through our system and arrange secure pickup from admin office.",
  },
];

export default function HowItWorks() {
  return (
    <div id="howitworks" className="w-[90%] mx-auto bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-8 text-center">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
        How <span className="text-blue-600">It Works</span>
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-12 text-lg">
        A seamless lost and found experience tailored for Air University
        students.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-4 mx-auto">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-3xl px-6 py-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-14 h-14 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              {step.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <span className="text-gray-600 text-sm font-medium mr-2">
          Ready to find your lost items?
        </span>
        <button className="px-6 py-3 flex gap-4 items-center justify-center text-white bg-[#004080] rounded-md font-medium hover:bg-[#002e5f] transition-colors duration-300">
          Get Started <FaArrowRight className="inline-block" />
        </button>
      </div>
    </div>
  );
}
