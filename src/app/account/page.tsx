'use client';

import withAuth from '@/components/hoc/withAuth';
import MainLayout from '@/components/layouts/MainLayout';
import { IBooking } from '@/interfaces/domain/IBooking';
import BookingService from '@/services/BookingService';
import { useContext, useEffect, useState } from 'react';

import { JWTContext } from '@/states/contexts/JWTContext';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';
import { CancellationDaysLimit } from '@/utils/BookingConstants';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const { jwtResponse, setJwtResponse } = useContext(JWTContext)!;

  useEffect(() => {
    const fetchBookings = async () => {
      if (jwtResponse) {
        const bookingService = new BookingService(setJwtResponse);
        const result = await bookingService.getBookings(jwtResponse, false);
        if (result.data) {
          setBookings(result.data);
        }
      }
    };

    fetchBookings();
  }, [jwtResponse]);

  return (
    <MainLayout>
      <h2>My bookings</h2>
      <div className="pt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Room Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Is Cancelled</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const startDate = new Date(booking.startDate);
              const currentDate = new Date();
              const threeDaysLimit = new Date();
              threeDaysLimit.setDate(currentDate.getDate() + CancellationDaysLimit);

              return (
                <tr key={booking.id}>
                  <td>{booking.roomNumber}</td>
                  <td>{booking.questFirstName}</td>
                  <td>{booking.questLastName}</td>
                  <td>{formatDate(booking.startDate)}</td>
                  <td>{formatDate(booking.endDate)}</td>
                  <td>
                    <input
                      className="check-box"
                      disabled
                      checked={booking.isCancelled}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <Link href={`account/booking/details/${booking.id}`}>Details</Link>
                    {startDate > threeDaysLimit && !booking.isCancelled && (
                      <>
                        {' '}|{' '}
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
    </MainLayout>
  );
};

export default withAuth(MyBookingsPage);
