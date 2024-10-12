import { z, ZodType } from "zod";
import { IBaseEntity } from "./IBaseEntity";

export interface IBooking extends IBaseEntity {
    roomId: string;
    roomNumber: number;
    questFirstName?: string;
    questLastName?: string;
    questId?: string;
    startDate: Date;
    endDate: Date;
    isCancelled: boolean;
}

export const bookingSchema = z.object({
    roomId: z.string().uuid({ message: 'Invalid Room ID' }),
    roomNumber: z.number(),
    questFirstName: z.string().optional(),
    questLastName: z.string().optional(),
    questId: z.string().uuid().optional(),
    startDate: z.date(),
    endDate: z.date(),
    isCancelled: z.boolean()
}) satisfies ZodType<IBooking>;
