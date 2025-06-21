import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/authMiddleware'; // তোমার টোকেন যাচাই ফাংশন

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const isAuth = !!token;

  const protectedRoutes = ['/dashboard', '/admin', '/app/admin'];

  const pathname = req.nextUrl.pathname;

  if (protectedRoutes.some((path) => pathname.startsWith(path))) {
    if (!isAuth) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  return NextResponse.next();
}
