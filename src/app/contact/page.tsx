import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Sagnier pour vos projets photographiques, collaborations ou tirages.",
};

export default function ContactPage() {
  return (
    <PageTransition className="min-h-screen flex flex-col justify-center pt-28 pb-32 px-8 md:px-16 lg:px-24">
      <ContactForm />
    </PageTransition>
  );
}
