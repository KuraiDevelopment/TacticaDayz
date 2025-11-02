import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tactica DayZ | Vanilla+ DayZ Server",
  description: "Experience DayZ as it was meant to be played. Enhanced but not overpowered. Tactical gameplay with carefully balanced modifications for the ultimate survival experience.",
  keywords: ["DayZ", "server", "vanilla", "enhanced", "survival", "tactical", "gaming", "multiplayer"],
  authors: [{ name: "Tactica DayZ Team" }],
  robots: "index, follow",
  metadataBase: new URL('https://tacticadayz.com'),
  openGraph: {
    title: "Tactica DayZ | Vanilla+ DayZ Server",
    description: "Experience DayZ as it was meant to be played. Enhanced but not overpowered.",
    type: "website",
    url: "https://tacticadayz.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tactica DayZ Server",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tactica DayZ | Vanilla+ DayZ Server",
    description: "Experience DayZ as it was meant to be played. Enhanced but not overpowered.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
