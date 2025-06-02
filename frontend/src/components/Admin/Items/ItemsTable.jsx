import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

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

const ActionsDropdown = ({ onView, onDelete }) => {
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
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

const ItemsTable = ({ items, categoryFilter }) => {
  const filteredItems = items.filter((item) =>
    categoryFilter === "" ? true : item.category.toLowerCase() === categoryFilter
  );

  const handleView = (item) => {
    alert(`Viewing details for ${item.name}`);
  };

  const handleDelete = (item) => {
    alert(`Deleting item: ${item.name}`);
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto bg-white shadow rounded-lg border border-blue-100">
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
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-bold">{item.id}</td>
                  <td className="px-6 py-4 font-semibold">{item.name}</td>
                  <td className="px-6 py-4 capitalize">{item.category}</td>
                  <td className="px-6 py-4">{item.location}</td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4">{item.reporter}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <ActionsDropdown
                      onView={() => handleView(item)}
                      onDelete={() => handleDelete(item)}
                    />
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
