'use client';

import {
  IRoomAvailabilityRequest,
  RoomAvailabilityRequestSchema,
} from '@/interfaces/RoomAvailabilityRequest';
import { RoomContext } from '@/states/contexts/RoomContext';
import { formatDate, SearchContext } from '@/states/contexts/SearchContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { usePathname, useRouter } from 'next/navigation';

const SearchBar = () => {
  const {
    guests,
    setGuests,
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
  } = useContext(SearchContext)!;

  const { fetchRooms } = useContext(RoomContext)!;
  const router = useRouter();
  const pathname = usePathname(); 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
    reset,
  } = useForm<IRoomAvailabilityRequest>({
    defaultValues: {
      guests: guests,
      startDate: checkinDate,
      endDate: checkoutDate,
    },
    resolver: zodResolver(RoomAvailabilityRequestSchema),
  });

  useEffect(() => {
    reset({
      guests: guests,
      startDate: checkinDate,
      endDate: checkoutDate,
    });
  }, [guests, checkinDate, checkoutDate, reset]);

  const handleSubmitSearch = async (data: IRoomAvailabilityRequest) => {
    console.log('search data', data);

    try {
      await fetchRooms(data);

      // Redirect to main page if not already there
      if (pathname !== '/') {
        router.push('/');
      }
    } catch (error) {
      toast.error((error as Error).message);
      setError('root', { type: 'server', message: (error as Error).message });
    }
  };

  const commonStyle = {
    height: '40px',
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSearch)}
      className="d-flex align-items-center h-100 rounded bg-white p-2 shadow bg-light"
      style={{ gap: '10px' }}>
      {/* Dropdown for guest selection */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <select
          {...register('guests', { valueAsNumber: true })}
          className="form-select w-100"
          aria-label="Guests select"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}>
          <option value="1">Guests: 1</option>
          <option value="2">Guests: 2</option>
          <option value="3">Guests: 3</option>
        </select>
        {errors.guests && (
          <span className="text-danger">{errors.guests.message}</span>
        )}
      </div>

      {/* Divider */}
      <div
        className="border-end mx-2"
        style={{ height: '40px', borderColor: '#d3d3d3', width: '1px' }}></div>

      {/* Check-in DatePicker */}
      <Controller
        control={control}
        name="startDate"
        render={({ field }) => (
          <DatePicker
            minDate={new Date()}
            value={formatDate(checkinDate)}
            selected={checkinDate ? new Date(checkinDate) : field.value}
            onChange={(date) => {
              field.onChange(date);
              setCheckinDate(date!);
            }}
            className="form-control w-100"
            placeholderText="Check in"
            style={commonStyle}
          />
        )}
      />
      {errors.startDate && (
        <span className="text-danger">{errors.startDate.message}</span>
      )}

      {/* Divider */}
      <div
        className="border-end mx-2"
        style={{ height: '40px', borderColor: '#d3d3d3', width: '1px' }}></div>

      {/* Check-out DatePicker */}
      <Controller
        control={control}
        name="endDate"
        render={({ field }) => (
          <DatePicker
            value={formatDate(checkoutDate)}
            minDate={new Date()}
            selected={checkoutDate ? new Date(checkoutDate) : field.value}
            onChange={(date) => {
              field.onChange(date);
              setCheckoutDate(date!);
            }}
            className="form-control w-100"
            placeholderText="Check out"
            style={commonStyle}
          />
        )}
      />
      {errors.endDate && (
        <span className="text-danger">{errors.endDate.message}</span>
      )}

      {/* Search button */}
      <button
        type="submit"
        className="btn btn-dark text-white px-4 flex-grow-1"
        style={commonStyle}
        disabled={isSubmitting}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
