import AboutSkills from '@components/AboutSkills'
import Experience from '@components/Experience'
import Footer from '@components/Footer'
import Formations from '@components/Formations'
import Hero from '@components/Hero'
import Navigation from '@components/Navigation'
import Projects from '@components/Projects'

export default function Home() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "Quelle est l'expérience actuelle de Gauthier Painteaux ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Gauthier Painteaux est actuellement Lead Développeur chez Koul depuis juin 2023. Il a évolué du poste de Développeur Web Fullstack (juin 2023 - mai 2025) à Lead Développeur (depuis juin 2025). Il travaille principalement avec Next.JS, Symfony, TypeScript et Docker.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quelles technologies maîtrise Gauthier Painteaux ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Gauthier Painteaux maîtrise un large éventail de technologies fullstack : côté frontend avec React, Next.JS, TypeScript ; côté backend avec Symfony, Slim et WordPress ; ainsi que des outils DevOps comme Docker.',
        },
      },
      {
        '@type': 'Question',
        name: 'Dans quelles entreprises Gauthier Painteaux a-t-il travaillé ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Gauthier Painteaux a travaillé chez Koul (2023-présent) en tant que Lead Développeur, Globalis media system (2018-2023) comme Développeur Fullstack, Appartoo (2018) en stage, et DTI Soft (2016) en stage de développement avec Talend.',
        },
      },
    ],
  }

  const profilePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': 'https://gauthierpainteaux.fr/#person',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }} />

      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:rounded-full focus-visible:bg-cta focus-visible:px-5 focus-visible:py-3 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-cta-fg"
      >
        Aller au contenu principal
      </a>

      <Navigation />

      <main id="main">
        <Hero />

        <AboutSkills />

        <Experience />

        <Projects />

        <Formations />
      </main>

      <Footer />
    </>
  )
}
