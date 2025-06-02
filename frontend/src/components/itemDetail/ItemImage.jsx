const ItemImage = ({ imageUrl }) => (
  <div className="w-full max-w-xs rounded-xl overflow-hidden">
    <img src={imageUrl} alt="Item" className="w-full h-auto object-cover rounded-xl" />
  </div>
);

export default ItemImage;
