import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  let imageContent;
  if (item.imageUrl) {
    imageContent = (
      <div className="relative">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-36 w-full object-cover rounded-lg"
        />
      </div>
    );
  } else {
    imageContent = (
      <div className="h-36 w-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
        No image
      </div>
    );
  }

  let statusBadge;
  if (item.status === 'Lost') {
    statusBadge = (
      <span className="text-xs px-2 py-1 rounded-md text-red-600 bg-red-100 font-medium">
        Lost
      </span>
    );
  } else {
    statusBadge = (
      <span className="text-xs px-2 py-1 rounded-md text-green-600 bg-green-100 font-medium">
        Found
      </span>
    );
  }

  return (
    <Link to={`/item/${item.id}`} className="block">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 p-3 flex flex-col gap-3">
        {imageContent}

        {/* Title, Status & Date */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-base font-semibold text-gray-800 truncate">{item.title}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{item.date}</p>
          </div>
          {statusBadge}
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
