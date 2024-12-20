'use client';

import withAdminAuth from '@/components/hoc/withAdminAuth';
import AdminLayout from '@/components/layouts/AdminLayouts';
import useEntityActions from '@/hooks/base/useEntityActions';
import {IBooking} from '@/interfaces/domain/IBooking';
import BookingService from '@/services/BookingService';
import {formatDate} from '@/utils/formatDate';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const DetailsBookingPage = (params: {params: {id?: string}}) => {
  const id = params.params.id;
  const {fetchEntityById, loading, error} =
    useEntityActions<IBooking>(BookingService);
  const [booking, setBooking] = useState<IBooking | null>(null);

  /**
   * Fetches the booking data by ID and sets it in the state.
   *
   * @param id - The ID of the booking to fetch.
   */
  const fetchBooking = async () => {
    const bookingData = await fetchEntityById(id as string);
    setBooking(bookingData);
  };

  useEffect(() => {
    if (id) {
      fetchBooking();
    }
  }, [id]);

  return (
    <AdminLayout>
      <h1>Details</h1>

      <h4>Booking</h4>
      <hr />
      {loading && <p>Loading booking...</p>}
      {error && <p className='text-danger'>Error: {error}</p>}
      {booking && (
        <dl className='row'>
          <dt className='col-sm-2'>Room number</dt>
          <dd className='col-sm-10'>{booking.roomNumber}</dd>
          <dt className='col-sm-2'>First name</dt>
          <dd className='col-sm-10'>{booking.questFirstName}</dd>
          <dt className='col-sm-2'>Last name</dt>
          <dd className='col-sm-10'>{booking.questLastName}</dd>
          <dt className='col-sm-2'>Check-in date</dt>
          <dd className='col-sm-10'>
            {formatDate(booking.startDate, 'dd-MM-yyyy HH:mm')}
          </dd>
          <dt className='col-sm-2'>Check-out date</dt>
          <dd className='col-sm-10'>
            {formatDate(booking.endDate, 'dd-MM-yyyy HH:mm')}
          </dd>
          <dt className='col-sm-2'>Guest count</dt>
          <dd className='col-sm-10'>{booking.guestCount}</dd>
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
      )}

      <div>
        <Link href='/admin/bookings'>Back to List</Link>
      </div>
    </AdminLayout>
  );
};

export default withAdminAuth(DetailsBookingPage);
