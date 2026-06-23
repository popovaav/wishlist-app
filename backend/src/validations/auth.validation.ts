import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email('Invalid email format')),
  password: z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .refine((value) => value.trim().length >= 8, {
    message: 'Password must be at least 8 non-whitespace characters',
  })
});

export type RegisterUserInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email('Invalid email format')),
  password: z.string().min(1, 'Password is required'),
});

export type LoginUserInput = z.infer<typeof loginSchema>;
