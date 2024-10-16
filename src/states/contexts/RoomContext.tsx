'use client';

import React, {createContext, useContext} from 'react';
import useFetchRooms from '@/hooks/useFetchRooms';
import {IRoomAvailabilityRequest} from '@/interfaces/IRoomAvailabilityRequest';
import {IRoom} from '@/interfaces/domain/IRoom';

interface RoomContextType {
  rooms: IRoom[];
  loading: boolean;
  error: string | null;
  fetchRooms: (availabilityRequest?: IRoomAvailabilityRequest) => Promise<void>;
}

export const RoomContext = createContext<RoomContextType | undefined>(
  undefined
);

/**
 * RoomProvider component that provides room-related context to its children.
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the context provider.
 * @returns {JSX.Element} The context-wrapped component tree.
 */
export default function RoomProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {rooms, loading, error, fetchRooms} = useFetchRooms();

  return (
    <RoomContext.Provider value={{rooms, loading, error, fetchRooms}}>
      {children}
    </RoomContext.Provider>
  );
}

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
};
