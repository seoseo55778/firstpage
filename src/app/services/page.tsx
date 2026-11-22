import { PageHero } from "@/components/page-hero";
import { TalkCta } from "@/components/talk-cta";
import { services } from "@/content/services";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";

export const metadata = pageMeta({
  title: "Услуги",
  description:
    "Три формата работы: экспресс-аудит за 7 дней, SEO-ведение и GEO. Стартовые суммы и состав работ без скрытого штата.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Главная" }, { label: "Услуги" }]}
        kicker="Форматы"
        title="Три способа начать, без пакета «всё включено»"
        lead="Аудит — если нужно понять объём. SEO — если нужны заявки из поиска месяц за месяцем. GEO — если важно, чтобы факты о вас цитировали нейросети. Ссылки, тексты и вёрстка считаются отдельно."
      />
      <section className="bg-[#f4f4f4] px-4 pb-20 sm:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-4 lg:grid-cols-3">
          {services.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className={item.slug === "seo" ? "price-card price-card--fill min-h-[320px]" : "price-card min-h-[320px]"}
            >
              <span className="price-card__body">
                <span className="price-card__term">{item.term}</span>
                <h2 className="price-card__title font-display">{item.menuTitle}</h2>
                <p className="price-card__sum">от {item.price}</p>
                <p className="price-card__note">{item.menuLead}</p>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <TalkCta />
    </>
  );
}
