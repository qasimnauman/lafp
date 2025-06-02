import React, { useState } from 'react';
import { Package, Clock } from 'lucide-react';
import PageHeader from '../components/MyItems/PageHeader';
import SearchBar from '../components/MyItems/SearchBar';
import Tabs from '../components/MyItems/Tabs';
import ContentSection from '../components/MyItems/ContentSection';
import ActionButtons from '../components/MyItems/ActionButtons';

const MyItemsPage = () => {
  const [activeTab, setActiveTab] = useState('Lost Items');
  const [searchTerm, setSearchTerm] = useState('');

  const [lostItems, setLostItems] = useState([
    { id: 1, name: 'SADAPAYCARD', description: 'TEAL COLOR CARD', daysAgo: 29, location: 'Cafeteria', status: 'Pending' },
    { id: 2, name: 'iPhone 13', description: 'Black iPhone with cracked screen', daysAgo: 15, location: 'Library', status: 'Pending' }
  ]);
  const [foundItems, setFoundItems] = useState([
    { id: 3, name: 'Water Bottle', description: 'Blue stainless steel bottle', daysAgo: 5, location: 'Gym', status: 'Available' },
    { id: 4, name: 'Textbook', description: 'Mathematics for Engineers', daysAgo: 12, location: 'Classroom 101', status: 'Available' }
  ]);
  const [claims, setClaims] = useState([
    { id: 5, name: 'Wallet', description: 'Brown leather wallet', daysAgo: 3, location: 'Parking Lot', status: 'Claimed' }
  ]);

  const tabs = [
    { name: 'Lost Items', count: lostItems.length, icon: Package },
    { name: 'Found Items', count: foundItems.length, icon: Package },
    { name: 'My Claims', count: claims.length, icon: Clock }
  ];

  const getFilteredItems = () => {
    const lowerTerm = searchTerm.toLowerCase();
    const filter = (items) => items.filter(item =>
      item.name.toLowerCase().includes(lowerTerm) ||
      item.description.toLowerCase().includes(lowerTerm)
    );
    return activeTab === 'Lost Items' ? filter(lostItems) :
           activeTab === 'Found Items' ? filter(foundItems) :
           filter(claims);
  };

  const handleWithdraw = (id) => {
    if (activeTab === 'Lost Items') {
      setLostItems(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <ContentSection activeTab={activeTab} filteredItems={getFilteredItems()} onWithdraw={handleWithdraw} />
        <ActionButtons />
      </div>
    </div>
  );
};

export default MyItemsPage;
