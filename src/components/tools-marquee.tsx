"use client";

import { tools } from "@/content/site";

export function ToolsMarquee() {
  const row = [...tools, ...tools];
  return (
    <section aria-label="Инструменты" className="overflow-hidden border-y border-cream/10 py-8">
      <p className="mb-6 px-4 text-center text-[11px] uppercase tracking-[0.28em] text-cream/35 sm:px-8">
        Софт в работе
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent sm:w-28" />
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {row.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="font-display text-2xl text-cream/25 sm:text-3xl"
            >
              {t}
              <span className="ml-10 text-lime/50">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
