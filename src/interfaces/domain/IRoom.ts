import { z, ZodType } from 'zod';
import { IBaseEntity } from './IBaseEntity';

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
  roomName: z.string().min(1, { message: 'Room name is required' }),
  roomNumber: z
    .number()
    .int()
    .min(1, { message: 'Room number must be a positive integer' }),
  bedCount: z
    .number()
    .int()
    .min(1, { message: 'Bed count must be at least 1' }),
  price: z.number().min(0, { message: 'Price must be a non-negative number' }),
  imageUrl: z.string().url({ message: 'Invalid image URL' }).optional(),
  hotelId: z.string().uuid({ message: 'Invalid Hotel ID' }),
}) satisfies ZodType<IRoom>;
