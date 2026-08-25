"use client";

import { competencies } from "@/content/site";
import { Reveal } from "@/components/reveal";

export function Skills() {
  return (
    <section id="skills" className="px-4 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-ink sm:text-5xl">
            Компетенции
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {competencies.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.05}>
              <article
                tabIndex={0}
                className="skill-card group relative h-full cursor-default rounded-[24px] border border-line bg-surface p-6 focus-visible:outline-none sm:p-8"
              >
                <span
                  aria-hidden
                  className="absolute right-6 top-6 text-2xl leading-none text-ink opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:opacity-100"
                >
                  ↗
                </span>
                <h3 className="skill-card__title font-display text-2xl leading-tight text-ink">
                  {c.title}
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="skill-card__item text-sm leading-relaxed text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
