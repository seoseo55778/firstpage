"use client";

import { competencies } from "@/content/site";
import { Reveal } from "@/components/reveal";
import type { CSSProperties } from "react";

type Competency = (typeof competencies)[number] & { href?: string };

function CompetencyCard({ item }: { item: Competency }) {
  const className =
    "skill-card group relative flex h-full min-h-[292px] flex-col overflow-hidden rounded-[24px] border border-line bg-surface p-6 focus-visible:outline-none sm:min-h-[312px] sm:p-7 xl:p-[1.4rem]";
  const style = { "--card-accent": item.accent } as CSSProperties;

  const inner = (
    <>
      <span aria-hidden className="skill-card__num">
        {item.n}
      </span>
      <span aria-hidden className="skill-card__marker" />
      <p className="skill-card__kicker">Направление {item.n}</p>
      <h3 className="skill-card__title font-display">{item.title}</h3>
      <p className="skill-card__desc">{item.description}</p>
      <ul className="skill-card__list">
        {item.items.map((line) => (
          <li key={line}>
            <span aria-hidden className="skill-card__dash" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <span aria-hidden className="skill-card__arrow">
        ↗
      </span>
    </>
  );

  if (item.href) {
    return (
      <a href={item.href} className={`${className} cursor-pointer`} style={style}>
        {inner}
      </a>
    );
  }

  return (
    <article tabIndex={0} className={`${className} cursor-default`} style={style}>
      {inner}
    </article>
  );
}

export function Skills() {
  return (
    <section id="skills" className="px-4 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-ink sm:text-5xl">
            Компетенции
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {competencies.map((item, i) => (
            <Reveal key={item.n} delay={(i % 4) * 0.05} className="h-full">
              <CompetencyCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
