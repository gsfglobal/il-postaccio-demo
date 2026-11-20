'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { defaultMenu, formatDate, formatPrice, loadLocalMenu, type Menu } from '@/lib/menu';
import type { Lang } from '@/lib/site';
import { t } from '@/lib/content';

export function MenuFull({ lang }: { lang: Lang }) {
  const c = t(lang).daily;
  const [menu, setMenu] = useState<Menu>(defaultMenu);
  const [active, setActive] = useState(defaultMenu.sections[0]?.id);

  useEffect(() => {
    const local = loadLocalMenu();
    if (local) setMenu(local);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-[1.4rem] bg-bottiglia p-6 text-crema md:flex-row md:items-center md:justify-between md:p-8">
        <p className="hand text-[1.9rem] leading-tight text-giallo">★ {menu.special[lang]}</p>
        <p className="text-xs uppercase tracking-widest text-crema/70">
          {c.updated}: <span className="capitalize">{formatDate(menu.updatedAt, lang)}</span>
        </p>
      </div>

      <nav aria-label={lang === 'it' ? 'Sezioni del menu' : 'Menu sections'} className="sticky top-[calc(var(--demo-h)+72px)] z-30 -mx-5 mt-8 overflow-x-auto bg-crema/95 px-5 py-3 backdrop-blur md:mx-0 md:rounded-full md:px-3">
        <ul className="flex gap-2">
          {menu.sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#m-${s.id}`}
                onClick={() => setActive(s.id)}
                className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active === s.id ? 'bg-espresso text-crema' : 'text-espresso hover:bg-espresso/5'}`}
              >
                {s.title[lang]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 grid gap-x-16 gap-y-14 lg:grid-cols-2">
        {menu.sections.map((s) => (
          <section key={s.id} id={`m-${s.id}`} className="scroll-mt-44" aria-labelledby={`mt-${s.id}`}>
            <h2 id={`mt-${s.id}`} data-reveal className="border-b-2 border-espresso pb-3 text-4xl">
              {s.title[lang]}
            </h2>
            <ul className="mt-2">
              {s.items.map((it) => (
                <li key={it.id} data-reveal className={`border-b border-dashed border-espresso/15 py-5 ${it.available ? '' : 'opacity-50'}`}>
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-[1.45rem] leading-snug">
                      {it.name[lang]}
                      {it.star && <Star size={14} className="ml-2 inline -translate-y-0.5 fill-giallo text-giallo" aria-label={lang === 'it' ? 'tra i più citati' : 'guest favourite'} />}
                    </h3>
                    <span className="mx-1 flex-1 translate-y-[-4px] border-b border-dotted border-espresso/30" aria-hidden />
                    <span className="shrink-0 font-semibold text-pomodoro">
                      {!it.available ? c.unavailable : formatPrice(it.price, lang) ?? <span className="text-sm font-normal italic text-inchiostro/60">{c.priceTodo}</span>}
                    </span>
                  </div>
                  {it.desc[lang] && <p className="mt-1 text-inchiostro">{it.desc[lang]}</p>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      {menu.isDemo && <p className="mt-12 rounded-xl border border-dashed border-pomodoro/50 p-4 text-sm text-pomodoro">{menu.note[lang]}</p>}
    </div>
  );
}
