import type { ProjectText, Slug } from '@root/lib/projects';

export const en: Record<Slug, ProjectText> = {
  'speedtest-monitor': {
    seoTitle: 'Speedtest Monitor: self-hosted internet speed monitoring',
    description:
      'Self-hosted internet connection monitoring built on Cloudflare Speed Test: a real-time dashboard, history, multi-channel alerts and OIDC SSO.',
    pitch:
      'Your ISP promises a speed; Speedtest Monitor checks whether it delivers. It measures your connection at regular intervals with Cloudflare’s engine, keeps the full history and alerts you as soon as throughput or latency degrades.',
    tags: ['Next.js', 'Bun', 'TypeScript', 'SQLite'],
    stats: [
      { value: '6 hours to 30 days', label: 'of history on screen, across 5 selectable ranges' },
      { value: '5', label: 'alert channels: webhook, ntfy, Discord, Slack, email' },
      { value: '1 to 1,440 min', label: 'between tests, adjustable on the fly' },
    ],
    steps: [
      { title: 'Scheduling', description: 'A test starts at the chosen interval.' },
      { title: 'Measurement', description: 'Cloudflare Speed Test, over plain HTTP.' },
      { title: 'Storage', description: 'The result goes into SQLite.' },
      { title: 'Push', description: 'The dashboard receives it over WebSocket.' },
      { title: 'Alerting', description: 'Thresholds are checked after every test.' },
    ],
    features: [
      {
        title: 'Real-time dashboard',
        description:
          'Each result streams in live over WebSocket: download, upload, latency, jitter and bufferbloat, charted from the last 6 hours up to 30 days.',
      },
      {
        title: 'Built for multi-gigabit',
        description:
          'Download, upload, latency, jitter and bufferbloat measured with Cloudflare Speed Test, tunable to saturate multi-gigabit links.',
      },
      {
        title: 'Degradation alerts',
        description:
          'Set thresholds on throughput, latency, bufferbloat or consecutive failures. Alerts go out via webhook, ntfy, Discord, Slack or email, once per incident.',
      },
      {
        title: 'Accounts and SSO',
        description: 'Admin and viewer roles, password or OIDC login, tested with Authelia, Authentik and Keycloak.',
      },
    ],
    stack: [
      {
        title: 'Next.js + Bun server',
        description:
          'One server handles both the app and the WebSocket, so there’s a single container and a single port to expose.',
      },
      {
        title: 'SQLite + Drizzle',
        description: 'A single-file database with no extra service, and versioned migrations applied at startup.',
      },
      {
        title: 'Cloudflare Speed Test',
        description: 'Plain HTTP measurements, no browser needed, on Cloudflare’s global network.',
      },
      {
        title: 'Better Auth',
        description: 'Database-backed sessions and a generic OIDC provider, without reinventing authentication.',
      },
    ],
    installSteps: [
      'Create a compose.yml using the image published on ghcr.io (amd64 and arm64).',
      'Generate the authentication secret, then start the container.',
      'Open http://localhost:3000/setup and create the first admin account.',
    ],
    snippetLabels: ['compose.yml', 'Commands'],
    screenshotAlts: [
      'Speedtest Monitor: download, upload and latency of the latest test, with their 24-hour history',
      'Speedtest Monitor dashboard: download, upload and latency, 24-hour history and latest tests',
    ],
  },
  'ha-ravelli-smart-wifi': {
    seoTitle: 'Ravelli Smart Wi-Fi: local Home Assistant integration',
    description:
      'Local Home Assistant integration for Ravelli Smart Wi-Fi stoves: thermostat, power level, combustion, alarms and schedules, with no cloud at all.',
    pitch:
      'Control your pellet stove from Home Assistant, with no cloud and no extra hardware. The integration talks directly to the stove’s Wi-Fi module on your local network and exposes everything it can do as entities.',
    tags: ['Python', 'Home Assistant', 'HACS', 'Smart home'],
    stats: [
      { value: '0', label: 'cloud accounts: everything stays on the local network' },
      { value: '6', label: 'time schedules you can manage from Home Assistant' },
      { value: '1 to 5', label: 'power levels, just like on the stove' },
      { value: '10 to 300 s', label: 'module polling interval' },
    ],
    steps: [
      { title: 'Discovery', description: 'Home Assistant finds the module on the network.' },
      { title: 'Identification', description: 'The stove’s board is read and checked.' },
      { title: 'Polling', description: 'The module is queried at regular intervals.' },
      { title: 'Entities', description: 'Every value becomes an entity.' },
      { title: 'Commands', description: 'Checked before sending, never repeated.' },
    ],
    features: [
      {
        title: 'Full thermostat',
        description:
          'On/off, target temperature, power from 1 to 5 and manual mode from the thermostat card. Tested on a real stove with an AIR-RDS board.',
      },
      {
        title: 'Combustion state and alarms',
        description:
          'Ignition, flame, running, final cleaning or eco stop, exhaust fan speed and the stove’s alarm message.',
      },
      {
        title: 'Time schedules',
        description: 'The stove’s six schedules show up in a calendar and can be edited with Home Assistant actions.',
      },
      {
        title: 'No ignition during an alarm',
        description: 'A command is never sent twice, and ignition is refused while an alarm is active.',
      },
    ],
    stack: [
      {
        title: 'Python',
        description: 'The language of Home Assistant integrations, which makes distribution through HACS possible.',
      },
      {
        title: 'Config flow',
        description: 'Setup and reconfiguration from the UI, no YAML, with entity history preserved.',
      },
      {
        title: 'DHCP discovery',
        description: 'Home Assistant offers the integration as soon as the module appears on the network.',
      },
      {
        title: 'Module mock',
        description: 'Tests run against a mock of the module: no stove needed to validate a change.',
      },
    ],
    installSteps: [
      'Open the repository in HACS, download Ravelli Smart Wi-Fi and restart Home Assistant.',
      'In Settings › Devices & services, add the Ravelli Smart Wi-Fi integration.',
      'Choose local network discovery, or enter the module’s address.',
    ],
    ctaLabel: 'Open in HACS',
    screenshotAlts: [
      'Ravelli stove thermostat in Home Assistant, with the device’s controls and sensors',
      'Ravelli stove in Home Assistant: thermostat, power level, status and alarm sensors, climate comfort settings',
    ],
  },
  'database-backup': {
    seoTitle: 'Database Backup: PostgreSQL, MySQL, MongoDB Docker backups',
    description:
      'Docker container that backs up PostgreSQL, MariaDB/MySQL, MongoDB and SQLite: built-in Go scheduler, rotation, GPG/age encryption and healthcheck.',
    pitch:
      'One container to back up every database on a server. A YAML file describes the jobs, and the built-in Go scheduler produces compressed, encrypted dumps and prunes old ones according to your retention policy.',
    tags: ['Go', 'Docker', 'PostgreSQL', 'MongoDB'],
    stats: [
      { value: '4', label: 'engines: PostgreSQL, MariaDB/MySQL, MongoDB, SQLite' },
      { value: '~126 MB', label: 'image size, with no client preinstalled' },
      { value: '2', label: 'published architectures: amd64 and arm64' },
      { value: '4×/day', label: 'checks for a new Debian base image' },
    ],
    steps: [
      { title: 'Validation', description: 'backups.yml is validated at startup.' },
      { title: 'Clients', description: 'Only the clients you need are installed.' },
      { title: 'Scheduling', description: 'Each job runs on its own cron.' },
      { title: 'Dump', description: 'Compressed on the fly, encrypted if needed.' },
      { title: 'Rotation', description: 'Old backups are deleted.' },
    ],
    features: [
      {
        title: 'Four engines',
        description:
          'PostgreSQL (any client version from the PGDG repository), MariaDB/MySQL, MongoDB and SQLite, with a consistent snapshot even during writes.',
      },
      {
        title: 'Built-in scheduler',
        description: 'Cron expressions or shortcuts like @daily, no external cron daemon, with per-job retention.',
      },
      {
        title: 'Encryption at rest',
        description:
          'Symmetric GPG or age, with a passphrase or a public key: the container never needs the private key.',
      },
      {
        title: 'Non-root, hidden credentials',
        description:
          'Runs as non-root and never exposes credentials on the command line. The healthcheck uses native drivers.',
      },
    ],
    stack: [
      {
        title: 'Go',
        description:
          'A single statically compiled binary that embeds the scheduler and the healthcheck’s native drivers.',
      },
      {
        title: 'Debian slim',
        description: 'A lightweight base where each engine’s clients are installed on demand, in the version you want.',
      },
      {
        title: 'GPG and age',
        description: 'Two standard encryption formats you can decrypt without this tool, one of them public-key based.',
      },
      {
        title: 'GitHub Actions',
        description: 'Tests, multi-architecture images and an automatic rebuild when the Debian image changes.',
      },
    ],
    installSteps: [
      'Describe the jobs in backups.yml (here, a SQLite database backed up nightly) and chmod it to 600.',
      'Mount backups.yml, the backup folder and the source data into the container.',
      'Run docker compose up -d: compressed dumps land in ./backups.',
    ],
    snippetLabels: ['backups.yml', 'compose.yml'],
  },
  'unraid-btop': {
    seoTitle: 'Unraid btop: btop plugin and Unraid dashboard tile',
    description:
      'Unraid plugin that installs btop and adds a dashboard tile with load, disk and network I/O, and processes. Updated by CI on every btop release.',
    pitch:
      'The Unraid dashboard shows disk and container status, but not load average, throughput or the most resource-hungry processes. This plugin installs btop in the terminal and adds that information to a native tile.',
    tags: ['PHP', 'Unraid', 'CI/CD', 'Monitoring'],
    stats: [
      { value: '24 h', label: 'between checks for new btop releases' },
      { value: '6.12+', label: 'Unraid version required (x86_64)' },
    ],
    stepsHeading: 'How the plugin stays up to date',
    steps: [
      { title: 'Detection', description: 'CI picks up every btop release.' },
      { title: 'Build', description: 'The Unraid package is rebuilt.' },
      { title: 'Tests', description: 'Contents, PHP syntax and a smoke test.' },
      { title: 'Publishing', description: 'GitHub release and updated manifest.' },
      { title: 'Update', description: 'Unraid offers the new version.' },
    ],
    features: [
      {
        title: 'btop ready to use',
        description:
          'Available over SSH and in Unraid’s web terminal, with settings kept on the USB boot drive across reboots.',
      },
      {
        title: 'Dashboard tile',
        description:
          'Load average, CPU temperature, uptime, process count, aggregated disk and network I/O, and the most resource-hungry processes.',
      },
      {
        title: 'Configurable tile',
        description: 'Each section of the tile can be toggled, sorted and refreshed from the plugin settings.',
      },
      {
        title: 'Automatic updates',
        description:
          'CI checks for btop releases every day, rebuilds the package, tests it and publishes the plugin update.',
      },
    ],
    stack: [
      {
        title: 'PHP',
        description: 'Unraid settings pages and dashboard tiles are PHP pages served by the webGUI.',
      },
      {
        title: 'Static btop binary',
        description: 'The official binary runs on Unraid with no libraries to install.',
      },
      {
        title: 'Shell',
        description: 'The build assembles the Unraid package and checks its contents before publishing.',
      },
      {
        title: 'GitHub Actions',
        description: 'Daily tracking of btop releases, build, tests and publishing, with no manual steps.',
      },
    ],
    installSteps: [
      'In Unraid, open Plugins › Install Plugin and paste the plugin URL.',
      'The tile shows up on the dashboard; its settings are under Settings › User Utilities › btop.',
    ],
    snippetLabels: ['Plugin URL'],
    screenshotAlts: [
      'btop tile on the Unraid dashboard: load, disk and network I/O, most resource-hungry processes',
      'btop plugin settings in Unraid: tile sections, sorting and number of processes shown',
    ],
  },
  'unraid-traefik-rolling-update': {
    seoTitle: 'Unraid Traefik Rolling Update: zero-downtime updates',
    description:
      'Unraid plugin for zero-downtime container updates behind Traefik: the new version starts alongside the old one, takes over once healthy, or is rolled back.',
    pitch:
      'On Unraid, updating a container means stopping it, removing it and recreating it: the site is down for the whole operation. Behind Traefik, that isn’t necessary. This plugin starts the new version next to the old one and only switches traffic over once it’s ready.',
    tags: ['PHP', 'Unraid', 'Traefik', 'Docker'],
    stats: [
      {
        value: '1–2 vs ~50',
        label: 'requests dropped out of ~500 during the switch: this plugin vs Unraid’s native update',
      },
      { value: '0', label: 'labels or healthchecks to write' },
    ],
    steps: [
      { title: 'Pull', description: 'The new image is downloaded.' },
      { title: 'Start', description: 'A second instance starts alongside.' },
      { title: 'Health gate', description: 'Traefik waits until it’s healthy.' },
      { title: 'Switch', description: 'The old instance is stopped.' },
      { title: 'Cleanup', description: 'Old container and image removed.' },
    ],
    features: [
      {
        title: 'Automatic rollback',
        description:
          'If the new version never becomes healthy, it’s removed and the old one keeps running, with a notification explaining why.',
      },
      {
        title: 'Zero configuration',
        description:
          'Missing Traefik labels and healthchecks are added to the new instance automatically; the template is never modified.',
      },
      {
        title: 'Custom healthchecks',
        description:
          'Per container: path, port, expected status code and response text, interval and timeouts, Coolify-style.',
      },
      {
        title: 'Native everywhere else',
        description:
          'Containers you haven’t opted in keep Unraid’s native update, and uninstalling the plugin restores the original behavior.',
      },
    ],
    stack: [
      {
        title: 'PHP',
        description: 'The plugin hooks into the Update buttons on Unraid’s Docker page and adds its own settings page.',
      },
      {
        title: 'Docker healthchecks',
        description:
          'Traefik ignores containers that aren’t healthy: that’s what acts as the health gate before the switch.',
      },
      {
        title: 'Traefik labels',
        description: 'The old instance’s implicit service and port are copied over, following Traefik’s rules.',
      },
      {
        title: 'Self-tests',
        description: 'The decision logic is tested locally, without Docker or an Unraid server.',
      },
    ],
    installSteps: [
      'In Unraid, open Plugins › Install Plugin and paste the plugin URL.',
      'In Settings › Utilities › Traefik Rolling Update, enable zero-downtime updates for the containers you want.',
      'Reload the Docker page: Update and Update All now go through the rolling update.',
    ],
    snippetLabels: ['Plugin URL'],
    screenshotAlts: [
      'Container set to zero-downtime update with its healthcheck: path, scheme, port and expected code',
      'Traefik Rolling Update settings in Unraid: health gate timeout, notifications and healthcheck for a zero-downtime container',
    ],
  },
};
