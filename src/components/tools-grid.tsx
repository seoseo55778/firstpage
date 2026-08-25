import { tools } from "@/content/site";
import type { CSSProperties } from "react";

const tagBackgrounds = [
  "#EAF7F0",
  "#FFF1EA",
  "#F1EDFF",
  "#EAF1FF",
  "#EEF6FF",
  "#EAF7F0",
  "#E8E9ED",
  "#F0EFFF",
  "#ECEFF3",
  "#EEF2FF",
  "#EAF3FA",
  "#FFF0E8",
  "#FFF4E5",
  "#FFF0E8",
  "#EAF7EF",
  "#FFF0E8",
  "#ECF5FF",
  "#E7F5F1",
  "#FFF2E8",
  "#FFF0EA",
  "#FFF8D8",
];

export function ToolsGrid() {
  return (
    <section aria-label="Софт, который я использую" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Софт, который я использую
        </h2>
        <div className="mt-12 flex w-full flex-wrap items-center justify-start gap-x-5 gap-y-4">
          {tools.map((tool, index) => (
            <span
              key={tool.name}
              className="tool-tag inline-flex items-center rounded-full px-8 py-4 text-lg font-semibold text-[#111827] transition-all duration-300 ease-out sm:text-xl"
              style={
                {
                  backgroundColor: tagBackgrounds[index % tagBackgrounds.length],
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
