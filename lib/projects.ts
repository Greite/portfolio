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

export interface Project {
  slug: string;
  name: string;
  /** Meta description et texte de la carte d'accueil : 140 à 155 caractères. */
  description: string;
  /** `<title>` complet, avec le terme recherché, 60 caractères max. */
  seoTitle: string;
  /** Langage principal du code (JSON-LD `programmingLanguage`). */
  programmingLanguage: string;
  pitch: string;
  tags: string[];
  repoUrl: string;
  stats: Stat[];
  /** Fonctionnement, dans l'ordre d'exécution. */
  steps: Feature[];
  /** Titre de la frise quand elle ne décrit pas le fonctionnement (défaut : « Comment fonctionne <nom> »). */
  stepsHeading?: string;
  features: Feature[];
  /** Choix techniques : `title` = techno, `description` = raison du choix. */
  stack: Feature[];
  install: Install;
  screenshots?: Screenshot[];
  codeSample?: CodeSample;
}

export const projects: Project[] = [
  {
    slug: 'speedtest-monitor',
    name: 'Speedtest Monitor',
    seoTitle: 'Speedtest Monitor : monitoring de connexion self-hosted',
    programmingLanguage: 'TypeScript',
    description:
      'Monitoring self-hosted de connexion internet avec Cloudflare Speed Test : dashboard temps réel, historique, alertes multicanales et SSO OIDC.',
    pitch:
      'Un FAI promet un débit ; Speedtest Monitor vérifie qu’il est tenu. Il mesure la connexion à intervalle régulier avec le moteur de Cloudflare, conserve tout l’historique et prévient dès que le débit ou la latence se dégradent.',
    tags: ['Next.js', 'Bun', 'TypeScript', 'SQLite'],
    repoUrl: 'https://github.com/Greite/speedtest-monitor',
    stats: [
      { value: '6 h à 30 j', label: 'd’historique affiché, en 5 périodes au choix' },
      { value: '5', label: 'canaux d’alerte : webhook, ntfy, Discord, Slack, e-mail' },
      { value: '1 à 1440 min', label: 'entre deux mesures, réglable à chaud' },
    ],
    steps: [
      { title: 'Scheduling', description: 'Une mesure part à l’intervalle choisi.' },
      { title: 'Mesure', description: 'Cloudflare Speed Test, en HTTP pur.' },
      { title: 'Stockage', description: 'Le résultat va dans SQLite.' },
      { title: 'Push', description: 'Le dashboard le reçoit par WebSocket.' },
      { title: 'Alerte', description: 'Les seuils sont évalués à chaque mesure.' },
    ],
    features: [
      {
        title: 'Dashboard en temps réel',
        description:
          'Chaque mesure arrive en direct par WebSocket : download, upload, latence, jitter et bufferbloat, sur 6 heures comme sur 30 jours.',
      },
      {
        title: 'Calibré pour le multi-gigabit',
        description:
          'Download, upload, latence, jitter et bufferbloat mesurés avec Cloudflare Speed Test, et réglables pour saturer les liens multi-gigabit.',
      },
      {
        title: 'Alertes à la dégradation',
        description:
          'Seuils sur le débit, la latence, le bufferbloat ou les échecs consécutifs, envoyés par webhook, ntfy, Discord, Slack ou e-mail, une seule fois par incident.',
      },
      {
        title: 'Comptes et SSO',
        description:
          'Rôles administrateur et lecteur, connexion par mot de passe ou OIDC, testé avec Authelia, Authentik et Keycloak.',
      },
    ],
    stack: [
      {
        title: 'Next.js + serveur Bun',
        description:
          'Le même serveur sert l’application et le WebSocket, donc un seul container et un seul port à exposer.',
      },
      {
        title: 'SQLite + Drizzle',
        description:
          'Une base dans un fichier, sans service à côté, et des migrations versionnées appliquées au démarrage.',
      },
      {
        title: 'Cloudflare Speed Test',
        description: 'Une mesure en HTTP pur, sans navigateur, sur le réseau mondial de Cloudflare.',
      },
      {
        title: 'Better Auth',
        description: 'Sessions stockées en base et provider OIDC générique, sans réimplémenter l’authentification.',
      },
    ],
    install: {
      steps: [
        'Créer un compose.yml avec l’image publiée sur ghcr.io (amd64 et arm64).',
        'Générer le secret d’authentification puis démarrer le container.',
        'Ouvrir http://localhost:3000/setup et créer le premier administrateur.',
      ],
      snippets: [
        {
          label: 'compose.yml',
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
          label: 'Commandes',
          language: 'bash',
          code: `echo "AUTH_SECRET=$(openssl rand -base64 32)" > .env
docker compose up -d`,
        },
      ],
    },
    screenshots: [
      {
        light: '/projets/speedtest-monitor/focus-light.webp',
        dark: '/projets/speedtest-monitor/focus-dark.webp',
        alt: 'Speedtest Monitor : download, upload et latence de la dernière mesure, et leur historique sur 24 heures',
      },
      {
        light: '/projets/speedtest-monitor/dashboard-light.webp',
        dark: '/projets/speedtest-monitor/dashboard-dark.webp',
        alt: 'Dashboard de Speedtest Monitor : download, upload et latence, historique sur 24 heures et dernières mesures',
      },
    ],
  },
  {
    slug: 'ha-ravelli-smart-wifi',
    name: 'Ravelli Smart Wi-Fi',
    seoTitle: 'Ravelli Smart Wi-Fi : intégration Home Assistant locale',
    programmingLanguage: 'Python',
    description:
      'Intégration Home Assistant locale pour les poêles Ravelli Smart Wi-Fi : thermostat, puissance, combustion, alarmes et programmes, sans cloud.',
    pitch:
      'Piloter son poêle à granulés depuis Home Assistant, sans cloud ni boîtier supplémentaire. L’intégration dialogue directement avec le module Wi-Fi du poêle sur le réseau local et expose tout ce qu’il sait faire sous forme d’entités.',
    tags: ['Python', 'Home Assistant', 'HACS', 'Domotique'],
    repoUrl: 'https://github.com/Greite/ha-ravelli-smart-wifi',
    stats: [
      { value: '0', label: 'compte cloud : tout passe par le réseau local' },
      { value: '6', label: 'programmes horaires pilotables depuis Home Assistant' },
      { value: '1 à 5', label: 'niveaux de puissance, comme sur le poêle' },
      { value: '10 à 300 s', label: 'd’intervalle de polling du module' },
    ],
    steps: [
      { title: 'Découverte', description: 'Home Assistant trouve le module sur le réseau.' },
      { title: 'Identification', description: 'La carte du poêle est lue et vérifiée.' },
      { title: 'Polling', description: 'Le module est interrogé à intervalle régulier.' },
      { title: 'Entités', description: 'Chaque valeur devient une entité.' },
      { title: 'Commande', description: 'Vérifiée avant envoi, jamais répétée.' },
    ],
    features: [
      {
        title: 'Thermostat complet',
        description:
          'Marche/arrêt, consigne, puissance de 1 à 5 et mode manuel depuis la carte thermostat. Vérifié sur un vrai poêle à carte AIR-RDS.',
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
        title: 'Pas d’allumage en alarme',
        description:
          'Une commande n’est jamais renvoyée en double, et l’allumage est refusé tant qu’une alarme est active.',
      },
    ],
    stack: [
      {
        title: 'Python',
        description: 'Le langage des intégrations Home Assistant, ce qui permet la distribution par HACS.',
      },
      {
        title: 'Config flow',
        description:
          'Installation et reconfiguration depuis l’interface, sans YAML, en gardant l’historique des entités.',
      },
      {
        title: 'Découverte DHCP',
        description: 'Home Assistant propose l’intégration dès que le module apparaît sur le réseau.',
      },
      {
        title: 'Mock du module',
        description:
          'Les tests tournent contre un mock du module : pas besoin d’un poêle pour valider une modification.',
      },
    ],
    install: {
      steps: [
        'Ouvrir le repo dans HACS, télécharger Ravelli Smart Wi-Fi et redémarrer Home Assistant.',
        'Dans Paramètres › Appareils et services, ajouter l’intégration Ravelli Smart Wi-Fi.',
        'Choisir la recherche sur le réseau local, ou saisir l’adresse du module.',
      ],
      cta: {
        label: 'Ouvrir dans HACS',
        href: 'https://my.home-assistant.io/redirect/hacs_repository/?owner=Greite&repository=ha-ravelli-smart-wifi&category=integration',
      },
    },
    screenshots: [
      {
        light: '/projets/ha-ravelli-smart-wifi/focus.webp',
        dark: '/projets/ha-ravelli-smart-wifi/focus.webp',
        alt: 'Thermostat du poêle Ravelli dans Home Assistant, avec les contrôles et capteurs de l’appareil',
      },
      {
        light: '/projets/ha-ravelli-smart-wifi/device.webp',
        dark: '/projets/ha-ravelli-smart-wifi/device.webp',
        alt: 'Poêle Ravelli dans Home Assistant : thermostat, niveau de puissance, capteurs d’état et d’alarme, réglages du confort climat',
      },
    ],
  },
  {
    slug: 'database-backup',
    name: 'Database Backup',
    seoTitle: 'Database Backup : backups Docker PostgreSQL, MySQL, MongoDB',
    programmingLanguage: 'Go',
    description:
      'Container Docker qui backupe PostgreSQL, MariaDB/MySQL, MongoDB et SQLite : scheduler Go intégré, rotation, chiffrement GPG/age et healthcheck.',
    pitch:
      'Un seul container pour backuper toutes les bases d’un serveur. Un fichier YAML décrit les jobs, et le scheduler Go intégré produit des dumps compressés, chiffrés et purgés selon la rétention.',
    tags: ['Go', 'Docker', 'PostgreSQL', 'MongoDB'],
    repoUrl: 'https://github.com/Greite/database-backup',
    stats: [
      { value: '4', label: 'moteurs : PostgreSQL, MariaDB/MySQL, MongoDB, SQLite' },
      { value: '~126 Mo', label: 'd’image, sans client préinstallé' },
      { value: '2', label: 'architectures publiées : amd64 et arm64' },
      { value: '4 × / jour', label: 'vérification de l’image de base Debian' },
    ],
    steps: [
      { title: 'Validation', description: 'backups.yml est validé au démarrage.' },
      { title: 'Clients', description: 'Seuls les clients utiles sont installés.' },
      { title: 'Scheduling', description: 'Chaque job part selon son cron.' },
      { title: 'Dump', description: 'Compressé en streaming, chiffré si besoin.' },
      { title: 'Rotation', description: 'Les vieux backups sont supprimés.' },
    ],
    features: [
      {
        title: 'Quatre moteurs',
        description:
          'PostgreSQL (toute version cliente du repo PGDG), MariaDB/MySQL, MongoDB et SQLite, avec un snapshot cohérent même en cours d’écriture.',
      },
      {
        title: 'Scheduler intégré',
        description:
          'Expressions cron ou raccourcis comme @daily, sans daemon cron externe, avec une rétention par job.',
      },
      {
        title: 'Chiffrement au repos',
        description:
          'GPG symétrique ou age, par passphrase ou par public key : le container n’a jamais besoin de la private key.',
      },
      {
        title: 'Non root, credentials masqués',
        description:
          'Exécution non root, credentials jamais visibles dans la ligne de commande, healthcheck par drivers natifs.',
      },
    ],
    stack: [
      {
        title: 'Go',
        description:
          'Un binaire unique, compilé statiquement, qui embarque le scheduler et les drivers natifs du healthcheck.',
      },
      {
        title: 'Debian slim',
        description:
          'Une base légère où les clients de chaque moteur s’installent à la demande, dans la version voulue.',
      },
      {
        title: 'GPG et age',
        description: 'Deux formats de chiffrement standards, déchiffrables sans l’outil, dont un par public key.',
      },
      {
        title: 'GitHub Actions',
        description: 'Tests, images multi-architecture et rebuild automatique quand l’image Debian change.',
      },
    ],
    install: {
      steps: [
        'Décrire les jobs dans backups.yml (ici une base SQLite backupée chaque nuit), en chmod 600.',
        'Monter dans le container ce fichier, le dossier des backups et les données à backuper.',
        'Lancer docker compose up -d : les dumps compressés arrivent dans ./backups.',
      ],
      snippets: [
        {
          label: 'backups.yml',
          language: 'yaml',
          code: `jobs:
  - name: app
    type: sqlite
    path: /sources/app/app.db
    schedule: "0 3 * * *"
    retention_days: 7`,
        },
        {
          label: 'compose.yml',
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
    stepsHeading: 'Comment le plugin se met à jour',
    seoTitle: 'Unraid btop : plugin btop et tuile de dashboard Unraid',
    programmingLanguage: 'PHP',
    description:
      'Plugin Unraid qui installe btop et ajoute au dashboard une tuile load, I/O disque et réseau et processus. Mis à jour par CI à chaque release de btop.',
    pitch:
      'Le dashboard d’Unraid montre l’état des disques et des containers, mais pas le load average, les débits ou les processus les plus gourmands. Ce plugin installe btop dans le terminal et ajoute ces informations dans une tuile native.',
    tags: ['PHP', 'Unraid', 'CI/CD', 'Monitoring'],
    repoUrl: 'https://github.com/Greite/unraid-btop',
    stats: [
      { value: '24 h', label: 'entre deux vérifications des releases de btop' },
      { value: '6.12+', label: 'versions d’Unraid supportées, en x86_64' },
    ],
    steps: [
      { title: 'Détection', description: 'La CI repère chaque release de btop.' },
      { title: 'Build', description: 'Le package Unraid est rebuildé.' },
      { title: 'Tests', description: 'Contenu, syntaxe PHP et smoke test.' },
      { title: 'Publication', description: 'Release GitHub et manifest à jour.' },
      { title: 'Update', description: 'Unraid propose la nouvelle version.' },
    ],
    features: [
      {
        title: 'btop prêt à l’emploi',
        description:
          'Disponible en SSH et dans le terminal web d’Unraid, avec des réglages conservés sur la clé USB de boot entre deux redémarrages.',
      },
      {
        title: 'Tuile de dashboard',
        description:
          'Load average, température CPU, uptime, nombre de processus, I/O disque et réseau agrégés, et les processus les plus gourmands.',
      },
      {
        title: 'Tuile configurable',
        description: 'Chaque section de la tuile s’active, se trie et se rafraîchit depuis les réglages du plugin.',
      },
      {
        title: 'Updates automatiques',
        description:
          'La CI surveille chaque jour les releases de btop, rebuild le package, le teste et publie l’update du plugin.',
      },
    ],
    stack: [
      {
        title: 'PHP',
        description:
          'Les pages de réglages et les tuiles du dashboard Unraid sont des pages PHP servies par le webGUI.',
      },
      {
        title: 'Binaire statique de btop',
        description: 'Le binaire officiel fonctionne sur Unraid sans lib à installer.',
      },
      {
        title: 'Shell',
        description: 'Le build assemble le package Unraid et vérifie son contenu avant publication.',
      },
      {
        title: 'GitHub Actions',
        description: 'Suivi quotidien des releases de btop, build, tests et publication sans intervention.',
      },
    ],
    install: {
      steps: [
        'Dans Unraid, ouvrir Plugins › Install Plugin et coller l’adresse du plugin.',
        'La tuile apparaît sur le dashboard ; ses réglages sont dans Settings › User Utilities › btop.',
      ],
      snippets: [
        {
          label: 'Adresse du plugin',
          language: 'text',
          code: 'https://raw.githubusercontent.com/Greite/unraid-btop/main/btop.plg',
        },
      ],
    },
    screenshots: [
      {
        light: '/projets/unraid-btop/dashboard-tile.webp',
        dark: '/projets/unraid-btop/dashboard-tile.webp',
        alt: 'Tuile btop du dashboard Unraid : load, I/O disque et réseau, processus les plus gourmands',
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
    seoTitle: 'Unraid Traefik Rolling Update : updates zero-downtime',
    programmingLanguage: 'PHP',
    description:
      'Plugin Unraid pour updater les containers derrière Traefik sans downtime : la nouvelle version démarre à côté, switch une fois healthy, sinon rollback.',
    pitch:
      'Sur Unraid, updater un container signifie l’arrêter, le supprimer puis le recréer : le site est down pendant toute l’opération. Derrière Traefik, ce n’est pas nécessaire. Ce plugin démarre la nouvelle version à côté de l’ancienne et ne switche qu’une fois qu’elle est prête.',
    tags: ['PHP', 'Unraid', 'Traefik', 'Docker'],
    repoUrl: 'https://github.com/Greite/unraid-traefik-rolling-update',
    stats: [
      { value: '1–2 vs ~50', label: 'requêtes perdues sur ~500 pendant le switch, contre l’update natif d’Unraid' },
      { value: '0', label: 'label ou healthcheck à écrire' },
    ],
    steps: [
      { title: 'Pull', description: 'La nouvelle image est téléchargée.' },
      { title: 'Démarrage', description: 'Une 2ᵉ instance démarre à côté.' },
      { title: 'Health gate', description: 'Traefik attend qu’elle soit healthy.' },
      { title: 'Switch', description: 'L’ancienne instance est arrêtée.' },
      { title: 'Cleanup', description: 'Ancien container et image supprimés.' },
    ],
    features: [
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
          'Les containers non cochés gardent l’update natif d’Unraid, et désinstaller le plugin rétablit le comportement d’origine.',
      },
    ],
    stack: [
      {
        title: 'PHP',
        description:
          'Le plugin se branche sur les boutons Update de la page Docker d’Unraid et ajoute sa page de réglages.',
      },
      {
        title: 'Healthchecks Docker',
        description:
          'Traefik ignore les containers qui ne sont pas healthy : c’est ce qui sert de health gate avant le switch.',
      },
      {
        title: 'Labels Traefik',
        description:
          'Le service et le port implicites de l’ancienne instance sont recopiés, selon les règles de Traefik.',
      },
      {
        title: 'Self-tests',
        description: 'La logique de décision est testée en local, sans Docker ni serveur Unraid.',
      },
    ],
    install: {
      steps: [
        'Dans Unraid, ouvrir Plugins › Install Plugin et coller l’adresse du plugin.',
        'Dans Settings › Utilities › Traefik Rolling Update, passer les containers voulus en zero-downtime.',
        'Recharger la page Docker : Update et Update All passent désormais par le rolling update.',
      ],
      snippets: [
        {
          label: 'Adresse du plugin',
          language: 'text',
          code: 'https://raw.githubusercontent.com/Greite/unraid-traefik-rolling-update/main/traefik.rolling.update.plg',
        },
      ],
    },
    screenshots: [
      {
        light: '/projets/unraid-traefik-rolling-update/focus.webp',
        dark: '/projets/unraid-traefik-rolling-update/focus.webp',
        alt: 'Container réglé en zero-downtime update avec son healthcheck : chemin, scheme, port et code attendu',
      },
      {
        light: '/projets/unraid-traefik-rolling-update/settings.webp',
        dark: '/projets/unraid-traefik-rolling-update/settings.webp',
        alt: 'Réglages de Traefik Rolling Update dans Unraid : délai du health gate, notifications et healthcheck d’un container en update zero-downtime',
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
