import {IRoom} from '@/interfaces/domain/IRoom';
import {IRoomAvailabilityRequest} from '@/interfaces/IRoomAvailabilityRequest';
import RoomService from '@/services/RoomService';
import {handleResponseErrors} from '@/utils/handleResponseErrors';
import {useCallback, useState} from 'react';

/**
 * Custom hook to fetch available rooms based on availability request.
 *
 * @returns {object} An object containing the list of rooms, loading state, error message, and a function to fetch rooms.
 */
const useFetchRooms = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches available rooms based on the provided availability request.
   *
   * @param {IRoomAvailabilityRequest} [availabilityRequest] - The request object containing start and end dates for room availability.
   * @throws Will set an error message if the fetch operation fails.
   */

  const fetchRooms = useCallback(
    async (availabilityRequest?: IRoomAvailabilityRequest) => {
      if (availabilityRequest?.endDate && availabilityRequest?.startDate) {
        const start = new Date(availabilityRequest.startDate);
        const end = new Date(availabilityRequest.endDate);
        if (end < start) {
          console.log('End date cannot be earlier than start date');
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

  return {rooms, loading, error, fetchRooms};
};

export default useFetchRooms;
