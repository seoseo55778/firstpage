import { tools } from "@/content/site";

export function ToolsGrid() {
  return (
    <section aria-label="Софт в работе" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Софт в работе
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14 sm:gap-y-10">
          {tools.map((t) => (
            <span
              key={t.name}
              className="font-display text-2xl tracking-tight sm:text-3xl"
              style={{ color: t.color }}
            >
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
