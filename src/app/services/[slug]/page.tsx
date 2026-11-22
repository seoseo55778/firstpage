import { PageHero } from "@/components/page-hero";
import { TalkCta } from "@/components/talk-cta";
import { getService, services } from "@/content/services";
import { cases, site } from "@/content/site";
import { posts } from "@/content/posts";
import { pageMeta } from "@/lib/meta";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMeta({
    title: service.menuTitle,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedCase = cases.find((item) => item.slug === service.caseSlug);
  const relatedPosts = posts.filter((item) => item.service === service.slug);
  const others = services.filter((item) => item.slug !== service.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${siteUrl}/services/${service.slug}`,
    provider: {
      "@type": "Person",
      name: site.name,
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      description: `от ${service.price}, ${service.term}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumbs={[
          { href: "/", label: "Главная" },
          { href: "/services", label: "Услуги" },
          { label: service.menuTitle },
        ]}
        kicker={`${service.term} · от ${service.price}`}
        title={service.title}
        lead={service.lead}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="tg-btn group inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-medium"
          >
            Обсудить в Telegram
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <Link
            href="/brief"
            className="inline-flex h-14 items-center justify-center rounded-full border border-line px-8 text-base text-ink transition hover:border-ink"
          >
            Заполнить бриф
          </Link>
        </div>
        <p className="mt-4 max-w-xl text-sm text-muted">{service.proof}</p>
      </PageHero>

      <section className="px-4 py-8 sm:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-4 lg:grid-cols-2">
          <article className="rounded-[28px] border border-line bg-white p-7 sm:p-10">
            <h2 className="font-display text-3xl tracking-tight text-ink">Кому подходит</h2>
            <ul className="mt-6 space-y-3">
              {service.forWhom.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-[#3a3a36]">
                  <span aria-hidden className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="process-card process-card--fill rounded-[28px] border p-7 sm:p-10">
            <h2 className="font-display text-3xl tracking-tight text-ink">Когда лучше не брать</h2>
            <ul className="mt-6 space-y-3">
              {service.notFor.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-[#3a3a36]">
                  <span aria-hidden className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-[#f4f4f4] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-display text-4xl tracking-tight text-ink">Что входит</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {service.includes.map((item, index) => (
              <article key={item.title} className="rounded-[28px] border border-line bg-white p-7">
                <p className="font-display text-sm text-muted">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-2xl text-ink">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-display text-4xl tracking-tight text-ink">Как идёт работа</h2>
            <ol className="mt-8 space-y-6">
              {service.steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="font-display text-2xl text-ink">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-xl text-ink">{step.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="h-fit rounded-[28px] bg-[#f0ff40] p-7 sm:p-8">
            <h2 className="font-display text-2xl text-ink">Не входит в сумму</h2>
            <ul className="mt-5 space-y-3">
              {service.excludes.map((item) => (
                <li key={item} className="text-[15px] leading-relaxed text-[#3a3a36]">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">Стартовая цена от {service.price}. Точная зависит от сайта.</p>
          </aside>
        </div>
      </section>

      {relatedCase ? (
        <section className="proof-band px-4 py-14 sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <p className="text-[13px] uppercase tracking-[0.14em] text-[#f0ff40]">Близкий по задаче кейс</p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl tracking-tight text-white sm:text-4xl">
              {relatedCase.title}
            </h2>
            <p className="proof-band__label mt-4 max-w-2xl text-[15px] leading-relaxed">{relatedCase.summary}</p>
            <div className="mt-6 flex flex-wrap gap-6">
              {relatedCase.results.map((result) => (
                <p key={result.label}>
                  <span className="proof-band__value block font-display text-3xl">{result.value}</span>
                  <span className="proof-band__label text-sm">{result.label}</span>
                </p>
              ))}
            </div>
            <Link href={`/cases/${relatedCase.slug}`} className="mt-8 inline-flex text-sm font-medium text-white underline decoration-[#f0ff40] underline-offset-4">
              Разобрать кейс
            </Link>
          </div>
        </section>
      ) : null}

      <section className="px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-display text-4xl tracking-tight text-ink">Вопросы</h2>
          <div className="mt-8 divide-y-2 divide-[#d9d9d9] border-y-2 border-[#d9d9d9]">
            {service.faqs.map((item) => (
              <article key={item.q} className="py-6">
                <h3 className="font-display text-xl text-ink">{item.q}</h3>
                <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="bg-[#f4f4f4] px-4 py-16 sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="font-display text-4xl tracking-tight text-ink">Материалы по теме</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {relatedPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-[28px] border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-[#eadf3a]">
                  <h3 className="font-display text-2xl text-ink">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{post.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 py-8 sm:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-wrap gap-3">
          {others.map((item) => (
            <Link key={item.slug} href={`/services/${item.slug}`} className="rounded-full border border-line px-5 py-3 text-sm text-ink transition hover:border-ink">
              {item.menuTitle}
            </Link>
          ))}
        </div>
      </section>
      <TalkCta title={`Обсудить «${service.menuTitle}»`} />
    </>
  );
}
