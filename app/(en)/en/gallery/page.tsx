import { GalleryPage } from '@/components/pages/Pages';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('gallery', 'en');

export default function Page() {
  return <GalleryPage lang="en" />;
}
