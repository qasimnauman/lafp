// src/pages/Users.jsx
import React from "react";
import { User } from "lucide-react";
import UsersTable from "../../components/Admin/user/usertable";

const Users = () => (
  <div className="px-5">
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-blue-800">User Management</h1>
        <p className="text-sm text-blue-600 mt-1">Manage system users</p>
      </div>
    </div>
    <UsersTable />
  </div>
);

export default Users;
