import React from "react";

const ItemCard = ({
    stat,
    index,
}) => {
  return (
    <div
      key={index}
      className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between border"
    >
      <div>
        <h3 className="text-gray-600 text-sm font-medium">{stat.label}</h3>
        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
      </div>
      <div className="bg-gray-100 p-3 rounded-full">{stat.icon}</div>
    </div>
  );
};

export default ItemCard;
