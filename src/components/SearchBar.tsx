'use client';

import {
  IRoomAvailabilityRequest,
  RoomAvailabilityRequestSchema,
} from '@/interfaces/RoomAvailabilityRequest';
import { RoomContext } from '@/states/contexts/RoomContext';
import { SearchContext } from '@/states/contexts/SearchContext';
import { formatDate } from '@/utils/formatDate';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SearchBar = () => {
  const {
    guestCount,
    setGuestCount,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
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
      guestCount: guestCount,
      startDate: startDate,
      endDate: endDate,
    },
    resolver: zodResolver(RoomAvailabilityRequestSchema),
  });

  useEffect(() => {
    reset({
      guestCount: guestCount,
      startDate: startDate,
      endDate: endDate,
    });
  }, [guestCount, startDate, endDate, reset]);

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

  // Fetch all rooms without filters
  const handleClearSearch = async () => {
    // Redirect to main page if not already there
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
    <form
      onSubmit={handleSubmit(handleSubmitSearch)}
      className="d-flex flex-column flex-md-row align-items-center h-100 rounded bg-white p-2 shadow bg-light"
      style={{ gap: '10px' }}>
      {/* Dropdown for guest selection */}
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <select
          {...register('guestCount', { valueAsNumber: true })}
          className="form-select w-100"
          aria-label="Guests select"
          value={guestCount}
          onChange={(e) => setGuestCount(Number(e.target.value))}>
          <option value="1">Guests: 1</option>
          <option value="2">Guests: 2</option>
          <option value="3">Guests: 3</option>
        </select>
        {errors.guestCount && (
          <span className="text-danger">{errors.guestCount.message}</span>
        )}
      </div>

      {/* Divider */}
      <div
        className="border-end mx-2 d-none d-md-block"
        style={{ height: '40px', borderColor: '#d3d3d3', width: '1px' }}></div>

      {/* Check-in DatePicker */}
      <div className="flex-grow-1 d-flex flex-column">
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <DatePicker
              minDate={new Date()}
              value={formatDate(startDate)}
              selected={startDate ? new Date(startDate) : field.value}
              onChange={(date) => {
                field.onChange(date);
                setStartDate(date!);
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
      </div>

      {/* Divider */}
      <div
        className="border-end mx-2 d-none d-md-block"
        style={{ height: '40px', borderColor: '#d3d3d3', width: '1px' }}></div>

      {/* Check-out DatePicker */}
      <div className="flex-grow-1 d-flex flex-column">
        <Controller
          control={control}
          name="endDate"
          render={({ field }) => (
            <DatePicker
              value={formatDate(endDate)}
              minDate={new Date()}
              selected={endDate ? new Date(endDate) : field.value}
              onChange={(date) => {
                field.onChange(date);
                setEndDate(date!);
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
      </div>

      {/* Search button */}
      <button
        type="submit"
        className="btn btn-dark text-white px-4 flex-grow-1"
        style={commonStyle}
        disabled={isSubmitting}>
        Search
      </button>

      {/* Clear button */}
      <button
        type="button"
        className="btn btn-outline-dark px-2 flex-grow-1"
        style={commonStyle}
        onClick={handleClearSearch}>
        Clear
      </button>
    </form>
  );
};

export default SearchBar;
