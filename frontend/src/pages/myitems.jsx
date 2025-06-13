import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure axios is installed
import { Search, Package } from "lucide-react";
import ItemCard from "../components/MyItems/ItemCard";
import { useItemContext } from "../context/ItemContext";

const MyItemsPage = () => {
  const [activeTab, setActiveTab] = useState("Lost Items");
  const [searchTerm, setSearchTerm] = useState("");
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setAllItems } = useItemContext(); // context

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("/api/v1/items/getallitems", {
          withCredentials: true,
        });

        const items = res.data.message;

        setAllItems(items);

        const lost = items.filter((item) => item.status === "lost");
        const found = items.filter((item) => item.status === "found");

        setLostItems(lost);
        setFoundItems(found);
      } catch (error) {
        console.error("Failed to fetch items", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [setAllItems]);

  const tabs = [
    { name: "Lost Items", count: lostItems.length, icon: Package },
    { name: "Found Items", count: foundItems.length, icon: Package },
  ];

  const getCurrentItems = () => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (activeTab === "Lost Items" ? lostItems : foundItems).filter(
      (item) =>
        item.itemName.toLowerCase().includes(lowerSearchTerm) ||
        item.description.toLowerCase().includes(lowerSearchTerm)
    );
  };

  const handleWithdrawReport = async (itemId) => {
    try {
      await axios.delete(`/api/v1/items/deleteitem/${itemId}`, {
        withCredentials: true,
      });

      if (activeTab === "Lost Items") {
        setLostItems((prev) => prev.filter((item) => item._id !== itemId));
      } else {
        setFoundItems((prev) => prev.filter((item) => item._id !== itemId));
      }
    } catch (error) {
      console.error(
        "Failed to delete item:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-500">
            My Items
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Manage your lost and found reports
          </p>
        </header>

        {/* Search */}
        <div className="mb-6 relative max-w-md mx-auto">
          <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search items..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow"
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-5 py-3 rounded-full text-sm font-medium border transition shadow-sm flex items-center gap-2 ${
                activeTab === tab.name
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12 text-blue-600 font-medium">
              Loading items...
            </div>
          ) : getCurrentItems().length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-500">No items found.</p>
            </div>
          ) : (
            getCurrentItems().map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                activeTab={activeTab}
                onWithdraw={handleWithdrawReport}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyItemsPage;
