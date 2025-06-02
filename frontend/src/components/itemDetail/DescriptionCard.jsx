const DescriptionCard = ({ description, isSelfReported }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="font-semibold text-sm mb-1">Description</h3>
    <p className="text-sm text-gray-700 mb-2">{description}</p>
    {isSelfReported && (
      <div className="text-sm text-gray-500 border-t pt-2">You reported this item, so you cannot claim it.</div>
    )}
  </div>
);

export default DescriptionCard;
