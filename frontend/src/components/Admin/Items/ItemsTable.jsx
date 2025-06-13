import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import axios from "axios";

const StatusBadge = ({ status }) => {
  const isLost = status === "lost";
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${
        isLost ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ActionsDropdown = ({ onView, onDelete, deleting }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-blue-50 text-gray-600"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-blue-100 rounded-lg shadow-lg z-10">
          <button
            onClick={() => {
              setOpen(false);
              onView();
            }}
            className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
          >
            View Details
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            disabled={deleting}
            className={`w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 ${
              deleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
};

const ItemsTable = ({ items, categoryFilter }) => {
  const [localItems, setLocalItems] = useState(items); // fixed state naming

  const filteredItems = localItems.filter((item) =>
    categoryFilter === ""
      ? true
      : item.category?.name?.toLowerCase() === categoryFilter
  );

  const handleView = (item) => {
    alert(`Viewing details for ${item.itemName}`);
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg border border-blue-100">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr className="bg-blue-50 text-blue-800 font-semibold">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Item Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Reporter</th>
              <th className="px-6 py-4">Status</th>
              {/* <th className="px-6 py-4 text-center">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold">{item._id?.slice(-5)}</td>
                  <td className="px-6 py-4 font-semibold">
                    {item.itemName || "Unnamed"}
                  </td>
                  <td className="px-6 py-4 capitalize">
                    {item.category?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4">{item.location || "N/A"}</td>
                  <td className="px-6 py-4">
                    {item.date
                      ? new Date(item.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {item.reportedBy?.fullName || "Unknown"}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-slate-500 py-6">
                  No items found in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsTable;
