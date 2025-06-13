import React, { useState, useEffect } from "react";
import axios from "axios";

// Time ago helper
const timeAgo = (date) => {
  if (!date) return "Just now";
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const minutes = Math.floor(seconds / 60);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const ItemComments = ({ itemId, initialComments = [], onCommentAdded }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleAddComment = async () => {
    const trimmed = newComment.trim();
    if (!trimmed) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `/api/v1/comments/addcomment/${itemId}`,
        { content: trimmed },
        { withCredentials: true }
      );

      console.log(res.data.message);

      const newCommentFromServer = res.data.message;
      setComments((prev) => [...prev, newCommentFromServer]);
      console.log(res.data.message.createdAt);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment", err);
      alert("Failed to post comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-4">
      <h4 className="text-sm font-semibold mb-2">Comments</h4>

      {comments.length > 0 ? (
        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
          {comments.map((c, i) => (
            <div key={i} className="flex items-start gap-3">
              <img
                src={
                  c.postedBy?.avatar || "https://i.pravatar.cc/150?u=default"
                }
                alt={c.postedBy?.fullName || "User"}
                className="w-8 h-8 rounded-full border object-cover"
              />
              <div>
                <p className="text-sm">
                  <span className="font-semibold mr-1 text-gray-800">
                    {c.postedBy?.fullName || "Unknown"}
                  </span>
                  <span className="text-gray-700">{c.content}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {c.createdAt ? timeAgo(c.createdAt) : "Just now"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No comments yet.</p>
      )}

      {/* Comment Input */}
      <div className="mt-4 flex gap-2">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          type="text"
          placeholder="Write a comment..."
          className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddComment}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default ItemComments;
