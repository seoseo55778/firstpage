"use client";

import type { Post } from "@/content/posts";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";

export function BlogIndex({ posts }: { posts: Post[] }) {
  const tags = useMemo(() => {
    const unique = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => unique.add(tag)));
    return [...unique];
  }, [posts]);
  const [tag, setTag] = useState<string | null>(null);
  const visible = tag ? posts.filter((post) => post.tags.includes(tag)) : posts;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTag(null)}
          className={cn(
            "h-10 rounded-full border px-4 text-sm transition",
            tag === null ? "border-ink bg-ink text-white" : "border-[#c5d9cc] bg-white text-ink hover:border-ink",
          )}
        >
          Все
        </button>
        {tags.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTag(item)}
            className={cn(
              "h-10 rounded-full border px-4 text-sm transition",
              tag === item ? "border-ink bg-ink text-white" : "border-[#c5d9cc] bg-white text-ink hover:border-ink",
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {visible.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex h-full flex-col rounded-[28px] border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-[#8fb56a] sm:p-8"
          >
            <p className="text-sm text-muted">
              {formatDate(post.date)} · {post.reading}
            </p>
            <h2 className="mt-4 font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl">
              {post.title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{post.description}</p>
            <p className="mt-6 text-sm font-medium text-ink">Читать</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
