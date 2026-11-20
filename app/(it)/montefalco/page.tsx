import { MontefalcoPage } from '@/components/pages/Pages';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('montefalco', 'it');

export default function Page() {
  return <MontefalcoPage lang="it" />;
}
