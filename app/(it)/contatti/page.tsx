import { ContattiPage } from '@/components/pages/Pages';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('contatti', 'it');

export default function Page() {
  return <ContattiPage lang="it" />;
}
