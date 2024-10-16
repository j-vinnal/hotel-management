'use client';

import {createContext, useContext, useEffect, useState} from 'react';

interface SearchContextType {
  guestCount: number;
  setGuestCount: (guests: number) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

/**
 * RoomProvider component that provides room-related context to its children.
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the context provider.
 * @returns {JSX.Element} The context-wrapped component tree.
 */
export default function SearchProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [guestCount, setGuestCount] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  /**
   * This useEffect checks if the start date is after the end date and sets the end date to the start date if it is.
   * This is to ensure that the start date is always before the end date.
   */
  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      setEndDate(startDate);
    }
  }, [startDate, endDate]);

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

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
