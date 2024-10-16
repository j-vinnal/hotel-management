import {IRoom} from '@/interfaces/domain/IRoom';
import Image from 'next/image';
import {FaBed, FaStar} from 'react-icons/fa';
import defaultImage from '../../public/images/default-image.webp';

interface RoomCardProps {
  room: IRoom;
  rating: string;
  onBookNow: (roomId: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({room, rating, onBookNow}) => {
  return (
    <div className='col'>
      <div
        className='card h-100 shadow-sm'
        style={{
          height: '400px',
          transition: 'transform 0.3s ease',
        }}>
        <Image
          src={room.imageUrl || defaultImage.src}
          className='card-img-top'
          alt={room.roomName}
          width={0}
          height={0}
          sizes='100vw'
          priority
          style={{
            minHeight: '270px',
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />

        <div className='card-body'>
          <h5 className='card-title'>{room.roomName}</h5>
          <p className='card-text mb-4' style={{fontSize: '0.9em'}}>
            Room {room.roomNumber}
          </p>
          <p className='card-text'>
            <FaBed className='text-secondary me-2' />
            {room.bedCount} bed{room.bedCount > 1 ? 's' : ''}
          </p>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='h4'>
              €{room.price}
              <small className='text-muted'> /night</small>
            </span>
            <div className='d-flex align-items-center'>
              <FaStar className='text-warning me-1' />
              <span>{rating}</span>
            </div>
          </div>
          <button
            onClick={() => room.id && onBookNow(room.id)}
            className='btn btn-primary mt-3 w-100'>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
