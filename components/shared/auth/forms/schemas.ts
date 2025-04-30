import { UserRole } from '@/types';
import z from 'zod';

export const passwordSchema = z
  .string()
  .min(4, { message: 'Input a valid password' });

export const loginFormSchema = z.object({
  email: z.string().email({ message: 'Input a valid email' }),
  password: passwordSchema,
});

export const registerSchema = loginFormSchema.extend({
  fullName: z
    .string()
    .min(3, { message: 'Full name must be at least 3 characters' })
    .max(32, { message: 'Full name must be less than 32 characters' }),
  role: z.nativeEnum(UserRole).default(UserRole.STUDENT),
});

export type LoginData = z.infer<typeof loginFormSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
