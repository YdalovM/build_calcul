"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { mainNavGroups } from "@/content/site";

type SiteNavProps = {
  onNavigate?: () => void;
};

export function SiteNav({ onNavigate }: SiteNavProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const isActiveLink = (href: string) => {
    const [hrefPath, hrefHash] = href.split("#");
    const normalizedPath = hrefPath === "" ? pathname : hrefPath;
    const pathMatches = normalizedPath === pathname;

    if (hrefHash) {
      return pathMatches && hash === `#${hrefHash}`;
    }

    return pathMatches;
  };

  return (
    <nav aria-label="Основная навигация">
      <div className="space-y-4">
        {mainNavGroups.map((group) => (
          <section key={group.title}>
            <p className="px-3 pb-1 text-[11px] uppercase tracking-[0.14em] text-zinc-500">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.links.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <li key={link.href}>
                    {/* ИИ: активное состояние = акцентный маркер слева (подчерк DayLab),
                        не заливка. Красный как фон CTA не используем. */}
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={onNavigate}
                      className={`relative block min-h-11 rounded-md py-2.5 pl-4 pr-3 text-sm transition ${
                        isActive
                          ? "bg-accent-soft font-medium text-zinc-950"
                          : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                      }`}
                    >
                      {isActive ? (
                        <span
                          aria-hidden="true"
                          className="accent-ring-glow absolute inset-y-1 left-0 w-0.5 rounded-r bg-accent"
                        />
                      ) : null}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </nav>
  );
}
