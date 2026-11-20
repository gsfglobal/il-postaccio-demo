import { HomePage } from '@/components/pages/Pages';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('home', 'it');

export default function Page() {
  return <HomePage lang="it" />;
}
