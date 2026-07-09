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
| Résultat si vert | Commit direct sur `main`, puis release complète : bump de version (patch), tag `vX.Y.Z`, release GitHub, build Docker |
| Déclenchement du build Docker | `workflow_dispatch` explicite sur `build.yml` (les tags poussés avec `GITHUB_TOKEN` ne déclenchent pas les workflows ; un PAT a été écarté pour éviter la gestion d'un secret) |
| Résultat si rouge | PR avec la branche de mise à jour |
| Périmètre | Minor + patch dans les plages semver du `package.json` ; majeures signalées par issue, jamais appliquées |
| Schéma Biome | `bunx biome migrate --write` exécuté à chaque run (no-op si déjà aligné) |

## Fichiers touchés

- `.github/workflows/update-deps.yml` — nouveau workflow (détaillé ci-dessous)
- `.github/workflows/build.yml` — ajout du déclencheur `workflow_dispatch`
  (aucun autre changement)

## Workflow `.github/workflows/update-deps.yml`

### Déclenchement

- `schedule` : cron `0 5 * * *` (6h–7h heure de Paris selon la saison)
- `workflow_dispatch` : lancement manuel (utilisé aussi pour la recette)
- `concurrency` : groupe dédié, pas de runs simultanés
- Permissions : `contents: write`, `issues: write`, `pull-requests: write`,
  `actions: write` (nécessaire pour `gh workflow run build.yml`)

### Garde d'entrée

Si une PR ouverte porte le label `dependencies` (échec d'un run précédent non
traité), le run s'arrête immédiatement, sans erreur. On n'empile pas de
mises à jour tant que l'échec n'est pas résolu.

### Flux principal

Setup identique à `build.yml` : checkout, Node via `.nvmrc`, Bun, cache Bun,
`bun install --frozen-lockfile`.

1. `bun update` — met à jour minor/patch dans les plages caret
2. `bun install` — resynchronise les plages embarquées dans `bun.lock`
   (quirk de bun 1.3.14 : `bun update` ne les réécrit pas ; sans ce resync,
   le run suivant verrait un faux changement lockfile et publierait une
   release parasite)
3. `bunx biome migrate --write` — aligne le schéma de `biome.json`
4. Si `git status --porcelain` est vide → étape « Majeures » directement
5. Sinon `bun run lint` puis `bun run build` :
   - **Vert** : la CI déroule le workflow de release du projet, en tant
     qu'auteur `github-actions[bot]` :
     1. Commit du bump —
        `Config - #PRT-NoId - Bump dependencies (<paquets>)` où `<paquets>`
        est la liste des dépendances modifiées extraite du diff de
        `package.json` (ou `lockfile` si seul `bun.lock` a changé).
     2. Commit dédié `Config - #PRT-NoId - Bump version to X.Y.Z` avec
        incrément **patch** de `version` dans `package.json`.
     3. Push sur `main`, tag annoté `vX.Y.Z`
        (message `vX.Y.Z - Bump dependencies`), push du tag.
     4. Release GitHub `vX.Y.Z` — notes : uniquement le lien de comparaison
        `**Full Changelog**: https://github.com/Greite/portfolio/compare/<tagPrécédent>...vX.Y.Z`.
     5. `gh workflow run build.yml --ref vX.Y.Z` pour lancer le build de
        l'image Docker (voir « Contraintes » : le push du tag seul ne
        déclencherait rien).
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
- Dédoublonnage par paquet : si une issue ouverte commence par
  `Major update available: <pkg> `, ne rien créer pour ce paquet (un titre
  exact ne suffirait pas : chaque patch de la majeure — 20.0.0 puis
  20.0.1 — changerait le titre et créerait un doublon).

## Contraintes et remarques

- Les pushes (commits **et tags**) effectués avec `GITHUB_TOKEN` ne
  déclenchent pas d'autres workflows. Conséquence : le tag poussé par la CI
  ne déclenche pas `build.yml` tout seul. Solution retenue : ajouter un
  déclencheur `workflow_dispatch` à `build.yml` et le lancer explicitement
  sur la ref du tag (`gh workflow run build.yml --ref vX.Y.Z`). Le
  `github.ref` du run pointe alors sur `refs/tags/vX.Y.Z`, ce que
  `docker/metadata-action` (`type=semver`) exploite normalement.
- Le label `dependencies` n'existe pas par défaut sur un repo GitHub : il
  est créé une fois lors de la mise en place (`gh label create`).
- En cas d'échec du job lui-même (réseau, registry npm), la notification
  d'échec de workflow standard de GitHub suffit.

## Recette

1. Déclencher manuellement via `workflow_dispatch`.
2. Cas nominal attendu au premier run : soit « aucun changement », soit la
   chaîne complète — commits de bump (deps + version) sur `main`, tag,
   release GitHub avec lien de comparaison, et run de `build.yml` déclenché
   sur le tag avec image Docker publiée sur ghcr.io aux bons tags semver.
3. Vérifier qu'aucune issue de majeure n'est créée en doublon sur un second
   run manuel.
