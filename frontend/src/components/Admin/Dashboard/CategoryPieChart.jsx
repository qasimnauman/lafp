import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const COLORS = [
  "#1D4ED8",
  "#3B82F6",
  "#06B6D4",
  "#FACC15",
  "#F97316",
  "#10B981",
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow text-sm">
        <p className="font-semibold text-gray-700">{payload[0].name}</p>
        <p className="text-blue-600">{`Items: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const renderCustomizedLabel = ({ percent }) => `${(percent * 100).toFixed(0)}%`;

const CategoryPieChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("/api/v1/items/getallitems");
        if (res.data.success) {
          const items = res.data.message;

          // Aggregate counts by category
          const categoryCounts = {};
          items.forEach((item) => {
            const categoryName = item.category?.name || "Unknown";
            categoryCounts[categoryName] =
              (categoryCounts[categoryName] || 0) + 1;
          });

          // Convert to array format for PieChart
          const chartData = Object.entries(categoryCounts).map(
            ([name, value]) => ({
              name,
              value,
            })
          );

          setCategoryData(chartData);
        }
      } catch (error) {
        console.error("Failed to fetch category data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="w-full max-w-2xl h-96 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Item Categories
      </h2>
      {loading ? (
        <p className="text-gray-500">Loading chart...</p>
      ) : (
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              fill="#8884d8"
              paddingAngle={3}
              dataKey="value"
              label={renderCustomizedLabel}
              stroke="#f3f4f6"
              strokeWidth={2}
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ fontSize: 14 }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryPieChart;
