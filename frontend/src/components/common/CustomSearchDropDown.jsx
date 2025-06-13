import React, { useState } from "react";

const CustomSearchDropdown = ({ id, label, options = [], selected, onSelect }) => {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);

  const selectedOption = options.find((opt) => opt?.value === selected);
  const displayValue = query || selectedOption?.label || "";

  const filtered = options.filter(
    (opt) => opt?.label?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <input
        id={id}
        type="text"
        value={displayValue}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShow(true)}
        onBlur={() => setTimeout(() => setShow(false), 150)}
        placeholder={label}
        className="w-full rounded-lg px-4 focus:border-gray-400 focus:outline-none border border-gray-300 py-3"
      />
      {show && (
        <ul className="absolute w-full z-10 bg-white border border-gray-300 mt-1 rounded-lg max-h-60 overflow-auto">
          {filtered.length > 0 ? (
            filtered.map((opt, i) => (
              <li
                key={i}
                onMouseDown={() => {
                  onSelect(opt.value);       // store _id
                  setQuery(opt.label);       // display label
                  setShow(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {opt.label}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomSearchDropdown;
