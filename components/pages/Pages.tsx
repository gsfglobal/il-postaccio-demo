import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react';
import { Shell } from '../Shell';
import { Hero } from '../hero/Hero';
import { Booking, DailyMenu, Dishes, Philosophy, Reviews, Rooms, Umbria, Welcome, Where, Wine } from '../home/Sections';
import { Container, PageHero, SectionHead, VerifyTag } from '../ui';
import { PhotoSlot } from '../PhotoSlot';
import type { IllustrationKind } from '../Illustration';
import { JsonLd } from '../JsonLd';
import { MenuFull } from '../MenuFull';
import { BookingForm } from '../BookingForm';
import { MapEmbed } from '../MapEmbed';
import { breadcrumbJsonLd, restaurantJsonLd } from '@/lib/seo';
import { navLabels, routes } from '@/lib/routes';
import { site, type Lang } from '@/lib/site';
import { t } from '@/lib/content';

/* ============================== HOME ============================== */
export function HomePage({ lang }: { lang: Lang }) {
  return (
    <Shell lang={lang} page="home" overHero>
      <JsonLd data={restaurantJsonLd(lang)} />
      <Hero lang={lang} />
      <Welcome lang={lang} />
      <Philosophy lang={lang} />
      <Dishes lang={lang} />
      <DailyMenu lang={lang} />
      <Umbria lang={lang} />
      <Rooms lang={lang} />
      <Wine lang={lang} />
      <Reviews lang={lang} />
      <Booking lang={lang} />
      <Where lang={lang} />
    </Shell>
  );
}

/* ========================== LA TRATTORIA ========================== */
export function TrattoriaPage({ lang }: { lang: Lang }) {
  const p = t(lang).pages.trattoria;
  const kinds: IllustrationKind[] = ['awning', 'room', 'wine', 'pasta'];
  const tones = ['verde', 'crema', 'rosso', 'giallo'] as const;
  return (
    <Shell lang={lang} page="trattoria">
      <JsonLd data={breadcrumbJsonLd('trattoria', lang, p.title)} />
      <PageHero eyebrow="Il Postaccio · Montefalco" title={p.title} lead={p.lead}>
        <VerifyTag label={p.historyNote} className="mt-8 max-w-2xl !rounded-xl !py-2 !text-xs" />
      </PageHero>
      <section className="bg-bianco py-20 md:py-28">
        <Container className="space-y-20 md:space-y-28">
          {p.blocks.map((b, i) => (
            <article key={b.t} className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <div data-reveal className="aspect-[5/4] overflow-hidden rounded-[1.6rem]">
                <PhotoSlot lang={lang} kind={kinds[i]} tone={tones[i]} shot={t(lang).pages.gallery.shots[[0, 5, 6, 2][i]]} />
              </div>
              <div>
                <span data-reveal className="font-display text-5xl italic text-pomodoro/30">0{i + 1}</span>
                <h2 data-reveal className="mt-2 text-[clamp(2rem,4vw,3.2rem)]">{b.t}</h2>
                <p data-reveal className="mt-5 text-lg leading-relaxed text-inchiostro">{b.d}</p>
              </div>
            </article>
          ))}
        </Container>
      </section>
      <Rooms lang={lang} />
      <Booking lang={lang} />
    </Shell>
  );
}

/* ============================== MENU ============================== */
export function MenuPage({ lang }: { lang: Lang }) {
  const p = t(lang).pages.menu;
  return (
    <Shell lang={lang} page="menu">
      <JsonLd data={breadcrumbJsonLd('menu', lang, p.title)} />
      <PageHero eyebrow={t(lang).daily.eyebrow.replace(/^05 — /, '')} title={p.title} lead={p.lead} />
      <section className="paper pb-24">
        <Container>
          <MenuFull lang={lang} />
          <p className="mt-10 max-w-2xl text-sm text-inchiostro/80">{p.allergens}</p>
        </Container>
      </section>
      <Booking lang={lang} />
    </Shell>
  );
}

/* ========================= LA NOSTRA CUCINA ======================== */
export function CucinaPage({ lang }: { lang: Lang }) {
  const p = t(lang).pages.cucina;
  return (
    <Shell lang={lang} page="cucina">
      <JsonLd data={breadcrumbJsonLd('cucina', lang, p.title)} />
      <PageHero eyebrow={t(lang).philosophy.title} title={p.title} lead={p.lead} />
      <Philosophy lang={lang} />
      <Dishes lang={lang} />
      <section className="paper py-24 md:py-32">
        <Container>
          <SectionHead title={p.glossaryTitle} />
          <dl className="mt-12 grid gap-px overflow-hidden rounded-[1.4rem] bg-espresso/10 md:grid-cols-2">
            {p.glossary.map((g) => (
              <div key={g.t} data-reveal className="bg-crema p-8">
                <dt className="font-display text-3xl italic text-pomodoro">{g.t}</dt>
                <dd className="mt-3 text-lg leading-relaxed text-inchiostro">{g.d}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <DailyMenu lang={lang} />
    </Shell>
  );
}

/* ============================= GALLERY ============================ */
export function GalleryPage({ lang }: { lang: Lang }) {
  const p = t(lang).pages.gallery;
  const kinds: IllustrationKind[] = ['awning', 'room', 'pasta', 'moka', 'porcini', 'room', 'wine', 'pot', 'borgo', 'pot', 'tart', 'awning'];
  const tones = ['verde', 'crema', 'giallo', 'espresso', 'crema', 'rosso', 'rosso', 'giallo', 'verde', 'crema', 'rosso', 'verde'] as const;
  const spans = ['md:col-span-2 md:row-span-2', '', '', 'md:row-span-2', '', 'md:col-span-2', '', '', 'md:col-span-2', '', '', ''];
  return (
    <Shell lang={lang} page="gallery">
      <JsonLd data={breadcrumbJsonLd('gallery', lang, p.title)} />
      <PageHero eyebrow="Il Postaccio · Montefalco" title={p.title} lead={p.lead} />
      <section className="paper pb-24 md:pb-32">
        <Container>
          <ul className="grid auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[230px]">
            {p.shots.map((s, i) => (
              <li key={s} data-reveal className={`overflow-hidden rounded-[1.2rem] ${spans[i]}`}>
                <PhotoSlot lang={lang} kind={kinds[i]} tone={tones[i]} shot={s} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </Shell>
  );
}

/* ============================ MONTEFALCO =========================== */
export function MontefalcoPage({ lang }: { lang: Lang }) {
  const p = t(lang).pages.montefalco;
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <Shell lang={lang} page="montefalco">
      <JsonLd data={breadcrumbJsonLd('montefalco', lang, p.title)} />
      <JsonLd data={faqLd} />
      <PageHero eyebrow={t(lang).umbria.eyebrow.replace(/^06 — /, '')} title={p.title} lead={p.lead} />
      <section className="relative overflow-hidden bg-bottiglia py-20 text-crema md:py-28">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {p.blocks.map((b, i) => (
              <article key={b.t} data-reveal className="rounded-[1.4rem] bg-bottiglia-dark/70 p-8 md:p-10">
                <span className="font-display text-4xl italic text-giallo/60">0{i + 1}</span>
                <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] text-bianco">{b.t}</h2>
                <p className="mt-4 text-lg leading-relaxed text-crema/80">{b.d}</p>
              </article>
            ))}
          </div>
          <div data-reveal className="mt-10 aspect-[21/9] overflow-hidden rounded-[1.6rem]">
            <PhotoSlot lang={lang} kind="borgo" tone="crema" shot={t(lang).pages.gallery.shots[8]} />
          </div>
        </Container>
      </section>
      <Wine lang={lang} />
      <section className="paper py-24 md:py-32">
        <Container className="max-w-4xl">
          <SectionHead title={p.faqTitle} />
          <div className="mt-10 divide-y divide-espresso/15 border-y border-espresso/15">
            {p.faq.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl">
                  {f.q}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-espresso/20 text-xl transition-transform duration-300 group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-inchiostro">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
      <Where lang={lang} />
    </Shell>
  );
}

/* ============================ RECENSIONI =========================== */
export function RecensioniPage({ lang }: { lang: Lang }) {
  const p = t(lang).pages.recensioni;
  return (
    <Shell lang={lang} page="recensioni">
      <JsonLd data={breadcrumbJsonLd('recensioni', lang, p.title)} />
      <PageHero eyebrow={t(lang).reviews.eyebrow.replace(/^09 — /, '')} title={p.title} lead={p.lead} />
      <Reviews lang={lang} full />
      <section className="paper py-24">
        <Container className="flex flex-col items-start justify-between gap-8 rounded-[1.6rem] border border-espresso/10 bg-bianco p-8 md:flex-row md:items-center md:p-12">
          <div className="max-w-xl">
            <h2 className="text-4xl">{p.leaveTitle}</h2>
            <p className="mt-3 text-lg text-inchiostro">{p.leaveBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={site.tripadvisorUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Tripadvisor <ArrowUpRight size={16} aria-hidden /></a>
            <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Google <ArrowUpRight size={16} aria-hidden /></a>
          </div>
        </Container>
      </section>
    </Shell>
  );
}

/* ============================= CONTATTI ============================ */
export function ContattiPage({ lang }: { lang: Lang }) {
  const p = t(lang).pages.contatti;
  const ui = t(lang).ui;
  const b = t(lang).booking;
  return (
    <Shell lang={lang} page="contatti">
      <JsonLd data={breadcrumbJsonLd('contatti', lang, p.title)} />
      <JsonLd data={restaurantJsonLd(lang)} />
      <PageHero eyebrow={navLabels.contatti[lang]} title={p.title} lead={p.lead}>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <a data-reveal href={site.phoneHref} className="group rounded-[1.4rem] bg-pomodoro p-7 text-bianco transition-transform duration-500 hover:-translate-y-1">
            <Phone aria-hidden />
            <p className="mt-6 text-sm text-crema/80">{ui.phone}</p>
            <p className="font-display text-3xl">{site.phoneDisplay}</p>
            {!site.phoneVerified && <span className="tag-verify mt-3 text-crema/80">{ui.toVerify}</span>}
          </a>
          <div data-reveal className="rounded-[1.4rem] bg-bianco p-7">
            <Clock className="text-pomodoro" aria-hidden />
            <p className="mt-6 text-sm text-inchiostro/70">{ui.hours}</p>
            <p className="text-lg leading-snug">
              {ui.lunch} {site.hours.lunch}
              <br />
              {ui.dinner} {site.hours.dinner}
              <br />
              {ui.closedOn} {site.hours.closedDay[lang]}
            </p>
            {!site.hoursVerified && <VerifyTag label={ui.toVerify} className="mt-3" />}
          </div>
          <a data-reveal href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="rounded-[1.4rem] bg-bottiglia p-7 text-crema transition-transform duration-500 hover:-translate-y-1">
            <MapPin className="text-giallo" aria-hidden />
            <p className="mt-6 text-sm text-crema/70">{ui.address}</p>
            <p className="text-lg leading-snug">
              {site.street}
              <br />
              {site.postalCode} {site.city} ({site.province})
            </p>
            {!site.streetVerified && <span className="tag-verify mt-3 text-crema/80">{ui.toVerify}</span>}
          </a>
        </div>
      </PageHero>
      <section id="prenota" className="paper scroll-mt-24 py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHead eyebrow={b.eyebrow.replace(/^10 — /, '')} title={b.title} intro={b.intro} />
            <ul className="mt-8 space-y-3 text-[0.95rem] text-inchiostro">
              {b.info.map((i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pomodoro" aria-hidden />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <BookingForm lang={lang} />
        </Container>
      </section>
      <section className="bg-crema-dark py-20">
        <Container>
          <MapEmbed lang={lang} />
        </Container>
      </section>
    </Shell>
  );
}

/* ============================== PRIVACY ============================ */
export function PrivacyPage({ lang }: { lang: Lang }) {
  const it = lang === 'it';
  return (
    <Shell lang={lang} page="contatti">
      <PageHero eyebrow={it ? 'Bozza da validare' : 'Draft to be validated'} title={it ? 'Privacy e cookie' : 'Privacy & cookies'} lead={it ? 'Informativa provvisoria per la demo. Il testo definitivo va redatto con un consulente privacy prima della pubblicazione.' : 'Provisional notice for the demo. The final text must be drafted with a privacy consultant before launch.'} />
      <section className="paper pb-24">
        <Container className="max-w-3xl space-y-8 text-lg leading-relaxed text-inchiostro">
          {(it
            ? [
                ['Titolare del trattamento', 'Il Postaccio, Viale della Vittoria, Montefalco (PG). Dati societari e contatto privacy da inserire.'],
                ['Dati raccolti', 'Con il modulo di prenotazione: nome, telefono, email facoltativa, data, orario, numero di persone e note. Non inserire dati sanitari nelle note oltre alle allergie necessarie al servizio.'],
                ['Finalità e base giuridica', 'Gestire la richiesta di prenotazione e ricontattarti (misure precontrattuali richieste dall\'interessato, art. 6.1.b GDPR).'],
                ['Conservazione', 'I dati sono conservati per il tempo necessario a gestire la prenotazione e poi cancellati, salvo obblighi di legge.'],
                ['Cookie', 'Il sito usa solo cookie tecnici. La mappa di Google viene caricata solo se la richiedi esplicitamente.'],
                ['Diritti', 'Puoi chiedere accesso, rettifica, cancellazione e opposizione scrivendo al titolare, e proporre reclamo al Garante Privacy.'],
              ]
            : [
                ['Data controller', 'Il Postaccio, Viale della Vittoria, Montefalco (PG). Company details and privacy contact to be added.'],
                ['Data collected', 'Through the booking form: name, phone, optional email, date, time, number of guests and notes.'],
                ['Purpose and legal basis', 'Handling your booking request and contacting you (pre-contractual measures requested by you, Art. 6.1.b GDPR).'],
                ['Retention', 'Data is kept only as long as needed to handle the booking, then deleted, unless the law requires otherwise.'],
                ['Cookies', 'The site uses only technical cookies. The Google map loads only if you explicitly request it.'],
                ['Your rights', 'You can request access, correction, deletion and object by writing to the controller, and lodge a complaint with the Italian Data Protection Authority.'],
              ]
          ).map(([h, d]) => (
            <div key={h}>
              <h2 className="text-3xl text-espresso">{h}</h2>
              <p className="mt-2">{d}</p>
            </div>
          ))}
          <p>
            <a href={routes.home[lang]} className="font-semibold text-pomodoro underline underline-offset-4">← Home</a>
          </p>
        </Container>
      </section>
    </Shell>
  );
}
