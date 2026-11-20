import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { DemoBanner } from './DemoBanner';
import { Motion } from './Motion';
import { MobileCta } from './MobileCta';
import type { PageKey } from '@/lib/routes';
import { demoMode, type Lang } from '@/lib/site';
import { t } from '@/lib/content';

/** Struttura comune a tutte le pagine: banner demo, header, contenuto, footer, CTA mobile. */
export function Shell({ lang, page, children, overHero = false }: { lang: Lang; page: PageKey; children: ReactNode; overHero?: boolean }) {
  return (
    <div style={{ ['--demo-h' as string]: demoMode ? '34px' : '0px' }}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-12 focus:z-[90] focus:rounded-full focus:bg-espresso focus:px-4 focus:py-2 focus:text-crema">
        {t(lang).ui.skip}
      </a>
      {demoMode && <DemoBanner lang={lang} />}
      <Header lang={lang} page={page} overHero={overHero} />
      <main id="main" className="pt-[var(--demo-h)]">
        {children}
      </main>
      <Footer lang={lang} />
      <MobileCta lang={lang} />
      <Motion />
    </div>
  );
}
