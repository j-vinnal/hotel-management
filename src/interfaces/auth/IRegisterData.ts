import {z, ZodType} from 'zod';

export interface IRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

export const RegisterSchema = z
  .object({
    firstName: z.string().trim().min(1, {message: 'First name is required'}),
    lastName: z.string().trim().min(1, {message: 'Last name is required'}),
    email: z.string().trim().email({message: 'Invalid email address'}),
    password: z
      .string()
      .trim()
      .min(6, {message: 'Password must be at least 6 characters long'})
      .regex(/[A-Z]/, {message: 'Password must contain at least one uppercase character'})
      .regex(/[a-z]/, {message: 'Password must contain at least one lowercase character'})
      .regex(/\d/, {message: 'Password must contain at least one digit'})
      .regex(/[^a-zA-Z0-9]/, {message: 'Password must contain at least one non-alphanumeric character'}),
    confirmedPassword: z.string().trim(),
  })
  .refine(data => data.password === data.confirmedPassword, {
    message: "Passwords don't match",
    path: ['confirmedPassword'], // path of error
  }) satisfies ZodType<IRegisterData>;
