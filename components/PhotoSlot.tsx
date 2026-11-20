import { Camera } from 'lucide-react';
import { Illustration, type IllustrationKind } from './Illustration';
import type { Lang } from '@/lib/site';
import { t } from '@/lib/content';

const tones = {
  crema: 'bg-crema-dark text-espresso',
  verde: 'bg-bottiglia text-crema',
  rosso: 'bg-pomodoro text-bianco',
  espresso: 'bg-espresso text-crema',
  giallo: 'bg-giallo text-espresso',
} as const;

/**
 * Segnaposto fotografico chiaramente identificato.
 * Per sostituirlo con una foto reale: passare `src` (immagine in /public/foto/...) e `alt`.
 */
export function PhotoSlot({
  lang,
  shot,
  kind,
  tone = 'crema',
  className = '',
  src,
  alt,
}: {
  lang: Lang;
  shot: string;
  kind: IllustrationKind;
  tone?: keyof typeof tones;
  className?: string;
  src?: string;
  alt?: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt ?? shot} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <figure className={`relative isolate flex h-full w-full items-center justify-center overflow-hidden ${tones[tone]} ${className}`}>
      <div className="paper absolute inset-0 -z-10 opacity-40 mix-blend-multiply" aria-hidden />
      <Illustration kind={kind} className="h-[62%] max-h-[260px] w-auto opacity-95" />
      <figcaption className="absolute inset-x-3 bottom-3 flex items-start gap-2 rounded-lg bg-black/25 px-3 py-2 text-[0.7rem] leading-snug text-white backdrop-blur-sm">
        <Camera size={13} className="mt-[1px] shrink-0" aria-hidden />
        <span>
          <strong className="font-semibold">{t(lang).ui.photoTodo}:</strong> {shot}
        </span>
      </figcaption>
    </figure>
  );
}
