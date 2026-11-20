'use client';

import { useState } from 'react';
import { Info, X } from 'lucide-react';
import type { Lang } from '@/lib/site';
import { t } from '@/lib/content';

const details = {
  it: {
    title: 'Cosa c\'è in questa demo',
    items: [
      ['Verificato', 'Valutazione e numero recensioni Tripadvisor, piatti più citati nelle recensioni pubbliche, posizione appena fuori dalle mura.'],
      ['Da confermare col titolare', 'Civico (3 o 5), telefono, orari e giorno di chiusura, WhatsApp, social, storia dell\'attività.'],
      ['Dimostrativo', 'Fotografie (segnaposto), testi descrittivi, menu e prezzi (vuoti finché non li inserisce la trattoria).'],
      ['Simulato', 'Il modulo prenotazioni non invia nulla; il pannello menu salva solo su questo browser.'],
    ],
  },
  en: {
    title: "What's in this demo",
    items: [
      ['Verified', 'Tripadvisor rating and review count, dishes most mentioned in public reviews, location just outside the walls.'],
      ['To confirm with the owner', 'Street number (3 or 5), phone, opening hours and closing day, WhatsApp, social profiles, business history.'],
      ['Sample content', 'Photos (placeholders), descriptive copy, menu and prices (empty until the trattoria fills them in).'],
      ['Simulated', 'The booking form sends nothing; the menu panel saves only in this browser.'],
    ],
  },
};

export function DemoBanner({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const d = details[lang];
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[70] flex h-[34px] items-center justify-center gap-3 bg-espresso px-4 text-[0.72rem] font-medium text-crema">
        <span className="truncate">{t(lang).ui.demoBadge}</span>
        <button type="button" onClick={() => setOpen(true)} className="inline-flex shrink-0 items-center gap-1 font-semibold text-giallo underline-offset-2 hover:underline">
          <Info size={13} aria-hidden /> {t(lang).ui.demoMore}
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-espresso/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="demo-title" onClick={() => setOpen(false)}>
          <div className="paper relative w-full max-w-lg rounded-2xl p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full hover:bg-espresso/5" aria-label={t(lang).ui.close} autoFocus>
              <X size={18} aria-hidden />
            </button>
            <h2 id="demo-title" className="mb-5 text-3xl">{d.title}</h2>
            <dl className="space-y-4 text-sm leading-relaxed">
              {d.items.map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow mb-1 text-pomodoro">{k}</dt>
                  <dd className="text-inchiostro">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </>
  );
}
