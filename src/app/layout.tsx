import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Thorne | Cinematic Portfolio & Staff Creative Technologist",
  description: "A world-class scroll-driven cinematic experience and high-performance digital portfolio showcasing 3D WebGL, AI platforms, and modern web applications.",
  keywords: ["Creative Technologist", "Frontend Engineer", "WebGL", "GSAP", "Next.js", "TypeScript", "3D Web", "Portfolio"],
  authors: [{ name: "Alex Thorne" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark scroll-smooth`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-black text-white font-sans selection:bg-amber-500 selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
