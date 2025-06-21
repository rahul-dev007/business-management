// lib/authMiddleware.ts

import jwt from 'jsonwebtoken';
import User from '@/models/User';
import connectDB from './db';
import { NextRequest } from 'next/server';

export const verifyToken = async (req: NextRequest) => {
  await connectDB();

  // Cookie থেকে token নিয়ে আসা
  const token = req.cookies.get('token')?.value;

  if (!token) throw new Error('⛔ Unauthorized: No token provided');

  // Token verify করা
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    id: string;
    role: string;
  };

  // User খোঁজা
  const user = await User.findById(decoded.id);

  if (!user) throw new Error('⛔ User not found');

  return user; // user অবজেক্ট রিটার্ন করবে
};

export const verifyAdmin = async (req: NextRequest) => {
  const user = await verifyToken(req); // আগে verifyToken চালাও

  if (user.role !== 'admin') throw new Error('⛔ Forbidden: Not an admin');

  return user;
};
