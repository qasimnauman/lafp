import React, { useState } from 'react';
import ItemsTable from '../../components/Admin/Items/ItemsTable';

const items = [
  {
    id: 1,
    name: "MacBook Pro 16-inch",
    category: "electronics",
    location: "Library",
    date: "May 15, 2023",
    reporter: "Ahmed",
    status: "lost",
  },
  {
    id: 2,
    name: "Apple AirPods Pro",
    category: "electronics",
    location: "Cafeteria",
    date: "May 16, 2023",
    reporter: "Zain",
    status: "found",
  },
  {
    id: 3,
    name: "University ID Card",
    category: "documents",
    location: "Academic Building",
    date: "May 21, 2023",
    reporter: "Sara",
    status: "found",
  },
  {
    id: 4,
    name: "Black Leather Wallet",
    category: "personal",
    location: "Sports Complex",
    date: "May 22, 2023",
    reporter: "Unknown",
    status: "lost",
  },
];

const Items = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value.toLowerCase());
  };

  return (
    <div className="px-5">
      {/* Header with title and filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-blue-800">Items Page</h1>
          <p className="text-blue-600 text-sm mt-1">Manage all lost and found items in the system</p>
        </div>

        <div className="mt-3 md:mt-0">
          <label htmlFor="category" className="text-sm font-medium text-blue-700 mr-2">
            Category:
          </label>
          <select
            id="category"
            name="category"
            className="border border-blue-300 rounded-md px-3 py-1.5 text-sm text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="documents">Documents</option>
            <option value="personal">Personal</option>
            <option value="accessories">Accessories</option>
            <option value="clothing">Clothing</option>
            <option value="others">Others</option>
          </select>
        </div>
      </div>

      {/* Pass selectedCategory and items to the table */}
      <ItemsTable items={items} categoryFilter={selectedCategory} />
    </div>
  );
};

export default Items;
