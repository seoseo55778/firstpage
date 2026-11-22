"use client";

import { site } from "@/content/site";
import { useState } from "react";

export function AuditContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  return (
    <form
      className="rounded-[28px] border border-line bg-white p-6 shadow-[0_18px_40px_rgba(18,56,44,0.08)] sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        if (!name.trim() || !contact.trim()) {
          setError("Напишите имя и телефон или Telegram.");
          return;
        }
        const message = [
          "Заявка: экспресс-аудит",
          `Имя: ${name.trim()}`,
          `Контакт: ${contact.trim()}`,
          url.trim() ? `Сайт: ${url.trim()}` : null,
        ]
          .filter(Boolean)
          .join("\n");
        window.open(
          `${site.telegram}?text=${encodeURIComponent(message)}`,
          "_blank",
          "noopener,noreferrer",
        );
      }}
    >
      <h2 className="font-display text-2xl tracking-tight text-ink">Оставить контакты</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        7 дней, от 15 000 ₽. Отвечу в Telegram и скажу, что прислать на старт.
      </p>
      <div className="mt-6 grid gap-4">
        <label className="block">
          <span className="text-sm text-muted">Имя</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            autoComplete="name"
            className="mt-2 h-12 w-full rounded-2xl border border-line bg-white px-4 text-ink outline-none transition focus:border-ink"
          />
        </label>
        <label className="block">
          <span className="text-sm text-muted">Телефон или Telegram</span>
          <input
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            required
            autoComplete="tel"
            className="mt-2 h-12 w-full rounded-2xl border border-line bg-white px-4 text-ink outline-none transition focus:border-ink"
          />
        </label>
        <label className="block">
          <span className="text-sm text-muted">Сайт</span>
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://"
            inputMode="url"
            className="mt-2 h-12 w-full rounded-2xl border border-line bg-white px-4 text-ink outline-none transition focus:border-ink"
          />
        </label>
      </div>
      {error ? <p className="mt-3 text-sm text-ink">{error}</p> : null}
      <button
        type="submit"
        className="tg-btn mt-6 inline-flex h-14 w-full items-center justify-center rounded-full px-8 text-base font-medium"
      >
        Оставить контакты
      </button>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Заявка откроется в Telegram. На сайте она не сохраняется.
      </p>
    </form>
  );
}
