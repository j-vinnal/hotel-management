'use client';

import { IRoom } from '@/interfaces/domain/IRoom';
import { IRoomAvailabilityRequest } from '@/interfaces/RoomAvailabilityRequest';
import RoomService from '@/services/RoomService';
import { handleResponseErrors } from '@/utils/handleResponseErrors';
import React, { createContext, useCallback, useState } from 'react';

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
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(
    async (availabilityRequest?: IRoomAvailabilityRequest) => {
      setLoading(true);
      const service = new RoomService(null);
      try {
        const response = await service.getAvailableRooms(
          availabilityRequest || {}
        );
        handleResponseErrors(response);
        setRooms(response.data || []);
      } catch (error) {
        setError((error as Error).message);
        throw new Error((error as Error).message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <RoomContext.Provider value={{ rooms, loading, error, fetchRooms }}>
      {children}
    </RoomContext.Provider>
  );
}
