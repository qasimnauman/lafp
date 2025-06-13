import React from "react";

const UserProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  const {
    avatar,
    fullName,
    username,
    email,
    contact = "Not Provided",
    department = "N/A",
    semester = "N/A",
    studentId = "N/A",
    role = "User",
    createdAt,
  } = user;

  const joinedDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "Unknown";

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg p-6 relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={avatar || "https://i.pravatar.cc/150?u=default"}
            alt={fullName}
            className="w-16 h-16 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{fullName}</h2>
            <p className="text-sm text-gray-500">@{username}</p>
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Contact:</strong> {contact}
          </p>
          <p>
            <strong>Department:</strong> {department}
          </p>
          <p>
            <strong>Semester:</strong> {semester}
          </p>
          <p>
            <strong>Student ID:</strong> {studentId}
          </p>
          <p>
            <strong>Role:</strong> {role}
          </p>
          <p>
            <strong>Joined:</strong> {joinedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
