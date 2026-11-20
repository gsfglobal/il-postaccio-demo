'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Attiva le animazioni d'ingresso per gli elementi con [data-reveal].
 * Senza JS o con prefers-reduced-motion i contenuti restano sempre visibili.
 */
export function Motion() {
  useEffect(() => {
    (window as Window & { __motionReady?: boolean }).__motionReady = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);
    const root = document.documentElement;
    root.classList.add('js-motion');

    const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');
    const batch = ScrollTrigger.batch(els, {
      start: 'top 88%',
      once: true,
      onEnter: (targets) =>
        gsap.to(targets, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.09, overwrite: true }),
    });

    // Elementi già in vista al caricamento
    requestAnimationFrame(() => ScrollTrigger.refresh());

    // Parallax leggero
    const parallax = gsap.utils.toArray<HTMLElement>('[data-parallax]').map((el) =>
      gsap.to(el, {
        yPercent: Number(el.dataset.parallax || -10),
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      }),
    );

    // Sicurezza: se qualcosa va storto, dopo 2,5s tutto torna visibile
    const safety = window.setTimeout(() => {
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && getComputedStyle(el).opacity === '0') gsap.to(el, { opacity: 1, y: 0, duration: 0.6 });
      });
    }, 2500);

    return () => {
      window.clearTimeout(safety);
      batch.forEach((b) => b.kill());
      parallax.forEach((p) => p.scrollTrigger?.kill());
      root.classList.remove('js-motion');
    };
  }, []);
  return null;
}
