import type { Locale } from '@root/lib/locales';

/** Libellés de `app/[lang]/error.tsx`, composant client : séparés du dictionnaire pour ne pas l'embarquer dans le bundle. */
export const errorLabels: Record<Locale, { title: string; body: string; back: string }> = {
  fr: {
    title: 'Erreur serveur',
    body: 'Une erreur inattendue est survenue. Veuillez réessayer ultérieurement.',
    back: "Retour à l'accueil",
  },
  en: {
    title: 'Server error',
    body: 'Something went wrong on our side. Please try again later.',
    back: 'Back to home',
  },
};
