const TabButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`py-4 px-6 rounded-xl text-center border-2 transition-all duration-300 font-semibold text-sm relative overflow-hidden group ${
      active
        ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-600 text-white shadow-lg transform scale-105"
        : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:shadow-md hover:transform hover:scale-102"
    }`}
  >
    <span className="relative z-10">{label}</span>
    {!active && (
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    )}
  </button>
);

export default TabButton;
