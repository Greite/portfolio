import Footer from '@components/Footer';
import Navigation from '@components/Navigation';
import Reveal from '@components/Reveal';
import ScrollProgress from '@components/ScrollProgress';
import { getRepoStats } from '@root/lib/github';
import { getAdjacentProjects, getProject, projects, type Screenshot } from '@root/lib/projects';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LuArrowLeft, LuArrowRight, LuArrowUpRight, LuBookOpen, LuGithub, LuStar } from 'react-icons/lu';

const siteUrl = 'https://gauthierpainteaux.fr';
const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'Europe/Paris' });

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<'/projets/[slug]'>): Promise<Metadata> {
  const project = getProject((await params).slug);

  if (!project) {
    return {};
  }

  const title = `${project.name} · Gauthier Painteaux`;
  const url = `/projets/${project.slug}`;
  const cover = project.screenshots?.[0];

  return {
    title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: 'Gauthier Painteaux',
      locale: 'fr_FR',
      url,
      title,
      description: project.description,
      images: [
        cover
          ? { url: cover.light, width: 1600, height: 1000, alt: cover.alt }
          : { url: '/photo.webp', width: 320, height: 320, alt: 'Photo de profil de Gauthier Painteaux' },
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

/** Pas de `preload` : les deux variantes seraient chargées ; le lazy-loading ne charge que celle du thème actif. */
function ThemedScreenshot({ screenshot, cover = false }: { screenshot: Screenshot; cover?: boolean }) {
  const props = {
    alt: screenshot.alt,
    width: 1600,
    height: 1000,
    sizes: '(min-width: 90rem) 75rem, 100vw',
    fetchPriority: cover ? ('high' as const) : undefined,
  };
  const className = 'h-auto w-full rounded-2xl border border-border';

  if (screenshot.light === screenshot.dark) {
    return <Image {...props} src={screenshot.light} className={className} />;
  }

  return (
    <>
      <Image {...props} src={screenshot.light} className={`${className} dark:hidden`} />
      <Image {...props} src={screenshot.dark} className={`${className} hidden dark:block`} />
    </>
  );
}

export default async function ProjectPage({ params }: PageProps<'/projets/[slug]'>) {
  const project = getProject((await params).slug);

  if (!project) {
    notFound();
  }

  const stats = await getRepoStats(project.repoUrl);
  const { previous, next } = getAdjacentProjects(project.slug);
  const [cover, ...gallery] = project.screenshots ?? [];
  const repoName = project.repoUrl.split('/').pop();

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.name,
    description: project.description,
    url: `${siteUrl}/projets/${project.slug}`,
    codeRepository: project.repoUrl,
    keywords: project.tags.join(', '),
    author: { '@id': `${siteUrl}/#person` },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteUrl },
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

      <main id="main" className="mx-auto flex w-full max-w-[90rem] flex-col gap-16 px-6 py-12 md:px-[7.5rem] md:py-16">
        <div className="flex flex-col gap-8">
          <nav aria-label="Fil d'Ariane">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-fg-secondary">
              <li>
                <Link href="/" className="rounded-md transition-colors duration-150 hover:text-accent">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="font-medium text-fg">
                {project.name}
              </li>
            </ol>
          </nav>

          <header className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="flex max-w-[45rem] flex-col gap-5">
              <h1 className="text-4xl font-bold text-fg sm:text-5xl">{project.name}</h1>
              <p className="text-lg leading-relaxed text-fg-secondary">{project.pitch}</p>
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
            </div>

            <div className="flex shrink-0 flex-col gap-4 lg:items-end">
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
                <dl className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-fg-secondary lg:justify-end">
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
          </header>

          {cover ? (
            <ThemedScreenshot screenshot={cover} cover />
          ) : (
            project.codeSample && (
              <pre className="overflow-x-auto rounded-2xl border border-border bg-surface-raised p-6 font-mono text-sm leading-relaxed text-fg">
                <code className={`language-${project.codeSample.language}`}>{project.codeSample.code}</code>
              </pre>
            )
          )}
        </div>

        <Reveal className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div aria-hidden="true" className="h-[3px] w-10 rounded-sm bg-accent" />
            <h2 className="text-2xl font-semibold text-fg">Points forts</h2>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature.title}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-surface-raised p-6"
              >
                <h3 className="text-base font-semibold text-fg">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-fg-secondary">{feature.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        {gallery.length > 0 && (
          <Reveal className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div aria-hidden="true" className="h-[3px] w-10 rounded-sm bg-accent" />
              <h2 className="text-2xl font-semibold text-fg">En images</h2>
            </div>
            <ul className="grid gap-6 lg:grid-cols-2">
              {gallery.map((screenshot) => (
                <li key={screenshot.light}>
                  <ThemedScreenshot screenshot={screenshot} />
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Link
          href={`${project.repoUrl}#readme`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-dashed border-border bg-surface-raised p-6 transition-[translate,border-color] duration-200 ease-out-strong hover:-translate-y-1 hover:border-border-accent"
        >
          <span className="flex items-center gap-3">
            <LuBookOpen size={20} aria-hidden="true" className="text-accent" />
            <span className="flex flex-col">
              <span className="text-base font-semibold text-fg">Installation et documentation</span>
              <span className="text-sm text-fg-secondary">Greite/{repoName} sur GitHub</span>
            </span>
          </span>
          <LuArrowUpRight
            size={18}
            aria-hidden="true"
            className="shrink-0 text-fg-secondary transition-colors duration-200 group-hover:text-accent"
          />
          <span className="sr-only">(ouvre dans un nouvel onglet)</span>
        </Link>

        <nav aria-label="Autres projets" className="grid gap-6 sm:grid-cols-2">
          {[
            { target: previous, label: 'Projet précédent', isNext: false },
            { target: next, label: 'Projet suivant', isNext: true },
          ].map(({ target, label, isNext }) => (
            <Link
              key={label}
              href={`/projets/${target.slug}`}
              className={`group flex flex-col gap-1 rounded-2xl border border-border bg-surface-raised p-6 transition-[translate,border-color] duration-200 ease-out-strong hover:-translate-y-1 hover:border-border-accent ${isNext ? 'sm:items-end sm:text-right' : ''}`}
            >
              <span className="flex items-center gap-1.5 text-xs font-medium text-fg-secondary">
                {!isNext && <LuArrowLeft size={14} aria-hidden="true" />}
                {label}
                {isNext && <LuArrowRight size={14} aria-hidden="true" />}
              </span>
              <span className="text-lg font-semibold text-fg transition-colors duration-200 group-hover:text-accent">
                {target.name}
              </span>
            </Link>
          ))}
        </nav>
      </main>

      <Footer />
    </>
  );
}
