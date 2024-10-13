import { z, ZodType } from "zod";
import { IBaseEntity } from "./IBaseEntity";

export interface IHotel extends IBaseEntity {
    name: string;
    address: string;
    phoneNumber: string;
    email: string;

}

export const hotelSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, { message: 'Name is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number' }),
    email: z.string().email({ message: 'Invalid email address' })
}) satisfies ZodType<IHotel>;
