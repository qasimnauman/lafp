import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SidebarAdmin";
import SidebarUser from "./SidebarUser";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 -ml-6 bg-white rounded-l-3xl p-6 shadow-xl overflow-auto">
        <Outlet /> {/* This renders the nested route's component */}
      </main>
    </div>
  );
};

const UserLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarUser />
      <main className="flex-1 -ml-6 bg-white rounded-l-3xl p-6 shadow-xl overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export { AdminLayout, UserLayout };
