import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 -ml-6 bg-white rounded-l-3xl p-6 shadow-xl overflow-auto">
        <Outlet /> {/* This renders the nested route's component */}
      </main>
    </div>
  );
};

export default Layout;
