import React, { useState } from "react";
import { Mail, Lock, User, AlertCircle, Eye, EyeOff } from "lucide-react";
import CustomSearchDropdown from "../components/common/CustomSearchDropDown";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const Register = () => {
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

  const departmentOptions = [
    "Computer Science",
    "Information Technology",
    "Software Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Business Administration",
    "Accounting",
    "Economics",
    "Psychology",
    "Biology",
  ];

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    semester: "",
    studentId: "",
    contact: "",
    avatar: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, avatar: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    setLoading(true);

    if (!form.email.endsWith("@students.au.edu.pk")) {
      setError("Please use your @students.au.edu.pk email.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const res = await axios.post("/api/v1/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res.data.success) {
        setError(res.data.message || "Registration failed. Please try again.");
        return;
      }

      const inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);

      Cookies.set("otpToken", res.data.otpToken, {
        secure: true,
        sameSite: "Strict",
        expires: inFiveMinutes,
      });

      const user = res.data.data;
      console.log(user);

      // console.log(res.data.data);

      localStorage.setItem("user", JSON.stringify(res.data.data));

      // console.log("Submitted:", res.data);
      setSuccess("🎉 Registration successful!");

      setTimeout(() => {
        navigate("/verify-otp", {
          state: {
            email: form.email,
            // username: form.username,
          },
        });
      }, 20000);

      // Reset form
      setForm({
        username: "",
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        department: "",
        semester: "",
        studentId: "",
        contact: "",
        avatar: null,
      });
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600">Register with your AU email</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <CustomSearchDropdown
                  id="department"
                  label="Select Department"
                  options={departmentOptions}
                  selected={form.department}
                  onSelect={(value) =>
                    setForm((prev) => ({ ...prev, department: value }))
                  }
                />
              </div>

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
                  Student ID
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={form.studentId}
                  onChange={handleChange}
                  required
                  placeholder="e.g., F202123456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  required
                  placeholder="03xx-xxxxxxx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@students.au.edu.pk"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="avatar"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error & Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle
                className="text-red-500 flex-shrink-0 mt-0.5"
                size={16}
              />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm text-center">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
