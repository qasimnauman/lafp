import { useState } from "react";

const CommentSection = ({ comments }) => {
  const [newComment, setNewComment] = useState("");

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <h3 className="text-sm font-medium">Comments ({comments.length})</h3>
      {comments.length === 0 ? (
        <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="space-y-2">
          {comments.map((c, idx) => (
            <li key={idx} className="text-sm text-gray-700">{c}</li>
          ))}
        </ul>
      )}

      <div>
        <textarea
          className="w-full border rounded-md p-2 text-sm"
          rows={2}
          placeholder="Share your thoughts or information..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="mt-2 px-4 py-2 bg-purple-500 text-white text-sm rounded-md hover:bg-purple-600">
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
