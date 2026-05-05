import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://gauthierpainteaux.fr/sitemap.xml',
    host: 'https://gauthierpainteaux.fr',
  }
}
