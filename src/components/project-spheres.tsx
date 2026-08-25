import { projectSphereRows, projectSpheres } from "@/content/site";
import type { CSSProperties } from "react";

function SphereTag({
  sphere,
  fillRow = false,
}: {
  sphere: (typeof projectSpheres)[number];
  fillRow?: boolean;
}) {
  return (
    <span
      tabIndex={0}
      className="sphere-tag"
      style={
        {
          backgroundColor: sphere.bg,
          "--sphere-shadow": sphere.shadow,
          ...(fillRow
            ? {
                flexGrow: sphere.grow,
                flexShrink: 1,
                flexBasis: 0,
              }
            : null),
        } as CSSProperties & Record<"--sphere-shadow", string>
      }
    >
      {sphere.name}
    </span>
  );
}

export function ProjectSpheres() {
  return (
    <section id="spheres" className="px-4 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Опыт в разных сферах
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Работал с проектами, где важны сложный спрос, понятная структура сайта и
          измеримый рост из органического поиска.
        </p>

        <div className="sphere-cloud-mobile mt-10 sm:mt-12 lg:hidden">
          {projectSpheres.map((sphere) => (
            <SphereTag key={sphere.name} sphere={sphere} />
          ))}
        </div>

        <div className="sphere-cloud-desktop mt-12">
          {projectSphereRows.map((row, i) => (
            <div key={i} className="sphere-row">
              {row.map((sphere) => (
                <SphereTag key={sphere.name} sphere={sphere} fillRow />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
