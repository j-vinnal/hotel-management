'use client';

import React, { createContext } from 'react';
import useFetchRooms from '@/hooks/useFetchRooms';
import { IRoomAvailabilityRequest } from '@/interfaces/IRoomAvailabilityRequest';
import { IRoom } from '@/interfaces/domain/IRoom';

interface RoomContextType {
  rooms: IRoom[];
  loading: boolean;
  error: string | null;
  fetchRooms: (availabilityRequest?: IRoomAvailabilityRequest) => Promise<void>;
}

export const RoomContext = createContext<RoomContextType | undefined>(
  undefined
);

export default function RoomProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { rooms, loading, error, fetchRooms } = useFetchRooms();

  return (
    <RoomContext.Provider value={{ rooms, loading, error, fetchRooms }}>
      {children}
    </RoomContext.Provider>
  );
}
