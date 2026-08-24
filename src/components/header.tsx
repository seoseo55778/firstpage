"use client";

import { site } from "@/content/site";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#cases", label: "Кейсы" },
  { href: "#skills", label: "Навыки" },
  { href: "#process", label: "Как работаю" },
  { href: "#contact", label: "Контакт" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open ? "bg-ink/80 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:h-[4.5rem] sm:px-8">
        <a href="#top" className="group flex items-baseline gap-3">
          <span className="font-display text-lg tracking-tight text-cream sm:text-xl">
            ГГ
          </span>
          <span className="hidden text-xs uppercase tracking-[0.22em] text-cream/45 sm:inline">
            {site.name}
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] uppercase tracking-[0.16em] text-cream/55 transition-colors hover:text-cream"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-full bg-lime px-5 text-[13px] font-medium text-ink transition hover:bg-lime-hot"
          >
            Написать в Telegram
          </a>
        </nav>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream md:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-cream/10 bg-ink px-4 py-8 md:hidden">
          <nav className="flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-cream"
              >
                {l.label}
              </a>
            ))}
            <a
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-lime text-sm font-medium text-ink"
            >
              Написать в Telegram
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
