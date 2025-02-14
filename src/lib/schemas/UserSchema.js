import { z } from 'zod';

export const AccountsSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(15, { message: 'First name cannot exceed 15 characters' }),

  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .max(15, { message: 'Last name cannot exceed 15 characters' }),

  email: z.string().email({ message: 'email format is not valid' }),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .optional(), 
  role: z.enum(['user', 'admin']).default('user'),

  image: z.string().url({ message: 'Invalid image URL' }).optional(),

  isVerified: z.boolean().default(false),
  authProviderId: z.string().optional(),
});
