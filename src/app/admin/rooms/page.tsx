'use client';

import withAdminAuth from '@/components/hoc/withAdminAuth';
import AdminLayout from '@/components/layouts/AdminLayouts';
import useEntityActions from '@/hooks/base/useEntityActions';
import {IRoom} from '@/interfaces/domain/IRoom';
import RoomService from '@/services/RoomService';
import Link from 'next/link';
import {useEffect} from 'react';

const AdminRoomPage = () => {
  const {
    entities: rooms,
    refetch: fetchEntity,
    loading,
    error,
  } = useEntityActions<IRoom>(RoomService);

  /**
   * Fetches the list of rooms and updates the state.
   */
  useEffect(() => {
    fetchEntity();
  }, []);

  return (
    <AdminLayout>
      <h2>Manage rooms</h2>
      {error && <div className='alert alert-danger'>{error}</div>}
      {loading && <p>Loading rooms...</p>}
      {rooms.length === 0 && !loading && (
        <div className='alert alert-warning'>No rooms found</div>
      )}
      {rooms.length > 0 && (
        <div className='pt-4'>
          <p>
            <Link href='/admin/rooms/create'>Create New</Link>
          </p>
          <table className='table'>
            <thead>
              <tr>
                <th>Room number</th>
                <th>Room name</th>
                <th>Bed count</th>
                <th>Price</th>
                <th>Image URL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room.id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.roomName}</td>
                  <td>{room.bedCount}</td>
                  <td>{room.price}</td>
                  <td>
                    {(room.imageUrl?.length ?? 0) > 30
                      ? `${room.imageUrl!.substring(0, 30)}...`
                      : (room.imageUrl ?? 'No Image')}
                  </td>
                  <td>
                    <Link href={`/admin/rooms/edit/${room.id}`}>Edit</Link> |{' '}
                    <Link href={`/admin/rooms/details/${room.id}`}>
                      Details
                    </Link>{' '}
                    |{' '}
                    <Link href={`/admin/rooms/delete/${room.id}`}>Delete</Link>
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

export default withAdminAuth(AdminRoomPage);
