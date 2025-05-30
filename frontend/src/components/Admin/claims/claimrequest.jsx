import React, { useState } from "react";

const initialClaims = [
  {
    id: 101,
    item: "Apple AirPods Pro",
    claimant: "Hasan Ali",
    email: "hasan.ali@example.com",
    phone: "+92 300 1234567",
    date: "May 18, 2023",
    status: "Pending",
  },
  {
    id: 102,
    item: "University ID Card",
    claimant: "Ali Ahmed",
    email: "ali.ahmed@example.com",
    phone: "+92 301 7654321",
    date: "May 22, 2023",
    status: "Approved",
  },
  {
    id: 103,
    item: "MacBook Pro 16-inch",
    claimant: "Ahmad Khan",
    email: "ahmad.khan@example.com",
    phone: "+92 302 9876543",
    date: "May 23, 2023",
    status: "Rejected",
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "Pending":
      return (
        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
          Pending
        </span>
      );
    case "Approved":
      return (
        <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
          Approved
        </span>
      );
    case "Rejected":
      return (
        <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
          Rejected
        </span>
      );
    default:
      return null;
  }
};

const ClaimRequestsTable = () => {
  const [claims, setClaims] = useState(initialClaims);

  const handleAction = (id, newStatus) => {
    setClaims((prevClaims) =>
      prevClaims.map((claim) =>
        claim.id === id ? { ...claim, status: newStatus } : claim
      )
    );

    // TODO: Call backend API here
    // fetch(`/api/claims/${id}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status: newStatus }),
    // });
  };

  return (
    <div className="p-6">
     
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr className="bg-blue-50 text-blue-800 font-semibold">
              <th className="px-6 py-4">Claim ID</th>
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Claimant</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-bold">{claim.id}</td>
                <td className="px-6 py-4 font-semibold">{claim.item}</td>
                <td className="px-6 py-4">{claim.claimant}</td>
                <td className="px-6 py-4">
                  <div>{claim.email}</div>
                  <div className="text-gray-500 text-sm">{claim.phone}</div>
                </td>
                <td className="px-6 py-4">{claim.date}</td>
                <td className="px-6 py-4">{getStatusBadge(claim.status)}</td>
                <td className="px-6 py-4 space-x-2">
                  {claim.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleAction(claim.id, "Approved")}
                        className="bg-white text-green-600 border border-green-600 px-3 py-1 rounded hover:bg-green-50"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(claim.id, "Rejected")}
                        className="bg-white text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <button className="text-blue-600 hover:underline">View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimRequestsTable;
