import { tools } from "@/content/site";

const featuredTools = new Set(["n8n", "Ahrefs", "Cursor Pro", "Python (SEO-скрипты)"]);

export function ToolsGrid() {
  return (
    <section aria-label="Софт, который я использую" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Софт, который я использую
        </h2>
        <div className="mx-auto mt-12 flex max-w-[1000px] flex-wrap items-center justify-center gap-x-5 gap-y-4">
          {tools.map((tool) => (
            <span
              key={tool.name}
              className={`tool-tag inline-flex items-center rounded-full px-8 py-4 text-lg font-semibold text-[#111827] transition-all duration-300 ease-out sm:text-xl ${
                featuredTools.has(tool.name) ? "tool-tag--featured" : ""
              }`}
            >
              {tool.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
