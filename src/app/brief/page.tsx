import { BriefForm } from "@/components/brief-form";
import { PageHero } from "@/components/page-hero";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Бриф",
  description:
    "Короткий бриф на SEO, аудит или GEO. Сообщение открывается в Telegram, на сайте не хранится.",
  path: "/brief",
});

export default function BriefPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Главная" }, { label: "Бриф" }]}
        kicker="Старт"
        title="Расскажите про сайт, я отвечу в Telegram"
        lead="Четыре поля, чтобы не начинать переписку с пустого «здравствуйте». Если удобнее без формы, сразу пишите в Telegram."
      >
        <a
          href={site.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-ink underline decoration-[#d9d9d9] underline-offset-4"
        >
          {site.telegramHandle}
        </a>
      </PageHero>
      <section className="bg-[#f4f4f4] px-4 pb-20 sm:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[minmax(0,640px)_1fr]">
          <BriefForm />
          <aside className="h-fit rounded-[28px] bg-white p-7">
            <h2 className="font-display text-2xl text-ink">Что прислать, если форма не нужна</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#3a3a36]">
              <li>Адрес сайта и город, если спрос локальный</li>
              <li>Что считаете заявкой: звонок, форма, заказ</li>
              <li>Есть ли разработчик, который может внести правки</li>
              <li>Нужен разовый аудит или ведение</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
