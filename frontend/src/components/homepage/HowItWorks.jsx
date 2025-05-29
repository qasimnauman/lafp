import React from "react";
import { FaSearch, FaBell, FaShieldAlt, FaFileAlt } from "react-icons/fa";
import StepCard from "../common/StepCard"; // Adjust the path as needed

const steps = [
  {
    icon: <FaFileAlt className="w-8 h-8" />,
    title: "Step 1",
    subtitle: "Report",
    description:
      "Submit details of lost items or report items you've found on campus, with photos and description.",
  },
  {
    icon: <FaSearch className="w-8 h-8" />,
    title: "Step 2",
    subtitle: "Search",
    description:
      "Browse through listings of lost and found items categorized by locations like A-Block, B-Block, or Cafeteria.",
  },
  {
    icon: <FaBell className="w-8 h-8" />,
    title: "Step 3",
    subtitle: "Get Notified",
    description:
      "Receive instant alerts when a matching item is found or when someone claims your found item.",
  },
  {
    icon: <FaShieldAlt className="w-8 h-8" />,
    title: "Step 4",
    subtitle: "Claim Securely",
    description:
      "Verify ownership through our secure system and arrange pickup from the relevant office.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-6 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-2 text-blue-800">
        How <span className="text-blue-600">AULAF</span> Works
      </h2>
      <p className="text-blue-500 max-w-2xl mx-auto mb-12">
        Our platform makes it easy for Air University Islamabad students to report, find, and
        claim lost items without the hassle of visiting multiple offices.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            icon={step.icon}
            title={step.title}
            subtitle={step.subtitle}
            description={step.description}
            width="w-full"
          />
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 text-sm text-blue-500">
        <span className="flex items-center gap-1">
          <span className="text-green-500">✔</span> Secure & Reliable
        </span>
        <span className="flex items-center gap-1">
          <span className="text-green-500">✔</span> Fast Recovery
        </span>
        <span className="flex items-center gap-1">
          <span className="text-green-500">✔</span> Privacy Protected
        </span>
      </div>
    </section>
  );
}
