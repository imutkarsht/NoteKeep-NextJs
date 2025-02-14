import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });


  if (!token) {
    return NextResponse.json(
      { message: 'Not Authorized. Please log in.' },
      { status: 401 }
    );
  }

  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/admin') && token.role !== 'admin') {
    return NextResponse.json(
      { message: 'Forbidden. Admin access required.' },
      { status: 403 }
    );
  }

  if (
    pathname.startsWith('/api/user') &&
    !['user', 'admin'].includes(token.role)
  ) {
    return NextResponse.json(
      { message: 'Forbidden. User access required.' },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/admin/:path*', '/api/user/:path*'],
};
