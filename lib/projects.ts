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

export interface Project {
  slug: string;
  name: string;
  description: string;
  pitch: string;
  tags: string[];
  repoUrl: string;
  features: Feature[];
  screenshots?: Screenshot[];
  codeSample?: CodeSample;
}

export const projects: Project[] = [
  {
    slug: 'speedtest-monitor',
    name: 'Speedtest Monitor',
    description:
      'Outil self-hosted de supervision de connexion internet basé sur Cloudflare Speedtest : dashboard temps réel, alertes et authentification OIDC.',
    pitch:
      'Votre FAI promet un débit, Speedtest Monitor vérifie qu’il le tient. Il mesure la connexion à intervalle régulier avec le moteur de Cloudflare, conserve tout l’historique et prévient dès que le débit ou la latence se dégradent.',
    tags: ['Next.js', 'Bun', 'TypeScript', 'SQLite'],
    repoUrl: 'https://github.com/Greite/speedtest-monitor',
    features: [
      {
        title: 'Dashboard en temps réel',
        description:
          'Chaque mesure arrive en direct par WebSocket : débit descendant et montant, latence, gigue et bufferbloat, sur 6 heures comme sur 30 jours.',
      },
      {
        title: 'Mesures sans navigateur',
        description:
          'Le moteur Cloudflare Speed Test tourne en HTTP pur : pas de Chromium embarqué, une image Docker allégée d’environ 700 Mo.',
      },
      {
        title: 'Alertes à la dégradation',
        description:
          'Seuils sur le débit, la latence, le bufferbloat ou les échecs consécutifs, envoyés par webhook, ntfy, Discord, Slack ou e-mail, une seule fois par incident.',
      },
      {
        title: 'Planification modifiable à chaud',
        description:
          'L’intervalle entre deux mesures se règle depuis l’interface et s’applique immédiatement, sans redémarrage.',
      },
      {
        title: 'Comptes et SSO',
        description:
          'Rôles administrateur et lecteur, connexion par mot de passe ou OIDC (Authelia, Authentik, Keycloak).',
      },
    ],
    screenshots: [
      {
        light: '/projets/speedtest-monitor/dashboard-light.webp',
        dark: '/projets/speedtest-monitor/dashboard-dark.webp',
        alt: 'Dashboard de Speedtest Monitor : débit descendant, montant et latence, historique sur 24 heures et dernières mesures',
      },
    ],
  },
  {
    slug: 'ha-ravelli-smart-wifi',
    name: 'Ravelli Smart Wi-Fi',
    description:
      'Intégration Home Assistant pour les poêles à granulés Ravelli équipés du module Smart Wi-Fi : thermostat, niveau de puissance, état de combustion et alarmes, en local sans compte cloud. Distribuée via HACS.',
    pitch:
      'Piloter son poêle à granulés depuis Home Assistant, sans cloud ni boîtier supplémentaire. L’intégration dialogue directement avec le module Wi-Fi du poêle sur le réseau local et expose tout ce qu’il sait faire sous forme d’entités.',
    tags: ['Python', 'Home Assistant', 'HACS', 'Domotique'],
    repoUrl: 'https://github.com/Greite/ha-ravelli-smart-wifi',
    features: [
      {
        title: '100 % local',
        description:
          'Aucun compte cloud : Home Assistant interroge le module sur le réseau domestique, qu’il retrouve tout seul lors de la configuration.',
      },
      {
        title: 'Thermostat complet',
        description:
          'Marche/arrêt, température de consigne, niveau de puissance de 1 à 5 et mode manuel, depuis la carte thermostat habituelle.',
      },
      {
        title: 'État de combustion et alarmes',
        description:
          'Allumage, flamme, travail, nettoyage final ou arrêt éco, vitesse de l’extracteur et message d’alarme du poêle.',
      },
      {
        title: 'Programmes horaires',
        description:
          'Les six programmes du poêle s’affichent dans un calendrier et se modifient par des actions Home Assistant.',
      },
      {
        title: 'Sécurité avant tout',
        description:
          'Une commande n’est jamais renvoyée en double, et l’allumage est refusé tant qu’une alarme est active.',
      },
    ],
  },
  {
    slug: 'database-backup',
    name: 'Database Backup',
    description:
      'Container Docker léger pour automatiser les sauvegardes PostgreSQL, MariaDB/MySQL, MongoDB et SQLite : scheduler Go intégré, rotation, chiffrement GPG/age et healthcheck natif.',
    pitch:
      'Un seul container pour sauvegarder toutes vos bases de données. Un fichier YAML décrit les jobs, le scheduler Go intégré s’occupe du reste : dumps compressés, rotation, chiffrement et healthcheck.',
    tags: ['Go', 'Docker', 'PostgreSQL', 'MongoDB'],
    repoUrl: 'https://github.com/Greite/database-backup',
    features: [
      {
        title: 'Quatre moteurs',
        description:
          'PostgreSQL (toute version cliente du dépôt PGDG), MariaDB/MySQL, MongoDB et SQLite, avec un snapshot cohérent même en cours d’écriture.',
      },
      {
        title: 'Image légère',
        description:
          'Environ 126 Mo : aucun client préinstallé, seuls ceux dont la configuration a besoin sont installés au démarrage.',
      },
      {
        title: 'Planification intégrée',
        description:
          'Expressions cron ou raccourcis comme @daily, sans démon cron externe, avec une rétention par job.',
      },
      {
        title: 'Chiffrement au repos',
        description:
          'GPG symétrique ou age, par phrase de passe ou par clé publique : le container n’a jamais besoin de la clé privée.',
      },
      {
        title: 'Sûr par défaut',
        description:
          'Exécution non root, identifiants jamais visibles dans la ligne de commande, healthcheck par drivers natifs.',
      },
      {
        title: 'Toujours à jour',
        description: 'Images amd64 et arm64 reconstruites automatiquement dès que l’image de base Debian évolue.',
      },
    ],
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
  },
  {
    slug: 'unraid-btop',
    name: 'Unraid btop',
    description:
      'Plugin Unraid qui embarque btop dans le terminal et ajoute une tuile au dashboard natif (charge, températures, I/O disque et réseau, processus). Releases automatisées par CI à chaque version de btop.',
    pitch:
      'btop dans le terminal d’Unraid, et l’essentiel de ce qu’il montre directement sur le dashboard. Le plugin package le binaire officiel de btop et ajoute une tuile native avec ce que le dashboard d’origine n’affiche pas.',
    tags: ['PHP', 'Unraid', 'CI/CD', 'Monitoring'],
    repoUrl: 'https://github.com/Greite/unraid-btop',
    features: [
      {
        title: 'btop prêt à l’emploi',
        description:
          'Disponible en SSH et dans le terminal web d’Unraid, avec des réglages conservés sur la clé de démarrage entre deux redémarrages.',
      },
      {
        title: 'Tuile de dashboard',
        description:
          'Charge, température CPU, uptime, nombre de processus, débits disque et réseau agrégés, et les processus les plus gourmands.',
      },
      {
        title: 'Entièrement réglable',
        description:
          'Chaque section de la tuile s’active, se trie et se rafraîchit selon vos préférences depuis les réglages du plugin.',
      },
      {
        title: 'Mises à jour automatiques',
        description:
          'La CI surveille chaque jour les releases de btop, reconstruit le paquet, le teste et publie la mise à jour du plugin.',
      },
    ],
    screenshots: [
      {
        light: '/projets/unraid-btop/dashboard-tile.webp',
        dark: '/projets/unraid-btop/dashboard-tile.webp',
        alt: 'Tuile btop du dashboard Unraid : charge, débits disque et réseau, processus les plus gourmands',
      },
      {
        light: '/projets/unraid-btop/settings.webp',
        dark: '/projets/unraid-btop/settings.webp',
        alt: 'Réglages du plugin btop dans Unraid : sections de la tuile, tri et nombre de processus affichés',
      },
    ],
  },
  {
    slug: 'unraid-traefik-rolling-update',
    name: 'Unraid Traefik Rolling Update',
    description:
      "Plugin Unraid pour mettre à jour sans interruption les containers derrière Traefik : la nouvelle version démarre à côté de l'ancienne, Traefik bascule dès qu'elle est healthy, rollback automatique sinon.",
    pitch:
      'Sur Unraid, mettre à jour un container signifie l’arrêter, le supprimer puis le recréer : le site est coupé pendant toute l’opération. Derrière Traefik, ce n’est pas nécessaire. Ce plugin démarre la nouvelle version à côté de l’ancienne et ne bascule qu’une fois qu’elle est prête.',
    tags: ['PHP', 'Unraid', 'Traefik', 'Docker'],
    repoUrl: 'https://github.com/Greite/unraid-traefik-rolling-update',
    features: [
      {
        title: 'Zéro interruption',
        description:
          'Mesuré sur un vrai serveur : 1 ou 2 requêtes en échec sur environ 500 pendant la bascule, contre une cinquantaine avec la mise à jour native.',
      },
      {
        title: 'Rollback automatique',
        description:
          'Si la nouvelle version ne devient jamais healthy, elle est supprimée et l’ancienne continue de tourner, avec une notification qui explique pourquoi.',
      },
      {
        title: 'Aucune configuration',
        description:
          'Les labels Traefik et le healthcheck manquants sont ajoutés automatiquement à la nouvelle instance, le template n’est jamais modifié.',
      },
      {
        title: 'Healthcheck sur mesure',
        description:
          'Par container : chemin, port, code HTTP et texte attendus, intervalle et délais, à la manière de Coolify.',
      },
      {
        title: 'Natif partout ailleurs',
        description:
          'Les containers non cochés gardent la mise à jour d’Unraid, et désinstaller le plugin rétablit le comportement d’origine.',
      },
    ],
    screenshots: [
      {
        light: '/projets/unraid-traefik-rolling-update/settings.webp',
        dark: '/projets/unraid-traefik-rolling-update/settings.webp',
        alt: 'Réglages de Traefik Rolling Update dans Unraid : délai du health gate, notifications et healthcheck d’un container en mise à jour sans interruption',
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): { previous: Project; next: Project } {
  const index = projects.findIndex((project) => project.slug === slug);
  const count = projects.length;

  return {
    previous: projects[(index - 1 + count) % count],
    next: projects[(index + 1) % count],
  };
}
