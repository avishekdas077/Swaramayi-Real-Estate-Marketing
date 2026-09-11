import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);

  const toggleCompare = (property) => {
    setCompareItems((prev) => {
      const exists = prev.some((p) => p._id === property._id);
      if (exists) {
        return prev.filter((p) => p._id !== property._id);
      } else {
        if (prev.length >= 4) {
          alert('You can compare up to 4 properties at a time.');
          return prev;
        }
        return [...prev, property];
      }
    });
  };

  const isComparing = (propertyId) => {
    return compareItems.some((p) => p._id === propertyId);
  };

  const clearCompare = () => setCompareItems([]);

  return (
    <CompareContext.Provider value={{ compareItems, toggleCompare, isComparing, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
