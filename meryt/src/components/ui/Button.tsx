"use client";

import { cn } from "@/src/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-bold rounded-xl transition-all cursor-pointer border-none";
    const variants = {
      primary: "bg-[var(--accent)] text-white shadow-[0_4px_20px_rgba(255,69,0,0.3)] hover:shadow-[0_6px_28px_rgba(255,69,0,0.45)]",
      secondary: "bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--text)]",
      ghost: "bg-transparent text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]",
      danger: "bg-red-600 text-white",
    };
    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2.5 text-sm",
      lg: "px-6 py-3.5 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        style={{ fontFamily: "'Syne', sans-serif" }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
