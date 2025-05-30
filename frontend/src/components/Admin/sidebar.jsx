// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Boxes,
  BadgeCheck,
  Users,
  Settings,
  Menu,
  X,
  FileText,
  Activity,
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, to: '/admin' },
   
    { label: 'Items', icon: <Boxes size={18} />, to: '/admin/items' },
    { label: 'Claims', icon: <BadgeCheck size={18} />, to: 'admin/claims' },
    { label: 'Users', icon: <Users size={18} />, to: '/admin/users' },
  ];

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white border"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white text-gray-800 shadow-md flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out z-40
          md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static
        `}
      >
        {/* Top: Logo + Navigation */}
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-600 p-2 rounded-lg">
            </div>
            <div>
              <h1 className="text-lg font-semibold">Lost & Found</h1>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>

          
          <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            Management
          </p>

          
          <nav className="flex flex-col gap-1">
            {menuItems.map(({ label, icon, to }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

       
      </div>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
