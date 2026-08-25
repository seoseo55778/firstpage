import { toolGroups } from "@/content/site";

export function ToolsGrid() {
  return (
    <section aria-label="Софт, который я использую" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Софт, который я использую
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {toolGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-[28px] border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(34,34,34,0.08)] sm:p-8"
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {group.title}
              </h3>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {group.tools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex min-h-10 items-center rounded-full border border-transparent bg-[#f5f5f7] px-4 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-line hover:bg-white hover:shadow-[0_8px_20px_rgba(34,34,34,0.08)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
