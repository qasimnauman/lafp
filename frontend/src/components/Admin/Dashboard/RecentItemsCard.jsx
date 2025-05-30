import { Eye, MapPin, CalendarDays } from "lucide-react";

// 🧾 List of reported items
const reportedItems = [
  {
    name: "MacBook Pro 16-inch",
    location: "Library",
    dateReported: "May 15, 2023",
    status: "lost",
  },
  {
    name: "Apple AirPods Pro",
    location: "Cafeteria",
    dateReported: "May 16, 2023",
    status: "found",
  },
  {
    name: "University ID Card",
    location: "Academic Building",
    dateReported: "May 21, 2023",
    status: "found",
  },
  {
    name: "Black Leather Wallet",
    location: "Sports Complex",
    dateReported: "May 22, 2023",
    status: "lost",
  },
];

// 🔴 Green or Red dot indicator
const StatusIndicator = ({ status }) => {
  const colorClass = status === "lost" ? "bg-rose-500" : "bg-emerald-500";
  return <span className={`w-3 h-3 rounded-full mt-1 ${colorClass}`} />;
};

// 🏷️ Status label (e.g. "lost", "found")
const StatusLabel = ({ status }) => {
  const labelClass =
    status === "lost"
      ? "bg-rose-100 text-rose-700"
      : "bg-blue-600 text-white";

  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${labelClass}`}>
      {status}
    </span>
  );
};

// 📦 Main component
const RecentItemsCard = () => {
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
        <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
          <Eye className="w-4 h-4" />
          View All
        </button>
      </div>

      {/* 🔸 Item List */}
      <div className="space-y-5">
        {reportedItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            {/* Left: Dot + Info */}
            <div className="flex items-start gap-3">
              <StatusIndicator status={item.status} />
              <div>
                {/* Item Name */}
                <p className="text-base font-medium text-gray-900">
                  {item.name}
                </p>

                {/* Location & Date */}
                <div className="flex items-center text-sm text-gray-500 gap-4 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {item.dateReported}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Status Tag */}
            <StatusLabel status={item.status} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentItemsCard;
