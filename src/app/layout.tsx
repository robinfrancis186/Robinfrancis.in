import type { Metadata } from "next";
import "@/index.css";
import ClientLayout from "./client-layout";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import {
  defaultSeoDescription,
  defaultSeoImage,
  defaultSeoKeywords,
  siteName,
  siteUrl,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Robin Francis | AI Innovator & Community Leader",
    template: "%s",
  },
  description: defaultSeoDescription,
  keywords: defaultSeoKeywords,
  authors: [{ name: "Robin Francis", url: siteUrl }],
  creator: "Robin Francis",
  publisher: "Robin Francis",
  manifest: "/manifest.webmanifest",
  category: "technology",
  other: {
    "msapplication-TileColor": "#2563eb",
    "msapplication-TileImage": "/images/mstile-150x150.png",
    "msapplication-config": "/browserconfig.xml",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/images/favicon-r.png", type: "image/png", sizes: "512x512" },
      { url: "/images/favicon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/images/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/images/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/images/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Robin Francis | AI Innovator & Community Leader",
    description: defaultSeoDescription,
    siteName,
    locale: "en_US",
    images: [defaultSeoImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robin Francis | AI Innovator & Community Leader",
    description: defaultSeoDescription,
    creator: "@robinfrancis186",
    images: [defaultSeoImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
