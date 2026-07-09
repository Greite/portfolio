# CI quotidienne de mise à jour des dépendances — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Un workflow GitHub Actions quotidien qui met à jour les dépendances (minor/patch), et si tout est vert, committe sur `main`, bump la version (patch), tague, crée la release GitHub et déclenche le build Docker ; en cas d'échec il ouvre une PR ; les majeures disponibles sont signalées par issue.

**Architecture:** Un nouveau workflow `update-deps.yml` en deux jobs — `guard` (s'arrête si une PR d'échec précédente est ouverte) et `update` (bun update → biome migrate → lint → build → release complète ou PR d'échec, puis détection des majeures). `build.yml` reçoit un déclencheur `workflow_dispatch` car les tags poussés avec `GITHUB_TOKEN` ne déclenchent aucun workflow : la CI le lance explicitement sur la ref du tag.

**Tech Stack:** GitHub Actions, bun, Biome, gh CLI, jq, awk. Spec : `docs/superpowers/specs/2026-07-09-daily-deps-update-design.md`.

## Global Constraints

- Convention de commit : `<Type> - #PRT-NoId - <description>` — type `Config` pour tout ce plan.
- Release : commit dédié `Config - #PRT-NoId - Bump version to X.Y.Z`, tag annoté `vX.Y.Z`, notes de release = uniquement `**Full Changelog**: https://github.com/Greite/portfolio/compare/<tagPrécédent>...vX.Y.Z`.
- Bump de version pour un bump de dépendances : incrément **patch**.
- Style des workflows aligné sur `.github/workflows/build.yml` existant (checkout@v4, setup-node@v4 + `.nvmrc`, setup-bun@v2, cache bun identique).
- Auteur des commits CI : `github-actions[bot]` / `41898282+github-actions[bot]@users.noreply.github.com`.
- Label GitHub utilisé partout (PRs d'échec et issues de majeures) : `dependencies`.

---

### Task 1: Label `dependencies` + déclencheur `workflow_dispatch` sur `build.yml`

**Files:**
- Modify: `.github/workflows/build.yml:3-6` (bloc `on:`)

**Interfaces:**
- Produces: label GitHub `dependencies` (utilisé par le guard, les PRs d'échec et les issues de majeures de la Task 2) ; `build.yml` déclenchable via `gh workflow run build.yml --ref <tag>`.

- [ ] **Step 1: Créer le label `dependencies` (idempotent)**

```bash
gh label create dependencies --description "Mises à jour de dépendances" --color 0366d6 --force
```

Expected: sortie silencieuse ou confirmation de création. Vérifier :

```bash
gh label list --search dependencies
```

Expected: une ligne `dependencies`.

- [ ] **Step 2: Ajouter `workflow_dispatch` à `build.yml`**

Dans `.github/workflows/build.yml`, remplacer :

```yaml
on:
  push:
    tags:
      - 'v*.*.*'
```

par :

```yaml
on:
  push:
    tags:
      - 'v*.*.*'
  workflow_dispatch:
```

- [ ] **Step 3: Valider la syntaxe**

```bash
command -v actionlint >/dev/null || brew install actionlint
actionlint .github/workflows/build.yml
```

Expected: aucune sortie (exit 0).

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/build.yml
git commit -m "Config - #PRT-NoId - Allow manual dispatch of build workflow"
```

---

### Task 2: Workflow `update-deps.yml`

**Files:**
- Create: `.github/workflows/update-deps.yml`

**Interfaces:**
- Consumes: label `dependencies` et `workflow_dispatch` sur `build.yml` (Task 1).
- Produces: workflow `update-deps.yml` dispatchable manuellement (utilisé par la recette, Tasks 3–4).

- [ ] **Step 1: Tester localement le parsing des majeures (test d'abord)**

Créer le fixture `/private/tmp/claude-501/-Users-g-painteaux-Projects-perso-portfolio/0f4b9fdd-748f-451e-86c7-1b0437c8729e/scratchpad/outdated-fixture.txt` avec le format exact de `bun outdated` (dont un paquet `(dev)`, une majeure, une minor et un scoped) :

```
bun outdated v1.3.14 (0d9b296a)
|----------------------------------------------------|
| Package              | Current | Update  | Latest  |
|----------------------|---------|---------|---------|
| next                 | 16.2.9  | 16.2.10 | 16.2.10 |
|----------------------|---------|---------|---------|
| react                | 19.2.7  | 19.2.7  | 20.1.3  |
|----------------------|---------|---------|---------|
| @biomejs/biome (dev) | 2.5.2   | 2.5.3   | 3.0.1   |
|----------------------------------------------------|
```

Exécuter le script awk (le même que dans le workflow, Step 3) :

```bash
awk -F'|' '
  NF >= 6 && $2 !~ /^[- ]*$/ && $2 !~ /Package/ {
    pkg = $2; current = $3; latest = $5
    gsub(/^ +| +$/, "", pkg); sub(/ \(dev\)$/, "", pkg)
    gsub(/ /, "", current); gsub(/ /, "", latest)
    split(current, c, "."); split(latest, l, ".")
    if (l[1] + 0 > c[1] + 0) print pkg "|" current "|" latest
  }' /private/tmp/claude-501/-Users-g-painteaux-Projects-perso-portfolio/0f4b9fdd-748f-451e-86c7-1b0437c8729e/scratchpad/outdated-fixture.txt
```

Expected — exactement deux lignes (la minor `next` exclue, le suffixe ` (dev)` retiré) :

```
react|19.2.7|20.1.3
@biomejs/biome|2.5.2|3.0.1
```

- [ ] **Step 2: Tester localement le bump de version patch**

```bash
echo "4.8.1" | awk -F. '{printf "%d.%d.%d", $1, $2, $3 + 1}'
```

Expected: `4.8.2`.

- [ ] **Step 3: Écrire `.github/workflows/update-deps.yml`**

Contenu complet :

```yaml
name: Update Dependencies

on:
  schedule:
    - cron: '0 5 * * *'
  workflow_dispatch:

concurrency:
  group: update-deps
  cancel-in-progress: false

permissions:
  contents: write
  issues: write
  pull-requests: write
  actions: write

jobs:
  guard:
    runs-on: ubuntu-latest
    outputs:
      skip: ${{ steps.check.outputs.skip }}
    steps:
      - name: Skip if a failed update PR is still open
        id: check
        env:
          GH_TOKEN: ${{ github.token }}
        run: |
          count=$(gh pr list --repo "$GITHUB_REPOSITORY" --state open --label dependencies --json number --jq 'length')
          if [ "$count" -gt 0 ]; then
            echo "skip=true" >> "$GITHUB_OUTPUT"
            echo "::notice::Une PR de mise à jour est encore ouverte, run ignoré."
          else
            echo "skip=false" >> "$GITHUB_OUTPUT"
          fi

  update:
    needs: guard
    if: needs.guard.outputs.skip == 'false'
    runs-on: ubuntu-latest
    env:
      GH_TOKEN: ${{ github.token }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest

      - name: Setup Bun cache
        uses: actions/cache@v4
        with:
          path: ~/.bun/install/cache
          key: ${{ runner.os }}-bun-store-${{ hashFiles('**/bun.lock') }}
          restore-keys: |
            ${{ runner.os }}-bun-store-

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Update dependencies (semver ranges)
        run: bun update

      - name: Migrate Biome config
        run: bunx biome migrate --write

      - name: Detect changes
        id: changes
        run: |
          if [ -z "$(git status --porcelain)" ]; then
            echo "changed=false" >> "$GITHUB_OUTPUT"
            echo "::notice::Aucune mise à jour disponible."
          else
            echo "changed=true" >> "$GITHUB_OUTPUT"
          fi

      - name: List updated packages
        id: pkgs
        if: steps.changes.outputs.changed == 'true'
        run: |
          git show HEAD:package.json > /tmp/package.old.json
          pkgs=$(jq -r --slurpfile old /tmp/package.old.json '
            ((.dependencies // {}) + (.devDependencies // {})) as $new
            | (($old[0].dependencies // {}) + ($old[0].devDependencies // {})) as $prev
            | $new | to_entries | map(select($prev[.key] != .value) | .key) | join(", ")
          ' package.json)
          if [ -z "$pkgs" ]; then pkgs="lockfile"; fi
          echo "list=$pkgs" >> "$GITHUB_OUTPUT"

      - name: Configure git author
        if: steps.changes.outputs.changed == 'true'
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

      - name: Lint (tsc + Biome)
        id: lint
        if: steps.changes.outputs.changed == 'true'
        continue-on-error: true
        run: bun run lint

      - name: Build project
        id: build
        if: steps.changes.outputs.changed == 'true' && steps.lint.outcome == 'success'
        continue-on-error: true
        run: bun run build

      - name: Commit, tag, release and dispatch Docker build
        if: steps.changes.outputs.changed == 'true' && steps.lint.outcome == 'success' && steps.build.outcome == 'success'
        run: |
          git add package.json bun.lock biome.json
          git commit -m "Config - #PRT-NoId - Bump dependencies (${{ steps.pkgs.outputs.list }})"

          current=$(jq -r .version package.json)
          next=$(echo "$current" | awk -F. '{printf "%d.%d.%d", $1, $2, $3 + 1}')
          sed -i "s/\"version\": \"$current\"/\"version\": \"$next\"/" package.json
          git add package.json
          git commit -m "Config - #PRT-NoId - Bump version to $next"

          prev_tag=$(git describe --tags --abbrev=0)
          git tag -a "v$next" -m "v$next - Bump dependencies"
          git push origin main
          git push origin "v$next"

          gh release create "v$next" --title "v$next" \
            --notes "**Full Changelog**: https://github.com/$GITHUB_REPOSITORY/compare/$prev_tag...v$next"

          gh workflow run build.yml --ref "v$next"

      - name: Open PR on failure
        if: steps.changes.outputs.changed == 'true' && (steps.lint.outcome == 'failure' || steps.build.outcome == 'failure')
        run: |
          failed_step="lint"
          if [ "${{ steps.lint.outcome }}" = "success" ]; then failed_step="build"; fi

          branch="chore/deps-update-$(date -u +%F)"
          git checkout -b "$branch"
          git add package.json bun.lock biome.json
          git commit -m "Config - #PRT-NoId - Bump dependencies (${{ steps.pkgs.outputs.list }})"
          git push --force origin "$branch"

          body=$(printf "La mise à jour quotidienne des dépendances a échoué à l'étape **%s**.\n\nRun en échec : %s/%s/actions/runs/%s" \
            "$failed_step" "$GITHUB_SERVER_URL" "$GITHUB_REPOSITORY" "$GITHUB_RUN_ID")
          gh pr create --base main --head "$branch" \
            --title "Config - #PRT-NoId - Bump dependencies (${{ steps.pkgs.outputs.list }})" \
            --label dependencies \
            --body "$body"

          echo "::error::L'étape ${failed_step} a échoué après mise à jour des dépendances."
          exit 1

      - name: Detect available major updates
        run: |
          bun outdated > /tmp/outdated.txt || true
          awk -F'|' '
            NF >= 6 && $2 !~ /^[- ]*$/ && $2 !~ /Package/ {
              pkg = $2; current = $3; latest = $5
              gsub(/^ +| +$/, "", pkg); sub(/ \(dev\)$/, "", pkg)
              gsub(/ /, "", current); gsub(/ /, "", latest)
              split(current, c, "."); split(latest, l, ".")
              if (l[1] + 0 > c[1] + 0) print pkg "|" current "|" latest
            }' /tmp/outdated.txt > /tmp/majors.txt

          while IFS='|' read -r pkg current latest; do
            [ -z "$pkg" ] && continue
            title="Major update available: $pkg $current → $latest"
            existing=$(gh issue list --state open --label dependencies --json title \
              | jq --arg pkg "$pkg" '[.[] | select(.title | startswith("Major update available: " + $pkg + " "))] | length')
            if [ "$existing" -eq 0 ]; then
              body=$(printf "Une nouvelle version majeure est disponible : %s %s → %s.\n\nDétectée par le workflow update-deps (%s/%s/actions/runs/%s). À appliquer manuellement." \
                "$pkg" "$current" "$latest" "$GITHUB_SERVER_URL" "$GITHUB_REPOSITORY" "$GITHUB_RUN_ID")
              gh issue create --title "$title" --label dependencies --body "$body"
            fi
          done < /tmp/majors.txt
```

- [ ] **Step 4: Valider la syntaxe**

```bash
actionlint .github/workflows/update-deps.yml
```

Expected: aucune sortie (exit 0). Corriger toute erreur signalée avant de continuer.

- [ ] **Step 5: Commit et push (avec la Task 1)**

```bash
git add .github/workflows/update-deps.yml
git commit -m "Config - #PRT-NoId - Add daily dependencies update workflow"
git push origin main
```

- [ ] **Step 6: Vérifier que GitHub voit le workflow**

```bash
gh workflow list
```

Expected: `Update Dependencies` apparaît dans la liste (en plus de `Build on Tag`).

---

### Task 3: Recette — chemin nominal complet

**Files:**
- Modify: aucun (recette). Le working tree contient des bumps non commités d'hier (`package.json`, `bun.lock`, `biome.json`) qui seront **volontairement écartés** : la CI va les recréer elle-même, c'est le test réel.

**Interfaces:**
- Consumes: workflow `Update Dependencies` poussé sur `main` (Task 2).

- [ ] **Step 1: Écarter les bumps locaux non commités**

⚠️ Destructif mais sans perte réelle : la CI recrée ces mêmes mises à jour (potentiellement plus récentes) dans la foulée.

```bash
git restore package.json bun.lock biome.json
bun install
git status --short
```

Expected: working tree propre (hors fichiers non suivis éventuels).

- [ ] **Step 2: Déclencher le workflow et suivre le run**

```bash
gh workflow run update-deps.yml
sleep 5
gh run list --workflow=update-deps.yml --limit 1
gh run watch $(gh run list --workflow=update-deps.yml --limit 1 --json databaseId --jq '.[0].databaseId') --exit-status
```

Expected: run vert. Le job `guard` passe (pas de PR ouverte), le job `update` détecte des changements, lint + build verts, étape release exécutée.

- [ ] **Step 3: Vérifier les commits, le tag et la release**

```bash
git pull --tags
git log --oneline -3
gh release view v4.8.2
```

Expected: deux commits de `github-actions[bot]` — `Config - #PRT-NoId - Bump dependencies (...)` puis `Config - #PRT-NoId - Bump version to 4.8.2` — le tag `v4.8.2`, et une release dont les notes contiennent uniquement `**Full Changelog**: https://github.com/Greite/portfolio/compare/v4.8.1...v4.8.2`. (Si d'autres versions sont sorties entre-temps, la liste des paquets peut différer de next/biome/@types/node — c'est normal.)

- [ ] **Step 4: Vérifier que le build Docker a été déclenché sur le tag**

```bash
gh run list --workflow=build.yml --limit 1 --json displayTitle,headBranch,status,conclusion,event
```

Expected: un run avec `headBranch: v4.8.2`, `event: workflow_dispatch`, qui se termine en `success` (suivre avec `gh run watch` si besoin). L'image `ghcr.io/greite/portfolio` reçoit les tags `4.8.2`, `4.8`, `4` et `sha-*`.

- [ ] **Step 5: Vérifier l'absence d'issues parasites**

```bash
gh issue list --label dependencies
```

Expected: vide (aucune majeure disponible à ce jour — sinon, vérifier que l'issue correspond à une vraie majeure).

---

### Task 4: Recette — chemin « aucun changement » et dédoublonnage

**Files:**
- Modify: aucun (recette).

**Interfaces:**
- Consumes: run vert de la Task 3 (les dépendances sont désormais à jour).

- [ ] **Step 1: Relancer le workflow immédiatement**

```bash
gh workflow run update-deps.yml
sleep 5
gh run watch $(gh run list --workflow=update-deps.yml --limit 1 --json databaseId --jq '.[0].databaseId') --exit-status
```

Expected: run vert et rapide. Annotation `Aucune mise à jour disponible.` sur l'étape `Detect changes` ; étapes lint/build/release/PR toutes skippées ; étape majeures exécutée.

- [ ] **Step 2: Vérifier qu'aucun doublon n'a été créé**

```bash
git fetch --tags origin
git tag --list 'v4.8.*'
gh issue list --label dependencies
gh pr list --label dependencies
```

Expected: toujours un seul tag `v4.8.2` (pas de `v4.8.3`), pas de nouvelle issue, pas de PR.
