/** Sans import de `next/root-params` : utilisable par `proxy.ts` et les composants client. */
export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function hasLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/** `fr` si le navigateur le préfère strictement à l'anglais (à qualité égale, le premier cité gagne), sinon `en`. */
export function preferredLocale(header: string | null): Locale {
  const best: Record<Locale, { q: number; index: number }> = {
    fr: { q: 0, index: Infinity },
    en: { q: 0, index: Infinity },
  };

  (header ?? '').split(',').forEach((entry, index) => {
    const [tag, ...params] = entry.trim().toLowerCase().split(';');
    const base = tag.split('-')[0];

    if (!hasLocale(base)) {
      return;
    }

    const qParam = params.map((param) => param.trim()).find((param) => param.startsWith('q='));
    const q = qParam === undefined ? 1 : Number(qParam.slice(2));

    if (Number.isNaN(q) || q <= best[base].q) {
      return;
    }

    best[base] = { q, index };
  });

  const { fr, en } = best;

  return fr.q > en.q || (fr.q > 0 && fr.q === en.q && fr.index < en.index) ? 'fr' : 'en';
}

/** Ancres des sections de l'accueil, traduites. Ici et non dans les dictionnaires : le proxy et la navigation (client) en ont besoin. */
export const sectionKeys = ['about', 'experience', 'projects', 'education'] as const;
export type SectionKey = (typeof sectionKeys)[number];
export const sectionIds: Record<Locale, Record<SectionKey, string>> = {
  fr: { about: 'a-propos', experience: 'experience', projects: 'projets', education: 'formations' },
  en: { about: 'about', experience: 'experience', projects: 'projects', education: 'education' },
};

/**
 * Redirection du proxy, ou `null` si le chemin est déjà bon.
 * - `/` : langue du navigateur, en 307 (la cible dépend du visiteur).
 * - Autre chemin sans langue : ancienne URL, qui n'existait qu'en français, donc 308 vers `/fr`.
 * - `projets` devient `projects`, et `/<lang>/projects` (pas de page d'index) renvoie à l'ancre Projets.
 */
export function redirectFor(
  pathname: string,
  acceptLanguage: string | null,
): { location: string; status: 307 | 308 } | null {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return { location: `/${preferredLocale(acceptLanguage)}`, status: 307 };
  }

  const lang = hasLocale(segments[0]) ? segments[0] : 'fr';
  const path = (hasLocale(segments[0]) ? segments.slice(1) : segments).map((segment, index) =>
    index === 0 && segment === 'projets' ? 'projects' : segment,
  );

  if (path.length === 1 && path[0] === 'projects') {
    return { location: `/${lang}#${sectionIds[lang].projects}`, status: 308 };
  }

  const location = `/${[lang, ...path].join('/')}`;

  return location === pathname ? null : { location, status: 308 };
}

export function switchLocalePath(pathname: string, target: Locale): string {
  return pathname.replace(/^\/[^/]+/, `/${target}`);
}
