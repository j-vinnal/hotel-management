import {z, ZodType} from 'zod';
import {IBaseEntity} from './IBaseEntity';
import {MaxGuestCount, MinGuestCount} from '@/utils/BusinessConstants';

export interface IRoom extends IBaseEntity {
  roomName: string;
  roomNumber: number;
  bedCount: number;
  price: number;
  imageUrl?: string;
  hotelId: string;
}

export const roomSchema = z.object({
  id: z.string().uuid().optional(),
  roomName: z.string().min(1, {message: 'Room name is required'}),
  roomNumber: z
    .number()
    .int()
    .min(1, {message: 'Room number must be a positive integer'}),
  bedCount: z
    .number()
    .int()
    .min(MinGuestCount, {
      message: `Bed count must be at least ${MinGuestCount}`,
    })
    .max(MaxGuestCount, {
      message: `Bed count must be at most ${MaxGuestCount}`,
    }),
  price: z.number().min(0, {message: 'Price must be a non-negative number'}),
  imageUrl: z.string().optional(),
  hotelId: z.string().uuid({message: 'Invalid Hotel ID'}),
}) satisfies ZodType<IRoom>;
