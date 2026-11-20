'use client';

import { useEffect, useState } from 'react';
import { Menu as MenuIcon, Phone, X } from 'lucide-react';
import { Logo } from './Logo';
import { navLabels, navOrder, routes, type PageKey } from '@/lib/routes';
import { site, type Lang } from '@/lib/site';
import { t } from '@/lib/content';

export function Header({ lang, page, overHero = false }: { lang: Lang; page: PageKey; overHero?: boolean }) {
  const c = t(lang);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const otherLang: Lang = lang === 'it' ? 'en' : 'it';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const solid = scrolled || !overHero;

  return (
    <header
      className={`fixed inset-x-0 top-[var(--demo-h,0px)] z-50 transition-all duration-500 ${
        solid ? 'bg-crema/92 shadow-[0_1px_0_rgba(48,37,30,.08)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-6 px-5 md:px-8">
        <a href={routes.home[lang]} className="shrink-0" aria-label="Il Postaccio — home">
          <Logo light={!solid} />
        </a>

        <nav aria-label={lang === 'it' ? 'Navigazione principale' : 'Main navigation'} className="hidden xl:block">
          <ul className="flex items-center gap-6 text-[0.92rem] font-medium">
            {navOrder.map((k) => (
              <li key={k}>
                <a
                  href={routes[k][lang]}
                  aria-current={page === k ? 'page' : undefined}
                  className={`link-u py-1 transition-colors ${page === k ? (solid ? 'text-pomodoro' : 'text-giallo') : solid ? 'text-espresso hover:text-pomodoro' : 'text-crema/90 hover:text-bianco'}`}
                >
                  {navLabels[k][lang]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={routes[page][otherLang]}
            hrefLang={otherLang}
            lang={otherLang}
            className={`hidden rounded-full px-3 py-2 text-xs font-bold tracking-widest sm:inline-block ${solid ? 'text-espresso hover:text-pomodoro' : 'text-crema hover:text-bianco'}`}
            aria-label={c.ui.lang}
          >
            {c.ui.langShort}
          </a>
          <a href={site.phoneHref} className={`hidden items-center gap-2 text-sm font-semibold md:inline-flex ${solid ? 'text-bottiglia hover:text-pomodoro' : 'text-crema hover:text-bianco'}`} aria-label={`${c.ui.call} ${site.phoneDisplay}`}>
            <Phone size={16} aria-hidden /> <span className="hidden lg:inline">{site.phoneDisplay}</span>
          </a>
          <a href={`${routes.contatti[lang]}#prenota`} className="btn btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex">
            {c.ui.book}
          </a>
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-full border xl:hidden ${solid ? 'border-espresso/15 text-espresso' : 'border-crema/30 text-crema'}`}
            onClick={() => setOpen(true)}
            aria-label={c.ui.openMenu}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <MenuIcon size={20} aria-hidden />
          </button>
        </div>
      </div>

      {/* Menu mobile a tutto schermo */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label={c.ui.menu}
        className={`paper fixed inset-0 z-[60] flex flex-col transition-[opacity,visibility] duration-500 xl:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="gingham-strip" />
        <div className="flex h-[72px] items-center justify-between px-5">
          <Logo />
          <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-espresso/15" aria-label={c.ui.close}>
            <X size={20} aria-hidden />
          </button>
        </div>
        <ul className="flex flex-1 flex-col justify-center gap-1 px-7">
          {(['home', ...navOrder] as PageKey[]).map((k, i) => (
            <li key={k} style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }} className={`transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <a href={routes[k][lang]} onClick={() => setOpen(false)} className={`font-display text-[2.1rem] leading-[1.25] ${page === k ? 'italic text-pomodoro' : 'text-espresso'}`}>
                {navLabels[k][lang]}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-3 border-t border-espresso/10 px-7 py-6">
          <a href={site.phoneHref} className="btn btn-primary">
            <Phone size={18} aria-hidden /> {site.phoneDisplay}
          </a>
          <a href={routes[page][otherLang]} hrefLang={otherLang} className="btn btn-ghost">
            {c.ui.lang}
          </a>
        </div>
      </div>
    </header>
  );
}
