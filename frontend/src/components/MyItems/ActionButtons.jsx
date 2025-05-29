import React from 'react';
import { Package } from 'lucide-react';

const ActionButtons = () => (
  <div className="mt-8 flex gap-4 justify-center">
    <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-2xl rounded-2xl text-lg font-bold transition-all duration-300 hover:shadow-3xl hover:transform hover:scale-105">
      <Package className="h-5 w-5 mr-3" />Report Lost Item
    </button>
    <button className="inline-flex items-center px-8 py-4 bg-white hover:bg-blue-50 text-blue-600 border-2 border-blue-600 hover:border-blue-700 shadow-2xl rounded-2xl text-lg font-bold transition-all duration-300 hover:shadow-3xl hover:transform hover:scale-105">
      <Package className="h-5 w-5 mr-3" />Report Found Item
    </button>
  </div>
);

export default ActionButtons;
