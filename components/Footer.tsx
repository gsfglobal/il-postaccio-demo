import { Clock, MapPin, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { legalRoutes, navLabels, navOrder, routes } from '@/lib/routes';
import { demoMode, site, type Lang } from '@/lib/site';
import { t } from '@/lib/content';

export function Footer({ lang }: { lang: Lang }) {
  const c = t(lang);
  const year = new Date().getFullYear();
  return (
    <footer className="paper-dark relative overflow-hidden text-crema">
      <div className="awning h-9 w-full" aria-hidden />
      <div className="mx-auto max-w-[1320px] px-5 pb-28 pt-16 md:px-8 md:pb-10">
        <p className="max-w-3xl font-display text-[clamp(2rem,5vw,3.6rem)] italic leading-[1.05] text-bianco">{c.footer.claim}</p>
        <div className="mt-14 grid gap-10 border-t border-crema/15 pt-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-5 text-sm leading-relaxed text-crema/70">
              {site.street}
              <br />
              {site.postalCode} {site.city} ({site.province}) · {site.region}
            </p>
          </div>
          <div>
            <h2 className="eyebrow mb-4 font-sans text-giallo">{c.footer.nav}</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {navOrder.map((k) => (
                <li key={k}>
                  <a href={routes[k][lang]} className="link-u text-crema/85 hover:text-bianco">
                    {navLabels[k][lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-4 font-sans text-giallo">{c.footer.contacts}</h2>
            <ul className="space-y-3 text-sm text-crema/85">
              <li className="flex gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0 text-giallo" aria-hidden />
                <a href={site.phoneHref} className="link-u hover:text-bianco">{site.phoneDisplay}</a>
              </li>
              <li className="flex gap-2.5">
                <Clock size={16} className="mt-0.5 shrink-0 text-giallo" aria-hidden />
                <span>
                  {c.ui.lunch} {site.hours.lunch} · {c.ui.dinner} {site.hours.dinner}
                  <br />
                  {c.ui.closedOn} {site.hours.closedDay[lang]}
                </span>
              </li>
              <li className="flex gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-giallo" aria-hidden />
                <a href={site.mapsUrl} className="link-u hover:text-bianco" target="_blank" rel="noopener noreferrer">{c.ui.directions}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-4 font-sans text-giallo">{c.footer.social}</h2>
            {site.instagram || site.facebook ? (
              <ul className="space-y-2 text-sm">
                {site.instagram && <li><a href={site.instagram} className="link-u">Instagram</a></li>}
                {site.facebook && <li><a href={site.facebook} className="link-u">Facebook</a></li>}
              </ul>
            ) : (
              <p className="tag-verify text-crema/60">{c.footer.socialTodo}</p>
            )}
            <ul className="mt-6 space-y-2 text-sm">
              <li><a href={site.tripadvisorUrl} target="_blank" rel="noopener noreferrer" className="link-u text-crema/85 hover:text-bianco">Tripadvisor ↗</a></li>
              <li><a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="link-u text-crema/85 hover:text-bianco">Google ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-crema/15 pt-6 text-xs text-crema/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalNote} · {c.footer.vat} · {c.footer.rights}
          </p>
          <p className="flex flex-wrap gap-4">
            <a href={legalRoutes.privacy[lang]} className="link-u hover:text-crema">{c.footer.legal}</a>
            {demoMode && <a href="/admin/" className="link-u hover:text-crema">{c.footer.admin}</a>}
          </p>
        </div>
      </div>
    </footer>
  );
}
