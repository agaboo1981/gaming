import { useEffect, useRef } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
};

export function Particles() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reduced) return;
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let mx = 0.5;
    let my = 0.5;

    const resize = () => {
      w = el.width = window.innerWidth;
      h = el.height = window.innerHeight;
      const count = Math.min(55, Math.floor((w * h) / 28000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.12 - 0.04,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * 0.35 + 0.08,
      }));
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX / w;
      my = e.clientY / h;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx + (mx - 0.5) * 0.12;
        p.y += p.vy + (my - 0.5) * 0.08;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,162,39,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvas}
      className="pointer-events-none fixed inset-0 z-[1] opacity-60 mix-blend-screen"
      aria-hidden
    />
  );
}
