/** Logotipo tipografico provvisorio (nessun logo ufficiale trovato — vedi RESEARCH.md). */
export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`} aria-label="Il Postaccio, trattoria a Montefalco">
      <span
        className={`font-display text-[1.65rem] italic tracking-tight ${light ? 'text-bianco' : 'text-espresso'}`}
        style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1, "opsz" 72', fontWeight: 600 }}
      >
        Il Postaccio
      </span>
      <span className={`mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.32em] ${light ? 'text-giallo' : 'text-pomodoro'}`}>
        Trattoria · Montefalco
      </span>
    </span>
  );
}
