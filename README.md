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
```

L'image utilise un build multi-stage avec `node:krypton-alpine` et tourne avec un utilisateur non-root.

## CI/CD

Le workflow GitHub Actions (`.github/workflows/build.yml`) se declenche sur les tags `v*.*.*` et :

1. Build le projet
2. Upload les artefacts
3. Build et push l'image Docker sur `ghcr.io`

## Structure du projet

```
app/
├── layout.tsx        # Layout racine, metadata, JSON-LD
├── page.tsx          # Page unique (CV)
├── globals.css       # Styles globaux + tokens Tailwind
├── error.tsx         # Page d'erreur
└── not-found.tsx     # Page 404
components/
├── Container.tsx     # Conteneur de section
└── Divider.tsx       # Separateur decoratif
public/
└── photo.webp        # Photo de profil
```
