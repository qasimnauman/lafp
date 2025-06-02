import React from 'react';

const Tabs = ({ tabs, activeTab, setActiveTab }) => (
  <div className="mb-6">
    <div className="flex space-x-2 bg-white p-2 rounded-xl border">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.name;

        return (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg ${
              isActive
                ? 'bg-blue-100 text-blue-800 font-semibold'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.name}</span>
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${
                isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

export default Tabs;
