import { cn } from "../../lib/utils";

export function LiveDot({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block size-1.5 rounded-full bg-accent animate-pulse-live shadow-[0_0_8px_var(--color-accent)]",
        className
      )}
      aria-hidden
    />
  );
}
