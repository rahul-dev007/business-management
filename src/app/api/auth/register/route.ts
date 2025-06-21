// app/api/auth/register/route.ts
import connectDB from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { registerSchema } from '@/validators/user';

export async function POST(request: Request) {
  try {
    // ✅ Connect to MongoDB
    await connectDB();

    // ✅ Get and validate body with Zod
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }

    const { name, email, password } = parsed.data;

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: '⛔️ এই ইমেইল ইতিমধ্যে রেজিস্টার করা আছে' }, { status: 409 });
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ Create and save new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user', // Default role
    });

    // ✅ Return success response
    return NextResponse.json({
      message: '✅ ইউজার রেজিস্ট্রেশন সফল হয়েছে',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('❌ Register error:', error.message);
    return NextResponse.json({ message: '❌ সার্ভার এরর', error: error.message }, { status: 500 });
  }
}
