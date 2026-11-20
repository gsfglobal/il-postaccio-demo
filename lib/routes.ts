import type { Lang } from './site';

export type PageKey = 'home' | 'trattoria' | 'menu' | 'cucina' | 'gallery' | 'montefalco' | 'recensioni' | 'contatti';

export const routes: Record<PageKey, Record<Lang, string>> = {
  home: { it: '/', en: '/en/' },
  trattoria: { it: '/la-trattoria/', en: '/en/the-trattoria/' },
  menu: { it: '/menu/', en: '/en/menu/' },
  cucina: { it: '/la-nostra-cucina/', en: '/en/our-kitchen/' },
  gallery: { it: '/gallery/', en: '/en/gallery/' },
  montefalco: { it: '/montefalco/', en: '/en/montefalco/' },
  recensioni: { it: '/recensioni/', en: '/en/reviews/' },
  contatti: { it: '/contatti/', en: '/en/contact/' },
};

export const navOrder: PageKey[] = ['trattoria', 'menu', 'cucina', 'gallery', 'montefalco', 'recensioni', 'contatti'];

export const navLabels: Record<PageKey, Record<Lang, string>> = {
  home: { it: 'Home', en: 'Home' },
  trattoria: { it: 'La trattoria', en: 'The trattoria' },
  menu: { it: 'Menu', en: 'Menu' },
  cucina: { it: 'La nostra cucina', en: 'Our kitchen' },
  gallery: { it: 'Gallery', en: 'Gallery' },
  montefalco: { it: 'Montefalco', en: 'Montefalco' },
  recensioni: { it: 'Recensioni', en: 'Reviews' },
  contatti: { it: 'Contatti', en: 'Contact' },
};

export const legalRoutes = {
  privacy: { it: '/privacy/', en: '/en/privacy/' },
};
