'use client';

import { useEffect, useState } from 'react';
import { Check, Copy, Lock, Plus, RotateCcw, Save, Trash2 } from 'lucide-react';
import { Logo } from './Logo';
import { clearLocalMenu, defaultMenu, loadLocalMenu, saveLocalMenu, type Menu, type MenuItem } from '@/lib/menu';

/**
 * Pannello "Menu del giorno".
 * DEMO: protetto da un PIN dimostrativo e salvato solo nel browser (localStorage).
 * PRODUZIONE: sostituire con login vero + salvataggio su database (vedi README.md, sezione "Pubblicazione").
 */
const DEMO_PIN = '1234';

export function Admin() {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [pinErr, setPinErr] = useState(false);
  const [menu, setMenu] = useState<Menu>(structuredClone(defaultMenu));
  const [saved, setSaved] = useState<'idle' | 'ok' | 'fail'>('idle');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const local = loadLocalMenu();
    if (local) setMenu(local);
  }, []);

  const update = (fn: (m: Menu) => void) => {
    setMenu((prev) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
    setSaved('idle');
  };

  const save = () => {
    const next = { ...menu, updatedAt: new Date().toISOString().slice(0, 10) };
    setMenu(next);
    setSaved(saveLocalMenu(next) ? 'ok' : 'fail');
  };

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(menu, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!unlocked) {
    return (
      <div className="paper grid min-h-screen place-items-center p-5">
        <form
          className="w-full max-w-sm rounded-[1.6rem] bg-bianco p-8 shadow-xl"
          onSubmit={(e) => {
            e.preventDefault();
            if (pin === DEMO_PIN) setUnlocked(true);
            else setPinErr(true);
          }}
        >
          <Logo />
          <h1 className="mt-8 text-3xl">Area riservata</h1>
          <p className="mt-2 text-sm text-inchiostro">Gestione del menu del giorno.</p>
          <label htmlFor="pin" className="mt-6 block text-sm font-semibold">PIN</label>
          <input id="pin" type="password" inputMode="numeric" autoComplete="off" value={pin} onChange={(e) => { setPin(e.target.value); setPinErr(false); }} className="mt-1.5 w-full rounded-xl border border-espresso/15 px-4 py-3 text-lg tracking-[0.4em]" aria-invalid={pinErr || undefined} aria-describedby="pin-help" />
          {pinErr && <p className="mt-2 text-sm text-pomodoro">PIN non corretto.</p>}
          <p id="pin-help" className="mt-3 rounded-lg bg-giallo/25 p-3 text-xs leading-relaxed">
            Demo: PIN <strong>1234</strong>. Nella versione pubblicata l&apos;accesso avviene con account personale del titolare.
          </p>
          <button className="btn btn-primary mt-6 w-full justify-center" type="submit">
            <Lock size={16} aria-hidden /> Entra
          </button>
          <a href="/" className="mt-4 block text-center text-sm text-inchiostro underline">Torna al sito</a>
        </form>
      </div>
    );
  }

  const input = 'w-full rounded-lg border border-espresso/15 bg-bianco px-3 py-2 text-[0.95rem] focus:border-pomodoro';

  return (
    <div className="paper min-h-screen pb-32">
      <header className="sticky top-0 z-20 border-b border-espresso/10 bg-crema/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <Logo />
          <div className="flex flex-wrap gap-2">
            <a href="/menu/" className="btn btn-ghost !px-4 !py-2 text-sm">Vedi il menu</a>
            <button type="button" onClick={save} className="btn btn-primary !px-4 !py-2 text-sm">
              {saved === 'ok' ? <Check size={16} aria-hidden /> : <Save size={16} aria-hidden />} {saved === 'ok' ? 'Salvato' : 'Salva'}
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 pt-8">
        <h1 className="text-4xl md:text-5xl">Menu del giorno</h1>
        <p role="status" className="mt-3 rounded-xl border border-dashed border-pomodoro/50 bg-bianco p-4 text-sm leading-relaxed text-inchiostro">
          <strong className="text-pomodoro">Modalità demo.</strong> Le modifiche restano solo su questo browser e si vedono nelle pagine Home e Menu.
          Nella versione pubblicata il salvataggio va sul server e il menu si aggiorna per tutti i visitatori.
          {saved === 'fail' && <span className="mt-2 block font-semibold text-pomodoro">Salvataggio non disponibile in questo browser.</span>}
        </p>

        <section className="mt-8 rounded-[1.2rem] bg-bianco p-6">
          <h2 className="text-2xl">Specialità del giorno</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold">Italiano
              <input className={`${input} mt-1`} value={menu.special.it} onChange={(e) => update((m) => { m.special.it = e.target.value; })} />
            </label>
            <label className="text-sm font-semibold">English
              <input className={`${input} mt-1`} value={menu.special.en} onChange={(e) => update((m) => { m.special.en = e.target.value; })} />
            </label>
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input type="checkbox" className="h-4 w-4 accent-[#a83c30]" checked={menu.isDemo} onChange={(e) => update((m) => { m.isDemo = e.target.checked; })} />
            Mostra la nota &quot;menu dimostrativo&quot; ai visitatori
          </label>
        </section>

        {menu.sections.map((s, si) => (
          <section key={s.id} className="mt-6 rounded-[1.2rem] bg-bianco p-6">
            <h2 className="text-2xl">{s.title.it}</h2>
            <ul className="mt-4 space-y-4">
              {s.items.map((it, ii) => (
                <li key={it.id} className="grid gap-3 rounded-xl border border-espresso/10 p-4 md:grid-cols-[1fr_1fr_110px_auto]">
                  <label className="text-xs font-semibold text-inchiostro">Nome (IT)
                    <input className={`${input} mt-1`} value={it.name.it} onChange={(e) => update((m) => { m.sections[si].items[ii].name.it = e.target.value; })} />
                  </label>
                  <label className="text-xs font-semibold text-inchiostro">Name (EN)
                    <input className={`${input} mt-1`} value={it.name.en} onChange={(e) => update((m) => { m.sections[si].items[ii].name.en = e.target.value; })} />
                  </label>
                  <label className="text-xs font-semibold text-inchiostro">Prezzo €
                    <input
                      className={`${input} mt-1`}
                      inputMode="decimal"
                      placeholder="—"
                      value={it.price ?? ''}
                      onChange={(e) => {
                        const v = e.target.value.replace(',', '.');
                        update((m) => { m.sections[si].items[ii].price = v === '' || isNaN(Number(v)) ? null : Number(v); });
                      }}
                    />
                  </label>
                  <div className="flex items-end gap-2">
                    <label className="flex items-center gap-2 rounded-lg border border-espresso/15 px-3 py-2 text-sm">
                      <input type="checkbox" className="h-4 w-4 accent-[#344d3b]" checked={it.available} onChange={(e) => update((m) => { m.sections[si].items[ii].available = e.target.checked; })} />
                      Oggi c&apos;è
                    </label>
                    <button type="button" aria-label={`Elimina ${it.name.it}`} onClick={() => update((m) => { m.sections[si].items.splice(ii, 1); })} className="grid h-10 w-10 place-items-center rounded-lg text-pomodoro hover:bg-pomodoro/10">
                      <Trash2 size={16} aria-hidden />
                    </button>
                  </div>
                  <label className="text-xs font-semibold text-inchiostro md:col-span-2">Descrizione (IT)
                    <input className={`${input} mt-1`} value={it.desc.it} onChange={(e) => update((m) => { m.sections[si].items[ii].desc.it = e.target.value; })} />
                  </label>
                  <label className="text-xs font-semibold text-inchiostro md:col-span-2">Description (EN)
                    <input className={`${input} mt-1`} value={it.desc.en} onChange={(e) => update((m) => { m.sections[si].items[ii].desc.en = e.target.value; })} />
                  </label>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-bottiglia hover:text-pomodoro"
              onClick={() =>
                update((m) => {
                  const item: MenuItem = { id: `${s.id}-${Date.now()}`, name: { it: 'Nuovo piatto', en: 'New dish' }, desc: { it: '', en: '' }, price: null, available: true };
                  m.sections[si].items.push(item);
                })
              }
            >
              <Plus size={16} aria-hidden /> Aggiungi piatto
            </button>
          </section>
        ))}

        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={copyJson} className="btn btn-ghost text-sm">
            <Copy size={16} aria-hidden /> {copied ? 'Copiato' : 'Copia dati menu (JSON)'}
          </button>
          <button
            type="button"
            onClick={() => {
              clearLocalMenu();
              setMenu(structuredClone(defaultMenu));
              setSaved('idle');
            }}
            className="btn btn-ghost text-sm"
          >
            <RotateCcw size={16} aria-hidden /> Ripristina menu iniziale
          </button>
        </div>
      </main>
      <div className="fixed inset-x-0 bottom-0 border-t border-espresso/10 bg-crema/95 p-4 backdrop-blur md:hidden">
        <button type="button" onClick={save} className="btn btn-primary w-full justify-center">
          <Save size={16} aria-hidden /> {saved === 'ok' ? 'Salvato' : 'Salva il menu'}
        </button>
      </div>
    </div>
  );
}
