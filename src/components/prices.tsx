import { Reveal } from "@/components/reveal";
import { prices, site } from "@/content/site";

export function Prices() {
  return (
    <section id="prices" className="px-4 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-ink sm:text-5xl">
            Цены
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Три формата работы. Сумма стартовая: точная зависит от сайта и конкуренции.
            Ссылки, тексты и вёрстка считаются отдельно.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {prices.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="h-full">
              <a
                href={site.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="price-card"
              >
                <span className="price-card__body">
                  <span className="price-card__term">{item.term}</span>
                  <h3 className="price-card__title font-display">{item.title}</h3>
                  <p className="price-card__sum">от {item.price}</p>
                  <ul className="price-card__list">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
