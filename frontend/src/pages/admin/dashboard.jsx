import React from 'react';
import { Package, Search, Bell, HelpCircle } from 'lucide-react';
import StatsCard from '../../components/Admin/Dashboard/card';
import RecentItemsCard from '../../components/Admin/Dashboard/RecentItemsCard';
import CategoryPieChart from '../../components/Admin/Dashboard/CategoryPieChart';

const cardData = [
  {
    title: "Total Items",
    value: 128,
    change: 12,
    changeText: "Across all categories",
    icon: Package,
  },
  {
    title: "Lost Items",
    value: 64,
    change: -5,
    changeText: "Currently reported lost",
    icon: Search,
  },
  {
    title: "Found Items",
    value: 50,
    change: 8,
    changeText: "Items recovered recently",
    icon: Bell,
  },
  {
    title: "Pending Claims",
    value: 14,
    change: 2,
    changeText: "Awaiting verification",
    icon: HelpCircle,
  },
];


const Dashboard = () => {
 return (
    <div className='px-5'>
       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
  <div>
    <h1 className="text-2xl font-bold text-blue-800">Dashboard Overview</h1>
    <p className="text-sm text-blue-600 mt-1">Summary of lost and found items at a glance</p>
  </div>
</div>

    <div className='flex flex-col '>
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardData.map((card, index) => (
        
        <StatsCard
          key={index}
          title={card.title}
          value={card.value}
          change={card.change}
          changeText={card.changeText}
          icon={card.icon}
        />
      ))}
    </div>
    <div className='flex flex-col md:flex-row gap-4 p-4'>
     <CategoryPieChart/>
      <RecentItemsCard/>
    </div>
    
    </div>
    </div>
  );
};


export default Dashboard;
