import { Cases } from "@/components/cases";
import { Header } from "@/components/header";
import { Reveal } from "@/components/reveal";
import { ToolsMarquee } from "@/components/tools-marquee";
import { competencies, process, site } from "@/content/site";
import { ArrowUpRight } from "lucide-react";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.hero.lead,
  url: "https://t.me/gordeigezha",
  sameAs: [site.telegram, site.instagram],
  knowsAbout: ["SEO", "поисковая оптимизация", "контент-стратегия", "техническое SEO"],
};

export default function Home() {
  return (
    <div id="top" className="orbit min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <section className="relative px-4 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-lime">
              {site.hero.kicker}
            </p>
            <h1 className="mt-6 whitespace-pre-line font-display text-[clamp(2.6rem,8vw,7.4rem)] leading-[0.92] tracking-tight text-cream">
              {site.hero.title}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-cream/60 sm:text-lg">
              {site.hero.lead}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={site.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-lime px-8 text-sm font-medium text-ink transition hover:bg-lime-hot"
              >
                Написать в Telegram
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href="#cases"
                className="inline-flex h-14 items-center justify-center rounded-full border border-cream/15 px-8 text-sm text-cream/80 transition hover:border-lime/40 hover:text-cream"
              >
                Смотреть кейсы
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="lg:pb-4">
            <div className="rounded-[28px] border border-cream/10 bg-cream/[0.03] p-6 sm:p-8">
              <p className="font-display text-2xl text-cream">{site.name}</p>
              <p className="mt-1 text-sm uppercase tracking-[0.18em] text-cream/40">
                {site.role}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-cream/55">
                {site.about[0]} {site.about[1]}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {site.niches.map((n) => (
                  <span
                    key={n}
                    className="rounded-full border border-cream/10 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-cream/55"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-cream/10">
        <div className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
          {site.stats.map((s, i) => (
            <div
              key={s.label}
              className="border-cream/10 px-6 py-10 sm:px-8 sm:py-12 [&:nth-child(odd)]:border-b lg:border-b-0 lg:border-r lg:last:border-r-0 sm:[&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0"
            >
              <Reveal delay={i * 0.06}>
                <div className="font-display text-5xl tracking-tight text-lime sm:text-6xl">
                  {s.value}
                </div>
                <p className="mt-3 text-sm uppercase tracking-[0.16em] text-cream">
                  {s.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-cream/40">{s.hint}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-lime">
              02 — Компетенции
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] tracking-tight text-cream sm:text-6xl">
              Закрываю цикл SEO, а не один отчёт
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/50">
              {site.about[2]}
            </p>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-cream/10 bg-cream/10 sm:grid-cols-2 xl:grid-cols-3">
            {competencies.map((c, i) => (
              <Reveal
                key={c.title}
                delay={(i % 3) * 0.05}
                className="bg-ink p-6 sm:p-8"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-lime">{c.n}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl leading-tight text-cream">
                  {c.title}
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {c.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-cream/55">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Cases />
      <ToolsMarquee />

      <section id="process" className="px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-lime">
              04 — Процесс
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight text-cream sm:text-6xl">
              Как заходим в проект
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {process.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.06}>
                <article className="h-full rounded-[28px] border border-cream/10 p-7 sm:p-10">
                  <span className="font-mono text-xs text-lime">{p.n}</span>
                  <h3 className="mt-5 font-display text-3xl text-cream">{p.title}</h3>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cream/55">
                    {p.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 pb-16 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[32px] border border-cream/10 bg-lime px-6 py-16 text-ink sm:px-12 sm:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink/55">
              05 — Контакт
            </p>
            <h2 className="mt-4 max-w-4xl font-display text-4xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Есть сайт, который должен приносить заявки из поиска?
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70">
              Коротко опишите нишу и задачу в Telegram — отвечу по срокам и тому, имеет
              ли смысл SEO именно на вашем проекте.
            </p>
            <a
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex h-14 items-center gap-2 rounded-full bg-ink px-8 text-sm font-medium text-cream transition hover:bg-ink/90"
            >
              {site.telegramHandle}
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="px-4 py-10 sm:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 text-sm text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex gap-6">
            <a
              className="hover:text-cream"
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
            <a
              className="hover:text-cream"
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
