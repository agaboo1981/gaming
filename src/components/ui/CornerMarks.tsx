import { cn } from "../../lib/utils";

export function CornerMarks({
  className,
  size = 14,
  color = "accent",
}: {
  className?: string;
  size?: number;
  color?: "accent" | "white";
}) {
  const c =
    color === "accent"
      ? "border-accent/50 group-hover:border-accent"
      : "border-white/25 group-hover:border-white/50";

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      <span
        className={cn("absolute top-3 left-3 border-t border-l transition-colors duration-500", c)}
        style={{ width: size, height: size }}
      />
      <span
        className={cn("absolute top-3 right-3 border-t border-r transition-colors duration-500", c)}
        style={{ width: size, height: size }}
      />
      <span
        className={cn("absolute bottom-3 left-3 border-b border-l transition-colors duration-500", c)}
        style={{ width: size, height: size }}
      />
      <span
        className={cn("absolute bottom-3 right-3 border-b border-r transition-colors duration-500", c)}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
