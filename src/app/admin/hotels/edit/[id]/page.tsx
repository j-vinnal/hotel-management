'use client';

import FormInput from '@/components/FormInput';
import withAdminAuth from '@/components/hoc/withAdminAuth';
import AdminLayout from '@/components/layouts/AdminLayouts';
import useEntityActions from '@/hooks/base/useEntityActions';
import { IHotel, hotelSchema } from '@/interfaces/domain/IHotel';
import HotelService from '@/services/HotelService';
import { useHotel } from '@/states/contexts/HotelContext';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const EditHotelPage = (params: { params: { id?: string } }) => {
  const router = useRouter();
  const id = params.params.id;
  const { fetchEntityById, editEntity } =
    useEntityActions<IHotel>(HotelService);
  const [hotel, setHotel] = useState<IHotel | null>(null);
  const { setHotelName } = useHotel();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<IHotel>({
    defaultValues: {
      id: hotel?.id || undefined,
      name: hotel?.name || undefined,
      address: hotel?.address || undefined,
      phoneNumber: hotel?.phoneNumber || undefined,
      email: hotel?.email || undefined,
    },
    resolver: zodResolver(hotelSchema),
  });

  const fetchHotel = async () => {
    const hotelData = await fetchEntityById(id as string);
    setHotel(hotelData);
    reset(hotelData);
    
  };

  useEffect(() => {
    if (id) {
      fetchHotel();
    }
  }, [id]);

  const onSubmit = async (data: IHotel) => {
    try {
      await editEntity(id as string, data);
      setHotelName(data.name);
      toast.success('Hotel updated successfully!');
      router.push('/admin');
    } catch (error) {
      toast.error((error as Error).message);
      setError('root', { type: 'server', message: (error as Error).message });
    }
  };

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <h1>Edit</h1>
      <h4>Hotel</h4>
      <hr />
      <div className="row">
        {errors.root && (
          <span className="text-danger">{errors.root.message}</span>
        )}
        <div className="col-md-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              id="name"
              label="Name"
              type="text"
              register={register('name')}
              error={errors.name}
              styleType="form-group"
            />
            <FormInput
              id="address"
              label="Address"
              type="text"
              register={register('address')}
              error={errors.address}
              styleType="form-group"
            />
            <FormInput
              id="phoneNumber"
              label="Phone Number"
              type="text"
              register={register('phoneNumber')}
              error={errors.phoneNumber}
              styleType="form-group"
            />
            <FormInput
              id="email"
              label="Email"
              type="email"
              register={register('email')}
              error={errors.email}
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
        <Link href="/admin">Back to List</Link>
      </div>
    </AdminLayout>
  );
};

export default withAdminAuth(EditHotelPage);
