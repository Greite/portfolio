# Pages projets — plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Une page de présentation statique par projet (`/projets/<slug>`), alimentée par des données TS partagées avec la grille d'accueil et enrichie de données GitHub revalidées chaque jour.

**Architecture:** `lib/projects.ts` porte les données et le contenu ; `lib/github.ts` lit l'API publique GitHub avec `revalidate: 86400` ; une route dynamique `app/projets/[slug]/page.tsx` prérendue via `generateStaticParams` affiche le tout avec métadonnées et JSON-LD dédiés. L'accueil, la navigation, le footer et le sitemap sont adaptés.

**Tech Stack:** Next.js 16 (App Router, Turbopack, `output: 'standalone'`), React 19, Tailwind 4, `next/image` (sharp présent), `react-icons/lu`, bun.

**Spec:** `docs/superpowers/specs/2026-10-19-pages-projets-design.md`

## Global Constraints

- Aucune nouvelle dépendance (pas de MDX, pas de coloration syntaxique, pas de lightbox).
- Avant d'écrire du code Next, lire le guide concerné dans `node_modules/next/dist/docs/` (règle du dépôt). Typage des pages : `PageProps<'/projets/[slug]'>`, `params` est une `Promise`.
- Imports : alias `@root/lib/...` et `@components/...` (pas de nouvel alias).
- `cacheComponents` reste désactivé ; cache GitHub via `fetch(url, { next: { revalidate: 86400 } })`.
- Dépôt public : aucun nom de machine, IP privée, domaine interne, nom de conteneur tiers ni prénom, ni dans le code, ni dans les images, ni dans les commits.
- Texte en français, dates `Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' })`.
- Titre de page : `seoTitle` du projet (≤ 60 caractères ; à l'origine `<nom> · Gauthier Painteaux`, révisé après audit SEO). Person JSON-LD : `{ '@id': 'https://gauthierpainteaux.fr/#person' }`.
- `bun run lint` est le seul contrôle de types (le build ignore les erreurs TS) : le lancer à chaque tâche.
- Commits : `Improve - #PRT-NoId - <description>`, sans `-c user.*`, pas de push.
- Pas de suite de tests dans le dépôt, pas de test permanent ajouté : vérification par lint, build, `curl` et navigateur.

## Review Focus

1. **GitHub indisponible ou quota dépassé** → la page se rend, le bloc GitHub disparaît, aucune valeur inventée (Task 2, Step 3).
2. **Dépôt sans release** (aucun des 5 actuels n'en manque, d'où un test sur un dépôt tiers) → étoiles/licence/date affichées, version masquée (Task 2, Step 3).
3. **Slug inconnu** → statut HTTP 404 et page `not-found` existante (Task 3, Step 4).
4. **Carte d'accueil au clavier** → deux arrêts de focus distincts (page projet, puis GitHub), anneau de focus visible, pas de lien dans un lien (Task 4, Step 3).
5. **Changement de thème sur une page projet** → une seule version de chaque capture visible, bascule sans rechargement (Task 5, Step 5).

---

### Task 1: Module de données et contenu des projets

**Files:**
- Create: `lib/projects.ts`
- Modify: `components/Projects.tsx:1-49` (supprimer type et tableau, importer)

**Interfaces:**
- Produces:

  ```ts
  export interface Feature { title: string; description: string }
  export interface Screenshot { light: string; dark: string; alt: string } // chemins publics `/projets/<slug>/<fichier>.webp`, `light === dark` permis si l'outil n'a qu'un thème
  export interface CodeSample { language: string; code: string }
  export interface Project {
    slug: string; name: string; description: string; pitch: string;
    tags: string[]; repoUrl: string; features: Feature[];
    screenshots?: Screenshot[]; codeSample?: CodeSample;
  }
  export const projects: Project[];
  export function getProject(slug: string): Project | undefined;
  export function getAdjacentProjects(slug: string): { previous: Project; next: Project }; // circulaire
  ```

- [ ] **Step 1: Récupérer la matière de chaque README**

Run: `gh api repos/Greite/<repo>/readme -H 'Accept: application/vnd.github.raw'` pour `speedtest-monitor`, `ha-ravelli-smart-wifi`, `database-backup`, `unraid-btop`, `unraid-traefik-rolling-update`.
- [ ] **Step 2: Créer `lib/projects.ts`**

Reprendre à l'identique `name`, `description`, `tags`, `repoUrl` et l'ordre actuels de `components/Projects.tsx`. `slug` = dernier segment de `repoUrl`. Pour chaque projet, rédiger à partir du README (ton vitrine, pas copie) : `pitch` (2-3 phrases), `features` (4 à 6 entrées). `codeSample` pour **Database Backup** (extrait `docker-compose` ou sortie de log du README, noms remplacés par des valeurs neutres type `app-db`) ; aucun `screenshots` à ce stade (ajoutés en Task 5). Les autres projets n'ont temporairement ni capture ni `codeSample` : la page de la Task 3 doit le tolérer jusqu'à la Task 5.

`getAdjacentProjects` : index `i` du slug, `previous = projects[(i - 1 + n) % n]`, `next = projects[(i + 1) % n]`.
- [ ] **Step 3: Brancher `components/Projects.tsx`**

`import { projects } from '@root/lib/projects';`, supprimer l'interface et le tableau locaux. Rendu inchangé dans cette tâche.
- [ ] **Step 4: Vérifier**

Run: `bun run lint` → aucune erreur.
Run: `bun run dev` puis navigateur sur `/#projets` → grille identique à avant (5 cartes + « Tous mes projets »).
- [ ] **Step 5: Commit**

```bash
git add lib/projects.ts components/Projects.tsx
git commit -m "Improve - #PRT-NoId - Move projects data to lib and add showcase content"
```

### Task 2: Données GitHub

**Files:**
- Create: `lib/github.ts`

**Interfaces:**
- Produces:

  ```ts
  export interface RepoStats { stars: number; license?: string; pushedAt: string; latestRelease?: string }
  export async function getRepoStats(repoUrl: string): Promise<RepoStats | null>; // ne lève jamais
  ```

- [ ] **Step 1: Implémenter `getRepoStats`**

Extraire `owner/repo` de `repoUrl`. Deux `fetch` en parallèle vers `https://api.github.com/repos/{owner}/{repo}` et `.../releases/latest`, en-têtes `Accept: application/vnd.github+json`, `X-GitHub-Api-Version: 2022-11-28`, option `next: { revalidate: 86400 }`.
- Dépôt : `fetch` qui lève (réseau), `!res.ok` (403 quota, 404, 5xx) ou JSON illisible → `null`. Tout le corps est dans un `try/catch` : la fonction ne lève jamais, donc ni le rendu ni le build ne peuvent échouer à cause de GitHub. Sinon `stars = stargazers_count`, `license = license?.spdx_id` (omis si absent ou `NOASSERTION`), `pushedAt = pushed_at`.
- Release : `fetch` qui lève ou `!res.ok` (404 compris) → `latestRelease` omis, sans faire échouer l'ensemble.

- [ ] **Step 2: Vérifier les valeurs réelles**

Script jetable (`bun -e`, non commité) appelant `getRepoStats` sur les 5 `repoUrl` : chacun renvoie `stars` numérique, `license` (`MIT`, ou `GPL-2.0` pour traefik-rolling-update), `latestRelease` défini.

Note : hors runtime Next, l'option `next` est ignorée par `fetch`, sans effet sur ce contrôle.
- [ ] **Step 3: Vérifier les cas d'échec (Review Focus 1, 2)**

Même script jetable, `getRepoStats` appelé avec `https://github.com/Greite/speedtest-monitor` sauf mention :
- `globalThis.fetch` remplacé par une fonction qui lève `new TypeError('fetch failed')` → `null`, sans exception ;
- `globalThis.fetch` remplacé par `async () => new Response('{"message":"API rate limit exceeded"}', { status: 403 })` → `null` ;
- `globalThis.fetch` répondant 200 avec un JSON de dépôt valide pour `/repos/…` mais levant pour `/releases/latest` → objet sans `latestRelease` ;
- `fetch` réel, `https://github.com/Greite/depot-inexistant` → `null` ;
- `fetch` réel, `https://github.com/octocat/Hello-World` (sans release) → objet sans `latestRelease`.

Les `fetch` levés ou en 403 empêchent le rendu ou le build seulement si `getRepoStats` lève ; ces cas prouvent qu'elle ne lève pas. Le rendu avec `null` est contrôlé en Task 3, Step 4.
- [ ] **Step 4: Commit**

```bash
git add lib/github.ts
git commit -m "Improve - #PRT-NoId - Add GitHub repo stats fetcher"
```

### Task 3: Route des pages projet, métadonnées, JSON-LD, sitemap

**Files:**
- Create: `app/projets/[slug]/page.tsx`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: `projects`, `getProject`, `getAdjacentProjects` (Task 1) ; `getRepoStats` (Task 2).

- [ ] **Step 1: Lire la doc Next**

`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md`, `generate-metadata.md`, `03-file-conventions/dynamic-routes.md`.
- [ ] **Step 2: Implémenter la page**

- `export const dynamicParams = false;` `generateStaticParams` → `projects.map(({ slug }) => ({ slug }))`.
- `generateMetadata(props: PageProps<'/projets/[slug]'>)` selon la spec (section SEO) : `title`, `description`, `alternates.canonical: '/projets/<slug>'`, `openGraph` complet (`type: 'website'`, `siteName: 'Gauthier Painteaux'`, `locale: 'fr_FR'`, `url`, `title`, `description`, `images`), `twitter` complet (`summary_large_image` + `screenshots[0].light` si capture, sinon `summary` + `/photo.webp`).
- Page : `getProject` sinon `notFound()` ; `getRepoStats(project.repoUrl)`. Structure et ordre des blocs = spec, section « Page projet » (fil d'Ariane visible « Accueil › <nom> », en-tête, visuel principal, points forts, galerie si `screenshots.length > 1`, lien « Installation et documentation » vers `${repoUrl}#readme`, précédent/suivant via `getAdjacentProjects`). Lien d'évitement « Aller au contenu principal » + `<main id="main">` copiés de `app/page.tsx:59-70`. Réutiliser `Navigation`, `Footer`, `ScrollProgress`, `Reveal`, styles des cartes et tags de `components/Projects.tsx`.
- Visuel : `next/image` `width={1600} height={1000}` sur la première capture, version claire `dark:hidden`, sombre `hidden dark:block` ; pas de `preload` sur les deux variantes (lazy-loading + `fetchPriority="high"`), `preload` seulement pour une image unique. Sans capture : `codeSample` en `<pre><code>` monospace. Sans l'un ni l'autre (état transitoire Task 1-5) : pas de bloc visuel.
- Bloc GitHub rendu seulement si `stats !== null` ; version seulement si `latestRelease`.
- Deux `<script type="application/ld+json">` (`SoftwareSourceCode`, `BreadcrumbList` à 2 niveaux, dernier sans `item`) avec le commentaire `biome-ignore` de `app/page.tsx:54`.

- [ ] **Step 3: Étendre `app/sitemap.ts`**

Ajouter ``...projects.map(({ slug }) => ({ url: `https://gauthierpainteaux.fr/projets/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 }))``.
- [ ] **Step 4: Vérifier**

Run: `bun run lint` → aucune erreur.
Run: `bun run build` → les 5 routes `/projets/<slug>` listées comme prérendues (●/SSG).
Avec `bun run dev` :
- `curl -s -o /dev/null -w '%{http_code}' localhost:3000/projets/inconnu` → `404` (Review Focus 3).
- `curl -s localhost:3000/projets/speedtest-monitor` contient `<link rel="canonical" href="https://gauthierpainteaux.fr/projets/speedtest-monitor"`, `og:type" content="website"`, `twitter:title" content="Speedtest Monitor · Gauthier Painteaux"`, deux blocs `application/ld+json` dont le JSON se parse (`"@type":"SoftwareSourceCode"`, `"@type":"BreadcrumbList"`).
- `curl -s localhost:3000/sitemap.xml` → 6 `<loc>`.
- Navigateur : `/projets/database-backup` (bloc de code) et une page sans visuel ; précédent/suivant boucle du premier au dernier projet ; fil visible = JSON-LD.
- Remplacer temporairement un `repoUrl` par un dépôt inexistant → page rendue sans bloc GitHub ; annuler.

- [ ] **Step 5: Commit**

```bash
git add app/projets app/sitemap.ts
git commit -m "Improve - #PRT-NoId - Add project pages with metadata and JSON-LD"
```

### Task 4: Accueil, navigation, footer, README

**Files:**
- Modify: `components/Projects.tsx:67-112` (cartes)
- Modify: `components/Navigation.tsx:10-15` (`href` des liens)
- Modify: `components/Footer.tsx:30,36,42,48`
- Modify: `README.md:70-84`

- [ ] **Step 1: Carte d'accueil**

`<li>` → conteneur `relative` portant les classes de survol actuelles (`group`, translate, bordure, halo) sans être un lien. Titre `h3` contient ``<Link href={`/projets/${slug}`}>`` avec `after:absolute after:inset-0 after:rounded-2xl` et focus visible sur la carte. `LuArrowUpRight` → `LuArrowRight`. Le libellé `Greite/<repo>` devient un `<Link>` externe (`target="_blank"`, `rel="noopener noreferrer"`, `relative z-10`, `aria-label` « <nom> — code sur GitHub (ouvre dans un nouvel onglet) »). Carte « Tous mes projets » inchangée.
- [ ] **Step 2: Ancres**

`Navigation.tsx` : `href: '/#a-propos'` etc. (garder `id` sans `#`). `Footer.tsx` : mêmes `/#…`. La logique « section active » ne trouve aucune section hors accueil et laisse `activeId` à `null` : aucun changement requis, à confirmer au Step 3.
- [ ] **Step 3: Vérifier (Review Focus 4)**

Run: `bun run lint` → aucune erreur.
Navigateur, `bun run dev` :
- accueil : clic carte → `/projets/<slug>` même onglet ; clic `Greite/<repo>` → GitHub nouvel onglet ; Tab : deux arrêts par carte, anneau visible ; survol identique à avant ;
- depuis une page projet : liens navigation et footer → section de l'accueil ; aucun lien marqué actif sur la page projet ; sur l'accueil, l'état actif fonctionne toujours au scroll.

- [ ] **Step 4: README**

Ajouter à l'arborescence `app/projets/[slug]/page.tsx  # Pages projet`, `lib/projects.ts  # Données et contenu des projets`, `lib/github.ts  # Stats GitHub (revalidées chaque jour)`, `public/projets/  # Captures des projets`.
- [ ] **Step 5: Commit**

```bash
git add components/Projects.tsx components/Navigation.tsx components/Footer.tsx README.md
git commit -m "Improve - #PRT-NoId - Link project cards to project pages"
```

### Task 5: Captures (interactive)

**Files:**
- Create: `public/projets/<slug>/*.webp`
- Modify: `lib/projects.ts` (champs `screenshots`, éventuel `codeSample` de repli)

L'utilisateur fournit les URL en conversation (jamais écrites dans le dépôt ni dans ce plan) et se connecte lui-même dans l'onglet. Cibles : Speedtest Monitor (dashboard), Ravelli Smart Wi-Fi (carte/entités Home Assistant), Unraid btop (tuile dashboard + btop dans le terminal), Unraid Traefik Rolling Update (page du plugin ; si elle n'est pas parlante, `codeSample` de repli validé avec l'utilisateur).
- [ ] **Step 1: Capturer**

Onglet `browser` en viewport 1600×1000, thème clair puis sombre de l'outil quand il en a un (sinon une seule image, `light === dark`). Avant chaque capture, remplacer via `tab.run` dans le DOM toute donnée d'exploitation visible (nom de serveur, IP, domaine, noms de conteneurs/pièces/entités tiers, FAI) par des valeurs neutres.
- [ ] **Step 2: Convertir**

Script jetable (non commité) avec `sharp` : PNG → WebP qualité 80, 1600×1000, vers `public/projets/<slug>/<vue>-light.webp` / `-dark.webp`.
- [ ] **Step 3: Contrôler**

Ouvrir chaque WebP et le relire entièrement : aucune donnée listée dans Global Constraints. Toute image douteuse est montrée à l'utilisateur avant commit.
- [ ] **Step 4: Renseigner `screenshots`**

Ajouter les entrées dans `lib/projects.ts` (`alt` descriptif en français, la vue principale en premier).
- [ ] **Step 5: Vérifier (Review Focus 5)**

Run: `bun run lint` puis `bun run build` → aucune erreur.
Navigateur : chaque page en clair, sombre et mobile (390 px) ; bascule du thème sur une page projet → une seule version visible, sans rechargement ; galerie présente seulement au-delà d'une capture ; `curl` d'une page avec capture → `twitter:card" content="summary_large_image"` et `og:image` en URL absolue.
- [ ] **Step 6: Commit**

```bash
git add public/projets lib/projects.ts
git commit -m "Improve - #PRT-NoId - Add project screenshots"
```
