import type { Metadata } from "next";
import Image from "next/image";
import { PageTransition } from "@/components/layout/PageTransition";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Ruben Sagnier pour vos projets photographiques, collaborations ou tirages.",
};

export default function ContactPage() {
  return (
    <PageTransition className="pt-40 pb-32 px-8 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28 items-center">
        <div className="relative aspect-[4/5] overflow-hidden hidden lg:block">
          <Image
            src="/photos/ocean-01.svg"
            alt="Ocean"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
        <ContactForm />
      </div>
    </PageTransition>
  );
}
