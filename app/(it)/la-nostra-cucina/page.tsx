import { CucinaPage } from '@/components/pages/Pages';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('cucina', 'it');

export default function Page() {
  return <CucinaPage lang="it" />;
}
