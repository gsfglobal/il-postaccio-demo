import { ArrowUpRight, Clock, MapPin, Phone, Star } from 'lucide-react';
import { Container, SectionHead, VerifyTag } from '../ui';
import { PhotoSlot } from '../PhotoSlot';
import { Illustration } from '../Illustration';
import { DishesGallery } from './DishesGallery';
import { DailyMenuPreview } from './DailyMenuPreview';
import { RoomsStory } from './RoomsStory';
import { BookingForm } from '../BookingForm';
import { MapEmbed } from '../MapEmbed';
import { routes } from '@/lib/routes';
import { site, type Lang } from '@/lib/site';
import { t } from '@/lib/content';

/* 02 — Benvenuti */
export function Welcome({ lang }: { lang: Lang }) {
  const c = t(lang).welcome;
  return (
    <section id="benvenuti" aria-labelledby="welcome-title" className="paper relative scroll-mt-24 overflow-hidden py-24 md:py-36">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <SectionHead eyebrow={c.eyebrow} title={c.title} id="welcome-title" />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-inchiostro">
            {c.body.map((p) => (
              <p key={p} data-reveal>{p}</p>
            ))}
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-espresso/15 pt-8">
            {c.facts.map((f) => (
              <div key={f.k} data-reveal>
                <dt className="font-display text-xl leading-tight text-pomodoro md:text-2xl">{f.k}</dt>
                <dd className="mt-1 text-sm text-inchiostro/80">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div data-reveal className="relative z-10 aspect-[4/5] w-[78%] overflow-hidden rounded-[1.6rem] shadow-[0_30px_60px_-30px_rgba(48,37,30,.6)]">
            <PhotoSlot lang={lang} kind="awning" tone="crema" shot={t(lang).pages.gallery.shots[0]} />
          </div>
          <div data-reveal data-parallax="-18" className="absolute -bottom-10 right-0 z-20 aspect-square w-[52%] overflow-hidden rounded-[1.4rem] border-[6px] border-crema shadow-2xl">
            <PhotoSlot lang={lang} kind="room" tone="verde" shot={t(lang).pages.gallery.shots[5]} />
          </div>
          <p className="hand absolute -top-8 right-2 z-30 rotate-[-4deg] text-2xl text-pomodoro md:right-10 md:text-3xl" aria-hidden>
            {c.note} ↘
          </p>
        </div>
      </Container>
    </section>
  );
}

/* 03 — Poche chiacchiere */
export function Philosophy({ lang }: { lang: Lang }) {
  const c = t(lang).philosophy;
  const icons = ['pot', 'pasta', 'porcini', 'moka'] as const;
  return (
    <section aria-labelledby="philo-title" className="relative bg-bianco py-24 md:py-32">
      <div className="gingham-strip absolute inset-x-0 top-0" aria-hidden />
      <Container>
        <SectionHead eyebrow={c.eyebrow} title={c.title} intro={c.intro} id="philo-title" />
        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.cards.map((card, i) => (
            <li
              key={card.t}
              data-reveal
              className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-[1.4rem] border border-espresso/10 bg-crema p-7 transition-[transform,box-shadow] duration-500 ease-[var(--ease-artigiano)] hover:-translate-y-2 hover:rotate-[-0.6deg] hover:shadow-[0_30px_50px_-30px_rgba(48,37,30,.55)]"
            >
              <span className="font-display text-6xl italic text-pomodoro/20 transition-colors duration-500 group-hover:text-pomodoro" aria-hidden>
                0{i + 1}
              </span>
              <h3 className="mt-auto text-3xl">{card.t}</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-inchiostro">{card.d}</p>
              <Illustration kind={icons[i]} className="absolute -right-6 top-4 w-36 rotate-6 text-espresso opacity-15 transition-all duration-700 group-hover:rotate-0 group-hover:opacity-40" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* 04 — I piatti che fanno parlare */
export function Dishes({ lang }: { lang: Lang }) {
  const c = t(lang).dishes;
  return (
    <section aria-labelledby="dishes-title" className="paper-dark relative overflow-hidden text-crema">
      <DishesGallery lang={lang} eyebrow={c.eyebrow} title={c.title} intro={c.intro} items={c.items} more={t(lang).ui.seeAll} moreHref={routes.cucina[lang]} />
    </section>
  );
}

/* 05 — Menu del giorno */
export function DailyMenu({ lang }: { lang: Lang }) {
  const c = t(lang).daily;
  return (
    <section id="menu-del-giorno" aria-labelledby="daily-title" className="paper py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHead eyebrow={c.eyebrow} title={c.title} intro={c.intro} id="daily-title" />
          <a data-reveal href={routes.menu[lang]} className="btn btn-ghost mt-10 text-espresso">
            {c.full} <ArrowUpRight size={18} aria-hidden />
          </a>
        </div>
        <DailyMenuPreview lang={lang} />
      </Container>
    </section>
  );
}

/* 06 — Il sapore dell'Umbria */
export function Umbria({ lang }: { lang: Lang }) {
  const c = t(lang).umbria;
  return (
    <section aria-labelledby="umbria-title" className="relative overflow-hidden bg-bottiglia py-24 text-crema md:py-36">
      <Illustration kind="borgo" className="pointer-events-none absolute -bottom-24 -right-32 w-[min(820px,120vw)] text-crema/20 opacity-60" />
      <Container className="relative">
        <SectionHead eyebrow={c.eyebrow} title={c.title} light id="umbria-title" />
        <p data-reveal className="mt-8 max-w-2xl text-lg leading-relaxed text-crema/85">{c.body}</p>
        <ul className="mt-16 grid gap-px overflow-hidden rounded-[1.4rem] bg-crema/15 sm:grid-cols-2 lg:grid-cols-4">
          {c.points.map((p) => (
            <li key={p.t} data-reveal className="bg-bottiglia-dark/70 p-7 backdrop-blur-sm">
              <h3 className="text-2xl text-bianco">{p.t}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-crema/75">{p.d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-crema/50">{c.disclaimer}</p>
        <a data-reveal href={routes.montefalco[lang]} className="btn btn-ghost mt-10 text-crema hover:!bg-crema hover:!text-bottiglia">
          {t(lang).ui.readMore} <ArrowUpRight size={18} aria-hidden />
        </a>
      </Container>
    </section>
  );
}

/* 07 — Una trattoria come una volta */
export function Rooms({ lang }: { lang: Lang }) {
  const c = t(lang).rooms;
  return (
    <section aria-labelledby="rooms-title" className="paper py-24 md:py-32">
      <Container>
        <SectionHead eyebrow={c.eyebrow} title={c.title} id="rooms-title" />
      </Container>
      <RoomsStory lang={lang} steps={c.steps} />
    </section>
  );
}

/* 08 — Il vino e la tavola */
export function Wine({ lang }: { lang: Lang }) {
  const c = t(lang).wine;
  return (
    <section aria-labelledby="wine-title" className="relative overflow-hidden bg-[#4a1520] py-24 text-crema md:py-36">
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#fff 0 1px,transparent 1px 14px)' }} aria-hidden />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHead eyebrow={c.eyebrow} title={c.title} light id="wine-title" />
          <p data-reveal className="mt-8 max-w-xl text-lg leading-relaxed text-crema/85">{c.body}</p>
          <blockquote data-reveal className="hand mt-12 max-w-lg rotate-[-2deg] text-[2.1rem] leading-tight text-giallo md:text-[2.6rem]">
            “{c.quote}”
          </blockquote>
          <p className="mt-8 text-sm text-crema/60">{c.disclaimer}</p>
        </div>
        <div data-reveal data-parallax="-12" className="relative mx-auto aspect-square w-full max-w-[420px]">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(221,170,85,.35),transparent_65%)]" aria-hidden />
          <Illustration kind="wine" className="relative h-full w-full text-crema" />
        </div>
      </Container>
    </section>
  );
}

/* 09 — Dicono di noi */
export function Reviews({ lang, full = false }: { lang: Lang; full?: boolean }) {
  const c = t(lang).reviews;
  const ta = site.reviews.tripadvisor;
  return (
    <section aria-labelledby="reviews-title" className="bg-bianco py-24 md:py-32">
      <Container>
        {!full && <SectionHead eyebrow={c.eyebrow} title={c.title} intro={c.intro} id="reviews-title" />}
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal className="flex flex-col justify-between rounded-[1.6rem] bg-pomodoro p-8 text-bianco md:p-10">
            <div>
              <p className="eyebrow text-crema/80">Tripadvisor</p>
              <p className="mt-4 flex items-end gap-3 font-display">
                <span className="text-[6.5rem] leading-[0.8]">{ta.rating.toLocaleString(lang === 'it' ? 'it-IT' : 'en-GB')}</span>
                <span className="mb-2 text-2xl text-crema/80">/ 5</span>
              </p>
              <div className="mt-4 flex gap-1" aria-label={`${ta.rating} / 5`}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={20} className={i < 4 ? 'fill-giallo text-giallo' : 'fill-giallo/40 text-giallo'} aria-hidden />
                ))}
              </div>
              <p className="mt-5 text-lg">
                {ta.count.toLocaleString(lang === 'it' ? 'it-IT' : 'en-GB')} {c.reviewsLabel} · {ta.award}
              </p>
              <p className="mt-1 text-sm text-crema/75">{lang === 'it' ? ta.rank : 'No. 9 of 44 in Montefalco'}</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={site.tripadvisorUrl} target="_blank" rel="noopener noreferrer" className="btn bg-bianco !py-3 text-sm text-pomodoro">
                {c.linkTa} <ArrowUpRight size={16} aria-hidden />
              </a>
              <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !py-3 text-sm text-bianco hover:!border-bianco hover:!bg-bianco hover:!text-pomodoro">
                {c.linkG} <ArrowUpRight size={16} aria-hidden />
              </a>
            </div>
            <p className="mt-6 text-xs text-crema/70">
              {c.checked} {ta.checkedAt}
            </p>
          </div>
          <div className="grid gap-6">
            <ul className="grid gap-4 sm:grid-cols-2">
              {c.themes.map((th) => (
                <li key={th.t} data-reveal className="rounded-[1.2rem] border border-espresso/10 bg-crema p-6">
                  <h3 className="text-2xl">{th.t}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-inchiostro">{th.d}</p>
                </li>
              ))}
            </ul>
            <div data-reveal className="rounded-[1.2rem] bg-espresso p-7 text-crema">
              <ul className="space-y-5">
                {c.quotes.map((q) => (
                  <li key={q.q}>
                    <p className="font-display text-xl italic leading-snug text-bianco md:text-2xl">“{q.q}”</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-giallo">
                      {q.a} · {q.s}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-crema/15 pt-4 text-xs text-crema/55">{c.quotesNote}</p>
            </div>
          </div>
        </div>
        <p data-reveal className="mx-auto mt-14 max-w-3xl text-center font-display text-2xl italic leading-snug text-espresso md:text-3xl">
          {c.honest}
        </p>
      </Container>
    </section>
  );
}

/* 10 — Prenota */
export function Booking({ lang }: { lang: Lang }) {
  const c = t(lang).booking;
  return (
    <section id="prenota" aria-labelledby="booking-title" className="paper scroll-mt-24 py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHead eyebrow={c.eyebrow} title={c.title} intro={c.intro} id="booking-title" />
          <a data-reveal href={site.phoneHref} className="group mt-10 flex items-center gap-5 rounded-[1.4rem] bg-pomodoro p-6 text-bianco transition-transform duration-500 hover:-translate-y-1">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-bianco text-pomodoro transition-transform duration-500 group-hover:rotate-12">
              <Phone size={24} aria-hidden />
            </span>
            <span>
              <span className="block text-sm text-crema/85">{c.callNow}</span>
              <span className="block font-display text-[1.8rem] leading-tight md:text-3xl">{site.phoneDisplay}</span>
            </span>
          </a>
          {!site.phoneVerified && <VerifyTag label={`${t(lang).ui.phone}: ${t(lang).ui.toVerify}`} className="mt-3" />}
          <ul className="mt-10 space-y-3 text-[0.95rem] text-inchiostro">
            {c.info.map((i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pomodoro" aria-hidden />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal>
          <p className="hand mb-3 text-2xl text-pomodoro">{c.orForm} ↓</p>
          <BookingForm lang={lang} />
        </div>
      </Container>
    </section>
  );
}

/* 11 — Dove siamo */
export function Where({ lang }: { lang: Lang }) {
  const c = t(lang).where;
  const ui = t(lang).ui;
  return (
    <section aria-labelledby="where-title" className="bg-crema-dark py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHead eyebrow={c.eyebrow} title={c.title} intro={c.body} id="where-title" />
          <dl className="mt-10 space-y-6">
            <div data-reveal className="flex gap-4">
              <MapPin className="mt-1 shrink-0 text-pomodoro" aria-hidden />
              <div>
                <dt className="eyebrow text-espresso/60">{ui.address}</dt>
                <dd className="mt-1 text-lg">
                  {site.street}, {site.postalCode} {site.city} ({site.province})
                </dd>
                {!site.streetVerified && <VerifyTag label={lang === 'it' ? 'Civico da confermare (3 o 5)' : 'Street number to confirm (3 or 5)'} className="mt-2" />}
              </div>
            </div>
            <div data-reveal className="flex gap-4">
              <Clock className="mt-1 shrink-0 text-pomodoro" aria-hidden />
              <div>
                <dt className="eyebrow text-espresso/60">{ui.hours}</dt>
                <dd className="mt-1 text-lg">
                  {ui.lunch} {site.hours.lunch} · {ui.dinner} {site.hours.dinner}
                  <br />
                  <span className="text-inchiostro">
                    {ui.closedOn} {site.hours.closedDay[lang]}
                  </span>
                </dd>
                {!site.hoursVerified && <VerifyTag label={`${ui.hours}: ${ui.toVerify}`} className="mt-2" />}
              </div>
            </div>
          </dl>
          <a data-reveal href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-10">
            {ui.directions} <ArrowUpRight size={18} aria-hidden />
          </a>
        </div>
        <div data-reveal>
          <MapEmbed lang={lang} />
        </div>
      </Container>
    </section>
  );
}
