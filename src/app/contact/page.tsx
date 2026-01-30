import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { ContactForm } from "@/components/contact/ContactForm";
import { fetchSiteSettings } from "@/sanity/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Ruben Sagnier pour vos projets photographiques, collaborations ou tirages.",
};

export default async function ContactPage() {
  const settings = await fetchSiteSettings();
  const bgImage = settings?.contactBackgroundUrl ?? "/photos/ocean-02.svg";

  return (
    <PageTransition className="relative min-h-screen px-8 md:px-16 lg:px-24" style={{ paddingTop: "10rem", paddingBottom: "6rem" }}>
      <div
        className="fixed inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('${bgImage}')`,
          opacity: 0.12,
          filter: "blur(6px) saturate(0.3)",
        }}
      />
      <div className="relative z-10 max-w-2xl mx-auto" style={{ paddingLeft: "2rem" }}>
        <ContactForm />
      </div>
    </PageTransition>
  );
}
