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

/** Chemin cible du proxy, ou `null` si le premier segment est déjà une langue. `/projets` devient `/projects`. */
export function redirectPath(pathname: string, lang: Locale): string | null {
  const [, first = '', ...rest] = pathname.split('/');

  if (hasLocale(first)) {
    return null;
  }

  const segments = [first === 'projets' ? 'projects' : first, ...rest].filter(Boolean);

  return `/${[lang, ...segments].join('/')}`;
}

export function switchLocalePath(pathname: string, target: Locale): string {
  return pathname.replace(/^\/[^/]+/, `/${target}`);
}
