import { z, ZodType } from 'zod';

export interface IRoomAvailabilityRequest {
  guests?: number;
  startDate?: Date;
  endDate?: Date;
}

export const RoomAvailabilityRequestSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  guests: z.number().optional(),
}) satisfies ZodType<IRoomAvailabilityRequest>;
