import { RecensioniPage } from '@/components/pages/Pages';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('recensioni', 'en');

export default function Page() {
  return <RecensioniPage lang="en" />;
}
