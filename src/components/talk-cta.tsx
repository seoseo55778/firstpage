import { site } from "@/content/site";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function TalkCta({
  title = "Обсудить задачу",
  text = "Напишите, что за сайт и какой результат нужен. Отвечаю в Telegram сам.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="px-4 pb-20 sm:px-8">
      <div className="contact-panel mx-auto max-w-[1200px] rounded-[32px] px-6 py-14 sm:px-12 sm:py-16">
        <h2 className="font-display text-4xl tracking-tight text-white sm:text-5xl">{title}</h2>
        <p className="contact-panel__lead mt-4 max-w-lg text-lg">{text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="tg-btn group inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-medium"
          >
            Написать в Telegram
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <Link
            href="/brief"
            className="inline-flex h-14 items-center justify-center rounded-full border border-white/30 px-8 text-base text-white transition hover:bg-white hover:text-ink"
          >
            Заполнить бриф
          </Link>
        </div>
      </div>
    </section>
  );
}
