import type { PageIdentity } from "@/content/site";
import { siteTitle } from "@/content/site";
import { SiteNav } from "@/components/layout/site-nav";

type SiteSidebarPanelProps = {
  pageIdentity: PageIdentity;
  /** В мобильном drawer навигация скроллится вместе с панелью — без лишнего max-height. */
  variant?: "desktop" | "mobileDrawer";
  onNavigate?: () => void;
};

export function SiteSidebarPanel({
  pageIdentity,
  variant = "desktop",
  onNavigate,
}: SiteSidebarPanelProps) {
  const navScrollClass =
    variant === "desktop"
      ? "mt-5 max-h-[calc(100vh-96px)] overflow-y-auto pr-1"
      : "mt-5 pb-[max(1rem,env(safe-area-inset-bottom))]";

  return (
    <div className="px-5 py-6">
      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">DayLab</p>
      <p className="accent-text-glow mt-1 text-xl font-semibold tracking-tight text-accent">
        {siteTitle}
      </p>
      <p className="mt-2 text-sm font-medium text-zinc-800">{pageIdentity.title}</p>
      <p className="mt-1 text-xs text-zinc-500">{pageIdentity.subtitle}</p>
      <div className={navScrollClass}>
        <SiteNav onNavigate={onNavigate} />
      </div>
    </div>
  );
}
