import { en } from '@root/dictionaries/en';
import { type Dictionary, fr } from '@root/dictionaries/fr';
import { hasLocale, type Locale } from '@root/lib/locales';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { lang } from 'next/root-params';

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export const ogLocale: Record<Locale, string> = { fr: 'fr_FR', en: 'en_US' };

export async function getLang(): Promise<Locale> {
  const value = await lang();

  if (!hasLocale(value)) {
    notFound();
  }

  return value;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLang()];
}

/** `path` sans préfixe de langue : `''` pour l'accueil, `/projects/<slug>`. */
export function alternates(lang: Locale, path: string): Metadata['alternates'] {
  return {
    canonical: `/${lang}${path}`,
    languages: { fr: `/fr${path}`, en: `/en${path}`, 'x-default': `/en${path}` },
  };
}
