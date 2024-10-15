'use client';

import withAdminAuth from '@/components/hoc/withAdminAuth';
import AdminLayout from '@/components/layouts/AdminLayouts';
import useEntityActions from '@/hooks/base/useEntityActions';
import { IBooking } from '@/interfaces/domain/IBooking';
import BookingService from '@/services/BookingService';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

const DeleteBookingPage = (params: { params: { id?: string } }) => {
  const router = useRouter();
  const id = params.params.id;
  const { fetchEntityById, deleteEntity, loading, error } =
    useEntityActions<IBooking>(BookingService);
  const [booking, setBooking] = useState<IBooking | null>(null);

  const fetchBooking = async () => {
    const bookingData = await fetchEntityById(id as string);
    setBooking(bookingData);
  };

  useEffect(() => {
    if (id) {
      fetchBooking();
    }
  }, [id]);

  const onSubmit = async (entityId: string) => {
    console.log('onSubmit', entityId);
    try {
      await deleteEntity(entityId);
      toast.success('Booking deleted successfully!');
      router.push('/admin/bookings');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <AdminLayout>
      <h1>Delete</h1>

      <h3>Are you sure you want to delete this?</h3>

      <h4>Booking</h4>
      <hr />
      {loading && <p>Loading booking...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {booking && (
        <>
          <dl className="row">
            <dt className="col-sm-2">Room number</dt>
            <dd className="col-sm-10">{booking.roomNumber}</dd>
            <dt className="col-sm-2">First name</dt>
            <dd className="col-sm-10">{booking.questFirstName}</dd>
            <dt className="col-sm-2">Last name</dt>
            <dd className="col-sm-10">{booking.questLastName}</dd>
            <dt className="col-sm-2">Check-in date</dt>
            <dd className="col-sm-10">{formatDate(booking.startDate)}</dd>
            <dt className="col-sm-2">Check-out date</dt>
            <dd className="col-sm-10">{formatDate(booking.endDate)}</dd>
            <dt className="col-sm-2">Is cancelled</dt>
            <dd className="col-sm-10">
              <input
                className="check-box"
                disabled={true}
                type="checkbox"
                checked={booking.isCancelled}
              />
            </dd>
          </dl>

          <div className="d-flex align-items-center">
            <button
              type="button"
              onClick={() => booking.id && onSubmit(booking.id)}
              className="btn btn-danger me-4">
              Delete
            </button>
            <div className="me-4">|</div>
            <Link href="/admin/bookings">Back to List</Link>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default withAdminAuth(DeleteBookingPage);
