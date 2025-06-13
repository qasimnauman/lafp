import React, { useState, useEffect } from "react";
import axios from "axios";
import ClaimCard from "../../components/User/Dashboard/ClaimsCard";

const ClaimsPage = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user?._id) {
          console.error("User ID not found in localStorage.");
          return;
        }

        const res = await axios.get(`/api/v1/items/claimeditems`, {
          withCredentials: true,
        });

        const claimedItems = res.data.message || [];
        setClaims(claimedItems);
      } catch (err) {
        console.error(
          "Failed to fetch claimed items:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  return (
    <div className="mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">My Claims</h1>

      {loading ? (
        <p className="text-gray-500 text-center">Loading claims...</p>
      ) : claims.length === 0 ? (
        <p className="text-gray-500 text-center">
          You haven’t made any claims yet.
        </p>
      ) : (
        <div className="space-y-4">
          {claims.map((item) => (
            <ClaimCard
              key={item._id}
              claim={{
                id: item._id,
                item: {
                  id: item._id,
                  name: item.itemName,
                  description: item.description,
                  image:
                    item.imageUrls?.[0] || "https://via.placeholder.com/100",
                },
                status: "Pending",
                createdAt: item.createdAt,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClaimsPage;
