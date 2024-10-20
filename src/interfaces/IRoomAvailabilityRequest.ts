import {MaxGuestCount, MinGuestCount} from '@/utils/BookingConstants';
import {z, ZodType} from 'zod';

export interface IRoomAvailabilityRequest {
  guestCount?: number;
  startDate?: Date;
  endDate?: Date;
  currentBookingId?: string;
}

export const RoomAvailabilityRequestSchema = z
  .object({
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    guestCount: z
      .number()
      .min(MinGuestCount, {
        message: `Guest count must be at least ${MinGuestCount}`,
      })
      .max(MaxGuestCount, {
        message: `Guest count must be at most ${MaxGuestCount}`,
      })
      .optional(),
    currentBookingId: z.string().uuid().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.startDate === undefined && data.endDate !== undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['startDate'],
        message: 'Start date must be provided',
      });
    }

    if (data.startDate !== undefined && data.endDate === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date must be provided',
      });
    }

    if (data.startDate && data.endDate && data.endDate <= data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date cannot be earlier or equal to start date',
      });
    }
  }) satisfies ZodType<IRoomAvailabilityRequest>;
