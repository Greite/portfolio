# Design — CI quotidienne de mise à jour des dépendances

**Date** : 2026-07-09
**Statut** : validé

## Objectif

Automatiser le flux de mise à jour des dépendances effectué jusqu'ici à la main
(`bun update` → `biome migrate` → lint → build → commit), via un workflow GitHub
Actions exécuté chaque jour.

## Décisions

| Sujet | Décision |
|---|---|
| Outil | Workflow GitHub Actions custom (Renovate et Dependabot écartés : pas de hook post-update pour `biome migrate`, pas de commit direct sur `main`) |
| Résultat si vert | Commit direct sur `main` |
| Résultat si rouge | PR avec la branche de mise à jour |
| Périmètre | Minor + patch dans les plages semver du `package.json` ; majeures signalées par issue, jamais appliquées |
| Schéma Biome | `bunx biome migrate --write` exécuté à chaque run (no-op si déjà aligné) |

## Workflow `.github/workflows/update-deps.yml`

### Déclenchement

- `schedule` : cron `0 5 * * *` (6h–7h heure de Paris selon la saison)
- `workflow_dispatch` : lancement manuel (utilisé aussi pour la recette)
- `concurrency` : groupe dédié, pas de runs simultanés
- Permissions : `contents: write`, `issues: write`, `pull-requests: write`

### Garde d'entrée

Si une PR ouverte porte le label `dependencies` (échec d'un run précédent non
traité), le run s'arrête immédiatement, sans erreur. On n'empile pas de
mises à jour tant que l'échec n'est pas résolu.

### Flux principal

Setup identique à `build.yml` : checkout, Node via `.nvmrc`, Bun, cache Bun,
`bun install --frozen-lockfile`.

1. `bun update` — met à jour minor/patch dans les plages caret
2. `bunx biome migrate --write` — aligne le schéma de `biome.json`
3. Si `git status --porcelain` est vide → étape « Majeures » directement
4. Sinon `bun run lint` puis `bun run build` :
   - **Vert** : commit sur `main` — message
     `Config - #PRT-NoId - Bump dependencies (<paquets>)` où `<paquets>` est
     la liste des dépendances modifiées extraite du diff de `package.json`
     (ou `lockfile` si seul `bun.lock` a changé). Auteur :
     `github-actions[bot]`.
   - **Rouge** : branche `chore/deps-update-<YYYY-MM-DD>`, commit, push, PR
     vers `main` avec label `dependencies`, titre au format
     `Config - #PRT-NoId - Bump dependencies (<paquets>)` et corps contenant
     le lien vers le run en échec et l'étape fautive (lint ou build). Le job
     se termine ensuite en échec pour que le run apparaisse rouge dans
     Actions (et déclenche la notification GitHub standard). La détection
     des majeures n'est pas exécutée dans ce cas.

### Détection des majeures

Après le flux principal (que le run soit vert ou sans changement) :

- Parser la sortie de `bun outdated` ; pour chaque paquet dont le major de
  « Latest » dépasse celui de « Current », ouvrir une issue
  `Major update available: <pkg> <current> → <latest>` avec label
  `dependencies`.
- Dédoublonnage par titre exact : si une issue ouverte porte le même titre,
  ne rien créer.

## Contraintes et remarques

- Les pushes effectués avec `GITHUB_TOKEN` ne déclenchent pas d'autres
  workflows. Sans impact ici : `build.yml` ne se déclenche que sur les tags.
- Le label `dependencies` doit exister (il est fourni par défaut sur GitHub).
- En cas d'échec du job lui-même (réseau, registry npm), la notification
  d'échec de workflow standard de GitHub suffit.

## Recette

1. Déclencher manuellement via `workflow_dispatch`.
2. Cas nominal attendu au premier run : soit « aucun changement », soit un
   commit de bump sur `main` avec lint + build verts.
3. Vérifier qu'aucune issue de majeure n'est créée en doublon sur un second
   run manuel.
