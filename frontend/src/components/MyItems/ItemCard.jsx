import React, { useState } from "react";
import { Calendar, MapPin, Eye, Edit, Trash2 } from "lucide-react";
import ItemDetailsModal from "./ItemDetailsModal";

const ItemCard = ({ item, activeTab, onWithdraw }) => {
  const [showModal, setShowModal] = useState(false);

  const createdDate = new Date(item?.createdAt || Date.now());
  const now = new Date();
  const diffTime = now - createdDate;
  const daysAgo = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {item.itemName}
            </h3>
            <p className="text-gray-600 mt-1">{item.description}</p>
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 capitalize">
            {item.status}
          </div>
        </div>

        {/* Info Row */}
        <div className="flex gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {daysAgo === 0
              ? "Today"
              : `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {item.location}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 flex-wrap">
            {/* View Button */}
            <button
              onClick={() => setShowModal(true)}
              className="text-blue-600 hover:underline text-sm flex items-center gap-1"
            >
              <Eye className="w-4 h-4" /> View
            </button>

            {/* Edit Button */}
            <button
              className="text-yellow-600 hover:underline text-sm flex items-center gap-1"
              onClick={() => alert("Edit functionality not implemented yet")}
            >
              <Edit className="w-4 h-4" /> Edit
            </button>

            {/* Withdraw (Lost only) */}
            {activeTab === "Lost Items" && (
              <button
                onClick={() => onWithdraw(item._id)}
                className="text-red-600 hover:underline text-sm flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Withdraw
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ItemDetailsModal item={item} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default ItemCard;
