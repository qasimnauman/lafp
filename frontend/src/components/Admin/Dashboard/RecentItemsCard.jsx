import React, { useEffect, useState } from "react";
import { Eye, MapPin, CalendarDays } from "lucide-react";
import axios from "axios";

// 🔴 Green or Red dot indicator
const StatusIndicator = ({ status }) => {
  const colorClass = status === "lost" ? "bg-rose-500" : "bg-emerald-500";
  return <span className={`w-3 h-3 rounded-full mt-1 ${colorClass}`} />;
};

// 🏷️ Status label (e.g. "lost", "found")
const StatusLabel = ({ status }) => {
  const labelClass =
    status === "lost" ? "bg-rose-100 text-rose-700" : "bg-blue-600 text-white";

  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${labelClass}`}
    >
      {status}
    </span>
  );
};

// 📦 Main component
const RecentItemsCard = () => {
  const [recentItems, setRecentItems] = useState([]);

  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        const res = await axios.get("/api/v1/items/getallitems");
        if (res.data.success) {
          const items = res.data.message;

          // Sort by date descending and take the most recent 5
          const sorted = items
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

          setRecentItems(sorted);
        }
      } catch (err) {
        console.error("Failed to fetch recent items", err);
      }
    };

    fetchRecentItems();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-5xl w-full">
      {/* 🔹 Card Header */}
      <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Recent Items</h2>
          <p className="text-sm text-gray-500">
            Latest lost and found items reported
          </p>
        </div>
      </div>

      {/* 🔸 Item List */}
      <div className="space-y-5">
        {recentItems.length > 0 ? (
          recentItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              {/* Left: Dot + Info */}
              <div className="flex items-start gap-3">
                <StatusIndicator status={item.status} />
                <div>
                  <p className="text-base font-medium text-gray-900">
                    {item.itemName}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Status Tag */}
              <StatusLabel status={item.status} />
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No recent items found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentItemsCard;
