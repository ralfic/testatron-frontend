import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/i'];

export function middleware(req: NextRequest) {
  const session = req.cookies.get('connect.sid')?.value;

  const isProtected = protectedRoutes.includes(req.nextUrl.pathname);

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/i/:path*'],
};
