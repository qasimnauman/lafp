import { Search, Eye, Edit, Trash2, Calendar, MapPin, Clock, Package } from 'lucide-react';
import React, { useState } from 'react';

const MyItemsPage = () => {
  const [activeTab, setActiveTab] = useState('Lost Items');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [lostItems, setLostItems] = useState([
    {
      id: 1,
      name: 'SADAPAYCARD',
      description: 'TEAL COLOR CARD',
      daysAgo: 29,
      location: 'Cafeteria',
      status: 'Pending',
      type: 'lost'
    },
    {
      id: 2,
      name: 'iPhone 13',
      description: 'Black iPhone with cracked screen',
      daysAgo: 15,
      location: 'Library',
      status: 'Pending',
      type: 'lost'
    }
  ]);

  const [foundItems, setFoundItems] = useState([
    {
      id: 3,
      name: 'Water Bottle',
      description: 'Blue stainless steel bottle',
      daysAgo: 5,
      location: 'Gym',
      status: 'Available',
      type: 'found'
    },
    {
      id: 4,
      name: 'Textbook',
      description: 'Mathematics for Engineers',
      daysAgo: 12,
      location: 'Classroom 101',
      status: 'Available',
      type: 'found'
    }
  ]);

  const [claims, setClaims] = useState([
    {
      id: 5,
      name: 'Wallet',
      description: 'Brown leather wallet',
      daysAgo: 3,
      location: 'Parking Lot',
      status: 'Claimed',
      claimDate: '2025-05-25',
      type: 'claim'
    }
  ]);

  const tabs = [
    { name: 'Lost Items', count: lostItems.length, icon: Package },
    { name: 'Found Items', count: foundItems.length, icon: Package },
    { name: 'My Claims', count: claims.length, icon: Clock }
  ];

 const getCurrentItems = () => {
  switch (activeTab) {
    case 'Lost Items':
      return lostItems.filter(item => 
        item.name.includes(searchTerm) ||
        item.description.includes(searchTerm)
      );
    case 'Found Items':
      return foundItems.filter(item => 
        item.name.includes(searchTerm) ||
        item.description.includes(searchTerm)
      );
    case 'My Claims':
      return claims.filter(item => 
        item.name.includes(searchTerm) ||
        item.description.includes(searchTerm)
      );
    default:
      return [];
  }
};


  const handleWithdrawReport = (itemId) => {
    if (activeTab === 'Lost Items') {
      setLostItems(lostItems.filter(item => item.id !== itemId));
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-blue-700 bg-clip-text text-transparent mb-2">
              My Items
            </h1>
            <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 blur-xl"></div>
          </div>
          <p className="text-gray-600 text-lg">Manage your lost and found items and claims</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 border-0 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:bg-white transition-all duration-300 text-gray-900"
            placeholder="Search your items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 pointer-events-none"></div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-white/60 backdrop-blur-sm p-2 rounded-2xl shadow-lg">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-medium text-sm rounded-xl transition-all duration-300 ${
                    activeTab === tab.name
                      ? 'bg-white shadow-lg text-gray-900 transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <IconComponent className={`h-4 w-4 ${activeTab === tab.name ? 'text-blue-600' : ''}`} />
                  {tab.name}
                  <span className={`py-1 px-2.5 rounded-full text-xs font-bold ${
                    activeTab === tab.name 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20">
          <div className="px-8 py-6 border-b border-gray-100/50">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeTab}
              {activeTab === 'Lost Items' && (
                <span className="text-sm text-gray-500 ml-3 font-normal">Items you've reported as lost</span>
              )}
              {activeTab === 'Found Items' && (
                <span className="text-sm text-gray-500 ml-3 font-normal">Items you've reported as found</span>
              )}
              {activeTab === 'My Claims' && (
                <span className="text-sm text-gray-500 ml-3 font-normal">Items you've claimed</span>
              )}
            </h2>
          </div>

          <div className="p-2">
            {getCurrentItems().length === 0 ? (
              <div className="px-8 py-16 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-500 text-lg">
                  {searchTerm ? 'Try adjusting your search terms.' : `You haven't reported any ${activeTab.toLowerCase()} yet.`}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {getCurrentItems().map((item) => (
                  <div key={item.id} className="group relative bg-gradient-to-r from-white to-blue-50/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:transform hover:scale-[1.02]">
                    
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {item.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold`}>
                                {item.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 text-lg font-medium">{item.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-6 text-sm">
                          <div className="flex items-center gap-2 text-gray-600 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">
                              {item.daysAgo} days ago {activeTab === 'Lost Items' ? '(Reported)' : activeTab === 'Found Items' ? '(Found)' : '(Claimed)'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{item.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <button className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </button>
                        {activeTab !== 'My Claims' && (
                          <button className="inline-flex items-center px-4 py-2.5 bg-white hover:bg-blue-50 text-blue-600 border border-blue-300 hover:border-blue-400 shadow-lg rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </button>
                        )}
                        {activeTab === 'Lost Items' && (
                          <button 
                            onClick={() => handleWithdrawReport(item.id)}
                            className="inline-flex items-center px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 hover:border-gray-400 shadow-lg rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Withdraw
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-2xl rounded-2xl text-lg font-bold transition-all duration-300 hover:shadow-3xl hover:transform hover:scale-105">
            <Package className="h-5 w-5 mr-3" />
            Report Lost Item
          </button>
          <button className="inline-flex items-center px-8 py-4 bg-white hover:bg-blue-50 text-blue-600 border-2 border-blue-600 hover:border-blue-700 shadow-2xl rounded-2xl text-lg font-bold transition-all duration-300 hover:shadow-3xl hover:transform hover:scale-105">
            <Package className="h-5 w-5 mr-3" />
            Report Found Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyItemsPage;