'use client';

import withAuth from '@/components/hoc/withAuth';
import MainLayout from '@/components/layouts/MainLayout';
import {IBooking} from '@/interfaces/domain/IBooking';
import BookingService from '@/services/BookingService';
import {useContext, useEffect, useState} from 'react';
import {JWTContext} from '@/states/contexts/JWTContext';
import {CancellationDaysLimit} from '@/utils/BusinessConstants';
import {formatDate} from '@/utils/formatDate';
import {handleResponseErrors} from '@/utils/handleResponseErrors';
import Link from 'next/link';
import {toast} from 'react-toastify';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const {jwtResponse, setJwtResponse} = useContext(JWTContext)!;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Determines if a booking can be cancelled based on its start date and time.
   *
   * A booking can be cancelled if its start date is at least
   * `CancellationDaysLimit` days from the current date.
   *
   * @param booking - The booking object containing the start date.
   * @returns Returns true if the booking can be cancelled, false otherwise.
   */
  const bookingCanBeCancelled = (booking: IBooking): boolean => {
    const startDateTime = new Date(booking.startDate);
    const currentDateTime = new Date();
    const threeDaysLimitDateTime = new Date(currentDateTime);
    threeDaysLimitDateTime.setDate(
      currentDateTime.getDate() + CancellationDaysLimit
    );

    return startDateTime >= threeDaysLimitDateTime;
  };

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      if (jwtResponse) {
        try {
          const bookingService = new BookingService(setJwtResponse);
          const response = await bookingService.getBookings(jwtResponse, false);
          handleResponseErrors(response);
          if (response.data) {
            setBookings(response.data);
          }
        } catch (error) {
          toast.error((error as Error).message);
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBookings();
  }, [jwtResponse]);

  return (
    <MainLayout>
      <h2>My bookings</h2>
      {error && <div className='alert alert-danger'>{error}</div>}
      {loading && <p>Loading...</p>}
      {bookings.length === 0 && !loading && <p>No bookings found</p>}
      {bookings.length > 0 && (
        <div className='pt-4'>
          <table className='table'>
            <thead>
              <tr>
                <th>Room Number</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Guest Count</th>
                <th>Is Cancelled</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => {
                return (
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
                      <Link href={`account/booking/details/${booking.id}`}>
                        Details
                      </Link>
                      {bookingCanBeCancelled(booking) &&
                        !booking.isCancelled && (
                          <>
                            {' '}
                            |{' '}
                            <Link href={`account/booking/cancel/${booking.id}`}>
                              Cancel booking
                            </Link>
                          </>
                        )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </MainLayout>
  );
};

export default withAuth(MyBookingsPage);
