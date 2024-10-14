'use client';

import FormInput from '@/components/FormInput';
import withAdminAuth from '@/components/hoc/withAdminAuth';
import AdminLayout from '@/components/layouts/AdminLayouts';
import useEntityActions from '@/hooks/base/useEntityActions';
import { IHotel } from '@/interfaces/domain/IHotel';
import { IRoom, roomSchema } from '@/interfaces/domain/IRoom';
import HotelService from '@/services/HotelService';
import RoomService from '@/services/RoomService';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { json } from 'stream/consumers';

const EditRoomPage = (params: { params: { id?: string } }) => {
  const router = useRouter();
  const id = params.params.id;
  const { fetchEntityById, editEntity } = useEntityActions<IRoom>(RoomService);
  const [room, setRoom] = useState<IRoom | null>(null);
  const { refetch: fetchHotels, entities: hotels } =
    useEntityActions<IHotel>(HotelService);

  useEffect(() => {
    fetchHotels();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<IRoom>({
    defaultValues: {
      roomName: room?.roomName,
      roomNumber: room?.roomNumber,
      bedCount: room?.bedCount,
      price: room?.price,
      imageUrl: room?.imageUrl,
      hotelId: room?.hotelId,
    },
    resolver: zodResolver(roomSchema),
  });

  const fetchRoom = async () => {
    const roomData = await fetchEntityById(id as string);
    setRoom(roomData);
    reset(roomData);
  };

  useEffect(() => {
    if (id) {
      fetchRoom();
    }
  }, [id]);

  const onSubmit = async (data: IRoom) => {
    console.log('date', JSON.stringify(data, null, 2));
    try {
      await editEntity(id as string, data);
      toast.success('Room updated successfully!');
      router.push('/admin/rooms');
    } catch (error) {
      toast.error((error as Error).message);
      setError('root', { type: 'server', message: (error as Error).message });
    }
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <h1>Edit</h1>
      <h4>Room</h4>
      <hr />
      <div className="row">
        {errors.root && (
          <span className="text-danger">{errors.root.message}</span>
        )}
        <div className="col-md-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              id="roomName"
              label="Room Name"
              type="text"
              register={register('roomName')}
              error={errors.roomName}
              styleType="form-group"
            />

            <FormInput
              id="roomNumber"
              label="Room Number"
              type="number"
              register={register('roomNumber', { valueAsNumber: true })}
              error={errors.roomNumber}
              styleType="form-group"
            />

            <FormInput
              id="bedCount"
              label="Bed Count"
              type="number"
              register={register('bedCount', { valueAsNumber: true })}
              error={errors.bedCount}
              styleType="form-group"
            />

            <FormInput
              id="price"
              label="Price"
              type="number"
              register={register('price', { valueAsNumber: true })}
              error={errors.price}
              styleType="form-group"
            />

            <FormInput
              id="imageUrl"
              label="Image URL"
              type="text"
              register={register('imageUrl')}
              error={errors.imageUrl}
              styleType="form-group"
            />

            <FormInput
              id="hotelId"
              label="Hotel"
              type="select"
              register={register('hotelId')}
              error={errors.hotelId}
              styleType="form-group"
              options={hotels
                .filter((hotel) => hotel.id !== undefined)
                .map((hotel) => ({
                  value: hotel.id as string,
                  label: hotel.name,
                }))}
            />

            <div className="form-group mb-3 d-flex align-items-center">
              <button
                type="submit"
                className="btn btn-primary me-4"
                disabled={isSubmitting}>
                Save
              </button>
              <div className="me-4">|</div>
              <Link href="/admin/rooms">Back to List</Link>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAdminAuth(EditRoomPage);
