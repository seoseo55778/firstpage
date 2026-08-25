import { tools } from "@/content/site";
import type { CSSProperties } from "react";

function ToolTag({ tool }: { tool: (typeof tools)[number] }) {
  return (
    <span
      tabIndex={0}
      className="tool-tag inline-flex items-center rounded-full px-6 py-3.5 text-base font-semibold text-[#111827] sm:px-8 sm:py-4 sm:text-lg"
      style={
        {
          backgroundColor: tool.bg,
          "--tool-hover-bg": tool.hover,
        } as CSSProperties & Record<"--tool-hover-bg", string>
      }
    >
      {tool.name}
    </span>
  );
}

export function ToolsGrid() {
  return (
    <section id="stack" aria-label="Мой рабочий стек" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Мой рабочий стек
        </h2>
        <div className="mt-12 flex w-full flex-wrap items-center justify-start gap-x-4 gap-y-3 sm:gap-x-5 sm:gap-y-4">
          {tools.map((tool) => (
            <ToolTag key={tool.name} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
