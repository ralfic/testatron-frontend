import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { queryClient } from './api/queryClient';
import { TestService } from './services/test.service';
import { TestSessionStatus } from './types';

export async function middleware(req: NextRequest) {
  const session = req.cookies.get('connect.sid')?.value;
  const currentPath = req.nextUrl.pathname;

  if (!session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (
    currentPath.startsWith('/test/testing') ||
    currentPath.startsWith('/test/result')
  ) {
    const uuid = currentPath.split('/').pop();

    if (!uuid) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    try {
      const testSession = await queryClient.fetchQuery(
        TestService.getTestSessionByUuidQueryOptions(uuid)
      );

      console.log(testSession.data.status);

      if (
        testSession.data.status === TestSessionStatus.FINISHED &&
        !currentPath.startsWith('/test/result/')
      ) {
        return NextResponse.redirect(new URL(`/test/result/${uuid}`, req.url));
      }

      if (
        testSession.data.status === TestSessionStatus.IN_PROGRESS &&
        !currentPath.startsWith('/test/testing/')
      ) {
        return NextResponse.redirect(new URL(`/test/testing/${uuid}`, req.url));
      }
    } catch (error) {
      console.error('Error fetching test session:', error);
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/i/:path*', '/test/:path*'],
};
