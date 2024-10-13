import { z, ZodType } from 'zod';
import { IBaseEntity } from './IBaseEntity';

export interface IClient extends IBaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  personalCode: string;
}

export const clientSchema = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  personalCode: z.string().min(1, { message: 'Personal code is required' }),
}) satisfies ZodType<IClient>;
