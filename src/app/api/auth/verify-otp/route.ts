import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Otp from '@/models/Otp';

export async function POST(req: Request) {
  await connectDB();
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ message: 'ইমেইল ও OTP দরকার' }, { status: 400 });
  }

  const record = await Otp.findOne({ email, otp });

  if (!record) {
    return NextResponse.json({ message: 'ভুল OTP' }, { status: 400 });
  }

  // Valid OTP, delete it
  await Otp.deleteMany({ email });

  return NextResponse.json({ message: 'OTP সফলভাবে ভেরিফাই হয়েছে' });
}

