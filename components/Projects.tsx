import { getLang } from '@root/lib/i18n';
import { projects } from '@root/lib/projects';
import Link from 'next/link';
import { LuArrowRight, LuGithub } from 'react-icons/lu';

import Reveal from './Reveal';

export default async function Projects() {
  const lang = await getLang();

  return (
    <section
      id="projets"
      aria-labelledby="projects-heading"
      className="w-full scroll-mt-20 border-y border-border bg-surface-raised"
    >
      <Reveal className="mx-auto flex max-w-[90rem] flex-col gap-12 px-6 py-16 md:px-[7.5rem] md:py-[6.25rem]">
        {/* Section Header */}
        <div className="flex items-center gap-4">
          <div aria-hidden="true" className="h-[3px] w-10 rounded-sm bg-accent" />
          <h2 id="projects-heading" className="text-2xl font-semibold text-fg">
            Projets
          </h2>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <li key={project.name} className="stagger-item" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="group relative isolate flex h-full flex-col rounded-2xl border border-border bg-surface-raised p-6 transition-[translate,scale,border-color] duration-200 ease-out-strong hover:-translate-y-1 hover:border-border-accent active:scale-[0.98]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 shadow-[var(--shadow-photo)] transition-opacity duration-200 ease-out-strong group-hover:opacity-100 bg-[radial-gradient(120%_80%_at_50%_0%,_var(--glow-soft)_0%,_transparent_70%)]"
                />

                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-fg">
                      <Link
                        href={`/${lang}/projects/${project.slug}`}
                        className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-3 focus-visible:after:outline-accent focus-visible:after:outline-solid"
                      >
                        {project.name}
                      </Link>
                    </h3>
                    <LuArrowRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-fg-secondary transition-[color,translate] duration-200 ease-out-strong group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </div>

                  <p className="text-sm leading-relaxed text-fg-secondary flex-1">{project.description}</p>

                  <ul className="flex flex-wrap gap-2" aria-label={`Technologies de ${project.name}`}>
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[0.6875rem] font-medium text-accent-soft-fg"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex items-center gap-1.5 self-start rounded-md text-xs font-medium text-fg-secondary transition-colors duration-150 hover:text-accent"
                  >
                    <LuGithub size={14} aria-hidden="true" />
                    Greite/{project.repoUrl.split('/').pop()}
                    <span className="sr-only"> — code de {project.name} sur GitHub (ouvre dans un nouvel onglet)</span>
                  </Link>
                </div>
              </div>
            </li>
          ))}

          {/* CTA card vers GitHub */}
          <li
            className={`stagger-item ${projects.length % 2 === 0 ? 'sm:col-span-2' : ''}`}
            style={{ animationDelay: `${projects.length * 50}ms` }}
          >
            <Link
              href="https://github.com/Greite"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-center items-center gap-3 rounded-2xl border border-dashed border-border bg-surface-raised p-6 text-center transition-[translate,scale,border-color] duration-200 ease-out-strong hover:-translate-y-1 hover:border-border-accent active:scale-[0.98]"
            >
              <LuGithub
                size={28}
                aria-hidden="true"
                className="text-accent transition-transform duration-200 ease-out-strong group-hover:scale-110"
              />
              <span className="text-base font-semibold text-fg">Tous mes projets</span>
            </Link>
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
