import React, { useEffect, useState } from "react";
import axios from "axios";
// import { toast, Toaster } from "react-hot-toast";

// Status badge renderer
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
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Fetch claims from backend
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get("/api/v1/items/getallclaimeditems");
        setClaims(res.data.message);
      } catch (err) {
        console.error("Failed to load claims:", err);
        // toast.error("Failed to load claim requests");
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  // Approve/Reject claim handler
  const handleApproveClaim = async (itemId, userId) => {
    try {
      setActionLoadingId(`${itemId}_${userId}`);
      await axios.post("/api/v1/items/approveclaim", { itemId, userId });

      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim._id === itemId ? { ...claim, claimStatus: "Approved" } : claim
        )
      );
    } catch (err) {
      console.error("Error approving claim:", err);
      alert("Failed to approve claim.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRejectClaim = async (itemId, userId) => {
    try {
      setActionLoadingId(`${itemId}_${userId}`);
      await axios.post("/api/v1/items/approveClaim", { itemId, userId });

      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim._id === itemId ? { ...claim, claimStatus: "Rejected" } : claim
        )
      );
    } catch (err) {
      console.error("Error rejecting claim:", err);
      alert("Failed to reject claim.");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading claims...</div>;
  }

  return (
    <div className="p-6 relative">
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr className="bg-blue-50 text-blue-800 font-semibold">
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Claimant</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => {
              // const loadingKey = `${claim._id}_${claim.claimant?._id}`;
              return (
                <tr key={claim._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{claim.itemName}</td>
                  <td className="px-6 py-4">{claim.claimant?.fullName}</td>
                  <td className="px-6 py-4">
                    <div>{claim.claimant?.email}</div>
                    <div className="text-gray-500 text-sm">
                      {claim.claimant?.contact}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(claim.claimedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(claim.claimStatus)}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    {claim.claimStatus === "Pending" ? (
                      <>
                        <button
                          onClick={() =>
                            handleApproveClaim(claim._id, claim.claimant._id)
                          }
                          disabled={
                            actionLoadingId ===
                            `${claim._id}_${claim.claimant._id}`
                          }
                          className={`px-3 py-1 rounded border text-green-600 border-green-600 ${
                            actionLoadingId ===
                            `${claim._id}_${claim.claimant._id}`
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-green-50"
                          }`}
                        >
                          {actionLoadingId ===
                          `${claim._id}_${claim.claimant._id}`
                            ? "Processing..."
                            : "Approve"}
                        </button>
                        <button
                          onClick={() =>
                            handleRejectClaim(claim._id, claim.claimant._id)
                          }
                          disabled={
                            actionLoadingId ===
                            `${claim._id}_${claim.claimant._id}`
                          }
                          className={`px-3 py-1 rounded border text-red-600 border-red-600 ${
                            actionLoadingId ===
                            `${claim._id}_${claim.claimant._id}`
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-red-50"
                          }`}
                        >
                          {actionLoadingId ===
                          `${claim._id}_${claim.claimant._id}`
                            ? "Processing..."
                            : "Reject"}
                        </button>
                      </>
                    ) : (
                      <button className="text-blue-600 hover:underline">
                        View
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimRequestsTable;
