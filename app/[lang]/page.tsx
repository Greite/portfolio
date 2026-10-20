import AboutSkills from '@components/AboutSkills';
import BackToTop from '@components/BackToTop';
import Experience from '@components/Experience';
import Footer from '@components/Footer';
import Formations from '@components/Formations';
import Hero from '@components/Hero';
import Navigation from '@components/Navigation';
import Projects from '@components/Projects';
import ScrollProgress from '@components/ScrollProgress';
import { getDictionary, getLang } from '@root/lib/i18n';

export default async function Home() {
  const lang = await getLang();
  const { nav, common, faq } = await getDictionary();
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: faq.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  const profilePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    inLanguage: lang,
    mainEntity: {
      '@type': 'Person',
      '@id': 'https://gauthierpainteaux.fr/#person',
    },
  };

  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO, content is JSON-stringified and safe */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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
