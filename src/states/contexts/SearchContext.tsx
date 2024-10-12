'use client';

import { format } from 'date-fns'; 
import { createContext, useState } from 'react';

interface SearchContextType {
  guests: number;
  setGuests: (guests: number) => void;
  checkinDate: Date | undefined;
  setCheckinDate: (date: Date | undefined) => void;
  checkoutDate: Date | undefined;
  setCheckoutDate: (date: Date | undefined) => void;
}

export const formatDate = (
  date: Date | undefined,
  dateFormat: string = 'dd-MM-yyyy'
): string => {
  return date ? format(date, dateFormat) : '';
};

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export default function SearchProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [guests, setGuests] = useState<number>(1);
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
}
