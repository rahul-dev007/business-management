import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/authMiddleware';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // টোকেন verify করো
    const user = await verifyToken(req);
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Unauthorized - admin only' },
        { status: 401 }
      );
    }

    // Password field বাদ দিয়ে সব ইউজার নিয়ে আসো
    const users = await User.find().select('-password');

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);

    return NextResponse.json(
      {
        message: 'Server Error',
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
