"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { navigation } from "@/config/theme";

export function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-20">
        <Link
          href="/"
          className="relative z-50 text-lg font-light tracking-[0.3em] uppercase text-foreground hover:text-detail transition-colors duration-300"
          onClick={() => setMenuOpen(false)}
        >
          Sagnier
        </Link>

        <DesktopMenu pathname={pathname} />
        <MobileMenuButton open={menuOpen} toggle={() => setMenuOpen((v) => !v)} />
      </nav>

      <AnimatePresence>
        {menuOpen && <MobileMenu pathname={pathname} onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}

function DesktopMenu({ pathname }: { pathname: string }) {
  return (
    <ul className="hidden md:flex items-center gap-8">
      {navigation.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={clsx(
              "relative text-sm tracking-[0.15em] uppercase transition-colors duration-300",
              pathname === item.href
                ? "text-detail"
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            {item.label}
            {pathname === item.href && (
              <motion.span
                layoutId="nav-underline"
                className="absolute -bottom-1 left-0 right-0 h-px bg-detail"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MobileMenuButton({ open, toggle }: { open: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="relative z-50 flex flex-col gap-1.5 md:hidden w-7 h-5 justify-center"
      aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
    >
      <motion.span
        animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
        className="block w-full h-px bg-foreground origin-center"
        transition={{ duration: 0.3 }}
      />
      <motion.span
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        className="block w-full h-px bg-foreground"
        transition={{ duration: 0.2 }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
        className="block w-full h-px bg-foreground origin-center"
        transition={{ duration: 0.3 }}
      />
    </button>
  );
}

function MobileMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-40 bg-background flex items-center justify-center"
    >
      <motion.ul
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
        }}
        className="flex flex-col items-center gap-8"
      >
        {navigation.map((item) => (
          <motion.li
            key={item.href}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={item.href}
              onClick={onClose}
              className={clsx(
                "text-2xl tracking-[0.2em] uppercase transition-colors duration-300",
                pathname === item.href
                  ? "text-detail"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
