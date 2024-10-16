'use client';

import withAdminAuth from '@/components/hoc/withAdminAuth';
import AdminLayout from '@/components/layouts/AdminLayouts';
import useEntityActions from '@/hooks/base/useEntityActions';
import {IHotel} from '@/interfaces/domain/IHotel';
import HotelService from '@/services/HotelService';
import Link from 'next/link';
import {useEffect} from 'react';

const AdminHotelPage = () => {
  const {
    entities: hotels,
    refetch: fetchEntity,
    loading,
    error,
  } = useEntityActions<IHotel>(HotelService);

  /**
   * Fetches the list of rooms and updates the state.
   */
  useEffect(() => {
    fetchEntity();
  }, []);

  return (
    <AdminLayout>
      <h2>Manage hotel</h2>
      {error && <div className='alert alert-danger'>{error}</div>}
      {loading && <div className='alert alert-info'>Loading...</div>}
      {hotels.length === 0 && !loading && (
        <div className='alert alert-warning'>No hotels found</div>
      )}
      {hotels.length > 0 && (
        <div className='pt-4'>
          <table className='table'>
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
              {hotels.map(hotel => (
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
      )}
    </AdminLayout>
  );
};

export default withAdminAuth(AdminHotelPage);
