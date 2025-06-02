import React, { useState } from "react";

const initialUsers = [
  {
    id: 1,
    name: "Ahmed Raza",
    email: "ahmed.raza@example.com",
    joinDate: "March 10, 2023",
  },
  {
    id: 2,
    name: "Sara Khan",
    email: "sara.khan@example.com",
    joinDate: "April 5, 2023",
  },
  {
    id: 3,
    name: "Zain Ali",
    email: "zain.ali@example.com",
    joinDate: "May 12, 2023",
  },
];

const UsersTable = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      // Optional API call:
      // fetch(`/api/users/${id}`, { method: "DELETE" });
    }
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto bg-white shadow rounded-lg border border-blue-100">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr className="bg-blue-50 text-blue-800 font-semibold">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Join Date</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold">{user.id}</td>
                  <td className="px-6 py-4 font-semibold">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.joinDate}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-white text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
