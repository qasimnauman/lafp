import React from 'react';

const PageHeader = () => (
  <div className="mb-8 relative">
    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-blue-700 bg-clip-text text-transparent mb-2">
      My Items
    </h1>
    <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 blur-xl"></div>
    <p className="text-gray-600 text-lg">Manage your lost and found items and claims</p>
  </div>
);

export default PageHeader;
