import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-32 pb-20" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <Link
            href="/"
            className="text-lg font-display tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors duration-500"
          >
            Ruben Sagnier
          </Link>

          <ul className="flex items-center gap-6">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.2em] uppercase text-foreground/25 hover:text-foreground/50 transition-colors duration-500"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.2em] uppercase text-foreground/25 hover:text-foreground/50 transition-colors duration-500"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/5">
          <p className="text-center text-[11px] text-foreground/20 tracking-[0.15em]">
            {year} Ruben Sagnier Photographie
          </p>
        </div>
      </div>
    </footer>
  );
}
