import { preferredLocale, redirectPath } from '@root/lib/locales';
import { type NextRequest, NextResponse } from 'next/server';

/** 307 et non 308 : la cible dépend du navigateur du visiteur, une redirection permanente mise en cache figerait sa langue. */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const target = redirectPath(pathname, preferredLocale(request.headers.get('accept-language')));

  if (target === null) {
    return NextResponse.next();
  }

  const response = NextResponse.redirect(new URL(`${target}${search}`, request.url), 307);
  response.headers.set('Vary', 'Accept-Language');
  response.headers.set('Cache-Control', 'private, no-store');

  return response;
}

export const config = {
  // Ni les internes Next, ni l'API, ni les fichiers (sitemap.xml, icônes, captures /projets/<slug>/*.webp).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
