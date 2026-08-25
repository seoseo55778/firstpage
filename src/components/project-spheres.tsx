import { projectSpheres } from "@/content/site";
import type { CSSProperties } from "react";

function SphereTag({
  sphere,
}: {
  sphere: (typeof projectSpheres)[number];
}) {
  return (
    <span
      tabIndex={0}
      className="sphere-tag"
      style={
        {
          backgroundColor: sphere.bg,
          "--sphere-shadow": sphere.shadow,
        } as CSSProperties & Record<"--sphere-shadow", string>
      }
    >
      {sphere.name}
    </span>
  );
}

export function ProjectSpheres() {
  const desktopRows = [
    projectSpheres.slice(0, 4),
    projectSpheres.slice(4, 7),
    projectSpheres.slice(7),
  ] as const;

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

        <div className="mt-10 flex flex-wrap gap-x-3 gap-y-3 sm:mt-12 sm:gap-x-4 sm:gap-y-4 lg:hidden">
          {projectSpheres.map((sphere) => (
            <SphereTag key={sphere.name} sphere={sphere} />
          ))}
        </div>

        <div className="mt-12 hidden flex-col gap-4 lg:flex">
          {desktopRows.map((row, i) => (
            <div key={i} className="flex flex-wrap items-center gap-x-4 gap-y-4">
              {row.map((sphere) => (
                <SphereTag key={sphere.name} sphere={sphere} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
