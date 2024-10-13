import { z, ZodType } from "zod";
import { IBaseEntity } from "./IBaseEntity";

export interface IBooking extends IBaseEntity {
    roomId: string;
    roomNumber?: number;
    questFirstName?: string;
    questLastName?: string;
    questId: string;
    startDate: Date;
    endDate: Date;
    isCancelled: boolean;
}

export const bookingSchema = z.object({
    id: z.string().uuid().optional(),
    roomId: z.string().uuid({ message: 'Invalid room' }),
    roomNumber: z.number().optional(),
    questFirstName: z.string().optional(),
    questLastName: z.string().optional(),
    questId: z.string().uuid({ message: 'Invalid quest' }),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    isCancelled: z.boolean()
})
.refine(
    (data) => data.endDate >= data.startDate,
    {
        message: "End date cannot be earlier than start date",
        path: ["endDate"],
    }
) satisfies ZodType<IBooking>;
