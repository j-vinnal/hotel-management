'use client';

import React, { createContext, useContext, useState } from 'react';

interface ISearchContext {
  guests: number;
  setGuests: React.Dispatch<React.SetStateAction<number>>;
  checkinDate?: Date;
  setCheckinDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  checkoutDate?: Date;
  setCheckoutDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const SearchContext = createContext<ISearchContext | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [guests, setGuests] = useState(1);
  const [checkinDate, setCheckinDate] = useState<Date | undefined>(undefined);
  const [checkoutDate, setCheckoutDate] = useState<Date | undefined>(undefined);

  return (
    <SearchContext.Provider
      value={{
        guests,
        setGuests,
        checkinDate,
        setCheckinDate,
        checkoutDate,
        setCheckoutDate,
      }}>
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
