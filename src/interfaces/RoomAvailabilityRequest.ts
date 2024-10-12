import { z, ZodType } from 'zod';

export interface IRoomAvailabilityRequest {
  guestCount?: number;
  startDate?: Date;
  endDate?: Date;
}

export const RoomAvailabilityRequestSchema = z
  .object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    guestCount: z.number().optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate >= data.startDate;
      }
      return true;
    },
    {
      message: "End date cannot be earlier than start date",
      path: ["endDate"],
    }
  ) satisfies ZodType<IRoomAvailabilityRequest>;
