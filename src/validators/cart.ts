// validators/cart.ts
import { z } from 'zod';

export const addToCartSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().min(1),
});
