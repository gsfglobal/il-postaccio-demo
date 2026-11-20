import type { MetadataRoute } from 'next';
import { demoMode, siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  // In demo nessuna indicizzazione
  if (demoMode) return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/', disallow: '/admin/' }, sitemap: `${siteUrl}/sitemap.xml` };
}
