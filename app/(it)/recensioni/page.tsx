import { RecensioniPage } from '@/components/pages/Pages';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('recensioni', 'it');

export default function Page() {
  return <RecensioniPage lang="it" />;
}
