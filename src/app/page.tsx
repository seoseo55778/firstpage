import { Cases } from "@/components/cases";
import { Header } from "@/components/header";
import { ProjectSpheres } from "@/components/project-spheres";
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
                  src="/gordei.png"
                  alt="Гордей Гежа"
                  width={811}
                  height={745}
                  priority
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
            {process.map((p, i) => {
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
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-ink hover:bg-ink hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M21.9 4.3c.3-1.1-.8-2-1.8-1.6L2.7 9.5c-1.1.4-1.1 2 .1 2.3l4.6 1.4 1.8 5.7c.3 1 1.6 1.2 2.2.4l2.6-3.3 4.8 3.5c.8.6 2 .2 2.3-.8l3.8-14.4ZM9.3 13.4l8.8-5.5c.3-.2.6.2.4.5l-7.1 6.8-.3 3.4-1.8-5.2Z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
