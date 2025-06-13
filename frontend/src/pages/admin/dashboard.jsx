import React, { useEffect, useState } from "react";
import { Package, Search, Bell, HelpCircle } from "lucide-react";
import axios from "axios";
import StatsCard from "../../components/Admin/Dashboard/card";
import RecentItemsCard from "../../components/Admin/Dashboard/RecentItemsCard";
import CategoryPieChart from "../../components/Admin/Dashboard/CategoryPieChart";

const Dashboard = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/v1/items/getallitems");
        console.log("API Response:", res.data);

        if (res.data.success) {
          const items = res.data.message;

          const total = items.length;
          const lost = items.filter((i) => i.status === "lost").length;
          const found = items.filter((i) => i.status === "found").length;
          const pendingClaims = items.filter(
            (i) =>
              i.claims?.length > 0 &&
              i.claims.some((c) => !c.verified && !c.resolved)
          ).length;

          setCardData([
            {
              title: "Total Items",
              value: total,
              change: 0,
              changeText: "Across all categories",
              icon: Package,
            },
            {
              title: "Lost Items",
              value: lost,
              change: 0,
              changeText: "Currently reported lost",
              icon: Search,
            },
            {
              title: "Found Items",
              value: found,
              change: 0,
              changeText: "Items recovered recently",
              icon: Bell,
            },
            {
              title: "Pending Claims",
              value: pendingClaims,
              change: 0,
              changeText: "Awaiting verification",
              icon: HelpCircle,
            },
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="px-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-blue-800">
            Dashboard Overview
          </h1>
          <p className="text-sm text-blue-600 mt-1">
            Summary of lost and found items at a glance
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            <p className="text-gray-500 col-span-4">Loading stats...</p>
          ) : (
            cardData.map((card, index) => (
              <StatsCard
                key={index}
                title={card.title}
                value={card.value}
                change={card.change}
                changeText={card.changeText}
                icon={card.icon}
              />
            ))
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 p-4">
          <CategoryPieChart />
          <RecentItemsCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
