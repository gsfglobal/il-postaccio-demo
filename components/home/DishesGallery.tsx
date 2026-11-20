'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { PhotoSlot } from '../PhotoSlot';
import type { IllustrationKind } from '../Illustration';
import type { Lang } from '@/lib/site';

const kinds: IllustrationKind[] = ['pasta', 'pot', 'porcini', 'pasta', 'pot', 'porcini', 'artichoke'];
const tones = ['giallo', 'rosso', 'crema', 'verde', 'rosso', 'giallo', 'verde'] as const;

type Item = { n: string; d: string; tag: string };

/** Galleria orizzontale: su desktop scorre col mouse (sezione "agganciata"), su mobile con lo swipe. */
export function DishesGallery({ lang, eyebrow, title, intro, items, more, moreHref }: { lang: Lang; eyebrow: string; title: string; intro: string; items: Item[]; more: string; moreHref: string }) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    if (!mq.matches || !section.current || !track.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const distance = () => track.current!.scrollWidth - window.innerWidth + 80;
      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      gsap.utils.toArray<HTMLElement>('[data-dish]').forEach((el, i) => {
        gsap.fromTo(el, { rotate: i % 2 ? 2.5 : -2.5 }, { rotate: 0, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top top', end: '+=1200', scrub: true } });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={section} className="flex min-h-[100svh] flex-col justify-center py-24 lg:pb-10 lg:pt-28">
      <div className="mx-auto mb-10 flex w-full max-w-[1320px] flex-col justify-between gap-6 px-5 md:px-8 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <p data-reveal className="eyebrow mb-5 text-giallo">{eyebrow}</p>
          <h2 id="dishes-title" data-reveal className="text-[clamp(2.3rem,5.4vw,4.4rem)] font-medium text-bianco">{title}</h2>
          <p data-reveal className="mt-5 text-lg leading-relaxed text-crema/75">{intro}</p>
        </div>
        <a href={moreHref} className="btn btn-ghost shrink-0 self-start text-crema hover:!bg-crema hover:!text-espresso lg:self-auto">
          {more} <ArrowUpRight size={18} aria-hidden />
        </a>
      </div>
      <ul ref={track} className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-8 lg:snap-none lg:overflow-visible lg:pl-[max(2rem,calc((100vw-1320px)/2+2rem))]" style={{ scrollbarWidth: 'none' }}>
        {items.map((it, i) => (
          <li key={it.n} data-dish className="group w-[78vw] shrink-0 snap-start sm:w-[340px] lg:w-[clamp(280px,24vw,340px)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] lg:aspect-[6/7]">
              <div className="h-full w-full transition-transform duration-[1200ms] ease-[var(--ease-artigiano)] group-hover:scale-105">
                <PhotoSlot lang={lang} kind={kinds[i]} tone={tones[i]} shot={it.n} />
              </div>
              <span className="absolute left-4 top-4 rounded-full bg-bianco px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-espresso">{it.tag}</span>
              <span className="absolute right-4 top-4 font-display text-4xl italic text-bianco/90 drop-shadow">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mt-5 text-[1.9rem] leading-tight text-bianco">{it.n}</h3>
            <p className="mt-2 text-crema/70">{it.d}</p>
          </li>
        ))}
        <li className="w-4 shrink-0" aria-hidden />
      </ul>
    </div>
  );
}
