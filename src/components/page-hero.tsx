import { Crumbs } from "@/components/crumbs";

export function PageHero({
  crumbs,
  kicker,
  title,
  lead,
  children,
}: {
  crumbs: { href?: string; label: string }[];
  kicker?: string;
  title: string;
  lead: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="px-4 pb-8 pt-28 sm:px-8 sm:pb-12 sm:pt-36">
      <div className="mx-auto max-w-[1200px]">
        <Crumbs items={crumbs} />
        {kicker ? (
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">{kicker}</p>
        ) : null}
        <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[0.95] tracking-tight text-ink sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
