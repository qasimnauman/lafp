import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomSearchDropdown from "../components/common/CustomSearchDropDown";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AccountSettings() {
  const semesterOptions = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
  ];

  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    department: "",
    semester: "",
    studentId: "",
    contact: "",
    avatar: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/auth/currentuser", {
          withCredentials: true,
        });
        const user = res.data.data;

        setForm({
          username: user.username || "",
          fullName: user.fullName || "",
          email: user.email || "",
          department: user.department || "",
          semester: user.semester || "",
          studentId: user.studentId || "",
          contact: user.contact || "",
          avatar: user.avatar || "https://i.pravatar.cc/150?u=default",
        });
      } catch (err) {
        console.error("Failed to load user data", err);
      }
    };

    fetchUser();
  }, []);

  const handleContactChange = (e) => {
    setForm((prev) => ({ ...prev, contact: e.target.value }));
    setSuccessMessage("");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const imageUrl = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("contact", form.contact);
      formData.append("semester", form.semester);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await axios.put("/api/v1/auth/updateuser", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to update profile");
      }

      setSuccessMessage("Profile updated successfully.");
    } catch (err) {
      console.error("Failed to update profile", err);
      setPasswordError("Failed to update profile.");
    }
  };

  const handlePasswordChange = async () => {
    setPasswordError(""); // Reset error

    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError(
        "New password must be different from the current password."
      );
      return;
    }

    try {
      const response = await axios.put(
        "/api/v1/auth/changepassword",
        {
          oldpassword: currentPassword,
          newpassword: newPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to change password");
      }

      // Handle success
      setSuccessMessage("Password updated successfully!");
      setNewPassword("");
      
      
    } catch (error) {
      setPasswordError(
        error.response?.data?.message || "Failed to update password."
      );
    }
  };

  return (
    <div className="min-h-screen px-4 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full space-y-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Account Settings
          </h2>
          <p className="text-gray-600">Update your profile and password</p>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center space-y-3">
          <img
            src={form.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="text-sm"
          />
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Username", name: "username" },
            { label: "Full Name", name: "fullName" },
            { label: "Email", name: "email" },
            { label: "Department", name: "department" },
            { label: "Student ID", name: "studentId" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={form[field.name]}
                disabled
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Semester
            </label>
            <CustomSearchDropdown
              id="semester"
              label="Select Semester"
              options={semesterOptions}
              selected={form.semester}
              onSelect={(value) =>
                setForm((prev) => ({ ...prev, semester: value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact
            </label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleContactChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
            />
          </div>
          <div className="md:col-span-2 text-right">
            <button
              onClick={handleProfileUpdate}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="space-y-6 border-t pt-8">
          <h3 className="text-xl font-semibold text-gray-800">
            Change Password
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type={showPassword.current ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 pr-10"
              />
              <button
                type="button"
                onClick={() => toggleVisibility("current")}
                className="absolute right-3 top-10 text-gray-500"
              >
                {showPassword.current ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {/* New Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type={showPassword.new ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 pr-10"
              />
              <button
                type="button"
                onClick={() => toggleVisibility("new")}
                className="absolute right-3 top-10 text-gray-500"
              >
                {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type={showPassword.confirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 pr-10"
              />
              <button
                type="button"
                onClick={() => toggleVisibility("confirm")}
                className="absolute right-3 top-10 text-gray-500"
              >
                {showPassword.confirm ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div> */}
          </div>

          {passwordError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="text-red-500 mt-0.5" size={16} />
              <p className="text-red-700 text-sm">{passwordError}</p>
            </div>
          )}

          <div className="text-right">
            <button
              onClick={handlePasswordChange}
              className="px-6 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-700 text-sm">{successMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
