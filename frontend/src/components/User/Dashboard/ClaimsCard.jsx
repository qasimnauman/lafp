// components/ClaimCard.jsx
import React from "react";
import { Clock, CheckCircle, XCircle } from "lucide-react";

const ClaimCard = ({ claim }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="text-yellow-500 w-5 h-5" />;
      case "Approved":
        return <CheckCircle className="text-green-600 w-5 h-5" />;
      case "Rejected":
        return <XCircle className="text-red-500 w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 border border-gray-200 w-full">
      <div className="flex gap-4">
        <img
          src={claim.item.image}
          alt={claim.item.name}
          className="w-24 h-24 object-cover rounded border"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-1">{claim.item.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{claim.item.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400">
              Claimed on {new Date(claim.createdAt).toLocaleDateString()}
            </p>
            <div className="flex items-center gap-1 text-sm font-medium">
              {getStatusIcon(claim.status)}
              <span className="capitalize">{claim.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimCard;
