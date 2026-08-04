import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Indranil Paul | Full Stack Developer & AI Engineer',
  description: 'Bridging the gap between intelligent systems, scalable web architecture, and secure infrastructure.',
  authors: [{ name: 'Indranil Paul' }],
  openGraph: {
    title: 'Indranil Paul | Full Stack Developer & AI Engineer',
    description: 'Bridging the gap between intelligent systems, scalable web architecture, and secure infrastructure.',
    url: 'https://indranilpaul.dev', // TODO: update with real domain
    siteName: 'Indranil Paul Portfolio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased`}>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
