import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ScrollToTop } from "@/components/scroll-to-top";
import { site } from "@/content/site";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const title = `${site.name} — SEO для малого бизнеса`;
const description =
  "SEO-практика Гордея Гежи: аудит, ведение и GEO для малого бизнеса. Кейсы с цифрами по трафику и заявкам, без отдельного штата менеджеров.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description,
  openGraph: {
    title,
    description:
      "Кейсы с цифрами: органический трафик ×3,8 и ×4, заявки +170% и +140%. Написать в Telegram.",
    url: "/",
    siteName: site.name,
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/gordei.webp",
        width: 811,
        height: 745,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Кейсы с цифрами: органический трафик ×3,8 и ×4, заявки +170% и +140%.",
    images: ["/gordei.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geologica.variable} font-sans antialiased`}>
        <div className="orbit min-h-screen">
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
