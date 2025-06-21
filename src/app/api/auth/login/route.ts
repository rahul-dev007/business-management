import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: '📛 ইমেইল এবং পাসওয়ার্ড অবশ্যই দিতে হবে' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: '🙅 ইউজার পাওয়া যায়নি' },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: '🔒 পাসওয়ার্ড ভুল হয়েছে' },
        { status: 401 }
      );
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    // ✅ Create response first
    const response = NextResponse.json(
      {
        message: '✅ লগইন সফল হয়েছে',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    // ✅ Then set cookie on response
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 দিন
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: '❌ সার্ভার এরর' }, { status: 500 });
  }
}
