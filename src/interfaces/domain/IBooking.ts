import { z, ZodType } from "zod";
import { IBaseEntity } from "./IBaseEntity";

export interface IBooking extends IBaseEntity {
    roomId: string;
    appUserId: string;
    startDate: Date;
    endDate: Date;
    isCancelled: boolean;
}

export const bookingSchema = z.object({
    roomId: z.string().uuid({ message: 'Invalid Room ID' }),
    appUserId: z.string().uuid({ message: 'Invalid App User ID' }),
    startDate: z.date(),
    endDate: z.date(),
    isCancelled: z.boolean()
}) satisfies ZodType<IBooking>;