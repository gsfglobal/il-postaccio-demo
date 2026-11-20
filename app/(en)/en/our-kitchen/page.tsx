import { CucinaPage } from '@/components/pages/Pages';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('cucina', 'en');

export default function Page() {
  return <CucinaPage lang="en" />;
}
