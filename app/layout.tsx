import ThemeProvider from '@components/ThemeProvider'
import type { Metadata, Viewport } from 'next'
import { Raleway } from 'next/font/google'

import './globals.css'

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-raleway',
})

const siteUrl = 'https://gauthierpainteaux.fr'
const siteDescription =
  "Gauthier Painteaux, Lead Développeur Web Fullstack basé à Reims. Plus de 7 ans d'expérience sur des applications modernes en Next.js, React, TypeScript, Symfony et Docker."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Gauthier Painteaux · Lead Développeur Web Fullstack',
  description: siteDescription,
  applicationName: 'Gauthier Painteaux',
  keywords: [
    'Gauthier Painteaux',
    'Painteaux',
    'Développeur Web',
    'Lead Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Symfony',
    'Reims',
  ],
  authors: { name: 'Gauthier Painteaux', url: siteUrl },
  creator: 'Gauthier Painteaux',
  publisher: 'Gauthier Painteaux',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    siteName: 'Gauthier Painteaux',
    title: 'Gauthier Painteaux · Lead Développeur Web Fullstack',
    description: siteDescription,
    url: siteUrl,
    locale: 'fr_FR',
    images: [
      {
        url: '/photo.webp',
        width: 320,
        height: 320,
        alt: 'Photo de profil de Gauthier Painteaux',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Gauthier Painteaux · Lead Développeur Web Fullstack',
    description: siteDescription,
    images: ['/photo.webp'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fefce8' },
    { media: '(prefers-color-scheme: dark)', color: '#14110d' },
  ],
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
    <html lang="fr" className={raleway.variable} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
