import {createContext, ReactNode, useContext, useState} from 'react';

interface HotelContextType {
  hotelName: string;
  setHotelName: (name: string) => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

/**
 * HotelProvider component that provides hotel-related context to its children.
 *
 * @param {object} props - The properties object.
 * @param {ReactNode} props.children - The child components to be rendered within the context provider.
 * @returns {JSX.Element} The context-wrapped component tree.
 */
export const HotelProvider = ({children}: {children: ReactNode}) => {
  const [hotelName, setHotelName] = useState('');

  //TODO: Fetch hotel name from API

  return (
    <HotelContext.Provider value={{hotelName, setHotelName}}>
      {children}
    </HotelContext.Provider>
  );
};
/**
 * Custom hook to use the HotelContext.
 *
 * @returns {HotelContextType} The hotel context value.
 * @throws Will throw an error if used outside of a HotelProvider.
 */
export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
