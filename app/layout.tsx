import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Fileme - Professional Tax Return Filing & Accounting Services",
    template: "%s | Fileme",
  },
  description:
    "Get your tax return filed before 30th September! Professional tax return filing and Accounting services. Secure, fast, and hassle-free. Expert tax preparation, e-filing, and financial planning.",
  keywords: [
    "tax return",
    "tax filing",
    "accounting services",
    "tax preparation",
    "tax deadline",
    "e-filing",
    "tax consulting",
    "financial planning",
    "bookkeeping",
    "tax planning",
    "IRS representation",
    "business tax returns",
    "individual tax returns",
  ],
  authors: [{ name: "Fileme Team" }],
  creator: "Fileme",
  publisher: "Fileme",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.fileme.today/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.fileme.today",
    siteName: "Fileme",
    title: "Fileme - Professional Tax Return Filing & Accounting Services",
    description:
      "Get your tax return filed before 30th September! Professional tax return filing and Accounting services. Secure, fast, and hassle-free.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Fileme - Professional Tax Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fileme - Professional Tax Return Filing & Accounting Services",
    description:
      "Get your tax return filed before 30th September! Professional tax return filing and Accounting services. Secure, fast, and hassle-free.",
    images: ["/logo.png"],
    creator: "@fileme",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AccountingService",
              name: "Fileme",
              description:
                "Professional tax return filing and accounting services",
              url: "https://www.fileme.today",
              logo: "https://www.fileme.today/logo.png",
              serviceType: [
                "Tax Return Filing",
                "Accounting Services",
                "Tax Consulting",
                "Financial Planning",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
        <Analytics />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
