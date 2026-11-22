import type { PostBlock } from "@/content/posts";

export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="max-w-3xl">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              className="mt-10 font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="mt-5 space-y-3">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 text-[17px] leading-relaxed text-[#3a3a36]">
                  <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className="mt-5 text-[17px] leading-relaxed text-[#3a3a36]">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
