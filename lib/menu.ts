import menuData from '@/data/menu.json';
import type { Lang } from './site';

export type L10n = { it: string; en: string };
export type MenuItem = {
  id: string;
  name: L10n;
  desc: L10n;
  /** Prezzo in euro. null = non ancora inserito dalla trattoria (nessun prezzo inventato). */
  price: number | null;
  available: boolean;
  star?: boolean;
};
export type MenuSection = { id: string; title: L10n; items: MenuItem[] };
export type Menu = {
  updatedAt: string;
  isDemo: boolean;
  note: L10n;
  special: L10n;
  sections: MenuSection[];
};

export const defaultMenu = menuData as Menu;

/** Chiave usata dal pannello admin in modalità demo (salvataggio solo nel browser). */
export const MENU_STORAGE_KEY = 'postaccio-menu-demo-v1';

export function loadLocalMenu(): Menu | null {
  try {
    const raw = window.localStorage.getItem(MENU_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Menu;
    return Array.isArray(parsed.sections) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveLocalMenu(menu: Menu): boolean {
  try {
    window.localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menu));
    return true;
  } catch {
    return false;
  }
}

export function clearLocalMenu() {
  try {
    window.localStorage.removeItem(MENU_STORAGE_KEY);
  } catch {
    /* storage non disponibile */
  }
}

export function formatPrice(price: number | null, lang: Lang) {
  if (price === null || Number.isNaN(price)) return null;
  return new Intl.NumberFormat(lang === 'it' ? 'it-IT' : 'en-GB', { style: 'currency', currency: 'EUR', minimumFractionDigits: price % 1 ? 2 : 0 }).format(price);
}

export function formatDate(iso: string, lang: Lang) {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
}
