"use client";

import { faqs } from "@/content/site";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="px-4 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-ink sm:text-5xl">
          Вопросы
        </h2>
        <div className="faq-list mt-10 sm:mt-14">
          {faqs.map((item, i) => {
            const active = open === i;
            return (
              <article key={item.q} className={cn("faq-item", active && "active")}>
                <button
                  type="button"
                  className="faq-item__header"
                  aria-expanded={active}
                  onClick={() => setOpen(active ? null : i)}
                >
                  <span className="faq-item__dot" aria-hidden="true" />
                  <span className="faq-item__q">{item.q}</span>
                  <span className="faq-item__icon" aria-hidden="true" />
                </button>
                <div className="faq-item__body">
                  <p>{item.a}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
