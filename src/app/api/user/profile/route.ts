import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/authMiddleware';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const user = await verifyToken(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const profile = await User.findById(user.id).select('-password');
    if (!profile) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Profile GET Error:', error);  // <== এখানে লগ করো
    return NextResponse.json(
      { message: 'Server error', error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
    try {
        await connectDB();

        const user = await verifyToken(req);
        if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const data = await req.json();

        // Update only own profile, exclude sensitive fields if needed (like password)
        const updatedProfile = await User.findByIdAndUpdate(user.id, data, { new: true }).select('-password');
        if (!updatedProfile) return NextResponse.json({ message: 'User not found' }, { status: 404 });

        return NextResponse.json({ message: 'Profile updated successfully', profile: updatedProfile });
    } catch (error) {
        return NextResponse.json(
            { message: 'Server error', error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}
