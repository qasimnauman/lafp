const ItemInfo = ({ title, location, date, category, status, reporterName, contactEmail }) => (
  <div className="space-y-4">
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="text-gray-600 text-sm space-x-2 mt-1">
        <span>{location}</span>
        <span>•</span>
        <span>{date}</span>
        <span>•</span>
        <span>{category}</span>
      </div>
    </div>

    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-700 mb-1">Item Status</h3>
      <p className="text-xs text-gray-500">{status}</p>
    </div>

    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-700 mb-1">Contact Information</h3>
      <p className="text-sm text-gray-800">Reported By: {reporterName}</p>
      <p className="text-sm text-gray-600">Contact: {contactEmail}</p>
    </div>
  </div>
);

export default ItemInfo;
