import React from 'react';
import { Eye, Edit, Trash2, Calendar, MapPin } from 'lucide-react';

const ItemCard = ({ item, activeTab, onWithdraw }) => (
  <div className="group relative bg-gradient-to-r from-white to-blue-50/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:transform hover:scale-[1.02]">
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
            <div className="mt-1 text-xs font-semibold">{item.status}</div>
          </div>
        </div>
        <p className="text-gray-700 mb-4 text-lg font-medium">{item.description}</p>
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-gray-600 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span className="font-medium">
              {item.daysAgo} days ago ({activeTab === 'Lost Items' ? 'Reported' : activeTab === 'Found Items' ? 'Found' : 'Claimed'})
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span className="font-medium">{item.location}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 ml-4">
        <button className="btn-blue"><Eye className="h-4 w-4 mr-2" />View Details</button>
        {activeTab !== 'My Claims' && (
          <button className="btn-outline"><Edit className="h-4 w-4 mr-2" />Edit</button>
        )}
        {activeTab === 'Lost Items' && (
          <button onClick={() => onWithdraw(item.id)} className="btn-outline text-gray-600">
            <Trash2 className="h-4 w-4 mr-2" />Withdraw
          </button>
        )}
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
  </div>
);

export default ItemCard;
