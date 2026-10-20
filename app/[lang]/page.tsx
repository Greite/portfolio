import AboutSkills from '@components/AboutSkills';
import BackToTop from '@components/BackToTop';
import Experience from '@components/Experience';
import Footer from '@components/Footer';
import Formations from '@components/Formations';
import Hero from '@components/Hero';
import Navigation from '@components/Navigation';
import Projects from '@components/Projects';
import ScrollProgress from '@components/ScrollProgress';
import { alternates, getDictionary, getLang } from '@root/lib/i18n';
import type { Metadata } from 'next';

const siteUrl = 'https://gauthierpainteaux.fr';

/** Ici et non dans le layout : la 404 hérite du layout et ne doit pas reprendre le canonical de l'accueil. */
export async function generateMetadata(): Promise<Metadata> {
  return { alternates: alternates(await getLang(), '') };
}

export default async function Home() {
  const lang = await getLang();
  const { nav, common } = await getDictionary();
  const profilePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteUrl}/${lang}#profilepage`,
    url: `${siteUrl}/${lang}`,
    inLanguage: lang,
    isPartOf: { '@id': `${siteUrl}/#website` },
    mainEntity: { '@id': `${siteUrl}/#person`, name: 'Gauthier Painteaux' },
  };

  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO, content is JSON-stringified and safe */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }} />

      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:rounded-full focus-visible:bg-cta focus-visible:px-5 focus-visible:py-3 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-cta-fg"
      >
        {common.skip}
      </a>

      <ScrollProgress />

      <Navigation nav={nav} theme={common.theme} />

      <main id="main">
        <Hero />

        <AboutSkills />

        <Experience />

        <Projects />

        <Formations />
      </main>

      <Footer />

      <BackToTop label={common.backToTop} />
    </>
  );
}
