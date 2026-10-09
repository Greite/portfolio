# portfolio

Portfolio personnel (Next.js 16 / React 19 / Tailwind 4), dépôt public. Package manager : **bun**. Doc utilisateur dans `README.md` ; ce fichier couvre ce qu'il faut savoir en plus pour contribuer.

## Commands

```bash
bun run dev     # serveur de dev
bun run build   # build de prod (Turbopack, standalone)
bun run lint    # tsc --noEmit + biome check + biome format (à lancer avant de conclure)
```

## Pièges

- `next.config.ts` a `typescript.ignoreBuildErrors: true` : `bun run build` passe même avec des erreurs de type. `bun run lint` est le seul contrôle de types.
- `.github/workflows/update-deps.yml` tourne chaque jour : `bun update`, puis lint + build ; si tout passe, il commite sur `main`, bumpe le patch, tagge, publie la release et lance `build.yml`. Un échec ouvre une PR labellisée `dependencies` et bloque les runs suivants tant qu'elle est ouverte.
- Le contenu (expériences, projets, formations) est en dur dans `components/`. Les JSON-LD de `app/layout.tsx` et `app/page.tsx` (FAQ, employeur, `knowsAbout`) en répètent une partie et sont à mettre à jour avec.

## Commit convention

Format : `<Type> - #PRT-NoId - <description>` (ex. `Improve - #PRT-NoId - ...`, `Config - #PRT-NoId - ...`).
Types courants : `Improve` (features/UI), `Config` (deps, outillage, CI).

## Releases

- **Tags** : `vMAJOR.MINOR.PATCH` (ex. `v4.8.0`), créés sur `main`. Bump : feature → mineur, fix → patch, breaking → majeur.
- **Mettre à jour `package.json` `version` = version du tag (sans le `v`)** dans un commit dédié, avant de tagger.
- **Notes de release = uniquement le lien de comparaison** entre le tag précédent et le nouveau. Rien d'autre.

```bash
# 1. bump "version" dans package.json -> X.Y.Z, puis commit + push main
git commit -am "Config - #PRT-NoId - Bump version to X.Y.Z"
git push origin main
# 2. tag + push
git tag -a vX.Y.Z -m "vX.Y.Z - <résumé>"
git push origin vX.Y.Z
# 3. release (note = lien de comparaison uniquement)
gh release create vX.Y.Z --title "vX.Y.Z" \
  --notes "**Full Changelog**: https://github.com/Greite/portfolio/compare/<tagPrécédent>...vX.Y.Z"
```

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
