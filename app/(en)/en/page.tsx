import { HomePage } from '@/components/pages/Pages';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('home', 'en');

export default function Page() {
  return <HomePage lang="en" />;
}
