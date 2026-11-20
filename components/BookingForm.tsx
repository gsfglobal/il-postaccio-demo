'use client';

import { useMemo, useRef, useState, type FormEvent } from 'react';
import { AlertTriangle, CheckCircle2, FlaskConical, Phone } from 'lucide-react';
import { legalRoutes } from '@/lib/routes';
import { bookingEndpoint, demoMode, site, type Lang } from '@/lib/site';
import { t } from '@/lib/content';

type Fields = { name: string; phone: string; email: string; date: string; time: string; people: string; notes: string; privacy: boolean; website: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'sending' | 'ok' | 'demo' | 'error';

const empty: Fields = { name: '', phone: '', email: '', date: '', time: '', people: '2', notes: '', privacy: false, website: '' };
const lunchSlots = ['12:30', '13:00', '13:30'];
const dinnerSlots = ['19:30', '20:00', '20:30', '21:00'];

/**
 * Modulo richiesta prenotazione.
 * - demoMode: valida tutto, ma NON invia niente (simulazione).
 * - produzione: POST JSON a NEXT_PUBLIC_BOOKING_ENDPOINT (es. Formspree o funzione serverless).
 * Mai mostrare "prenotazione confermata": è una richiesta, la conferma la dà la trattoria.
 */
export function BookingForm({ lang }: { lang: Lang }) {
  const c = t(lang).booking.form;
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const startedAt = useRef(Date.now());
  const today = useMemo(() => {
    const d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }, []);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  function validate(): Errors {
    const e: Errors = {};
    if (f.name.trim().length < 2) e.name = c.required;
    if (!/^\+?[\d\s()./-]{8,20}$/.test(f.phone.trim())) e.phone = c.invalidPhone;
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = c.invalidEmail;
    if (!f.date || f.date < today) e.date = c.invalidDate;
    else if (new Date(f.date + 'T12:00:00').getDay() === 2) e.date = c.closedDay;
    if (!f.time) e.time = c.required;
    if (!f.privacy) e.privacy = c.privacyReq;
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(`bk-${first}`)?.focus();
      return;
    }
    // Anti-spam: honeypot compilato o invio troppo rapido = bot. Si finge successo senza inviare.
    const isBot = f.website.trim() !== '' || Date.now() - startedAt.current < 2500;

    setStatus('sending');
    if (demoMode || !bookingEndpoint || isBot) {
      await new Promise((r) => setTimeout(r, 900));
      setStatus(demoMode || !bookingEndpoint ? 'demo' : 'ok');
      return;
    }
    try {
      const res = await fetch(bookingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nome: f.name.trim(),
          telefono: f.phone.trim(),
          email: f.email.trim(),
          data: f.date,
          ora: f.time,
          persone: f.people,
          note: f.notes.trim().slice(0, 600),
          lingua: lang,
          consenso_privacy: true,
          inviato_il: new Date().toISOString(),
        }),
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok' || status === 'demo' || status === 'error') {
    const Icon = status === 'error' ? AlertTriangle : status === 'demo' ? FlaskConical : CheckCircle2;
    return (
      <div role="status" aria-live="polite" className="rounded-[1.6rem] border border-espresso/10 bg-bianco p-8 md:p-10">
        <Icon size={40} className={status === 'error' ? 'text-pomodoro' : 'text-bottiglia'} aria-hidden />
        <h3 className="mt-5 text-4xl">{status === 'ok' ? c.okTitle : status === 'demo' ? c.demoTitle : c.errTitle}</h3>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-inchiostro">{status === 'ok' ? c.okBody : status === 'demo' ? c.demoBody : c.errBody}</p>
        {status === 'demo' && (
          <dl className="mt-6 grid grid-cols-2 gap-3 rounded-xl bg-crema p-5 text-sm sm:grid-cols-3">
            {(
              [
                [c.name, f.name],
                [c.date, f.date.split('-').reverse().join('/')],
                [c.time, f.time],
                [c.people, f.people],
                [c.phone, f.phone],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-inchiostro/70">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={site.phoneHref} className="btn btn-primary">
            <Phone size={18} aria-hidden /> {site.phoneDisplay}
          </a>
          <button type="button" className="btn btn-ghost" onClick={() => { setF(empty); setStatus('idle'); startedAt.current = Date.now(); }}>
            {c.again}
          </button>
        </div>
      </div>
    );
  }

  const field = 'mt-1.5 w-full rounded-xl border bg-bianco px-4 py-3.5 text-base text-espresso outline-none transition-[border-color,box-shadow] placeholder:text-inchiostro/40 focus:border-pomodoro focus:shadow-[0_0_0_4px_rgba(168,60,48,.12)]';
  const border = (k: keyof Fields) => (errors[k] ? 'border-pomodoro' : 'border-espresso/15');
  const Err = ({ k }: { k: keyof Fields }) =>
    errors[k] ? (
      <p id={`bk-${k}-err`} className="mt-1.5 text-sm font-medium text-pomodoro">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Fields) => ({ 'aria-invalid': !!errors[k] || undefined, 'aria-describedby': errors[k] ? `bk-${k}-err` : undefined });

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-[1.6rem] border border-espresso/10 bg-bianco/70 p-6 shadow-[0_30px_60px_-40px_rgba(48,37,30,.5)] backdrop-blur md:p-9" aria-label={t(lang).booking.title}>
      {demoMode && (
        <p className="mb-6 flex items-center gap-2 rounded-lg bg-giallo/25 px-4 py-2.5 text-sm font-medium text-espresso">
          <FlaskConical size={16} aria-hidden /> {c.demoNotice}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="bk-name" className="text-sm font-semibold">{c.name} *</label>
          <input id="bk-name" autoComplete="name" className={`${field} ${border('name')}`} value={f.name} onChange={(e) => set('name', e.target.value)} {...aria('name')} />
          <Err k="name" />
        </div>
        <div>
          <label htmlFor="bk-phone" className="text-sm font-semibold">{c.phone} *</label>
          <input id="bk-phone" type="tel" inputMode="tel" autoComplete="tel" className={`${field} ${border('phone')}`} value={f.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+39 …" {...aria('phone')} />
          <Err k="phone" />
        </div>
        <div>
          <label htmlFor="bk-email" className="text-sm font-semibold">{c.email}</label>
          <input id="bk-email" type="email" inputMode="email" autoComplete="email" className={`${field} ${border('email')}`} value={f.email} onChange={(e) => set('email', e.target.value)} {...aria('email')} />
          <Err k="email" />
        </div>
        <div>
          <label htmlFor="bk-date" className="text-sm font-semibold">{c.date} *</label>
          <input id="bk-date" type="date" min={today} className={`${field} ${border('date')}`} value={f.date} onChange={(e) => set('date', e.target.value)} {...aria('date')} />
          <Err k="date" />
        </div>
        <div>
          <label htmlFor="bk-people" className="text-sm font-semibold">{c.people} *</label>
          <select id="bk-people" className={`${field} ${border('people')}`} value={f.people} onChange={(e) => set('people', e.target.value)}>
            {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
            <option value="10+">10+</option>
          </select>
        </div>
        <fieldset className="sm:col-span-2">
          <legend id="bk-time-legend" className="text-sm font-semibold">{c.time} *</legend>
          <div className="mt-2 space-y-3" role="radiogroup" aria-labelledby="bk-time-legend" {...aria('time')}>
            {[
              [c.lunch, lunchSlots],
              [c.dinner, dinnerSlots],
            ].map(([label, slots]) => (
              <div key={label as string} className="flex flex-wrap items-center gap-2">
                <span className="w-16 text-xs font-semibold uppercase tracking-wider text-inchiostro/70">{label as string}</span>
                {(slots as string[]).map((s, i) => (
                  <label key={s} className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-giallo ${f.time === s ? 'border-pomodoro bg-pomodoro text-bianco' : 'border-espresso/15 bg-bianco hover:border-pomodoro'}`}>
                    <input id={i === 0 && label === c.lunch ? 'bk-time' : undefined} type="radio" name="time" value={s} checked={f.time === s} onChange={() => set('time', s)} className="sr-only" />
                    {s}
                  </label>
                ))}
              </div>
            ))}
          </div>
          <Err k="time" />
        </fieldset>
        <div className="sm:col-span-2">
          <label htmlFor="bk-notes" className="text-sm font-semibold">{c.notes}</label>
          <textarea id="bk-notes" rows={3} maxLength={600} className={`${field} ${border('notes')} resize-y`} value={f.notes} onChange={(e) => set('notes', e.target.value)} />
        </div>
        {/* Honeypot anti-spam: invisibile agli utenti */}
        <div className="absolute -left-[9999px]" aria-hidden>
          <label htmlFor="bk-website">Website</label>
          <input id="bk-website" tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set('website', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-inchiostro">
            <input id="bk-privacy" type="checkbox" checked={f.privacy} onChange={(e) => set('privacy', e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#a83c30]" {...aria('privacy')} />
            <span>
              {c.privacy.split(c.privacyLink)[0]}
              <a href={legalRoutes.privacy[lang]} className="font-semibold text-pomodoro underline underline-offset-2">{c.privacyLink}</a>
              {c.privacy.split(c.privacyLink)[1]} *
            </span>
          </label>
          <Err k="privacy" />
        </div>
      </div>
      <button type="submit" disabled={status === 'sending'} className="btn btn-primary mt-8 w-full justify-center disabled:opacity-60 sm:w-auto">
        {status === 'sending' ? c.sending : c.submit}
      </button>
    </form>
  );
}
