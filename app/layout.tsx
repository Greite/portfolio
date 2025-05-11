import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";

import "@fontsource/raleway/latin.css"

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
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Gauthier Painteaux',
    alternateName: 'GP',
    url: 'https://gauthierpainteaux.fr/',
  }

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
