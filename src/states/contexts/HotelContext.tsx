import { createContext, ReactNode, useContext, useState } from 'react';

interface HotelContextType {
  hotelName: string;
  setHotelName: (name: string) => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider = ({ children }: { children: ReactNode }) => {
  const [hotelName, setHotelName] = useState('');

  //TODO: Fetch hotel name from API

  return (
    <HotelContext.Provider value={{ hotelName, setHotelName }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
