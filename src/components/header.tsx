"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#cases", label: "Кейсы" },
  { href: "#skills", label: "Компетенции" },
  { href: "#stack", label: "Стек" },
  { href: "#contact", label: "Контакты" },
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
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open ? "bg-paper/95 shadow-[0_1px_0_var(--line)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-end px-4 sm:h-[4.5rem] sm:px-8">
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://t.me/gordeigezha"
            target="_blank"
            rel="noopener noreferrer"
            className="tg-btn inline-flex h-10 items-center rounded-full px-5 text-[13px] font-medium"
          >
            Написать в Telegram
          </a>
        </nav>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-paper px-4 py-8 md:hidden">
          <nav className="flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://t.me/gordeigezha"
              target="_blank"
              rel="noopener noreferrer"
              className="tg-btn mt-4 inline-flex h-14 items-center justify-center rounded-full text-base font-medium"
            >
              Написать в Telegram
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
