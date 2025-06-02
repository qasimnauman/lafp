import React from 'react';
import ItemCard from './ItemCard';
import { Search } from 'lucide-react';

const ContentSection = ({ activeTab, filteredItems, onWithdraw }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20">
    <div className="px-8 py-6 border-b border-gray-100/50">
      <h2 className="text-2xl font-bold text-gray-900">
        {activeTab}
        <span className="text-sm text-gray-500 ml-3 font-normal">
          {activeTab === 'Lost Items' ? 'Items you\'ve reported as lost' :
           activeTab === 'Found Items' ? 'Items you\'ve reported as found' : 'Items you\'ve claimed'}
        </span>
      </h2>
    </div>
    <div className="p-2">
      {filteredItems.length === 0 ? (
        <div className="px-8 py-16 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500 text-lg">You haven’t reported any {activeTab.toLowerCase()} yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} activeTab={activeTab} onWithdraw={onWithdraw} />
          ))}
        </div>
      )}
    </div>
  </div>
);

export default ContentSection;
