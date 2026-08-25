import { tools } from "@/content/site";
import type { CSSProperties } from "react";

export function ToolsGrid() {
  return (
    <section aria-label="Софт, который я использую" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Софт, который я использую
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {tools.map((tool) => (
            <span
              key={tool.name}
              className="tool-tag inline-flex min-h-11 items-center rounded-full bg-[#F3F4F6] px-5 text-sm font-medium text-[#111827] transition-all duration-300 ease-out"
              style={
                {
                  "--hover-bg": tool.color,
                  "--hover-text": "textColor" in tool ? tool.textColor : "#ffffff",
                } as CSSProperties & Record<"--hover-bg" | "--hover-text", string>
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
