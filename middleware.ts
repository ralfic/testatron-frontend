import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { TestService } from './services/test.service';
import { TestSessionStatus, UserRole } from './types';
import { UserService } from './services/user.service';

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
      const testSession = await TestService.getTestSessionByUuid(uuid);

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
      if (currentPath.startsWith('/test/edit')) {
        const user = await UserService.getProfile(session);
        if (user.data.role !== UserRole.TEACHER) {
          return NextResponse.redirect(new URL('/', req.url));
        }
      }
    } catch (error) {
      console.error('Error fetching test session:', error);
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (
    (currentPath.startsWith('/teacher') ||
      currentPath.startsWith('/student')) &&
    session
  ) {
    try {
      const data = await UserService.getProfile(session);
      const role = data.data.role;

      if (role === UserRole.TEACHER && currentPath.startsWith('/student')) {
        return NextResponse.redirect(new URL('/teacher/test/my', req.url));
      } else if (
        role === UserRole.STUDENT &&
        currentPath.startsWith('/teacher')
      ) {
        return NextResponse.redirect(new URL('/student/dashboard', req.url));
      } else if (currentPath === '/teacher' || currentPath === '/student') {
        return NextResponse.redirect(
          new URL(
            `/${
              role === UserRole.TEACHER
                ? 'teacher/test/my'
                : 'student/dashboard'
            }`,
            req.url
          )
        );
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (
    (currentPath.startsWith('/teacher') ||
      currentPath.startsWith('/student')) &&
    !session
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/teacher/:path*', '/test/:path*', '/student/:path*'],
};
