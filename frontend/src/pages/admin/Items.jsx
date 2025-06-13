import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemsTable from "../../components/Admin/Items/ItemsTable";

const Items = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch items from API
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/items/getallitems");
      setItems(res.data.message);
      console.log("Fetched items:", res.data.message);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/v1/category/getallcategories");
      setCategories(res.data.message);
      console.log("Fetched categories:", res.data.message);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value.toLowerCase());
  };

  // Apply category filter on frontend
  const filteredItems = selectedCategory
    ? items.filter(
        (item) => item.category?.name?.toLowerCase() === selectedCategory
      )
    : items;

  return (
    <div className="px-5">
      {/* Header with title and filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-blue-800">Items Page</h1>
          <p className="text-blue-600 text-sm mt-1">
            Manage all lost and found items in the system
          </p>
        </div>

        <div className="mt-3 md:mt-0">
          <label
            htmlFor="category"
            className="text-sm font-medium text-blue-700 mr-2"
          >
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
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name.toLowerCase()}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Items Table */}
      {loading ? (
        <div className="text-blue-600">Loading items...</div>
      ) : (
        <ItemsTable items={filteredItems} categoryFilter={selectedCategory} />
      )}
    </div>
  );
};

export default Items;
