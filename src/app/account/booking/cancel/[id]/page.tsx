'use client';

import withAuth from '@/components/hoc/withAuth';
import MainLayout from '@/components/layouts/MainLayout';
import useEntityActions from '@/hooks/base/useEntityActions';
import {IBooking} from '@/interfaces/domain/IBooking';
import BookingService from '@/services/BookingService';
import {JWTContext} from '@/states/contexts/JWTContext';
import {formatDate} from '@/utils/formatDate';
import {handleResponseErrors} from '@/utils/handleResponseErrors';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useContext, useEffect, useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {toast} from 'react-toastify';

/**
 * Fetches the booking data by ID and sets it in the state.
 *
 * @param id - The ID of the booking to fetch.
 */
const CancelBookingPage = (params: {params: {id?: string}}) => {
  const router = useRouter();
  const id = params.params.id;
  const {fetchEntityById, loading, error} =
    useEntityActions<IBooking>(BookingService);
  const {jwtResponse, setJwtResponse} = useContext(JWTContext)!;

  const [booking, setBooking] = useState<IBooking | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const bookingData = await fetchEntityById(id as string);
      setBooking(bookingData);
    };

    if (id) {
      fetchBooking();
    }
  }, [id]);

  /**
   * Submits a request to cancel the booking.
   *
   * @param entityId - The ID of the booking to cancel.
   */
  const onSubmit = async (entityId: string) => {
    const bookingService = new BookingService(setJwtResponse);

    if (jwtResponse) {
      try {
        const response = await bookingService.cancelBooking(
          entityId,
          jwtResponse
        );
        handleResponseErrors(response);
        toast.success('Booking cancelled successfully!');
        router.push('/account');
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  };

  return (
    <MainLayout>
      <h1>Cancel booking</h1>

      <h3>Are you sure you want to cancel this?</h3>

      <h4>Booking</h4>
      <hr />
      {loading && <p>Loading booking...</p>}
      {error && <p className='text-danger'>Error: {error}</p>}
      {booking && (
        <>
          <dl className='row'>
            <dt className='col-sm-2'>Room number</dt>
            <dd className='col-sm-10'>{booking.roomNumber}</dd>
            <dt className='col-sm-2'>First name</dt>
            <dd className='col-sm-10'>{booking.questFirstName}</dd>
            <dt className='col-sm-2'>Last name</dt>
            <dd className='col-sm-10'>{booking.questLastName}</dd>
            <dt className='col-sm-2'>Check-in date</dt>
            <dd className='col-sm-10'>{formatDate(booking.startDate)}</dd>
            <dt className='col-sm-2'>Check-out date</dt>
            <dd className='col-sm-10'>{formatDate(booking.endDate)}</dd>
            <dt className='col-sm-2'>Is cancelled</dt>
            <dd className='col-sm-10'>
              <input
                className='check-box'
                disabled={true}
                type='checkbox'
                checked={booking.isCancelled}
              />
            </dd>
          </dl>

          <div className='d-flex align-items-center'>
            <button
              type='button'
              onClick={() => booking.id && onSubmit(booking.id)}
              className='btn btn-danger me-4'>
              Cancel booking
            </button>
            <div className='me-4'>|</div>
            <Link href='/account'>Back to List</Link>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default withAuth(CancelBookingPage);
