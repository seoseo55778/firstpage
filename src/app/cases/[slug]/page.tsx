import { PageHero } from "@/components/page-hero";
import { TalkCta } from "@/components/talk-cta";
import { cases } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = { slug: string };

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = cases.find((entry) => entry.slug === slug);
  if (!item) return {};
  return pageMeta({
    title: item.title,
    description: item.summary,
    path: `/cases/${item.slug}`,
  });
}

export default async function CasePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = cases.find((entry) => entry.slug === slug);
  if (!item) notFound();
  const more = cases.filter((entry) => entry.slug !== item.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Главная" },
          { href: "/cases", label: "Кейсы" },
          { label: item.title },
        ]}
        kicker={[item.niche, item.period].filter(Boolean).join(" · ")}
        title={item.title}
        lead={item.problem}
      >
        <div className="flex flex-wrap gap-6">
          {item.results.map((result) => (
            <p key={result.label}>
              <span className="block font-display text-4xl text-ink">{result.value}</span>
              <span className="text-sm text-muted">{result.label}</span>
            </p>
          ))}
        </div>
      </PageHero>
      <section className="px-4 py-8 sm:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 className="font-display text-3xl text-ink">Что делал</h2>
            <ul className="mt-6 space-y-4">
              {item.work.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-[#3a3a36]">
                  <span aria-hidden className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  {line}
                </li>
              ))}
            </ul>
            {item.note ? <p className="mt-8 text-[15px] leading-relaxed text-muted">{item.note}</p> : null}
          </div>
          <aside className="h-fit rounded-[28px] bg-[#e7f3eb] p-7">
            <h2 className="font-display text-2xl text-ink">Условия</h2>
            <dl className="mt-5 space-y-4 text-sm">
              {item.engine ? (
                <div>
                  <dt className="text-muted">Поиск</dt>
                  <dd className="mt-1 text-ink">{item.engine}</dd>
                </div>
              ) : null}
              {item.cms ? (
                <div>
                  <dt className="text-muted">CMS</dt>
                  <dd className="mt-1 text-ink">{item.cms}</dd>
                </div>
              ) : null}
              {item.period ? (
                <div>
                  <dt className="text-muted">Срок</dt>
                  <dd className="mt-1 text-ink">{item.period}</dd>
                </div>
              ) : null}
              {item.region ? (
                <div>
                  <dt className="text-muted">Регион</dt>
                  <dd className="mt-1 text-ink">{item.region}</dd>
                </div>
              ) : null}
            </dl>
          </aside>
        </div>
      </section>
      <section className="bg-[#e7f3eb] px-4 py-12 sm:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-4 md:grid-cols-2">
          {item.images.map((image) => (
            <figure key={image.src} className="overflow-hidden rounded-[28px] border border-line bg-white">
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={720}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 560px"
              />
            </figure>
          ))}
        </div>
      </section>
      <section className="px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-display text-3xl text-ink">Другие проекты</h2>
          <div className="mt-6 flex flex-col gap-3">
            {more.map((entry) => (
              <Link key={entry.slug} href={`/cases/${entry.slug}`} className="text-lg text-ink underline decoration-[#c5d9cc] underline-offset-4">
                {entry.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <TalkCta />
    </>
  );
}
