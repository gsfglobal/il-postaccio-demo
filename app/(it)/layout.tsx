import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';

export const metadata: Metadata = {
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = { themeColor: '#30251e', width: 'device-width', initialScale: 1 };

/* Nasconde gli elementi animati prima del primo paint (solo con JS e motion consentito).
   Se gli script non partono entro 4s, tutto torna visibile. */
const motionBoot = `(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('js-motion');setTimeout(function(){if(!window.__motionReady)d.classList.remove('js-motion')},4000)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
