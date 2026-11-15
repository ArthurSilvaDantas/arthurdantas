import { Inter, JetBrains_Mono, Outfit } from 'next/font/google';
import localFont from 'next/font/local';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const interItalic = Inter({ subsets: ['latin'], style: 'italic', weight: '400', variable: '--font-inter-italic', display: 'swap', preload: false });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: '400', variable: '--font-jetbrains-mono', display: 'swap' });
const jetbrainsMonoArrow = localFont({
  src: '../../src/fonts/jetbrains-mono-arrow.woff2',
  variable: '--font-jetbrains-mono-arrow',
  display: 'swap',
  adjustFontFallback: false,
  declarations: [{ prop: 'unicode-range', value: 'U+2192' }],
});

export const fontVariables = [outfit, inter, interItalic, jetbrainsMono, jetbrainsMonoArrow].map((font) => font.variable).join(' ');
