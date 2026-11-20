import type { Metadata } from 'next';
import { routes, type PageKey } from './routes';
import { site, siteUrl, demoMode, type Lang } from './site';
import { t } from './content';

export function pageMeta(page: PageKey, lang: Lang): Metadata {
  const c = t(lang);
  const title = page === 'home' ? c.meta.homeTitle : c.pages[page as Exclude<PageKey, 'home'>].metaTitle;
  const description = page === 'home' ? c.meta.homeDesc : c.pages[page as Exclude<PageKey, 'home'>].metaDesc;
  const url = `${siteUrl}${routes[page][lang]}`;
  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
      languages: { 'it-IT': `${siteUrl}${routes[page].it}`, 'en-GB': `${siteUrl}${routes[page].en}`, 'x-default': `${siteUrl}${routes[page].it}` },
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: site.name,
      locale: lang === 'it' ? 'it_IT' : 'en_GB',
      images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: 'Il Postaccio — trattoria a Montefalco' }],
    },
    twitter: { card: 'summary_large_image', title, description },
    // In demo il sito non deve essere indicizzato
    robots: demoMode ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function restaurantJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${siteUrl}/#restaurant`,
    name: site.name,
    url: `${siteUrl}${routes.home[lang]}`,
    telephone: site.phoneDisplay.replace(/\s/g, ''),
    priceRange: site.priceRange,
    servesCuisine: ['Italiana', 'Umbra', 'Cucina tradizionale'],
    acceptsReservations: true,
    hasMenu: `${siteUrl}${routes.menu[lang]}`,
    image: `${siteUrl}/og.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.street,
      postalCode: site.postalCode,
      addressLocality: site.city,
      addressRegion: site.province,
      addressCountry: site.country,
    },
    openingHoursSpecification: site.openingSpec.map((o) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: o.days,
      opens: o.opens,
      closes: o.closes,
    })),
    sameAs: [site.tripadvisorUrl, site.instagram, site.facebook].filter(Boolean),
  };
}

export function breadcrumbJsonLd(page: PageKey, lang: Lang, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}${routes.home[lang]}` },
      { '@type': 'ListItem', position: 2, name, item: `${siteUrl}${routes[page][lang]}` },
    ],
  };
}
