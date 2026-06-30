import type { Metadata } from "next";
import "@/index.css";
import ClientLayout from "./client-layout";

const siteUrl = "https://www.robinfrancis.in";
const defaultDescription =
  "Robin Francis builds accessible AI products, scalable web systems, and community programs for people-centric technology.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Robin Francis | AI Innovator & Community Leader",
    template: "%s",
  },
  description: defaultDescription,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/favicon-r.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Robin Francis | AI Innovator & Community Leader",
    description: defaultDescription,
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robin Francis | AI Innovator & Community Leader",
    description: defaultDescription,
    images: ["/images/og-image.png"],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
