import { auth } from '@/auth';
import { NextResponse } from 'next/server';

const ignoreRedirectNewUser = ['/new-user', '/sign-out', '/out'];

// Or like this if you need to do something here.
export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (req.auth && req.auth.user) {
    const isNewUser =
      ignoreRedirectNewUser.indexOf(pathname) === -1 &&
      (!req.auth.user.username || !(req.auth.user as any).nickname);

    const isProfileSet =
      pathname === '/new-user' && req.auth.user.username && (req.auth.user as any).nickname;

    if (isNewUser) {
      return NextResponse.redirect(new URL('/new-user', req.url));
    } else if (isProfileSet) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.svg$).*)']
};
