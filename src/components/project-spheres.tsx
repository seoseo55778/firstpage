import { projectSphereRows, projectSpheres } from "@/content/site";
import type { CSSProperties } from "react";
import Image from "next/image";

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
        fillRow
          ? ({
              flexGrow: sphere.grow,
              flexShrink: 1,
              flexBasis: 0,
            } as CSSProperties)
          : undefined
      }
    >
      <span className="sphere-tag__label">{sphere.name}</span>
    </span>
  );
}

export function ProjectSpheres() {
  return (
    <section id="spheres" className="sphere-section relative overflow-hidden px-4 py-20 sm:px-8 sm:py-24">
      <div className="sphere-section__stage relative mx-auto max-w-[1200px]">
        <div className="sonic-peek" aria-hidden="true">
          <Image src="/sonic.webp" alt="" width={827} height={1062} />
        </div>
        <div className="relative z-[1]">
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
            Сферы проектов
          </h2>
          <p className="sphere-section__lead mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
            Работал с проектами, где важны сложный спрос, понятная структура сайта и
            измеримый рост из органического поиска.
          </p>

          <div className="sphere-cloud-mobile">
            {projectSpheres.map((sphere) => (
              <SphereTag key={sphere.name} sphere={sphere} />
            ))}
          </div>

          <div className="sphere-cloud-desktop">
            {projectSphereRows.map((row, i) => (
              <div key={i} className="sphere-row">
                {row.map((sphere) => (
                  <SphereTag key={sphere.name} sphere={sphere} fillRow />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
