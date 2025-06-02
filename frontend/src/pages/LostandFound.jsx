import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import ItemCard from '../components/searchitem/ItemCard';
import lostAndFoundItems from '../data/lostfoundData';

const LostAndFoundPage = () => {
  const { type } = useParams(); // 'Lost' or 'Found'

  const validTypes = ['Lost', 'Found'];
  if (!validTypes.includes(type)) {
    return <div className="p-6 text-red-600 text-lg">Invalid item type.</div>;
  }

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const locations = ['Library', 'Cafeteria', 'Academic Buildings'];

  const filteredItems = lostAndFoundItems.filter(item => {
    if (item.status !== type) return false;
    if (selectedLocation && item.location !== selectedLocation) return false;
    return true;
  });

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-6 gap-6 ">
      {/* Sidebar toggle button for small screens */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          bg-white shadow-md rounded-xl p-4
          w-full md:w-40
          ${sidebarOpen ? 'block' : 'hidden'}
          md:block
        `}
      >
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="text-sm space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Location</h4>
            <ul className="space-y-1">
              {locations.map((loc) => (
                <li
                  key={loc}
                  className={`cursor-pointer px-2 py-1 rounded ${
                    selectedLocation === loc ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'
                  }`}
                  onClick={() => setSelectedLocation(selectedLocation === loc ? null : loc)}
                >
                  {loc}
                </li>
              ))}
              {selectedLocation && (
                <li
                  className="cursor-pointer mt-2 text-sm text-red-600 hover:underline"
                  onClick={() => setSelectedLocation(null)}
                >
                  Clear Location Filter
                </li>
              )}
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{type} Items</h2>
          <Link to="/reportitem">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Report {type} Item
            </button>
          </Link>
        </div>

        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No items found matching filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default LostAndFoundPage;
