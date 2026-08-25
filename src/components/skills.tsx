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
                className="group relative h-full cursor-default overflow-hidden rounded-[24px] border border-line bg-surface p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_22px_50px_rgba(30,28,24,0.12)] focus-visible:-translate-y-1.5 focus-visible:border-accent focus-visible:shadow-[0_22px_50px_rgba(30,28,24,0.12)] focus-visible:outline-none sm:p-8"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
                />
                <div className="relative">
                  <h3 className="font-display text-2xl leading-tight text-ink transition-colors duration-500 group-hover:text-white group-focus-visible:text-white">
                    {c.title}
                  </h3>
                  <ul className="mt-5 space-y-2.5">
                    {c.items.map((item) => (
                      <li
                        key={item}
                        className="translate-y-0 text-sm leading-relaxed text-muted transition-all duration-500 group-hover:text-white/88 group-focus-visible:text-white/88"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
