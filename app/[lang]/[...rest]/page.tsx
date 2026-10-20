import { notFound } from 'next/navigation';

/** URL préfixée inconnue : passe par `[lang]/not-found.tsx`, dans la langue de l'URL, plutôt que par la 404 brute de Next. */
export default function CatchAll() {
  notFound();
}
