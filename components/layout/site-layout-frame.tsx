"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { pageIdentityByPath, siteTitle } from "@/content/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { MobileNavShell } from "@/components/layout/mobile-nav-shell";
import { SiteSidebarPanel } from "@/components/layout/site-sidebar-panel";

type SiteLayoutFrameProps = {
  children: React.ReactNode;
};

export function SiteLayoutFrame({ children }: SiteLayoutFrameProps) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);
  const pageIdentity = pageIdentityByPath[pathname] ?? {
    title: "Раздел",
    subtitle: siteTitle,
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const applyDesktopState = (matches: boolean) => {
      setIsDesktop(matches);
    };
    applyDesktopState(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      applyDesktopState(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div
      className={`site-layout min-h-dvh ${
        isDesktop ? "md:grid md:grid-cols-[260px_1fr]" : ""
      }`}
    >
      {isDesktop ? (
        // ИИ: правая граница сайдбара = «нитка» бренда DayLab. 2px сплошной
        // акцент + направленный неон в сторону контента. Это единственное
        // место, где акцент выступает как полноценная линия, а не точка.
        // См. .cursor/rules/build-calcul-visual-accent.mdc.
        <aside className="site-sidebar accent-edge-right relative z-10 border-r-2 border-accent bg-white">
          <div className="sticky top-0">
            <SiteSidebarPanel pageIdentity={pageIdentity} variant="desktop" />
          </div>
        </aside>
      ) : (
        <MobileNavShell>
          <SiteSidebarPanel pageIdentity={pageIdentity} variant="mobileDrawer" />
        </MobileNavShell>
      )}

      <div className="min-w-0 pt-14 md:pt-0">
        {/* ИИ: верхняя полоса контента (крошки + подзаголовок). На мобилке — под
            фиксированной шапкой (h-14 → top-14), на md+ — к верху окна. */}
        <div className="accent-edge-bottom sticky top-14 z-30 min-w-0 border-b-2 border-accent bg-white/95 px-4 py-2 backdrop-blur-sm sm:px-6 md:top-0 md:px-10">
          <div className="mx-auto min-w-0 w-full max-w-4xl">
            {pathname === "/" ? (
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                {pageIdentity.title}
              </p>
            ) : (
              <Breadcrumbs pathname={pathname} />
            )}
            <p className="mt-1 break-words text-sm text-zinc-700">{pageIdentity.subtitle}</p>
          </div>
        </div>

        {/* ИИ: ограничиваем ширину контента на десктопе, чтобы карточки
            и длинные абзацы оставались читаемыми на широких мониторах.
            max-w-4xl (~896px) подобран под сетку sm:grid-cols-2 и sm:grid-cols-3. */}
        {/* ИИ: pt/pb раздельно — нижний отступ не меньше safe-area (домашняя полоса
            iPhone) и на md сохраняем 2.5rem как раньше при py-10. */}
        <main className="min-w-0 px-4 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 md:px-10 md:pt-10 md:pb-[max(2.5rem,env(safe-area-inset-bottom))]">
          <div className="mx-auto min-w-0 w-full max-w-4xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
