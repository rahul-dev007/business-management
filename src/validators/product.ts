// validators/product.ts
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'প্রোডাক্টের নাম আবশ্যক'),
  description: z.string().min(1, 'ডিসক্রিপশন আবশ্যক'),
  price: z.number().min(0, 'দাম অবশ্যই পজিটিভ হতে হবে'),
  category: z.string().min(1, 'ক্যাটাগরি আবশ্যক'),
  image: z.string().url('সঠিক ইমেজ URL দিন').optional(),
  stock: z.number().min(0, 'স্টক অবশ্যই পজিটিভ হতে হবে').optional(),
});
