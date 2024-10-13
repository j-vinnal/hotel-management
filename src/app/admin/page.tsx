'use client';

import withAdminAuth from '@/components/hoc/withAdminAuth';
import AdminLayout from '@/components/layouts/AdminLayouts';
import useEntityActions from '@/hooks/base/useEntityActions';
import { IHotel } from '@/interfaces/domain/IHotel';
import HotelService from '@/services/HotelService';
import Link from 'next/link';
import { useEffect } from 'react';

const AdminHotelPage = () => {
  const { entities: hotels, refetch: fetchEntity } =
    useEntityActions<IHotel>(HotelService);

  useEffect(() => {
    fetchEntity();
  }, []);

  return (
    <AdminLayout>
      <h2>Manage hotel See on see leht</h2>
      <div className="pt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id}>
                <td>{hotel.name}</td>
                <td>{hotel.address}</td>
                <td>{hotel.phoneNumber}</td>
                <td>{hotel.email}</td>
                <td>
                  <Link href={`/admin/hotels/edit/${hotel.id}`}>Edit</Link> |{' '}
                  <Link href={`/admin/hotels/details/${hotel.id}`}>
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default withAdminAuth(AdminHotelPage);
