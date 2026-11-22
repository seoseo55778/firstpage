import { services } from "@/content/services";
import { site } from "@/content/site";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer px-4 py-14 sm:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl">{site.name}</p>
          <p className="site-footer__muted mt-3 max-w-xs text-sm leading-relaxed">
            SEO для малого бизнеса. Один специалист, процесс с понятными приоритетами и отчётом.
          </p>
        </div>
        <div>
          <p className="site-footer__muted text-[13px] uppercase tracking-[0.14em]">Услуги</p>
          <ul className="mt-3 space-y-2 text-sm">
            {services.map((item) => (
              <li key={item.slug}>
                <Link href={`/services/${item.slug}`} className="underline decoration-transparent underline-offset-4 transition hover:decoration-[#c5eb6a]">
                  {item.menuTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="site-footer__muted text-[13px] uppercase tracking-[0.14em]">Сайт</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/cases" className="underline decoration-transparent underline-offset-4 transition hover:decoration-[#c5eb6a]">
                Кейсы
              </Link>
            </li>
            <li>
              <Link href="/blog" className="underline decoration-transparent underline-offset-4 transition hover:decoration-[#c5eb6a]">
                Блог
              </Link>
            </li>
            <li>
              <Link href="/approach" className="underline decoration-transparent underline-offset-4 transition hover:decoration-[#c5eb6a]">
                Подход
              </Link>
            </li>
            <li>
              <Link href="/brief" className="underline decoration-transparent underline-offset-4 transition hover:decoration-[#c5eb6a]">
                Бриф
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="site-footer__muted text-[13px] uppercase tracking-[0.14em]">Связь</p>
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-sm underline decoration-[#c5eb6a] underline-offset-4"
          >
            {site.telegramHandle}
          </a>
          <p className="site-footer__muted mt-6 text-sm">© {new Date().getFullYear()} {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
