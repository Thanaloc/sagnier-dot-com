import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Sagnier pour vos projets photographiques, collaborations ou tirages.",
};

export default function ContactPage() {
  return (
    <PageTransition className="pt-28 pb-24 px-6 md:px-12 lg:px-20">
      <SectionTitle
        title="Contact"
        subtitle="Un projet, une collaboration, une envie ? Ecrivez-moi."
      />
      <ContactForm />
    </PageTransition>
  );
}
