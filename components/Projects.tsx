import Link from 'next/link';
import { LuArrowUpRight, LuGithub } from 'react-icons/lu';

import Reveal from './Reveal';

interface Project {
  name: string;
  description: string;
  tags: string[];
  repoUrl: string;
}

const projects: Project[] = [
  {
    name: 'Speedtest Monitor',
    description:
      'Outil self-hosted de supervision de connexion internet basé sur Cloudflare Speedtest : dashboard temps réel, alertes et authentification OIDC.',
    tags: ['Next.js', 'Bun', 'TypeScript', 'SQLite'],
    repoUrl: 'https://github.com/Greite/speedtest-monitor',
  },
  {
    name: 'Unraid TUI',
    description:
      'Interface en terminal pour superviser et piloter un serveur Unraid sans quitter sa ligne de commande.',
    tags: ['Go', 'TUI', 'Unraid'],
    repoUrl: 'https://github.com/Greite/unraid-tui',
  },
  {
    name: 'Database Backup',
    description:
      'Container Docker léger pour automatiser les sauvegardes de bases PostgreSQL, MariaDB/MySQL et MongoDB via cron.',
    tags: ['Docker', 'Shell', 'PostgreSQL', 'MongoDB'],
    repoUrl: 'https://github.com/Greite/database-backup',
  },
];

export default function Projects() {
  return (
    <section
      id="projets"
      aria-labelledby="projects-heading"
      className="w-full scroll-mt-20 border-y border-border bg-surface-raised"
    >
      <Reveal className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-16 md:px-[120px] md:py-[100px]">
        {/* Section Header */}
        <div className="flex items-center gap-4">
          <div aria-hidden="true" className="h-[3px] w-10 rounded-sm bg-accent" />
          <h2 id="projects-heading" className="text-2xl font-semibold tracking-[var(--tracking-brand)] text-fg">
            Projets
          </h2>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.name}>
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} — voir le code sur GitHub (ouvre dans un nouvel onglet)`}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface-raised p-6 transition-colors hover:border-border-accent"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-fg">{project.name}</h3>
                  <LuArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-fg-secondary transition-colors group-hover:text-accent"
                  />
                </div>

                <p className="text-sm leading-relaxed text-fg-secondary flex-1">{project.description}</p>

                <ul className="flex flex-wrap gap-2" aria-label={`Technologies de ${project.name}`}>
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-medium text-accent-soft-fg"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-fg-secondary">
                  <LuGithub size={14} aria-hidden="true" />
                  Greite/{project.repoUrl.split('/').pop()}
                </span>
              </Link>
            </li>
          ))}

          {/* CTA card vers GitHub */}
          <li>
            <Link
              href="https://github.com/Greite"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col justify-center items-center gap-3 rounded-2xl border border-dashed border-border bg-surface-raised p-6 text-center transition-colors hover:border-border-accent"
            >
              <LuGithub size={28} aria-hidden="true" className="text-accent" />
              <span className="text-base font-semibold text-fg">Tous mes projets</span>
            </Link>
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
