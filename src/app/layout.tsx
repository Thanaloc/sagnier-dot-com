import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { fetchSiteSettings } from "@/sanity/fetch";

export const revalidate = 3600;

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sagnier-dot-com.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ruben Sagnier Photographie",
    template: "%s | Ruben Sagnier Photographie",
  },
  description:
    "Photographie de surf, océan et paysages. Capturer l'instant, sublimer la vague.",
  keywords: ["photographie", "surf", "ocean", "plage", "photographe"],
  authors: [{ name: "Ruben Sagnier" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Ruben Sagnier Photographie",
    title: "Ruben Sagnier Photographie",
    description:
      "Photographie de surf, océan et paysages. Capturer l'instant, sublimer la vague.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruben Sagnier Photographie",
    description:
      "Photographie de surf, océan et paysages. Capturer l'instant, sublimer la vague.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B3C5D",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchSiteSettings();

  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased">
        <SmoothScroll />
        <Navigation />
        <main className="min-h-screen" style={{ paddingBottom: "6rem" }}>{children}</main>
        <Footer
          instagramUrl={settings?.instagramUrl ?? undefined}
          linkedinUrl={settings?.linkedinUrl ?? undefined}
        />
      </body>
    </html>
  );
}
