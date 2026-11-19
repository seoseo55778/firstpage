"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DeskFigureScene = dynamic(() => import("./desk-figure-scene"), {
  ssr: false,
});

export function DeskFigure() {
  const [still, setStill] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setStill(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return (
    <div className="desk-figure" aria-hidden="true">
      <DeskFigureScene still={still} />
    </div>
  );
}
