'use client';

import withAdminAuth from '@/components/hoc/withAdminAuth';
import AdminLayout from '@/components/layouts/AdminLayouts';
import useEntityActions from '@/hooks/base/useEntityActions';
import { IRoom } from '@/interfaces/domain/IRoom';
import RoomService from '@/services/RoomService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DeleteRoomPage = (params: { params: { id?: string } }) => {
  const router = useRouter();
  const id = params.params.id;
  const { fetchEntityById, deleteEntity, loading, error } =
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

  const onSubmit = async (entityId: string) => {
    try {
      await deleteEntity(entityId);
      toast.success('Room deleted successfully!');
      router.push('/admin/rooms');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <AdminLayout>
      <h1>Delete</h1>

      <h3>Are you sure you want to delete this?</h3>

      <h4>Room</h4>
      <hr />
      {loading && <p>Loading room...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {room && (
        <>
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

          <div className="d-flex align-items-center">
            <button
              type="button"
              onClick={() => room.id && onSubmit(room.id)}
              className="btn btn-danger me-4"
              disabled={loading}>
              Delete
            </button>

            <div className="me-4">|</div>
            <Link href="/admin/rooms">Back to List</Link>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default withAdminAuth(DeleteRoomPage);
