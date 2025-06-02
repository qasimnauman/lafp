import { TrendingUp } from "lucide-react";

const StatsCard = ({ title, value, change, changeText, icon: Icon }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-blue-50 p-4 rounded-xl shadow-md w-64">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-blue-800">{title}</h3>
        {Icon && <Icon className="w-5 h-5 text-blue-600" />}
      </div>
      <div className="text-3xl font-bold text-blue-900">{value}</div>
      <div className="mt-2 text-sm text-green-600 flex items-center">
        <span className="font-medium">{changeText}</span>
      </div>
    </div>
  );
};

export default StatsCard;
