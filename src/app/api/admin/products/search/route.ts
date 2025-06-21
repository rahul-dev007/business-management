import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/Product';
import connectDB from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const keyword = req.nextUrl.searchParams.get('keyword') || '';
    const products = await Product.find({
      name: { $regex: keyword, $options: 'i' },
    });
    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json({ message: '❌ সার্চ করতে সমস্যা হয়েছে' }, { status: 500 });
  }
}
