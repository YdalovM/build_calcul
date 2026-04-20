// ИИ: единственная обёртка между root layout и страницами: весь контент
// проходит через SiteLayoutFrame (сайдбар, крошки, липкая полоса). Новые
// страницы здесь не регистрируются — только app/layout.tsx подключает Shell.
import { SiteLayoutFrame } from "@/components/layout/site-layout-frame";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <SiteLayoutFrame>
      {children}
    </SiteLayoutFrame>
  );
}
