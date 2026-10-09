# Priorités de review - portfolio

Reviewer d'un portfolio Next.js 16 en une page, public, servi depuis une image Docker publiée sur GHCR. Le contexte contributeur est dans `AGENTS.md`. Vérifier le code avant d'affirmer ; signaler d'abord ce qui casse la mise en ligne ou publie une donnée qui ne devait pas l'être, puis ce qui dégrade l'accessibilité. Le pur style reste un `nit`.

## Blocker : la mise en ligne casse

- **Erreur de type masquée.** `ignoreBuildErrors: true` dans `next.config.ts` : un build vert ne prouve rien sur les types. Seul `bun run lint` compte.
- **Image Docker.** Le conteneur démarre en root, `docker-entrypoint.sh` remappe `nextjs` sur `PUID`/`PGID`, fait `chown` de `/app/.next` puis `su-exec`. Un `USER` ajouté au `Dockerfile`, un travail root placé après le `su-exec`, ou un fichier écrit à l'exécution hors de `/app/.next` est un blocker.
- **Healthcheck.** `HEALTHCHECK` appelle `/api/health` avec `wget` : la route doit rester `force-dynamic`, sans dépendance, et répondre 200.
- **Release automatique.** `update-deps.yml` pousse sur `main`, tagge et publie sans humain. Un changement qui fait passer lint et build à tort (étape retirée, `continue-on-error` élargi, fichier ajouté au `git add`) publie une release cassée.
- **Version et tag désaccordés.** `package.json` `version` = tag sans `v`, bumpée dans un commit dédié avant le tag.

## Concern : données publiées

- **Dépôt public et site indexé.** Pas de nom de machine, de conteneur, d'adresse privée ni de contexte homelab dans le code, les commentaires, les docs ou les messages de commit. L'adresse `contact@gauthierpainteaux.fr` et les liens LinkedIn/GitHub sont publics volontairement ; toute autre donnée personnelle ajoutée doit être voulue.
- **JSON-LD.** Les blocs de `app/layout.tsx` et `app/page.tsx` passent par `JSON.stringify` d'objets en dur. Y injecter une donnée qui ne vient pas du code est un blocker (`dangerouslySetInnerHTML`).
- **Liens externes.** `target="_blank"` toujours avec `rel="noopener noreferrer"`.

## Concern : oublis récurrents

- Expérience, poste, employeur ou techno modifié dans `components/` sans mettre à jour les JSON-LD (FAQ et `Person` : `worksFor`, `jobTitle`, `knowsAbout`) ni `siteDescription` dans `app/layout.tsx`.
- Projet ajouté ou retiré sans vérifier la grille de `components/Projects.tsx` : la carte « Tous mes projets » comble la case libre quand le nombre de projets est impair.
- Animation ajoutée sans variante `prefers-reduced-motion: reduce` dans `app/globals.css`, ou contenu masqué par `.reveal-pending` hors de `@media (scripting: enabled)` : il disparaît sans JS.
- Couleur en dur au lieu des tokens de `app/globals.css`, ou variante claire/sombre manquante (`data-theme`).
- Composant client (`'use client'`) qui n'a ni état ni effet ni API navigateur.
- Bouton ou lien icône sans `aria-label`, icône décorative sans `aria-hidden`.
- Texte de l'interface qui n'est pas en français.
- Bloc `nextjs-agent-rules` retiré d'`AGENTS.md` : `next dev` le réécrit.

## Preuves attendues avant « fini »

- `bun run lint` propre (ce que lance `build.yml`), puis `bun run build`.
- Un changement visuel se vérifie dans le navigateur, en clair et en sombre, en mobile et desktop ; pour une animation, aussi avec `prefers-reduced-motion: reduce`.
- Un changement du `Dockerfile` ou de `docker-entrypoint.sh` se vérifie par `docker build` puis un `docker run` qui atteint l'état `healthy`.
- Un changement de workflow se vérifie par un run réel (`workflow_dispatch`), pas par relecture seule.
- Commit `<Type> - #PRT-NoId - <description>`, sans trailer d'attribution. Release : notes = lien de comparaison uniquement.
