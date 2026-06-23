import { z } from 'zod';

const wishlistItemFields = {
  title: z.string().trim().min(1, 'Title is required').max(100, 'Title must be at most 100 characters'),
  price: z.coerce.number({ message: 'Price must be a number' }).min(0, 'Price must be at least 0').max(100_000, 'Price must be at most 100,000'),
  priority: z.enum(['High', 'Medium', 'Low'] as const, { message: 'Priority must be High, Medium, or Low' }),
  status: z.enum(['Want', 'Purchased'] as const, { message: 'Status must be Want or Purchased' }),
};

export const createWishlistItemSchema = z.object({
  ...wishlistItemFields,
});

export const updateWishlistItemSchema = z.object({
  ...wishlistItemFields,
});

export type CreateWishlistItemInput = z.infer<typeof createWishlistItemSchema>;
export type UpdateWishlistItemInput = z.infer<typeof updateWishlistItemSchema>;
