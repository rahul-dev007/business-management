import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await connectDB();
  const { email, newPassword } = await req.json();

  if (!email || !newPassword) {
    return NextResponse.json({ message: 'ইমেইল ও পাসওয়ার্ড লাগবে' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashedPassword });

  return NextResponse.json({ message: 'পাসওয়ার্ড রিসেট সফল হয়েছে' });
}
