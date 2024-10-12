'use client';

import { format } from 'date-fns'; 
import { createContext, useState } from 'react';

interface SearchContextType {
  guestCount: number;
  setGuestCount: (guests: number) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
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
  const [guestCount, setGuestCount] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  return (
    <SearchContext.Provider
      value={{
        guestCount, 
        setGuestCount,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}>
      {children}
    </SearchContext.Provider>
  );
}
