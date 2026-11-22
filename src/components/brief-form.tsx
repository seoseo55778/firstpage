"use client";

import { services } from "@/content/services";
import { site } from "@/content/site";
import { useMemo, useState } from "react";

const formats = [
  { value: "audit", label: "Экспресс-аудит" },
  { value: "seo", label: "SEO-ведение" },
  { value: "geo", label: "GEO" },
  { value: "unsure", label: "Пока не знаю" },
];

export function BriefForm() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("unsure");
  const [note, setNote] = useState("");

  const message = useMemo(() => {
    const formatLabel = formats.find((item) => item.value === format)?.label ?? format;
    return [
      "Бриф с сайта",
      name.trim() ? `Имя: ${name.trim()}` : null,
      url.trim() ? `Сайт: ${url.trim()}` : null,
      `Формат: ${formatLabel}`,
      note.trim() ? `Задача: ${note.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  }, [name, url, format, note]);

  const telegramHref = `${site.telegram}?text=${encodeURIComponent(message)}`;

  return (
    <form
      className="rounded-[28px] border border-line bg-white p-6 sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        window.open(telegramHref, "_blank", "noopener,noreferrer");
      }}
    >
      <div className="grid gap-5">
        <label className="block">
          <span className="text-sm text-muted">Как к вам обращаться</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-line bg-white px-4 text-ink outline-none transition focus:border-ink"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="text-sm text-muted">Адрес сайта</span>
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://"
            className="mt-2 h-12 w-full rounded-2xl border border-line bg-white px-4 text-ink outline-none transition focus:border-ink"
            inputMode="url"
          />
        </label>
        <label className="block">
          <span className="text-sm text-muted">Формат</span>
          <select
            value={format}
            onChange={(event) => setFormat(event.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-line bg-white px-4 text-ink outline-none transition focus:border-ink"
          >
            {formats.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm text-muted">Что происходит сейчас</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={5}
            className="mt-2 w-full resize-y rounded-2xl border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-ink"
          />
        </label>
      </div>
      <button
        type="submit"
        className="tg-btn mt-6 inline-flex h-14 items-center justify-center rounded-full px-8 text-base font-medium"
      >
        Открыть в Telegram
      </button>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
        Сообщение откроется в Telegram, на сайте оно не сохраняется. Форматы:{" "}
        {services.map((item) => item.menuTitle).join(", ")}.
      </p>
    </form>
  );
}
