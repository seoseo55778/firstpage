import { PageHero } from "@/components/page-hero";
import { TalkCta } from "@/components/talk-cta";
import { process as workStages, site } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";

export const metadata = pageMeta({
  title: "Подход",
  description:
    "Как устроена личная SEO-практика Гордея Гежи: один специалист, агентский порядок работ и честная граница того, что не входит в ведение.",
  path: "/approach",
});

const compare = [
  {
    title: "Со мной",
    points: [
      "Задачу ведёт тот, кто смотрит сайт",
      "Приоритеты на месяц, а не пачка задач «на всякий случай»",
      "Отчёт: что внедрили, что изменилось, что дальше",
    ],
  },
  {
    title: "Классическое агентство",
    points: [
      "Между вами и специалистом часто стоит аккаунт",
      "В абонентку заложен штат, даже если проект его не занимает",
      "Процессы сильнее, но решение проходит через несколько рук",
    ],
  },
  {
    title: "Разовый фриланс без рамки",
    points: [
      "Можно закрыть одну правку и пропасть",
      "Нет точки отсчёта и очереди работ",
      "Сложно понять, что из списка вообще влияет на заявки",
    ],
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Главная" }, { label: "Подход" }]}
        kicker={site.role}
        title="Один специалист и порядок работ, как в сильной команде"
        lead="Я не собираю виртуальный штат. Беру на себя SEO целиком: стратегию, семантику, технику, страницы и контроль внедрения. Дизайн, вёрстку и пакеты ссылок не выдаю за свою абонентку."
      />
      <section className="px-4 py-8 sm:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-4 lg:grid-cols-3">
          {compare.map((item, index) => (
            <article
              key={item.title}
              className={index === 0 ? "process-card process-card--fill rounded-[28px] border p-7" : "rounded-[28px] border border-line bg-white p-7"}
            >
              <h2 className="font-display text-2xl text-ink">{item.title}</h2>
              <ul className="mt-5 space-y-3">
                {item.points.map((point) => (
                  <li key={point} className="text-[15px] leading-relaxed text-[#3a3a36]">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-[#e7f3eb] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-display text-4xl tracking-tight text-ink">Как проходит проект</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {workStages.map((stage, index) => (
              <article key={stage.title} className="rounded-[28px] border border-line bg-white p-7">
                <p className="font-display text-sm text-muted">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-2xl text-ink">{stage.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{stage.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 py-8 sm:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-4 lg:grid-cols-2">
          <article className="rounded-[28px] bg-[#e7f3eb] p-7 sm:p-10">
            <h2 className="font-display text-3xl text-ink">Что остаётся на мне</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#3a3a36]">
              Диагностика, семантика, структура, ТЗ, проверка внедрения, приоритеты и отчёт. На части прошлых проектов я работал внутри агентства: в кейсах описана эта зона, а не результат «отдела из десяти человек».
            </p>
          </article>
          <article className="rounded-[28px] border border-line bg-white p-7 sm:p-10">
            <h2 className="font-display text-3xl text-ink">Что считается отдельно</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#3a3a36]">
              Ссылки, производство текстов и вёрстка. Если у вас уже есть разработчик, я ставлю ему короткую очередь. Если нет, скажу об этом до старта, а не в середине месяца.
            </p>
            <Link href="/services" className="mt-6 inline-flex text-sm font-medium text-ink underline decoration-[#c5d9cc] underline-offset-4">
              Смотреть форматы и цены
            </Link>
          </article>
        </div>
      </section>
      <TalkCta />
    </>
  );
}
