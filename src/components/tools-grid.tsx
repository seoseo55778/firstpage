import { tools } from "@/content/site";
import type { CSSProperties } from "react";

export function ToolsGrid() {
  return (
    <section aria-label="Софт, который я использую" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Мой рабочий стек
        </h2>
        <div className="mt-12 flex w-full flex-wrap items-center justify-start gap-x-5 gap-y-4">
          {tools.map((tool, index) => (
            <span
              key={tool.name}
              tabIndex={0}
              className="tool-tag inline-flex items-center rounded-full px-8 py-4 text-lg font-semibold text-[#111827] transition-all duration-300 ease-out sm:text-xl"
              style={
                {
                  backgroundColor: tool.bg,
                  color: "featured" in tool && tool.featured ? tool.text : "#111827",
                  boxShadow:
                    "featured" in tool && tool.featured
                      ? "0 10px 24px rgba(17, 24, 39, 0.12)"
                      : undefined,
                  "--hover-bg": tool.hover,
                  "--hover-text": "text" in tool ? tool.text : "#ffffff",
                  "--hover-shadow": `${tool.hover}40`,
                } as CSSProperties &
                  Record<"--hover-bg" | "--hover-text" | "--hover-shadow", string>
              }
            >
              {tool.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
