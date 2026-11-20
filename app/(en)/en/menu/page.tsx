import { MenuPage } from '@/components/pages/Pages';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('menu', 'en');

export default function Page() {
  return <MenuPage lang="en" />;
}
