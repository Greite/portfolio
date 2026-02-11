# Portfolio - Gauthier Painteaux

Portfolio personnel / CV en ligne accessible sur [gauthierpainteaux.fr](https://gauthierpainteaux.fr).

## Stack technique

- **Framework** : [Next.js](https://nextjs.org) 16 (App Router, standalone output)
- **Langage** : TypeScript (strict)
- **Styling** : Tailwind CSS 4
- **Linting / Formatting** : [Biome](https://biomejs.dev)
- **Package manager** : pnpm
- **Runtime** : Node LTS Krypton

## Getting started

```bash
pnpm install
pnpm dev
```

Le serveur de dev (Turbopack) tourne sur [localhost:3000](http://localhost:3000).

### Build de production

```bash
pnpm build
pnpm start
```

## Scripts disponibles

| Commande           | Description                          |
| ------------------ | ------------------------------------ |
| `pnpm dev`         | Serveur de dev avec Turbopack        |
| `pnpm build`       | Build de production                  |
| `pnpm start`       | Serveur de production (standalone)   |
| `pnpm prod`        | Build + start                        |
| `pnpm lint`        | Lint avec Biome                      |
| `pnpm lint:fix`    | Lint + autofix                       |
| `pnpm format`      | Formatage avec Biome                 |
| `pnpm check`       | Lint + format check                  |
| `pnpm check:fix`   | Lint + format autofix                |

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
