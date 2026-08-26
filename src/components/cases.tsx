"use client";

import { cases, type CaseStudy } from "@/content/site";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Expand, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

function formatInt(n: number) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const numeric = /^([×+]?)([\d\s\u00a0]+(?:[,.]\d+)?)(.*)$/.test(value);
  const [display, setDisplay] = useState(numeric ? "0" : value);

  useEffect(() => {
    const match = value.match(/^([×+]?)([\d\s\u00a0]+(?:[,.]\d+)?)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const [, prefix, rawNumber, suffix] = match;
    const compact = rawNumber.replace(/[\s\u00a0]/g, "");
    const target = Number(compact.replace(",", "."));
    if (!Number.isFinite(target)) {
      setDisplay(value);
      return;
    }

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
            compact.includes(",") || compact.includes(".")
              ? current.toFixed(1).replace(".", ",")
              : formatInt(current);

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

type CaseImage = CaseStudy["images"][number];

function CaseLightbox({
  image,
  onClose,
}: {
  image: CaseImage | null;
  onClose: () => void;
}) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!image) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [image, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {image ? (
        <motion.div
          className="case-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <button type="button" className="case-lightbox__close" aria-label="Закрыть" onClick={onClose}>
            <X size={20} />
          </button>
          <motion.div
            className="case-lightbox__panel"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <p id={titleId} className="sr-only">
              {image.alt}
            </p>
            <Image
              src={image.src}
              alt={image.alt}
              width={1800}
              height={1200}
              className="case-lightbox__image"
              sizes="96vw"
              priority
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function CaseBody({
  item,
  onOpenImage,
}: {
  item: CaseStudy;
  onOpenImage: (image: CaseImage) => void;
}) {
  const count = item.images.length;

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
        </div>
      </div>

      <div
        className={cn(
          "case-gallery",
          count === 1 && "is-one",
          count === 2 && "is-two",
          count >= 3 && "is-three",
        )}
      >
        {item.images.map((img) => (
          <button
            key={img.src}
            type="button"
            className="case-chart"
            onClick={() => onOpenImage(img)}
            aria-label={`Открыть: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={1200}
              height={720}
              className="case-chart__image"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <span className="case-chart__hint" aria-hidden>
              <Expand size={16} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Cases() {
  const [open, setOpen] = useState<string>(cases[0].slug);
  const [lightbox, setLightbox] = useState<CaseImage | null>(null);

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
                    <motion.span
                      className={cn("case-row__btn", isOpen && "is-open")}
                      animate={
                        isOpen
                          ? { rotate: 180, scale: 1.06 }
                          : { rotate: 0, scale: 1 }
                      }
                      whileHover={!isOpen ? { scale: 1.08, rotate: 12 } : undefined}
                      whileTap={{ scale: 0.94 }}
                      transition={{ type: "spring", stiffness: 420, damping: 22 }}
                    >
                      <ChevronDown size={18} />
                    </motion.span>
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
                      <CaseBody item={item} onOpenImage={setLightbox} />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>

      <CaseLightbox image={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
