import type { Locale } from '@root/lib/locales';

/** Libellés de `app/[lang]/error.tsx`, composant client : séparés du dictionnaire pour ne pas l'embarquer dans le bundle. */
export const errorLabels: Record<Locale, { title: string; body: string; back: string }> = {
  fr: {
    title: 'Une erreur est survenue',
    body: "Un problème inattendu s'est produit. Veuillez réessayer ultérieurement.",
    back: "Retour à l'accueil",
  },
  en: {
    title: 'Something went wrong',
    body: 'An unexpected error occurred. Please try again later.',
    back: 'Back to home',
  },
};
