import React from "react";

const StepCard = ({ icon, title, subtitle, description, width = "w-full", height = "h-auto" }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-6 text-left hover:shadow-lg transition-shadow ${width} ${height}`}
    >
      <div className="flex justify-center mb-4 text-blue-600">{icon}</div>
      <h3 className="text-xl font-semibold mb-1 text-center text-blue-800">{title}</h3>
      <h4 className="text-lg font-medium text-blue-600 mb-2 text-center">{subtitle}</h4>
      <p className="text-blue-500 text-sm text-center">{description}</p>
    </div>
  );
};

export default StepCard;
