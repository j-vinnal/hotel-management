import {z, ZodType} from 'zod';
import {IBaseEntity} from './IBaseEntity';
import {MaxGuestCount, MinGuestCount} from '@/utils/BusinessConstants';

export interface IBooking extends IBaseEntity {
  roomId: string;
  roomNumber?: number;
  questFirstName?: string;
  questLastName?: string;
  questId: string;
  startDate: Date;
  endDate: Date;
  guestCount: number;
  isCancelled: boolean;
}

export const bookingSchema = z
  .object({
    id: z.string().uuid().optional(),
    roomId: z.string().uuid({message: 'Invalid room'}),
    roomNumber: z.number().optional(),
    questFirstName: z.string().optional(),
    questLastName: z.string().optional(),
    questId: z.string().uuid({message: 'Invalid quest'}),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    guestCount: z
      .number()
      .min(MinGuestCount, {
        message: `Guest count must be at least ${MinGuestCount}`,
      })
      .max(MaxGuestCount, {
        message: `Guest count must be at most ${MaxGuestCount}`,
      }),
    isCancelled: z.boolean(),
  })
  .refine(data => data.endDate >= data.startDate, {
    message: 'End date cannot be earlier or equal to start date',
    path: ['endDate'],
  }) satisfies ZodType<IBooking>;
