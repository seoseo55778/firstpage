import { tools } from "@/content/site";

const desktopRows = [
  ["Manus", "ChatGPT", "Gemini", "Semrush", "Google Search Console", "Google Cloud Platform"],
  ["Cursor Pro", "TopSite", "Screaming Frog", "Ahrefs", "Serpstat", "Keys.so"],
  ["PageSpeed Insights", "n8n", "Claude Code", "Codex", "Grok", "Python (SEO-скрипты)"],
  ["Yandex Wordstat API", "GA4", "Яндекс.Метрика", "Яндекс.Вебмастер", "Топвизор", "WordKeeper"],
  ["Key Assort", "Figma", "Miro", "Google Indexing API", "SAPE", "Miralinks"],
];

const toolsByName = new Map(tools.map((tool) => [tool.name, tool]));

function ToolTag({ name }: { name: string }) {
  const tool = toolsByName.get(name);
  if (!tool) return null;

  return (
    <span
      tabIndex={0}
      className="tool-tag inline-flex items-center rounded-full px-6 py-3.5 text-base font-semibold text-white sm:px-8 sm:py-4 sm:text-lg"
      style={{ backgroundColor: tool.bg }}
    >
      {tool.name}
    </span>
  );
}

export function ToolsGrid() {
  return (
    <section aria-label="Мой рабочий стек" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Мой рабочий стек
        </h2>
        <div className="mt-12 hidden w-full flex-col gap-4 lg:flex">
          {desktopRows.map((row) => (
            <div key={row.join("-")} className="flex w-full items-center justify-between gap-4">
              {row.map((name) => (
                <ToolTag key={name} name={name} />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-12 flex w-full flex-wrap items-center justify-start gap-x-4 gap-y-3 lg:hidden">
          {tools.map((tool) => (
            <ToolTag key={tool.name} name={tool.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
