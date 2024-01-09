import type { Metadata } from 'next'

import Provider from './Provider'

export const metadata: Metadata = {
  title: 'Gauthier Painteaux · Portfolio',
  description: 'Gauthier Painteaux, développeur web fullstack basé à Reims, France.',
  applicationName: 'Gauthier Painteaux',
  keywords: 'Gauthier Painteaux, Painteaux, Développeur Web, Développeur Web Fullstack',
  authors: { name: 'Gauthier Painteaux', url: 'https://gauthierpainteaux.fr' },
  creator: 'Gauthier Painteaux',
  publisher: 'Gauthier Painteaux',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Gauthier Painteaux',
    alternateName: 'GP',
    url: 'https://gauthierpainteaux.fr/',
  }

  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line react/no-danger */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <main>
          <Provider>{children}</Provider>
        </main>
      </body>
    </html>
  )
}
