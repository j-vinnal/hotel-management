'use client';

import AdminLayout from '@/components/layouts/AdminLayouts';
import useEntityActions from '@/hooks/base/useEntityActions';
import { bookingSchema, IBooking } from '@/interfaces/domain/IBooking';
import { IClient } from '@/interfaces/domain/IClient';
import { IRoom } from '@/interfaces/domain/IRoom';
import BookingService from '@/services/BookingService';
import ClientService from '@/services/ClientService';
import RoomService from '@/services/RoomService';
import { formatDate } from '@/utils/formatDate';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';


const EditBookingPage = (params: { params: { id?: string } }) => {
  const router = useRouter();
  const id = params.params.id;
  const { fetchEntityById, editEntity } =
    useEntityActions<IBooking>(BookingService);
  const { entities: rooms, refetch: fetchRooms } =
    useEntityActions<IRoom>(RoomService);
  const { entities: clients, refetch: fetchClients } =
    useEntityActions<IClient>(ClientService);
  const [booking, setBooking] = useState<IBooking | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<IBooking>({
    defaultValues: {
      startDate: booking?.startDate,
      endDate: booking?.endDate,
      roomId: booking?.roomId,
      questId: booking?.questId,
      isCancelled: booking?.isCancelled,
    },
   // resolver: zodResolver(bookingSchema),
  });

  const fetchBooking = async () => {
    const bookingData = await fetchEntityById(id as string);
    setBooking(bookingData);
    reset(bookingData);
  };

  useEffect(() => {
    if (id) {
      fetchBooking();
      fetchRooms();
      fetchClients();
    }
  }, [id]);

  const onSubmit = async (data: IBooking) => {
    try {
      await editEntity(id as string, data);
      router.push('/admin/bookings');
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <h1>Edit</h1>
      <h4>Booking</h4>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="control-label" htmlFor="RoomId">
                Room
              </label>
              <select
                {...register('roomId')}
                className="form-control"
                id="RoomId">
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.roomName} - {room.roomNumber}
                  </option>
                ))}
              </select>
              {errors.roomId && <span>This field is required</span>}
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor="Client">
                Client
              </label>
              <select
                {...register('questId')}
                className="form-control"
                id="Client">
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.firstName} {client.lastName}
                  </option>
                ))}
              </select>
              {errors.questId && <span>This field is required</span>}
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor="CheckInDate">
                Check-in date
              </label>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DatePicker
                    value={formatDate(booking.startDate)}
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date)}
                    className="form-control"
                    placeholderText="Check-in date"
                  />
                )}
              />
              {errors.startDate && <span>This field is required</span>}
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor="CheckOutDate">
                Check-out date
              </label>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    value={formatDate(booking.endDate)}
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date)}
                    className="form-control"
                    placeholderText="Check-out date"
                  />
                )}
              />
              {errors.endDate && <span>This field is required</span>}
            </div>

            <div className="form-group form-check">
              <label className="form-check-label">
                <input
                  {...register('isCancelled')}
                  className="form-check-input"
                  type="checkbox"
                />
                Cancelled
              </label>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <Link href="/admin/bookings">Back to List</Link>
      </div>
    </AdminLayout>
  );
};

export default EditBookingPage;
