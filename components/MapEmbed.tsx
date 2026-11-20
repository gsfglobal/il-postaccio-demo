'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { site, type Lang } from '@/lib/site';
import { t } from '@/lib/content';

/**
 * Mappa Google caricata solo su richiesta (niente cookie di terze parti prima del consenso).
 * Prima del clic mostra una mappa illustrata del borgo.
 */
export function MapEmbed({ lang }: { lang: Lang }) {
  const c = t(lang).where;
  const [load, setLoad] = useState(false);
  const q = encodeURIComponent(`Il Postaccio, ${site.street}, ${site.postalCode} ${site.city}`);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] border border-espresso/10 bg-crema shadow-[0_30px_60px_-40px_rgba(48,37,30,.6)]">
      {load ? (
        <iframe
          title={`Mappa — ${site.name}, ${site.city}`}
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="relative h-full w-full">
          {/* Mappa stilizzata: mura del borgo e posizione appena fuori */}
          <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden>
            <rect width="400" height="300" fill="#efe2c8" />
            {Array.from({ length: 14 }).map((_, i) => (
              <path key={i} d={`M${-40 + i * 34} 300 L${60 + i * 34} 0`} stroke="#e4d4b4" strokeWidth="10" />
            ))}
            <path d="M0 214 C80 200 140 236 230 222 S350 190 400 196" stroke="#fffcf6" strokeWidth="14" fill="none" />
            <path d="M0 214 C80 200 140 236 230 222 S350 190 400 196" stroke="#ddaa55" strokeWidth="2" strokeDasharray="8 8" fill="none" />
            <ellipse cx="200" cy="112" rx="104" ry="80" fill="#e6d3ad" stroke="#30251e" strokeWidth="3" strokeDasharray="2 6" />
            <circle cx="200" cy="112" r="16" fill="#fffcf6" stroke="#30251e" strokeWidth="2" />
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const a = (i / 6) * Math.PI * 2;
              return <path key={i} d={`M${200 + Math.cos(a) * 16} ${112 + Math.sin(a) * 16} L${200 + Math.cos(a) * 92} ${112 + Math.sin(a) * 70}`} stroke="#fffcf6" strokeWidth="6" />;
            })}
            <text x="200" y="74" textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic" fontSize="16" fill="#30251e">Montefalco</text>
            <text x="200" y="92" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" letterSpacing="2" fill="#4a3b31">CENTRO STORICO</text>
            <text x="300" y="250" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" letterSpacing="2" fill="#4a3b31">VIALE DELLA VITTORIA</text>
          </svg>
          <div className="absolute left-[64%] top-[56%] -translate-x-1/2 -translate-y-full">
            <div className="flex flex-col items-center">
              <span className="whitespace-nowrap rounded-full bg-pomodoro px-3 py-1.5 text-xs font-bold text-bianco shadow-lg">Il Postaccio</span>
              <MapPin size={34} className="-mt-1 fill-pomodoro text-bianco drop-shadow" aria-hidden />
            </div>
          </div>
          <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2 rounded-xl bg-bianco/90 p-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-snug text-inchiostro">{c.mapNote}</p>
            <button type="button" onClick={() => setLoad(true)} className="btn btn-ghost shrink-0 !px-4 !py-2 text-sm">
              {c.loadMap}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
