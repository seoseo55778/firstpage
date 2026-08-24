import type { Metadata } from "next";
import { Geist_Mono, Manrope, Unbounded } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} — SEO-специалист`,
  description:
    "Портфолио SEO-специалиста Гордея Гежи: кейсы роста органического трафика и заявок в Яндекс и Google. E-commerce, промышленность, строительство, логистика.",
  openGraph: {
    title: `${site.name} — SEO-специалист`,
    description:
      "Кейсы с цифрами: органический трафик ×3,8 и ×4, заявки +170% и +140%. Написать в Telegram.",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${manrope.variable} ${unbounded.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}
