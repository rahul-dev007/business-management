import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/Product';
import connectDB from '@/lib/db';
import { verifyAdmin } from '@/lib/authMiddleware';
import { productSchema } from '@/validators/product'; // ✅ Zod import

// 🔹 Create a new product (Admin only)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    await verifyAdmin(req); // ✅ Admin verification

    const body = await req.json();

    // ✅ Validate incoming data using Zod
    const result = productSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: '❌ ইনপুট ভ্যালিডেশন ফেইল হয়েছে',
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const product = await Product.create(result.data);

    return NextResponse.json(
      { message: '✅ প্রোডাক্ট সফলভাবে যুক্ত হয়েছে', product },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: '❌ প্রোডাক্ট যুক্ত করতে সমস্যা হয়েছে', error: err.message },
      { status: 500 }
    );
  }
}

// 🔹 Get paginated product list (Admin only)
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    // await verifyAdmin(req); // ✅ Admin only

    const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    return NextResponse.json(
      { products, total, page, limit },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: '❌ Pagination লোড করতে সমস্যা হয়েছে', error: err.message },
      { status: 500 }
    );
  }
}
