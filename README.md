# Il Postaccio — sito web (demo commerciale)

Sito multipagina in Next.js per la trattoria Il Postaccio di Montefalco (PG).
Stato: **demo da mostrare al titolare**, non pubblicata e non approvata dal ristorante.

## Cosa contiene

| Area | Dove |
|---|---|
| Homepage 12 sezioni con hero 3D (React Three Fiber) | `components/pages/Pages.tsx`, `components/home/*`, `components/hero/*` |
| Pagine interne IT | `/la-trattoria` `/menu` `/la-nostra-cucina` `/gallery` `/montefalco` `/recensioni` `/contatti` `/privacy` |
| Pagine interne EN | `/en/` `/en/the-trattoria` `/en/menu` `/en/our-kitchen` `/en/gallery` `/en/montefalco` `/en/reviews` `/en/contact` |
| Testi IT/EN | `lib/content.ts` |
| Dati di contatto, orari, demoMode | `lib/site.ts` |
| Menu del giorno (dati iniziali) | `data/menu.json` |
| Pannello menu | `/admin` (PIN demo `1234`) |
| Ricerca e fonti | `RESEARCH.md` |

## Comandi

```bash
npm install
npm run dev        # sviluppo su http://localhost:3000
npm run build      # genera il sito statico nella cartella out/
npm run typecheck
```

## Modalità demo (`demoMode`)

Attiva di default. Con la demo attiva:
- banner in alto "Demo di presentazione — non è il sito ufficiale";
- il modulo prenotazioni valida tutto ma **non invia nulla** (mostra "Simulazione completata");
- il pannello menu salva solo nel browser di chi lo usa;
- `robots.txt` e meta robots bloccano l'indicizzazione.

Per la versione pubblica: `NEXT_PUBLIC_DEMO_MODE=false`.

## Variabili d'ambiente (produzione)

| Variabile | A cosa serve |
|---|---|
| `NEXT_PUBLIC_DEMO_MODE` | `false` per disattivare la demo |
| `NEXT_PUBLIC_SITE_URL` | dominio definitivo (canonical, sitemap, Open Graph) |
| `NEXT_PUBLIC_BOOKING_ENDPOINT` | URL che riceve le richieste di prenotazione (POST JSON) |

## Pubblicazione — lavoro ancora necessario

1. **Dati da confermare col titolare** (in `lib/site.ts`): civico 3 o 5, telefono, orari, giorno di chiusura, WhatsApp, social, P. IVA. Poi mettere a `true` i flag `streetVerified`, `phoneVerified`, `hoursVerified`: i bollini "Da confermare" spariscono da soli.
2. **Fotografie**: ogni segnaposto (`PhotoSlot`) accetta `src` e `alt`. Mettere le foto in `public/foto/` (WebP, max 2000px) e passarle ai componenti.
3. **Prenotazioni**: collegare `NEXT_PUBLIC_BOOKING_ENDPOINT` a un servizio che inoltri email (e, se richiesto, WhatsApp) al ristorante. Consigliato Formspree o una funzione serverless con invio email transazionale. Testare l'invio reale prima del lancio. Il sito non conferma mai il tavolo: conferma il ristorante.
4. **Menu aggiornabile per tutti**: oggi il pannello salva nel browser. In produzione: login del titolare + database (consigliato Supabase con una tabella `menu` e accesso protetto), oppure deploy su Vercel con rebuild automatico quando cambia `data/menu.json`. Stima: 1–2 giornate.
5. **Privacy e cookie**: la pagina `/privacy` è una bozza; farla redigere da un consulente.
6. **Recensioni**: gli estratti brevi in `lib/content.ts` vanno sostituiti con un widget ufficiale o con recensioni autorizzate. Aggiornare valutazione e numero recensioni.
7. **Inglese**: far rileggere i testi a un madrelingua.
8. **Google Business Profile**: allineare NAP (nome, indirizzo, telefono) con il sito.

Hosting consigliato: Vercel o Netlify (sito statico, costo zero o quasi), dominio con DNS su Cloudflare.

## Note tecniche

- Esportazione statica (`output: 'export'`): nessun server necessario.
- Hero 3D: scena procedurale (nessun modello esterno), si ferma quando non è visibile, fallback illustrato senza WebGL o con "risparmio dati", rispetto di `prefers-reduced-motion`.
- Font self-hosted (Fraunces, Inter, Caveat) tramite Fontsource: nessuna chiamata a Google Fonts.
- Mappa Google caricata solo su richiesta dell'utente.
- SEO: meta title/description per pagina, canonical, hreflang IT/EN, Open Graph, Schema.org `Restaurant`, `BreadcrumbList`, `FAQPage`, sitemap e robots.
