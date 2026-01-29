"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost" | "pill";
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

const styles = {
  primary:
    "rounded-full border border-foreground/20 text-foreground/80 hover:border-foreground/50 hover:text-foreground",
  outline:
    "rounded-full border border-foreground/20 text-foreground/80 hover:border-foreground/50 hover:text-foreground",
  pill:
    "rounded-full bg-foreground/10 border border-foreground/15 text-foreground/80 hover:bg-foreground/15 hover:text-foreground",
  ghost:
    "text-foreground/50 hover:text-foreground",
};

export function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  className,
  onClick,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center text-[11px] tracking-[0.25em] uppercase transition-all duration-500",
    variant !== "ghost" && variant !== "pill" && "px-14 py-5",
    styles[variant],
    className
  );

  const pillStyle = variant === "pill" ? { padding: "1.25rem 3.5rem" } : undefined;

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="inline-block"
      >
        <Link href={href} className={classes} style={pillStyle}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      style={pillStyle}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.button>
  );
}
