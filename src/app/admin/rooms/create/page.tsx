'use client';

import FormInput from '@/components/FormInput';
import withAdminAuth from '@/components/hoc/withAdminAuth';
import AdminLayout from '@/components/layouts/AdminLayouts';
import useEntityActions from '@/hooks/base/useEntityActions';
import {IHotel} from '@/interfaces/domain/IHotel';
import {IRoom, roomSchema} from '@/interfaces/domain/IRoom';
import HotelService from '@/services/HotelService';
import RoomService from '@/services/RoomService';
import {zodResolver} from '@hookform/resolvers/zod';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';

const CreateRoomPage = () => {
  const router = useRouter();
  const {addEntity} = useEntityActions<IRoom>(RoomService);
  const {refetch: fetchHotels, entities: hotels} =
    useEntityActions<IHotel>(HotelService);

  useEffect(() => {
    fetchHotels();
  }, []);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    setError,
    setValue,
  } = useForm<IRoom>({
    defaultValues: {
      roomName: '',
      roomNumber: 0,
      bedCount: 0,
      price: 0,
      imageUrl: '',
      hotelId: '',
    },
    resolver: zodResolver(roomSchema),
  });

  useEffect(() => {
    if (hotels.length > 0 && hotels[0].id) {
      setValue('hotelId', hotels[0].id);
    }
  }, [hotels, setValue]);

  /**
   * Handles the submission of the room creation form.
   *
   * @param data - The room data to be submitted.
   */
  const onSubmit = async (data: IRoom) => {
    try {
      await addEntity(data);
      toast.success('Room created successfully!');
      router.push('/admin/rooms');
    } catch (error) {
      toast.error((error as Error).message);
      setError('root', {type: 'server', message: (error as Error).message});
    }
  };

  return (
    <AdminLayout>
      <h1>Create</h1>
      <h4>Room</h4>
      <hr />
      <div className='row'>
        {errors.root && (
          <span className='text-danger'>{errors.root.message}</span>
        )}
        <div className='col-md-4'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              id='roomName'
              label='Room Name'
              type='text'
              register={register('roomName')}
              error={errors.roomName}
              styleType='form-group'
            />

            <FormInput
              id='roomNumber'
              label='Room Number'
              type='number'
              register={register('roomNumber', {valueAsNumber: true})}
              error={errors.roomNumber}
              styleType='form-group'
            />

            <FormInput
              id='bedCount'
              label='Bed Count'
              type='number'
              register={register('bedCount', {valueAsNumber: true})}
              error={errors.bedCount}
              styleType='form-group'
            />

            <FormInput
              id='price'
              label='Price'
              type='number'
              register={register('price', {valueAsNumber: true})}
              error={errors.price}
              styleType='form-group'
            />

            <FormInput
              id='imageUrl'
              label='Image URL'
              type='text'
              register={register('imageUrl')}
              error={errors.imageUrl}
              styleType='form-group'
            />

            <FormInput
              id='hotelId'
              label='Hotel'
              type='select'
              register={register('hotelId')}
              error={errors.hotelId}
              styleType='form-group'
              options={hotels
                .filter(hotel => hotel.id !== undefined)
                .map(hotel => ({
                  value: hotel.id as string,
                  label: hotel.name,
                }))}
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
        <Link href='/admin/rooms'>Back to List</Link>
      </div>
    </AdminLayout>
  );
};

export default withAdminAuth(CreateRoomPage);
