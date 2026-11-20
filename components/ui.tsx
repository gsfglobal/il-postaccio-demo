import type { ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 md:px-8 ${className}`}>{children}</div>;
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  light = false,
  id,
  align = 'left',
  as = 'h2',
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  light?: boolean;
  id?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
}) {
  const H = as;
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p data-reveal className={`eyebrow mb-5 ${light ? 'text-giallo' : 'text-pomodoro'}`}>
          {eyebrow}
        </p>
      )}
      <H id={id} data-reveal className={`text-[clamp(2.3rem,5.4vw,4.4rem)] font-medium ${light ? 'text-bianco' : 'text-espresso'}`}>
        {title}
      </H>
      {intro && (
        <p data-reveal className={`mt-6 text-lg leading-relaxed ${light ? 'text-crema/80' : 'text-inchiostro'}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

export function VerifyTag({ label, className = '' }: { label: string; className?: string }) {
  return <span className={`tag-verify text-pomodoro ${className}`}>{label}</span>;
}

/** Testata delle pagine interne */
export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children?: ReactNode }) {
  return (
    <section className="paper relative overflow-hidden pb-16 pt-[120px] md:pb-24 md:pt-[160px]">
      <div className="gingham absolute -right-24 top-24 hidden h-72 w-72 rotate-12 rounded-[2rem] opacity-80 shadow-xl md:block" aria-hidden />
      <Container className="relative">
        <p data-reveal className="eyebrow mb-5 text-pomodoro">{eyebrow}</p>
        <h1 data-reveal className="max-w-4xl text-[clamp(2.8rem,8vw,6.6rem)] font-medium">
          {title}
        </h1>
        <p data-reveal className="mt-7 max-w-2xl text-lg leading-relaxed text-inchiostro md:text-xl">{lead}</p>
        {children}
      </Container>
    </section>
  );
}
