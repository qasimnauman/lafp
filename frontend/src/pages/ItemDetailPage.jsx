import { useParams } from 'react-router-dom';
import { useState } from 'react';
import lostAndFoundItems from '../data/lostFoundData';
import ItemImage from '../components/itemDetail/ItemImage';
import ItemInfo from '../components/itemDetail/ItemInfo';
import DescriptionCard from '../components/itemDetail/DescriptionCard';
import CommentSection from '../components/itemDetail/CommentSection';

const ItemDetailPage = () => {
  const { id } = useParams();
  const item = lostAndFoundItems.find(i => i.id === id);

  const [claimed, setClaimed] = useState(false);
  const [markedAsFound, setMarkedAsFound] = useState(false);

  if (!item) {
    return <div className="p-6 text-red-600 text-lg">Item not found.</div>;
  }

  const currentUserEmail = 'student@students.au.edu.pk';
  const isSelfReported = item.contact === currentUserEmail;

  const handleClaim = () => {
    setClaimed(true);
    // TODO: Replace this with backend call to update item status or send notification.
  };

  const handleMarkAsFound = () => {
    setMarkedAsFound(true);
    // TODO: Replace with backend update for lost item as found.
  };

  const mockComments = [
    'I think I saw this near the parking lot.',
    'Thanks for posting this, I’ll ask around!',
  ];

  const showClaimButton = item.status === 'Found' && !isSelfReported;
  const showMarkAsFoundButton = item.status === 'Lost' && isSelfReported;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <ItemImage imageUrl={item.imageUrl} />
        </div>

        <div className="flex-1">
          <ItemInfo
            title={item.title}
            location={item.location}
            date={item.date}
            category={item.category}
            status={item.status}
            reporterName={item.reporter}
            contactEmail={item.contact}
          />
        </div>
      </div>

      <DescriptionCard
        description={item.description}
        isSelfReported={isSelfReported}
      />

      {/* Claim or Mark as Found Buttons */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        {showClaimButton && !claimed && (
          <button
            onClick={handleClaim}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Claim This Item
          </button>
        )}

        {showClaimButton && claimed && (
          <p className="text-green-600 text-sm">You have claimed this item! The reporter will be contacted.</p>
        )}

        {showMarkAsFoundButton && !markedAsFound && (
          <button
            onClick={handleMarkAsFound}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Mark as Found
          </button>
        )}

        {showMarkAsFoundButton && markedAsFound && (
          <p className="text-blue-600 text-sm">Item marked as found! Thank you for updating the status.</p>
        )}
      </div>

      <CommentSection comments={mockComments} />
    </div>
  );
};

export default ItemDetailPage;
