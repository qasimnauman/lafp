import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Electronics', value: 10 },
  { name: 'Clothing', value: 5 },
  { name: 'Accessories', value: 7 },
  { name: 'Documents', value: 3 },
];

const COLORS = ['#1D4ED8', '#3B82F6', '#06B6D4', '#FACC15'];

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

const renderCustomizedLabel = ({ percent }) =>
  `${(percent * 100).toFixed(0)}%`;

const CategoryPieChart = () => {
  return (
    <div className="w-full max-w-2xl h-96 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Item Categories</h2>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
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
            {data.map((entry, index) => (
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
    </div>
  );
};

export default CategoryPieChart;
