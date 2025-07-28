import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
    default: "Fileme - Professional Financial Services & Advisory",
    template: "%s | Fileme",
  },
  description:
    "Comprehensive professional services including tax services, accounting & financial reporting, business valuation, financial analysis, internal controls, and risk advisory. Expert financial solutions for your business.",
  keywords: [
    "tax services",
    "accounting services",
    "financial reporting",
    "business valuation",
    "financial analysis",
    "internal controls",
    "risk advisory",
    "tax preparation",
    "bookkeeping",
    "IFRS compliance",
    "business consulting",
    "financial planning",
    "audit services",
    "compliance advisory",
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
    title: "Fileme - Professional Financial Services & Advisory",
    description:
      "Comprehensive professional services including tax services, accounting & financial reporting, business valuation, financial analysis, internal controls, and risk advisory.",
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
    title: "Fileme - Professional Financial Services & Advisory",
    description:
      "Comprehensive professional services including tax services, accounting & financial reporting, business valuation, financial analysis, internal controls, and risk advisory.",
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
                "Professional financial services and advisory including tax services, accounting & financial reporting, business valuation, financial analysis, internal controls, and risk advisory",
              url: "https://www.fileme.today",
              logo: "https://www.fileme.today/logo.png",
              serviceType: [
                "Tax Services",
                "Accounting & Financial Reporting",
                "Business Valuation Services",
                "Financial Analysis & Decision Support",
                "Internal Controls Advisory",
                "Risk Advisory Services",
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
