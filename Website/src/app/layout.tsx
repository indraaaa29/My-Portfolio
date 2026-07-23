import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import AudioProvider from "@/components/providers/AudioProvider";
import NavBar from "@/components/navigation/NavBar";
import ScrollProgress from "@/components/navigation/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Indranil Paul — Full Stack Engineer",
  description:
    "An engineer who observes the world like a photographer and builds products with intention. Portfolio showcasing AI, full-stack, and software engineering projects.",
  keywords: [
    "full stack engineer",
    "software engineer",
    "AI",
    "portfolio",
    "Indranil Paul",
    "web development",
    "react",
    "next.js",
  ],
  authors: [{ name: "Indranil Paul" }],
  openGraph: {
    title: "Indranil Paul — Full Stack Engineer",
    description:
      "An engineer who observes the world like a photographer and builds products with intention.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full bg-[#0b0b0f] text-[#f5f5f5] font-sans">
        <SmoothScrollProvider>
          <AudioProvider>
            <NavBar />
            <ScrollProgress />
            <main>{children}</main>
          </AudioProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
