// app/api/cart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Cart from '@/models/Cart';
import Product from '@/models/Product'; // ✅ এই লাইনটা যোগ করো populate কাজের জন্য
import { verifyToken } from '@/lib/authMiddleware';
import { addToCartSchema } from '@/validators/cart';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const user = await verifyToken(req);
        if (!user) return NextResponse.json({ message: '❌ Unauthorized' }, { status: 401 });

        const body = await req.json();
        const result = addToCartSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { message: 'Invalid input', errors: result.error.format() },
                { status: 400 }
            );
        }

        const { productId, quantity } = result.data;

        let cart = await Cart.findOne({ userId: user.id });

        if (cart) {
            const existingItem = cart.items.find((item) => item.product.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }
            await cart.save();
        } else {
            cart = await Cart.create({
                userId: user.id,
                items: [{ product: productId, quantity }],
            });
        }

        return NextResponse.json({ message: '✅ প্রোডাক্ট কার্টে যোগ হয়েছে', cart });
    } catch (error) {
        return NextResponse.json(
            { message: '❌ সার্ভারে সমস্যা হয়েছে', error },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const user = await verifyToken(req);
        if (!user) {
            return NextResponse.json({ message: '❌ Unauthorized' }, { status: 401 });
        }

        // ✅ এখানে populate কাজ করবে কারণ আমরা Product model import করেছি
        const cart = await Cart.findOne({ userId: user.id }).populate('items.product');

        return NextResponse.json({ cart });
    } catch (error) {
        console.error('GET /cart error:', error);
        return NextResponse.json(
            { message: '❌ কার্ট আনতে সমস্যা হয়েছে', error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}
