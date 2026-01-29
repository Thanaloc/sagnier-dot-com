import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Sagnier pour vos projets photographiques, collaborations ou tirages.",
};

export default function ContactPage() {
  return (
    <PageTransition className="min-h-screen flex flex-col justify-center pt-20 pb-24 px-6 md:px-12 lg:px-20">
      <ContactForm />
    </PageTransition>
  );
}
