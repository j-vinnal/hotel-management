'use client';

import AdminLayout from '@/components/layouts/AdminLayouts';
import useEntityActions from '@/hooks/base/useEntityActions';
import { IBooking } from '@/interfaces/domain/IBooking';
import BookingService from '@/services/BookingService';
import { formatDate } from '@/utils/formatDate';
import { useEffect } from 'react';

const AdminPage = () => {
  const { entities: bookings, refetch: fetchEntity } = useEntityActions<IBooking>(
    BookingService
  );

  useEffect(() => {
    fetchEntity();
  }, []);

  return (
    <AdminLayout>
      <h2>Manage bookings</h2>
      <div className="pt-4">
        <p>
          <a href="/Bookings/Create">Create New</a>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Room number</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Check in</th>
              <th>Check out</th>
              <th>Is cancelled</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
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
                    checked
                    type="checkbox"
                  />
                </td>

                <td>
                  <a href="/Bookings/Edit/bb28d136-5388-4079-bde3-ff55bae623d5">
                    Edit
                  </a>{' '}
                  |
                  <a href="/Bookings/Details/bb28d136-5388-4079-bde3-ff55bae623d5">
                    Details
                  </a>{' '}
                  |
                  <a href="/Bookings/Delete/bb28d136-5388-4079-bde3-ff55bae623d5">
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
