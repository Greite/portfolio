import { locales } from '@root/lib/locales';
import { slugs } from '@root/lib/projects';
import type { MetadataRoute } from 'next';

const siteUrl = 'https://gauthierpainteaux.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [{ path: '', priority: 1 }, ...slugs.map((slug) => ({ path: `/projects/${slug}`, priority: 0.8 }))];

  return pages.flatMap(({ path, priority }) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority,
      alternates: {
        languages: { fr: `${siteUrl}/fr${path}`, en: `${siteUrl}/en${path}`, 'x-default': `${siteUrl}/en${path}` },
      },
    })),
  );
}
