import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/admin/'],
    },
    sitemap: 'https://www.pureplush.in/sitemap.xml',
    host: 'https://www.pureplush.in',
  };
}
