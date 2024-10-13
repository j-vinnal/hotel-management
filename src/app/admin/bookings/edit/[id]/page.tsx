'use client';

import FormInput from '@/components/FormInput';
import withAdminAuth from '@/components/hoc/withAdminAuth';
import AdminLayout from '@/components/layouts/AdminLayouts';
import useEntityActions from '@/hooks/base/useEntityActions';
import { bookingSchema, IBooking } from '@/interfaces/domain/IBooking';
import { IClient } from '@/interfaces/domain/IClient';
import { IRoom } from '@/interfaces/domain/IRoom';
import BookingService from '@/services/BookingService';
import ClientService from '@/services/ClientService';
import RoomService from '@/services/RoomService';
import { UserContext } from '@/states/contexts/UserContext';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const EditBookingPage = (params: { params: { id?: string } }) => {
  const router = useRouter();
  const { user } = useContext(UserContext)!;
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
    setError,
    setValue,
  } = useForm<IBooking>({
    defaultValues: {
      startDate: booking?.startDate,
      endDate: booking?.endDate,
      roomId: booking?.roomId,
      questId: booking?.questId,
      isCancelled: booking?.isCancelled,
    },
    resolver: zodResolver(bookingSchema),
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
  }, [id, user]);

  const onSubmit = async (data: IBooking) => {
    console.log('onSubmit', data);
    try {
      await editEntity(id as string, data);
      router.push('/admin/bookings');
    } catch (error) {
      toast.error((error as Error).message);
      setError('root', { type: 'server', message: (error as Error).message });
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
        {errors.root && (
          <span className="text-danger">{errors.root.message}</span>
        )}
        <div className="col-md-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              id="roomId"
              label="Room"
              type="select"
              register={register('roomId')}
              error={errors.roomId}
              options={rooms
                .filter((room) => room.id !== undefined)
                .map((room) => ({
                  value: room.id as string,
                  label: `${room.roomName} - ${room.roomNumber}`,
                }))}
              styleType="form-group"
            />

            <FormInput
              id="questId"
              label="Client"
              type="select"
              register={register('questId')}
              error={errors.questId}
              options={clients
                .filter((client) => client.id !== undefined)
                .map((client) => ({
                  value: client.id as string,
                  label: `${client.firstName} ${client.lastName}`,
                }))}
              styleType="form-group"
            />

            <FormInput
              id="startDate"
              label="Check-in date"
              type="date"
              register={register('startDate')}
              error={errors.startDate}
              selectedDate={new Date(booking.startDate)}
              onDateChange={(date) => {
                setValue('startDate', date!);
                setBooking((prev) => ({
                  ...prev!,
                  startDate: date!,
                }));
              }}
              styleType="form-group"
            />

            <FormInput
              id="endDate"
              label="Check-out date"
              type="date"
              register={register('endDate')}
              error={errors.endDate}
              selectedDate={new Date(booking.endDate)}
              onDateChange={(date) => {
                setValue('endDate', date!);
                setBooking((prev) => ({
                  ...prev!,
                  endDate: date!,
                }));
              }}
              styleType="form-group"
            />

            <FormInput
              id="isCancelled"
              label="Cancelled"
              type="checkbox"
              register={register('isCancelled')}
              error={errors.isCancelled}
              checked={booking.isCancelled}
              onCheckedChange={(checked) => {
                setValue('isCancelled', checked);
                setBooking((prev) => ({
                  ...prev!,
                  isCancelled: checked,
                }));
              }}
              styleType="form-group"
            />

            <div className="form-group mb-3">
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

export default withAdminAuth(EditBookingPage);
