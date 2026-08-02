import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "line";
  children: React.ReactNode;
  as?: "button" | "a";
  href?: string;
}

export function Button({
  variant = "primary",
  className,
  children,
  as = "button",
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    "btn-press group relative inline-flex items-center justify-center gap-3",
    "font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em]",
    "px-7 py-3.5 clip-cta overflow-hidden isolate",
    "data-interactive",
    variant === "primary" &&
      "bg-accent text-void hover:bg-accent-hot shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-accent)_60%,transparent)] hover:shadow-[0_0_32px_color-mix(in_srgb,var(--color-accent)_28%,transparent)]",
    variant === "secondary" &&
      "bg-transparent text-bone border border-white/[0.12] hover:border-accent/50 hover:text-white hover:bg-white/[0.03]",
    variant === "ghost" && "text-fog hover:text-white px-4",
    variant === "line" &&
      "bg-transparent text-accent border border-accent/35 hover:border-accent hover:bg-accent/8 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--color-accent)_15%,transparent)]",
    className
  );

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-18deg] transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-0 bg-current opacity-40 transition-all duration-500 group-hover:w-full"
      />
    </>
  );

  if (as === "a" && href) {
    return (
      <a href={href} className={classes} data-interactive {...(props as object)}>
        {inner}
      </a>
    );
  }

  return (
    <button type={props.type ?? "button"} className={classes} data-interactive {...props}>
      {inner}
    </button>
  );
}
