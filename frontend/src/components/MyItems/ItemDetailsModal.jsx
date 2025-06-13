import React, { useState, useEffect } from "react";
import ItemComments from "./ItemComments";
import UserProfileModal from "../User/UserProfileModal";
import axios from "axios";

const ItemDetailsModal = ({ item, onClose }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [hasAlreadyClaimed, setHasAlreadyClaimed] = useState(false);

  const storedUser = localStorage.getItem("user");
  const loggedInUserId = storedUser ? JSON.parse(storedUser)._id : null;

  useEffect(() => {
    if (item.claims?.some((claim) => claim.user._id === loggedInUserId)) {
      setHasAlreadyClaimed(true);
    }
  }, [item.claims, loggedInUserId]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const res = await axios.get(
          `/api/v1/comments/getallcomments/${item._id}`,
          {
            withCredentials: true,
          }
        );
        console.log("GTe comments", res.data.message)
        setComments(res.data.message || []);
        // console.log(res.data)
      } catch (err) {
        console.error("Failed to load comments", err);
        setComments([]);
      } finally {
        setLoadingComments(false);
      }
    };

    if (item?._id) fetchComments();
  }, [item?._id]);

  // console.log("ItemDetailsModal item:", item);

  const [claiming, setClaiming] = useState(false);
  if (!item) return null;

  // Use reportedBy or fallback user object
  const user = item.reportedBy || {
    username: "unknown",
    fullName: "Unknown User",
    email: "unknown@example.com",
    phone: "Not Provided",
    department: "N/A",
    semester: "N/A",
    studentId: "N/A",
    avatar: "https://i.pravatar.cc/150?u=default",
  };

  // console.log(item);

  // Calculate days ago
  const createdDate = new Date(item.createdAt || Date.now());
  const now = new Date();
  const diffTime = now - createdDate;
  const daysAgo = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const handleClaimItem = async () => {
    try {
      setClaiming(true);

      console.log(item);
      const res = await axios.post(`/api/v1/items/claim/${item._id}`, null, {
        withCredentials: true,
      });


      console.log("Details Modal \n", res.data)
      alert("✅ " + res.data.message);
    } catch (err) {
      console.error(err);
      alert(
        "❌ Failed to claim item: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setClaiming(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
        <div
          className="bg-white w-full max-w-2xl max-h-[90%] overflow-y-auto rounded-3xl p-6 relative shadow-xl transition-all duration-300 ease-in-out"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Hide scrollbar for WebKit */}
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            &times;
          </button>

          {/* Item Name */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {item.itemName}
          </h2>

          {/* Image Gallery */}
          <div className="overflow-x-auto flex gap-4 mb-4">
            {(item.imageUrls?.length > 0
              ? item.imageUrls
              : ["https://via.placeholder.com/300"]
            ).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${item.itemName} image ${idx + 1}`}
                className="w-40 h-40 object-cover rounded-xl border"
              />
            ))}
          </div>

          {/* Item Details */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
            <p>
              <strong>Description:</strong> {item.description}
            </p>
            <p>
              <strong>Status:</strong> {item.status}
            </p>
            <p>
              <strong>Location:</strong> {item.location}
            </p>
            <p>
              <strong>Category:</strong> {item.category?.name || "N/A"}
            </p>
            <p>
              <strong>Reported:</strong>{" "}
              {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}
            </p>
          </div>

          {/* Reporter Info */}
          <div className="border-t pt-4 mb-6">
            <div className="flex items-center gap-3 p-2 rounded-xl transition">
              <img
                src={user.avatar}
                alt={user.fullName}
                onClick={() => setShowProfileModal(true)}
                className="w-10 h-10 rounded-full border object-cover cursor-pointer hover:shadow-md transition"
              />
              <div>
                <p
                  onClick={() => setShowProfileModal(true)}
                  className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-500">
                  {user.contact || "No contact provided"}
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-600 italic mt-2">
              {item.status === "lost"
                ? "This item was reported lost by the user above."
                : "This item was reported found by the user above."}
            </p>
          </div>

          {/* Make a Claim */}
          {item.status === "lost" && !hasAlreadyClaimed && (
            <div className="mb-6">
              <button
                onClick={handleClaimItem}
                disabled={claiming}
                className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition text-sm disabled:opacity-50"
              >
                {claiming ? "Claiming..." : "Make a Claim"}
              </button>
            </div>
          )}

          {/* Comments */}
          <div className="border-t pt-4">
            <ItemComments
              itemId={item._id}
              initialComments={comments}
              onCommentAdded={(newComment) =>
                setComments((prev) => [...prev, newComment])
              }
            />
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      {showProfileModal && (
        <UserProfileModal
          user={user}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </>
  );
};

export default ItemDetailsModal;
