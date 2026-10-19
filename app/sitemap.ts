import { projects } from '@root/lib/projects';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://gauthierpainteaux.fr',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projects.map(({ slug }) => ({
      url: `https://gauthierpainteaux.fr/projets/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
