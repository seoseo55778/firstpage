import { PageHero } from "@/components/page-hero";
import { PostBody } from "@/components/post-body";
import { TalkCta } from "@/components/talk-cta";
import { getPost, posts, postsByDate } from "@/content/posts";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { pageMeta } from "@/lib/meta";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const service = getService(post.service);
  const others = postsByDate().filter((item) => item.slug !== post.slug).slice(0, 2);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: site.name, url: siteUrl },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumbs={[
          { href: "/", label: "Главная" },
          { href: "/blog", label: "Блог" },
          { label: post.title },
        ]}
        kicker={`${formatDate(post.date)} · ${post.reading}`}
        title={post.title}
        lead={post.lead}
      >
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-[#c5d9cc] px-3 py-1 text-sm text-ink">
              {tag}
            </span>
          ))}
        </div>
      </PageHero>
      <article className="px-4 pb-8 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <PostBody blocks={post.blocks} />
          {service ? (
            <p className="mt-10 max-w-3xl text-[17px] leading-relaxed text-ink">
              Формат, о котором здесь речь:{" "}
              <Link href={`/services/${service.slug}`} className="underline decoration-[#c5d9cc] underline-offset-4">
                {service.menuTitle}
              </Link>
              .
            </p>
          ) : null}
        </div>
      </article>
      <section className="bg-[#e7f3eb] px-4 py-14 sm:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-4 md:grid-cols-2">
          {others.map((item) => (
            <Link key={item.slug} href={`/blog/${item.slug}`} className="rounded-[28px] border border-line bg-white p-6 transition hover:border-[#8fb56a]">
              <p className="text-sm text-muted">{formatDate(item.date)}</p>
              <h2 className="mt-3 font-display text-2xl text-ink">{item.title}</h2>
            </Link>
          ))}
        </div>
      </section>
      <TalkCta />
    </>
  );
}
