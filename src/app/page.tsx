import { Cases } from "@/components/cases";
import { Faq } from "@/components/faq";
import { HeroTitle } from "@/components/hero-title";
import { Prices } from "@/components/prices";
import { ProjectSpheres } from "@/components/project-spheres";
import { Reveal } from "@/components/reveal";
import { Skills } from "@/components/skills";
import { ToolsGrid } from "@/components/tools-grid";
import { postsByDate } from "@/content/posts";
import { process as workStages, site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const proof = [
  { value: "×3,8", label: "трафик дилера оборудования" },
  { value: "+170%", label: "заявки на том же проекте" },
  { value: "×8", label: "трафик магазина оборудования" },
  { value: "×5", label: "трафик юрблога за 4 месяца" },
];

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
    <div id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative px-4 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal>
            <HeroTitle />
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
              <Link
                href="/services"
                className="inline-flex h-14 min-w-[210px] items-center justify-center rounded-full border border-line px-10 text-base text-ink transition hover:border-ink"
              >
                Смотреть услуги
              </Link>
            </div>
            <Link href="/cases" className="mt-4 inline-flex text-sm text-ink underline decoration-[#d9d9d9] underline-offset-4">
              Или сразу к кейсам
            </Link>
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
              <div className="absolute -bottom-5 left-1/2 z-[1] w-[82%] -translate-x-1/2 rounded-2xl border border-line bg-white/92 px-5 py-4 shadow-[0_18px_42px_rgba(34,34,34,0.10)] backdrop-blur">
                <p className="text-sm font-semibold text-ink">Личная практика</p>
                <p className="mt-1 text-xs text-muted">
                  Порядок работ как в агентстве, разговор напрямую со мной
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="proof-band px-4 py-10 sm:px-8 sm:py-12">
        <div className="mx-auto grid max-w-[1200px] gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {proof.map((item) => (
            <div key={item.label}>
              <p className="proof-band__value font-display text-4xl tracking-tight sm:text-5xl">{item.value}</p>
              <p className="proof-band__label mt-2 text-sm leading-snug">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <ProjectSpheres />
      <Skills />
      <Cases />
      <ToolsGrid />

      <section id="process" className="bg-[#f4f4f4] px-4 py-24 sm:px-8 sm:py-28">
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
                      (i === 0 || i === 3) && "process-card--fill",
                    )}
                  >
                    <span
                      className={cn(
                        "process-card__num absolute right-6 top-5 font-display text-6xl font-semibold leading-none",
                        i === 0 || i === 3 ? "text-ink" : "text-accent-soft",
                      )}
                    >
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

      <Prices />
      <Faq />

      <section className="bg-[#f4f4f4] px-4 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-ink sm:text-5xl">
              Из блога
            </h2>
            <Link href="/blog" className="text-sm font-medium text-ink underline decoration-[#d9d9d9] underline-offset-4">
              Все материалы
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {postsByDate()
              .slice(0, 3)
              .map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex h-full flex-col rounded-[28px] border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-[#eadf3a]"
                >
                  <p className="text-sm text-muted">{formatDate(post.date)}</p>
                  <h3 className="mt-4 font-display text-2xl leading-tight text-ink">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{post.description}</p>
                </Link>
              ))}
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
              Telegram — самый быстрый способ. Если удобнее структурировать вводные, есть короткий бриф.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="tg-btn group inline-flex min-h-16 items-center gap-3 rounded-full px-10 text-lg font-medium sm:min-h-20 sm:px-14 sm:text-xl"
            >
              Написать в Telegram
              <ArrowUpRight
                size={22}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
              <Link
                href="/brief"
                className="inline-flex min-h-16 items-center justify-center rounded-full border border-white/30 px-10 text-lg text-white transition hover:bg-white hover:text-ink sm:min-h-20"
              >
                Заполнить бриф
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
