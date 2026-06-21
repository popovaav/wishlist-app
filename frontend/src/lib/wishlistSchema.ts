import { z } from 'zod';

export const wishlistItemSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  price: z.string().refine((v) => Number(v) > 0, { message: 'Price must be greater than 0' }),
  priority: z.enum(['High', 'Medium', 'Low'] as const, { message: 'Please select a priority' }),
  status: z.enum(['Want', 'Purchased'] as const, { message: 'Please select a status' }),
});

export type WishlistFormValues = z.infer<typeof wishlistItemSchema>;
