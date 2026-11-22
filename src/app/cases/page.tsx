import { PageHero } from "@/components/page-hero";
import { TalkCta } from "@/components/talk-cta";
import { cases } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";

export const metadata = pageMeta({
  title: "Кейсы",
  description:
    "Кейсы SEO: дилер оборудования, натяжные потолки, литейный завод, окрасочный магазин, юридический блог и компьютерная техника.",
  path: "/cases",
});

export default function CasesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Главная" }, { label: "Кейсы" }]}
        kicker="Практика"
        title="Проекты, где я вёл SEO"
        lead="В карточке — моя зона: аудит, семантика, структура, ТЗ и контроль внедрения. Если проект шёл через агентство, здесь не расписан весь штат, только работа, которую делал я."
      />
      <section className="bg-[#e7f3eb] px-4 pb-20 sm:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-4 md:grid-cols-2">
          {cases.map((item) => (
            <Link
              key={item.slug}
              href={`/cases/${item.slug}`}
              className="flex h-full flex-col rounded-[28px] border border-line bg-white p-7 transition hover:-translate-y-1 hover:border-[#8fb56a] sm:p-8"
            >
              <p className="text-sm text-muted">
                {item.number} · {item.niche}
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-ink">{item.title}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{item.summary}</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                {item.results.map((result) => (
                  <p key={result.label}>
                    <span className="block font-display text-2xl text-ink">{result.value}</span>
                    <span className="text-sm text-muted">{result.label}</span>
                  </p>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
      <TalkCta text="Если задача похожа на один из проектов, пришлите сайт. Скажу, какой формат здесь уместен." />
    </>
  );
}
