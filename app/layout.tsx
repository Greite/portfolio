import type { Metadata } from 'next'

import Provider from './Provider'

export const metadata: Metadata = {
  title: 'Portfolio | Gauthier Painteaux',
  description: 'Gauthier Painteaux, développeur web fullstack basé à Reims, France.',
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
