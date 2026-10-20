import { redirectFor } from '@root/lib/locales';
import { type NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const redirect = redirectFor(pathname, request.headers.get('accept-language'));

  if (redirect === null) {
    return NextResponse.next();
  }

  // La query string se place avant l'ancre éventuelle (`/fr?utm=x#projets`).
  const [path, hash = ''] = redirect.location.split('#');
  const response = NextResponse.redirect(
    new URL(`${path}${search}${hash && `#${hash}`}`, request.url),
    redirect.status,
  );

  // 307 sur `/` : la cible dépend du navigateur, elle ne doit pas être mise en cache.
  if (redirect.status === 307) {
    response.headers.set('Vary', 'Accept-Language');
    response.headers.set('Cache-Control', 'private, no-store');
  }

  return response;
}

export const config = {
  // Ni les internes Next, ni l'API, ni les fichiers (sitemap.xml, icônes, captures /projets/<slug>/*.webp).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
