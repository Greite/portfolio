# Portfolio - Gauthier Painteaux

Portfolio personnel / CV en ligne accessible sur [gauthierpainteaux.fr](https://gauthierpainteaux.fr).

## Stack technique

- **Framework** : [Next.js](https://nextjs.org) 16 (App Router, standalone output)
- **Langage** : TypeScript (strict)
- **Styling** : Tailwind CSS 4
- **Linting / Formatting** : [Biome](https://biomejs.dev)
- **Package manager** : [Bun](https://bun.com)
- **Runtime** : Node LTS Krypton

## Getting started

```bash
bun install
bun dev
```

Le serveur de dev (Turbopack) tourne sur [localhost:3000](http://localhost:3000).

### Build de production

```bash
bun run build
bun start
```

## Scripts disponibles

| Commande                  | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `bun dev`                 | Serveur de dev avec Turbopack                          |
| `bun run build`           | Build de production (`run` requis, `bun build` reserve) |
| `bun start`               | Serveur de production (standalone)                     |
| `bun prod`                | Build + start                                          |
| `bun lint`                | `next typegen` + `tsc` + Biome check + Biome format    |
| `bun tsc`                 | Type-check TypeScript (`tsc --noEmit`)                 |
| `bun biome:check`         | Lint Biome (lecture seule)                             |
| `bun biome:check:write`   | Lint Biome + autofix                                   |
| `bun biome:format`        | Format Biome (lecture seule)                           |
| `bun biome:format:write`  | Format Biome + autofix                                 |
| `bun biome:write`         | Lint + format Biome avec autofix                       |

## Docker

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
# Unraid : uid/gid de l'utilisateur qui fait tourner le serveur
docker run -p 3000:3000 -e PUID=99 -e PGID=100 portfolio
```

L'image utilise un build multi-stage avec `node:krypton-alpine` et tourne avec un utilisateur non-root.

| Variable | Défaut | Description |
| -------- | ------ | ----------- |
| `PUID`   | `1001` | UID du serveur ; `/app/.next` est chowné dessus au démarrage (style linuxserver.io). Unraid : `99` |
| `PGID`   | `1001` | GID du serveur. Unraid : `100` |

## CI/CD

Le workflow GitHub Actions (`.github/workflows/build.yml`) se declenche sur les tags `v*.*.*` et :

1. Build le projet
2. Upload les artefacts
3. Build et push l'image Docker sur `ghcr.io`

## Structure du projet

```
app/
├── [lang]/               # Toutes les pages, en /fr et /en (rendu statique)
│   ├── layout.tsx        # Layout racine, metadata, hreflang, JSON-LD
│   ├── page.tsx          # Page d'accueil (CV)
│   ├── projects/[slug]/  # Pages projet (une par projet et par langue)
│   ├── [...rest]/        # URL inconnue -> 404 dans la langue de l'URL
│   ├── error.tsx         # Page d'erreur
│   └── not-found.tsx     # Page 404
├── globals.css           # Styles globaux + tokens Tailwind
└── sitemap.ts            # Sitemap bilingue
proxy.ts                  # Redirige (307) les URL sans langue selon Accept-Language
dictionaries/
├── fr.ts                 # Textes FR de l'interface et de l'accueil (référence du type)
├── en.ts                 # Textes EN, typés par fr.ts
└── error.ts              # Libellés de la page d'erreur (composant client)
components/
├── Container.tsx         # Conteneur de section
└── Divider.tsx           # Separateur decoratif
lib/
├── locales.ts            # Langues, négociation Accept-Language, chemins (+ locales.check.ts)
├── i18n.ts               # getDictionary(), getLang(), alternates() côté serveur
├── projects.ts           # Données communes des projets et fusion avec les textes
├── projects/{fr,en}.ts   # Textes des projets par langue
└── github.ts             # Stats GitHub des projets (revalidées chaque jour)
public/
├── photo.webp            # Photo de profil
└── projets/              # Captures des projets
```

### Traductions

- Un texte s'ajoute dans `dictionaries/fr.ts` **et** `dictionaries/en.ts` (ou `lib/projects/{fr,en}.ts` pour un projet) : une clé absente côté anglais fait échouer `bun run lint`.
- Les composants client ne lisent pas le dictionnaire : leurs libellés leur sont passés en props.
- `bun lib/locales.check.ts` vérifie la négociation de langue et le calcul des redirections.
