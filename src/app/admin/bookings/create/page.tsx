'use client';

import FormInput from '@/components/FormInput';
import withAdminAuth from '@/components/hoc/withAdminAuth';
import AdminLayout from '@/components/layouts/AdminLayouts';
import useEntityActions from '@/hooks/base/useEntityActions';
import {bookingSchema, IBooking} from '@/interfaces/domain/IBooking';
import {IClient} from '@/interfaces/domain/IClient';
import {IRoomAvailabilityRequest} from '@/interfaces/IRoomAvailabilityRequest';
import BookingService from '@/services/BookingService';
import ClientService from '@/services/ClientService';
import {RoomContext} from '@/states/contexts/RoomContext';
import {zodResolver} from '@hookform/resolvers/zod';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useContext, useEffect, useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';

const CreateBookingPage = () => {
  const router = useRouter();
  const {addEntity} = useEntityActions<IBooking>(BookingService);
  const {rooms, fetchRooms} = useContext(RoomContext)!;
  const {entities: clients, refetch: fetchClients} =
    useEntityActions<IClient>(ClientService);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    setError,
    setValue,
  } = useForm<IBooking>({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      roomId: '',
      questId: '',
      isCancelled: false,
    },
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    const availabilityRequest: IRoomAvailabilityRequest = {
      startDate,
      endDate,
    };

    fetchRooms(availabilityRequest);
  }, [startDate, endDate, fetchRooms]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  /**
   * Handles the submission of the booking form.
   *
   * @param data - The booking data to be submitted.
   * @returns A promise that resolves when the booking is successfully created.
   */
  const onSubmit = async (data: IBooking) => {
    try {
      await addEntity(data);
      toast.success('Booking created successfully!');
      router.push('/admin/bookings');
    } catch (error) {
      toast.error((error as Error).message);
      setError('root', {type: 'server', message: (error as Error).message});
    }
  };

  return (
    <AdminLayout>
      <h1>Create</h1>
      <h4>Booking</h4>
      <hr />
      <div className='row'>
        {errors.root && (
          <span className='text-danger'>{errors.root.message}</span>
        )}
        <div className='col-md-4'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              id='roomId'
              label='Room'
              type='select'
              register={register('roomId')}
              error={errors.roomId}
              options={[
                {value: '', label: 'Select a room'},
                ...rooms
                  .filter(room => room.id !== undefined)
                  .map(room => ({
                    value: room.id as string,
                    label: `${room.roomName} - ${room.roomNumber}`,
                  })),
              ]}
              styleType='form-group'
            />

            <FormInput
              id='questId'
              label='Client'
              type='select'
              register={register('questId')}
              error={errors.questId}
              options={[
                {value: '', label: 'Select a client'},
                ...clients
                  .filter(client => client.id !== undefined)
                  .map(client => ({
                    value: client.id as string,
                    label: `${client.firstName} ${client.lastName}`,
                  })),
              ]}
              styleType='form-group'
            />

            <FormInput
              id='startDate'
              label='Check-in date'
              type='date'
              register={register('startDate')}
              selectedDate={startDate}
              error={errors.startDate}
              onDateChange={date => {
                setValue('startDate', date!);
                setStartDate(date!);
              }}
              styleType='form-group'
            />

            <FormInput
              id='endDate'
              label='Check-out date'
              type='date'
              register={register('endDate')}
              minDate={startDate}
              selectedDate={endDate}
              error={errors.endDate}
              onDateChange={date => {
                setValue('endDate', date!);
                setEndDate(date!);
              }}
              styleType='form-group'
            />

            <FormInput
              id='isCancelled'
              label='Cancelled'
              type='checkbox'
              register={register('isCancelled')}
              error={errors.isCancelled}
              onCheckedChange={checked => {
                setValue('isCancelled', checked);
              }}
              styleType='form-group'
            />

            <div className='form-group mb-3'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={isSubmitting}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <Link href='/admin/bookings'>Back to List</Link>
      </div>
    </AdminLayout>
  );
};

export default withAdminAuth(CreateBookingPage);
