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
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <nav className="flex items-center justify-end px-8 py-10 md:px-16 md:py-12 lg:px-24">
        <DesktopMenu pathname={pathname} />
        <MobileMenuButton open={menuOpen} toggle={() => setMenuOpen((v) => !v)} />
      </nav>

      <AnimatePresence>
        {menuOpen && <MobileMenu pathname={pathname} onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ item, isActive }: { item: (typeof navigation)[number]; isActive: boolean }) {
  return (
    <li>
      <Link
        href={item.href}
        className={clsx(
          "relative text-[11px] tracking-[0.25em] uppercase transition-all duration-500 group",
          isActive
            ? "text-white opacity-100"
            : "text-white opacity-50 hover:opacity-90"
        )}
      >
        <motion.span
          className="inline-block"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {item.label}
        </motion.span>
        {isActive ? (
          <motion.span
            layoutId="nav-active"
            className="absolute -bottom-2 left-0 right-0 h-[1.5px] bg-detail rounded-full"
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          />
        ) : (
          <span className="absolute -bottom-2 left-0 right-0 h-[1.5px] bg-white/40 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
        )}
      </Link>
    </li>
  );
}

function DesktopMenu({ pathname }: { pathname: string }) {
  return (
    <ul className="hidden md:flex items-center gap-12">
      {navigation.map((item) => (
        <NavLink key={item.href} item={item} isActive={pathname === item.href} />
      ))}
    </ul>
  );
}

function MobileMenuButton({ open, toggle }: { open: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="relative z-50 flex flex-col gap-2 md:hidden w-8 h-6 justify-center"
      aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
    >
      <motion.span
        animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
        className="block w-full h-[1.5px] bg-white origin-center"
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        className="block w-full h-[1.5px] bg-white origin-right"
        transition={{ duration: 0.3 }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
        className="block w-full h-[1.5px] bg-white origin-center"
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
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
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-0 z-40 bg-background flex items-center justify-center"
    >
      <motion.ul
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
          hidden: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
        }}
        className="flex flex-col items-center gap-14"
      >
        {navigation.map((item) => (
          <motion.li
            key={item.href}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              href={item.href}
              onClick={onClose}
              className={clsx(
                "text-3xl md:text-4xl font-display tracking-[0.15em] uppercase transition-colors duration-500",
                pathname === item.href
                  ? "text-detail"
                  : "text-foreground/50 hover:text-foreground"
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
