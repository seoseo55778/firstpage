import { BlogIndex } from "@/components/blog-index";
import { PageHero } from "@/components/page-hero";
import { postsByDate } from "@/content/posts";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Блог",
  description:
    "Заметки для владельцев малого бизнеса: сроки SEO, GEO, состав аудита и почему трафик не становится заявками.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Главная" }, { label: "Блог" }]}
        kicker="Материалы"
        title="Коротко о том, как устроен поиск для малого бизнеса"
        lead="Темы появляются из практики, а не из пустых тегов. Фильтр показывает только те направления, по которым уже есть текст."
      />
      <section className="px-4 pb-20 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <BlogIndex posts={postsByDate()} />
        </div>
      </section>
    </>
  );
}
