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
import {CheckInTime, CheckOutTime} from '@/utils/BusinessConstants';
import {setDateWithFixedTime} from '@/utils/setDateWithFixedTime';

/**
 * Represents the Edit Booking Page component.
 * This component allows an admin to edit a booking's details.
 *
 * @param {Object} params - The parameters for the component.
 * @param {Object} params.params - The route parameters.
 * @param {string} [params.params.id] - The ID of the booking to edit.
 * @returns {JSX.Element} The rendered Edit Booking Page component.
 */
const EditBookingPage = (params: {params: {id?: string}}) => {
  const router = useRouter();
  const id = params.params.id;
  const {fetchEntityById, editEntity, loading, error} =
    useEntityActions<IBooking>(BookingService);
  const {rooms, fetchRooms} = useContext(RoomContext)!;
  const {entities: clients, refetch: fetchClients} =
    useEntityActions<IClient>(ClientService);
  const [booking, setBooking] = useState<IBooking | null>(null);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
    setError,
    setValue,
  } = useForm<IBooking>({
    defaultValues: {
      startDate: booking?.startDate,
      endDate: booking?.endDate,
      roomId: booking?.roomId,
      questId: booking?.questId,
      guestCount: booking?.guestCount,
      isCancelled: booking?.isCancelled,
    },
    resolver: zodResolver(bookingSchema),
  });

  /**
   * Fetches the booking data by ID and sets it in the state.
   *
   * @param id - The ID of the booking to fetch.
   */
  const fetchBooking = async () => {
    const bookingData = await fetchEntityById(id as string);
    setBooking(bookingData);
    reset(bookingData);
  };

  /**
   * Initializes the booking and client data when the component mounts.
   * Also fetches the initial list of available rooms based on the current booking details.
   *
   * @remarks
   * This effect runs once when the component mounts, fetching the booking and client data.
   * It also prepares the room availability request using the current booking's start and end dates.
   */
  useEffect(() => {
    if (id) {
      fetchBooking();
      fetchClients();

      const availabilityRequest: IRoomAvailabilityRequest = {
        startDate: booking?.startDate,
        endDate: booking?.endDate,
        currentBookingId: booking?.id,
      };
      fetchRooms(availabilityRequest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  /**
   * Updates the list of available rooms whenever the booking's start or end date changes.
   *
   * @remarks
   * This effect listens for changes in the booking's start and end dates.
   * When these dates change, it fetches the updated list of available rooms
   * to reflect the new availability based on the updated booking dates.
   */

  useEffect(() => {
    const fetchAvailability = async () => {
      if (booking) {
        try {
          const availabilityRequest: IRoomAvailabilityRequest = {
            startDate: new Date(booking.startDate),
            endDate: new Date(booking.endDate),
            currentBookingId: booking.id,
          };

          await fetchRooms(availabilityRequest);
        } catch (error) {
          toast.error((error as Error).message);
          setError('root', {type: 'server', message: (error as Error).message});
        }
      }
    };
    fetchAvailability();
  }, [booking, fetchRooms, setError]);

  /**
   * Handles the form submission to edit the booking.
   *
   * @param {IBooking} data - The booking data to submit.
   */
  const onSubmit = async (data: IBooking) => {
    try {
      await editEntity(id as string, data);
      toast.success('Booking updated successfully!');
      router.push('/admin/bookings');
    } catch (error) {
      toast.error((error as Error).message);
      setError('root', {type: 'server', message: (error as Error).message});
    }
  };

  const minEndDate = booking?.startDate
    ? new Date(new Date(booking.startDate).getTime() + 24 * 60 * 60 * 1000)
    : new Date();

  return (
    <AdminLayout>
      <h1>Edit</h1>
      <h4>Booking</h4>
      <hr />
      {loading && <p>Loading booking...</p>}
      {errors.root ? (
        <span className='text-danger'>{errors.root.message}</span>
      ) : (
        error && <p className='text-danger'>Error: {error}</p>
      )}
      {booking && (
        <div className='row'>
          <div className='col-md-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                id='roomId'
                label='Room'
                type='select'
                register={register('roomId')}
                error={errors.roomId}
                options={rooms
                  .filter(room => room.id !== undefined)
                  .map(room => ({
                    value: room.id as string,
                    label: `${room.roomName} - ${room.roomNumber} - (${room.bedCount} beds)`,
                  }))}
                styleType='form-group'
              />

              <FormInput
                id='questId'
                label='Client'
                type='select'
                register={register('questId')}
                error={errors.questId}
                options={clients
                  .filter(client => client.id !== undefined)
                  .map(client => ({
                    value: client.id as string,
                    label: `${client.firstName} ${client.lastName}`,
                  }))}
                styleType='form-group'
              />

              <FormInput
                id='startDate'
                label='Check-in date'
                type='date'
                register={register('startDate')}
                error={errors.startDate}
                selectedDate={new Date(booking.startDate)}
                onDateChange={date => {
                  if (date) {
                    const dateWithTime = setDateWithFixedTime(
                      date,
                      CheckInTime,
                      0
                    );
                    setValue('startDate', dateWithTime);
                    setBooking(prev => ({
                      ...prev!,
                      startDate: dateWithTime,
                    }));
                  }
                }}
                styleType='form-group'
              />

              <FormInput
                id='endDate'
                label='Check-out date'
                type='date'
                register={register('endDate')}
                minDate={minEndDate}
                error={errors.endDate}
                selectedDate={new Date(booking.endDate)}
                onDateChange={date => {
                  if (date) {
                    const dateWithTime = setDateWithFixedTime(
                      date,
                      CheckOutTime,
                      0
                    );
                    setValue('endDate', dateWithTime);
                    setBooking(prev => ({
                      ...prev!,
                      endDate: dateWithTime,
                    }));
                  }
                }}
                styleType='form-group'
              />

              <FormInput
                id='guestCount'
                label='Guest count'
                type='number'
                register={register('guestCount', {valueAsNumber: true})}
                error={errors.guestCount}
                styleType='form-group'
              />

              <FormInput
                id='isCancelled'
                label='Cancelled'
                type='checkbox'
                register={register('isCancelled')}
                error={errors.isCancelled}
                checked={booking.isCancelled}
                onCheckedChange={checked => {
                  setValue('isCancelled', checked);
                  setBooking(prev => ({
                    ...prev!,
                    isCancelled: checked,
                  }));
                }}
                styleType='form-group'
              />

              <div className='form-group mb-3 d-flex align-items-center'>
                <button
                  type='submit'
                  className='btn btn-primary me-4'
                  disabled={isSubmitting}>
                  Save
                </button>
                <div className='me-4'>|</div>
                <Link href='/admin/bookings'>Back to List</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default withAdminAuth(EditBookingPage);
