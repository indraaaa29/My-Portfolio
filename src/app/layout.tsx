import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { MotionProvider } from '@/components/animations/MotionProvider';
import './globals.css';

/* ──────────────────────────────────────────────
 * Fonts
 * ────────────────────────────────────────────── */

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

/* ──────────────────────────────────────────────
 * Metadata — Cinematic Portfolio
 * ────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: 'Cinematic Portfolio',
    template: '%s | Cinematic Portfolio',
  },
  description:
    'A premium cinematic portfolio blending filmmaking, photography, and AI engineering. Himalayan valley — golden hour — glass UI.',
  keywords: [
    'portfolio',
    'cinematic',
    'photography',
    'filmmaking',
    'AI engineering',
    'creative technology',
  ],
  authors: [{ name: 'Cinematic Portfolio' }],
  creator: 'Cinematic Portfolio',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Cinematic Portfolio',
    title: 'Cinematic Portfolio',
    description:
      'A premium cinematic portfolio blending filmmaking, photography, and AI engineering.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1920,
        height: 1080,
        alt: 'Cinematic Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cinematic Portfolio',
    description:
      'A premium cinematic portfolio blending filmmaking, photography, and AI engineering.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#080808' },
  ],
};

/* ──────────────────────────────────────────────
 * Root Layout
 * ────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-surface-dark text-neutral-100 font-sans antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
