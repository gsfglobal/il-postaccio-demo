'use client';

import { useEffect, useRef, useState } from 'react';
import { PhotoSlot } from '../PhotoSlot';
import type { IllustrationKind } from '../Illustration';
import type { Lang } from '@/lib/site';
import { t } from '@/lib/content';

const visuals: { kind: IllustrationKind; tone: 'verde' | 'rosso' | 'crema' | 'espresso'; shot: number }[] = [
  { kind: 'awning', tone: 'verde', shot: 0 },
  { kind: 'room', tone: 'crema', shot: 5 },
  { kind: 'wine', tone: 'rosso', shot: 6 },
  { kind: 'moka', tone: 'espresso', shot: 3 },
];

/** Scroll storytelling: l'immagine resta ferma, i capitoli scorrono e la cambiano. */
export function RoomsStory({ lang, steps }: { lang: Lang; steps: { t: string; d: string }[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  const shots = t(lang).pages.gallery.shots;

  return (
    <div className="mx-auto mt-14 grid max-w-[1320px] gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
      <div className="sticky top-[calc(var(--demo-h)+84px)] z-10 h-[40vh] self-start lg:top-28 lg:h-[calc(100svh-9rem)]">
        <div className="relative h-full overflow-hidden rounded-[1.8rem] shadow-[0_40px_70px_-40px_rgba(48,37,30,.7)]">
          {visuals.map((v, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-artigiano)] ${active === i ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0'}`}
              aria-hidden={active !== i}
            >
              <PhotoSlot lang={lang} kind={v.kind} tone={v.tone} shot={shots[v.shot]} />
            </div>
          ))}
          <div className="absolute left-5 top-5 flex gap-1.5" aria-hidden>
            {visuals.map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full bg-bianco transition-all duration-500 ${active === i ? 'w-8' : 'w-3 opacity-50'}`} />
            ))}
          </div>
        </div>
      </div>
      <ol className="lg:py-[18vh]">
        {steps.map((s, i) => (
          <li
            key={s.t}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-step={i}
            className={`flex min-h-[38vh] flex-col justify-center border-l-2 py-8 pl-7 transition-colors duration-500 lg:min-h-[60vh] ${active === i ? 'border-pomodoro' : 'border-espresso/10'}`}
          >
            <span className="font-display text-lg italic text-pomodoro">0{i + 1}</span>
            <h3 className={`mt-2 text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-40'}`}>{s.t}</h3>
            <p className={`mt-4 max-w-md text-lg leading-relaxed text-inchiostro transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-50'}`}>{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
