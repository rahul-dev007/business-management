import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/Product';
import connectDB from '@/lib/db';
import { z } from 'zod';

// ✅ Zod schema for query param
const categorySchema = z.object({
  category: z.string().min(1, 'ক্যাটাগরি নাম অবশ্যই দিতে হবে'),
});

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // ✅ Extract and validate query param
    const category = req.nextUrl.searchParams.get('category');

    const result = categorySchema.safeParse({ category });

    if (!result.success) {
      return NextResponse.json(
        { message: '❌ ইনপুট ভ্যালিডেশন ফেইল হয়েছে', errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const products = await Product.find({ category: result.data.category });

    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: '❌ ফিল্টার করতে সমস্যা হয়েছে', error: (err as Error).message },
      { status: 500 }
    );
  }
}
