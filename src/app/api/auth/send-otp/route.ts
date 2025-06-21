import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Otp from '@/models/Otp';
import { generateOTP } from '@/lib/otp';
import { sendOTPEmail } from '@/lib/mailer';
import { rateLimiter } from '@/lib/rateLimiter'; // ✅ RateLimiter import

export async function POST(req: NextRequest) {
  await connectDB();

  const ip = req.headers.get('x-forwarded-for') || 'anonymous'; // 🔐 Rate limiter IP
  const { success } = await rateLimiter.limit(ip);

  if (!success) {
    return NextResponse.json(
      { message: '❌ অনেকবার চেষ্টা করেছেন। ১ মিনিট পরে আবার চেষ্টা করুন।' },
      { status: 429 }
    );
  }

  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ message: '⚠️ ইমেইল দরকার' }, { status: 400 });
  }

  const otp = generateOTP();
  await Otp.create({ email, otp });

  const sent = await sendOTPEmail(email, otp);

  if (sent) {
    return NextResponse.json({ message: '✅ OTP পাঠানো হয়েছে' });
  } else {
    return NextResponse.json({ message: '❌ OTP পাঠাতে ব্যর্থ' }, { status: 500 });
  }
}
