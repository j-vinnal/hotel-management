'use client';

import withAuth from '@/components/hoc/withAuth';
import MainLayout from '@/components/layouts/MainLayout';
import useEntityActions from '@/hooks/base/useEntityActions';
import { IBooking } from '@/interfaces/domain/IBooking';
import { IRoom } from '@/interfaces/domain/IRoom';
import BookingService from '@/services/BookingService';
import RoomService from '@/services/RoomService';
import { JWTContext } from '@/states/contexts/JWTContext';
import { SearchContext } from '@/states/contexts/SearchContext';
import { UserContext } from '@/states/contexts/UserContext';
import { convertToUTC } from '@/utils/convertToUTC';
import { formatDate } from '@/utils/formatDate';
import { handleResponseErrors } from '@/utils/handleResponseErrors';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ConfirmBookingPage = (params: { params: { id?: string } }) => {
  const router = useRouter();
  const roomId = params.params.id;
  const { fetchEntityById } = useEntityActions<IRoom>(RoomService);
  const { addEntity } = useEntityActions<IBooking>(BookingService);
  const { jwtResponse } = useContext(JWTContext)!;
  const { user } = useContext(UserContext)!;
  const { startDate, endDate, guestCount } = useContext(SearchContext)!;

  const [room, setRoom] = useState<IRoom | null>(null);

  const fetchRoom = async () => {
    const roomData = await fetchEntityById(roomId as string);
    setRoom(roomData);
  };

  useEffect(() => {
    if (roomId) {
      fetchRoom();
    }
  }, [roomId]);

  const onConfirm = async () => {
    if (room && startDate && endDate && jwtResponse) {
      const booking: IBooking = {
        roomId: room.id!,
        roomNumber: room.roomNumber,
        questId: user!.id!,
        startDate: convertToUTC(startDate)!,
        endDate: convertToUTC(endDate)!,
        isCancelled: false,
      };

      try {
        const response = await addEntity(booking);
        handleResponseErrors(response);
        toast.success('Booking confirmed successfully!');
        router.push('/account');
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <h1>Confirm Booking</h1>

      <h4>Room Details</h4>
      <hr />
      <dl className="row">
        <dt className="col-sm-2">Check-in date</dt>
        <dd className="col-sm-10">{formatDate(startDate)}</dd>
        <dt className="col-sm-2">Check-out date</dt>
        <dd className="col-sm-10">{formatDate(endDate)}</dd>
        <dt className="col-sm-2">Guest Count</dt>
        <dd className="col-sm-10">{guestCount}</dd>
        <dt className="col-sm-2">Room Name</dt>
        <dd className="col-sm-10">{room.roomName}</dd>
        <dt className="col-sm-2">Room Number</dt>
        <dd className="col-sm-10">{room.roomNumber}</dd>
        <dt className="col-sm-2">Bed Count</dt>
        <dd className="col-sm-10">{room.bedCount}</dd>
        <dt className="col-sm-2">Price</dt>
        <dd className="col-sm-10">{room.price}</dd>
      </dl>

      <div className="d-flex align-items-center">
        <button
          type="button"
          onClick={onConfirm}
          className="btn btn-primary me-4">
          Confirm Booking
        </button>
        <div className="me-4">|</div>
        <Link href="/">Back to search</Link>
      </div>
    </MainLayout>
  );
};

export default withAuth(ConfirmBookingPage);
