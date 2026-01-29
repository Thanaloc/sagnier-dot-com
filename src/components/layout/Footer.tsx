import Link from "next/link";
import { navigation } from "@/config/theme";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 px-6 py-12 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-foreground/40 tracking-wider">
          {year} Sagnier Photographie
        </p>

        <ul className="flex items-center gap-6">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-xs tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground transition-colors duration-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
