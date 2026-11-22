import { services } from "@/content/services";
import { site } from "@/content/site";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line px-4 py-12 sm:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl text-ink">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            SEO для малого бизнеса. Один специалист, процесс с понятными приоритетами и отчётом.
          </p>
        </div>
        <div>
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Услуги</p>
          <ul className="mt-3 space-y-2 text-sm">
            {services.map((item) => (
              <li key={item.slug}>
                <Link href={`/services/${item.slug}`} className="text-ink transition hover:text-muted">
                  {item.menuTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Сайт</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/cases" className="text-ink transition hover:text-muted">
                Кейсы
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-ink transition hover:text-muted">
                Блог
              </Link>
            </li>
            <li>
              <Link href="/approach" className="text-ink transition hover:text-muted">
                Подход
              </Link>
            </li>
            <li>
              <Link href="/brief" className="text-ink transition hover:text-muted">
                Бриф
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Связь</p>
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-sm text-ink underline decoration-[#d9d9d9] underline-offset-4 transition hover:decoration-ink"
          >
            {site.telegramHandle}
          </a>
          <p className="mt-6 text-sm text-muted">© {new Date().getFullYear()} {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
