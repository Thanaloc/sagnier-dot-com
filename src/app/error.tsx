"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { pageShell } from "@/config/spacing";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className={`flex min-h-[60vh] flex-col items-center justify-center text-center ${pageShell}`}
    >
      <p className="text-xs tracking-[0.5em] uppercase text-detail mb-8">Erreur</p>
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-wide text-foreground">
        Une vague est passée
      </h1>
      <p className="mt-10 max-w-md text-base md:text-lg text-foreground/40 leading-loose">
        Quelque chose s’est interrompu en chemin. Réessayez dans un instant.
      </p>
      <div className="mt-16 flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
        <Button onClick={reset} variant="pill">
          Réessayer
        </Button>
        <Button href="/" variant="ghost">
          Retour à l’accueil
        </Button>
      </div>
    </div>
  );
}
