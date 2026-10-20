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
  description: string;
  pitch: string;
  tags: string[];
  repoUrl: string;
  stats: Stat[];
  /** Fonctionnement, dans l'ordre d'exécution. */
  steps: Feature[];
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
    description:
      'Outil self-hosted de supervision de connexion internet basé sur Cloudflare Speedtest : dashboard temps réel, alertes et authentification OIDC.',
    pitch:
      'Votre FAI promet un débit, Speedtest Monitor vérifie qu’il le tient. Il mesure la connexion à intervalle régulier avec le moteur de Cloudflare, conserve tout l’historique et prévient dès que le débit ou la latence se dégradent.',
    tags: ['Next.js', 'Bun', 'TypeScript', 'SQLite'],
    repoUrl: 'https://github.com/Greite/speedtest-monitor',
    stats: [
      { value: '6 h à 30 j', label: 'd’historique affiché, en 5 périodes au choix' },
      { value: '5', label: 'canaux d’alerte : webhook, ntfy, Discord, Slack, e-mail' },
      { value: '1 à 1440 min', label: 'entre deux mesures, réglable à chaud' },
    ],
    steps: [
      {
        title: 'Planification',
        description: 'Un scheduler intégré déclenche une mesure à l’intervalle choisi dans l’interface.',
      },
      {
        title: 'Mesure',
        description: 'Le moteur Cloudflare Speed Test mesure débit, latence, gigue et bufferbloat, en HTTP pur.',
      },
      {
        title: 'Stockage',
        description: 'Chaque résultat est enregistré dans une base SQLite persistée sur un volume.',
      },
      {
        title: 'Diffusion',
        description: 'Le serveur pousse la nouvelle mesure au dashboard ouvert, par WebSocket.',
      },
      {
        title: 'Alerte',
        description:
          'Les seuils sont évalués à chaque mesure ; une alerte part au passage en dégradation, puis au retour.',
      },
    ],
    features: [
      {
        title: 'Dashboard en temps réel',
        description:
          'Chaque mesure arrive en direct par WebSocket : débit descendant et montant, latence, gigue et bufferbloat, sur 6 heures comme sur 30 jours.',
      },
      {
        title: 'Mesures fiables',
        description:
          'Débit, latence, gigue et bufferbloat mesurés avec Cloudflare Speed Test, et réglables pour saturer les liens multi-gigabit.',
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
    stack: [
      {
        title: 'Next.js + serveur Bun',
        description:
          'Un seul serveur sert l’application et le WebSocket sur le même port : un seul container, un seul port à exposer.',
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
        description:
          'Rôles administrateur et lecteur, sessions en base et SSO OIDC sans réimplémenter l’authentification.',
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
    stats: [
      { value: '0', label: 'compte cloud : tout passe par le réseau local' },
      { value: '6', label: 'programmes horaires pilotables depuis Home Assistant' },
      { value: '1 à 5', label: 'niveaux de puissance, comme sur le poêle' },
      { value: '10 à 300 s', label: 'entre deux lectures du module' },
    ],
    steps: [
      {
        title: 'Découverte',
        description:
          'Home Assistant repère le module sur le réseau, ou le cherche sur les réseaux auxquels il est connecté.',
      },
      {
        title: 'Identification',
        description:
          'L’intégration lit la carte électronique du poêle et refuse les modèles qu’elle ne sait pas piloter.',
      },
      {
        title: 'Lecture',
        description: 'Le module est interrogé à intervalle régulier : état, températures, alarmes, programmes.',
      },
      {
        title: 'Entités',
        description:
          'Chaque valeur devient une entité Home Assistant : thermostat, capteurs, calendrier, interrupteur.',
      },
      {
        title: 'Commande',
        description: 'Une commande est vérifiée avant envoi, jamais répétée, et refusée si le poêle est en alarme.',
      },
    ],
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
        title: 'Simulateur du module',
        description: 'Les tests tournent contre un faux module : pas besoin d’un poêle pour valider une modification.',
      },
    ],
    install: {
      steps: [
        'Ouvrir le dépôt dans HACS, télécharger Ravelli Smart Wi-Fi et redémarrer Home Assistant.',
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
        light: '/projets/ha-ravelli-smart-wifi/device.webp',
        dark: '/projets/ha-ravelli-smart-wifi/device.webp',
        alt: 'Poêle Ravelli dans Home Assistant : thermostat, niveau de puissance, capteurs d’état et d’alarme, réglages du confort climat',
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
    stats: [
      { value: '4', label: 'moteurs : PostgreSQL, MariaDB/MySQL, MongoDB, SQLite' },
      { value: '~126 Mo', label: 'd’image, sans client préinstallé' },
      { value: '2', label: 'architectures publiées : amd64 et arm64' },
      { value: '4 × / jour', label: 'vérification de l’image de base Debian' },
    ],
    steps: [
      {
        title: 'Validation',
        description: 'Le fichier backups.yml est lu et entièrement validé au démarrage du container.',
      },
      {
        title: 'Clients',
        description: 'Seuls les clients de base de données utilisés par la configuration sont installés.',
      },
      {
        title: 'Planification',
        description: 'Le scheduler Go déclenche chaque job selon son expression cron.',
      },
      {
        title: 'Dump',
        description: 'Le dump est compressé en streaming, puis chiffré avec GPG ou age si c’est configuré.',
      },
      {
        title: 'Rotation',
        description: 'Les sauvegardes plus anciennes que la rétention du job sont supprimées.',
      },
    ],
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
    stack: [
      {
        title: 'Go',
        description:
          'Un binaire unique qui embarque le scheduler et les drivers natifs du healthcheck, sans cron externe.',
      },
      {
        title: 'Debian slim',
        description:
          'Une base légère où les clients de chaque moteur s’installent à la demande, dans la version voulue.',
      },
      {
        title: 'GPG et age',
        description: 'Deux formats de chiffrement standards, déchiffrables sans l’outil, dont un par clé publique.',
      },
      {
        title: 'GitHub Actions',
        description: 'Tests, images multi-architecture et reconstruction automatique quand l’image Debian change.',
      },
    ],
    install: {
      steps: [
        'Décrire les jobs dans backups.yml (ici une base SQLite sauvegardée chaque nuit), en chmod 600.',
        'Monter dans le container ce fichier, le dossier des sauvegardes et les données à sauvegarder.',
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
    description:
      'Plugin Unraid qui embarque btop dans le terminal et ajoute une tuile au dashboard natif (charge, températures, I/O disque et réseau, processus). Releases automatisées par CI à chaque version de btop.',
    pitch:
      'btop dans le terminal d’Unraid, et l’essentiel de ce qu’il montre directement sur le dashboard. Le plugin package le binaire officiel de btop et ajoute une tuile native avec ce que le dashboard d’origine n’affiche pas.',
    tags: ['PHP', 'Unraid', 'CI/CD', 'Monitoring'],
    repoUrl: 'https://github.com/Greite/unraid-btop',
    stats: [
      { value: '1', label: 'tuile native sur le dashboard Unraid' },
      { value: '24 h', label: 'entre deux vérifications des releases de btop' },
      { value: '0', label: 'dépendance : le binaire officiel est statique' },
    ],
    steps: [
      {
        title: 'Détection',
        description: 'Chaque jour, la CI vérifie si une nouvelle version de btop est sortie.',
      },
      {
        title: 'Build',
        description: 'Le paquet Unraid est reconstruit autour du binaire officiel de cette version.',
      },
      {
        title: 'Tests',
        description: 'Le contenu du paquet et la syntaxe PHP sont vérifiés, puis le binaire est lancé en smoke test.',
      },
      {
        title: 'Publication',
        description: 'La release GitHub est publiée et le manifeste du plugin est mis à jour sur main.',
      },
      {
        title: 'Mise à jour',
        description: 'Unraid propose la nouvelle version du plugin, comme pour n’importe quel plugin.',
      },
    ],
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
    stack: [
      {
        title: 'PHP',
        description:
          'Les pages de réglages et les tuiles du dashboard Unraid sont des pages PHP servies par le webGUI.',
      },
      {
        title: 'Binaire statique de btop',
        description: 'Le binaire officiel fonctionne sur Unraid sans bibliothèque à installer.',
      },
      {
        title: 'Shell',
        description: 'Le build assemble le paquet Unraid et vérifie son contenu avant publication.',
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
    stats: [
      { value: '1 à 2', label: 'requêtes en échec sur ~500 pendant la bascule' },
      { value: '~50', label: 'avec la mise à jour native d’Unraid' },
      { value: '0', label: 'label ou healthcheck à écrire' },
    ],
    steps: [
      {
        title: 'Pull',
        description: 'L’image est téléchargée ; si le pull échoue, rien d’autre ne se passe.',
      },
      {
        title: 'Démarrage',
        description:
          'Une seconde instance démarre à côté de la première, avec les labels Traefik et le healthcheck qui manquaient.',
      },
      {
        title: 'Health gate',
        description:
          'Traefik ne lui envoie du trafic qu’une fois healthy ; sinon elle est supprimée et l’image restaurée.',
      },
      {
        title: 'Bascule',
        description: 'L’ancienne instance est arrêtée, Traefik la retire, la nouvelle reprend son nom.',
      },
      {
        title: 'Nettoyage',
        description: 'L’ancien container et son image sont supprimés, puis une notification est envoyée.',
      },
    ],
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
    stack: [
      {
        title: 'PHP',
        description:
          'Le plugin se branche sur les boutons Update de la page Docker d’Unraid et ajoute sa page de réglages.',
      },
      {
        title: 'Healthchecks Docker',
        description:
          'Traefik ignore les containers qui ne sont pas healthy : c’est ce qui sert de porte avant la bascule.',
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
        'Recharger la page Docker : Update et Update All utilisent désormais la bascule.',
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
