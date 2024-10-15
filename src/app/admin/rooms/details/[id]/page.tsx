'use client';

import withAdminAuth from '@/components/hoc/withAdminAuth';
import AdminLayout from '@/components/layouts/AdminLayouts';
import useEntityActions from '@/hooks/base/useEntityActions';
import { IRoom } from '@/interfaces/domain/IRoom';
import RoomService from '@/services/RoomService';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const DetailsRoomPage = (params: { params: { id?: string } }) => {
  const id = params.params.id;
  const { fetchEntityById, loading, error } =
    useEntityActions<IRoom>(RoomService);
  const [room, setRoom] = useState<IRoom | null>(null);

  const fetchRoom = async () => {
    const roomData = await fetchEntityById(id as string);
    setRoom(roomData);
  };

  useEffect(() => {
    if (id) {
      fetchRoom();
    }
  }, [id]);

  return (
    <AdminLayout>
      <h1>Details</h1>

      <h4>Room</h4>
      <hr />
      {loading && <p>Loading room...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {room && (
        <dl className="row">
          <dt className="col-sm-2">Room Name</dt>
          <dd className="col-sm-10">{room.roomName}</dd>
          <dt className="col-sm-2">Room Number</dt>
          <dd className="col-sm-10">{room.roomNumber}</dd>
          <dt className="col-sm-2">Bed Count</dt>
          <dd className="col-sm-10">{room.bedCount}</dd>
          <dt className="col-sm-2">Price</dt>
          <dd className="col-sm-10">{room.price}</dd>
          <dt className="col-sm-2">Image URL</dt>
          <dd className="col-sm-10">{room.imageUrl ?? 'No Image'}</dd>
          <dt className="col-sm-2">Hotel ID</dt>
          <dd className="col-sm-10">{room.hotelId}</dd>
        </dl>
      )}

      <div>
        <Link href="/admin/rooms">Back to List</Link>
      </div>
    </AdminLayout>
  );
};

export default withAdminAuth(DetailsRoomPage);
