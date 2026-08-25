"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
      setActive(Boolean((event.target as HTMLElement | null)?.closest("[data-cursor='case']")));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-xs font-medium text-white transition-[width,height,opacity,background] duration-200 md:flex"
      style={{
        width: active ? 86 : 10,
        height: active ? 86 : 10,
        opacity: visible ? 1 : 0,
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
      }}
    >
      {active ? "Смотреть" : ""}
    </div>
  );
}
