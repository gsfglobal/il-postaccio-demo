/**
 * Configurazione centrale del sito.
 * Tutti i dati di contatto stanno QUI: per cambiare un orario o il telefono
 * basta modificare questo file (oppure, a progetto pubblicato, il pannello admin).
 */

/** demoMode: true = versione da mostrare al titolare. Nessuna richiesta reale viene inviata. */
export const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE !== 'false';

/** Endpoint per le richieste di prenotazione (es. Formspree, funzione serverless). Vuoto = nessun invio. */
export const bookingEndpoint = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT ?? '';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ilpostacciomontefalco.it').replace(/\/$/, '');

export const site = {
  name: 'Il Postaccio',
  legalNote: 'Trattoria Il Postaccio',
  street: 'Viale della Vittoria, 5',
  /** Civico da confermare: Tripadvisor/Sluurpy indicano il 5, Google Maps il 3 */
  streetVerified: false,
  postalCode: '06036',
  city: 'Montefalco',
  province: 'PG',
  region: 'Umbria',
  country: 'IT',
  geo: { lat: 42.8919, lng: 12.6514 },
  phoneDisplay: '+39 329 257 9168',
  phoneHref: 'tel:+393292579168',
  phoneVerified: false,
  /** WhatsApp: attivare solo dopo conferma del titolare */
  whatsapp: '',
  priceRange: '€',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Il+Postaccio+Montefalco',
  tripadvisorUrl:
    'https://www.tripadvisor.it/Restaurant_Review-g608939-d2700806-Reviews-Il_Postaccio-Montefalco_Province_of_Perugia_Umbria.html',
  googleReviewsUrl: 'https://www.google.com/search?q=Il+Postaccio+Montefalco+recensioni',
  instagram: '',
  facebook: '',
  /** Orari indicativi (fonte Tripadvisor, 20/11/2026) — DA CONFERMARE */
  hoursVerified: false,
  hours: {
    lunch: '12:30 – 14:00',
    dinner: '19:30 – 21:30',
    closedDay: { it: 'martedì', en: 'Tuesday' },
  },
  /** Orari strutturati per Schema.org */
  openingSpec: [
    { days: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '12:30', closes: '14:00' },
    { days: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '19:30', closes: '21:30' },
  ],
  reviews: {
    tripadvisor: { rating: 4.3, count: 863, rank: 'n. 9 di 44 a Montefalco', award: "Travellers' Choice 2026", checkedAt: '20/11/2026' },
  },
} as const;

export type Lang = 'it' | 'en';
