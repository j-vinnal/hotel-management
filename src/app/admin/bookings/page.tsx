'use client';

import withAdminAuth from '@/components/hoc/withAdminAuth';
import AdminLayout from '@/components/layouts/AdminLayouts';
import useEntityActions from '@/hooks/base/useEntityActions';
import {IBooking} from '@/interfaces/domain/IBooking';
import BookingService from '@/services/BookingService';
import {formatDate} from '@/utils/formatDate';
import Link from 'next/link';
import {useEffect} from 'react';

const AdminBookingsPage = () => {
  const {
    entities: bookings,
    refetch: fetchEntity,
    loading,
    error,
  } = useEntityActions<IBooking>(BookingService);

  /**
   * Fetches all bookings and updates the state.
   */
  useEffect(() => {
    fetchEntity();
  }, []);

  //useEffect(() => {}, [bookings]);

  return (
    <AdminLayout>
      <h2>Manage bookings</h2>
      {error && <div className='alert alert-danger'>{error}</div>}
      {loading && <p>Loading bookings...</p>}
      {bookings.length === 0 && !loading && (
        <div className='alert alert-warning'>No bookings found</div>
      )}
      {bookings.length > 0 && (
        <div className='pt-4'>
          <p>
            <Link href='/admin/bookings/create'>Create New</Link>
          </p>
          <table className='table'>
            <thead>
              <tr>
                <th>Room number</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Check in</th>
                <th>Check out</th>
                <th>Guest count</th>
                <th>Is cancelled</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.roomNumber}</td>
                  <td>{booking.questFirstName}</td>
                  <td>{booking.questLastName}</td>
                  <td>{formatDate(booking.startDate, 'dd-MM-yyyy HH:mm')}</td>
                  <td>{formatDate(booking.endDate, 'dd-MM-yyyy HH:mm')}</td>
                  <td>{booking.guestCount}</td>
                  <td>
                    <input
                      className='check-box'
                      disabled
                      checked={booking.isCancelled}
                      type='checkbox'
                    />
                  </td>
                  <td>
                    <Link href={`/admin/bookings/edit/${booking.id}`}>
                      Edit
                    </Link>{' '}
                    |{' '}
                    <Link href={`/admin/bookings/details/${booking.id}`}>
                      Details
                    </Link>{' '}
                    |{' '}
                    <Link href={`/admin/bookings/delete/${booking.id}`}>
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default withAdminAuth(AdminBookingsPage);
