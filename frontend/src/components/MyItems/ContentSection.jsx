import React from "react";
import ItemComments from "./ItemComments";

const ItemDetailsModal = ({ item, onClose }) => {
  if (!item) return null;

  const user = item.user || {
    fullName: "Unknown User",
    email: "unknown@example.com",
    avatar: "https://i.pravatar.cc/150?u=default",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-lg p-6 relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
        >
          &times;
        </button>

        {/* Item Info */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{item.name}</h2>

        {/* Images */}
        <div className="overflow-x-auto flex gap-4 mb-4">
          {(item.images && item.images.length > 0 ? item.images : [item.image || "https://via.placeholder.com/300"]).map(
            (img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${item.name} ${idx}`}
                className="w-40 h-40 object-cover rounded border"
              />
            )
          )}
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Status:</strong> {item.status}</p>
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Type:</strong> {item.type}</p>
          <p><strong>Reported:</strong> {item.daysAgo} days ago</p>
        </div>

        {/* User */}
        <div className="border-t pt-4 flex items-center gap-3 mb-4">
          <img
            src={user.avatar}
            alt="User"
            className="w-10 h-10 rounded-full border"
          />
          <div>
            <p className="text-sm font-semibold">{user.fullName}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Comments */}
        <div className="border-t pt-4">
          <ItemComments initialComments={item.comments} />
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal;
