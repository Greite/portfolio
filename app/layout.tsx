import type { Metadata } from 'next'

import '@fontsource/raleway/latin.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gauthier Painteaux · Portfolio',
  description: 'Gauthier Painteaux, développeur web fullstack basé à Reims, France.',
  applicationName: 'Gauthier Painteaux',
  keywords: 'Gauthier Painteaux, Painteaux, Développeur Web, Développeur Web Fullstack',
  authors: { name: 'Gauthier Painteaux', url: 'https://gauthierpainteaux.fr' },
  creator: 'Gauthier Painteaux',
  publisher: 'Gauthier Painteaux',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://gauthierpainteaux.fr/#website',
        name: 'Gauthier Painteaux',
        alternateName: 'GP',
        url: 'https://gauthierpainteaux.fr/',
      },
      {
        '@type': 'Person',
        '@id': 'https://gauthierpainteaux.fr/#person',
        name: 'Gauthier Painteaux',
        jobTitle: 'Lead Développeur',
        description: 'Développeur Web Fullstack basé à Reims, France',
        url: 'https://gauthierpainteaux.fr',
        email: 'contact@gauthierpainteaux.fr',
        worksFor: {
          '@type': 'Organization',
          name: 'Koul',
          url: 'https://koul.io/',
        },
        alumniOf: [
          { '@type': 'EducationalOrganization', name: 'IUT Nancy Charlemagne' },
          { '@type': 'EducationalOrganization', name: 'Lycée Raymond Poincaré' },
          { '@type': 'EducationalOrganization', name: 'IUT Metz' },
        ],
        knowsAbout: ['Next.JS', 'React', 'TypeScript', 'Symfony', 'Docker', 'WordPress', 'Slim'],
        sameAs: ['https://www.linkedin.com/in/gauthier-painteaux-1018a2167/', 'https://github.com/Greite'],
      },
    ],
  }

  return (
    <html lang="fr">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
