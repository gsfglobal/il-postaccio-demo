import { TrattoriaPage } from '@/components/pages/Pages';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('trattoria', 'it');

export default function Page() {
  return <TrattoriaPage lang="it" />;
}
