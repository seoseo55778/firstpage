const lines = [
  [
    { text: "SEO, ", tone: "ink" },
    { text: "которое", tone: "italic" },
    { text: " ", tone: "ink" },
    { text: "растёт", tone: "fill" },
  ],
  [{ text: "в заявки", tone: "ink" }],
] as const;

export function HeroTitle() {
  let index = 0;

  return (
    <h1 className="font-display text-[clamp(2.2rem,4.8vw,4.35rem)] leading-[0.96] tracking-tight">
      {lines.map((line, lineIndex) => (
        <span
          key={lineIndex}
          className={lineIndex === 0 ? "block whitespace-nowrap" : "block"}
        >
          {line.map((part) => {
            const chars = [...part.text];
            return chars.map((char) => {
              const delay = index * 0.09;
              index += 1;
              return (
                <span
                  key={`${lineIndex}-${index}`}
                  className={`hero-letter hero-letter--${part.tone}`}
                  style={{ animationDelay: `${delay}s` }}
                >
                  {char === " " ? "\u00a0" : char}
                </span>
              );
            });
          })}
        </span>
      ))}
    </h1>
  );
}
