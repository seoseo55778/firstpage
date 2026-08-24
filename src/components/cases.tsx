"use client";

import { cases, type CaseStudy } from "@/content/site";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

function CaseBody({ item }: { item: CaseStudy }) {
  return (
    <div className="grid gap-10 border-t border-cream/10 px-0 pb-12 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <div>
        <p className="max-w-2xl text-[15px] leading-relaxed text-cream/70 sm:text-base">
          {item.problem}
        </p>
        <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-lime">
          Что сделал
        </p>
        <ul className="mt-4 space-y-3">
          {item.work.map((w) => (
            <li
              key={w}
              className="grid grid-cols-[auto_1fr] gap-3 text-[15px] leading-relaxed text-cream/80"
            >
              <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-lime" />
              {w}
            </li>
          ))}
        </ul>
        {item.note ? (
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/40">
            {item.note}
          </p>
        ) : null}
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {item.results.map((r) => (
            <div
              key={r.label}
              className="rounded-2xl border border-cream/10 bg-cream/[0.03] px-3 py-4 sm:px-4"
            >
              <div className="font-display text-2xl tracking-tight text-lime sm:text-3xl">
                {r.value}
              </div>
              <div className="mt-2 text-[11px] uppercase leading-snug tracking-[0.12em] text-cream/45">
                {r.label}
              </div>
            </div>
          ))}
        </div>
        {item.images.map((img) => (
          <div
            key={img.src}
            className="overflow-hidden rounded-2xl border border-cream/10 bg-white"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={1200}
              height={720}
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Cases() {
  const [open, setOpen] = useState<string>(cases[0].slug);

  return (
    <section id="cases" className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-lime">
              03 — Кейсы
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight text-cream sm:text-6xl">
              Цифры, а не
              <br />
              «рост видимости»
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream/50">
            Три проекта с измеримым эффектом и ещё два — с сильной механикой
            (фильтры, B2B-сценарии, UX). Названия клиентов не публикую: NDA и
            дилерские ограничения.
          </p>
        </div>

        <div className="border-y border-cream/10">
          {cases.map((item) => {
            const isOpen = open === item.slug;
            return (
              <article key={item.slug} className="border-b border-cream/10 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? "" : item.slug)}
                  className="flex w-full items-start gap-4 py-6 text-left sm:items-center sm:gap-8 sm:py-8 lg:px-8"
                  aria-expanded={isOpen}
                >
                  <span className="w-10 shrink-0 font-mono text-xs text-lime sm:w-14">
                    {item.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-2xl leading-tight tracking-tight text-cream sm:text-3xl lg:text-4xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-cream/45">
                      {[item.niche, item.region, item.cms, item.period]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/15 transition-transform duration-500",
                      isOpen && "rotate-45 border-lime text-lime",
                    )}
                  >
                    <Plus size={18} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <CaseBody item={item} />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
