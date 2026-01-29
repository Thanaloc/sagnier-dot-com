"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

const base = (variant: "primary" | "outline") =>
  clsx(
    "relative inline-flex items-center justify-center px-10 py-4 text-xs tracking-[0.2em] uppercase overflow-hidden transition-colors duration-500",
    variant === "primary" && "bg-cta text-white hover:bg-hover",
    variant === "outline" && "border border-foreground/20 text-foreground hover:border-detail hover:text-detail"
  );

export function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  className,
  onClick,
}: ButtonProps) {
  const classes = clsx(base(variant), className);

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="inline-block"
      >
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.button>
  );
}
