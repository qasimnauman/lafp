import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm }) => (
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
);

export default SearchBar;
