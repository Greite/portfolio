# CLAUDE.md

Portfolio personnel (Next.js 16 / React 19 / Tailwind 4). Package manager : **bun**.

## Commands

```bash
bun run dev     # serveur de dev
bun run build   # build de prod (Turbopack, standalone)
bun run lint    # tsc --noEmit + biome check + biome format (à lancer avant de conclure)
```

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
