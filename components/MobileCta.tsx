import { CalendarDays, Phone } from 'lucide-react';
import { routes } from '@/lib/routes';
import { site, type Lang } from '@/lib/site';
import { t } from '@/lib/content';

/** Barra fissa su mobile: la prenotazione è sempre a un tocco. */
export function MobileCta({ lang }: { lang: Lang }) {
  const c = t(lang);
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-full bg-espresso/95 p-1.5 shadow-2xl backdrop-blur md:hidden" style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}>
      <a href={site.phoneHref} className="flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-crema">
        <Phone size={16} aria-hidden /> {c.ui.call}
      </a>
      <a href={`${routes.contatti[lang]}#prenota`} className="flex items-center justify-center gap-2 rounded-full bg-pomodoro py-3 text-sm font-semibold text-bianco">
        <CalendarDays size={16} aria-hidden /> {c.ui.book}
      </a>
    </div>
  );
}
