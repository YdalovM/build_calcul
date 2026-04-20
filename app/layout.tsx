import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { YandexMetrika } from "@/components/analytics/yandex-metrika";
import { SiteShell } from "@/components/layout/site-shell";
import { buildRootMetadata } from "@/lib/seo-metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = buildRootMetadata();

// ИИ: viewport-fit=cover — чтобы env(safe-area-inset-*) работали на вырезах;
// ширина device-width — стандарт для адаптива. Не отключать user-scalable без
// доступности-аудита.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
        <YandexMetrika />
        {/* ИИ: общий shell держим на уровне layout, чтобы единый каркас
            (сайдбар/хедер) автоматически применялся ко всем страницам. */}
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
