import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/authMiddleware';

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const user = await verifyToken(req);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized - admin only' }, { status: 401 });
    }

    const { id } = await context.params; // await দিয়ে params থেকে id বের করো

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { message: 'Server Error', error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
