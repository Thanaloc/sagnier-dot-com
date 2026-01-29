import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

export const metadata: Metadata = {
  title: {
    default: "Ruben Sagnier Photographie",
    template: "%s | Ruben Sagnier Photographie",
  },
  description: "Photographie de surf, ocean et paysages. Capturer l'instant, sublimer la vague.",
  keywords: ["photographie", "surf", "ocean", "plage", "photographe"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SmoothScroll />
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
