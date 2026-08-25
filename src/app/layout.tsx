import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
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
        className={`${geologica.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
