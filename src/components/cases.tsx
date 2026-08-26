"use client";

import { cases, type CaseStudy } from "@/content/site";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Expand, X } from "lucide-react";
import Image, { getImageProps } from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

function formatInt(n: number) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
}

function parseMetric(value: string) {
  const match = value.match(/^([×+]?)([\d\s\u00a0]+(?:[,.]\d+)?)(.*)$/u);
  if (!match) {
    return { animatable: false as const, final: value };
  }

  const [, prefix, rawNumber, suffix] = match;
  const compact = rawNumber.replace(/[\s\u00a0]/g, "");
  const target = Number(compact.replace(",", "."));
  if (!Number.isFinite(target)) {
    return { animatable: false as const, final: value };
  }

  const format = (n: number) => {
    const formatted =
      compact.includes(",") || compact.includes(".")
        ? n.toFixed(1).replace(".", ",")
        : formatInt(n);
    return `${prefix}${formatted}${suffix}`;
  };

  return {
    animatable: true as const,
    final: format(target),
    target,
    format,
  };
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const parsed = parseMetric(value);
  const [display, setDisplay] = useState(parsed.final);

  useEffect(() => {
    const next = parseMetric(value);
    setDisplay(next.final);

    if (!next.animatable) return;

    let frame = 0;
    let started = false;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setDisplay(next.final);
    };

    const run = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const duration = 950;

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(next.format(next.target * eased));
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          finish();
        }
      };

      frame = requestAnimationFrame(tick);
    };

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run();
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);

    const fallback = window.setTimeout(() => {
      if (!started) finish();
    }, 900);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
    };
  }, [value]);

  return <div ref={ref}>{display}</div>;
}

type CaseImage = CaseStudy["images"][number];

const prefetched = new Set<string>();

function prefetchCaseImages(images: readonly CaseImage[]) {
  if (typeof window === "undefined") return;

  for (const image of images) {
    if (prefetched.has(image.src)) continue;
    prefetched.add(image.src);

    const { props } = getImageProps({
      src: image.src,
      alt: "",
      width: 800,
      height: 480,
      quality: 70,
      sizes: "(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 360px",
    });

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = props.src;
    if (props.srcSet) link.imageSrcset = props.srcSet;
    if (props.sizes) link.imageSizes = props.sizes;
    link.fetchPriority = "low";
    document.head.appendChild(link);
  }
}

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
              width={1200}
              height={900}
              className="case-lightbox__image"
              sizes="(max-width: 1120px) 96vw, 1120px"
              quality={85}
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
  showMedia,
}: {
  item: CaseStudy;
  onOpenImage: (image: CaseImage) => void;
  showMedia: boolean;
}) {
  const count = item.images.length;

  return (
    <div className="case-panel">
      <div className="case-body">
        <div>
          <p className="case-body__lead">{item.problem}</p>
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
            <>
              <p className="case-body__kicker">Вывод</p>
              <p className="case-body__note">{item.note}</p>
            </>
          ) : null}
        </div>
        <div className="case-aside">
          <div className="case-metrics">
            {item.results.map((r) => (
              <div key={r.label} className="case-metrics__item">
                <div className="case-metrics__value font-display">
                  {showMedia ? <CountUp value={r.value} /> : r.value}
                </div>
                <div className="case-metrics__label">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showMedia ? (
        <div
          className={cn(
            "case-gallery",
            count === 1 && "is-one",
            count === 2 && "is-two",
            count >= 3 && "is-three",
          )}
        >
          {item.images.map((img, index) => (
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
                width={800}
                height={480}
                className="case-chart__image"
                sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 360px"
                quality={70}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
              <span className="case-chart__hint" aria-hidden>
                <Expand size={16} />
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Cases() {
  const [open, setOpen] = useState<string>("");
  const [lightbox, setLightbox] = useState<CaseImage | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // Warm the first couple of cases before the user opens them.
        cases.slice(0, 2).forEach((item) => prefetchCaseImages(item.images));
        observer.disconnect();
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cases"
      ref={sectionRef}
      className="cases-section px-4 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 sm:mb-14">
          <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-ink sm:text-5xl">
            Кейсы
          </h2>
        </div>

        <div className="cases-board">
          {cases.map((item) => {
            const isOpen = open === item.slug;
            return (
              <article
                key={item.slug}
                className={cn("case-item", isOpen && "is-open")}
                onMouseEnter={() => prefetchCaseImages(item.images)}
                onFocusCapture={() => prefetchCaseImages(item.images)}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? "" : item.slug)}
                  className="case-row"
                  aria-expanded={isOpen}
                  aria-controls={`case-panel-${item.slug}`}
                  id={`case-trigger-${item.slug}`}
                >
                  <span className="case-row__copy">
                    <h3 className="case-row__title font-display">{item.title}</h3>
                  </span>
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
                <motion.div
                  id={`case-panel-${item.slug}`}
                  role="region"
                  aria-labelledby={`case-trigger-${item.slug}`}
                  aria-hidden={!isOpen}
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <CaseBody item={item} onOpenImage={setLightbox} showMedia={isOpen} />
                </motion.div>
              </article>
            );
          })}
        </div>
      </div>

      <CaseLightbox image={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
