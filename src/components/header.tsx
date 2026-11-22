"use client";

import { services } from "@/content/services";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/cases", label: "Кейсы" },
  { href: "/blog", label: "Блог" },
  { href: "/approach", label: "Подход" },
  { href: "/brief", label: "Бриф" },
];

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesCurrent = pathname.startsWith("/services");

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

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

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        open && "h-screen bg-paper",
        scrolled || open || servicesOpen
          ? "bg-paper/95 shadow-[0_1px_0_var(--line)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-4 sm:h-[4.5rem] sm:px-8">
        <Link href="/" className="font-display text-lg tracking-tight text-ink">
          {site.name}
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1 text-[13px] uppercase tracking-[0.14em] transition-colors",
                servicesCurrent ? "text-ink" : "text-muted hover:text-ink",
              )}
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              onClick={() => setServicesOpen((value) => !value)}
            >
              Услуги
              <ChevronDown size={14} className={cn("transition", servicesOpen && "rotate-180")} />
            </button>
            {servicesOpen ? (
              <div id="services-menu" className="absolute left-1/2 top-full z-50 w-[380px] -translate-x-1/2 pt-3">
                <div className="rounded-2xl border border-line bg-white p-2 shadow-[0_18px_40px_rgba(23,23,23,0.08)]">
                  {services.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/services/${item.slug}`}
                      className="block rounded-xl px-4 py-3 transition hover:bg-[#e7f3eb]"
                    >
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="font-medium text-ink">{item.menuTitle}</span>
                        <span className="shrink-0 text-sm text-muted">от {item.price}</span>
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-muted">{item.menuLead}</span>
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="mt-1 block rounded-xl px-4 py-3 text-sm font-medium text-ink transition hover:bg-[#e7f3eb]"
                  >
                    Все форматы работы
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[13px] uppercase tracking-[0.14em] transition-colors",
                isCurrent(pathname, item.href) ? "text-ink" : "text-muted hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="tg-btn inline-flex h-10 items-center rounded-full px-5 text-[13px] font-medium"
          >
            Написать в Telegram
          </a>
        </nav>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open ? (
        <div className="absolute inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-line bg-paper px-4 py-8 sm:top-[4.5rem] lg:hidden">
          <nav className="mx-auto flex max-w-[1200px] flex-col gap-6">
            <div>
              <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Услуги</p>
              <div className="mt-3 flex flex-col gap-3">
                {services.map((item) => (
                  <Link key={item.slug} href={`/services/${item.slug}`} className="font-display text-3xl text-ink">
                    {item.menuTitle}
                  </Link>
                ))}
                <Link href="/services" className="text-base text-muted">
                  Все форматы
                </Link>
              </div>
            </div>
            {links.map((item) => (
              <Link key={item.href} href={item.href} className="font-display text-3xl text-ink">
                {item.label}
              </Link>
            ))}
            <a
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="tg-btn mt-2 inline-flex h-14 items-center justify-center rounded-full text-base font-medium"
            >
              Написать в Telegram
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
