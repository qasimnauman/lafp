import React, { useState, useEffect } from "react";
import {
  PackageSearch,
  PackageCheck,
  ClipboardList,
  PlusCircle,
  MapPin,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import ItemDetailsModal from "../../components/MyItems/ItemDetailsModal";

const UserDashboard = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [recentItems, setRecentItems] = useState([]);
  const [stats, setStats] = useState([]); // ✅ FIXED
  const [loadingItems, setLoadingItems] = useState(true);
  const [claiming, setClaiming] = useState(false);

  const storedUser = localStorage.getItem("user");
  const loggedInUserId = storedUser ? JSON.parse(storedUser)._id : null;

  const handleClaimItem = async (item) => {
    try {
      setClaiming(true);
      const res = await axios.post(`/api/v1/items/claim/${item._id}`, null, {
        withCredentials: true,
      });
      alert("✅ " + res.data.message);
    } catch (err) {
      console.error(err);
      alert(
        "❌ Failed to claim item: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setClaiming(false);
    }
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("/api/v1/items/getallitems");
        if (res.data.success) {
          const allItems = res.data.message;

          const sorted = [...allItems].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setRecentItems(sorted.slice(0, 5));

          const lostCount = allItems.filter(
            (item) => item.status === "lost"
          ).length;
          const foundCount = allItems.filter(
            (item) => item.status === "found"
          ).length;
          const myClaimsCount = allItems.filter((item) =>
            item.claims?.some((claim) => claim.user._id === loggedInUserId)
          ).length;

          setStats([
            {
              label: "Lost Items Reported",
              value: lostCount,
              icon: <PackageSearch className="h-6 w-6 text-blue-600" />,
            },
            {
              label: "Found Items",
              value: foundCount,
              icon: <PackageCheck className="h-6 w-6 text-green-600" />,
            },
            {
              label: "My Claims",
              value: myClaimsCount,
              icon: <ClipboardList className="h-6 w-6 text-purple-600" />,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, [loggedInUserId]);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-4xl font-bold text-gray-800 mb-1">Welcome Back!</h1>
        <p className="text-gray-500 text-sm">
          Here’s a quick look at your activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-5 rounded-xl bg-white border shadow-md hover:shadow-lg transition duration-300"
          >
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              {stat.label}
            </h3>
            <p className="text-2xl font-semibold text-blue-600">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-md p-6 border space-y-4">
        <h2 className="text-lg font-bold text-gray-800">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/user/report-item"
            state={{ status: "lost" }}
            className="flex items-center justify-center w-full sm:w-auto px-6 py-4 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-all"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Report Lost Item
          </Link>
          <Link
            to="/user/report-item"
            state={{ status: "found" }}
            className="flex items-center justify-center w-full sm:w-auto px-6 py-4 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition-all"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Report Found Item
          </Link>
        </div>
      </div>

      {/* Recent Items */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Items</h2>
        {loadingItems ? (
          <p className="text-center text-gray-400 py-6">Loading items...</p>
        ) : recentItems.length === 0 ? (
          <p className="text-center text-gray-400 py-6">
            No recent items found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentItems.map((item) => {
              const alreadyClaimed = item.claims?.some(
                (claim) => claim.user._id === loggedInUserId
              );

              return (
                <div
                  key={item._id}
                  className="bg-white p-5 rounded-xl shadow hover:shadow-lg border border-gray-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.itemName}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "lost"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {item.status === "lost" ? "Lost" : "Found"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      {item.location}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-5">
                    {item.status === "lost" && !alreadyClaimed ? (
                      <button
                        onClick={() => handleClaimItem(item)}
                        disabled={claiming}
                        className={`w-full px-4 py-2 text-sm rounded-lg transition ${
                          claiming
                            ? "bg-blue-300 text-white cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {claiming ? "Claiming..." : "Claim"}
                      </button>
                    ) : (
                      <span className="w-full px-4 py-2 text-center text-gray-500 text-sm bg-gray-100 rounded-lg">
                        {alreadyClaimed ? "Already Claimed" : "No Action"}
                      </span>
                    )}
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="w-full px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showModal && selectedItem && (
        <ItemDetailsModal item={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default UserDashboard;
