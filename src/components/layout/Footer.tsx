import Link from "next/link";
import { navigation } from "@/config/theme";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-8 pt-24 pb-16 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <Link
            href="/"
            className="text-lg font-display tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors duration-500"
          >
            Sagnier
          </Link>

          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[11px] tracking-[0.2em] uppercase text-foreground/25 hover:text-foreground/50 transition-colors duration-500"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/5">
          <p className="text-center text-[11px] text-foreground/20 tracking-[0.15em]">
            {year} Sagnier Photographie
          </p>
        </div>
      </div>
    </footer>
  );
}
