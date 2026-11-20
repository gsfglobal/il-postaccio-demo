'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { defaultMenu, formatDate, formatPrice, loadLocalMenu, type Menu } from '@/lib/menu';
import type { Lang } from '@/lib/site';
import { t } from '@/lib/content';

/** Lavagna con le proposte del giorno: primi e secondi disponibili + specialità. */
export function DailyMenuPreview({ lang }: { lang: Lang }) {
  const c = t(lang).daily;
  const [menu, setMenu] = useState<Menu>(defaultMenu);
  useEffect(() => {
    const local = loadLocalMenu();
    if (local) setMenu(local);
  }, []);

  const picks = menu.sections.filter((s) => ['primi', 'secondi', 'contorni'].includes(s.id));

  return (
    <div data-reveal className="relative rounded-[1.6rem] border-[10px] border-[#6b4a33] bg-bottiglia-dark p-7 text-crema shadow-[0_40px_70px_-35px_rgba(48,37,30,.8)] md:p-10" style={{ backgroundImage: 'radial-gradient(ellipse at 30% 20%,rgba(255,255,255,.07),transparent 60%)' }}>
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-dashed border-crema/25 pb-4">
        <p className="hand text-4xl text-bianco">{lang === 'it' ? 'Oggi' : 'Today'}</p>
        <p className="text-xs uppercase tracking-widest text-crema/60">
          {c.updated}: <span className="capitalize">{formatDate(menu.updatedAt, lang)}</span>
        </p>
      </div>
      <p className="hand mt-5 text-[1.7rem] leading-tight text-giallo">★ {menu.special[lang]}</p>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        {picks.map((s) => (
          <div key={s.id} className={s.id === 'contorni' ? 'sm:col-span-2' : ''}>
            <h3 className="eyebrow mb-3 font-sans text-crema/55">{s.title[lang]}</h3>
            <ul className="space-y-2.5">
              {s.items.slice(0, 4).map((it) => (
                <li key={it.id} className={`flex items-baseline gap-3 ${it.available ? '' : 'opacity-45'}`}>
                  <span className="hand text-[1.55rem] leading-tight text-bianco">
                    {it.name[lang]}
                    {it.star && <Star size={13} className="ml-1.5 inline fill-giallo text-giallo" aria-label="più richiesto" />}
                  </span>
                  <span className="mx-1 flex-1 border-b border-dotted border-crema/25" aria-hidden />
                  <span className="shrink-0 text-sm text-crema/70">
                    {!it.available ? c.unavailable : formatPrice(it.price, lang) ?? <em className="not-italic text-crema/45">{c.priceTodo}</em>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {menu.isDemo && <p className="mt-8 border-t border-dashed border-crema/25 pt-4 text-xs text-crema/50">{menu.note[lang]}</p>}
    </div>
  );
}
