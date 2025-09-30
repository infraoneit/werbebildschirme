"use client";
import { useEffect, useRef } from "react";

const logos = [
  "/logo.png",
  "/next.svg",
  "/vercel.svg",
  "/globe.svg",
  "/window.svg",
  "/file.svg",
];

export default function LogosMarquee() {
  const track = useRef<HTMLDivElement>(null);

  // sehr leichter Auto-Scroll
  useEffect(() => {
    let raf = 0;
    const el = track.current;
    if (!el) return;
    let x = 0;
    const step = () => {
      x -= 0.25; // Geschwindigkeit
      el.style.transform = `translateX(${x}px)`;
      if (Math.abs(x) > el.scrollWidth / 2) x = 0; // Loop
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section aria-label="Kunden & Partner" className="py-8">
      <div className="mx-auto max-w-screen-xl overflow-hidden px-6">
        <p className="mb-3 text-center text-sm font-semibold text-slate-500">
          Vertrauen von KMU bis Enterprise in der Schweiz
        </p>
        <div className="relative">
          <div
            ref={track}
            className="flex min-w-max items-center gap-10 opacity-80"
            style={{ willChange: "transform" }}
          >
            {[...logos, ...logos, ...logos].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-8 w-auto grayscale contrast-125"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
