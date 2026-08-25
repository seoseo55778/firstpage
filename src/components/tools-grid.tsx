import { tools } from "@/content/site";

export function ToolsGrid() {
  return (
    <section aria-label="Софт, который я использую" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Софт, который я использую
        </h2>
        <div className="mt-10 grid w-full grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-14 lg:gap-y-8">
          {tools.map((t) => (
            <span
              key={t.name}
              className="block max-w-[210px] font-display text-[clamp(1.05rem,1.45vw,1.65rem)] font-medium leading-tight tracking-tight transition-transform duration-300 hover:-translate-y-1"
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
