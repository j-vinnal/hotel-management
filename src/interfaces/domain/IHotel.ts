import { z, ZodType } from "zod";
import { IBaseEntity } from "./IBaseEntity";

export interface IHotel extends IBaseEntity {
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    appUserId: string;
}

export const hotelSchema = z.object({
    name: z.string().max(256, { message: 'Name must be at most 256 characters long' }),
    address: z.string().max(256, { message: 'Address must be at most 256 characters long' }),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number' }),
    email: z.string().email({ message: 'Invalid email address' }),
    appUserId: z.string().uuid({ message: 'Invalid App User ID' })
}) satisfies ZodType<IHotel>;