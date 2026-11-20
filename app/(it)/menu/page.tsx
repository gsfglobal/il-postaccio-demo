import { MenuPage } from '@/components/pages/Pages';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('menu', 'it');

export default function Page() {
  return <MenuPage lang="it" />;
}
