import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { IUser } from './stores/auth-store';

const protectedRoutes = [
  '/dashboard',
  '/myevents',
  '/mytickets',
  '/organizer',
  '/profile',
  '/transaction',
  '/create-events',
];

export default async function middleware(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const isProtected = protectedRoutes.some((path) =>
      req.nextUrl.pathname.startsWith(path),
    );

    const token = cookieStore.get('access_token')?.value || '';

    if (isProtected && !token) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    const user: IUser = jwtDecode(token);

    if (
      isProtected &&
      (req.nextUrl.pathname.startsWith('/organizer') ||
        req.nextUrl.pathname.startsWith('/create-events')) &&
      user.role !== 'Organizer'
    ) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/myevents/:path*',
    '/mytickets/:path*',
    '/organizer/:path*',
    '/profile/:path*',
    '/transaction/:path*',
    '/create-events/:path*',
  ],
};
