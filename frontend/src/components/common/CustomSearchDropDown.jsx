import React, { useState } from "react";

const CustomSearchDropdown = ({ id, label, options, selected, onSelect }) => {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <input
        id={id}
        type="text"
        value={query || selected}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShow(true)}
        onBlur={() => setTimeout(() => setShow(false), 150)}
        placeholder={label}
        className="w-full rounded-lg px-4 focus:border-gray-400 border border-gray-300 py-3"
      />
      {show && (
        <ul className="absolute w-full z-10 bg-white focus:border-gray-400 border border-gray-300 mt-1 rounded-lg max-h-60 overflow-auto">
          {filtered.map((opt, i) => (
            <li
              key={i}
              onMouseDown={() => {
                onSelect(opt);
                setQuery(opt);
                setShow(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CustomSearchDropdown;
