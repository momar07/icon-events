import { MetadataRoute } from 'next';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'ar'];
  const routes = ['', '/services', '/portfolio', '/about', '/contact'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${APP_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${APP_URL}/en${route}`,
            ar: `${APP_URL}/ar${route}`,
          },
        },
      });
    }
  }

  return entries;
}
