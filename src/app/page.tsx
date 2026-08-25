import { Cases } from "@/components/cases";
import { Header } from "@/components/header";
import { Reveal } from "@/components/reveal";
import { Skills } from "@/components/skills";
import { ToolsGrid } from "@/components/tools-grid";
import { process, site } from "@/content/site";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.hero.lead,
  url: "https://t.me/gordeigezha",
  sameAs: [site.telegram, site.instagram],
  image: "/gordei.png",
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

      <section className="relative px-4 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-36">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal>
            <h1 className="font-display text-[clamp(2.2rem,4.8vw,4.35rem)] leading-[0.96] tracking-tight text-ink">
              <span className="block whitespace-nowrap">
                SEO, <span className="text-accent-soft">которое растёт</span>
              </span>
              <span className="block">в заявки</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {site.hero.lead}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={site.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="tg-btn group inline-flex h-14 min-w-[230px] items-center justify-center gap-2 rounded-full px-10 text-base font-medium"
              >
                Написать в Telegram
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href="#cases"
                className="inline-flex h-14 min-w-[210px] items-center justify-center rounded-full border border-line px-10 text-base text-ink transition hover:border-accent hover:text-accent"
              >
                Смотреть кейсы
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mx-auto max-w-[340px] lg:ml-auto">
              <div className="overflow-hidden rounded-[32px] bg-surface shadow-[0_24px_70px_rgba(34,34,34,0.10)]">
                <Image
                  src="/gordei.png"
                  alt="Гордей Гежа"
                  width={811}
                  height={745}
                  priority
                  className="h-auto w-full object-cover object-[center_18%]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Skills />
      <Cases />
      <ToolsGrid />

      <section id="process" className="px-4 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-ink sm:text-5xl">
              Этапы работы
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {process.map((p, i) => {
              const filled = i === 1 || i === 2;
              return (
                <Reveal key={p.title} delay={i * 0.06}>
                  <article
                    className={cn(
                      "process-card h-full rounded-[28px] border border-line p-7 sm:p-10",
                      filled ? "bg-accent-soft" : "bg-surface",
                    )}
                  >
                    <h3 className="font-display text-2xl text-ink sm:text-3xl">{p.title}</h3>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">{p.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 pb-16 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-[1200px] rounded-[32px] border border-line bg-surface px-6 py-16 sm:px-12 sm:py-20">
            <h2 className="font-display text-4xl tracking-tight text-ink sm:text-6xl">
              Связаться со мной
            </h2>
            <p className="mt-5 max-w-lg text-lg text-muted">Telegram — самый быстрый способ.</p>
            <a
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="tg-btn group mt-10 inline-flex min-h-16 items-center gap-3 rounded-full px-10 text-lg font-medium sm:min-h-20 sm:px-14 sm:text-xl"
            >
              Написать в Telegram
              <ArrowUpRight
                size={22}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="px-4 py-10 sm:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex gap-6">
            <a className="hover:text-ink" href={site.telegram} target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
            <a className="hover:text-ink" href={site.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
