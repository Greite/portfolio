import ThemeProvider from '@components/ThemeProvider';
import { getDictionary, getLang, ogLocale } from '@root/lib/i18n';
import { locales } from '@root/lib/locales';
import type { Metadata, Viewport } from 'next';
import { Raleway } from 'next/font/google';

import '../globals.css';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-raleway',
});

const siteUrl = 'https://gauthierpainteaux.fr';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const { meta } = await getDictionary();

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    applicationName: 'Gauthier Painteaux',
    keywords: meta.keywords,
    authors: { name: 'Gauthier Painteaux', url: siteUrl },
    creator: 'Gauthier Painteaux',
    publisher: 'Gauthier Painteaux',
    // Pas d'`alternates` ni de `robots` ici : la 404 hérite du layout (canonical et hreflang dans chaque page).
    openGraph: {
      type: 'profile',
      siteName: 'Gauthier Painteaux',
      title: meta.title,
      description: meta.description,
      url: `/${lang}`,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((other) => other !== lang).map((other) => ogLocale[other]),
      images: [{ url: '/photo.webp', width: 320, height: 320, alt: meta.photoAlt }],
    },
    twitter: {
      card: 'summary',
      title: meta.title,
      description: meta.description,
      images: ['/photo.webp'],
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fefce8' },
    { media: '(prefers-color-scheme: dark)', color: '#14110d' },
  ],
};

export default async function RootLayout({ children }: LayoutProps<'/[lang]'>) {
  const lang = await getLang();
  const { person } = await getDictionary();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'Gauthier Painteaux',
        alternateName: 'GP',
        // Le site porte les deux langues : URL racine et langues fixes, quelle que soit la page.
        url: `${siteUrl}/`,
        inLanguage: ['fr', 'en'],
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: 'Gauthier Painteaux',
        jobTitle: person.jobTitle,
        description: person.description,
        url: `${siteUrl}/`,
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
        knowsAbout: ['Next.js', 'React', 'TypeScript', 'Symfony', 'Laravel', 'Docker', 'WordPress', 'Slim'],
        sameAs: ['https://www.linkedin.com/in/gauthier-painteaux-1018a2167/', 'https://github.com/Greite'],
      },
    ],
  };

  return (
    <html lang={lang} className={raleway.variable} suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO, content is JSON-stringified and safe */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
