// context/ItemContext.js
import React, { createContext, useContext, useState } from "react";

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [allItems, setAllItems] = useState([]);

  return (
    <ItemContext.Provider value={{ allItems, setAllItems }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => useContext(ItemContext);
