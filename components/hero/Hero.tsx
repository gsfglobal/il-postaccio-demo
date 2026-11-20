'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Award, Phone } from 'lucide-react';
import { Illustration } from '../Illustration';
import { routes } from '@/lib/routes';
import { site, type Lang } from '@/lib/site';
import { t } from '@/lib/content';

const TrattoriaScene = dynamic(() => import('./TrattoriaScene'), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

export function Hero({ lang }: { lang: Lang }) {
  const c = t(lang);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    // Su connessioni lente o con risparmio dati si resta sulla versione illustrata
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setWebgl(hasWebGL() && !conn?.saveData);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-word]', { yPercent: 110, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.06, delay: 0.25 });
      gsap.from('[data-hero-fade]', { y: 18, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.1, delay: 0.8 });
    }, root);
    return () => ctx.revert();
  }, []);

  const words = (s: string, accent = false) =>
    s.split(' ').map((w, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
        <span data-hero-word className={`inline-block ${accent ? 'italic text-giallo' : ''}`}>
          {w}&nbsp;
        </span>
      </span>
    ));

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative isolate -mt-[var(--demo-h)] flex min-h-[100svh] items-end overflow-hidden bg-espresso pt-[calc(var(--demo-h)+72px)] text-bianco lg:items-center">
      {/* Livello 1: versione illustrata (fallback e poster durante il caricamento) */}
      <div className={`absolute inset-0 -z-20 transition-opacity duration-1000 ${ready ? 'opacity-0' : 'opacity-100'}`} aria-hidden>
        <div className="gingham absolute inset-0 opacity-90" style={{ backgroundSize: '64px 64px' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,transparent_0%,rgba(48,37,30,.55)_45%,#30251e_85%)]" />
        <Illustration kind="pasta" className="absolute left-1/2 top-[20%] w-[min(80vw,620px)] -translate-x-1/2 text-espresso drop-shadow-2xl lg:left-[68%] lg:top-1/2 lg:-translate-y-1/2" />
      </div>

      {/* Livello 2: scena 3D */}
      {webgl && (
        <div className={`absolute inset-0 -z-10 transition-opacity duration-[1400ms] ${ready ? 'opacity-100' : 'opacity-0'}`} aria-hidden>
          <TrattoriaScene onReady={() => setTimeout(() => setReady(true), 250)} />
        </div>
      )}

      {/* Velature per la leggibilità del testo */}
      <div className="pointer-events-none absolute inset-0 -z-[6] bg-[radial-gradient(ellipse_at_68%_55%,transparent_35%,rgba(48,37,30,.55)_100%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-t from-espresso via-espresso/70 to-transparent lg:bg-gradient-to-r lg:from-espresso/95 lg:via-espresso/55 lg:to-transparent" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 pb-28 pt-10 md:px-8 md:pb-20 lg:pb-24">
        <div className="max-w-[680px]">
          <p data-hero-fade className="eyebrow mb-6 text-giallo">{c.hero.eyebrow}</p>
          <h1 id="hero-title" className="text-[clamp(2.6rem,6.4vw,5.3rem)] font-medium leading-[0.98]">
            <span className="block">{words(c.hero.titleA)}</span>
            <span className="block">{words(c.hero.titleB, true)}</span>
          </h1>
          <p data-hero-fade className="mt-7 max-w-[30rem] text-[1.08rem] leading-relaxed text-crema/85 md:text-lg">
            {c.hero.sub}
          </p>
          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-3">
            <a href={`${routes.contatti[lang]}#prenota`} className="btn btn-primary">
              {c.ui.book}
            </a>
            <a href={routes.menu[lang]} className="btn btn-ghost text-crema hover:!bg-crema hover:!text-espresso">
              {c.ui.discover}
            </a>
          </div>
          <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-crema/75">
            <span className="inline-flex items-center gap-2">
              <Award size={16} className="text-giallo" aria-hidden /> {c.hero.badge}
            </span>
            <a href={site.phoneHref} className="link-u inline-flex items-center gap-2 hover:text-bianco">
              <Phone size={15} className="text-giallo" aria-hidden /> {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <a href="#benvenuti" className="absolute bottom-24 right-6 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-crema/70 hover:text-bianco md:bottom-8 md:flex lg:right-10">
        {c.hero.scroll} <ArrowDown size={14} className="animate-bounce" aria-hidden />
      </a>
      <div className="gingham-strip absolute inset-x-0 bottom-0" aria-hidden />
    </section>
  );
}
