import Link from "next/link";
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

export function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  className,
  onClick,
}: ButtonProps) {
  const base = clsx(
    "inline-flex items-center justify-center px-8 py-3 text-sm tracking-[0.15em] uppercase transition-all duration-300",
    variant === "primary" && "bg-cta text-white hover:bg-hover",
    variant === "outline" && "border border-foreground/30 text-foreground hover:border-detail hover:text-detail",
    className
  );

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={base} onClick={onClick}>
      {children}
    </button>
  );
}
