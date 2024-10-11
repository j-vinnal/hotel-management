'use client';

import React, { createContext, useContext, useState } from 'react';

interface SearchContextType {
  guests: number;
  setGuests: React.Dispatch<React.SetStateAction<number>>;
  checkinDate: string;
  setCheckinDate: React.Dispatch<React.SetStateAction<string>>;
  checkoutDate: string;
  setCheckoutDate: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [guests, setGuests] = useState(1);
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');

  return (
    <SearchContext.Provider value={{ guests, setGuests, checkinDate, setCheckinDate, checkoutDate, setCheckoutDate }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};