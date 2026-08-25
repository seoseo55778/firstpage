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
    <div className="case-panel">
      <div className="case-body">
        <div>
          <p className="max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
            {item.problem}
          </p>
          <p className="case-body__kicker">Работы по проекту</p>
          <ul className="mt-4 space-y-3">
            {item.work.map((w) => (
              <li key={w} className="case-body__item">
                <span aria-hidden className="case-body__dot" />
                {w}
              </li>
            ))}
          </ul>
          {item.note ? (
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">{item.note}</p>
          ) : null}
        </div>
        <div className="case-aside">
          <div className="case-metrics">
            {item.results.map((r) => (
              <div key={r.label} className="case-metrics__item">
                <div className="case-metrics__value font-display">
                  <CountUp value={r.value} />
                </div>
                <div className="case-metrics__label">{r.label}</div>
              </div>
            ))}
          </div>
          {item.images.map((img) => (
            <div key={img.src} className="case-chart">
              <Image src={img.src} alt={img.alt} width={1200} height={720} className="h-auto w-full" />
            </div>
          ))}
        </div>
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
              <article
                key={item.slug}
                className={cn("case-item border-b border-line last:border-b-0", isOpen && "is-open")}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? "" : item.slug)}
                  className="case-row"
                  aria-expanded={isOpen}
                >
                  <h3 className="case-row__title font-display">{item.title}</h3>
                  <span className="case-row__action" aria-hidden>
                    <span className="case-row__lime" />
                    <span className={cn("case-row__btn", isOpen && "is-open")}>
                      <ChevronDown size={18} />
                    </span>
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
