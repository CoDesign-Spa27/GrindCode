import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Define protected routes
  const protectedRoutes = [
    '/dashboard',
    '/browse',
    '/create-room',
    '/your-rooms',
    '/rooms',
    '/edit-room'
  ];

  // Redirect to dashboard if user is logged in and tries to access the home page
  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Redirect to home if user is not authenticated and tries to access a protected route
  if (!token && (protectedRoutes.some(route => pathname.startsWith(route)) || pathname.startsWith('/rooms/'))) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/browse',
    '/create-room',
    '/your-rooms',
    '/rooms/:path*',
    '/edit-room/:path*' // Match any dynamic room IDs
  ],
};
