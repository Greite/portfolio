import CopyButton from '@components/CopyButton';
import Footer from '@components/Footer';
import Navigation from '@components/Navigation';
import ScrollProgress from '@components/ScrollProgress';
import { getRepoStats } from '@root/lib/github';
import { alternates, getDictionary, getLang, ogLocale } from '@root/lib/i18n';
import { getAdjacentProjects, getProject, projects, type Screenshot } from '@root/lib/projects';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { LuArrowLeft, LuArrowRight, LuArrowUpRight, LuBookOpen, LuCheck, LuGithub, LuStar } from 'react-icons/lu';

const siteUrl = 'https://gauthierpainteaux.fr';
const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'Europe/Paris' });
const wrap = 'mx-auto w-full max-w-[90rem] px-6 md:px-[7.5rem]';
/** Classes complètes pour que Tailwind les génère. */
const statColumns: Record<number, string> = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<'/[lang]/projects/[slug]'>): Promise<Metadata> {
  const project = getProject((await params).slug);

  if (!project) {
    return {};
  }

  const lang = await getLang();
  const { meta } = await getDictionary();
  const title = project.seoTitle;
  const path = `/projects/${project.slug}`;
  const cover = project.screenshots?.[0];

  return {
    title,
    description: project.description,
    alternates: alternates(lang, path),
    openGraph: {
      type: 'website',
      siteName: 'Gauthier Painteaux',
      locale: ogLocale[lang],
      url: `/${lang}${path}`,
      title,
      description: project.description,
      images: [
        cover
          ? { url: cover.light, width: 1600, height: 1000, alt: cover.alt }
          : { url: '/photo.webp', width: 320, height: 320, alt: meta.photoAlt },
      ],
    },
    twitter: {
      card: cover ? 'summary_large_image' : 'summary',
      title,
      description: project.description,
      images: [cover ? cover.light : '/photo.webp'],
    },
  };
}

/**
 * Variantes clair/sombre : pas de `preload`, sinon les deux seraient chargées ; le lazy-loading ne charge que
 * celle du thème actif. Image unique : la couverture peut être préchargée.
 */
function ThemedScreenshot({
  screenshot,
  cover = false,
  sizes = '(min-width: 90rem) 37rem, (min-width: 64rem) 50vw, 100vw',
}: {
  screenshot: Screenshot;
  cover?: boolean;
  sizes?: string;
}) {
  const props = {
    alt: screenshot.alt,
    width: 1600,
    height: 1000,
    sizes: cover ? '(min-width: 90rem) 40rem, (min-width: 64rem) 50vw, 100vw' : sizes,
    fetchPriority: cover ? ('high' as const) : undefined,
  };
  const className = 'h-auto w-full rounded-2xl border border-border';

  if (screenshot.light === screenshot.dark) {
    return <Image {...props} src={screenshot.light} preload={cover} className={className} />;
  }

  return (
    <>
      <Image {...props} src={screenshot.light} className={`${className} dark:hidden`} />
      <Image {...props} src={screenshot.dark} className={`${className} hidden dark:block`} />
    </>
  );
}

function SectionHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <div aria-hidden="true" className="h-[3px] w-10 rounded-sm bg-accent" />
      <h2 id={id} className="text-2xl font-semibold text-fg">
        {children}
      </h2>
    </div>
  );
}

export default async function ProjectPage({ params }: PageProps<'/[lang]/projects/[slug]'>) {
  const project = getProject((await params).slug);
  const lang = await getLang();

  if (!project) {
    notFound();
  }

  const stats = await getRepoStats(project.repoUrl);
  const { previous, next } = getAdjacentProjects(project.slug);
  const [cover, ...gallery] = project.screenshots ?? [];
  const repoName = project.repoUrl.split('/').pop();
  // Élision : « d’Unraid btop », « de Speedtest Monitor ».
  const ofName = /^[aeiouyh]/i.test(project.name) ? `d’${project.name}` : `de ${project.name}`;

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.name,
    description: project.description,
    url: `${siteUrl}/${lang}/projects/${project.slug}`,
    inLanguage: lang,
    codeRepository: project.repoUrl,
    keywords: project.tags.join(', '),
    programmingLanguage: project.programmingLanguage,
    ...(stats?.license && { license: `https://spdx.org/licenses/${stats.license}.html` }),
    author: { '@id': `${siteUrl}/#person` },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${siteUrl}/${lang}` },
      { '@type': 'ListItem', position: 2, name: project.name },
    ],
  };

  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO, content is JSON-stringified and safe */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO, content is JSON-stringified and safe */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:rounded-full focus-visible:bg-cta focus-visible:px-5 focus-visible:py-3 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-cta-fg"
      >
        Aller au contenu principal
      </a>

      <ScrollProgress />

      <Navigation />

      <main id="main">
        {/* En-tête : texte à gauche, visuel posé dans le halo à droite */}
        <section aria-labelledby="project-name" className="relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-[-10%] -z-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_var(--glow)_0%,_transparent_70%)] sm:h-[44rem] sm:w-[44rem]"
          />
          <div
            className={`${wrap} grid items-center gap-12 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-16`}
          >
            <div className="reveal flex flex-col gap-6">
              <nav aria-label="Fil d'Ariane">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-fg-secondary">
                  <li>
                    <Link href={`/${lang}`} className="rounded-md transition-colors duration-150 hover:text-accent">
                      Accueil
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li aria-current="page" className="font-medium text-fg">
                    {project.name}
                  </li>
                </ol>
              </nav>

              <h1 id="project-name" className="text-4xl leading-[1.05] font-bold text-fg sm:text-5xl lg:text-6xl">
                {project.name}
              </h1>
              <p className="max-w-[38rem] text-lg leading-relaxed text-fg-secondary">{project.pitch}</p>
              <ul className="flex flex-wrap gap-2" aria-label={`Technologies de ${project.name}`}>
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-soft-fg"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                <Link
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-fg transition-[background-color,scale] duration-150 ease-out-strong hover:bg-accent-strong active:scale-[0.97]"
                >
                  <LuGithub size={16} aria-hidden="true" />
                  Voir sur GitHub
                  <span className="sr-only">(ouvre dans un nouvel onglet)</span>
                </Link>

                {stats && (
                  <dl className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-fg-secondary">
                    {stats.latestRelease && (
                      <div className="flex gap-1">
                        <dt>Version</dt>
                        <dd className="font-medium text-fg">{stats.latestRelease}</dd>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <dt>
                        <LuStar size={12} aria-hidden="true" />
                        <span className="sr-only">Étoiles</span>
                      </dt>
                      <dd className="font-medium text-fg">{stats.stars}</dd>
                    </div>
                    {stats.license && (
                      <div className="flex gap-1">
                        <dt>Licence</dt>
                        <dd className="font-medium text-fg">{stats.license}</dd>
                      </div>
                    )}
                    <div className="flex gap-1">
                      <dt>Mis à jour le</dt>
                      <dd className="font-medium text-fg">
                        <time dateTime={stats.pushedAt}>{dateFormat.format(new Date(stats.pushedAt))}</time>
                      </dd>
                    </div>
                  </dl>
                )}
              </div>
            </div>

            <div className="reveal-photo reveal-delay-2 min-w-0 lg:rotate-[1.5deg]">
              <div className="rounded-2xl shadow-[var(--shadow-photo)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.55)]">
                {cover ? (
                  <ThemedScreenshot screenshot={cover} cover />
                ) : (
                  project.codeSample && (
                    <pre className="max-h-[30rem] overflow-auto rounded-2xl border border-border bg-surface-raised p-6 font-mono text-sm leading-relaxed text-fg">
                      <code className={`language-${project.codeSample.language}`}>{project.codeSample.code}</code>
                    </pre>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Chiffres clés" className="bg-surface-raised">
          <dl
            className={`${wrap} grid gap-10 py-12 sm:grid-cols-2 lg:py-14 ${statColumns[project.stats.length] ?? 'lg:grid-cols-3'}`}
          >
            {project.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <dt className="order-last max-w-[18rem] text-sm leading-relaxed text-fg-secondary">{stat.label}</dt>
                <dd className="text-4xl font-bold whitespace-nowrap text-accent lg:text-5xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="bg-surface-raised">
          <div className={`${wrap} flex flex-col gap-24 pt-12 pb-20 lg:pt-10 lg:pb-24`}>
            <div className="flex flex-col gap-10">
              <SectionHeading>{project.stepsHeading ?? `Comment fonctionne ${project.name}`}</SectionHeading>
              <ol className="grid gap-8 lg:grid-cols-5 lg:gap-6">
                {project.steps.map((step, index) => (
                  <li key={step.title} className="relative flex gap-5 lg:flex-col lg:gap-4">
                    {index < project.steps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute top-12 bottom-[-1.5rem] left-5 w-px bg-border-accent lg:top-5 lg:right-[-1.5rem] lg:bottom-auto lg:left-12 lg:h-px lg:w-auto"
                      />
                    )}
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-surface-raised text-sm font-bold text-accent">
                      {index + 1}
                    </span>
                    <div className="flex flex-col gap-1.5 pt-1.5 lg:pt-0">
                      <h3 className="text-base font-semibold text-fg">{step.title}</h3>
                      <p className="text-sm leading-relaxed text-fg-secondary">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-10">
              <SectionHeading>Points forts {ofName}</SectionHeading>
              <ul className="grid gap-x-16 gap-y-8 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature.title} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-soft-fg">
                      <LuCheck size={16} aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-semibold text-fg">{feature.title}</h3>
                      <p className="text-sm leading-relaxed text-fg-secondary">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {gallery.length > 0 && (
              <div className="flex flex-col gap-10">
                <SectionHeading>En images</SectionHeading>
                <ul className={`grid gap-6 ${gallery.length > 1 ? 'lg:grid-cols-2' : 'max-w-[56rem]'}`}>
                  {gallery.map((screenshot) => (
                    <li key={screenshot.light}>
                      <ThemedScreenshot
                        screenshot={screenshot}
                        sizes={gallery.length > 1 ? undefined : '(min-width: 64rem) 56rem, 100vw'}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-10">
              <SectionHeading>Choix techniques {ofName}</SectionHeading>
              <dl className="divide-y divide-border">
                {project.stack.map((choice) => (
                  <div
                    key={choice.title}
                    className="grid gap-1 py-5 first:pt-0 last:pb-0 sm:grid-cols-[16rem_minmax(0,1fr)] sm:gap-10"
                  >
                    <dt className="text-base font-semibold text-fg">{choice.title}</dt>
                    <dd className="max-w-[44rem] text-sm leading-relaxed text-fg-secondary sm:text-base">
                      {choice.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <section aria-labelledby="install-heading" className="bg-surface-raised">
          <div className={`${wrap} grid gap-12 pb-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:pb-24`}>
            <div className="flex flex-col gap-8">
              <SectionHeading id="install-heading">Installer {project.name}</SectionHeading>
              <ol className="flex flex-col gap-5">
                {project.install.steps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-fg">
                      {index + 1}
                    </span>
                    <p className="pt-0.5 text-sm leading-relaxed text-fg">{step}</p>
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                {project.install.cta && (
                  <Link
                    href={project.install.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-[background-color,scale] duration-150 ease-out-strong hover:bg-accent-strong active:scale-[0.97]"
                  >
                    {project.install.cta.label}
                    <LuArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only">(ouvre dans un nouvel onglet)</span>
                  </Link>
                )}
                <Link
                  href={`${project.repoUrl}#readme`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-accent transition-colors duration-150 hover:text-accent-strong"
                >
                  <LuBookOpen size={16} aria-hidden="true" />
                  Documentation complète de Greite/{repoName}
                  <span className="sr-only">(ouvre dans un nouvel onglet)</span>
                </Link>
              </div>
            </div>

            {project.install.snippets && (
              <div className="flex min-w-0 flex-col gap-4 self-center">
                {project.install.snippets.map((snippet) => (
                  <figure
                    key={snippet.label}
                    className="overflow-hidden rounded-2xl border border-border bg-surface-raised"
                  >
                    <figcaption className="flex items-center justify-between gap-4 border-b border-border pr-1 pl-5 text-xs font-medium text-fg-secondary">
                      {snippet.label}
                      <CopyButton text={snippet.code} subject={snippet.label} />
                    </figcaption>
                    <pre
                      className={`overflow-x-auto p-5 font-mono text-sm leading-relaxed text-fg ${snippet.language === 'text' ? 'break-all whitespace-pre-wrap' : ''}`}
                    >
                      <code className={`language-${snippet.language}`}>{snippet.code}</code>
                    </pre>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>

        <nav aria-label="Autres projets" className={`${wrap} grid gap-6 py-16 sm:grid-cols-2`}>
          {[
            { target: previous, label: 'Projet précédent', isNext: false },
            { target: next, label: 'Projet suivant', isNext: true },
          ].map(({ target, label, isNext }) => {
            const thumbnail = target.screenshots?.[0];

            return (
              <Link
                key={label}
                href={`/${lang}/projects/${target.slug}`}
                className={`group flex items-center gap-5 rounded-2xl border border-border bg-surface-raised p-5 transition-[translate,border-color] duration-200 ease-out-strong hover:-translate-y-1 hover:border-border-accent ${isNext ? 'sm:flex-row-reverse sm:text-right' : ''}`}
              >
                {thumbnail && (
                  <Image
                    src={thumbnail.light}
                    alt=""
                    width={1600}
                    height={1000}
                    sizes="8rem"
                    className="hidden aspect-[16/10] w-32 shrink-0 rounded-lg border border-border object-cover sm:block"
                  />
                )}
                <span className={`flex min-w-0 flex-col gap-1 ${isNext ? 'sm:items-end' : ''}`}>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-fg-secondary">
                    {!isNext && <LuArrowLeft size={14} aria-hidden="true" />}
                    {label}
                    {isNext && <LuArrowRight size={14} aria-hidden="true" />}
                  </span>
                  <span className="text-lg font-semibold text-fg transition-colors duration-200 group-hover:text-accent">
                    {target.name}
                  </span>
                  <span className="line-clamp-2 text-sm text-fg-secondary">{target.description}</span>
                </span>
              </Link>
            );
          })}
        </nav>
      </main>

      <Footer />
    </>
  );
}
