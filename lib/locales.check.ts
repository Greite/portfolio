// Self-check : `bun lib/locales.check.ts`
import assert from 'node:assert/strict';

import { preferredLocale, redirectFor, switchLocalePath } from './locales';

assert.equal(preferredLocale('fr-FR,en;q=0.8'), 'fr');
assert.equal(preferredLocale('de,fr;q=0.5'), 'fr');
assert.equal(preferredLocale('en,fr'), 'en');
assert.equal(preferredLocale('en;q=0.5,fr;q=0.5'), 'en'); // égalité : le premier cité gagne
assert.equal(preferredLocale('fr;q=0.5,en;q=0.5'), 'fr');
assert.equal(preferredLocale('FR-fr'), 'fr');
assert.equal(preferredLocale('fr;q=0,en;q=0.1'), 'en');
assert.equal(preferredLocale('fr;q=abc'), 'en'); // q invalide : entrée ignorée
assert.equal(preferredLocale('*'), 'en');
assert.equal(preferredLocale('de'), 'en');
assert.equal(preferredLocale(''), 'en');
assert.equal(preferredLocale(null), 'en');

const to = (pathname: string, acceptLanguage: string | null = null) => redirectFor(pathname, acceptLanguage);

// Racine : langue du navigateur, temporaire.
assert.deepEqual(to('/', 'fr-FR'), { location: '/fr', status: 307 });
assert.deepEqual(to('/'), { location: '/en', status: 307 });
// Anciennes URL (françaises) : toujours /fr, permanent, quelle que soit la langue du navigateur.
assert.deepEqual(to('/projets/speedtest-monitor', 'en'), { location: '/fr/projects/speedtest-monitor', status: 308 });
assert.deepEqual(to('/projets', 'en'), { location: '/fr#projets', status: 308 });
assert.deepEqual(to('/frontend'), { location: '/fr/frontend', status: 308 });
// Chemins déjà préfixés.
assert.equal(to('/fr'), null);
assert.equal(to('/en/projects/x'), null);
assert.deepEqual(to('/fr/projets/x'), { location: '/fr/projects/x', status: 308 });
assert.deepEqual(to('/en/projects'), { location: '/en#projects', status: 308 });
assert.deepEqual(to('/fr/projects'), { location: '/fr#projets', status: 308 });

assert.equal(switchLocalePath('/fr/projects/x', 'en'), '/en/projects/x');
assert.equal(switchLocalePath('/en', 'fr'), '/fr');

// biome-ignore lint/suspicious/noConsole: verdict du self-check
console.log('locales: ok');
