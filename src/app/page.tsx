import { Cases } from "@/components/cases";
import { Header } from "@/components/header";
import { ProjectSpheres } from "@/components/project-spheres";
import { Reveal } from "@/components/reveal";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Skills } from "@/components/skills";
import { ToolsGrid } from "@/components/tools-grid";
import { process as workStages, site } from "@/content/site";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.hero.lead,
  url: siteUrl,
  sameAs: [site.telegram, site.instagram],
  image: `${siteUrl}/gordei.webp`,
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
                SEO, <span className="hero-stroke">которое</span>{" "}
                <span className="hero-fill">растёт</span>
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
                  src="/gordei.webp"
                  alt={`${site.name} — ${site.role}`}
                  width={811}
                  height={745}
                  priority
                  sizes="(max-width: 1024px) 340px, 340px"
                  className="h-auto w-full object-cover object-[center_18%]"
                />
              </div>
              <div className="absolute -bottom-5 left-1/2 w-[82%] -translate-x-1/2 rounded-2xl border border-line bg-white/92 px-5 py-4 shadow-[0_18px_42px_rgba(34,34,34,0.10)] backdrop-blur">
                <p className="text-sm font-semibold text-ink">SEO-специалист</p>
                <p className="mt-1 text-xs text-muted">
                  Комплексное продвижение сайтов в Яндекс и Google
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ProjectSpheres />
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
            {workStages.map((p, i) => {
              return (
                <Reveal key={p.title} delay={i * 0.06}>
                  <article
                    className={cn(
                      "process-card relative h-full overflow-hidden rounded-[28px] border border-line bg-surface p-7 sm:p-10",
                    )}
                  >
                    <span className="absolute right-6 top-5 font-display text-6xl font-semibold leading-none text-accent-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="process-card__title font-display text-ink">{p.title}</h3>
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
          <div className="contact-panel mx-auto max-w-[1200px] rounded-[32px] px-6 py-16 sm:px-12 sm:py-20">
            <h2 className="font-display text-4xl tracking-tight text-white sm:text-6xl">
              Связаться со мной
            </h2>
            <p className="contact-panel__lead mt-5 max-w-lg text-lg">
              Telegram — самый быстрый способ.
            </p>
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
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-visible rounded-full border border-line text-ink transition hover:border-ink hover:bg-ink hover:text-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="block"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </a>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
}
