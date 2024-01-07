import type { Metadata } from 'next'

import Provider from './Provider'

export const metadata: Metadata = {
  title: 'Gauthier Painteaux · Portfolio',
  description: 'Gauthier Painteaux, développeur web fullstack basé à Reims, France.',
  applicationName: 'Gauthier Painteaux · Portfolio',
  keywords: 'Gauthier Painteaux, Painteaux, Développeur Web, Développeur Web Fullstack',
  authors: { name: 'Gauthier Painteaux', url: 'https://gauthierpainteaux.fr' },
  creator: 'Gauthier Painteaux',
  publisher: 'Gauthier Painteaux',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <Provider>{children}</Provider>
        </main>
      </body>
    </html>
  )
}
