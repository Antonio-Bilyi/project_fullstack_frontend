import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi/serverApi';
import { logErrorResponse } from './app/api/_utils/utils';

const privateRoutes = ['/profile', '/stories/create', '/edit'];
const authRoutes = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route)) ||
    pathname.match(/^\/stories\/[^/]+\/edit$/);

  if (!accessToken) {
    if (refreshToken) {
      try {
        const data = await checkServerSession();
        const setCookie = data.headers['set-cookie'];

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed['Max-Age']),
            };
            if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
            if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
          }
          if (isAuthRoute) {
            return NextResponse.redirect(new URL('/', request.url), {
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }
          if (isPrivateRoute) {
            return NextResponse.next({
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }
        }
      } catch (error) {
        logErrorResponse(error);
      }
    }

    if (isAuthRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isPrivateRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile',
    '/stories/create',
    '/stories/:storyId*/edit',
    '/edit',
    '/auth/login',
    '/auth/register'
  ],
};