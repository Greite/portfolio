// Self-check : `bun lib/locales.check.ts`
import assert from 'node:assert/strict';

import { preferredLocale, redirectPath, switchLocalePath } from './locales';

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

assert.equal(redirectPath('/', 'fr'), '/fr');
assert.equal(redirectPath('/projets/speedtest-monitor', 'en'), '/en/projects/speedtest-monitor');
assert.equal(redirectPath('/projets', 'en'), '/en/projects');
assert.equal(redirectPath('/projects/x', 'fr'), '/fr/projects/x');
assert.equal(redirectPath('/frontend', 'en'), '/en/frontend');
assert.equal(redirectPath('/fr', 'en'), null);
assert.equal(redirectPath('/en/projects/x', 'fr'), null);

assert.equal(switchLocalePath('/fr/projects/x', 'en'), '/en/projects/x');
assert.equal(switchLocalePath('/en', 'fr'), '/fr');

// biome-ignore lint/suspicious/noConsole: verdict du self-check
console.log('locales: ok');
