"use client";

import { cases, type CaseStudy } from "@/content/site";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value.match(/\d/) ? "0" : value);

  useEffect(() => {
    const match = value.match(/^([×+]?)(\d+(?:[,.]\d+)?)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const [, prefix, rawNumber, suffix] = match;
    const target = Number(rawNumber.replace(",", "."));
    let frame = 0;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const start = performance.now();
        const duration = 950;

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;
          const formatted =
            rawNumber.includes(",") || rawNumber.includes(".")
              ? current.toFixed(1).replace(".", ",")
              : String(Math.round(current));

          setDisplay(`${prefix}${formatted}${suffix}`);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.45 },
    );

    const node = ref.current;
    if (node) observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <div ref={ref}>{display}</div>;
}

function CaseBody({ item }: { item: CaseStudy }) {
  return (
    <div className="grid gap-10 border-t border-line px-0 pb-12 pt-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
          {item.problem}
        </p>
        <p className="mt-8 text-sm font-medium text-accent">Работы по проекту</p>
        <ul className="mt-4 space-y-3">
          {item.work.map((w) => (
            <li
              key={w}
              className="grid grid-cols-[auto_1fr] gap-3 text-[15px] leading-relaxed text-ink/80"
            >
              <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-accent" />
              {w}
            </li>
          ))}
        </ul>
        {item.note ? (
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">{item.note}</p>
        ) : null}
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {item.results.map((r) => (
            <div key={r.label} className="rounded-2xl border border-line bg-surface px-3 py-4 sm:px-4">
              <div className="font-display text-2xl tracking-tight text-accent sm:text-3xl">
                <CountUp value={r.value} />
              </div>
              <div className="mt-2 text-[11px] uppercase leading-snug tracking-[0.12em] text-muted">
                {r.label}
              </div>
            </div>
          ))}
        </div>
        {item.images.map((img) => (
          <div key={img.src} className="overflow-hidden rounded-2xl border border-line bg-white">
            <Image src={img.src} alt={img.alt} width={1200} height={720} className="h-auto w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Cases() {
  const [open, setOpen] = useState<string>(cases[0].slug);

  return (
    <section id="cases" className="px-4 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 sm:mb-14">
          <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-ink sm:text-5xl">
            Кейсы
          </h2>
        </div>

        <div className="border-y border-line">
          {cases.map((item) => {
            const isOpen = open === item.slug;
            return (
              <article key={item.slug} className="border-b border-line last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? "" : item.slug)}
                  data-cursor="case"
                  className="flex w-full items-start gap-4 py-6 text-left sm:items-center sm:gap-8 sm:py-8"
                  aria-expanded={isOpen}
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      "mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-all duration-500",
                      isOpen && "rotate-180 border-ink",
                    )}
                  >
                    <ChevronDown size={18} />
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
