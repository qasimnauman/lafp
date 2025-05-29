import React, { useState } from "react";

export default function AccountSettings() {
  const [fullName, setFullName] = useState("Muhammad Awais");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameChanged, setNameChanged] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleNameSave = () => {
    if (nameChanged) {
      console.log("Updated Full Name:", fullName);
      setNameChanged(false);
    }
  };

  const handlePasswordChange = () => {
    setPasswordError("");
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
    } else if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
    } else {
      console.log("Changing password to:", newPassword);
      // Call your API here
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Account Info */}
        <div className="p-6 border border-gray-200 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Account Information</h2>
          <p className="text-sm text-gray-600 mb-6">View your account details.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setNameChanged(true);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleNameSave}
                  disabled={!nameChanged}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    nameChanged
                      ? "bg-purple-500 text-white hover:bg-purple-600"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  Save Name
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Change Password */}
        <div className="p-6 border border-gray-200 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Change Password</h2>
          <p className="text-sm text-gray-600 mb-6">Update your account password.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter new password (min. 6 characters)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Confirm your new password"
              />
            </div>

            {passwordError && (
              <p className="text-sm text-red-500">{passwordError}</p>
            )}

            <button
              onClick={handlePasswordChange}
              className="mt-2 px-6 py-2 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 transition"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
