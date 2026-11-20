import type { MetadataRoute } from 'next';
import { routes } from '@/lib/routes';
import { siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(routes).map((r) => ({
    url: `${siteUrl}${r.it}`,
    changeFrequency: r.it === '/menu/' ? 'daily' : 'monthly',
    priority: r.it === '/' ? 1 : 0.7,
    alternates: { languages: { it: `${siteUrl}${r.it}`, en: `${siteUrl}${r.en}` } },
  }));
}
