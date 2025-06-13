import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Layout from "./Layout";

// Layouts
import { AdminLayout, UserLayout } from "./components/Admin/Layout";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Public Pages
import UserDashboard from "./pages/users/UserDashboard";
import Homepage from "./pages/homepage";
import ReportItemPage from "./pages/items/Reportitem";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import AccountSettings from "./pages/profile";
import AllItems from "./pages/users/AllItems";
import ItemDetailPage from "./pages/ItemDetailPage";
import LostAndFoundPageWrapper from "./pages/LostAndFoundPageWrapper";
import MyItemsPage from "./pages/myitems";
import OtpVerification from "./pages/auth/OtpVerification";
import ClaimsPage from "./pages/users/Claims";

// Admin Pages
import AdminDashboard from "./pages/admin/dashboard";
import Items from "./pages/admin/Items";
import Claims from "./pages/admin/Claims";
import Users from "./pages/admin/Users";
import { Home } from "lucide-react";

import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<OtpVerification />} />

      <Route path="/user" element={<UserLayout />}>
        <Route
          index
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="allitems"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <AllItems />
            </ProtectedRoute>
          }
        />
        <Route
          path="report-item"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <ReportItemPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="myitems"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <MyItemsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="claims"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <ClaimsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="accountsettings"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <AccountSettings />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin-only routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route
          index
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="items"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Items />
            </ProtectedRoute>
          }
        />
        <Route
          path="claims"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Claims />
            </ProtectedRoute>
          }
        />
        <Route
          path="users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Users />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
