import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  console.log('Middleware ran');

  const token = await getToken({ req });

  console.log("Token:", token);


  if (!token) {
    return NextResponse.json(
      { message: "Not Authorized. Please log in." },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

// Apply middleware to all `/api/notes/*` routes
export const config = {
  matcher: ['/api/notes/:path*'],
};
