import { getContent } from '@/src/content';
import { I18nProvider } from '@/src/i18n/I18nProvider';
import { REVEAL_BOOT_SCRIPT } from '@/src/config/ui';
import { htmlLang } from '@/src/i18n/locales';
import type { RootDocumentProps } from '@/src/types';
import AppProviders from '@/src/components/providers/AppProviders';
import RevealObserver from '@/src/components/providers/RevealObserver';
import Nav from '@/src/components/Nav/Nav';
import ThemeToggle from '@/src/components/ThemeToggle';
import Footer from '@/src/components/Footer/Footer';
import { fontVariables } from './fonts';
import 'lenis/dist/lenis.css';
import '@/src/styles/globals.css';

export default function RootDocument({ locale, children }: RootDocumentProps) {
  return (
    <html lang={htmlLang[locale]} suppressHydrationWarning className={fontVariables}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOT_SCRIPT }} />
      </head>
      <body className="overflow-x-clip bg-bg font-sans text-body antialiased">
        <I18nProvider locale={locale} content={getContent(locale)}>
          <AppProviders>
            <Nav />
            {children}
            <Footer />
            <ThemeToggle />
            <RevealObserver />
          </AppProviders>
        </I18nProvider>
      </body>
    </html>
  );
}
