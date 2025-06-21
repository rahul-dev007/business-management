import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const data = await req.json();

    const updated = await Product.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      return NextResponse.json({ message: '❌ প্রোডাক্ট খুঁজে পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({ message: '✅ প্রোডাক্ট আপডেট হয়েছে', product: updated });
  } catch (err) {
    return NextResponse.json(
      {
        message: '❌ আপডেট করতে সমস্যা হয়েছে',
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ message: '❌ প্রোডাক্ট খুঁজে পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({
      message: '✅ প্রোডাক্ট ডিলিট করা হয়েছে',
      product: deletedProduct,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: '❌ ডিলিট করতে সমস্যা হয়েছে',
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
