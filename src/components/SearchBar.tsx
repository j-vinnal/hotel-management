'use client';

import FormInput from '@/components/FormInput';
import {
  IRoomAvailabilityRequest,
  RoomAvailabilityRequestSchema,
} from '@/interfaces/IRoomAvailabilityRequest';
import { RoomContext } from '@/states/contexts/RoomContext';
import { SearchContext } from '@/states/contexts/SearchContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
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
    setValue,
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
      <FormInput
        id="guestCount"
        label="Guests"
        type="select"
        register={register('guestCount', { valueAsNumber: true })}
        error={errors.guestCount}
        options={[
          { value: '1', label: 'Guests: 1' },
          { value: '2', label: 'Guests: 2' },
          { value: '3', label: 'Guests: 3' },
        ]}
        onChange={(e) => setGuestCount(Number(e.target.value))}
        styleType="form-group"
        showLabel={false}
        marginBottomClass="mb-0"
      />

      <FormInput
        id="startDate"
        label="Check-in date"
        type="date"
        register={register('startDate')}
        error={errors.startDate}
        selectedDate={startDate ? new Date(startDate) : undefined}
        onDateChange={(date) => setStartDate(date!)}
        styleType="form-group"
        showLabel={false}
        marginBottomClass="mb-0"
      />

      <FormInput
        id="endDate"
        label="Check-out date"
        type="date"
        register={register('endDate')}
        error={errors.endDate}
        selectedDate={endDate ? new Date(endDate) : undefined}
        onDateChange={(date) => setEndDate(date!)}
        styleType="form-group"
        showLabel={false}
        marginBottomClass="mb-0"
      />

      <button
        type="submit"
        className="btn btn-dark text-white px-4 flex-grow-1"
        style={commonStyle}
        disabled={isSubmitting}>
        Search
      </button>

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
