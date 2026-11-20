import { MontefalcoPage } from '@/components/pages/Pages';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('montefalco', 'en');

export default function Page() {
  return <MontefalcoPage lang="en" />;
}
