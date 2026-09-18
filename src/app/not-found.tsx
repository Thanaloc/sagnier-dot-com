import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { pageShell } from "@/config/spacing";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n’existe pas ou n’existe plus.",
};

export default function NotFound() {
  return (
    <div
      className={`flex min-h-[60vh] flex-col items-center justify-center text-center ${pageShell}`}
    >
      <p className="text-xs tracking-[0.5em] uppercase text-detail mb-8">Erreur 404</p>
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-wide text-foreground">
        Page introuvable
      </h1>
      <p className="mt-10 max-w-md text-base md:text-lg text-foreground/40 leading-loose">
        Cette page a suivi le courant. Rien ne subsiste à cette adresse.
      </p>
      <div className="mt-16">
        <Button href="/" variant="pill">
          Retour à l’accueil
        </Button>
      </div>
    </div>
  );
}
