'use client';

import withAdminAuth from '@/components/hoc/withAdminAuth';
import AdminLayout from '@/components/layouts/AdminLayouts';
import useEntityActions from '@/hooks/base/useEntityActions';
import { IHotel } from '@/interfaces/domain/IHotel';
import HotelService from '@/services/HotelService';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const DetailsHotelPage = (params: { params: { id?: string } }) => {
  const id = params.params.id;
  const { fetchEntityById, loading, error } =
    useEntityActions<IHotel>(HotelService);
  const [hotel, setHotel] = useState<IHotel | null>(null);

  const fetchHotel = async () => {
    const hotelData = await fetchEntityById(id as string);
    setHotel(hotelData);
  };

  useEffect(() => {
    if (id) {
      fetchHotel();
    }
  }, [id]);

  return (
    <AdminLayout>
      <h1>Details</h1>
      <h4>Hotel</h4>
      <hr />
      {loading && <p>Loading hotel...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {hotel && (
        <dl className="row">
          <dt className="col-sm-2">Name</dt>
          <dd className="col-sm-10">{hotel.name}</dd>
          <dt className="col-sm-2">Address</dt>
          <dd className="col-sm-10">{hotel.address}</dd>
          <dt className="col-sm-2">Phone Number</dt>
          <dd className="col-sm-10">{hotel.phoneNumber}</dd>
          <dt className="col-sm-2">Email</dt>
          <dd className="col-sm-10">{hotel.email}</dd>
        </dl>
      )}
      <div>
        <Link href="/admin">Back to List</Link>
      </div>
    </AdminLayout>
  );
};

export default withAdminAuth(DetailsHotelPage);
