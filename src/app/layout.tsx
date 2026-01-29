import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

export const metadata: Metadata = {
  title: {
    default: "Sagnier Photographie",
    template: "%s | Sagnier Photographie",
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
      <body className="antialiased">
        <SmoothScroll />
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
