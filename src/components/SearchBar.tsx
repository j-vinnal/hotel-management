'use client';

import FormInput from '@/components/FormInput';
import {
  IRoomAvailabilityRequest,
  RoomAvailabilityRequestSchema,
} from '@/interfaces/IRoomAvailabilityRequest';
import {RoomContext} from '@/states/contexts/RoomContext';
import {SearchContext} from '@/states/contexts/SearchContext';
import { CheckInTime, CheckOutTime } from '@/utils/BookingConstants';
import { setDateWithFixedTime } from '@/utils/setDateWithFixedTime';
import {zodResolver} from '@hookform/resolvers/zod';
import {usePathname, useRouter} from 'next/navigation';
import {useContext, useEffect} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import {toast} from 'react-toastify';

/**
 * SearchBar component allows users to search for room availability
 * by specifying guest count, check-in, and check-out dates.
 *
 * @returns {JSX.Element} The rendered SearchBar component.
 */
const SearchBar = () => {
  const {
    guestCount,
    setGuestCount,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useContext(SearchContext)!;

  const {fetchRooms} = useContext(RoomContext)!;
  const router = useRouter();
  const pathname = usePathname();


 
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    setError,
    reset
  } = useForm<IRoomAvailabilityRequest>({
    defaultValues: {
      guestCount: guestCount,
      startDate: startDate ? setDateWithFixedTime(startDate, CheckInTime, 0) : undefined,
      endDate: endDate ? setDateWithFixedTime(endDate, CheckOutTime, 0) : undefined,
    },
    resolver: zodResolver(RoomAvailabilityRequestSchema),
  });

  /**
   * Resets form values whenever guestCount, startDate, or endDate changes.
   */
  useEffect(() => {
    reset({
      guestCount: guestCount,
      startDate: startDate ? setDateWithFixedTime(startDate, CheckInTime, 0) : undefined,
      endDate: endDate ? setDateWithFixedTime(endDate, CheckOutTime, 0) : undefined,
    });
  }, [guestCount, startDate, endDate, reset]);

  /**
   * Handles the search form submission to fetch available rooms.
   * Redirects to the homepage if not already there.
   *
   * @param {IRoomAvailabilityRequest} data - The search criteria.
   */
  const handleSubmitSearch = async (data: IRoomAvailabilityRequest) => {
    try {

      await fetchRooms(data);

      if (pathname !== '/') {
        router.push('/');
      }
    } catch (error) {
      toast.error((error as Error).message);
      setError('root', {type: 'server', message: (error as Error).message});
    }
  };

  /**
   * Clears the search criteria and fetches all rooms.
   * Redirects to the homepage if not already there.
   */
  const handleClearSearch = async () => {
    if (pathname !== '/') {
      router.push('/');
    }
    setGuestCount(1);
    setStartDate(undefined);
    setEndDate(undefined);
    reset({
      guestCount: 1,
      startDate: undefined,
      endDate: undefined,
    });
    await fetchRooms();
  };

  const commonStyle = {
    height: '40px',
  };


  return (
    <>
      {errors.root && <div className='text-danger'>{errors.root.message}</div>}
      <form
        onSubmit={handleSubmit(handleSubmitSearch)}
        className='d-flex flex-column flex-md-row align-items-center h-100 rounded bg-white p-2 shadow bg-light'
        style={{gap: '10px'}}>
        <FormInput
          id='guestCount'
          label='Guests'
          type='select'
          register={register('guestCount', {valueAsNumber: true})}
          error={errors.guestCount}
          options={[
            {value: '1', label: 'Guests: 1'},
            {value: '2', label: 'Guests: 2'},
            {value: '3', label: 'Guests: 3'},
          ]}
          onChange={e => setGuestCount(Number(e.target.value))}
          styleType='form-group'
          showLabel={false}
          marginBottomClass='mb-0'
        />

        <FormInput
          id='startDate'
          label='Check-in date'
          type='date'
          register={register('startDate')}
          minDate={new Date()}
          error={errors.startDate}
          selectedDate={startDate}
          onDateChange={date => {
            if (date) {
              const dateWithTime = setDateWithFixedTime(date, CheckInTime, 0); // Set check-in time to 14:00
              setStartDate(dateWithTime);
            }
          }}
          styleType='form-group'
          showLabel={false}
          marginBottomClass='mb-0'
        />

        <FormInput
          id='endDate'
          label='Check-out date'
          type='date'
          register={register('endDate')}
          minDate={startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : new Date()}
          error={errors.endDate}
          selectedDate={endDate}
          onDateChange={date => {
            if (date) {
              const dateWithTime = setDateWithFixedTime(date, CheckOutTime, 0); // Set check-out time to 12:00
              setEndDate(dateWithTime);
            }
          }}
          styleType='form-group'
          showLabel={false}
          marginBottomClass='mb-0'
        />

        <button
          type='submit'
          className='btn btn-dark text-white px-4 flex-grow-1'
          style={commonStyle}
          disabled={isSubmitting}>
          Search
        </button>

        <button
          type='button'
          className='btn btn-outline-dark px-2 flex-grow-1'
          style={commonStyle}
          onClick={handleClearSearch}>
          Clear
        </button>
      </form>
    </>
  );
};

export default SearchBar;
