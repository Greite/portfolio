import type { Locale } from '@root/lib/locales';
import { en } from '@root/lib/projects/en';
import { fr } from '@root/lib/projects/fr';

export interface Feature {
  title: string;
  description: string;
}

/** Chemins publics `/projets/<slug>/<fichier>.webp` ; `light === dark` si l'outil n'a qu'un thème. */
export interface Screenshot {
  light: string;
  dark: string;
  alt: string;
}

export interface CodeSample {
  language: string;
  code: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Install {
  steps: string[];
  /** Contenus à coller tels quels (bouton copier). */
  snippets?: (CodeSample & { label: string })[];
  cta?: { label: string; href: string };
}

/** Partie commune aux deux langues. */
interface ProjectBase {
  name: string;
  repoUrl: string;
  /** Langage principal du code (JSON-LD `programmingLanguage`). */
  programmingLanguage: string;
  screenshots?: Omit<Screenshot, 'alt'>[];
  codeSample?: CodeSample;
  snippets?: CodeSample[];
  ctaHref?: string;
}

/** Textes d'une langue (`lib/projects/<lang>.ts`). Les tableaux `snippetLabels` et `screenshotAlts` suivent l'ordre de la base. */
export interface ProjectText {
  /** `<title>` complet, avec le terme recherché, 60 caractères max. */
  seoTitle: string;
  /** Meta description et texte de la carte d'accueil : 140 à 155 caractères. */
  description: string;
  pitch: string;
  /** Technos et domaines affichés en badges (et `keywords` du JSON-LD). */
  tags: string[];
  stats: Stat[];
  /** Titre de la frise quand elle ne décrit pas le fonctionnement (défaut : `projectPage.howItWorks`). */
  stepsHeading?: string;
  /** Fonctionnement, dans l'ordre d'exécution. */
  steps: Feature[];
  features: Feature[];
  /** Choix techniques : `title` = techno, `description` = raison du choix. */
  stack: Feature[];
  installSteps: string[];
  snippetLabels?: string[];
  ctaLabel?: string;
  screenshotAlts?: string[];
}

export interface Project
  extends Omit<ProjectBase, 'screenshots' | 'snippets' | 'ctaHref'>,
    Omit<ProjectText, 'installSteps' | 'snippetLabels' | 'ctaLabel' | 'screenshotAlts'> {
  slug: Slug;
  install: Install;
  screenshots?: Screenshot[];
}

export type Slug = (typeof slugs)[number];

export const slugs = [
  'speedtest-monitor',
  'ha-ravelli-smart-wifi',
  'database-backup',
  'unraid-btop',
  'unraid-traefik-rolling-update',
] as const;

const base: Record<Slug, ProjectBase> = {
  'speedtest-monitor': {
    name: 'Speedtest Monitor',
    repoUrl: 'https://github.com/Greite/speedtest-monitor',
    programmingLanguage: 'TypeScript',
    screenshots: [
      { light: '/projets/speedtest-monitor/focus-light.webp', dark: '/projets/speedtest-monitor/focus-dark.webp' },
      {
        light: '/projets/speedtest-monitor/dashboard-light.webp',
        dark: '/projets/speedtest-monitor/dashboard-dark.webp',
      },
    ],
    snippets: [
      {
        language: 'yaml',
        code: `services:
  speedtest:
    image: ghcr.io/greite/speedtest-monitor:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      AUTH_SECRET: \${AUTH_SECRET}
      TZ: Europe/Paris
    volumes:
      - speedtest-data:/data

volumes:
  speedtest-data:`,
      },
      {
        language: 'bash',
        code: `echo "AUTH_SECRET=$(openssl rand -base64 32)" > .env
docker compose up -d`,
      },
    ],
  },
  'ha-ravelli-smart-wifi': {
    name: 'Ravelli Smart Wi-Fi',
    repoUrl: 'https://github.com/Greite/ha-ravelli-smart-wifi',
    programmingLanguage: 'Python',
    screenshots: [
      { light: '/projets/ha-ravelli-smart-wifi/focus.webp', dark: '/projets/ha-ravelli-smart-wifi/focus.webp' },
      { light: '/projets/ha-ravelli-smart-wifi/device.webp', dark: '/projets/ha-ravelli-smart-wifi/device.webp' },
    ],
    ctaHref:
      'https://my.home-assistant.io/redirect/hacs_repository/?owner=Greite&repository=ha-ravelli-smart-wifi&category=integration',
  },
  'database-backup': {
    name: 'Database Backup',
    repoUrl: 'https://github.com/Greite/database-backup',
    programmingLanguage: 'Go',
    codeSample: {
      language: 'yaml',
      code: `# backups.yml
defaults:
  retention_days: 14

encryption:
  method: age
  recipients:
    - age1ql3z7hjy54pw3hyww5ayyfg7zqgvc7w3j2elw8zmrj2kg5sfn9aqmcac8p

jobs:
  - name: app-db
    type: postgres
    host: app-db
    database: app
    user: backup
    password_file: /run/secrets/app_db_password
    schedule: "0 2 * * *"

  - name: shop-db
    type: mariadb
    host: shop-db
    database: shop
    user: backup
    password_file: /run/secrets/shop_db_password
    schedule: "@daily"

  - name: vault
    type: sqlite
    path: /sources/vault/db.sqlite3
    schedule: "0 3 * * *"`,
    },
    snippets: [
      {
        language: 'yaml',
        code: `jobs:
  - name: app
    type: sqlite
    path: /sources/app/app.db
    schedule: "0 3 * * *"
    retention_days: 7`,
      },
      {
        language: 'yaml',
        code: `services:
  db-backup:
    image: ghcr.io/greite/database-backup:latest
    restart: unless-stopped
    volumes:
      - ./backups:/backups
      - ./backups.yml:/config/backups.yml:ro
      - ./data:/sources/app:ro`,
      },
    ],
  },
  'unraid-btop': {
    name: 'Unraid btop',
    repoUrl: 'https://github.com/Greite/unraid-btop',
    programmingLanguage: 'PHP',
    screenshots: [
      { light: '/projets/unraid-btop/dashboard-tile.webp', dark: '/projets/unraid-btop/dashboard-tile.webp' },
      { light: '/projets/unraid-btop/settings.webp', dark: '/projets/unraid-btop/settings.webp' },
    ],
    snippets: [{ language: 'text', code: 'https://raw.githubusercontent.com/Greite/unraid-btop/main/btop.plg' }],
  },
  'unraid-traefik-rolling-update': {
    name: 'Unraid Traefik Rolling Update',
    repoUrl: 'https://github.com/Greite/unraid-traefik-rolling-update',
    programmingLanguage: 'PHP',
    screenshots: [
      {
        light: '/projets/unraid-traefik-rolling-update/focus.webp',
        dark: '/projets/unraid-traefik-rolling-update/focus.webp',
      },
      {
        light: '/projets/unraid-traefik-rolling-update/settings.webp',
        dark: '/projets/unraid-traefik-rolling-update/settings.webp',
      },
    ],
    snippets: [
      {
        language: 'text',
        code: 'https://raw.githubusercontent.com/Greite/unraid-traefik-rolling-update/main/traefik.rolling.update.plg',
      },
    ],
  },
};

const texts: Record<Locale, Record<Slug, ProjectText>> = { fr, en };

/** Associe chaque élément de la base à son texte ; lève si les deux listes divergent, pour que le build échoue. */
function zip<T, U>(
  items: T[] | undefined,
  labels: string[] | undefined,
  what: string,
  merge: (item: T, label: string) => U,
) {
  if ((items?.length ?? 0) !== (labels?.length ?? 0)) {
    throw new Error(`${what} : ${items?.length ?? 0} éléments, ${labels?.length ?? 0} textes`);
  }

  return items?.map((item, index) => merge(item, (labels as string[])[index]));
}

function merge(slug: Slug, lang: Locale): Project {
  const { screenshots, snippets, ctaHref, ...common } = base[slug];
  const { installSteps, snippetLabels, ctaLabel, screenshotAlts, ...text } = texts[lang][slug];

  return {
    slug,
    ...common,
    ...text,
    install: {
      steps: installSteps,
      snippets: zip(snippets, snippetLabels, `${slug}/${lang} snippets`, (snippet, label) => ({ ...snippet, label })),
      cta: ctaHref && ctaLabel ? { href: ctaHref, label: ctaLabel } : undefined,
    },
    screenshots: zip(screenshots, screenshotAlts, `${slug}/${lang} screenshots`, (shot, alt) => ({ ...shot, alt })),
  };
}

export function getProjects(lang: Locale): Project[] {
  return slugs.map((slug) => merge(slug, lang));
}

export function getProject(slug: string, lang: Locale): Project | undefined {
  return slugs.includes(slug as Slug) ? merge(slug as Slug, lang) : undefined;
}

export function getAdjacentProjects(slug: string, lang: Locale): { previous: Project; next: Project } {
  const index = slugs.indexOf(slug as Slug);
  const count = slugs.length;

  return {
    previous: merge(slugs[(index - 1 + count) % count], lang),
    next: merge(slugs[(index + 1) % count], lang),
  };
}
