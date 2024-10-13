import { useCallback, useState } from 'react';
import RoomService from '@/services/RoomService';
import { IRoom } from '@/interfaces/domain/IRoom';
import { IRoomAvailabilityRequest } from '@/interfaces/IRoomAvailabilityRequest';
import { handleResponseErrors } from '@/utils/handleResponseErrors';

const useFetchRooms = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(
    async (availabilityRequest?: IRoomAvailabilityRequest) => {
      if (availabilityRequest?.endDate && availabilityRequest?.startDate) {
        const start = new Date(availabilityRequest.startDate);
        const end = new Date(availabilityRequest.endDate);
        if (end < start) {
          console.log("End date cannot be earlier than start date");
          return;
        }
      }

      setLoading(true);
      setError(null);
      const service = new RoomService(null);
      try {
        const response = await service.getAvailableRooms(
          availabilityRequest || {}
        );
        handleResponseErrors(response);
        setRooms(response.data || []);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { rooms, loading, error, fetchRooms };
};

export default useFetchRooms;