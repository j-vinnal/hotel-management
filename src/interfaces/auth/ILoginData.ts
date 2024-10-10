import {z, ZodType} from 'zod';

export interface ILoginData {
  email: string;
  password: string;
}

export const LoginSchema = z.object({
  email: z.string().trim().email({message: 'Invalid email address'}),
  password: z
  .string()
  .trim()
  .min(6, {message: 'Password must be at least 6 characters long'})
  .regex(/[A-Z]/, {message: 'Password must contain at least one uppercase character'})
  .regex(/[a-z]/, {message: 'Password must contain at least one lowercase character'})
  .regex(/\d/, {message: 'Password must contain at least one digit'})
  .regex(/[^a-zA-Z0-9]/, {message: 'Password must contain at least one non-alphanumeric character'}),
}) satisfies ZodType<ILoginData>;
